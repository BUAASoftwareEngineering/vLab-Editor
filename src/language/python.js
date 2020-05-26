import * as monaco from 'monaco-editor';
import { listen } from 'vscode-ws-jsonrpc';
import {
    MonacoLanguageClient, CloseAction, ErrorAction,
    MonacoServices, createConnection
} from 'monaco-languageclient';
const ReconnectingWebSocket = require('reconnecting-websocket');

import { python_keys } from './staticProvider';
import { getTokens } from './tokenizer';

var connected = false;

export function getPythonReady(editor, BASE_DIR, url) {

    monaco.languages.register({
        id: 'python',
        extensions: ['.py'],
        aliases: ['py', 'PY', 'python', 'PYTHON', 'py3', 'PY3', 'python3', 'PYTHON3'],
    });

    let languageService = false;
    if (typeof BASE_DIR != "undefined" && typeof url != "undefined") {
        languageService = true;
    }

    monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: function (model, position) {
            var word = model.getWordUntilPosition(position);
            var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };
            return {
                suggestions: createDependencyProposals(range, languageService, editor, word)
            };
        }
    });

    if (languageService) {
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
            documentSelector: ['python'],
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


function createDependencyProposals(range, languageService = false, editor, curWord) {
    let snippets = [
        {
            label: 'main',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "if __main__",
            insertText: 'if __name__ == "__main__":\n\t',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'printf',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "print with format",
            insertText: 'print("{${1}}".format(${2}))',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'forrange',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "for in range",
            insertText: 'for ${1:i} in range(${2:n}):\n\t',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'forenum',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "for in enumerate",
            insertText: 'for ${1:index}, ${2:value} in enumerate(${3:seq}):\n\t',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'utf8',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "encoding=utf-8",
            insertText: '# -*- coding: utf-8 -*-\n',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'defmethod',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "define a method in class",
            insertText: 'def ${1:method}(self, ${2:*args}):\n\t',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'list2d_basic',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "2D-list with built-in basic type elements",
            insertText: '[[${1:0}]*${3:cols} for _ in range(${2:rows})]',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
        {
            label: 'list2d_gen',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "2D-list when List multiplication is not safe",
            insertText: '[[${1:0} for __ in range(${3:cols})] for _ in range(${2:rows})]',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
        },
    ];
    let keys = [];
    for (const item of python_keys) {
        keys.push({
            label: item,
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: "",
            insertText: item,
            range: range
        });
    }

    let words = [];
    let tokens = getTokens(editor.getModel().getValue());
    for (const item of tokens) {
        if (item != curWord.word) {
            words.push({
                label: item,
                kind: monaco.languages.CompletionItemKind.Text,
                documentation: "",
                insertText: item,
                range: range
            });
        }
    }

    if (languageService) {
        return snippets;
    } else {
        return snippets.concat(keys).concat(words);
    }
}