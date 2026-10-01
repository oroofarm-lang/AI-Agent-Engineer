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
