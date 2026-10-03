---
generated: true
schema_version: 1
kind: "asset"
entity_id: "GUIDED_LAB_TESTS"
curriculum_version: "2.2.0"
source_path: "content/labs/test_guided.py"
asset_kind: "test-code"
source_sha256: "02e78ac0eac5e1d6c0474a768759f7ac10994edde1e892ab9c6d5f255192ae49"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[02_CURRICULUM/2.2.0/modules/CORE]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בדיקות התרגילים המודרכים

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/labs/test_guided.py)

סוג הקובץ: `test-code`. נתיב במאגר הציבורי: `content/labs/test_guided.py`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
"""Execute the exact beginner router teaching block, without network or model calls."""
import contextlib
import io
from pathlib import Path
import re
import unittest


class GuidedRouterTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        author = Path(__file__).parent.parent / 'authoring/guided-lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I.md'
        body = author.read_text(encoding='utf8')
        blocks = re.findall(r'`​``python\n([\s\S]*?)\n`​``', body)
        code = next(block for block in blocks if block.startswith('# guided-router'))
        namespace = {}
        with contextlib.redirect_stdout(io.StringIO()):
            exec(compile(code, str(author), 'exec'), namespace)
        cls.route = staticmethod(namespace['route'])

    def test_guided_examples_and_whitespace(self):
        self.assertEqual(self.route(' EXTRACT ', '\tשלום\nעולם  ')['result']['words'], ['שלום', 'עולם'])
        self.assertEqual(self.route('research', 'שאלה')['result']['status'], 'not_searched')
        self.assertEqual(self.route('summarize', 'א' * 50)['result']['preview'], 'א' * 40)
        self.assertEqual(self.route('summarize', 'קצר')['result']['status'], 'not_summarized')

    def test_guided_failures_are_explicit(self):
        for command, text, error in [('delete', 'text', ValueError), ('extract', '\t\n', ValueError), ('extract', 5, TypeError), (False, 'text', TypeError)]:
            with self.subTest(command=command, text=text), self.assertRaises(error):
                self.route(command, text)

    def test_guided_router_preserves_original_lab_contract(self):
        from test_labs import router
        for command in ['extract', 'research', 'summarize']:
            with self.subTest(command=command):
                self.assertEqual(self.route(command, 'שלום עולם'), router.route(command, 'שלום עולם'))

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/CORE|פרק 1: יסודות · פרק חובה]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
