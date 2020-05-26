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
	if (language == 'cpp' || language == 'c') {
		getCppReady(editor, fileDir, wsUrlBase + "/cpp");
	}

	// Keyboard Shortcuts binding
	defaultBindings(editor);

	// Suppress CtrlCmd + S
	editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, ()=>{});

	// Auto Remove Breakpoints
	autoRemoveBreakpoints(editor);

	// Click to Toggle Breakpoints
	mouseToggleBreakpoints(editor);

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

export function addNewScratchEditor(code, language) {
	let new_container = document.createElement("DIV");
	new_container.id = "scratch";
	new_container.className = "container";
	new_container.style.height = "100%"
	new_container.style.width = "100%"
	document.getElementById("editorRoot").appendChild(new_container);

	let model = monaco.editor.createModel(code, language);
	let editor = monaco.editor.create(document.getElementById(new_container.id), {
		model: model,
		automaticLayout: true,
	});
	// Language Client for IntelliSense
	if (language == 'python') {
		getPythonReady(editor);
	}
	if (language == 'cpp' || language == 'c') {
		getCppReady(editor);
	}
	// Keyboard Shortcuts binding
	defaultBindings(editor);
	// Suppress CtrlCmd + S
	editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, ()=>{});

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

export function addBreakpoint(editor, line) {
	let model = editor.getModel();
	let value = {
		range: new monaco.Range(line, 1, line, 1),
		options: {
			isWholeLine: true,
			className: 'myContentClass',
			glyphMarginClassName: 'myGlyphMarginClass'
		}
	}
	model.deltaDecorations([], [value]);
}

export function removeBreakpoint(editor, line) {  // line is nullable, which means global
	let model = editor.getModel();
	let decorations;
	if (typeof line === "undefined") {
		decorations = model.getAllDecorations();
	} else {
		decorations = model.getLineDecorations(line);
	}
	let ids = [];
	for (let dec of decorations) {
		if (dec.options.glyphMarginClassName == "myGlyphMarginClass") {
			ids.push(dec.id);
		}
	}
	if (ids && ids.length) {
		model.deltaDecorations(ids, []);
	}
}

export function hasBreakpoint(editor, line) {  // line is nullable, which means global
	let model = editor.getModel();
	let decorations;
	if (typeof line === "undefined") {
		decorations = model.getAllDecorations();
	} else {
		decorations = model.getLineDecorations(line);
	}
	for (let dec of decorations) {
		if (dec.options.glyphMarginClassName == "myGlyphMarginClass") {
			return true;
		}
	}
	return false;
}

export function getBreakpointLines(editor) {
	let model = editor.getModel();
	let decorations = model.getAllDecorations();
	let lines = [];
	for (let dec of decorations) {
		if (dec.options.glyphMarginClassName == "myGlyphMarginClass") {
			lines.push(dec.range.startLineNumber);
		}
	}
	return lines;
}

function autoRemoveBreakpoints(editor) {
	editor.onDidChangeModelContent((e) => {
		process.nextTick(() => {
			let pos = editor.getPosition();
			if (pos) {
				let line = pos.lineNumber;
				if (editor.getModel().getLineContent(line).trim() === '') {
					removeBreakpoint(editor, line);
				} else if (hasBreakpoint(editor, line)) {
					removeBreakpoint(editor, line);
					addBreakpoint(editor, line);
				}
			}
		});
	});
}

function mouseToggleBreakpoints(editor) {
	editor.onMouseDown((e) => {
		if (e.target.detail && e.target.detail.offsetX && e.target.detail.offsetX >= 10 && e.target.detail.offsetX < 20) {
			let line = e.target.position.lineNumber;
			if (editor.getModel().getLineContent(line).trim() === '') {
				return;
			}
			if (!hasBreakpoint(editor, line)) {
				addBreakpoint(editor, line);
			} else {
				removeBreakpoint(editor, line);
			}
			document.activeElement.blur();
		}
	});
}