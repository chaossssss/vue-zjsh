var DevWebpack = require('./config/webpack.dev');
var ProdWebpack = require('./config/webpack.prod');
switch (process.env.NODE_ENV) {
	case 'dev':
		console.log('开发模式');
		module.exports = DevWebpack;
		break;
	case 'prod':
		console.log('发布模式');
		module.exports = ProdWebpack;
		break;
	default:
		console.log('开发模式');
		module.exports = DevWebpack;
}