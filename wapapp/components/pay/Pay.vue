<template>
<div>
	zhifu 
</div>
</template>
<script>
import {mapState} from 'vuex';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
	name:"pay",
	data:{
		return(){

		}
	},
	mounted(){
		// 获取订单详情
		if(this.$route.params.OrderId){
      axios.post(API.GetOrderInfoEx,qs.stringify({
        "Token": this.Token,
        "OrderId": this.OrderId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("订单详情",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          if(res.data.Body){

          }
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
	}
}
</script>
<style>
	
</style>