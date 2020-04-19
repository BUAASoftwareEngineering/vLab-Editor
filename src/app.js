import "./style.css"
import $ from 'jquery';

import * as appearance from './Appearances.js';
import * as File from './File';
import * as webapi from './assets/api';


export var project_id = 3;

async function monacoAppEntry() {
	let project_info = await new Promise((resolve) => {
		webapi.default.project_info((obj) => {
			console.log("project_info: ", obj);
			resolve(obj);
		});
	});

	let project_enter = await new Promise((resolve) => {
		webapi.default.project_enter(project_id, (obj) => {
			console.log("project_enter: ", obj);
			resolve(obj);
		});
	});

	let file_new = await new Promise((resolve) => {
		webapi.default.file_new(project_id, "test_editor.cpp", (obj) => {
			console.log("project_id: ", obj);
			resolve(obj);
		});
	});

	var editor = await File.openFile("test_editor.cpp");
	editor.onDidChangeModelContent((e) => {
		console.log(e);
		File.saveFile(editor);
	});
	
	$(document).ready(() => {
		$(".container").keydown((event) => {
			// https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode, US keyboard, IE11 / Chrome34 / Safari7 / Gecko29
			if ((event.ctrlKey == true || event.metaKey == true) &&
				(event.which == '12' || event.which == '61' || event.which == '107' || event.which == '109' || event.which == '171' || event.which == '173' || event.which == '187' || event.which == '189')) {
				event.preventDefault();
			}
		});
	});
	
	appearance.setTheme('xcode-default');	
}

async function monacoAppExit() {
	let project_exit = await new Promise((resolve) => {
		webapi.default.project_exit(project_id, (obj) => {
			console.log("project_exit: ", obj);
			resolve(obj);
		});
	});
}

// monacoAppEntry();
monacoAppExit();