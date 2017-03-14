<template>
<div style="position:relative;background-color: #fbfbfb;height:100%;">
	<div class="weui-cells" style="margin-top:0;">
		<div class="weui-cell">
			<div class="weui-cell__bd">订单总价</div>
			<div class="weui-cell__ft">{{od.TotalPrice}} 元</div>
		</div>
	</div>
	<div class="weui-cells">
		<div class="weui-cell" v-if="od.Activity && od.Activity.SpecialRule" v-for="item in od.Activity.SpecialRule">
			<div class="weui-cell__bd">{{item.Title}}</div>
			<div class="weui-cell__ft">-¥ {{item.Minus}}</div>
		</div>
		<router-link :to="{name:'discount',params:{totalPrice:od.TotalPrice}}" class="weui-cell weui-cell_access">
			<div class="weui-cell__bd">红包</div>
			<div class="weui-cell__ft" v-show="coupon.CouponId">
				<span class="red">
					满{{coupon.Amount}}减{{coupon.DiscountAmount}}元
				</span>
			</div>
			<div class="weui-cell__ft" v-show="!coupon.CouponId"></div>
		</router-link>
		<div class="weui-cell">
			<div class="weui-cell__bd">支付金额</div>
			<div class="weui-cell__ft">
				<span class="red">¥ {{payable}}</span>
			</div>
		</div>
	</div>

	<div class="weui-cells">
		<div class="weui-cell">选择支付方式</div>
		<div class="weui-cell weui-cell_access" @click="isCount = !isCount">
        <div class="weui-cell__hd"><img src="../../static/images/pic-yue.png" alt="" style="width:35px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
            <p>账户余额支付 <span style="font-size:12px;color:#999;">余额{{account}}元</span></p>
        </div>
        <div class="vue-cell__ft" v-show="!isCount" >
        	<img src="../../static/images/unselected.png" alt="" style="width:25px;margin-right:5px;display:block">
        </div>
        <div class="vue-cell__ft" v-show="isCount">
        	<img src="../../static/images/select.png" alt="" style="width:25px;margin-right:5px;display:block">
        </div>
    </div>
    <div class="weui-cell weui-cell_access" @click="zhifubao" v-show="!Code">
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
    <div class="weui-cell weui-cell_access" @click="weixin" v-show="Code">
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
              <!-- <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="isError = false">朕 知道了!</a> -->
              <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2fwap3%2findex.html%23%2fpay&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect" class="weui-dialog__btn weui-dialog__btn_primary">小主 请重新付款!</a>
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
import COM from '../../config/common';
import axios from 'axios';
import qs from 'qs';

