import { z } from 'zod';
import type { DraftSaveInput } from './persistence';
import {
  templateDefinitionSchema,
  templateDocumentSchema,
  validateTemplateDocument,
  type TemplateDefinition,
  type TemplateDocument,
} from './schema';

const responseSchema = z.object({
  requestId: z.uuid(),
  acknowledgedRevision: z.number().int().positive(),
  replayed: z.boolean(),
  draft: z.object({
    definition: templateDefinitionSchema,
    definitionHash: z.string().regex(/^[a-f0-9]{64}$/),
    document: templateDocumentSchema,
    revision: z.number().int().positive(),
    readOnly: z.boolean(),
  }),
});
export type SaveStatus = 'saved' | 'unsaved' | 'saving' | 'failed' | 'conflict' | 'read-only';
export type SaveView = {
  document: TemplateDocument;
  revision: number;
  status: SaveStatus;
  error: string | null;
};
export class DraftSaveError extends Error {
  constructor(public readonly code: string) {
    super(code);
  }
}
const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** Browser-safe coordination; no learner content enters telemetry, storage or public graphs. */
export class DraftSaveCoordinator {
  private document: TemplateDocument;
  private saved: TemplateDocument;
  private revision: number;
  private status: SaveStatus;
  private error: string | null = null;
  private request: DraftSaveInput | null = null;
  private flight: Promise<void> | null = null;
  private listeners = new Set<() => void>();
  constructor(
    private readonly options: {
      definition: TemplateDefinition;
      definitionHash: string;
      curriculumVersion: string;
      document: TemplateDocument;
      revision: number;
      readOnly: boolean;
      send: (input: DraftSaveInput) => Promise<unknown>;
      uuid: () => string;
    },
  ) {
    this.document = structuredClone(validateTemplateDocument(options.document, options.definition));
    this.saved = structuredClone(this.document);
    this.revision = options.revision;
    this.status = options.readOnly ? 'read-only' : 'saved';
  }
  view(): SaveView {
    return {
      document: structuredClone(this.document),
      revision: this.revision,
      status: this.status,
      error: this.error,
    };
  }
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  private notify() {
    for (const listener of this.listeners) listener();
  }
  edit(raw: TemplateDocument) {
    if (this.status === 'read-only') throw new DraftSaveError('READ_ONLY');
    this.document = structuredClone(validateTemplateDocument(raw, this.options.definition));
    if (!['saving', 'failed', 'conflict'].includes(this.status))
      this.status = equal(this.document, this.saved) ? 'saved' : 'unsaved';
    this.notify();
  }
  /** Network uncertainty requires explicit retry of the identical receipt, not a new request. */
  async flush(retry = false): Promise<void> {
    if (this.flight) return this.flight;
    if (this.status === 'read-only' || this.status === 'conflict')
      throw new DraftSaveError(this.status === 'conflict' ? 'CONFLICT' : 'READ_ONLY');
    if (this.status === 'failed' && !retry) throw new DraftSaveError(this.error || 'SAVE_FAILED');
    this.flight = this.run();
    try {
      await this.flight;
    } finally {
      this.flight = null;
    }
  }
  private async run() {
    while (this.request || !equal(this.document, this.saved)) {
      this.request ??= {
        requestId: this.options.uuid(),
        templateId: this.options.definition.id,
        definitionHash: this.options.definitionHash,
        curriculumVersion: this.options.curriculumVersion,
        expectedRevision: this.revision,
        document: structuredClone(this.document),
      };
      const request = this.request;
      this.status = 'saving';
      this.error = null;
      this.notify();
      try {
        const response = responseSchema.parse(await this.options.send(structuredClone(request)));
        const actual = validateTemplateDocument(response.draft.document, this.options.definition);
        if (
          response.requestId !== request.requestId ||
          response.acknowledgedRevision !== request.expectedRevision + 1 ||
          response.draft.definitionHash !== this.options.definitionHash ||
          !equal(response.draft.definition, this.options.definition) ||
          response.draft.revision < response.acknowledgedRevision
        )
          throw new DraftSaveError('INVALID_ACKNOWLEDGEMENT');
        if (response.draft.readOnly || response.draft.revision !== response.acknowledgedRevision)
          throw new DraftSaveError('TEMPLATE_REVISION_CONFLICT');
        if (!equal(actual, request.document)) throw new DraftSaveError('INVALID_ACKNOWLEDGEMENT');
        this.revision = response.acknowledgedRevision;
        this.saved = structuredClone(request.document);
        this.request = null;
      } catch (error) {
        const code = error instanceof DraftSaveError ? error.code : 'SAVE_FAILED';
        this.status =
          code.includes('CONFLICT') || code === 'STALE_TEMPLATE' ? 'conflict' : 'failed';
        this.error = code;
        this.notify();
        throw new DraftSaveError(code);
      }
    }
    this.status = 'saved';
    this.notify();
  }
  /** Explicit conflict resolution only; the caller must preserve/export local work first. */
  replaceFromServer(document: TemplateDocument, revision: number, readOnly: boolean) {
    if (this.flight) throw new DraftSaveError('SAVE_IN_FLIGHT');
    if (!Number.isInteger(revision) || revision < this.revision)
      throw new DraftSaveError('STALE_REVISION');
    this.document = structuredClone(validateTemplateDocument(document, this.options.definition));
    this.saved = structuredClone(this.document);
    this.revision = revision;
    this.request = null;
    this.error = null;
    this.status = readOnly ? 'read-only' : 'saved';
    this.notify();
  }
}
