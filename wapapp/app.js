import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import FastClick from 'fastclick';

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

// ui
import Weui from 'weui';
import Swiper from 'swiper';
import VueAwesomeSwiper from './static/vue-awesome-swiper';

// import VueResource from 'vue-resource';
// import axios from 'axios';



// 注册插件
// Vue.use(VueResource);
// Vue.use(axios);
// Vue.use(VueAwesomeSwiper);

// import $ from 'jquery';
// console.log("jquery", $);

const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#gogo')

// console.log("vue", app);
// console.log("router", router);