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
