---
generated: true
schema_version: 1
kind: "asset"
entity_id: "PYTHON_I_LAB"
curriculum_version: "2.2.0"
source_path: "content/labs/W01D02_PYTHON_FOR_AGENT_BUILDERS_I.py"
asset_kind: "exercise-code"
source_sha256: "8591058b8cf5a97d764f2d8a92d588f413ef76e4db1a848544885d811ff77ebd"
related: ["[[02_CURRICULUM/2.2.0/exercises/W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# תרגיל Python — חלק א׳

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/labs/W01D02_PYTHON_FOR_AGENT_BUILDERS_I.py)

סוג הקובץ: `exercise-code`. נתיב במאגר הציבורי: `content/labs/W01D02_PYTHON_FOR_AGENT_BUILDERS_I.py`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
"""Deterministic command router. These placeholders do not call an AI model."""

def route(command: str, text: str) -> dict:
    if not isinstance(command, str) or not isinstance(text, str):
        raise TypeError('command and text must be strings')
    command, text = command.strip().lower(), text.strip()
    if not text:
        raise ValueError('text must not be empty')
    handlers = {
        'research': lambda value: {'query': value, 'status': 'not_searched'},
        'summarize': lambda value: {'preview': value[:40], 'status': 'not_summarized'},
        'extract': lambda value: {'words': value.split(), 'status': 'local_split'},
    }
    if command not in handlers:
        raise ValueError('unknown command')
    return {'action': command, 'result': handlers[command](text)}


if __name__ == '__main__':
    print(route('extract', 'hello agent builders'))

```

## קשרים במפת הידע

- [[02_CURRICULUM/2.2.0/exercises/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|התרגול: Python לבוני סוכנים · חלק א׳]] — קוד לתרגול
- [[02_CURRICULUM/2.2.0/lessons/W01D02_PYTHON_FOR_AGENT_BUILDERS_I|Python לבוני סוכנים · חלק א׳]] — קובץ עזר לשיעור
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
