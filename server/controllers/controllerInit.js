'use strict'
import index from './indexController';
const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', index.index());
			_.get('/url', index.getUrl());
			_.get('/view.html', index.view());
		}));
	}
};
export
default controllerInit;