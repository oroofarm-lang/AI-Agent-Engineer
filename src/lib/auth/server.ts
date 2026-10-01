import 'server-only';
import { getConnection } from '../db/connection';
import { createAuth } from './config';
let instance: ReturnType<typeof createAuth> | undefined;
export function getAuth() {
  return (instance ??= createAuth(getConnection()));
}
