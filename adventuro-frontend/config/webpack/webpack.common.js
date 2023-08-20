const path = require('path'),
	webpack = require('webpack'),
	dotenv = require('dotenv'),
	fs = require('fs'),
	HtmlWebPackPlugin = require("html-webpack-plugin"),
	MiniCssExtractPlugin = require('mini-css-extract-plugin');
CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const isProduction = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const isDev = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'development';

const appMode = () => {
	if (isProduction)
		return '.production';
	if (isDev)
		return '.development';
	return '';
};

const envChoice = '/environment' + appMode();

const envPath = path.join(__dirname, envChoice);

const fileEnv = fs.existsSync(envPath) ? dotenv.config({path: envPath}).parsed : '/environment';

const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
	return prev;
}, {});
module.exports =
	{
		entry: ['./src/index.tsx', './src/index.scss'],
		target: 'web',
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
			path: path.resolve(process.cwd(), 'dist')
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
				{from: 'src/manifest.json', to: './manifest.json'}
			]),
			new CopyWebpackPlugin([
				{from: 'src/assets', to: './assets'}
			]),
			// new WorkboxPlugin.GenerateSW(),
			new webpack.DefinePlugin(envKeys)
		],

	};
