import "./style.css"

import * as appearance from './Appearances.js';
import * as File from './File';
import { removeUnnecessaryMenu } from './Appearances';
import * as webapi from './assets/api';

import { StandaloneCodeEditorServiceImpl } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeServiceImpl.js';
import { getCode, getCodeLength, addNewScratchEditor } from "./Editor";
import { defaultCode_language } from './DefaultCodes.js';

var overrided = false;
export var MonacoAppSingleton;

export class MonacoApp {
	constructor(project_info_data_element, BASE_DIR, author = undefined) {
		this.currentProject = project_info_data_element;
		this.BASE_DIR = BASE_DIR;
		this.authorName = author;
		this.wsUrl = "ws://" + this.currentProject.ip + ":" + this.currentProject.languagePort;
		appearance.setTheme('xcode-default');
		this.model2editor = new Map();
		removeUnnecessaryMenu();
		removeUnnecessaryMenu();
		removeUnnecessaryMenu();
	}

	async addEditor(filePath, defaultCode = true) {
		if (!overrided)
			overrideMonaco();
		var editor = await File.openFile(this.currentProject.projectId, filePath, this.BASE_DIR, this.wsUrl, defaultCode);
		editor.onDidChangeModelContent((e) => {
			File.saveFile(this.currentProject.projectId, editor, filePath);
		});
		this.model2editor.set(editor.getModel(), editor);
		return editor;
	}
}

export class MonacoAppScratch {
	constructor(language = "python", defaultCode = true, author = undefined) {
		if (defaultCode == true) {
			this.editor = addNewScratchEditor(defaultCode_language(language, author), language);
		} else {
			this.editor = addNewScratchEditor("", language);
		}
		appearance.setTheme('xcode-default');
		removeUnnecessaryMenu();
		removeUnnecessaryMenu();
		removeUnnecessaryMenu();
	}

	getEditorInstance() {
		return this.editor;
	}

	getCode() {
		return getCode(this.editor);
	}

	getCodeLength() {
		return getCodeLength(this.editor);
	}
}

async function demo() {

	// ENTER THE LAST PROJECT
	let project_info = await new Promise((resolve) => {
		webapi.default.project_info((obj) => {
			console.log("project_info: ", obj);
			resolve(obj);
		});
	});
	var project_now = project_info.data[project_info.data.length - 1];
	var project_enter = await new Promise((resolve) => {
		webapi.default.project_enter(project_now.projectId, (obj) => {
			console.log("project_enter: ", obj);
			resolve(obj);
		});
	});
	if (project_enter.code == 0) {
		project_now = project_enter.data;
	}

	await new Promise((r) => { setTimeout(() => { r() }, 5000) });

	const testFilePath = "/code/main.cpp";
	// const testFilePath = "/code/main.c";
	// const testFilePath = "/code/main.py";

	// CREATE A FILE
	let file_new = await new Promise((resolve) => {
		webapi.default.file_new(project_now.projectId, testFilePath, (obj) => {
			console.log("file_new: ", obj);
			resolve(obj);
		});
	});

	let app = new MonacoApp(project_now, "/code/");
	// let app = new MonacoApp(project_now, "/code/", "FuturexGO");
	MonacoAppSingleton = app;
	await app.addEditor(testFilePath, file_new.code == 0 ? true : false);  // code == 0 --> newly created, else --> already exists	
}

async function close() {
	let project_info = await new Promise((resolve) => {
		webapi.default.project_info((obj) => {
			console.log("project_info: ", obj);
			resolve(obj);
		});
	});
	var project_now = project_info.data[project_info.data.length - 1];

	webapi.default.project_exit(project_now.projectId, (obj) => {
		console.log("project_exit: ", obj);
	});
}

function scratchDemo() {
	let scratchPaper = new MonacoAppScratch("cpp", true, "FuturexGO");
	setTimeout(() => {
		console.log(scratchPaper.getCodeLength());
		console.log(scratchPaper.getCode());
	}, 10000);
}

function overrideMonaco() {
	overrided = true;

	console.log("Overriding Monaco StandaloneCodeEditorServiceImpl !");

	StandaloneCodeEditorServiceImpl.prototype.doOpenEditor = async function (editor, input) {
		let foundedModel = monaco.editor.getModel(input.resource);

		console.log("foundedModel @ Go To Definition = ", foundedModel);

		if (!foundedModel || !MonacoAppSingleton.model2editor.get(foundedModel)) {
			console.log("model have not been opened");

			if (!input.resource) {
				return null;
			}
			let filePath = input.resource.path;
			var editor = await MonacoAppSingleton.addEditor(filePath, false);
			editor.focus();
		} else {
			console.log("model have been opened");

			var editor = MonacoAppSingleton.model2editor.get(foundedModel);
			editor.focus();
		}
		var selection = input.options.selection;
		if (selection) {
			if (typeof selection.endLineNumber === 'number' && typeof selection.endColumn === 'number') {
				editor.setSelection(selection);
				editor.revealRangeInCenter(selection, 1 /* Immediate */);
			}
			else {
				var pos = {
					lineNumber: selection.startLineNumber,
					column: selection.startColumn
				};
				editor.setPosition(pos);
				editor.revealPositionInCenter(pos, 1 /* Immediate */);
			}
		}
		return editor;
	};
}
// demo();
// close();
scratchDemo();