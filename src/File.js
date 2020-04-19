import { defaultCode_language } from './DefaultCodes.js';
import { addNewEditor, getCode } from './Editor.js';
import * as webapi from './assets/api';

import { project_id } from './app';

const ext2lang = new Map([
    ['js', 'javascript'],
    ['ts', 'typescript'],
    ['json', 'json'],
    ['c', 'cpp'],
    ['cpp', 'cpp'],
    ['h', 'cpp'],
    ['hpp', 'cpp'],
    ['py', 'python'],
    ['txt', 'plaintext']
]);

function filePath2lang(filePath) {
    let index= filePath.lastIndexOf(".");
    var lang;
    if (index !== -1) {
        let ext = filePath.substr(index + 1);
        lang = ext2lang.get(ext);
        if (typeof lang == "undefined") {
            lang = 'plaintext';
        }
    } else {
        lang = 'plaintext';
    }
    return lang;
}

var editor2path = new Map();


export async function openFile(filePath) {
    let language = filePath2lang(filePath);
    let file_content = await new Promise((resolve) => {
		webapi.default.file_content(project_id, "test_editor.cpp", (obj) => {
			console.log("file_content: ", obj);
			resolve(obj);
		});
    });

    var editor = addNewEditor(file_content.data['content'], language);
    editor2path.set(editor, filePath);
    return editor;
}

export async function saveFile(editor) {
    let content = getCode(editor);
    let filePath = editor2path.get(editor);

    let file_update = await new Promise((resolve) => {
		webapi.default.file_update(project_id, filePath, content, (obj) => {
			console.log("file_update: ", obj);
			resolve(obj);
		});
    });
}

export function closeFile(editor) {
    editor2path.delete(editor);
}