import type { ReturnTypeOfCurriculum } from '../../src/lib/ai/types';
import type { AgentRegistry } from '../../src/lib/agents/registry';
export type PublicAsset = {
  id: string;
  title: string;
  sourcePath: string;
  kind: string;
  body?: string;
  moduleIds?: string[];
  lessonIds?: string[];
  agentIds?: string[];
};
export type PublicApi = {
  id: string;
  title: string;
  path: string;
  methods: string[];
  scope: string;
  sourcePath: string;
  description: string;
  status?: string;
};
export const publicAssetCatalog: PublicAsset[];
export const publicApiCatalog: PublicApi[];
export function buildVaultFiles(input: {
  curriculum: ReturnTypeOfCurriculum;
  lessonBodies: Record<string, string>;
  registry: AgentRegistry;
  publicAssets?: PublicAsset[];
  apis?: PublicApi[];
  quizBank?: unknown;
}): {
  files: Map<string, string>;
  relations: { from: string; to: string; type: string }[];
  counts: Record<string, number>;
};
