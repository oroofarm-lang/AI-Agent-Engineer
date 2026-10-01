import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;
import { randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
loadEnvConfig(process.cwd());
const dir = path.dirname(process.env.DATABASE_URL || '.data/learning.sqlite');
mkdirSync(dir, { recursive: true });
const file = path.join(dir, 'auth-secret');
if (!process.env.BETTER_AUTH_SECRET && !existsSync(file))
  writeFileSync(file, randomBytes(48).toString('base64url'), { mode: 0o600, flag: 'wx' });
console.log('Local auth configuration ready (secret never printed).');
