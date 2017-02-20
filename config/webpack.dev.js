const path = require('path');

const webpack = require('webpack');

const webpackBase = require('./webpack-base');

const config = require('./config');

/*
 * create html
 * （创建html文件）
 * */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * extract css
 * （提取css文件）
 * */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devConfig = {
	entry: webpackBase._entry,
	output: webpackBase._output,
	module: webpackBase._module,
	resolve: webpackBase._resolve,
	devServer: {
		contentBase: './build',
		hot: true,
		inline: true,
		historyApiFallback: true
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'scripts/[name].bundle.js'
		}),
		new ExtractTextPlugin('styles/[name].css'),
		new HtmlWebpackPlugin({
			template: config.srcDir + '/index.html',
			filename: config.buildDir + '/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
		// new webpack.BannerPlugin('This file is created by laoqiren')
		// // enable HMR globally
		// new webpack.NamedModulesPlugin()
		// prints more readable module names in the browser console on HMR updates
	],
	externals: {
		BMap: 'BMap',
		Swiper: 'Swiper'
	},
	// watch: true,
	// watchOptions: {
	// 	ignored: "node_modules",
	// 	aggregateTimeout: 1000,
	// 	poll: true,
	// 	poll: 500
	// }
};
module.exports = devConfig;