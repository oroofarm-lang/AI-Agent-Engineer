---
generated: true
schema_version: 1
kind: "asset"
entity_id: "HTTP_LAB"
curriculum_version: "2.2.0"
source_path: "content/labs/W01D04_HTTP_APIS.py"
asset_kind: "exercise-code"
source_sha256: "14fd49ccdccbc488f8a932d61f01b25a0e88b9956dfa0e9b7994b96114f489f9"
related: ["[[02_CURRICULUM/2.2.0/exercises/W01D04_HTTP_APIS]]","[[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# תרגיל HTTP

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/labs/W01D04_HTTP_APIS.py)

סוג הקובץ: `exercise-code`. נתיב במאגר הציבורי: `content/labs/W01D04_HTTP_APIS.py`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
"""A local HTTP lab: two endpoints, rate limit, bad JSON and a missing route."""
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from urllib.request import urlopen


class LabHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        routes = {'/customer': {'id': 'C1', 'name': 'Demo customer'},
                  '/product': {'id': 'P1', 'name': 'Demo product'}}
        if self.path in routes:
            status, body = 200, json.dumps(routes[self.path]).encode()
        elif self.path == '/limited':
            status, body = 429, b'{"error":"rate_limited"}'
        elif self.path == '/invalid':
            status, body = 200, b'not-json'
        else:
            status, body = 404, b'{"error":"not_found"}'
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        if status == 429:
            self.send_header('Retry-After', '1')
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass


def fetch(base: str, endpoint: str) -> dict:
    with urlopen(base + endpoint, timeout=2) as response:
        data = json.loads(response.read().decode('utf-8'))
    if not isinstance(data, dict):
        raise ValueError('expected JSON object')
    return {'source': endpoint, 'data': data}


if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 0), LabHandler)
    worker = Thread(target=server.serve_forever, daemon=True)
    worker.start()
    try:
        base = f'http://127.0.0.1:{server.server_port}'
        print(fetch(base, '/customer'))
        print(fetch(base, '/product'))
    finally:
        server.shutdown()
        server.server_close()
        worker.join()

```

## קשרים במפת הידע

- [[02_CURRICULUM/2.2.0/exercises/W01D04_HTTP_APIS|התרגול: HTTP וממשקי API]] — קוד לתרגול
- [[02_CURRICULUM/2.2.0/lessons/W01D04_HTTP_APIS|HTTP וממשקי API]] — קובץ עזר לשיעור
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
