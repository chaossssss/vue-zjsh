<template>
<div style="position:relative;background-color: #fbfbfb;height:100%;">
	<div class="weui-cells" style="margin-top:0;">
		<div class="weui-cell">
			<div class="weui-cell__bd">订单总价</div>
			<div class="weui-cell__ft">{{od.TotalPrice}}元</div>
		</div>
	</div>
	<div class="weui-cells">
		<div class="weui-cell" v-if="od.Activity && od.Activity.SpecialRule" v-for="item in od.Activity.SpecialRule">
			<div class="weui-cell__bd">{{item.Title}}</div>
			<div class="weui-cell__ft">-¥{{item.Minus}}</div>
		</div>
		<router-link to="/discount" class="weui-cell weui-cell_access">
			<div class="weui-cell__bd">红包</div>
			<div class="weui-cell__ft">
				<span class="red"></span>
			</div>
		</router-link>
		<div class="weui-cell">
			<div class="weui-cell__bd">支付金额</div>
			<div class="weui-cell__ft">
				<span class="red">¥</span>
			</div>
		</div>
	</div>

	<div class="weui-cells">
		<div class="weui-cell">选择支付方式</div>
		<div class="weui-cell weui-cell_access" @click="isCount = !isCount">
        <div class="weui-cell__hd"><img src="../../static/images/pic-yue.png" alt="" style="width:35px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
            <p>账户余额支付</p>
        </div>
        <div class="vue-cell__ft" v-show="!isCount" >
        	<img src="../../static/images/unselected.png" alt="" style="width:25px;margin-right:5px;display:block">
        </div>
        <div class="vue-cell__ft" v-show="isCount">
        	<img src="../../static/images/select.png" alt="" style="width:25px;margin-right:5px;display:block">
        </div>
    </div>
    <div class="weui-cell weui-cell_access" @click="zhifubao">
        <div class="weui-cell__hd"><img src="../../static/images/pic-zhifubao.png" alt="" style="width:35px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
            <p>支付宝支付</p>
        </div>
        <div class="vue-cell__ft" v-show="!isZhiFuBao">
					<img src="../../static/images/unselected.png" alt="" style="width:25px;margin-right:5px;display:block">
        </div>
        <div class="vue-cell__ft" v-show="isZhiFuBao">
        	<img src="../../static/images/select.png" alt="" style="width:25px;margin-right:5px;display:block">
        </div>
    </div>
    <div class="weui-cell weui-cell_access" @click="weixin">
        <div class="weui-cell__hd"><img src="../../static/images/pic-weixin.png" alt="" style="width:35px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
            <p>微信支付</p>
        </div>
        <div class="vue-cell__ft" v-show="!isWeiXin">
        	<img src="../../static/images/unselected.png" alt="" style="width:25px;margin-right:5px;display:block">
        </div>
        <div class="vue-cell__ft" v-show="isWeiXin">
        	<img src="../../static/images/select.png" alt="" style="width:25px;margin-right:5px;display:block">
        </div>
    </div>
	</div>

	<div class="foot" @click="submit">
		<div class="weui-cells">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					确认支付
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

<!-- 正在提交提示 -->
  <div id="loadingToast" v-show="isLoading">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
          <i class="weui-loading weui-icon_toast"></i>
          <p class="weui-toast__content">正在提交...</p>
      </div>
  </div>	
</div>
</template>
<script>
import {mapState} from 'vuex';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

//获取url参数
function getvl(name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
}

export default {
	name:"pay",
	data(){
		return {
			od:{
				Activity:{
					SpecialRule:[]
				}
			}, // 订单详情
			isCount:false, // 是否余额支付
			isZhiFuBao:false, // 是否支付宝付款
			isWeiXin:false, // 是否微信付款
			isError:false,
      errorMsg:"",
      isLoading:false
		}
	},
	mounted(){
		this.code = getvl("code");
		console.log("orderId",this.orderId);
		// 获取订单详情
		if(this.orderId){
      axios.post(API.GetOrderInfoEx,qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("订单详情",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          if(res.data.Body){
          	this.od = res.data.Body.Order;
          }
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
	methods:{
		zhifubao(){
			if(this.isWeiXin){
				this.isWeiXin = false;
			}
			this.isZhiFuBao = !this.isZhiFuBao;
		},
		weixin(){
			if(this.isZhiFuBao){
				this.isZhiFuBao = false;
			}
			this.isWeiXin = !this.isWeiXin;
		},
		setOrderId(item){
      this.$store.dispatch('setOrderId',{
        txt:item
      })
    },
		submit(){
			// 余额支付
			if(!this.isZhiFuBao && !this.isWeiXin){
				if(this.isCount){
					console.log("余额支付");
				}else{
					console.log("未选择支付方式");
					this.isError = true;
					this.errorMsg = "亲，您还未选择支付方式!"
				}
			}
			// 支付宝+余额 or 支付宝
			if(this.isZhiFuBao){
				if(this.isCount){
					console.log("支付宝+余额");
				}else{
					console.log("支付宝");
				}
			}
			// 微信+余额 or 微信
			if(this.isWeiXin){
				if(this.isCount){
					console.log("微信+余额");
				}else{
					console.log("微信");
				}
			}
		},
		payCount(){
			// 余额支付
			axios.post(API.BalancePay,qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId,
        "CouponId": this.couponId,
        "BalancePay": this.payable
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("余额支付",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          
        }else{
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      })
		},
		payZhiFuBao(){
			// 支付宝支付
			axios.post(API.BalancePay,qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId,
        "CouponId": this.couponId,
        "Alipay": this.alipay,
        "BalancePay": this.payable
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("支付宝支付",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          
        }else{
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      })
		},
		payWeiXin(){
			// 微信支付
			axios.post(API.BalancePay,qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId,
        "CouponId": this.couponId,
        "WxPay": this.wxPay,
        "BalancePay": this.payable,
        "Code": this.code
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("微信支付",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          
        }else{
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      })
		}
	},
	computed:{
		Token(){
			return this.$store.state.Token;
		},
		orderId(){
			return this.$store.state.orderId;
		}
	}
}
</script>
<style scoped>
.weui-cells {
	margin-top:10px;
}
.weui-cell {
	font-size:14px;
	line-height:1.75;
}
.red {
	color:#f43530;
}
.vue-cell__ft {
	text-align:right;
	color:#999;
}
.weui-dialog__btn_primary {
	color:#27b8f3;
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
.foot {
	position: absolute;
	bottom: 0;
	width:100%;
	text-align: center;
}
.foot .weui-cells .weui-cell{
	font-size:18px;
	background-color: #27b8f3;
	color:#fff;
}
</style>