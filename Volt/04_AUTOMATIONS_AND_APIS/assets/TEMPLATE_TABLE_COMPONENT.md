---
generated: true
schema_version: 1
kind: "asset"
entity_id: "TEMPLATE_TABLE_COMPONENT"
curriculum_version: "2.2.0"
source_path: "src/components/assessment/workspace/table-editor.tsx"
asset_kind: "ui-code"
source_sha256: "c2cff6fe109de9015c0ea6f42909367413a2e3405b71b4148fae85d5438fef99"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_ADS_02_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_ADS_03_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_ADS_06_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_01_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_02_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_01_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_01_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_02_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_02_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_05_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D21_DATABASES_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_BUILD]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_DIAGNOSE]]","[[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS_BUILD]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# עורך טבלאות בתוך השיעור

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/assessment/workspace/table-editor.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/assessment/workspace/table-editor.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';
import {
  MAX_COLUMNS,
  MAX_ROWS,
  type TemplateDefinition,
  type TemplateDocument,
} from '@/lib/templates/schema';

/** Required starter columns keep their stable IDs; optional columns remain removable. */
export function TableEditor({
  definition,
  document,
  onChange,
  disabled = false,
}: {
  definition: TemplateDefinition;
  document: TemplateDocument;
  onChange: (document: TemplateDocument) => void;
  disabled?: boolean;
}) {
  const table = document.table;
  if (definition.kind !== 'table' || !table) return null;
  const required = new Set(definition.starter.columns.map((column) => column.id));
  const change = (next: NonNullable<TemplateDocument['table']>) =>
    onChange({ ...document, table: next });
  return (
    <div className="template-table-editor">
      <p className="muted" id={`${definition.id}-table-help`}>
        מלא את התאים. אפשר לערוך את שמות העמודות ולהוסיף שורות ועמודות לפי הצורך.
      </p>
      <div
        className="template-table-scroll"
        role="region"
        tabIndex={0}
        aria-label="טבלת העבודה — אפשר לגלול לרוחב"
        aria-describedby={`${definition.id}-table-help`}
      >
        <table>
          <caption>טבלת העבודה שלך</caption>
          <thead>
            <tr>
              {table.columns.map((column, columnIndex) => (
                <th scope="col" key={column.id}>
                  <label htmlFor={`${definition.id}-column-${column.id}`}>
                    שם עמודה {columnIndex + 1}
                  </label>
                  <input
                    id={`${definition.id}-column-${column.id}`}
                    value={column.label}
                    maxLength={80}
                    disabled={disabled}
                    dir="auto"
                    onChange={(event) =>
                      change({
                        ...table,
                        columns: table.columns.map((item, i) =>
                          i === columnIndex ? { ...item, label: event.target.value } : item,
                        ),
                      })
                    }
                  />
                  {!required.has(column.id) && (
                    <button
                      type="button"
                      disabled={disabled}
                      aria-label={`הסרת עמודה ${column.label || columnIndex + 1}`}
                      onClick={() =>
                        change({
                          columns: table.columns.filter((_, i) => i !== columnIndex),
                          rows: table.rows.map((row) => row.filter((_, i) => i !== columnIndex)),
                        })
                      }
                    >
                      הסרת עמודה
                    </button>
                  )}
                </th>
              ))}
              <th scope="col">פעולות בשורה</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, columnIndex) => (
                  <td key={table.columns[columnIndex].id}>
                    <textarea
                      value={value}
                      maxLength={4000}
                      rows={3}
                      disabled={disabled}
                      dir="auto"
                      aria-label={`שורה ${rowIndex + 1}, ${table.columns[columnIndex].label || `עמודה ${columnIndex + 1}`}`}
                      onChange={(event) =>
                        change({
                          ...table,
                          rows: table.rows.map((item, i) =>
                            i === rowIndex
                              ? item.map((cell, j) =>
                                  j === columnIndex ? event.target.value : cell,
                                )
                              : item,
                          ),
                        })
                      }
                    />
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    disabled={disabled}
                    aria-label={`הסרת שורה ${rowIndex + 1}`}
                    onClick={() =>
                      change({ ...table, rows: table.rows.filter((_, i) => i !== rowIndex) })
                    }
                  >
                    הסרת שורה
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="template-toolbar" aria-label="עריכת מבנה הטבלה">
        <button
          type="button"
          className="button secondary"
          disabled={disabled || table.rows.length >= MAX_ROWS}
          onClick={() => change({ ...table, rows: [...table.rows, table.columns.map(() => '')] })}
        >
          הוספת שורה
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={disabled || table.columns.length >= MAX_COLUMNS}
          onClick={() => {
            const id = `CUSTOM_${crypto.randomUUID().replaceAll('-', '').toUpperCase()}`;
            change({
              columns: [...table.columns, { id, label: `עמודה ${table.columns.length + 1}` }],
              rows: table.rows.map((row) => [...row, '']),
            });
          }}
        >
          הוספת עמודה
        </button>
        <span className="muted">
          {table.rows.length} מתוך {MAX_ROWS} שורות · {table.columns.length} מתוך {MAX_COLUMNS}{' '}
          עמודות
        </span>
      </div>
    </div>
  );
}

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/QUALITY|איכות, אבטחה ובקרה]] — קובץ עזר לפרק
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_ADS_02_BUILD|תבנית טבלה: יבוא נתוני קמפיינים · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_ADS_03_BUILD|תבנית טבלה: קריאייטיב והשערות לניסוי · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_ADS_06_BUILD|תבנית טבלה: מבחן מסכם: עוזר קמפיינים · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_01_BUILD|תבנית טבלה: מודל נתונים ללקוחות ולעסקאות · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_CRM_02_BUILD|תבנית טבלה: יבוא לקוחות ומניעת כפילות · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_DAT_01_DIAGNOSE|תבנית טבלה: עוזר נתונים עסקיים · DIAGNOSE]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_01_BUILD|תבנית טבלה: מפת עולם ה־AI · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_FND_02_BUILD|תבנית טבלה: בחירת מודלים לפי מדידה · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_02_BUILD|תבנית טבלה: מחקר קהל ומתחרים · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_MKT_05_BUILD|תבנית טבלה: מקור אחד לכמה פורמטים · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W04D19_RESEARCH_QUALITY_BUILD|תבנית טבלה: אימות דוח מחקר · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W05D21_DATABASES_BUILD|תבנית טבלה: מסדי נתונים ו־SQL · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_BUILD|תבנית טבלה: קליטת מסמכים וחלוקה לקטעים · BUILD]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W06D27_CHUNKING_VECTOR_RETRIEVAL_DIAGNOSE|תבנית טבלה: קליטת מסמכים וחלוקה לקטעים · DIAGNOSE]] — עורך טבלת העבודה
- [[03_PRACTICAL_PROOFS/template-workspaces/1.0.0/TEMPLATE_ASSESS_W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS_BUILD|תבנית טבלה: סביבות הרצה מנוהלות ושמירת מצב · BUILD]] — עורך טבלת העבודה
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
