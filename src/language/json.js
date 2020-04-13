/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { getLanguageService, TextDocument } from "vscode-json-languageservice";
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from 'monaco-languageclient/lib/monaco-converter';
import { getModel, getModeluri } from '../Editor';

const LANGUAGE_ID = 'json';

// register the JSON language with Monaco
monaco.languages.register({
    id: LANGUAGE_ID,
    extensions: ['.json', '.bowerrc', '.jshintrc', '.jscsrc', '.eslintrc', '.babelrc'],
    aliases: ['JSON', 'json'],
    mimetypes: ['application/json'],
});


function createDocument(model) {
    return TextDocument.create(getModeluri(model), model.getModeId(), model.getVersionId(), model.getValue());
}

function resolveSchema(url) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.open("GET", url, true);
        xhr.send();
    });
    return promise;
}

const m2p = new MonacoToProtocolConverter();
const p2m = new ProtocolToMonacoConverter();
const jsonService = getLanguageService({
    schemaRequestService: resolveSchema
});
const pendingValidationRequests = new Map();

monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    provideCompletionItems(model, position, context, token) {
        const document = createDocument(model);
        const wordUntil = model.getWordUntilPosition(position);
        const defaultRange = new monaco.Range(position.lineNumber, wordUntil.startColumn, position.lineNumber, wordUntil.endColumn);
        const jsonDocument = jsonService.parseJSONDocument(document);
        return jsonService.doComplete(document, m2p.asPosition(position.lineNumber, position.column), jsonDocument).then((list) => {
            return p2m.asCompletionResult(list, defaultRange);
        });
    },

    resolveCompletionItem(model, position, item, token) {
        return jsonService.doResolve(m2p.asCompletionItem(item)).then(result => p2m.asCompletionItem(result, item.range));
    }
});

monaco.languages.registerDocumentRangeFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits(model, range, options, token) {
        const document = createDocument(model);
        const edits = jsonService.format(document, m2p.asRange(range), m2p.asFormattingOptions(options));
        return p2m.asTextEdits(edits);
    }
});

monaco.languages.registerDocumentSymbolProvider(LANGUAGE_ID, {
    provideDocumentSymbols(model, token) {
        const document = createDocument(model);
        const jsonDocument = jsonService.parseJSONDocument(document);
        return p2m.asSymbolInformations(jsonService.findDocumentSymbols(document, jsonDocument));
    }
});

monaco.languages.registerHoverProvider(LANGUAGE_ID, {
    provideHover(model, position, token) {
        const document = createDocument(model);
        const jsonDocument = jsonService.parseJSONDocument(document);
        return jsonService.doHover(document, m2p.asPosition(position.lineNumber, position.column), jsonDocument).then((hover) => {
            return p2m.asHover(hover);
        });
    }
});

export function getEditorReady(editor) {
    let model = getModel(editor);
    model.onDidChangeContent((event) => {
        validate(model);
    });
}

function validate(model) {
    const document = createDocument(model);
    cleanPendingValidation(document);
    pendingValidationRequests.set(document.uri, setTimeout(() => {
        pendingValidationRequests.delete(document.uri);
        doValidate(model, document);
    }));
}

function cleanPendingValidation(document) {
    const request = pendingValidationRequests.get(document.uri);
    if (request !== undefined) {
        clearTimeout(request);
        pendingValidationRequests.delete(document.uri);
    }
}

function doValidate(model, document) {
    if (document.getText().length === 0) {
        cleanDiagnostics(model);
        return;
    }
    const jsonDocument = jsonService.parseJSONDocument(document);
    jsonService.doValidation(document, jsonDocument).then((diagnostics) => {
        const markers = p2m.asDiagnostics(diagnostics);
        monaco.editor.setModelMarkers(model, 'default', markers);
    });
}

function cleanDiagnostics(model) {
    monaco.editor.setModelMarkers(model, 'default', []);
}