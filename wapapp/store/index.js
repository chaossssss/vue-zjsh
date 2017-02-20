import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';

// 注册插件
Vue.use(Vuex);

export
default new Vuex.Store({
	state: {
		mapFastType: "全部", // 快速选择
		mapClassType: 0, // 工人，商户按钮切换
		mapSearchInput: "", // 搜索内容查找
		mapPoint: {}, // 定位地点

		Token: "",
		userInfo: {},
		pointShop: {
			ObjectType: "", // 1 工人，2 商户
			ObjectId: "", //工人／商户 id
			ServiceTypeId: "", // 服务类别 id
			ServiceTypeName: "", // 服务类别名称
			ServiceContent: "", // 服务内容
			Total: "1", // 服务数量
			ServiceStartAt: "", // 服务开始时间
			ServiceAddressId: "", // 服务地址标识
			ServicePrice: "" // 服务价格
		},
		quickShop: {
			ServiceTypeId: "",
			ServiceTypeName: "",
			ServiceContent: "",
			Total: "1",
			ServiceStartAt: "",
			ServiceAddressId: "",
			ServicePrice: ""
		},
		orderId: ""
	},
	actions: {
		changeMap({
			commit
		}, data) {
			console.log(types.CHANGE_MAP_POINT);
			commit(types.CHANGE_MAP_POINT, {
				point: data.point
			});
		},
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
		},
		searchInput({
			commit
		}, data) {
			console.log(types.SEARCH_MAP_INPUT);
			commit(types.SEARCH_MAP_INPUT, {
				txt: data.txt
			});
		},
		setUserInfo({
			commit
		}, data) {
			console.log(types.SET_USER_INFO);
			commit(types.SET_USER_INFO, {
				txt: data.txt
			});
		},
		setToken({
			commit
		}, data) {
			console.log(types.SET_TOKEN);
			//写cookies
			function setCookie(name, value, time) {
				var strsec = getsec(time);
				var exp = new Date();
				exp.setTime(exp.getTime() + strsec * 1);
				document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
			}
			//这是有设定过期时间的使用示例：
			//s20是代表20秒
			//h是指小时，如12小时则是：h12
			//d是天数，30天则：d30
			function getsec(str) {
				var str1 = str.substring(1, str.length) * 1;
				var str2 = str.substring(0, 1);
				if (str2 == "s") {
					return str1 * 1000;
				} else if (str2 == "h") {
					return str1 * 60 * 60 * 1000;
				} else if (str2 == "d") {
					return str1 * 24 * 60 * 60 * 1000;
				}
			}
			setCookie('Token', data.txt, 'd7');
			commit(types.SET_TOKEN, {
				txt: data.txt
			});
		},
		setQuickShop({
			commit
		}, data) {
			console.log(types.SET_QUICK_SHOP);
			commit(types.SET_QUICK_SHOP, {
				txt: data.txt
			});
		},
		setPointShop({
			commit
		}, data) {
			console.log(types.SET_POINT_SHOP);
			commit(types.SET_POINT_SHOP, {
				txt: data.txt
			});
		},
		setOrderId({
			commit
		}, data) {
			console.log(types.SET_ORDER_ID);
			commit(types.SET_ORDER_ID, {
				txt: data.txt
			});
		},
	},
	mutations: {
		[types.CHANGE_MAP_POINT](state, {
			point
		}) {
			console.log(point);
			return state.mapPoint = point;
		},
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
		},
		[types.SEARCH_MAP_INPUT](state, {
			txt
		}) {
			console.log(txt);
			return state.mapSearchInput = txt;
		},
		[types.SET_USER_INFO](state, {
			txt
		}) {
			console.log(txt);
			return state.userInfo = txt;
		},
		[types.SET_TOKEN](state, {
			txt
		}) {
			console.log(txt);
			return state.Token = txt;
		},
		[types.SET_QUICK_SHOP](state, {
			txt
		}) {
			console.log(txt);
			return state.quickShop = txt;
		},
		[types.SET_POINT_SHOP](state, {
			txt
		}) {
			console.log(txt);
			return state.pointShop = txt;
		},
		[types.SET_ORDER_ID](state, {
			txt
		}) {
			console.log(txt);
			return state.orderId = txt;
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