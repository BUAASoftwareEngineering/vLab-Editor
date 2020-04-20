import "./style.css"

import * as appearance from './Appearances.js';
import * as File from './File';
import * as webapi from './assets/api';

class MonacoApp {
	constructor(project_info_data_element, BASE_DIR) {
		this.currentProject = project_info_data_element;
		this.BASE_DIR = BASE_DIR;
		this.wsUrl = "ws://" + this.currentProject.ip + ":" + this.currentProject.languagePort;
		appearance.setTheme('xcode-default');
	}

	async addEditor(filePath, newlyCreated = true) {
		var editor = await File.openFile(this.currentProject.projectId, filePath, this.BASE_DIR, this.wsUrl, newlyCreated);
		editor.onDidChangeModelContent((e) => {
			File.saveFile(this.currentProject.projectId, editor, filePath);
		});
		return editor;
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
	await new Promise((resolve) => {
		webapi.default.project_enter(project_now.projectId, (obj) => {
			console.log("project_enter: ", obj);
			resolve(obj);
		});
	});

	const testFilePath = "/code/test_editor.cpp";

	// CREATE A FILE
	let file_new = await new Promise((resolve) => {
		webapi.default.file_new(project_now.projectId, testFilePath, (obj) => {
			console.log("file_new: ", obj);
			resolve(obj);
		});
	});

	let app = new MonacoApp(project_now, "/code/");
	app.addEditor(testFilePath, file_new.code == 0 ? true : false);  // code == 0 --> newly created, else --> already exists
	
	`
	webapi.default.project_exit(project_now.projectId, (obj) => {
		console.log("project_exit: ", obj);
		resolve(obj);
	});
	`
}
demo();