export default {
	name:"pay",
	data(){
		return {
			code:"",
			od:{						// 订单详情
				Activity:{
					SpecialRule:[]
				}
			}, 
			account:"",	// 账户余额
			isCount:false, // 是否余额支付
			isZhiFuBao:false, // 是否支付宝付款
			isWeiXin:false, // 是否微信付款
			isError:false,
      errorMsg:"",
      isLoading:false
		}
	},
	mounted(){
		this.code = COM.getvl("code");
		this.Token = COM.getCookie("Token");
		// 获取账户余额
		axios.post(API.MySettlement,qs.stringify({
        "Token": this.Token
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        // console.log("账户余额",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          if(res.data.Body){
          	this.account = res.data.Body.SettlementBalance;
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
		// 获取订单详情
		if(this.orderId){
      axios.post(API.GetOrderInfoEx,qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        // console.log("订单详情",res.data);
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
					// console.log("余额支付");
					this.payCount(this.singBalancePay);
				}else{
					// console.log("未选择支付方式");
					this.isError = true;
					this.errorMsg = "亲，您还未选择支付方式!"
				}
			}
			// 支付宝+余额 or 支付宝
			if(this.isZhiFuBao){
				if(this.isCount){
					// console.log("支付宝+余额");
					this.payZhiFuBao(this.balancePay,this.thirdPay);
				}else{
					// console.log("支付宝");
					this.payZhiFuBao(0,this.singBalancePay);
				}
			}
			// 微信+余额 or 微信
			if(this.isWeiXin){
				if(this.isCount){
					// console.log("微信+余额");
					this.payWeiXin(this.balancePay,this.thirdPay);
				}else{
					// console.log("微信");
					this.payWeiXin(0,this.singBalancePay);
				}
			}
		},
		payCount(balancePay){
			this.isLoading = true;
			// 余额支付
			axios.post(API.BalancePay,qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId,
        "CouponId": this.coupon.CouponId,
        "BalancePay": balancePay
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
      	this.isLoading = false;
        // console.log("余额支付",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          this.$router.push({path:'/paySuccess'});
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
		payZhiFuBao(balancePay,thirdPay){
			this.isLoading = true;
			// 支付宝支付
			axios.post(API.GetAlipaySign,qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId,
        "CouponId": this.coupon.CouponId,
        "Alipay": thirdPay,
        "BalancePay": balancePay
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
      	this.isLoading = false;
        // console.log("支付宝支付",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          window.location.href = res.data.Body.GATEWAY_NEW + res.data.Body.AlipaySign;
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
		payWeiXin(balancePay,thirdPay){
			this.isLoading = true;
			// 微信支付
			axios.post(API.GetWxpaySign,qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId,
        "CouponId": this.coupon.CouponId,
        "WxPay": thirdPay,
        "BalancePay": balancePay,
        "Code": this.Code
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
      	this.isLoading = false;
        // console.log("微信支付",res.data);
        if(res.data.Meta.ErrorCode === '0'){
        	//微信支付
					function onBridgeReady() {
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								"appId": res.data.Body.appId, //公众号名称，由商户传入     
								"timeStamp": res.data.Body.timeStamp, //时间戳，自1970年以来的秒数     
								"nonceStr": res.data.Body.nonceStr, //随机串     
								"package": res.data.Body.package,
								"signType": res.data.Body.signType, //微信签名方式     
								"paySign": res.data.Body.paySign //微信签名 
							},
							function(res) {
								if (res.err_msg == "get_brand_wcpay_request：ok") {
									window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http://wap.zhujiash.com/wap3/index.html#/paySuccess&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
								}else{
									window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf88cbf4dba349e56&redirect_uri=http%3a%2f%2fwap.zhujiash.com%2fwap3%2findex.html%23%2fpay&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
								} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
							}
						);
					}
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					} else {
						onBridgeReady();
					}
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
		payable(){
			// 显示支付金额
			let totalPrice = this.od.TotalPrice;
			if(this.coupon.DiscountAmount){
				totalPrice = parseFloat(this.od.TotalPrice) - parseFloat(this.coupon.DiscountAmount); 
			}
			if(this.od.Activity && this.od.Activity.SpecialRule.length>0){
				this.od.Activity.SpecialRule.map((v,i,arry)=>{
					totalPrice = parseFloat(totalPrice) - parseFloat(v.Minus); 
				})
			}
			return totalPrice;
		},
		singBalancePay(){
			// 账户支付 (减掉红包以后的价格)
			let price = this.od.TotalPrice;
			if(this.coupon.DiscountAmount){
				price = parseFloat(this.od.TotalPrice) - parseFloat(this.coupon.DiscountAmount); 		
			}
			return price;
		},
		balancePay(){
			// 账户支付 (减掉红包以后的价格)
			let price = this.od.TotalPrice;
			if(parseFloat(this.account) >= parseFloat(this.payable)){
				if(this.coupon.DiscountAmount){
					price = parseFloat(this.od.TotalPrice) - parseFloat(this.coupon.DiscountAmount); 
					return price;
				}else{
					return price;
				}
			}else{		
				return this.account;
			}		
		},
		thirdPay(){
			// 第三方支付	
			let price = this.od.TotalPrice;
			if(parseFloat(this.account) < parseFloat(this.payable)){
				if(this.coupon.DiscountAmount){
					// 余额不够
					price = parseFloat(this.od.TotalPrice) - parseFloat(this.coupon.DiscountAmount) - parseFloat(this.balancePay); 
					alert("price",price);
					return price;
				}else{
					price = parseFloat(this.od.TotalPrice) - parseFloat(this.balancePay);
					alert("price",price);
					return price;
				}	
			}else{
				return 0;
			}
		},
		Code(){
			return this.$store.state.Code; 
		},
		orderId(){
			return this.$store.state.orderId;
		},
		coupon(){
			return this.$store.state.coupon;
		},
		userInfo(){
			return this.$store.state.userInfo;
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
	color:#ff5000;
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