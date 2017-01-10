'use strict'
import request from 'superagent';

const indexController = {
	index() {
		return async(ctx, next) => {
			ctx.body = {
				username: 'success',
				age: 20
			}
		}
	},
	view() {
		return async(ctx, next) => {
			await ctx.render('view.html');
		}
	},
	getUrl() {
		return async(ctx, next) => {
			var promise = await request.get('http://192.168.1.191:3001/api/v3/Provider/GetAds');
			ctx.body = {
				success: promise
			}
		}
	}
};
export
default indexController;