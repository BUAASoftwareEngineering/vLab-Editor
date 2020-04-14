const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		"app": './src/app.js',
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		"json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		"css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		"html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		"ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.ttf$/,
			use: ['file-loader']
		}]
	},
	externals: {
		jquery: 'jQuery'
	},
	node: {
		fs: 'empty',
		net: 'empty'
	},
	resolve: {
        alias: {
            'vscode': require.resolve('monaco-languageclient/lib/vscode-compatibility')
        },
        extensions: ['.js', '.json', '.ttf']
    }
};
