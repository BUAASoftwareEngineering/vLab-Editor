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