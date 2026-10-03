import { afterEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { loadCurriculum, readLesson } from '../src/lib/curriculum/load';
import { loadKnowledgeRegistry } from '../src/lib/ai/knowledge-registry';

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
const knowledgeRegistry = loadKnowledgeRegistry(curriculum);
const graph = builder.buildVaultFiles({ curriculum, lessonBodies, registry, knowledgeRegistry });
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
  it('keeps teaching drafts distinct while linking a published bank to its lessons and actual save API', () => {
    const draft = JSON.parse(readFileSync('content/authoring/quiz-bank/1.0.0-draft.json', 'utf8'));
    // Synthetic graph fixture: no real approval or publication is performed.
    const result = builder.buildVaultFiles({
      curriculum,
      lessonBodies,
      registry,
      quizBank: draft,
      publishedQuizBank: { ...draft, status: 'published', reviewStatus: 'approved' },
    });
    expect(result.counts.quizzes).toBe(278);
    for (const question of draft.quizzes) {
      const pending = `02_CURRICULUM/quiz-banks/1.0.0-draft/${question.id}.md`;
      const active = `02_CURRICULUM/quiz-banks/1.0.0/${question.id}.md`;
      expect(result.files.get(pending)).toContain('requires-human-review');
      expect(result.files.get(active)).toContain('review_status: "approved"');
      expect(result.files.get(active)).toContain('[[04_AUTOMATIONS_AND_APIS/endpoints/QUIZZES');
      expect(
        result.relations.some(
          (edge) => edge.from === active && edge.to.endsWith(`/lessons/${question.lessonId}.md`),
        ),
      ).toBe(true);
    }
    expect(result.files.get('04_AUTOMATIONS_AND_APIS/endpoints/QUIZ_REVIEW.md')).toContain(
      'verified-operator',
    );
    expect(result.files.get('02_CURRICULUM/quiz-banks/1.0.0/Index.md')).not.toContain('reviewerId');
  });
  it('keeps an older teaching draft explicitly unreviewed after publication and rejects a mismatched published bank', () => {
    const quizBank = JSON.parse(
      readFileSync('content/authoring/quiz-bank/1.0.0-draft.json', 'utf8'),
    );
    const before = JSON.stringify(quizBank);
    const next = { ...curriculum, version: '2.2.1' };
    const result = builder.buildVaultFiles({ curriculum: next, lessonBodies, registry, quizBank });
    expect(result.counts.quizzes).toBe(139);
    for (const quiz of quizBank.quizzes) {
      const file = result.files.get(`02_CURRICULUM/quiz-banks/1.0.0-draft/${quiz.id}.md`)!;
      expect(file).toContain('source_curriculum_version: "2.2.0"');
      expect(file).toContain('active_curriculum_version: "2.2.1"');
      expect(file).toContain('needs_version_review: true');
      expect(file).toContain('יש לבדוק את התאמת השאלות לגרסה הפעילה לפני פרסום');
      expect(file).toContain('review_status: "requires-human-review"');
    }
    expect(JSON.stringify(quizBank)).toBe(before);
    expect(() =>
      builder.buildVaultFiles({
        curriculum: next,
        lessonBodies,
        registry,
        quizBank: { ...quizBank, status: 'published', reviewStatus: 'approved' },
      }),
    ).toThrow('Quiz curriculum version mismatch');
  });
  it('links the human-reviewed release API to discovery, the actual Auditor, and every course module', () => {
    const api = '04_AUTOMATIONS_AND_APIS/endpoints/CURRICULUM_AUDITOR.md';
    expect(graph.files.get(api)).toContain('permission_scope: "verified-operator"');
    expect(graph.files.get(api)).toContain('אישור אנושי נפרד');
    const linked = new Set(graph.relations.map((edge) => `${edge.from}\0${edge.to}`));
    for (const file of [
      '04_AUTOMATIONS_AND_APIS/Knowledge-Updates.md',
      '01_AGENTS/Agent-Curriculum-Auditor.md',
      '01_AGENTS/Agent-Hebrew-UX.md',
      ...curriculum.modules!.map(
        (chapter) => `02_CURRICULUM/${curriculum.version}/modules/${chapter.id}.md`,
      ),
    ]) {
      expect(linked.has(`${api}\0${file}`)).toBe(true);
      expect(linked.has(`${file}\0${api}`)).toBe(true);
    }
    expect(
      graph.files.get('04_AUTOMATIONS_AND_APIS/assets/CURRICULUM_REVIEW_COMPONENT.md'),
    ).toContain('src/components/curriculum-review.tsx');
  });
  it('links the existing application question separately from the unpublished teaching draft and never exports learner answers', () => {
    const systemQuestion = JSON.parse(readFileSync('content/quizzes/system/1.0.0.json', 'utf8'));
    const result = builder.buildVaultFiles({ curriculum, lessonBodies, registry, systemQuestion });
    expect(result.counts).toMatchObject({ quizzes: 0, systemQuizzes: 1 });
    const file = `02_CURRICULUM/system-quizzes/${systemQuestion.version}/${systemQuestion.id}.md`;
    expect(result.files.get(file)).toContain('purpose: "app-workflow-practice"');
    expect(result.files.get(file)).toContain(systemQuestion.feedback.correct);
    for (const lesson of curriculum.lessons)
      expect(
        result.relations.some(
          (edge) =>
            edge.from === file &&
            edge.to === `02_CURRICULUM/${curriculum.version}/lessons/${lesson.id}.md`,
        ),
      ).toBe(true);
    const canvas = JSON.parse(result.files.get('Root_Knowledge_Graph.canvas')!);
    expect(canvas.nodes.some((node: { file: string }) => node.file === file)).toBe(true);
    expect(result.files.get('04_AUTOMATIONS_AND_APIS/endpoints/QUIZZES.md')).toContain(
      '/api/quizzes',
    );
  });
  it('provides complete chapter and specialist views with only real graph edges and no overlapping cards', () => {
    expect(graph.counts).toMatchObject({
      chapterCanvases: 14,
      agentCanvases: registry.agents.length,
    });
    const full = JSON.parse(graph.files.get('Root_Knowledge_Graph.canvas')!);
    const fullEdges = new Set(full.edges.map((edge: { id: string }) => edge.id));
    const covered = new Set<string>();
    const assertView = (file: string, root: string) => {
      const canvas = JSON.parse(graph.files.get(file)!);
      const nodes = canvas.nodes.filter((node: { type: string }) => node.type === 'file') as {
        id: string;
        file: string;
        x: number;
        y: number;
        width: number;
        height: number;
      }[];
      const nodeIds = new Set(nodes.map((node) => node.id));
      expect(new Set(canvas.nodes.map((node: { id: string }) => node.id)).size).toBe(
        canvas.nodes.length,
      );
      expect(nodes.some((node) => node.file === root)).toBe(true);
      expect(graph.files.get(root)).toContain(`[[${file}|`);
      expect(graph.files.get('Index.md')).toContain(`[[${file}|`);
      for (const node of nodes) {
        expect(graph.files.has(node.file)).toBe(true);
        for (const other of nodes.filter((n) => n.id !== node.id))
          expect(
            node.x < other.x + other.width &&
              node.x + node.width > other.x &&
              node.y < other.y + other.height &&
              node.y + node.height > other.y,
            `${file}: ${node.file} overlaps ${other.file}`,
          ).toBe(false);
      }
      for (const edge of canvas.edges) {
        expect(fullEdges.has(edge.id)).toBe(true);
        expect(nodeIds.has(edge.fromNode) && nodeIds.has(edge.toNode)).toBe(true);
      }
      return new Set(nodes.map((node) => node.file));
    };
    for (const chapter of curriculum.modules!) {
      const nodes = assertView(
        `02_CURRICULUM/${curriculum.version}/maps/${chapter.id}.canvas`,
        `02_CURRICULUM/${curriculum.version}/modules/${chapter.id}.md`,
      );
      for (const lesson of chapter.lessonIds) {
        expect(nodes.has(`02_CURRICULUM/${curriculum.version}/lessons/${lesson}.md`)).toBe(true);
        expect(nodes.has(`02_CURRICULUM/${curriculum.version}/exercises/${lesson}.md`)).toBe(true);
        const rubric = curriculum.assessments.find((a) => a.lessonId === lesson)!;
        expect(nodes.has(`03_PRACTICAL_PROOFS/${curriculum.version}/rubrics/${rubric.id}.md`)).toBe(
          true,
        );
        covered.add(lesson);
      }
    }
    expect(covered.size).toBe(139);
    for (const agent of registry.agents) {
      const nodes = assertView(`01_AGENTS/maps/${agent.id}.canvas`, `01_AGENTS/${agent.id}.md`);
      for (const tool of agent.allowedTools)
        expect(nodes.has(`04_AUTOMATIONS_AND_APIS/tools/${tool}.md`)).toBe(true);
    }
  });
  it('links every tracked technology and discovery source to actual relevant lessons and preserves Canvas relation labels', () => {
    expect(graph.counts).toMatchObject({ technologies: 6, discoverySources: 8 });
    const linked = new Set(graph.relations.map((r) => `${r.from}\0${r.to}`));
    for (const source of knowledgeRegistry.sources) {
      const file = `04_AUTOMATIONS_AND_APIS/knowledge-sources/${source.id}.md`;
      expect(graph.files.get(file)).toContain('verification: "discovery-only"');
      for (const id of source.lessonIds) {
        const lesson = `02_CURRICULUM/${curriculum.version}/lessons/${id}.md`;
        expect(linked.has(`${file}\0${lesson}`)).toBe(true);
        expect(linked.has(`${lesson}\0${file}`)).toBe(true);
      }
    }
    const canvas = JSON.parse(graph.files.get('Root_Knowledge_Graph.canvas')!);
    const pathToId = new Map<string, string>(
      canvas.nodes
        .filter((n: { type: string }) => n.type === 'file')
        .map((n: { file: string; id: string }) => [n.file, n.id]),
    );
    for (const relation of graph.relations) {
      const edge = canvas.edges.find(
        (e: { fromNode: string; toNode: string }) =>
          (e.fromNode === pathToId.get(relation.from) && e.toNode === pathToId.get(relation.to)) ||
          (e.fromNode === pathToId.get(relation.to) && e.toNode === pathToId.get(relation.from)),
      );
      expect(edge.label.split(' · ')).toContain(relation.type);
    }
  });
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
    const overview = JSON.parse(graph.files.get('00_ORCHESTRATION/System_Overview.canvas')!);
    expect(overview.nodes.filter((node: Node) => node.type === 'file').length).toBe(
      graph.counts.overviewFileNodes,
    );
    expect(overview.nodes.filter((node: Node) => node.type === 'group')).toHaveLength(5);
    expect(overview.nodes.length).toBeLessThan(25);
    const overviewIds = new Set(overview.nodes.map((node: Node) => node.id));
    for (const node of overview.nodes.filter((node: Node) => node.type === 'file'))
      expect(graph.files.has(node.file)).toBe(true);
    for (const edge of overview.edges) {
      expect(overviewIds.has(edge.fromNode)).toBe(true);
      expect(overviewIds.has(edge.toNode)).toBe(true);
      expect(canvas.edges.some((full) => full.id === edge.id)).toBe(true);
    }
    const overviewFiles = overview.nodes.filter((node: Node) => node.type === 'file');
    expect(overview.edges.length).toBe(overviewFiles.length - 1);
    const overviewReached = new Set<string>([
      overviewFiles.find((node: Node) => node.file === 'Index.md').id,
    ]);
    while (true) {
      const before = overviewReached.size;
      for (const edge of overview.edges)
        if (overviewReached.has(edge.fromNode) || overviewReached.has(edge.toNode)) {
          overviewReached.add(edge.fromNode);
          overviewReached.add(edge.toNode);
        }
      if (overviewReached.size === before) break;
    }
    expect(overviewReached.size).toBe(overviewFiles.length);
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
    const again = builder.buildVaultFiles({
      curriculum,
      lessonBodies,
      registry,
      knowledgeRegistry,
    });
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
  const canvasFile = '00_ORCHESTRATION/System_Overview.canvas';
  const canvas = {
    nodes: [
      { id: 'a', type: 'file', file: 'Index.md', x: 0, y: 0, width: 440, height: 160 },
      {
        id: 'b',
        type: 'file',
        file: '01_AGENTS/Agent-Test.md',
        x: 530,
        y: 0,
        width: 440,
        height: 160,
      },
    ],
    edges: [{ id: 'ab', fromNode: 'a', toNode: 'b', label: 'מומחה' }],
  };
  const canvasBody = `${JSON.stringify(canvas, null, 2)}\n`;
  const nativeCanvasBody = JSON.stringify(
    {
      edges: canvas.edges.map((edge) => ({
        label: edge.label,
        toNode: edge.toNode,
        fromNode: edge.fromNode,
        id: edge.id,
      })),
      nodes: canvas.nodes.map((node) => Object.fromEntries(Object.entries(node).reverse())),
    },
    null,
    '\t',
  );
  const canvasExport = (body = canvasBody) =>
    new Map([
      ['Index.md', '# public index'],
      ['01_AGENTS/Agent-Test.md', '# public agent'],
      [canvasFile, body],
    ]);

  it('adopts native JSON formatting from an old manifest without rewriting the Canvas and remains idempotent', async () => {
    const folder = await newVault();
    await write(folder, canvasExport());
    const manifestPath = path.join(folder, '.course-export.json');
    const legacy = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    delete legacy.canvasFiles;
    await fs.writeFile(manifestPath, `${JSON.stringify(legacy, null, 2)}\n`);
    await fs.writeFile(path.join(folder, canvasFile), nativeCanvasBody);
    const rename = vi.spyOn(fs, 'rename');
    expect(await write(folder, canvasExport())).toMatchObject({
      changed: 0,
      manifestChanged: true,
    });
    expect(rename.mock.calls).toHaveLength(1);
    expect(String(rename.mock.calls[0][1])).toBe(await fs.realpath(manifestPath));
    expect(await fs.readFile(path.join(folder, canvasFile), 'utf8')).toBe(nativeCanvasBody);
    const saved = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    expect(saved.files[canvasFile]).toBe(
      createHash('sha256').update(nativeCanvasBody).digest('hex'),
    );
    expect(saved.canvasFiles[canvasFile]).toMatch(/^[a-f0-9]{64}$/);
    expect(await write(folder, canvasExport())).toMatchObject({
      changed: 0,
      manifestChanged: false,
    });
  });

  it('uses the saved structural fingerprint for a real new release after a formatting-only save and retains history', async () => {
    const folder = await newVault();
    await write(folder, canvasExport());
    await fs.writeFile(path.join(folder, canvasFile), nativeCanvasBody);
    const next = JSON.stringify({
      ...canvas,
      nodes: canvas.nodes.map((node) => ({ ...node, x: node.x + 100 })),
    });
    expect(
      await writer.writeVaultFiles({
        vaultRoot: folder,
        files: canvasExport(next),
        version: '2.2.1',
      }),
    ).toMatchObject({ changed: 1 });
    expect(await fs.readFile(path.join(folder, canvasFile), 'utf8')).toBe(next);
    const before = JSON.parse(await fs.readFile(path.join(folder, '.course-export.json'), 'utf8'));
    await writer.writeVaultFiles({
      vaultRoot: folder,
      files: new Map([['Index.md', '# later index']]),
      version: '2.2.2',
    });
    const after = JSON.parse(await fs.readFile(path.join(folder, '.course-export.json'), 'utf8'));
    expect(after.canvasFiles[canvasFile]).toBe(before.canvasFiles[canvasFile]);
    expect(after.files[canvasFile]).toBe(before.files[canvasFile]);
  });

  it('preserves genuine node, edge, array-order, unknown-property and invalid-JSON edits before writing any target', async () => {
    for (const body of [
      JSON.stringify({ ...canvas, nodes: canvas.nodes.map((node) => ({ ...node, x: 42 })) }),
      JSON.stringify({ ...canvas, edges: [{ ...canvas.edges[0], label: 'my edit' }] }),
      JSON.stringify({ ...canvas, nodes: [...canvas.nodes].reverse() }),
      JSON.stringify({ ...canvas, personalLayout: true }),
      '{invalid',
    ]) {
      const folder = await newVault();
      await write(folder, canvasExport());
      await fs.writeFile(path.join(folder, canvasFile), body);
      const manifest = await fs.readFile(path.join(folder, '.course-export.json'), 'utf8');
      const files = canvasExport();
      files.set('Index.md', '# must not be written');
      await expect(write(folder, files)).rejects.toThrow(`VAULT_EDITED_NOTE:${canvasFile}`);
      expect(await fs.readFile(path.join(folder, canvasFile), 'utf8')).toBe(body);
      expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# public index');
      expect(await fs.readFile(path.join(folder, '.course-export.json'), 'utf8')).toBe(manifest);
    }
  });

  it('rejects malformed Canvas fingerprints and invalid generated JSON without accessing private paths', async () => {
    const folder = await newVault();
    await write(folder, canvasExport());
    const manifestPath = path.join(folder, '.course-export.json');
    const saved = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    for (const canvasFiles of [
      null,
      [],
      { 'מחברת/private.canvas': 'a'.repeat(64) },
      { 'Index.md': 'a'.repeat(64) },
      { 'Root_Knowledge_Graph.canvas': 'a'.repeat(64) },
      { [canvasFile]: 'invalid' },
    ]) {
      await fs.writeFile(manifestPath, JSON.stringify({ ...saved, canvasFiles }));
      const open = vi.spyOn(fs, 'open');
      await expect(write(folder, canvasExport())).rejects.toThrow(/INVALID_/);
      expect(open.mock.calls.every(([target]) => !String(target).includes('מחברת'))).toBe(true);
      open.mockRestore();
    }
    await fs.writeFile(manifestPath, JSON.stringify(saved));
    for (const body of ['null', '{"nodes":[],"edges":false}', '{invalid'])
      await expect(write(folder, canvasExport(body))).rejects.toThrow('INVALID_VAULT_CANVAS');
    const nested: { nodes: unknown[]; edges: unknown[]; value?: unknown } = {
      nodes: [],
      edges: [],
    };
    let parent: { value?: unknown } = nested;
    for (let i = 0; i < 90; i++) parent = parent.value = {};
    await expect(write(folder, canvasExport(JSON.stringify(nested)))).rejects.toThrow(
      'INVALID_VAULT_CANVAS',
    );
    expect(await fs.readFile(path.join(folder, canvasFile), 'utf8')).toBe(canvasBody);
  });

  it('rolls back this run when an editor changes an adopted Canvas before manifest publication', async () => {
    const folder = await newVault();
    const actualRoot = await fs.realpath(folder);
    await write(folder, canvasExport());
    await fs.writeFile(path.join(folder, canvasFile), nativeCanvasBody);
    const manifest = await fs.readFile(path.join(folder, '.course-export.json'), 'utf8');
    const concurrentEdit = JSON.stringify({ ...canvas, editorChange: true });
    const rename = fs.rename.bind(fs);
    let edited = false;
    vi.spyOn(fs, 'rename').mockImplementation(async (from, to) => {
      const result = await rename(from, to);
      if (!edited && String(to) === path.join(actualRoot, 'Index.md')) {
        edited = true;
        await fs.writeFile(path.join(folder, canvasFile), concurrentEdit);
      }
      return result;
    });
    const files = canvasExport();
    files.set('Index.md', '# changed index');
    await expect(write(folder, files)).rejects.toThrow('VAULT_CHANGED_DURING_SYNC');
    expect(edited).toBe(true);
    expect(await fs.readFile(path.join(folder, canvasFile), 'utf8')).toBe(concurrentEdit);
    expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# public index');
    expect(await fs.readFile(path.join(folder, '.course-export.json'), 'utf8')).toBe(manifest);
  });

  it('preserves native formatting and the old manifest when manifest publication fails', async () => {
    const folder = await newVault();
    await write(folder, canvasExport());
    await fs.writeFile(path.join(folder, canvasFile), nativeCanvasBody);
    const oldManifest = await fs.readFile(path.join(folder, '.course-export.json'), 'utf8');
    const rename = fs.rename.bind(fs);
    vi.spyOn(fs, 'rename').mockImplementation(async (from, to) => {
      if (String(to).endsWith('.course-export.json')) throw new Error('manifest unavailable');
      return rename(from, to);
    });
    const files = canvasExport();
    files.set('Index.md', '# changed index');
    await expect(write(folder, files)).rejects.toThrow('manifest unavailable');
    expect(await fs.readFile(path.join(folder, canvasFile), 'utf8')).toBe(nativeCanvasBody);
    expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# public index');
    expect(await fs.readFile(path.join(folder, '.course-export.json'), 'utf8')).toBe(oldManifest);
  });

  it('prepares a waiting projection only after acquiring the real lock and the preceding writer finishes', async () => {
    const folder = await newVault();
    const { writeVaultFiles, readVaultManifest } = await import(writerPath);
    let releaseFirst!: () => void, started!: () => void;
    const firstReady = new Promise<void>((resolve) => {
      started = resolve;
    });
    const holdFirst = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });
    const first = writeVaultFiles({
      vaultRoot: folder,
      prepare: async () => {
        expect(existsSync(path.join(folder, '.vault-sync.lock'))).toBe(true);
        started();
        await holdFirst;
        return {
          files: new Map([['Index.md', '# first']]),
          version: '2.2.0',
          curriculumHash: 'a'.repeat(64),
        };
      },
    });
    await firstReady;
    const secondPrepare = vi.fn(async () => {
      expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# first');
      expect(existsSync(path.join(folder, '.vault-sync.lock'))).toBe(true);
      return {
        files: new Map([['Index.md', '# second']]),
        version: '2.2.1',
        curriculumHash: 'b'.repeat(64),
      };
    });
    const second = writeVaultFiles({ vaultRoot: folder, prepare: secondPrepare });
    expect(secondPrepare).not.toHaveBeenCalled();
    releaseFirst();
    await Promise.all([first, second]);
    expect(await readVaultManifest(folder)).toEqual({
      version: '2.2.1',
      curriculumHash: 'b'.repeat(64),
      quizBankHash: null,
    });
    expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# second');
  });

  it('reads only the public manifest and requires a fresh fingerprint for an older export', async () => {
    const folder = await newVault();
    const { writeVaultFiles, readVaultManifest } = await import(writerPath);
    expect(await readVaultManifest(folder)).toBeNull();
    await write(folder, new Map([['Index.md', '# old metadata']]));
    expect(await readVaultManifest(folder)).toEqual({
      version: curriculum.version,
      curriculumHash: null,
      quizBankHash: null,
    });
    await writeVaultFiles({
      vaultRoot: folder,
      files: new Map([['Index.md', '# old metadata']]),
      version: curriculum.version,
      curriculumHash: 'c'.repeat(64),
      quizBankHash: null,
    });
    const open = vi.spyOn(fs, 'open');
    expect(await readVaultManifest(folder)).toEqual({
      version: curriculum.version,
      curriculumHash: 'c'.repeat(64),
      quizBankHash: null,
    });
    expect(open.mock.calls).toHaveLength(1);
    expect(String(open.mock.calls[0][0])).toBe(
      path.join(await fs.realpath(folder), '.course-export.json'),
    );
  });

  it('records question-bank changes independently of course version and rejects a malformed bank fingerprint', async () => {
    const folder = await newVault();
    const { writeVaultFiles, readVaultManifest } = await import(writerPath);
    const projection = {
      vaultRoot: folder,
      files: new Map([['Index.md', '# fixed public graph']]),
      version: curriculum.version,
      curriculumHash: 'd'.repeat(64),
    };
    await writeVaultFiles({ ...projection, quizBankHash: null });
    await writeVaultFiles({ ...projection, quizBankHash: 'e'.repeat(64) });
    expect(await readVaultManifest(folder)).toEqual({
      version: curriculum.version,
      curriculumHash: 'd'.repeat(64),
      quizBankHash: 'e'.repeat(64),
    });
    const file = path.join(folder, '.course-export.json');
    const previous = await fs.readFile(file, 'utf8');
    await expect(writeVaultFiles({ ...projection, quizBankHash: 'not-a-digest' })).rejects.toThrow(
      'INVALID_VAULT_EXPORT',
    );
    expect(await fs.readFile(file, 'utf8')).toBe(previous);
    const malformed = JSON.parse(previous);
    malformed.quizBankHash = 'not-a-digest';
    await fs.writeFile(file, JSON.stringify(malformed));
    await expect(readVaultManifest(folder)).rejects.toThrow('INVALID_VAULT_MANIFEST');
  });

  it('releases a failed preparation lock without changing a saved export and rejects malformed identity', async () => {
    const folder = await newVault();
    const { writeVaultFiles, readVaultManifest } = await import(writerPath);
    await write(folder, new Map([['Index.md', '# saved']]));
    const before = await fs.readFile(path.join(folder, '.course-export.json'), 'utf8');
    await expect(
      writeVaultFiles({
        vaultRoot: folder,
        prepare: () => {
          throw new Error('source unavailable');
        },
      }),
    ).rejects.toThrow('source unavailable');
    expect(existsSync(path.join(folder, '.vault-sync.lock'))).toBe(false);
    expect(await fs.readFile(path.join(folder, '.course-export.json'), 'utf8')).toBe(before);
    await expect(
      writeVaultFiles({
        vaultRoot: folder,
        files: new Map([['Index.md', '# invalid']]),
        version: curriculum.version,
        curriculumHash: 'not-a-digest',
      }),
    ).rejects.toThrow('INVALID_VAULT_EXPORT');
    expect(await fs.readFile(path.join(folder, 'Index.md'), 'utf8')).toBe('# saved');
    await fs.rm(path.join(folder, '.course-export.json'));
    await fs.symlink(path.join(folder, 'Index.md'), path.join(folder, '.course-export.json'));
    await expect(readVaultManifest(folder)).rejects.toThrow('VAULT_SYMLINK_REJECTED');
  });
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
