<template>
	<div id="app" style="height:100%;">

  	<transition name="bounce">
			<router-view></router-view>
    </transition>

	</div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios';

//获取url参数
function getvl(name) {
  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
  return "";
}
// 是否是微信浏览器
function is_weixn(){  
  var ua = navigator.userAgent.toLowerCase();  
  if(ua.match(/MicroMessenger/i)=="micromessenger") {  
      return true;  
  } else {  
      return false;  
  }  
}  

export default {
  name:"app",
  data(){
    return {

    }
  },
  created(){

    if(is_weixn()){
      this.setCode(getvl("code"));
    }else{
      console.log("不是微信浏览器");
    }

    // 初始化项目获取token
    if(!this.Token){
      if(this.getCookie('Token')){
        this.$store.dispatch('setToken',{
          txt:this.getCookie('Token')
        })
      };
    }
    // 初始化获取 订单id
    if(!this.orderId){
      if(this.getSession('OrderId')){
        this.$store.dispatch('setOrderId',{
          txt: this.getSession('OrderId')
        })
      }
    }

    // 初始化获取 个人信息
    if(JSON.stringify(this.userInfo) === "{}"){
      if(this.getSession('UserInfo')){
        this.$store.dispatch('setUserInfo',{
          txt: JSON.parse(this.getSession('UserInfo'))
        })
      }
    }

    // 初始化获取 红包信息
    if(!this.coupon.CouponId){
      if(this.getSession('Coupon')){
        this.$store.dispatch('setCoupon',{
          txt:JSON.parse(this.getSession('Coupon'))
        })
      }
    }

    // 登录跳转处理
    axios.interceptors.response.use((response)=> {
      if(JSON.parse(response.request.response).Meta.ErrorCode === "2004"){
        this.$router.push({path:'/login'});
      }
      return response;
    }, function (error) {
      // Do something with response error
      return Promise.reject(error);
    });
  },
  methods:{
    getCookie(name){
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
    getSession(name){
      return sessionStorage.getItem(name);
    },
    setCode(item){
      this.$store.dispatch('setCode',{
        txt:item
      })
    }
  },
  computed:mapState(['Token','Code','orderId','userInfo','coupon'])
}
</script>

<style>
html {
  height: 100%;
  font-size: 100px;
}
body {
  height: 100%;
  font-size:14px;
}
  /*CSS reset*/
a,img,button,input,textarea,ul,li,div{-webkit-tap-highlight-color:rgba(255,255,255,0);}
/*  html::-webkit-scrollbar,
body::-webkit-scrollbar{
  width:0;
  height:0;
}*/
  #app {
    height: 100%;
  }

	.bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    /* animation: bounce-out 60ms; */
  }
  @keyframes bounce-in {
    0% {
      -webkit-transform: translate3d(100%,0,0);
      transform: translate3d(100%,0,0);
    }
    100% {
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }
  }
  @keyframes bounce-out {
    0% {
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }
    100% {
      -webkit-transform: translate3d(100%,0,0);
      transform: translate3d(-100%,0,0);
    }
  }
</style>