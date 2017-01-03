'use strict'
const path = require('path');
const config = {
	/*
	 * resource path
	 * （src 目录）
	 * */
	"srcDir": path.join(__dirname, '..', 'wapapp'),


	/*
	 * publish path
	 * （发布目录）
	 * */
	"buildDir": path.join(__dirname, '..', 'build'),


	/*
	 * public resource path
	 * （公共资源目录）
	 * */

	/*
	 * node_modules path
	 */
	"node_modulesPath": path.join(__dirname, '..', 'node_modules'),


	/*
	 * log所在的目录
	 * */
	"logDir": path.join(__dirname, '..', 'logs')

};
//本地配置环境
const local = {

};
//本地调试环境
if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
	config = _.extend(config, local);
}
module.exports = config;