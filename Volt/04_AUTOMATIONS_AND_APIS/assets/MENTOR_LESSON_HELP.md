---
generated: true
schema_version: 1
kind: "asset"
entity_id: "MENTOR_LESSON_HELP"
curriculum_version: "2.2.0"
source_path: "src/components/learning/mentor-help.tsx"
asset_kind: "ui-code"
source_sha256: "621bb011f65af0b6f4f48fa14203310c5bccba5a3a9e4d6e72cfbc4f6478fbb6"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בחירת רמת הסבר מתוך השיעור

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/learning/mentor-help.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/learning/mentor-help.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';
import styles from './mentor-help.module.css';
import { useMentorActions, type Task, type ExplanationLevel } from './mentor-context';

/** Opens the existing Mentor with public lesson identity, never sends answers automatically. */
export function MentorHelp({ task }: { task: Task }) {
  const { requestHelp } = useMentorActions();
  const levels: [ExplanationLevel, string][] = [
    ['eli5', 'הסבר פשוט'],
    ['practical', 'צעדים מעשיים'],
    ['advanced', 'העמקה'],
  ];
  return (
    <details className={`lesson-mentor-help ${styles.panel}`}>
      <summary>רוצה עזרה עם ההסבר?</summary>
      <p className="muted">
        בחר איך תרצה ללמוד את החלק הזה. המנטור ייפתח, ואפשר לכתוב שאלה לפני השליחה.
      </p>
      <div className={styles.choices} role="group" aria-label={`דרך ההסבר: ${task.title}`}>
        {levels.map(([level, label]) => (
          <button
            key={level}
            type="button"
            className="button secondary"
            onClick={() => requestHelp(task, level)}
          >
            {label}
          </button>
        ))}
      </div>
    </details>
  );
}

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/QUALITY|איכות, אבטחה ובקרה]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
