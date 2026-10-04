import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { createHash } from 'node:crypto';
import Database from 'better-sqlite3';
import { expect, it } from 'vitest';
import { databaseReady, healthcheck } from '../scripts/deployment/healthcheck.mjs';

it('readiness never creates storage and rejects missing or mismatched schema metadata', async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), 'deploy-health-'));
  try {
    const file = path.join(folder, 'test.sqlite');
    expect(databaseReady(file, folder)).toBe(false);
    await expect(fs.stat(file)).rejects.toMatchObject({ code: 'ENOENT' });
    const sql = 'CREATE TABLE synthetic(id TEXT);';
    await fs.writeFile(path.join(folder, 'fixture.sql'), sql);
    const db = new Database(file);
    db.exec('CREATE TABLE schema_migrations(name TEXT PRIMARY KEY, hash TEXT)');
    expect(databaseReady(file, folder)).toBe(false);
    db.prepare('INSERT INTO schema_migrations VALUES (?,?)').run(
      'fixture.sql',
      createHash('sha256').update(sql).digest('hex'),
    );
    expect(databaseReady(file, folder)).toBe(true);
    await fs.writeFile(path.join(folder, 'fixture.sql'), sql + '-- changed');
    expect(databaseReady(file, folder)).toBe(false);
    db.close();
  } finally {
    await fs.rm(folder, { recursive: true, force: true });
  }
});

it('readiness requires both migrated isolated storage and a successful actual HTTP response', async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), 'deploy-http-'));
  let status = 503;
  const server = http.createServer((request, response) => {
    expect(request.url).toBe('/auth');
    response.writeHead(status);
    response.end('synthetic status');
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    const sql = 'CREATE TABLE synthetic(id TEXT);';
    await fs.writeFile(path.join(folder, 'fixture.sql'), sql);
    const file = path.join(folder, 'test.sqlite');
    const db = new Database(file);
    db.exec('CREATE TABLE schema_migrations(name TEXT PRIMARY KEY, hash TEXT)');
    db.prepare('INSERT INTO schema_migrations VALUES (?,?)').run(
      'fixture.sql',
      createHash('sha256').update(sql).digest('hex'),
    );
    db.close();
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Missing test listener');
    const options = {
      origin: `http://127.0.0.1:${address.port}`,
      databasePath: file,
      migrationsDirectory: folder,
    };
    expect(await healthcheck(options)).toBe(false);
    status = 200;
    expect(await healthcheck(options)).toBe(true);
    status = 302;
    expect(await healthcheck(options)).toBe(false);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
    await fs.rm(folder, { recursive: true, force: true });
  }
});
