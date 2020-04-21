import * as monaco from 'monaco-editor';
import { listen } from 'vscode-ws-jsonrpc';
import {
    MonacoLanguageClient, CloseAction, ErrorAction,
    MonacoServices, createConnection
} from 'monaco-languageclient';
const ReconnectingWebSocket = require('reconnecting-websocket');

var connected = false;

export function getCppReady(editor, BASE_DIR, url) {

    monaco.languages.register({
        id: 'cpp',
        extensions: ['.cpp', '.c', '.h', '.hpp'],
        aliases: ['cpp', 'CPP', 'c', 'C'],
    });

    MonacoServices.install(editor, {
        rootUri: BASE_DIR
    });

    console.log("using Web Socket URL = ", url);
    if (!connected) {
        const webSocket = createWebSocket(url);
        listen({
            webSocket,
            onConnection: connection => {
                console.log("onConnection!")
                connected = true;
                // create and start the language client
                const languageClient = createLanguageClient(connection);
                const disposable = languageClient.start();
                connection.onClose(() => disposable.dispose());
            }
        });
    }
}


function createWebSocket(url) {
    const socketOptions = {
        maxReconnectionDelay: 10000,
        minReconnectionDelay: 1000,
        reconnectionDelayGrowFactor: 1.3,
        connectionTimeout: 10000,
        maxRetries: Infinity,
        debug: false
    };
    return new ReconnectingWebSocket(url, [], socketOptions);
}

function createLanguageClient(connection) {
    return new MonacoLanguageClient({
        name: "Sample Language Client",
        clientOptions: {
            // use a language id as a document selector        
            documentSelector: ['cpp'],
            // disable the default error handler            
            errorHandler: {
                error: () => ErrorAction.Continue,
                closed: () => CloseAction.DoNotRestart
            },
        },
        // create a language client connection from the JSON RPC connection on demand
        connectionProvider: {
            get: (errorHandler, closeHandler) => {
                return Promise.resolve(createConnection(connection, errorHandler, closeHandler));
            }
        }
    });
}
