import * as monaco from 'monaco-editor';
import { defaultBindings } from './Actions';
export var fileCounter = 0;

import { getPythonReady } from './language/python';
import { getCppReady } from './language/cpp';

import { MonacoAppSingleton } from './app';
import * as webapi from './assets/api';
import { filePath2lang } from './File';


export function newEditor(container_id, code, language, filePath, fileDir, wsUrlBase) {
	let uri = monaco.Uri.parse("file://" + filePath);
	var model = monaco.editor.getModel(uri);
	if (!model)
		model = monaco.editor.createModel(code, language, uri);

	let editor = monaco.editor.create(document.getElementById(container_id), {
		model: model,
		automaticLayout: true,
		glyphMargin: true,
		lightbulb: {
			enabled: true
		}
	}, {
		textModelService: {
			createModelReference: function (uri) {
				return this.getModel(uri);
			},
			registerTextModelContentProvider: function () {
				return { dispose: function () { } };
			},
			hasTextModelContentProvider: function (schema) {
				return true;
			},
			_buildReference: function (model) {
				var lifecycle = require('monaco-editor/esm/vs/base/common/lifecycle');
				var ref = new lifecycle.ImmortalReference({ textEditorModel: model });
				return {
					object: ref.object,
					dispose: function () { ref.dispose(); }
				};
			},
			getModel: function (uri) {
				var _this = this;
				return new Promise(function (resolve) {
					var model = monaco.editor.getModel(uri);
					console.log("foundedModel @ Peeking = ", model);
					if (!model) {
						if (!uri) {
							model = null;
							resolve(_this._buildReference(model));
						}
						let filePath = uri.path;
						let p = new Promise((resolve) => {
							webapi.default.file_content(MonacoAppSingleton.currentProject.projectId, filePath, (obj) => {
								resolve(obj.data['content']);
							});
						});
						p.then((code) => {
							model = monaco.editor.createModel(code, filePath2lang(filePath), uri);
							resolve(_this._buildReference(model));
						});
					} else {
						resolve(_this._buildReference(model));
					}
				});
			},
			registerTextModelContentProvider: () => { }
		}
	});

	// Language Client for IntelliSense
	if (language == 'python') {
		getPythonReady(editor, fileDir, wsUrlBase + "/python");
	}
	if (language == 'cpp') {
		getCppReady(editor, fileDir, wsUrlBase + "/cpp");
	}

	// Keyboard Shortcuts binding
	defaultBindings(editor);

	return editor;
}

export function addNewEditor(code, language, filePath, fileDir, wsUrlBase) {
	let new_container = document.createElement("DIV");
	new_container.id = "container-" + fileCounter.toString(10);
	new_container.className = "container";
	new_container.style.height = "100%"
	new_container.style.width = "100%"
	document.getElementById("editorRoot").appendChild(new_container);
	let editor = newEditor(new_container.id, code, language, filePath, fileDir, wsUrlBase);
	fileCounter += 1;
	return editor;
}

export function getModel(editor) {
	return editor.getModel();
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
	return { ln: line, col: column };
}

export function setCursorPosition(editor, ln, col) {
	let pos = { lineNumber: ln, column: col };
	editor.setPosition(pos);
}
