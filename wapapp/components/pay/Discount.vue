<template>
<div style="height:100%;">
	<div class="weui-cells" style="margin-top:0;">
		<div class="weui-cell weui-cell_access" @click="chooseCoupon('')">
			<div class="weui-cell__bd">
				不使用红包
			</div>
			<div class="weui-cell__ft" v-show="coupon.CouponId === ''">
				<img style="width:20px;display:block;" src="../../static/images/pic-yes-sel.png" alt="">
			</div>
			<div class="weui-cell__ft" v-show="coupon.CouponId !== ''">
				<img style="width:20px;display:block;" src="../../static/images/pic-no-sel.png" alt="">
			</div>
		</div>
	</div>
	<div class="weui-cells__title">
		有 <span class="red">{{couponList.length}}</span> 个红包
	</div>
	<!-- parseInt(item.CouponDetails[0].Amount) >= parseInt(totalPrice) -->
	<div class="vue-cells">
		<div class="vue-cell" @click="chooseCoupon(item)" :class="{'gray':(item.IsUsed === '1' || (parseInt(item.CouponDetails[0].Amount) >= parseInt(totalPrice)))}" v-for="item in couponList">
			<div class="line-color"></div>
			<div class="vue-cell__hd red">
				<span style="font-size:16px;">¥</span>
				<span style="font-size:40px;">{{item.CouponDetails[0].DiscountAmount}}</span>
				<p>满{{item.CouponDetails[0].Amount}}可用</p>
			</div>
			<div class="vue-cell__bd">
				<h2 class="title">
					 {{item.Title}}
				</h2>
				<ul class="content">
					<li v-for="v in item.ServiceTypes">{{v.ServiceName}}</li>
				</ul>
			</div>
			<div class="vue-cell__ft" v-show="coupon.CouponId !== item.Id">
				<img style="width:20px;display:block;" src="../../static/images/pic-no-sel.png" alt="">
			</div>
			<div class="vue-cell__ft" v-show="coupon.CouponId === item.Id">
				<img style="width:20px;display:block;" src="../../static/images/pic-yes-sel.png" alt="">
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
	name:"discount",
	data(){
		return {
			couponList:[],
			totalPrice:"",
			isError:false,
      errorMsg:""
		}
	},
	mounted(){
		this.totalPrice = this.$route.params.totalPrice;
		// 红包列表
		axios.post(API.CouponList,qs.stringify({
        "Token": this.Token
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("红包列表",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          if(res.data.Body && res.data.Body.CouponList.length > 0){
          	this.couponList = res.data.Body.CouponList;
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
	},
	methods:{
		chooseCoupon(item){
			if(item === ''){
				this.setCoupon('');
				this.$router.push({path:'/pay'});
			}else if(item.IsUsed ==='0' && parseInt(item.CouponDetails[0].Amount) <= parseInt(this.totalPrice)){
				this.setCoupon(item.Id,item.CouponDetails[0].Amount,item.CouponDetails[0].DiscountAmount);
				this.$router.push({path:'/pay'});
			}
		},
		setCoupon(id,amount,discount){
			this.coupon.CouponId = id;
			this.coupon.Amount = amount;
			this.coupon.DiscountAmount = discount;
			this.$store.dispatch('setCoupon',{
				txt: this.coupon
			})
		}
	},		
	computed:mapState(['Token','coupon'])
}	
</script>
<style scoped>
.red {
	color:#f43530;
}
.gray {
	-webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
  filter: saturate(0%);
	filter: contrast(0%);
}
.weui-cell {
	font-size: 14px;
}	
.weui-cell_access .weui-cell__ft {
	padding-right:0;
}
.weui-cell_access .weui-cell__ft:after{
	display: none;
}
.weui-cells__title {
	margin:5px 0;
}
.vue-cells {
	margin:0 15px;

}
.vue-cell {
	font-size:14px;
	box-sizing: border-box;
	height:85px;
	line-height:1.4em;
	padding-top: 4px;
	position:relative;
	border-radius: 4px;
	box-shadow: 0 0 10px #ececec;
	display: flex;
	margin-bottom: 10px;
}
.line-color {
	position: absolute;
	top:0;
	z-index: 3;
	width:100%;
	height:4px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	background:-moz-linear-gradient(left,#1abbf8,#c969ea);/*Mozilla*/
	background:-webkit-gradient(linear,0 50%,100% 50%,from(#1abbf8),to(#c969ea));/*Old gradient for webkit*/
	background:-webkit-linear-gradient(left,#1abbf8,#c969ea);/*new gradient for Webkit*/
	background:-o-linear-gradient(left,#1abbf8,#c969ea);/*Opera11*/
}
.vue-cell__hd {
	width: 100px;
	position: relative;
	text-align: center;
	margin:5px 0;
	padding: 14px 0;
}
.vue-cell__hd:after {
	content:" ";
	position: absolute;
	top:0;
	right:0;
	width:1px;
	height:100%;
	border-right:1px dashed #d9d9d9;
	transform-origin: 0 100%;
	-webkit-transform:scaleX(0.5);
	transform: scaleX(0.5);
}
.vue-cell__bd {
	padding: 6px;
	flex:1;
}
.vue-cell__bd .title {
	font-size: 18px;
	line-height: 1.4em;
}
.vue-cell__bd .content {
	margin-left: 20px;
	font-size: 12px;
	color:#999;
}
.vue-cell__ft {
	position: absolute;
	top:50%;
	right: 8px;
	-webkit-transform:translateY(-0.5);
	transform: translateY(-50%);
}
</style>