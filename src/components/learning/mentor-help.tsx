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
