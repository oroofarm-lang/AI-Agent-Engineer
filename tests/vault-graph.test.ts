import { afterEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { loadCurriculum, readLesson } from '../src/lib/curriculum/load';

type Relation = { from: string; to: string; type: string };
type Export = { files: Map<string, string>; relations: Relation[]; counts: Record<string, number> };
type Builder = {
  buildVaultFiles: (input: Record<string, unknown>) => Export;
  publicAssetCatalog: { id: string; sourcePath: string }[];
  publicApiCatalog: { id: string; sourcePath: string }[];
};
type Writer = {
  writeVaultFiles: (input: {
    vaultRoot: string;
    files: Map<string, string>;
    version: string;
  }) => Promise<{ changed: number; unchanged: number; manifestChanged: boolean }>;
};
const builderPath = '../scripts/lib/vault-export.mjs';
const writerPath = '../scripts/lib/vault-write.mjs';
const builder = (await import(builderPath)) as Builder;
const writer = (await import(writerPath)) as Writer;
const curriculum = loadCurriculum();
const lessonBodies = Object.fromEntries(
  curriculum.lessons.map((lesson) => [lesson.id, readLesson(lesson.id)]),
);
const registry = JSON.parse(readFileSync('content/agents/registry.json', 'utf8'));
const graph = builder.buildVaultFiles({ curriculum, lessonBodies, registry });
const temporary: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(
    temporary.splice(0).map((folder) => fs.rm(folder, { force: true, recursive: true })),
  );
});
const newVault = async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), 'public-vault-test-'));
  temporary.push(folder);
  return folder;
};
const write = (vaultRoot: string, files: Map<string, string>) =>
  writer.writeVaultFiles({ vaultRoot, files, version: curriculum.version });

