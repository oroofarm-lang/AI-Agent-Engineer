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
