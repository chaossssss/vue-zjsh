import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import Weui from 'weui';

import VueResource from 'vue-resource';

Vue.use(VueResource);
// import $ from 'jquery';
// console.log("jquery", $);

// 注册插件

const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#gogo')

console.log("vue", app);
console.log("router", router);

// 右滑效果
window.onload=function(){
  window.slideUtil = function(t) {
    var s = t(".sl-content"),
      a = t(".sl-opts"),
      e = !1,
      n = !1,
      r = 0,
      i = 0,
      o = 0,
      h = 0,
      c = 0,
      l = null,
      p = a.width();
    (function() {
      s.on("touchstart", function(s) {
        l && l.parent().index() !== t(this).parent().index() && (Math.abs(h - i) < Math.abs(o - r) && s.preventDefault(), l.css("-webkit-transform", "translateX(0px)")), r = s.targetTouches[0].pageX, i = s.targetTouches[0].pageY, c = t(this).offset().left, t(this).on("touchmove", function(s) {
          var a = (s.targetTouches[0].pageY, s.targetTouches[0].pageX),
            l = a - r;
          t(this).removeClass("animated"), Math.abs(h - i) < Math.abs(o - r) ? (s.preventDefault(), 0 == c ? l > 0 ? t(this).css("-webkit-transform", "translateX(0px)") : 0 > l && (-p > l && (l = -p), t(this).css("-webkit-transform", "translateX(" + l + "px)")) : 0 > c && (e = !0, l > 0 ? l - p > 0 ? t(this).css("-webkit-transform", "translateX(0px)") : t(this).css("-webkit-transform", "translateX(" + (l - p) + "px)") : (t(this).addClass("animated"), t(this).css("-webkit-transform", "translateX(0px)")))) : n = !0
        })
      }), s.on("touchend", function(s) {
        o = s.changedTouches[0].pageX, h = s.changedTouches[0].pageY;
        var a = o - r;
        t(this).addClass("animated"), a > -20 || e || n ? (t(this).css("-webkit-transform", "translateX(0px)"), e = !1, n = !1) : (t(this).css("-webkit-transform", "translateX(" + -p + "px)"), l = t(this))
      })
    })()
  }(Zepto); 
}
