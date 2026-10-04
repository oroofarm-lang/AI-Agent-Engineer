export function databaseReady(filename: string, migrations?: string): boolean;
export function healthcheck(options?: {
  origin?: string;
  databasePath?: string;
  migrationsDirectory?: string;
}): Promise<boolean>;
