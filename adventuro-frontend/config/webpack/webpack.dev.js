const path = require("path"),
	merge = require("webpack-merge");
CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackCommonSettings = require("./webpack.common");

module.exports = merge.smartStrategy({
	output: "append",
	plugins: "append"
})(webpackCommonSettings, {
	mode: "development",
	devtool: "inline-source-map",
	target: "web",
	devServer: {
		contentBase: [
			path.resolve(process.cwd(), "test"),
			path.resolve(process.cwd(), "dist")
		],
		historyApiFallback: { index: "/" },
		hot: true,
		stats: {
			colors: true,
			hash: false,
			version: false,
			chunks: false
		},
		port: 3001,
		open: true,
		disableHostCheck: true,
		openPage: ""
	},
	module: {
		rules: []
	}
});
