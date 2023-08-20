const path = require('path'),
	webpack = require('webpack'),
	HtmlWebPackPlugin = require("html-webpack-plugin"),
	MiniCssExtractPlugin = require('mini-css-extract-plugin');
CopyWebpackPlugin = require('copy-webpack-plugin');


const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';
module.exports =
	{
		devtool: 'inline-source-map',
		entry: ['./src/index.tsx', './src/index.scss'],
		target: 'web',
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			port: 3001,
			hot: true
		},
		module: {
			rules: [
				{
					exclude: /node_modules/,
					test: /\.tsx?$/,
					use: {
						loader: "ts-loader",
						options: {
							compilerOptions: {
								"sourceMap": !isProduction,
							}
						}
					},
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader"
						}
					]
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack?-svgo,+titleProp,+ref![path]', 'url-loader?esModule=false'],
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					loader: "file-loader?name=/assets/img/[name].[ext]"
				}
			]
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx", '.css', '.scss', '.png', '.jpg']
		},
		output: {
			filename: './js/bundle.js',
			path: path.join(__dirname, 'dist')
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: "./src/index.html",
				filename: "./index.html"
			}),
			new MiniCssExtractPlugin(
				{
					filename: "./css/[name].css",
					chunkFilename: "./css/[id].css"
				}
			),
			new CopyWebpackPlugin([
				{from: 'src/assets/img', to: 'assets/img'}
			]),
		],

	};
