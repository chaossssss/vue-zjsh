<template>
<div>
<header class="business-info">
<i class="business-img">

</header>

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
	name:"business",
  data(){
    return{
      tab: 0,
      Htab: 0,
      us:{		// 商户详情
      	TagList:{
      		TagList:[]
      	}
      },
      ac:null,	// 商户评价列表
      avList:null, // 商户头像列表
      scroll:null,	// 滚动对象挂载
      svList:null,// 商户服务列表
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
	      console.log("商户详情",res.data);
	      if(res.data.Meta.ErrorCode === '0'){
	        this.us =res.data.Body.Business;
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
        case 0:
          this.getServiceList();
          break;
        case 1:
          this.getAssess();
          break;
        case 2:
          this.getWorkerDetail();
          break;
        default:
          break;
      }
  	},
  	getServiceList(){
  		window.scrollTo(0,0);
			axios.post(API.GetMerchantServicePriceListEx,qs.stringify({
		    "Token": this.Token,
		    "Id": this.objectInfo.Id
		  }),{
		    headers: {'Content-Type':'application/x-www-form-urlencoded'}
		  }).then((res)=>{
		    console.log("商户服务列表",res.data);
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
		    "Type": '2',
		    "Id": this.objectInfo.Id
		  }),{
		    headers: {'Content-Type':'application/x-www-form-urlencoded'}
		  }).then((res)=>{
		    console.log("商户头像列表",res.data);
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
  	},
  	routerToOrder(){
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

</style>
