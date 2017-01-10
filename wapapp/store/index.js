// import Vue from 'vue';
// import Vuex from 'vuex';

// import * as types from './mutation-types';

// // 注册插件
// Vue.use(Vuex);


// export
// default new Vuex.Store({
// 	state: {
// 		data: []
// 	},
// 	actions: {
// 		addInfo({
// 			commit
// 		}, data) {
// 			commit(types.ADD_INFO, {
// 				txt: data.txt
// 			})
// 		},
// 		checkout({
// 			commit,
// 			state
// 		}) {
// 			commit(types.CHECKOUT_REQUEST)
// 		}
// 	},
// 	mutations: {
// 		[types.CHECKOUT_REQUEST](state) {
// 			return state.data;
// 		},
// 		[types.ADD_INFO](state, {
// 			txt
// 		}) {
// 			state.data.push(txt);
// 			console.log(txt);
// 		}
// 	}
// })