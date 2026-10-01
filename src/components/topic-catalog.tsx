import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Curriculum } from '@/lib/curriculum/schema';
import type { Progress } from '@/lib/domain/progress';
import { learningPath } from '@/lib/domain/learning-path';

export function TopicCatalog({
  curriculum,
  progress,
}: {
  curriculum: Curriculum;
  progress: Progress[];
}) {
  const built = new Set(
    progress.filter((item) => item.buildCompletedAt).map((item) => item.lessonId),
  );
  const path = learningPath(curriculum, progress);
  return (
    <div className="curriculum-grid topic-grid">
      {curriculum.modules?.map((module, index) => {
        const count = module.lessonIds.filter((id) => built.has(id)).length;
        return (
          <section key={module.id} className="card topic-card">
            <div className="section-heading">
              <p className="eyebrow">פרק {index + 1} {module.id === path.core.id ? '· חובה למתחילים' : !path.ready ? '· אחרי פרק הבסיס' : '· התמחות'}</p>
              <span className="version-tag">{module.lessonIds.length} יחידות</span>
            </div>
            <h2>
              <Link href={`/topics/${module.id}`}>{module.title}</Link>
            </h2>
            <p>{module.description}</p>
            <p className="muted">
              <strong>התוצר שלך:</strong> {module.outcome}
            </p>
            <progress
              max={module.lessonIds.length}
              value={count}
              aria-label={`התקדמות הבנייה בפרק ${module.title}`}
            />
            <div className="topic-card-footer">
              <span className="muted tiny">
                הבנייה הושלמה ב־{count} מתוך {module.lessonIds.length} יחידות
              </span>
              <Link className="text-link" href={`/topics/${module.id}`}>
                לפרק <ArrowLeft size={16} />
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
