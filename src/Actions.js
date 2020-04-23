export function bindChordWithAction(editor, chord1, chord2, actionID) {
	editor.addCommand(monaco.KeyMod.chord(chord1, chord2), function () {
		editor.trigger('', actionID);
	});
}

export function bindChordWithCallback(editor, chord1, chord2, func) {
	editor.addCommand(monaco.KeyMod.chord(chord1, chord2), func);
}

export function bindKeyWithAction(editor, key, actionID) {
	editor.addCommand(key, function () {
		editor.trigger('', actionID);
	});
}

export function bindKeyWithCallback(editor, key, func) {
	editor.addCommand(key, func);
}

export function defaultBindings(editor) {
	// ⌘ [		jump to bracket
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_OPEN_SQUARE_BRACKET, "editor.action.jumpToBracket");
	// ⌘ ]		select bracket
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_CLOSE_SQUARE_BRACKET, "editor.action.selectToBracket");

	// ⌘ +		expand
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfold");
	// ⌘ -		fold
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.fold");

	// ⌥ ⌘ +	expand recursively
	bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfoldRecursively");
	// ⌥ ⌘ -	fold recursively
	bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.foldRecursively");

	// ⇧ ⌘ +	expand all
	bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfoldAll");
	// ⇧ ⌘ -	fold all
	bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.foldAll");

	// ⌘ D		go to definition
	bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D, "editor.action.revealDefinition");
	// ⇧ ⌘ D	peek definition
	bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D, "editor.action.peekDefinition");
	// ⌥ ⌘ D	peek references
	bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D, "editor.action.referenceSearch.trigger");
}