describe('complete public knowledge graph', () => {
  it('links the entire real question draft to source notes, lessons and rubrics without releasing it', () => {
    const quizBank = JSON.parse(
      readFileSync('content/authoring/quiz-bank/1.0.0-draft.json', 'utf8'),
    );
    const result = builder.buildVaultFiles({ curriculum, lessonBodies, registry, quizBank });
    expect(result.counts.quizzes).toBe(139);
    expect(result.counts.canvasFileNodes).toBe(result.counts.documents);
    const linked = new Set(result.relations.map((edge) => `${edge.from}\0${edge.to}`));
    for (const quiz of quizBank.quizzes) {
      const file = `02_CURRICULUM/quiz-banks/1.0.0-draft/${quiz.id}.md`;
      const note = result.files.get(file)!;
      expect(note).toContain('טיוטה לביקורת אנושית');
      expect(note).toContain('review_status: "requires-human-review"');
      expect(
        linked.has(`02_CURRICULUM/${curriculum.version}/lessons/${quiz.lessonId}.md\0${file}`),
      ).toBe(true);
      for (const sourceId of quiz.sourceIds) {
        const source = `02_CURRICULUM/${curriculum.version}/sources/${sourceId}.md`;
        expect(linked.has(`${source}\0${file}`)).toBe(true);
        expect(linked.has(`${file}\0${source}`)).toBe(true);
      }
    }
  });

  it('exports the actual complete course, rubric criteria and actual registered agent prompts', () => {
    expect(graph.counts).toMatchObject({
      lessons: 139,
      modules: 14,
      rubrics: 139,
      skills: 53,
      sources: 47,
      exercises: 139,
      agents: registry.agents.length,
      tools: registry.tools.length,
      quizzes: 0,
    });
    expect(graph.files.has('Index.md')).toBe(true);
    expect(graph.files.has('Root_Knowledge_Graph.canvas')).toBe(true);
    for (const folder of [
      '00_ORCHESTRATION',
      '01_AGENTS',
      '02_CURRICULUM',
      '03_PRACTICAL_PROOFS',
      '04_AUTOMATIONS_AND_APIS',
    ])
      expect([...graph.files.keys()].some((file) => file.startsWith(`${folder}/`))).toBe(true);
    for (const lesson of curriculum.lessons) {
      const file = graph.files.get(`02_CURRICULUM/${curriculum.version}/lessons/${lesson.id}.md`)!;
      expect(file).toContain(lesson.title);
      expect(file).toContain(`lesson_id: "${lesson.id}"`);
      expect(file).not.toContain('curriculum_version: "2.1.0"');
      const exercise = graph.files.get(
        `02_CURRICULUM/${curriculum.version}/exercises/${lesson.id}.md`,
      )!;
      const build = lessonBodies[lesson.id].split('## Build First\n')[1].split('\n## ')[0].trim();
      expect(exercise).toContain(build);
    }
    for (const assessment of curriculum.assessments) {
      const rubric = graph.files.get(
        `03_PRACTICAL_PROOFS/${curriculum.version}/rubrics/${assessment.id}.md`,
      )!;
      const template = graph.files.get(
        `03_PRACTICAL_PROOFS/${curriculum.version}/templates/${assessment.id}.md`,
      )!;
      const key = graph.files.get(
        `03_PRACTICAL_PROOFS/${curriculum.version}/evaluation-keys/${assessment.id}.md`,
      )!;
      for (const criterion of assessment.criteria)
        for (const body of [rubric, template, key]) {
          expect(body).toContain(criterion.prompt);
          expect(body).toContain(criterion.evidenceHint);
        }
    }
    for (const agent of registry.agents as {
      id: string;
      titleHebrew: string;
      instructions: string;
    }[]) {
      const file = graph.files.get(`01_AGENTS/${agent.id}.md`)!;
      expect(file).toContain(`# ${agent.titleHebrew}`);
      expect(file).toContain(agent.instructions);
    }
  });

  it('resolves every wikilink, records reciprocal relationships, and connects all notes to the root', () => {
    const directed = new Set(
      graph.relations.map((edge) => `${edge.from}\0${edge.to}\0${edge.type}`),
    );
    for (const edge of graph.relations)
      expect(directed.has(`${edge.to}\0${edge.from}\0${edge.type}`)).toBe(true);
    for (const [file, body] of graph.files) {
      if (!file.endsWith('.md')) continue;
      for (const match of body.matchAll(/\[\[([^\]|#]+)(?:[^\]]*)\]\]/g)) {
        const target = match[1].endsWith('.canvas') ? match[1] : `${match[1]}.md`;
        expect(graph.files.has(target), `${file} links to missing ${target}`).toBe(true);
      }
      const frontmatter = body.split('---\n')[1];
      for (const line of frontmatter.trim().split('\n'))
        expect(() => JSON.parse(line.slice(line.indexOf(':') + 1))).not.toThrow();
    }
    const visited = new Set(['Index.md']),
      pending = ['Index.md'];
    while (pending.length) {
      const from = pending.shift();
      for (const edge of graph.relations)
        if (edge.from === from && !visited.has(edge.to)) {
          visited.add(edge.to);
          pending.push(edge.to);
        }
    }
    expect(visited.size).toBe(graph.counts.documents);
  });

  it('creates a valid Canvas with every public note, valid edges and non-overlapping cards', () => {
    type Node = {
      id: string;
      type: string;
      file?: string;
      x: number;
      y: number;
      width: number;
      height: number;
    };
    const canvas = JSON.parse(graph.files.get('Root_Knowledge_Graph.canvas')!) as {
      nodes: Node[];
      edges: { id: string; fromNode: string; toNode: string }[];
    };
    const ids = new Set(canvas.nodes.map((node) => node.id));
    expect(ids.size).toBe(canvas.nodes.length);
    const nodes = canvas.nodes.filter((node) => node.type === 'file');
    expect(nodes.length).toBe(graph.counts.documents);
    for (const node of nodes) expect(graph.files.has(node.file!)).toBe(true);
    for (const edge of canvas.edges) {
      expect(ids.has(edge.fromNode)).toBe(true);
      expect(ids.has(edge.toNode)).toBe(true);
    }
    expect(new Set(canvas.edges.map((edge) => edge.id)).size).toBe(canvas.edges.length);
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const overlap =
          a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y;
        expect(overlap, `${a.file} overlaps ${b.file}`).toBe(false);
      }
  });

  it('is deterministic and references actual public source files, never learner data or imaginary media', () => {
    const again = builder.buildVaultFiles({ curriculum, lessonBodies, registry });
    expect([...again.files]).toEqual([...graph.files]);
    for (const asset of builder.publicAssetCatalog)
      expect(existsSync(asset.sourcePath), asset.sourcePath).toBe(true);
    for (const api of builder.publicApiCatalog.filter(
      (api) => !['AGENT_ORCHESTRATE', 'AGENT_EVALUATE', 'VAULT_SYNC'].includes(api.id),
    ))
      expect(existsSync(api.sourcePath)).toBe(true);
    for (const [file, body] of graph.files) {
      expect(file).not.toMatch(/מחברת|\.env|\.data|auth-secret/);
      expect(body).not.toContain('Robot.png');
      expect(body).not.toContain('OPENAI_API_KEY=sk-');
    }
    expect(graph.files.get('04_AUTOMATIONS_AND_APIS/endpoints/AGENT_EVALUATE.md')).toContain(
      'integration-in-progress',
    );
  });

  it('only exports an authored quiz with an actual source section and rejects missing contexts', () => {
    const quiz = {
      id: 'QUIZ_FND_01',
      lessonId: 'FND_01',
      question: 'מאין צריך להגיע מחיר המוצר?',
      options: [
        { id: 'CATALOG', text: 'מקטלוג המוצרים של העסק' },
        { id: 'GUESS', text: 'מניחוש של המודל' },
      ],
      correctOptionId: 'CATALOG',
      explanation: 'המחיר כבר שמור במקור העסקי, ולכן יש לחפש את הרשומה המתאימה ולבדוק אותה.',
      sourceSection: 'Build First',
    };
    const result = builder.buildVaultFiles({
      curriculum,
      lessonBodies,
      registry,
      quizBank: { version: '1.0.0', quizzes: [quiz] },
    });
    expect(result.counts.quizzes).toBe(1);
    const note = result.files.get(`02_CURRICULUM/quiz-banks/1.0.0-draft/${quiz.id}.md`)!;
    expect(note).toContain(quiz.explanation);
    expect(note).toContain('טיוטה לביקורת אנושית');
    expect(note).toContain('review_status: "requires-human-review"');
    expect(result.files.has(`02_CURRICULUM/${curriculum.version}/quizzes/${quiz.id}.md`)).toBe(
      false,
    );
    expect(() =>
      builder.buildVaultFiles({
        curriculum,
        lessonBodies,
        registry,
        quizBank: { quizzes: [{ ...quiz, sourceSection: 'invented section' }] },
      }),
    ).toThrow('Quiz source section does not exist');
    expect(() =>
      builder.buildVaultFiles({
        curriculum,
        lessonBodies: { ...lessonBodies, FND_01: '' },
        registry,
      }),
    ).toThrow('Missing published lesson body');
    expect(() =>
      builder.buildVaultFiles({
        curriculum,
        lessonBodies,
        registry,
        publicAssets: [{ id: 'ESCAPE', sourcePath: 'public/course-data/../../.env.local' }],
      }),
    ).toThrow('Invalid public source path');
  });
});

describe('protected public vault writer', () => {
  it('writes byte-identical exports once and never reads or replaces notebook and historical files', async () => {
    const folder = await newVault();
    await fs.mkdir(path.join(folder, 'מחברת'));
    await fs.writeFile(path.join(folder, 'מחברת', 'private.md'), 'private fixture — do not read');
    await fs.mkdir(path.join(folder, 'קורס', '1.0.0'), { recursive: true });
    await fs.writeFile(path.join(folder, 'קורס', '1.0.0', 'historic.md'), 'historic fixture');
    const openSpy = vi.spyOn(fs, 'open');
    const files = new Map([
      ['Index.md', '# first'],
      ['01_AGENTS/Agent-Test.md', '# actual instructions'],
    ]);
    expect((await write(folder, files)).changed).toBe(2);
    expect(await write(folder, files)).toMatchObject({
      changed: 0,
      unchanged: 2,
      manifestChanged: false,
    });
    expect(
      openSpy.mock.calls.every(
        ([target]) => !String(target).includes('מחברת') && !String(target).includes('historic.md'),
      ),
    ).toBe(true);
    expect(await fs.readFile(path.join(folder, 'מחברת', 'private.md'), 'utf8')).toBe(
      'private fixture — do not read',
    );
    expect(await fs.readFile(path.join(folder, 'קורס', '1.0.0', 'historic.md'), 'utf8')).toBe(
      'historic fixture',
    );
  });

  it('preflights all files before any content write and preserves hand-edited generated notes', async () => {
    const folder = await newVault();
    const files = new Map([
      ['Index.md', '# original'],
      ['01_AGENTS/Agent-Test.md', '# original agent'],
    ]);
    await write(folder, files);
    await fs.writeFile(path.join(folder, '01_AGENTS', 'Agent-Test.md'), '# learner edit');
    const manifest = await fs.readFile(path.join(folder, '.course-export.json'), 'utf8');
    await expect(
      write(
        folder,
        new Map([
          ['Index.md', '# changed'],
          ['01_AGENTS/Agent-Test.md', '# updated agent'],
        ]),
      ),
    ).rejects.toThrow('VAULT_EDITED_NOTE:');
    expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# original');
    expect(await fs.readFile(path.join(folder, '01_AGENTS', 'Agent-Test.md'), 'utf8')).toBe(
      '# learner edit',
    );
    expect(await fs.readFile(path.join(folder, '.course-export.json'), 'utf8')).toBe(manifest);
    expect(existsSync(path.join(folder, '.vault-sync.lock'))).toBe(false);
  });

  it('rejects arbitrary paths, root/file/parent symlinks and a malicious manifest before access', async () => {
    const folder = await newVault(),
      outside = await newVault();
    await fs.writeFile(path.join(outside, 'secret.md'), 'outside fixture');
    for (const target of [
      '../secret.md',
      'מחברת/private.md',
      '.env.local',
      '02_CURRICULUM/../../secret.md',
      '02_CURRICULUM\\secret.md',
    ])
      await expect(write(folder, new Map([[target, 'never written']]))).rejects.toThrow(
        'INVALID_PUBLIC_VAULT_PATH',
      );
    await fs.symlink(path.join(outside, 'secret.md'), path.join(folder, 'Index.md'));
    await expect(write(folder, new Map([['Index.md', 'never written']]))).rejects.toThrow(
      'VAULT_SYMLINK_REJECTED',
    );
    await fs.rm(path.join(folder, 'Index.md'));
    await fs.symlink(outside, path.join(folder, '01_AGENTS'));
    await expect(
      write(folder, new Map([['01_AGENTS/Agent-Test.md', 'never written']])),
    ).rejects.toThrow('VAULT_SYMLINK_REJECTED');
    const linkedRoot = path.join(folder, 'linked');
    await fs.symlink(outside, linkedRoot);
    await expect(write(linkedRoot, new Map([['Index.md', 'never written']]))).rejects.toThrow(
      'VAULT_ROOT_REJECTED',
    );
    await fs.writeFile(
      path.join(folder, '.course-export.json'),
      JSON.stringify({ files: { 'מחברת/private.md': 'a'.repeat(64) } }),
    );
    await expect(write(folder, new Map([['Index.md', 'never written']]))).rejects.toThrow(
      'INVALID_PUBLIC_VAULT_PATH',
    );
    expect(await fs.readFile(path.join(outside, 'secret.md'), 'utf8')).toBe('outside fixture');
  });

  it('serializes simultaneous calls and leaves an existing external lock untouched', async () => {
    const folder = await newVault();
    const [first, second] = await Promise.all([
      write(folder, new Map([['Index.md', '# first']])),
      write(folder, new Map([['Index.md', '# second']])),
    ]);
    expect(first.changed).toBe(1);
    expect(second.changed).toBe(1);
    expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# second');
    await fs.writeFile(path.join(folder, '.vault-sync.lock'), 'another process');
    await expect(write(folder, new Map([['Index.md', '# third']]))).rejects.toThrow(
      'VAULT_SYNC_BUSY',
    );
    expect(await fs.readFile(path.join(folder, '.vault-sync.lock'), 'utf8')).toBe(
      'another process',
    );
    expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# second');
  });

  it('restores published public documents when the final manifest cannot be published', async () => {
    const folder = await newVault();
    await write(folder, new Map([['Index.md', '# original']]));
    const oldManifest = await fs.readFile(path.join(folder, '.course-export.json'), 'utf8');
    const rename = fs.rename.bind(fs);
    vi.spyOn(fs, 'rename').mockImplementation(async (from, to) => {
      if (String(to).endsWith('.course-export.json')) throw new Error('simulated manifest failure');
      return rename(from, to);
    });
    await expect(
      write(
        folder,
        new Map([
          ['Index.md', '# changed'],
          ['01_AGENTS/Agent-Test.md', '# new'],
        ]),
      ),
    ).rejects.toThrow('simulated manifest failure');
    expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# original');
    expect(existsSync(path.join(folder, '01_AGENTS', 'Agent-Test.md'))).toBe(false);
    expect(await fs.readFile(path.join(folder, '.course-export.json'), 'utf8')).toBe(oldManifest);
  });
});
