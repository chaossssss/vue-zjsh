import "babel-core/register";
import 'babel-polyfill'; //使用到async await必须引入，最好在第一行
import Koa from 'koa';
import router from 'koa-simple-router';
import convert from 'koa-convert'; //koa1 转换器
import logger from 'koa-logger';
import serve from 'koa-static';
import views from 'koa-views';
import mongo from 'koa-mongo';
import koaBody from 'koa-bodyparser';
import historyApiFallback from 'koa-history-api-fallback';
import config from './config/config';
import controllers from './controllers/controllerInit';


const app = new Koa();
// 日志
app.use(logger());
// 静态资源文件
// app.use(convert(serve(config.get('staticDir'))));

// 视图文件
app.use(views(config.get('viewDir')));

// 请求body解析
app.use(koaBody());

//初始化controllers
controllers.getAllrouters(app, router);

app.use(ctx => {
	console.log(ctx);
	ctx.body = 'Hello Koa';
});



app.listen(config.get('port'));
console.log("服务运行在端口 http://localhost:", config.get('port'));

export
default app;