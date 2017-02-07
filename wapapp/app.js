import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// ui
import Weui from 'weui';

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

console.log("vue", app);
console.log("router", router);