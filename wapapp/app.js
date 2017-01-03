import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import Weui from 'weui';
import $ from 'jquery';
// console.log("jquery", $);

// 注册插件

const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#gogo')