import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';

// 注册插件
Vue.use(Vuex);

export
default new Vuex.Store({
	state: {
		mapFastType: "保姆",
		mapClassType: 0,
		point: ""
	},
	actions: {
		searchMap({
			commit
		}, data) {
			console.log(types.SEARCH_MAP_FAST);
			commit(types.SEARCH_MAP_FAST, {
				txt: data.txt
			});
		},
		switchMap({
			commit
		}) {
			console.log(types.SWITCH_MAP_CLASS);
			commit(types.SWITCH_MAP_CLASS);
		}
	},
	mutations: {
		[types.SEARCH_MAP_FAST](state, {
			txt
		}) {
			console.log(txt);
			return state.mapFastType = txt;
		},
		[types.SWITCH_MAP_CLASS](state) {
			let count = state.mapClassType + 1;
			if (count === 3) {
				state.mapClassType = 0;
			} else {
				state.mapClassType++;
			}
			console.log(state.mapClassType);
			return state.mapClassType;
		}
	}
})


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