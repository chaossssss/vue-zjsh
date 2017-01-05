const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');
const baseConfig = {
	_entry: {
		app: config.srcDir + '/app.js'
	},
	_output: {
		filename: 'scripts/[name].js',
		path: config.buildDir + '/assets',
		publicPath: '/assets'
	},
	_module: {
		rules: [{
			test: /\.vue?$/,
			include: [
				path.resolve(config.srcDir)
			],
			exclude: [
				path.resolve(__dirname, '../node_modules')
			],
			loader: 'vue-loader',
			options: {
				loaders: {
					css: ExtractTextPlugin.extract({
						loader: 'css-loader',
						fallbackLoader: 'vue-style-loader'
					})
				}
			}
		}, {
			test: /\.(png|gif|jpe?g)$/,
			loader: 'url-loader',
			query: {
				/*
				 *  limit=10000 ： 10kb
				 *  图片大小小于10kb 采用内联的形式，否则输出图片
				 * */
				limit: 10000,
				name: '/img/[name]-[hash:8].[ext]'
			}
		}, {
			test: /\.(eot|woff|woff2|ttf|svg)$/,
			loader: 'url-loader',
			query: {
				limit: 5000,
				name: '/font/[name]-[hash:8].[ext]'
			}
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.sass$/,
			loader: 'sass-loader',
			exclude: '/node_modules/'
		}, {
			test: /\.less$/,
			loader: 'less-loader',
			exclude: '/node_modules/'
		}]
	},
	_resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
};
module.exports = baseConfig;