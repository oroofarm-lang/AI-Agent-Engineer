import type { ArtifactMetadata } from '@/lib/domain/artifacts';
export function ArtifactLinks({ files }: { files: ArtifactMetadata[] }) {
  return files.length > 0 ? (
    <ul className="saved-artifacts" aria-label="קבצים שהוגשו">
      {files.map((file) => (
        <li key={file.id}>
          <a href={`/api/artifacts/${file.id}`} className="text-link" download>
            {file.name} · הורדה
          </a>
          <span dir="ltr">{(file.size / 1024).toFixed(1)} KB</span>
        </li>
      ))}
    </ul>
  ) : null;
}
