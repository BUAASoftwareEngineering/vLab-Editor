print("-----------------------------------------------------------------------")
print("|                     Welcome to CCLS web server!                     |")
print("|          Created by Xiang Weilai <xiangweilai99@gmail.com>          |")
print("|                      Project Visual Lab Online                      |")
print("|                             Version 1.4                             |")
print("-----------------------------------------------------------------------")

import logging
import subprocess
import threading
import argparse

from tornado import ioloop, process, web, websocket

from pyls_jsonrpc import streams

try:
    import ujson as json
except Exception:  # pylint: disable=broad-except
    import json

log = logging.getLogger(__name__)


class LanguageServerWebSocketHandler(websocket.WebSocketHandler):
    """Setup tornado websocket handler to host an external language server."""

    writer = None

    def open(self, *args, **kwargs):
        log.info("Spawning ccls subprocess")

        # Create an instance of the language server
        proc = process.Subprocess(
            ['ccls', '--init={"capabilities": {"foldingRangeProvider": false}, "index": {"onChange": true, "trackDependency":2}, "clang": {"resourceDir": "/home/CppLanguageServer/clang+llvm-10.0.0-x86_64-linux-gnu-ubuntu-18.04/lib/clang/10.0.0"}}'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE
        )

        # Create a writer that formats json messages with the correct LSP headers
        self.writer = streams.JsonRpcStreamWriter(proc.stdin)

        # Create a reader for consuming stdout of the language server. We need to
        # consume this in another thread
        def consume():
            # Start a tornado IOLoop for reading/writing to the process in this thread
            ioloop.IOLoop()
            reader = streams.JsonRpcStreamReader(proc.stdout)
            reader.listen(lambda msg: self.write_message(json.dumps(msg)))

        thread = threading.Thread(target=consume)
        thread.daemon = True
        thread.start()

    def on_message(self, message):
        """Forward client->server messages to the endpoint."""
        # print(message)  # non-ascii characters cannot be printed, thus cause infinite exception & re-starting
        self.writer.write(json.loads(message))

    def check_origin(self, origin):
        return True


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", type=str, default="127.0.0.1")
    parser.add_argument("--port", type=int, default=3000)
    args = parser.parse_args()
    app = web.Application([
        (r"/cpp", LanguageServerWebSocketHandler),
    ])
    print("Started Web Socket at ws://{}:{}/cpp".format(args.host, args.port))
    app.listen(args.port, address=args.host)
    ioloop.IOLoop.current().start()
