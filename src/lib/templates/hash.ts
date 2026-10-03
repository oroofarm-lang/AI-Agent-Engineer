import { createHash } from 'node:crypto';
import type { TemplateDefinition } from './schema';
/** Hash only the validated definition; callers parse the strict schema first. */
export function templateHash(definition: TemplateDefinition) {
  return createHash('sha256').update(JSON.stringify(definition)).digest('hex');
}
