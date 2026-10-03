---
generated: true
schema_version: 1
kind: "asset"
entity_id: "BYTE_COMPONENT"
curriculum_version: "2.2.0"
source_path: "src/components/learning/ai-mascot.tsx"
asset_kind: "ui-code"
source_sha256: "bacd169189d7f5fdfb9c638a3e80b6a76940492394b6a05fb62612ce64915e8d"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/WEB]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# Byte — רכיב הרובוט האינטראקטיבי

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/learning/ai-mascot.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/learning/ai-mascot.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { reducedMotion } from '@/lib/domain/motion';
import { Sparkles } from 'lucide-react';
const greetings = [
  'היי, אני Byte! נבנה משהו קטן ונגלה איך הוא עובד.',
  'נתקעת? שנה דבר אחד בכל פעם והשווה בין התוצאות.',
  'משימה גדולה? חלק אותה לשלושה צעדים ובדוק קודם את הצעד הראשון.',
];

/** Drop a lazy Spline/WebGL scene into `scene`; the CSS character remains the no-network fallback. */
export function AiMascot({
  compact = false,
  mood = 'curious',
  scene,
}: {
  compact?: boolean;
  mood?: 'curious' | 'happy';
  scene?: ReactNode;
}) {
  const rig = useRef<HTMLDivElement>(null);
  const [waving, setWaving] = useState(false);
  const [greeting, setGreeting] = useState(-1);
  function greet() {
    setWaving(true);
    setGreeting((value) => (value + 1) % greetings.length);
  }
  function track(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || reducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5,
      y = (event.clientY - rect.top) / rect.height - 0.5;
    rig.current?.style.setProperty('--look-x', `${x * 15}px`);
    rig.current?.style.setProperty('--look-y', `${y * 10}px`);
  }
  function reset() {
    rig.current?.style.setProperty('--look-x', '0px');
    rig.current?.style.setProperty('--look-y', '0px');
  }
  return (
    <div
      className={`mascot-stage ${compact ? 'compact' : ''} ${waving || mood === 'happy' ? 'is-happy' : ''}`}
      onPointerMove={track}
      onPointerLeave={reset}
      data-spline-slot="ai-companion"
    >
      <div className="mascot-grid" aria-hidden="true" />
      <div className="orbital orbital-one" aria-hidden="true" />
      <div className="orbital orbital-two" aria-hidden="true" />
      <div className="floating-symbol symbol-one" aria-hidden="true">
        {'{ }'}
      </div>
      <div className="floating-symbol symbol-two" aria-hidden="true">
        ✦
      </div>
      <div className="floating-symbol symbol-three" aria-hidden="true">
        ⌘
      </div>
      {scene ?? (
        <div
          ref={rig}
          className="mascot-rig"
          aria-hidden="true"
          style={{ '--look-x': '0px', '--look-y': '0px' } as CSSProperties}
        >
          <div className="bot-antenna">
            <i />
          </div>
          <div className="bot-shell">
            <div className="bot-highlight" />
            <div className="bot-face">
              <div className="bot-eyes">
                <i />
                <i />
              </div>
              <div className="bot-smile" />
            </div>
            <div className="bot-ear ear-left" />
            <div className="bot-ear ear-right" />
          </div>
          <div className="bot-body">
            <i />
            <i />
            <i />
          </div>
          <div className="bot-hand hand-left" />
          <div className="bot-hand hand-right" />
        </div>
      )}
      <div className="mascot-shadow" aria-hidden="true" />
      <button
        type="button"
        className="mascot-touch-target"
        aria-label="הצגת הודעה מ־Byte"
        onClick={greet}
      />
      {greeting >= 0 && (
        <div className="mascot-speech" key={greeting} role="status">
          <p>{greetings[greeting]}</p>
          <button
            type="button"
            className="icon-button"
            aria-label="סגירת הודעת Byte"
            onClick={() => {
              setGreeting(-1);
              setWaving(false);
            }}
          >
            ×
          </button>
        </div>
      )}
      <button
        type="button"
        className="mascot-greeting"
        onClick={greet}
        aria-expanded={greeting >= 0}
      >
        <Sparkles size={14} />
        {waving ? 'היי! מוכן לבנות?' : 'תגיד לי שלום'}
      </button>
      {!compact && (
        <span className="mascot-caption" dir="ltr">
          <i /> BYTE · YOUR ARCADE SIDEKICK
        </span>
      )}
    </div>
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
