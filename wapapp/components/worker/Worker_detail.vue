<template>
<div>
	<header :style="{'background-image':'url('+us.Photo+')'}" style="position:fixed;top:0;left:0;z-index:3;background-color:#fff;">
		<div class="shade"></div>
		<div class="header-cont">
			<img class="head-img" :src="us.Photo">
			<div class="info f_left">
				<div class="names">
					<span class="qualification f_left">N项认证</span>
					<span class="name f_left">{{us.Name}}</span>
				</div>
				<div class="clear"></div>
				<div class="grade">接单数:{{us.OrderCount2}}&nbsp;/&nbsp;电话数:{{us.PhoneCount2}}&nbsp;/&nbsp;评分:{{us.Grade2}}</div>
				<div class="servs">
					<p class="ser-itel" v-if="us.TagList.Count > 0" v-for="item in us.TagList.TagList">{{item.TagName}}</p>
				</div>
			</div>
			<a :href="'tel:'+us.PhoneNumber"><img src="../../static/images/call.png" alt="" class="img-call f_right"></a>
			<div class="clear"></div>
			<div class="activity-list" v-if="serviceTypeRules.length > 0">
				<div class="items">
					<div class="ac-item" v-for="item in serviceTypeRules">
						<span class="ac-icon bg-o" v-if="item.ReturnType === '0'">减</span>
						<span class="ac-icon bg-r" v-if="item.ReturnType === '1'">返</span>
						<span>{{item.Help}}</span>
					</div>					
				</div>
				<div class="ac-nums f_right">{{serviceTypeRules.length}}个活动</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="clear"></div>
	</header>
	<div class="main" style="padding-top:160px;">
		<div class="tab" >
			<ul class="score">
				<li :class="{'active':tab===0}" @click="chooseTab(0)">服务</li>
				<li :class="{'active':tab===1}" @click="chooseTab(1)">评价</li>
				<li :class="{'active':tab===2}" @click="chooseTab(2)">工人</li>		
			</ul>
			<div class="clear"></div>
		</div>
		<div v-show="tab===0" id="wrapper0"  v-if="svList" style="margin-top:45px;height:calc(100vh - 205px);">
			<div class="ser-list" >
				<div class="ser-item score" v-show="items.Child.length > 0" v-for="items in svList">
					<div class="ser-title f_left">{{items.Name}}</div>
					<div class="btn-buy f_right mgtop0">购买</div>
					<div class="clear"></div>
					<div v-for="item in items.Child">
						<div class="ser-info f_left">{{item.Name}}</div>
						<div class="f_right mgtop8" style="font-size:12px;"><span class="price">￥{{item.Price}}</span></div>
						<div class="clear"></div>
					</div>	
				</div>	
				<div class="ser-item score" v-show="items.Child.length === 0" v-for="items in svList">
					<div class="ser-title f_left">{{items.Name}}</div>
					<div class="f_right" style="font-size:12px;"><span class="price">￥{{items.Price}}</span></div>
					<div class="clear"></div>
					<div class="ser-info f_left"></div>
					<div class="btn-buy f_right">购买</div>
					<div class="clear"></div>
				</div>				
			</div>
		</div>
		<div v-show="tab===1" id="wrapper1" style="margin-top:45px;height:calc(100vh - 205px);">
			<div class="pingjia-list">
				<!-- 没有评价要显示的 -->
				<div class="no-pingjia">
					<img src="../../static/images/no-pingjia.png" alt="">
					<div class="no-title">暂无评价</div>
				</div>
				<!-- 有评价要显示的 -->
				<!-- <div class="pingjia-item score" v-if="ac">
					<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="img-pingjia f_left">
					<div class="pingjia-info f_left">
						<div class="phone">
							<span class="f_left">13144***5454</span>
							<span class="f_right">2015-12-10 11:12</span>
						</div>
						<div class="clear"></div>
						<div class="xing">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
						</div>
						<div class="clear"></div>
						<div class="pingjia-cont">
							卢阿姨真的不错！卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真
						</div>
					</div>
					<div class="clear"></div>
				</div>
				<div class="pingjia-item score">
					<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="img-pingjia f_left">
					<div class="pingjia-info f_left">
						<div class="phone">
							<span class="f_left">13144***5454</span>
							<span class="f_right">2015-12-10 11:12</span>
						</div>
						<div class="clear"></div>
						<div class="xing">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
						</div>
						<div class="clear"></div>
						<div class="pingjia-cont">
							卢阿姨真的不错！卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真
						</div>
					</div>
					<div class="clear"></div>
				</div> -->
			</div>
			<!-- <img src="../../static/images/write-cont.png" alt="" class="write-cont"> -->
		</div>
		<div v-show="tab===2" id="wrapper2" style="margin-top:45px;height:calc(100vh - 205px);">
			<div class="detail-info">
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">服务信息</div>
					<div class="info-cont score">服务时间：{{us.ServiceTime}}</div>
					<div class="info-cont score">服务地址：{{us.Address}}</div>
					<div class="info-cont score">服务范围：{{us.ServiceScope}}</div>
					<div class="info-cont score" v-if="us.TagList.Count > 0">标签：
						<div class="info-tags f_right">
							<span class="info-tag" v-for="item in us.TagList.TagList">{{item}}</span>
						</div>
						<div class="clear"></div>
					</div>
					<div class="info-cont">认证：
						<img v-for="item in us.SystemCertification" :src="item.Image" alt="" class="img-rz">
					</div>
				</div>
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">工人信息</div>
					<div class="worker-info f_left score-right">	
						<div class="worker-cont">籍贯：{{us.NativeAddress}}</div>
						<div class="worker-cont">学历：{{us.Education}}</div>
						<div class="worker-cont">身高：{{us.Stature}}</div>
						<div class="worker-cont">血型：{{us.BloodType}}</div>
					</div>
					<div class="worker-info f_right">
						<div class="worker-cont">工作年限：{{us.WorkingYears}}</div>
						<div class="worker-cont">星　　座：{{us.Constellation}}</div>
					</div>
					<div class="clear"></div>
					<div class="info-sign">
						<div class="signature score">个性说明：{{us.Signature}}</div>
						<div class="signature">商户介绍：{{us.Intro}}</div>
					</div>
				</div>
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">工人照片</div>
					<div class="worker-img">
						<img v-for="item in avList" :src="item" alt="">
					</div>
				</div>
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
</template>

