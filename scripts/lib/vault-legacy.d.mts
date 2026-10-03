import type { ReturnTypeOfCurriculum } from '../../src/lib/ai/types';
export function buildLegacyFiles(
  curriculum: ReturnTypeOfCurriculum,
  lessonBodies: Record<string, string>,
): Map<string, string>;
