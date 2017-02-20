<template>
<div style="background-color:rgb(238,238,238);height:100%;">
	<div class="weui-cells" style="margin-top:0;">
		<div class="weui-cell">
			<div class="weui-cell__bd weui-cell_primary tc">
				助家生活注册
			</div>
		</div>
	</div> 
	<div class="weui-cells weui-cells_form mt20">
		<div class="weui-cell">
			<div class="weui-cell__hd">
				<div class="icon0"></div>
			</div>
			<div class="weui-cell__bd weui-cell_primary">
				<input v-model="phone" name="phone" type="tel" placeholder="请输入您的手机号码" class="weui-input">
			</div>
			<div class="weui-cell__ft">
				<i :class="{'weui-icon-success':isPhone}"></i>
			</div>
		</div>
		<div class="weui-cell" style="padding:8px 10px;">
			<div class="weui-cell__hd">
				<div class="icon2"></div>
			</div>
			<div class="weui-cell__bd weui-cell_primary">
				<input v-model="smsCode" name="code" class="weui-input" type="tel" placeholder="请输入短信验证码" minlength="4" maxlength="4">
			</div>
			<div class="weui-cell__ft">
				<button :class="[smsCodeStatus?'weui-btn_plain-primary':'weui-btn_plain-default weui-btn_disabled']" class="weui-btn" @click="sendSMS">{{smsCodeContent}}</button>
			</div>
		</div>
		<div class="weui-cell">
			<div class="weui-cell__hd">
				<div class="icon1"></div>
			</div>
			<div class="weui-cell__bd weui-cell_primary">
				<input v-model="password" name="psd" type="password" placeholder="请输入密码" class="weui-input">
			</div>
			<div class="weui-cell__ft">
				<i :class="{'weui-icon-success':isPassword}"></i>
			</div>
		</div>
	</div>
	<div class="foot">
		<button :class="{'weui-btn_disabled':isSubmit}" class="weui-btn weui-btn_primary" @click="submit">注册</button>
	</div>
<div class="js_dialog" v-show="isError">
	<div class="weui-mask"></div>
	<div class="weui-dialog">
		<div class="weui-dialog__bd">{{errorMsg}}</div>
		<div class="weui-dialog__ft">
			<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="isError = false">
				确定
			</a>
		</div>
	</div>
</div>
</div>	
</template>
<script>
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
	name:"regist",
	data(){
		return {
			phone:"",
			smsCode:"",
			password:"",
			smsCodeContent:"发送验证码",
			smsCodeStatus:true,
			isError:false,
			errorMsg:""
		}
	},
	computed:{
		isPhone(){
			return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone);
		},
		isPassword(){
			return /^[_0-9a-z]{6,12}$/.test(this.password);
		},
		isSubmit(){
			if(this.isPhone && this.isPassword && this.smsCode){
				return false;
			}else{
				return true;
			}
		}
	},
	methods:{
		submit(){
			if(this.isSubmit === false){
				axios.post(API.Register,qs.stringify({
	        "LoginName": this.phone,
	        "Password": this.password,
	        "Captcha": this.smsCode,
	        "Type": 0
	      }),{
	        headers: {'Content-Type':'application/x-www-form-urlencoded'}
	      }).then((res)=>{
	      	console.log(res.data);
	      	if(res.data.Body){

	      	}else{
	      		this.isError = true;
          	this.errorMsg = res.data.Meta.ErrorMsg;
	      	}
	      }).catch(function (error) {
	        console.log(error);
	      });
			}
		},
		sendSMS(){
			if(this.smsCodeStatus === true){
				this.smsCodeLoad(60);
				axios.post(API.SendCaptcha,qs.stringify({
	        "Phone": this.phone,
	        "Type": "1"
	      }),{
	        headers: {'Content-Type':'application/x-www-form-urlencoded'}
	      }).then((res)=>{
	      	console.log(res.data);
	      }).catch(function (error) {
	        console.log(error);
	      });
			}
		},
		smsCodeLoad(time){
			if (time == 0) {
		    //倒计时结束do something
		    this.smsCodeContent = '发送验证码';
		    this.smsCodeStatus = true;
	    }else {
		    this.smsCodeContent = time+'秒后重发';
		    this.smsCodeStatus = false;
		    time--;
        setTimeout(()=> {
            this.smsCodeLoad(time);
        }, 800);
	    }
		}
	}
}
</script>
<style scoped>
.fl{ float:left;}
.fr{ float:right;}

.cb{ clear:both;}
.cl{ clear:left;}
.cr{ clear:right;}

.pblue {
	color: #27b8f3;
}
.mt10 {
	margin-top: 10px;
}
.mt20 {
	margin-top: 20px;
}
.w50 {
	width: 50px;
}
.tc {
	text-align: center;
}
.col90 {
	width: 90%;
}
.container {
	margin-left: auto;
	margin-right: auto;
}
.weui-cell__ft {
	position: relative;
}
.weui-cell__ft .qr_code {
	position: absolute;
	top: 50%;
	right: 16px;
	width:20px;
	transform: translateY(-50%);
}
.weui-cell .weui-cell__hd .icon0{
	background: url('../../static/images/ic_account.svg') no-repeat;
 	width:30px;
 	height:30px;
 	margin-right: 20px;
} 
.weui-cell .weui-cell__hd .icon1 {
	background: url('../../static/images/ic_password.svg') no-repeat;
 	width:30px;
 	height:30px;
 	margin-right: 20px;
}
.weui-cell .weui-cell__hd .icon2 {
	background: url('../../static/images/ic_code.svg') no-repeat;
 	width:30px;
 	height:30px;
 	margin-right: 20px;
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
.weui-btn_plain-primary {
  color: #27b8f3;
  border: 1px solid #27b8f3;
}
.weui-btn_plain-default {
  color: #353535;
  border: 1px solid #353535;
}
.weui-dialog__btn_primary {
  color: #27b8f3;
}
.foot {
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
	position: relative;
}
.footlink {
	color: #04be02;
	text-decoration: none;
}
</style>