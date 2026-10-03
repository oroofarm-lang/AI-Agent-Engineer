---
generated: true
schema_version: 1
kind: "asset"
entity_id: "LAB_TESTS"
curriculum_version: "2.2.0"
source_path: "content/labs/test_labs.py"
asset_kind: "test-code"
source_sha256: "478db07a9cd49a2fcbad3c2e2fdb510a976f121c7ab06069f60fc2c4f066dc0d"
related: ["[[01_AGENTS/Agent-Agentic-Workflows]]","[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Curriculum-Pedagogy]]","[[01_AGENTS/Agent-Model-Data]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/modules/AGENTS]]","[[02_CURRICULUM/2.2.0/modules/CORE]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בדיקות המעבדה

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/labs/test_labs.py)

סוג הקובץ: `test-code`. נתיב במאגר הציבורי: `content/labs/test_labs.py`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
"""Run with: python3 -m unittest discover -s content/labs -p 'test_*.py' -v."""
import importlib.util
import json
from pathlib import Path
from tempfile import TemporaryDirectory
from threading import Thread
from urllib.error import HTTPError
import unittest


def load(filename):
    spec = importlib.util.spec_from_file_location(filename, Path(__file__).parent / (filename + '.py'))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


router = load('W01D02_PYTHON_FOR_AGENT_BUILDERS_I')
store = load('W01D03_PYTHON_FOR_AGENT_BUILDERS_II')
http = load('W01D04_HTTP_APIS')
agent = load('W03D13_AGENT_LOOP')


class RouterTests(unittest.TestCase):
    def test_validated_dispatch(self):
        result = router.route(' EXTRACT ', 'a b')
        self.assertEqual(result['result']['words'], ['a', 'b'])
        self.assertEqual(result['action'], 'extract')

    def test_unknown_empty_and_wrong_types(self):
        for command, text, error in [('delete', 'x', ValueError), ('extract', ' ', ValueError),
                                     ('extract', 5, TypeError), (5, 'x', TypeError)]:
            with self.subTest(command=command, text=text), self.assertRaises(error):
                router.route(command, text)

    def test_research_is_not_claimed_to_have_searched(self):
        self.assertEqual(router.route('research', 'AI')['result']['status'], 'not_searched')


class PersistenceTests(unittest.TestCase):
    def test_utf8_roundtrip_and_missing_file(self):
        with TemporaryDirectory() as directory:
            path = Path(directory) / 'new/messages.json'
            self.assertEqual(store.load_messages(path), [])
            messages = [{'role': 'user', 'content': 'שלום'}]
            store.save_messages(path, messages)
            self.assertEqual(store.load_messages(path), messages)
            self.assertIn('שלום', path.read_text())

    def test_corruption_is_preserved(self):
        with TemporaryDirectory() as directory:
            path = Path(directory) / 'messages.json'
            path.write_text('broken JSON')
            with self.assertRaises(json.JSONDecodeError):
                store.load_messages(path)
            self.assertEqual(path.read_text(), 'broken JSON')

    def test_bad_structure_is_rejected(self):
        for value in [{}, [5], [{'role': 'user'}], [{'role': 'root', 'content': 'x'}]]:
            with self.subTest(value=value), self.assertRaises(ValueError):
                store.validate(value)

    def test_invalid_save_does_not_overwrite_good_data(self):
        with TemporaryDirectory() as directory:
            path = Path(directory) / 'messages.json'
            store.save_messages(path, [{'role': 'user', 'content': 'kept'}])
            with self.assertRaises(ValueError):
                store.save_messages(path, [{'role': 'user', 'content': 3}])
            self.assertEqual(store.load_messages(path)[0]['content'], 'kept')


class HttpTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = http.ThreadingHTTPServer(('127.0.0.1', 0), http.LabHandler)
        cls.worker = Thread(target=cls.server.serve_forever, daemon=True)
        cls.worker.start()
        cls.base = f'http://127.0.0.1:{cls.server.server_port}'

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.worker.join()

    def test_two_endpoints_normalized(self):
        self.assertEqual(http.fetch(self.base, '/customer')['data']['id'], 'C1')
        self.assertEqual(http.fetch(self.base, '/product')['source'], '/product')

    def test_404_and_rate_limit_are_not_success(self):
        for path, code in [('/missing', 404), ('/limited', 429)]:
            with self.subTest(path=path):
                with self.assertRaises(HTTPError) as caught:
                    http.fetch(self.base, path)
                self.assertEqual(caught.exception.code, code)
                caught.exception.close()

    def test_bad_json_is_a_data_failure(self):
        with self.assertRaises(json.JSONDecodeError):
            http.fetch(self.base, '/invalid')


class AgentTests(unittest.TestCase):
    def test_observation_reaches_model(self):
        result = agent.run_agent(agent.scripted_model, 'lookup')
        self.assertEqual(result['status'], 'completed')
        self.assertTrue(json.loads(result['trace'][1]['content'])['ok'])

    def test_tool_cannot_bypass_allowlist_or_contract(self):
        for decision in [{'kind': 'tool', 'name': 'shell', 'arguments': {}},
                         {'kind': 'tool', 'name': 'lookup_customer', 'arguments': {'customer_id': 'C1', 'admin': True}},
                         {'kind': 'final', 'text': 4}, 'invalid']:
            with self.subTest(decision=decision), self.assertRaises(ValueError):
                agent.run_agent(lambda _: decision, 'x')

    def test_loop_is_bounded(self):
        model = lambda _: {'kind': 'tool', 'name': 'lookup_customer', 'arguments': {'customer_id': 'C1'}}
        result = agent.run_agent(model, 'loop', max_steps=3)
        self.assertEqual(result['status'], 'step_limit')
        self.assertEqual(len(result['trace']), 4)

    def test_tool_failure_is_visible_to_model(self):
        decisions = iter([{'kind': 'tool', 'name': 'lookup_customer', 'arguments': {'customer_id': 'missing'}},
                          {'kind': 'final', 'text': 'no data'}])
        result = agent.run_agent(lambda _: next(decisions), 'x')
        self.assertFalse(json.loads(result['trace'][1]['content'])['ok'])

    def test_invalid_budget_rejected(self):
        for limit in [0, True, 21, '4']:
            with self.subTest(limit=limit), self.assertRaises(ValueError):
                agent.run_agent(agent.scripted_model, 'x', limit)


if __name__ == '__main__':
    unittest.main()

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Agentic-Workflows|סוכנים ותהליכי עבודה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Curriculum-Pedagogy|הסבר והדרכה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Model-Data|מודלים, הקשר ונתונים]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/AGENTS|סוכנים ותזמור]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/CORE|פרק 1: יסודות · פרק חובה]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
