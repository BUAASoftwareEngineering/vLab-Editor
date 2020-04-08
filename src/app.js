import "./style.css"
import * as defaultCodes from './DefaultCodes.js';
import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css') {
			return './css.worker.bundle.js';
		}
		if (label === 'html') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
}

var fileCounter = 0;
var editorArray = [];

function newEditor(container_id, code, language) {
	let model = monaco.editor.createModel(code, language);
	let editor = monaco.editor.create(document.getElementById(container_id), {
		model: model,
	});
	editorArray.push(editor);
	return editor;
}

function addNewEditor(code, language) {
	let new_container = document.createElement("DIV");
	new_container.id = "container-" + fileCounter.toString(10);
	new_container.className = "container";
	document.getElementById("root").appendChild(new_container);
	let editor = newEditor(new_container.id, code, language);
	fileCounter += 1;
	return editor;
}

function getCode(editor) {
	return editor.getModel().getValue();
}

function getCodeLength(editor) {
	// chars, including \n, \t !!!
	return editor.getModel().getValueLength();
}

function getCursorPosition(editor) {
	let line = editor.getPosition().lineNumber;
	let column = editor.getPosition().column;
	return {ln: line, col:column};
}

function setCursorPosition(editor, ln, col) {
	let pos = {lineNumber: ln, column: col};
	editor.setPosition(pos);
}

addNewEditor(defaultCodes.defaultCode_cpp, 'cpp');