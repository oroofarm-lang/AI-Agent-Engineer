import type { ProgressState } from '../domain/progress';
export const he = {
  dashboard: 'סביבת הלמידה',
  learn: 'מסלול הלמידה',
  settings: 'הגדרות ונתונים',
  roadmap: 'מפת הפיתוח',
  states: {
    NOT_STARTED: 'טרם התחיל',
    IN_PROGRESS: 'בתהליך',
    BUILD_COMPLETE: 'הבנייה הושלמה',
    MASTERY_PENDING: 'ממתין להערכת שליטה',
    MASTERED: 'שליטה מוכחת',
    COMPLETED_WITHOUT_MASTERY: 'הושלם ללא שליטה',
  } satisfies Record<ProgressState, string>,
  sections: {
    Mission: 'המשימה',
    'Build First': 'קודם בונים',
    Concepts: 'המושגים',
    'Mental Model': 'איך זה עובד',
    'Deep Dive': 'להעמקה',
    'Failure Lab': 'מנסים, שוברים ומתקנים',
    Challenge: 'האתגר שלך',
    'Mastery Check': 'הוכחת הבנה',
    Documentation: 'תיעוד ומקורות',
    'Engineering Notes': 'הערות הנדסיות',
  } as Record<string, string>,
};
