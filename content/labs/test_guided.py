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
        blocks = re.findall(r'```python\n([\s\S]*?)\n```', body)
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
