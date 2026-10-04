---
generated: true
schema_version: 1
kind: "asset"
entity_id: "JOURNEY_MAP_COMPONENT"
curriculum_version: "2.2.0"
source_path: "src/components/learning/lesson-map.tsx"
asset_kind: "ui-code"
source_sha256: "d8da57c365094e3b2995e41bf377a189267ea78f37ee7770fa9cab0a724e2ace"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/WEB]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# מפת המסע — רכיב הממשק

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/learning/lesson-map.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/learning/lesson-map.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';
import { useState, type CSSProperties } from 'react';
import Link from '@/components/workspace-navigation';
import { Check, LockKeyhole, Play, ArrowLeft, Map, Clock3 } from 'lucide-react';
import type { Lesson, Curriculum } from '@/lib/curriculum/schema';
import type { Progress } from '@/lib/domain/progress';

export function LessonMap({
  lessons,
  weeks,
  records,
  lockedIds,
}: {
  lessons: Lesson[];
  weeks: Curriculum['weeks'];
  records: Progress[];
  lockedIds: string[];
}) {
  const [week, setWeek] = useState(1),
    [selectedId, setSelectedId] = useState(lessons[0].id);
  const visible = lessons.filter((lesson) => lesson.week === week),
    selected = visible.find((l) => l.id === selectedId) ?? visible[0];
  const built = new Set(
    records.filter((record) => record.buildCompletedAt).map((record) => record.lessonId),
  );
  return (
    <section className="lesson-map card" aria-labelledby="map-title">
      <div className="map-heading">
        <div>
          <p className="eyebrow">SELECT YOUR LEVEL</p>
          <h2 id="map-title">
            <Map size={20} /> מפת המסע שלך
          </h2>
        </div>
        <label className="week-selector">
          <span className="sr-only">בחירת שבוע במפה</span>
          <select value={week} onChange={(event) => setWeek(Number(event.target.value))}>
            {weeks.map((w) => (
              <option key={w.id} value={w.number}>
                שבוע {w.number} · {w.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="map-foundation-banner">
        <span className="pill">
          {week === 1 ? 'מתחילים כאן · שבוע 1' : 'קודם בונים את היסודות'}
        </span>
        <p>פרק היסודות הוא נקודת ההתחלה. מסיימים את תרגילי החובה לפני שפותחים התמחות חדשה.</p>
        <Link href="/topics/CORE" className="text-link">
          לפרק היסודות ולסדר הלמידה ←
        </Link>
      </div>
      <div className="map-legend">
        <span>
          <i className="legend-built" /> הבנייה הושלמה
        </span>
        <span>
          <i className="legend-active" /> זמין ללמידה
        </span>
        <span>
          <i className="legend-locked" /> אחרי פרק היסודות
        </span>
      </div>
      <div className="node-path" dir="ltr">
        <svg viewBox="0 0 500 170" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 55 H100 V110 H200 V55 H300 V110 H400 V55 H450" />
        </svg>
        {visible.map((lesson, i) => {
          const state = lockedIds.includes(lesson.id)
            ? 'locked'
            : built.has(lesson.id)
              ? 'built'
              : lesson.publicationStatus === 'published'
                ? 'active'
                : 'locked';
          return (
            <button
              key={lesson.id}
              className={`map-node ${state} ${selected.id === lesson.id ? 'selected' : ''}`}
              style={
                {
                  '--node-x': `${10 + i * 20}%`,
                  '--node-y': `${i % 2 ? 110 : 55}px`,
                } as CSSProperties
              }
              onClick={() => setSelectedId(lesson.id)}
              aria-pressed={selected.id === lesson.id}
              aria-label={`יום ${lesson.day}: ${lesson.title} · ${state === 'built' ? 'הבנייה הושלמה' : state === 'active' ? 'זמין' : 'נעול עד להשלמת פרק היסודות'}`}
            >
              <span className="node-ring">
                {state === 'built' ? (
                  <Check size={21} />
                ) : state === 'active' ? (
                  <Play size={19} fill="currentColor" />
                ) : (
                  <LockKeyhole size={17} />
                )}
              </span>
              <span className="node-caption" dir="rtl">
                יום {String(lesson.day).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>
      <div className="map-selected" aria-live="polite">
        <div>
          <span className="eyebrow">DAY {String(selected.day).padStart(2, '0')}</span>
          <h3 dir="auto">{selected.title}</h3>
          <span className="muted">
            <Clock3 size={13} /> עד {selected.estimatedMinutes} דקות{' '}
            {lockedIds.includes(selected.id) ? '· נפתח אחרי תרגילי פרק היסודות' : ''}
          </span>
        </div>
        <Link
          href={lockedIds.includes(selected.id) ? '/topics/CORE' : `/learn/${selected.id}`}
          className={`button ${selected.publicationStatus === 'published' ? 'primary' : 'secondary'}`}
        >
          {lockedIds.includes(selected.id)
            ? 'להשלמת פרק היסודות'
            : selected.publicationStatus === 'published'
              ? 'מעבר לשיעור'
              : 'צפייה במתווה'}
          <ArrowLeft size={16} />
        </Link>
      </div>
    </section>
  );
}

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/WEB|אתרים וכלים פנימיים]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