<script>
import { mapState } from 'vuex';
import BScroll from 'better-scroll';
import InfiniteLoading from 'vue-infinite-loading';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
	name:"worker",
  data(){
    return{
      tab: 0,
      us:{		// 工人详情
      	TagList:{
      		TagList:[]
      	}
      },
      ac:null,	// 工人评价列表
      avList:null, // 工人头像列表
      scroll:null,	// 滚动对象挂载
      svList:null,// 工人服务列表 
      isError:false,
      errorMsg:""
    }            
  },
  mounted(){
  	if(this.objectInfo.Id){
  		axios.post(API.DetailEx,qs.stringify({
	      "Token": this.Token,
	      "Type": this.objectInfo.Type,
	      "Id": this.objectInfo.Id
	    }),{
	      headers: {'Content-Type':'application/x-www-form-urlencoded'}
	    }).then((res)=>{
	      console.log("工人详情",res.data);
	      if(res.data.Meta.ErrorCode === '0'){
	        this.us =res.data.Body.Worker;
	      }else{
	        this.isError = true;
	        this.errorMsg = res.data.Meta.ErrorMsg;
	      }
	    }).catch(function (error) {
	      console.log(error);
	      this.isError = true;
	      this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
	    });
	    this.getServiceList();    
  	}
  },
  methods:{
  	chooseTab(index){
  		// 0 服务 1 评价 2 工人
  		this.tab = index;
  		switch (index) {
  			case 0 :
  				this.getServiceList();
  				break;
  			case 1 :
  				this.getAssess();
  				break;
  			case 2 :
  				this.getWorkerDetail();
  				break;
  			default :
  				break;
  		}
  	},
  	getServiceList(){
  		window.scrollTo(0,0);
			axios.post(API.GetWorkerServicePriceListEx,qs.stringify({
		    "Token": this.Token,
		    "Id": this.objectInfo.Id
		  }),{
		    headers: {'Content-Type':'application/x-www-form-urlencoded'}
		  }).then((res)=>{
		    console.log("工人服务列表",res.data);
		    if(res.data.Meta.ErrorCode === '0'){
		      this.svList = res.data.Body.ServiceTypeList;
		      this.scroll = new BScroll(document.getElementById('wrapper0'), {
					  startX: 0,
					  startY: 0
					})					
		    }else{
		      this.isError = true;
		      this.errorMsg = res.data.Meta.ErrorMsg;
		    }
		  }).catch(function (error) {
		    console.log(error);
		    this.isError = true;
		    this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
		  });
  	},
  	getAssess(){
  		window.scrollTo(0,0);
  		// axios.post(API.GetWorkerEvaluationList,qs.stringify({
		  //   "ID": this.objectInfo.Id,
		  //   "PageIndex": "10",
		  //   "PageSize": "1"
		  // }),{
		  //   headers: {'Content-Type':'application/x-www-form-urlencoded'}
		  // }).then((res)=>{
		  //   console.log("工人评价列表",res.data);
		  //   if(res.data.Meta.ErrorCode === '0'){
		  //     this.ac = res.data.Body.EvaluationList;
		  //     this.scroll = new BScroll(document.getElementById('wrapper0'), {
				// 	  startX: 0,
				// 	  startY: 0
				// 	})					
		  //   }else{
		  //     this.isError = true;
		  //     this.errorMsg = res.data.Meta.ErrorMsg;
		  //   }
		  // }).catch(function (error) {
		  //   console.log(error);
		  //   this.isError = true;
		  //   this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
		  // });
  	},
  	getWorkerDetail(){
  		window.scrollTo(0,0);
  		axios.post(API.Avatar,qs.stringify({
		    "Type": '1',
		    "Id": this.objectInfo.Id
		  }),{
		    headers: {'Content-Type':'application/x-www-form-urlencoded'}
		  }).then((res)=>{
		    console.log("工人头像列表",res.data);
		    if(res.data.Meta.ErrorCode === '0'){
					this.avList = res.data.Body.Avatars;
		    }else{
		      this.isError = true;
		      this.errorMsg = res.data.Meta.ErrorMsg;
		    }
		  }).catch(function (error) {
		    console.log(error);
		    this.isError = true;
		    this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
		  });
  	}
  },
  computed:{
  	serviceTypeRules(){
  		// 二维数组扁平化
  		let list = [];
  		if(this.us.hasOwnProperty('ActivityNgs')){
  			this.us.ActivityNgs.ServiceTypeRules.map((v,i,arry)=>{
	  			v.Details.map((x)=>{
	  				list.push(x);
	  			})
	  		}) 		
  		} 	
  		return list;	
  	},
  	...mapState(['Token','objectInfo'])
  }
}
</script>

