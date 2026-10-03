---
generated: true
schema_version: 1
kind: "asset"
entity_id: "PYTHON_II_LAB"
curriculum_version: "2.2.0"
source_path: "content/labs/W01D03_PYTHON_FOR_AGENT_BUILDERS_II.py"
asset_kind: "exercise-code"
source_sha256: "0e0eeab6386afd4cd4ea4e8ee812bca0e6d30f50753005c73d623d6a10372910"
related: ["[[02_CURRICULUM/2.2.0/exercises/W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[02_CURRICULUM/2.2.0/lessons/W01D03_PYTHON_FOR_AGENT_BUILDERS_II]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# תרגיל Python — חלק ב׳

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/labs/W01D03_PYTHON_FOR_AGENT_BUILDERS_II.py)

סוג הקובץ: `exercise-code`. נתיב במאגר הציבורי: `content/labs/W01D03_PYTHON_FOR_AGENT_BUILDERS_II.py`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
"""Validated conversation persistence. Corrupt input is never silently erased."""
import json
import os
from pathlib import Path
from tempfile import NamedTemporaryFile


def validate(messages: object) -> list:
    if not isinstance(messages, list):
        raise ValueError('conversation must be a list')
    for message in messages:
        if not isinstance(message, dict):
            raise ValueError('message must be an object')
        if message.get('role') not in ('user', 'assistant'):
            raise ValueError('unsupported role')
        if not isinstance(message.get('content'), str):
            raise ValueError('content must be a string')
    return messages


def load_messages(path: Path) -> list:
    try:
        content = path.read_text(encoding='utf-8')
    except FileNotFoundError:
        return []
    return validate(json.loads(content))


def save_messages(path: Path, messages: list) -> None:
    validate(messages)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with NamedTemporaryFile(mode='w', encoding='utf-8', dir=path.parent,
                                delete=False) as handle:
            temporary = Path(handle.name)
            json.dump(messages, handle, ensure_ascii=False, indent=2)
        os.replace(temporary, path)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


if __name__ == '__main__':
    from tempfile import TemporaryDirectory
    with TemporaryDirectory() as directory:
        path = Path(directory) / 'conversation.json'
        save_messages(path, [{'role': 'user', 'content': 'שלום'}])
        print(load_messages(path))

```

## קשרים במפת הידע

- [[02_CURRICULUM/2.2.0/exercises/W01D03_PYTHON_FOR_AGENT_BUILDERS_II|התרגול: Python לבוני סוכנים · חלק ב׳]] — קוד לתרגול
- [[02_CURRICULUM/2.2.0/lessons/W01D03_PYTHON_FOR_AGENT_BUILDERS_II|Python לבוני סוכנים · חלק ב׳]] — קובץ עזר לשיעור
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
