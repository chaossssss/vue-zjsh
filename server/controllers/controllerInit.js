'use strict'
import index from './indexController';
const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', index.index());
			_.get('/view.html', index.view());

			_.get('/getAds', index.getAds());

			_.post('/login', index.login());
		}));
	}
};
export
default controllerInit;