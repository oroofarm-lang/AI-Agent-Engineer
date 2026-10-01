import { expect, it } from 'vitest';
import { parseLearningFlow } from '../src/lib/curriculum/learning-flow';
import { validateBody } from '../src/lib/curriculum/validate';
import { requiredSections } from '../src/lib/curriculum/schema';
const step = {
  label: 'שלב ראשון',
  detail: 'מפרטים כאן מה קורה בשלב הזה.',
  example: 'פנייה של לקוח',
};
const valid = {
  title: 'תהליך לדוגמה',
  steps: [step, { ...step, label: 'שלב שני' }],
  conclusion: 'בודקים את התוצאה לפני שמשתמשים בה.',
};
it('accepts explanatory diagrams and rejects oversized, executable, or malformed fields before publication', () => {
  expect(parseLearningFlow(JSON.stringify(valid)).steps).toHaveLength(2);
  expect(() => parseLearningFlow(JSON.stringify({ ...valid, steps: [step] }))).toThrow();
  expect(() => parseLearningFlow(JSON.stringify({ ...valid, script: 'alert(1)' }))).toThrow();
  expect(() => parseLearningFlow('x'.repeat(20001))).toThrow('too large');
  const body = requiredSections
    .map((name) => `## ${name}\nThis section has sufficient explanation.`)
    .join('\n');
  expect(() => validateBody(body + '\n```learning-flow\n{}\n```', 'EXAMPLE')).toThrow();
});
