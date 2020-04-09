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