import * as monaco from 'monaco-editor';
import {defaultBindings} from './Actions';
export var fileCounter = 0;
export var editorArray = [];
export var modelToModeluri = new Map();

import { getPythonReady } from './language/python';

export function newEditor(container_id, code, language) {
	let modelUri = "inmemory://"+container_id;
	let monacoUri = monaco.Uri.parse(modelUri);
	let model = monaco.editor.createModel(code, language, monacoUri);

	let editor = monaco.editor.create(document.getElementById(container_id), {
		model: model,
		automaticLayout: true,
		scrollBeyondLastLine: false,
		glyphMargin: true,
		lightbulb: {
			enabled: true
		}
	});
	editorArray.push(editor);
	modelToModeluri.set(model, modelUri);

	// Language Client for IntelliSense
	if (language == 'python') {
		getPythonReady(editor);
	}

	// Keyboard Shortcuts binding
	defaultBindings(editor);
	
	return editor;
}

export function addNewEditor(code, language) {
	let new_container = document.createElement("DIV");
	new_container.id = "container-" + fileCounter.toString(10);
	new_container.className = "container";
	new_container.style.height = "100%"
	new_container.style.width = "100%"
	document.getElementById("editorRoot").appendChild(new_container);
	let editor = newEditor(new_container.id, code, language);
	fileCounter += 1;
	return editor;
}

export function getModel(editor) {
	return editor.getModel();
}

export function getModeluri(model) {
	return modelToModeluri.get(model);
}

export function getCode(editor) {
	return editor.getModel().getValue();
}

export function getCodeLength(editor) {
	// chars, including \n, \t !!!
	return editor.getModel().getValueLength();
}

export function getCursorPosition(editor) {
	let line = editor.getPosition().lineNumber;
	let column = editor.getPosition().column;
	return {ln: line, col:column};
}

export function setCursorPosition(editor, ln, col) {
	let pos = {lineNumber: ln, column: col};
	editor.setPosition(pos);
}
