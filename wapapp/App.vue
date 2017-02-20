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

export default {
  name:"app",
  data(){
    return {

    }
  },
  mounted(){
    // 初始化项目获取token
    if(!this.Token){
      if(this.getCookie('Token')){
        this.$store.dispatch('setToken',{
          txt:this.getCookie('Token')
        })
      };
    }

    // 登录跳转处理
    axios.interceptors.response.use(function (response) {
      
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
    }
  },
  computed:mapState(['Token'])
}
</script>

<style>
  html,body {
    height: 100%;
  }
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