<style scoped>
/*公用*/
li{
	list-style-type: none;
}
.clear{
	clear:both;
}
.f_left{
	float: left;
}
.f_right{
	float: right;
}
.score{
	position: relative;

}
.score:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 1px;
    bottom: 0;
    left:0;
    border-bottom: 1px solid #e4e4e4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}


/*头部*/
header{
    position: relative;
    padding: 15px;
    background-size: 100% 100%;
}
.shade{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    opacity: 0.8;
    z-index: 5;
    background: -webkit-linear-gradient(top,#2883dc,#2bc6dc);
    background:linear-gradient(top,#2883dc,#2bc6dc);
}
.header-cont{
    position: relative;
    z-index: 999;
}
.info{
	width: 60%;
}
.head-img{
	width: 80px;
	float: left;
	border-radius: 2px;
	margin-right: 10px;
}

.qualification{
    background: #ffd737;
    color: #8d6a16;
    font-size: 12px;
    padding: 0 3px;
    border-radius: 2px;
    margin-top: 4px;
}
.name{
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    margin-left: 5px;
    width: 67%;
    overflow: hidden;
    height: 28px;
}
.grade{
    font-size: 12px;
    color:#fff;
}
.servs{
    margin-top: 5px;
    overflow: hidden;
    height: 21px;
}
.ser-itel{
    float: left;
    color: #fff;
    font-size: 12px;
    border: 1px solid #fff;
    border-radius: 2px;
    margin-right: 3%;
    margin-bottom: 5%;
    padding: 0px 8px;
}
.img-call{
    width: 20px;
    margin-top: 7%;
}

.activity-list{
	color:#fff;
	font-size: 12px;
}
.ac-item,
.ac-nums{
	position: relative;
  margin-top: 12px;
}
.items{
    width: 80%;
    float: left;
    max-height:62px;
    overflow: hidden;
}
.ac-icon{
    padding: 2px;
    margin-right: 6px;
    border-radius: 3px;
}
.bg-o{
	background: #eb9268;
}
.bg-r{
	background: #eb6876;
}
/*tab框切换*/
.tab {
	position: fixed;
  background: #fff;
  top: 160px;
  width: 100%;
  z-index:3;
}
.tab ul{
	height: 45px;
}
.tab li{
	float: left;
	text-align: center;
	width: 33.3%;
	height: 45px;
	line-height: 45px;
	color: #9a9a9a;
}
.active{
    background: #f6fafb;
    color: #2bb7f4 !important;
}


/*工人服务tab*/
.ser-item,.pingjia-item{
	padding: 13px 15px;
}

.ser-info{
	font-size: 12px;
	color:#666;
	margin-top: 10px;
}
.buy{

}
.price{
	color: #fd552e;
	font-weight: bold;
}
.btn-buy{
    border: 1px solid #fd552e;
    text-align: center;
    font-size: 14px;
    color: #fd552e;
    border-radius: 3px;
    float: right;
    padding: 0px 19px;
    margin-top: 9px;
}
.mgtop0{
	margin-top: 0;
}
.mgtop8{
    margin-top: 8px;
}


/*工人评价*/
.write-cont{
	position: fixed;
    bottom: 20px;
    right: 20px;
    width: 55px;
    border-radius: 30px;
    box-shadow: 1px 1px 1px 1px #D0D0D0;
}
.img-pingjia{
    width: 40px;
    border-radius: 20px;
}
.pingjia-info{
    width: 84%;
    padding-left: 2%;
}
.phone{
	color: #999;
	font-size: 12px;
}
.xing img{
	width: 16px;
	float: left;
}
.pingjia-cont{
	color: #33373a;
	font-size: 12px;
	margin-top: 10px;
}
.no-pingjia{
	text-align: center;
  color: #989898;
	margin-top: 30%;
}
.no-pingjia img{
	width: 30%;
}


/*工人tab*/
.line{
	height: 10px;
	background: #eef2f5;
}
.info-title{
	color:#35363a;
	padding: 12px 0;
}
.info-cont{
	font-size: 14px;
    color: #666;
    padding: 12px 0;
}
.info-tag{
	display: inline-block;
	border: 1px solid #e4e9ec;
	padding: 4px 10px;
    margin-bottom: 10px;
    margin-right: 5px;
}
.img-rz{
	width: 17px;
	height:17px;
	margin-right: 6px;
	vertical-align: text-bottom;
	border-radius: 3px;
}
.info-list{
	padding: 0 15px 0 15px;
	padding-bottom: 0;
}
.worker-info{
    width: 45%;
    margin-top: 10px;
    padding-right: 10px;
}
.worker-cont{
	font-size: 14px;
    color: #666;
    padding: 3px 0;
    height: 22px;
    overflow: hidden;
}
.info-sign{
	background: #f2f6f9;
	color: #656565;
	font-size: 14px;
	margin: 15px 0 15px 0;
}
.signature{
	padding: 10px;
}
.worker-img img{
	width: 75px;
	height: 75px;
	border-radius: 5px;
	margin: 10px 5px 0px 0px;
}
.info-tags{
	width: 83%;
}
.score-right{
	position: relative;

}
.score-right:before {
    content: '';
    position: absolute;
    height: 200%;
    width: 1px;
    right: 0;
    top:0;
    border-right: 1px solid #e4e4e4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
