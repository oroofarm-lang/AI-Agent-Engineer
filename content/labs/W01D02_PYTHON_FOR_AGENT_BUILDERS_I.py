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
