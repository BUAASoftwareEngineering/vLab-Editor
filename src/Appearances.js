export function setLineNumberOnOff(editor, option) {
	editor.updateOptions({lineNumbers: option});
}

export function setFontSize(editor, size) {
	editor.updateOptions({fontSize: size});
}

export function setFontFamily(editor, family) {
	editor.updateOptions({fontFamily: family});
}

export function setLanguage(editor, lang) {
	monaco.editor.setModelLanguage(editor.getModel(), lang);
}
