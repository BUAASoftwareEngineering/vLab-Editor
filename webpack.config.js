const path = require('path');
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: {
		"app": './src/app.js',
	},
	output: {
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
	},
	plugins: [
		new MonacoWebpackPlugin()
	]
};
