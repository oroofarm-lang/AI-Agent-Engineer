export function validateGeneratedPath(relative: string): string;
export function writeVaultFiles(input: {
  vaultRoot: string;
  files: Map<string, string>;
  version: string;
  manifestName?: string;
}): Promise<{ changed: number; unchanged: number; manifestChanged: boolean }>;
