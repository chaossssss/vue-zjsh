<template>
<div style="position:relative;background-color: #fbfbfb;">
	<div class="weui-panel weui-panel_access" v-if="hot">
		<div class="weui-panel__hds">
			<img class="pic-hot" src="../../static/images/pic-hot.png" alt="">
			<span class="hot">{{hot.TypeName}}</span>
		</div>
		<div class="weui-panel__bd">
			<div class="weui-grids">
				<a href="javascript:;" @click="routerTo(item)" class="weui-grid" v-for="item in hotSlide" >
            <div class="weui-grid__icon">
                <img :src="item.Icon1"  alt="">
            </div>
            <p class="weui-grid__label">{{item.TypeName}}</p>
        </a>
			</div>
		</div>
	</div>

	<!-- 家政 -->
	<div class="vue-slider green" v-if="housekeep">
		<div class="vue-slider__hd">
			<div class="box">
				<img style="width:20px;" :src="housekeep.Icon1" alt="">
				<p>{{housekeep.TypeName}}</p>
			</div>
		</div>
		<div class="swiper-container">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide">
						<span class="box" @click="routerTo(item)" v-if="index < 6" v-for="(item,index) in housekeepSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 6 && index < 12" v-for="(item,index) in housekeepSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 12 && index < 18" v-for="(item,index) in housekeepSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 18 && index < 24" v-for="(item,index) in housekeepSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	    </div>
	   <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
	    	<span class="swiper-pagination-bullet green"></span>
	  	</div>
		</div>
	</div>
	
	<!-- 装修 -->
	<div class="vue-slider pink" v-if="decoration">
		<div class="vue-slider__hd">
			<div class="box">
				<img style="width:20px;" :src="decoration.Icon1" alt="">
				<p class="pink">{{decoration.TypeName}}</p>
			</div>
		</div>
		<div class="swiper-container">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide">
						<span class="box" @click="routerTo(item)" v-if="index < 6" v-for="(item,index) in decorationSlide">
							<span class="content" >{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 6 && index < 12" v-for="(item,index) in decorationSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	    </div>
	   <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
	    	<span class="swiper-pagination-bullet green"></span>
	  	</div>
		</div>
	</div>

	<!-- 维修 -->
	<div class="vue-slider purple" v-if="fix">
		<div class="vue-slider__hd">
			<div class="box">
				<img style="width:20px;" :src="fix.Icon1" alt="">
				<p class="purple">{{fix.TypeName}}</p>
			</div>
		</div>
		<div class="swiper-container">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide">
						<span class="box" @click="routerTo(item)" v-if="index < 6" v-for="(item,index) in fixSlide">
							<span class="content" >{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 6 && index < 12" v-for="(item,index) in fixSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 12 && index < 18" v-for="(item,index) in fixSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 18 && index < 24" v-for="(item,index) in fixSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	    </div>
	   <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
	    	<span class="swiper-pagination-bullet green"></span>
	  	</div>
		</div>
	</div>

	<!-- 便民 -->
	<div class="vue-slider red" v-if="convenient">
		<div class="vue-slider__hd">
			<div class="box">
				<img style="width:20px;" :src="convenient.Icon1" alt="">
				<p class="red">{{convenient.TypeName}}</p>
			</div>
		</div>
		<div class="swiper-container">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide">
						<span class="box" @click="routerTo(item)" v-if="index < 6" v-for="(item,index) in convenientSlide">
							<span class="content" >{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 6 && index < 12" v-for="(item,index) in convenientSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 12 && index < 18" v-for="(item,index) in convenientSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 18 && index < 24" v-for="(item,index) in convenientSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 24 && index < 30" v-for="(item,index) in convenientSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	    </div>
	   <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
	    	<span class="swiper-pagination-bullet green"></span>
	  	</div>
		</div>
	</div>
	
	<!-- 安装 -->
	<div class="vue-slider orange" v-if="install">
		<div class="vue-slider__hd">
			<div class="box">
				<img style="width:20px;" :src="install.Icon1" alt="">
				<p class="orange">{{install.TypeName}}</p>
			</div>
		</div>
		<div class="swiper-container">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide">
						<span class="box" @click="routerTo(item)" v-if="index < 6" v-for="(item,index) in installSlide">
							<span class="content" >{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 6 && index < 12" v-for="(item,index) in installSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 12 && index < 18" v-for="(item,index) in installSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 18 && index < 24" v-for="(item,index) in installSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	        <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 24 && index < 30" v-for="(item,index) in installSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	         <div class="swiper-slide">
	        	<span class="box" @click="routerTo(item)" v-if="index >= 30 && index < 36" v-for="(item,index) in installSlide">
							<span class="content">{{item.TypeName}}</span> 
						</span>
	        </div>
	    </div>
	   <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
	    	<span class="swiper-pagination-bullet green"></span>
	  	</div>
		</div>
	</div>


<!-- 选择四级 -->
<div class="js_dialog" id="iosDialog1" v-show="showDialog">
    <div class="weui-mask" @click="showDialog = false"></div>
    <div class="weui-dialog">
        <div class="vue-dialog__bd">
        	<p class="content" style="background-color:#27b8f3;color:#fff;">{{dialog.TypeName}}</p>
        	<p class="content" @click="routerTo(item)" v-for="item in dialog.Children">{{item.TypeName}}</p>   	
        </div>
    </div>
</div> 	

<!-- 错误提示 -->
<div class="js_dialog" id="iosDialog2" v-show="isError">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__bd">{{errorMsg}}</div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="isError = false">朕 知道了!</a>
        </div>
    </div>
</div> 	
</div>
</div>	
</template>
<script>
import {mapState} from 'vuex';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
	name:"choose_service_type",
	data(){
		return {
			hot:{},	// 热门
			housekeep:{}, // 家政 170
			decoration:{},	// 装修 172
			fix:{},	// 维修 171
			convenient:{},	// 便民 169
			install:{},	// 安装 168
			hotSlide:{}, // 热门
			housekeepSlide:{}, // 家政滑块
			decorationSlide:{},	// 装修滑块
			fixSlide:{},	// 维修滑块
			convenientSlide:{},	// 便民滑块
			installSlide:{},	// 安装滑块
			isError:false,
      errorMsg:"",
      showDialog:false,
      dialog:""
	  }
  },
  mounted() {
	  let mySwiper = new Swiper ('.swiper-container', {
	    // autoplay: 5000,//可选选项，自动滑动
	    pagination: '.swiper-pagination',
	    paginationType : 'bullets'
	  })  

	  // 重构 含有1，2级别；1，2，3级别；1，3，4级别
	  function reconsitution(arry){
	  	let install_list = arry.Children.map(function(x,i,arry){
				if(x.Children){ // 是否存在三级
					let result = {};
					let two_list = JSON.parse(JSON.stringify(x));
					//  不含四级的 三级对象
					let two = x.Children.map(function(z,i,arry){
						if(z.Children){ // 是否存在四级
							
						}else{
							return z;
						}
					})
					// two_list.Children = two;
					// console.log(two);
					// 含有四级的 三级对象
					let three = x.Children.map(function(y,i,arry){
						if(y.Children){ // 是否存在四级
							return y;
						}
					})
					let combine = two.concat(three); 
					// console.log(combine);
					return combine;
				}else{
					return x;
				}
			})
			return install_list;
	  }
	  // 二维数组扁平化&去除undefined
	  function delayering(arry){
	  	let newArry = [];
	  	arry.map(function(v,i,arry){
	  		if(Array.isArray(v)){
	  			v.map(function(x,i,arry){
	  				if(typeof x === "object"){
	  					newArry.push(x);
	  				}
	  			})
	  		}else{
	  			newArry.push(v);
	  		}
	  	})
	  	return newArry;
	  }

	  axios.post(API.InfoListEx,qs.stringify({
    }),{
      headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }).then((res)=>{
      console.log(res.data);
      if(res.data.Meta.ErrorCode === '0'){
        res.data.Body.map((v,i,arry)=> {
        	switch (v.TypeId){
        		case '0':
        			this.hot = v;
        			let hot_list = reconsitution(v);
        			this.hotSlide = delayering(hot_list);
        			break;
        		case '168':
        			this.install = v;
        			let install_list = reconsitution(v);
        			this.installSlide = delayering(install_list);
        			break;
        		case '169':
        			this.convenient = v;
        			let convenient_list = reconsitution(v);
        			this.convenientSlide = delayering(convenient_list);
        			break;
        		case '170':
        			this.housekeep = v;
        			let housekeep_list = reconsitution(v);
        			this.housekeepSlide = delayering(housekeep_list);
        			break;
        		case '171':
        			this.fix = v;
        			let fix_list = reconsitution(v);
        			this.fixSlide = delayering(fix_list);
        			break;
        		case '172':
        			this.decoration = v;
        			let decoration_list = reconsitution(v);
        			this.decorationSlide = delayering(decoration_list);
        			break;
        		default:
        			console.log("接口错误");
        			break;
        	}
        });     
      }else{
        this.isDelete = false;
        this.isError = true;
        this.errorMsg = res.data.Meta.ErrorMsg;
      }
    }).catch(function (error) {
      console.log(error);
      this.isError = true;
      this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
    }); 
  },
	methods: {
		setQuickShop(){
			this.$store.dispatch('setQuickShop',{
				txt: this.quickShop
			})
		},
		routerTo(item){
			if(item.Children){
				this.showDialog = true;
				this.dialog = item;
			}else{
				this.quickShop.ServiceTypeId = item.TypeId;
				this.quickShop.ServiceTypeName = item.TypeName;
				this.setQuickShop();
				this.$router.push({path:'/quick_order'});
			}	
		}
  },
  computed:mapState(['Token','quickShop'])
}	
</script>
<style scoped>
.swiper-container {
  box-sizing: border-box;
	height: 90px;
	flex:1;
	width:100%;
} 
.weui-panel:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 0px solid #E5E5E5;
  color: #E5E5E5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-panel__hds {
	line-height:20px;
	padding:10px;
	position: relative;
}
.weui-panel__hds .pic-hot {
	position:absolute;
	width:20px;
	top:50%;
	transform:translateY(-50%);
}
.weui-panel__hds .hot {
	padding-left:30px;
	color:#e94b14;
	font-size:14px;
}
.weui-panel__bd {
	padding-left: 10px;
}
.weui-panel:after {
	content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #E5E5E5;
  color: #E5E5E5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-grid:before {
  content: " ";
  position: absolute;
  right: 0;
  top: 15px;
  width: 1px;
  bottom: 15px;
  border-right: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.weui-grids:after {
	content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 0px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.vue-slider {
	border-left: 2px solid transparent;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	background-color: #fff;
	position: relative;
	margin-top: 10px;
	height:96px;
	font-size:14px;
}
.green {
	color: #11b87b;
}
.pink {
	color: #f82b4b;
}
.red {
	color: #ee2c09;
}
.orange {
	color: #fd792a;
}
.purple {
	color: #955ae8;
}
.vue-slider.green {
	border-left-color: #11b87b;
}
.vue-slider.pink {
	border-left-color: #f82b4b;
}
.vue-slider.red {
	border-left-color: #ee2c09;
}
.vue-slider.orange {
	border-left-color: #fd792a;
}
.vue-slider.purple {
	border-left-color: #955ae8;
}
.vue-slider__hd {
	position: relative;
	width:65px;
	text-align: center;
	box-sizing: border-box;
}
.vue-slider__hd:before {
	content: " ";
  position: absolute;
  right: 0;
  top: 10px;
  width: 1px;
  bottom: 10px;
  border-right: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.vue-slider__hd .box {
	position: absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
}
.swiper-slide {
	display: flex;
	flex-wrap: wrap;
}
.swiper-slide .box{
	width:33%;
	box-sizing: border-box;
	height: 45px;
	color:#000;
	text-align: center;
	position: relative;
}
.swiper-slide .box .content {
	position: absolute;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
	width: 100%;
}
.vue-dialog__bd {
	padding:0;
	font-size: 14px;
}
.vue-dialog__bd .content {
	line-height: 40px;
	position: relative;
}
.vue-dialog__bd .content:before {
	content:" ";
	position: absolute;
	bottom: 0;
	left: 0;
	border-bottom: 1px solid #d5d5d6;
	height: 1px;
	width: 100%;
	color:#d5d5d6;
	-webkit-transform-origin:0 0;
	transform-origin: 0 0;
	-webkit-transform:scaleY(0.5);
	transform: scaleY(0.5);
}
</style>
<style scoped>
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
	bottom: -6px;
}
.swiper-pagination-bullet-active {
	background:#11b87b;
}
.weui-btn_disabled.weui-btn_primary {
	background-color: #27b8f3;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  color: rgba(255, 255, 255, 0.6);
  background-color: #27b8f3;
}
.weui-btn_primary {
	background-color: #27b8f3;
}
.weui-icon-success {
	color:#27b8f3;
} 
.weui-dialog__btn_primary{
	color: #27b8f3
}
</style>