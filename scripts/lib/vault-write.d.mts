export function validateGeneratedPath(relative: string): string;
type Projection = {
  files: Map<string, string>;
  version: string;
  curriculumHash?: string;
};
export function readVaultManifest(vaultRoot: string): Promise<{
  version: string;
  curriculumHash: string | null;
} | null>;
export function writeVaultFiles(
  input: {
    vaultRoot: string;
    manifestName?: string;
  } & (Projection | { prepare: () => Projection | Promise<Projection> }),
): Promise<{
  changed: number;
  unchanged: number;
  manifestChanged: boolean;
  files: number;
  version: string;
  curriculumHash: string | null;
}>;
