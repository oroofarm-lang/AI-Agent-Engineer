import { z } from 'zod';

export const MAX_FILE_BYTES = 3 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 8 * 1024 * 1024;
export const MAX_FILES = 6;
export const MAX_ACCOUNT_BYTES = 100 * 1024 * 1024;
export const artifactExtensions = [
  'txt',
  'py',
  'ts',
  'tsx',
  'js',
  'json',
  'md',
  'csv',
  'pdf',
  'png',
  'jpg',
  'jpeg',
];
export const artifactAccept = artifactExtensions.map((extension) => `.${extension}`).join(',');

export const artifactInput = z.strictObject({
  id: z.uuid(),
  criterionId: z.string().min(1).max(100),
  name: z
    .string()
    .min(1)
    .max(180)
    .refine((name) => !/[\x00-\x1f\x7f/\\]/.test(name)),
  data: z
    .instanceof(Uint8Array)
    .refine((bytes) => bytes.byteLength > 0 && bytes.byteLength <= MAX_FILE_BYTES),
});
export type ArtifactInput = z.infer<typeof artifactInput>;
export type ArtifactMetadata = {
  id: string;
  submission_id: string;
  criterion_id: string;
  name: string;
  mime: string;
  size: number;
  sha256: string;
  created_at: string;
};

/** Client MIME is not trusted. Active formats are rejected; downloads never render inline. */
export function artifactMime(name: string, data: Uint8Array) {
  const extension = name.split('.').pop()?.toLowerCase() || '';
  if (!artifactExtensions.includes(extension)) throw new Error('UNSUPPORTED_FILE');
  const bytes = Buffer.from(data);
  if (extension === 'pdf') {
    if (bytes.subarray(0, 5).toString() !== '%PDF-') throw new Error('INVALID_FILE');
    return 'application/pdf';
  }
  if (extension === 'png') {
    if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
      throw new Error('INVALID_FILE');
    return 'image/png';
  }
  if (extension === 'jpg' || extension === 'jpeg') {
    if (bytes[0] !== 255 || bytes[1] !== 216 || bytes[2] !== 255) throw new Error('INVALID_FILE');
    return 'image/jpeg';
  }
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(data);
  } catch {
    throw new Error('INVALID_FILE');
  }
  if (bytes.includes(0)) throw new Error('INVALID_FILE');
  return 'text/plain; charset=utf-8';
}

export const portfolioInput = z.strictObject({
  included: z.boolean(),
  title: z.string().trim().min(1).max(120),
  summary: z.string().trim().max(1200),
});
