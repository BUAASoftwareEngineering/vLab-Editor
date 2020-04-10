import "./style.css"
import * as monaco from 'monaco-editor';

import * as actions from './Actions.js';
import * as appearance from './Appearances.js';
import * as defaultCodes from './DefaultCodes.js';
import * as editormanage from './Editor.js';

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

editormanage.addNewEditor(defaultCodes.defaultCode_js, 'javascript');
var editor = editormanage.editorArray[0];

actions.bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_OPEN_SQUARE_BRACKET, "editor.action.jumpToBracket");
actions.bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_CLOSE_SQUARE_BRACKET, "editor.action.selectToBracket");
actions.bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfold");
actions.bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.fold");
actions.bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfoldRecursively");
actions.bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.foldRecursively");
actions.bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfoldAll");
actions.bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.foldAll");

appearance.setTheme('solarized-light');