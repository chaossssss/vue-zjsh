<template>
<div style="position:relative;background-color: #fff;">
	<div class="vue-cells__title">
		{{pointShop.ObjectName}}&nbsp;为您提供以下服务
	</div>
	<div class="vue-cells">
		<div @click="routeToOrder(item)" class="vue-cell" :class="{'blue':item.ServiceTypeId === pointShop.ServiceTypeId}" v-for="item in serviceTypeList">
			<div class="vue-cell__bd">
				{{item.ServiceTypeName}}
			</div>
      <div class="vue-cell__ft" v-if="item.IsNegotiable === '0'">
        {{item.Price}}/{{item.UnitName}}
      </div>
			<div class="vue-cell__ft" v-if="item.IsNegotiable === '1'">
				{{item.StartingPrice}}元起
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
	name:"choose_point_service_type",
	data(){
		return {
			serviceTypeList:[]
	  }
  },
  mounted(){
  	// 获取工人的服务类型列表
  	if(this.pointShop.ObjectType === '2'){
      axios.post(API.GetWorkerServiceListEx,qs.stringify({
        "WorkerId": this.pointShop.ObjectId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("工人的服务类型",res.data);
        if(res.data.Meta.ErrorCode === '0'){
    			this.serviceTypeList = res.data.Body.ServiceTypeList;
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
    }
    // 获取商户的服务类型列表
    if(this.pointShop.ObjectType === '3'){
      axios.post(API.GetMerchantServiceListEx,qs.stringify({
        "MerchantId": this.pointShop.ObjectId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("商户的服务类型",res.data);
        if(res.data.Meta.ErrorCode === '0'){
    			this.serviceTypeList = res.data.Body.ServiceTypeList;
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
    }
  },
  methods:{
  	routeToOrder(item){
  		this.pointShop.ServiceTypeId = item.ServiceTypeId;
  		this.pointShop.ServiceTypeName = item.ServiceTypeName;
      this.pointShop.IsNegotiable = item.IsNegotiable;
      this.pointShop.UnitName = item.UnitName;
      if(item.IsNegotiable === '0'){
        this.pointShop.ServicePrice = item.Price;
      }else if(item.IsNegotiable === '1'){
        this.pointShop.ServicePrice = item.StartingPrice;
      }
  		this.$store.dispatch('setPointShop',{
  			txt: this.pointShop
  		});
  		this.$router.push({path:'/point_order'});
  	}
  },
  computed:mapState(['pointShop'])
}	
</script>
<style scoped>
.vue-cells__title {
	font-size: 14px;
	padding:10px; 
	background-color: #fbfbfb;
}
.vue-cells {
	position: relative;
	overflow: hidden;
	font-size: 14px;
	line-height: 1.41176471;
	background-color: #fff;
	padding-left: 20px;
}
.vue-cell {
	position: relative;
	padding:13px 15px 13px 0;
	display: -webkit-box;
	display:-webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
}
.vue-cell:after {
	content:" ";
	position: absolute;
	left:0;
	bottom: 0;
	right:0;
	height:1px;
	border-bottom: 1px solid #d9d9d9;
	-webkit-transform-origin: 0 100%;
	transform-origin: 0 100%;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}
.vue-cell__bd {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
}
.vue-cell__ft {
	text-align: right;
}
.blue {
	color:#27b8f3;
}
</style>