export function setLineNumberOnOff(editor, option) {
	// option === 'on' / 'off'
	if (option === 'on' || option === 'off') {
		editor.updateOptions({ lineNumbers: option });
	}
}

export function setMinimapOnOff(editor, option) {
	// option === 'on' / 'off'
	if (option === 'on') {
		editor.updateOptions({ minimap: { enabled: true } });
	} else if (option === 'off') {
		editor.updateOptions({ minimap: { enabled: false } });
	}
}

export function setFontSize(editor, size) {
	editor.updateOptions({ fontSize: size });
}

export function setFontFamily(editor, family) {
	editor.updateOptions({ fontFamily: family });
}

export function setLanguage(editor, lang) {
	monaco.editor.setModelLanguage(editor.getModel(), lang);
}

export var themes = {
	"active4d": "Active4D",
	"all-hallows-eve": "All Hallows Eve",
	"amy": "Amy",
	"birds-of-paradise": "Birds of Paradise",
	"blackboard": "Blackboard",
	"brilliance-black": "Brilliance Black",
	"brilliance-dull": "Brilliance Dull",
	"chrome-devtools": "Chrome DevTools",
	"clouds-midnight": "Clouds Midnight",
	"clouds": "Clouds",
	"cobalt": "Cobalt",
	"dawn": "Dawn",
	"dreamweaver": "Dreamweaver",
	"eiffel": "Eiffel",
	"espresso-libre": "Espresso Libre",
	"github": "GitHub",
	"idle": "IDLE",
	"katzenmilch": "Katzenmilch",
	"kuroir-theme": "Kuroir Theme",
	"lazy": "LAZY",
	"magicwb--amiga-": "MagicWB (Amiga)",
	"merbivore-soft": "Merbivore Soft",
	"merbivore": "Merbivore",
	"monokai-bright": "Monokai Bright",
	"monokai": "Monokai",
	"night-owl": "Night Owl",
	"oceanic-next": "Oceanic Next",
	"pastels-on-dark": "Pastels on Dark",
	"slush-and-poppies": "Slush and Poppies",
	"solarized-dark": "Solarized-dark",
	"solarized-light": "Solarized-light",
	"spacecadet": "SpaceCadet",
	"sunburst": "Sunburst",
	"textmate--mac-classic-": "Textmate (Mac Classic)",
	"tomorrow-night-blue": "Tomorrow-Night-Blue",
	"tomorrow-night-bright": "Tomorrow-Night-Bright",
	"tomorrow-night-eighties": "Tomorrow-Night-Eighties",
	"tomorrow-night": "Tomorrow-Night",
	"tomorrow": "Tomorrow",
	"twilight": "Twilight",
	"upstream-sunburst": "Upstream Sunburst",
	"vibrant-ink": "Vibrant Ink",
	"xcode-default": "Xcode_default",
	"zenburnesque": "Zenburnesque",
	"iplastic": "iPlastic",
	"idlefingers": "idleFingers",
	"krtheme": "krTheme",
	"monoindustrial": "monoindustrial"
};

export function setTheme(themeName) {
	fetch('/themes/' + themes[themeName] + '.json')
		.then(data => data.json())
		.then(data => {
			monaco.editor.defineTheme(themeName, data);
			monaco.editor.setTheme(themeName);
		});
}

var menus = require('monaco-editor/esm/vs/platform/actions/common/actions').MenuRegistry._menuItems;

export function removeUnnecessaryMenu() {
	var stay = [
		"editor.action.jumpToBracket",
		"editor.action.selectToBracket",
		"editor.action.revealDefinition",
		"editor.action.peekDefinition",
		"editor.action.referenceSearch.trigger",
		"editor.action.formatDocument",
		"editor.action.changeAll",
		"editor.action.clipboardCutAction",
		"editor.action.clipboardCopyAction",
		"editor.action.clipboardPasteAction",
	]

	for (let [key, menu] of menus.entries()) {
		if (typeof menu == "undefined") { continue; }
		for (let index = 0; index < menu.length; index++) {
			if (typeof menu[index].command == "undefined") { continue; }
			if (!stay.includes(menu[index].command.id)) {
				menu.splice(index, 1);
			}
		}
	}
}