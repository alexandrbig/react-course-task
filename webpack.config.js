const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: ["./src/main.js"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader"
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					//                    'style-loader',
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: false
						}
					}
				]
			},
			{
				test: /\.svg$/,
				loader: 'raw-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: "./index.html", favicon: 'favicon.ico',}),
		new MiniCssExtractPlugin({})
	],
	devServer: {
		historyApiFallback: true
	},
	watch: true
};
