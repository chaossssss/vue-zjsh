<template>
	<div id="app">

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
    // 是否是微信端打开
    if(is_weixn()){
      this.setCode(getvl("code"));
    }else{
      // console.log("不是微信浏览器");
    }

    // 翻转检测
    
    // 初始化项目获取token
    if(this.getCookie('Token')){
      this.$store.dispatch('setToken',{
        txt:this.getCookie('Token')
      })
    }

    // 获取地址进入的来源
    if(this.getSession('AddrOrigin')){
      this.$store.dispatch('setAddrOrigin',{
        txt:this.getSession('AddrOrigin')
      })
    }

    // 初始化获取 订单id
    if(!this.orderId){
      if(this.getSession('OrderId')){
        this.$store.dispatch('setOrderId',{
          txt: this.getSession('OrderId')
        })
      }
    }

    // 初始化获取 工人 商户 详情
    if(!this.objectInfo.Id){
      if(this.getSession('ObjectInfo')){
        this.$store.dispatch('setObjectInfo',{
          txt: JSON.parse(this.getSession('ObjectInfo'))
        })
      }
    }

    // 初始化获取 指定下单信息
    if(!this.pointShop.ObjectId){
      if(this.getSession('PointShop')){
        this.$store.dispatch('setPointShop',{
          txt: JSON.parse(this.getSession('PointShop'))
        })
      }
    }

    // 初始化获取 一件下单信息 (永久保存，下次一键下单需要显示)
    if(!this.quickShop.ServiceTypeId){
      if(this.getLocal('QuickShop')){
        this.$store.dispatch('setQuickShop',{
          txt: JSON.parse(this.getLocal('QuickShop'))
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

    // 微信分享
    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: '', // 必填，公众号的唯一标识
    //   timestamp: , // 必填，生成签名的时间戳
    //   nonceStr: '', // 必填，生成签名的随机串
    //   signature: '',// 必填，签名，见附录1
    //   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // });
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
    getLocal(name){
      return localStorage.getItem(name);
    },
    setCode(item){
      this.$store.dispatch('setCode',{
        txt:item
      })
    }
  },
  computed:mapState(['Token','Code','orderId','userInfo','coupon','pointShop','quickShop','objectInfo','addrOrigin'])
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  font-size:14px;
}
  /*CSS reset*/
a,img,button,input,textarea,ul,li,div{-webkit-tap-highlight-color:rgba(255,255,255,0.6);}
html::-webkit-scrollbar,
body::-webkit-scrollbar{
  width:0;
  height:0;
}
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