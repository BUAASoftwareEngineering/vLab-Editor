export function bindChordWithAction(editor, chord1, chord2, actionID) {
	editor.addCommand(monaco.KeyMod.chord(chord1, chord2), function() {
		editor.trigger('', actionID);
	});
}

export function bindChordWithCallback(editor, chord1, chord2, func) {
	editor.addCommand(monaco.KeyMod.chord(chord1, chord2), func);
}

export function bindKeyWithAction(editor, key, actionID) {
	editor.addCommand(key, function() {
		editor.trigger('', actionID);
	});
}

export function bindKeyWithCallback(editor, key, func) {
	editor.addCommand(key, func);
}

export function defaultBindings(editor) {
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_OPEN_SQUARE_BRACKET, "editor.action.jumpToBracket");
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_CLOSE_SQUARE_BRACKET, "editor.action.selectToBracket");
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfold");
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.fold");
	bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfoldRecursively");
	bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.foldRecursively");
	bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfoldAll");
	bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.foldAll");
}