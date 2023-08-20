const path = require('path'),
	merge = require('webpack-merge');
CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackCommonSettings = require('./webpack.common');

module.exports = merge.smartStrategy({
	output: 'append',
	plugins: 'append',
})(webpackCommonSettings,
	{
		mode: 'production',
		devtool: 'fastest',
		target: 'web',
		module: {
			rules: []
		}

	});
