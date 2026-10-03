import path from 'node:path';
import { auditorDirectory, checkedPath, readRecord } from '../auditor/files';
import { pointerSchema } from '../auditor/schema';
import type { ReturnTypeOfCurriculum } from '../ai/types';

export const baselineDirectory = path.join(process.cwd(), 'content/curriculum');
const catalogDirectories = new WeakMap<object, string>();
export function activeCurriculumSelection(directory = auditorDirectory()) {
  const pointer = readRecord(directory, 'active.json', pointerSchema, 1000);
  return pointer
    ? {
        root: checkedPath(directory, `releases/${pointer.version}`),
        expectedHash: pointer.manifestHash,
      }
    : { root: baselineDirectory, expectedHash: null };
}
export function bindCatalogDirectory(catalog: object, directory: string) {
  catalogDirectories.set(catalog, directory);
}
export function catalogDirectory(catalog: ReturnTypeOfCurriculum) {
  const root = catalogDirectories.get(catalog);
  if (!root) throw new Error('CURRICULUM_SOURCE_NOT_BOUND');
  return root;
}
