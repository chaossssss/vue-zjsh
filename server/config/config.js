import path from 'path';

// 后端基本配置
const CONFIGMAP = new Map();
CONFIGMAP.set('port', 3000);
CONFIGMAP.set('viewDir', path.join(__dirname, '..', 'views'));
CONFIGMAP.set('logDir', path.join(__dirname, '..', 'logs'));
CONFIGMAP.set('staticDir', path.join(__dirname, '..'));

//本地Map配置
const local = () => {
	CONFIGMAP.set('apiUrl', '192.168.1.1');
};
//服务端Map配置
const server = () => {
	CONFIGMAP.set('apiUrl', '0.0.0.0');
};

process.env.NODE_ENV = "development"; //production
if (process.env.NODE_ENV === 'development') {
	local();
} else {
	server();
}

export
default CONFIGMAP;