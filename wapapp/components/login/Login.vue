<template>
<div style="background-color:rgb(238,238,238);height:100%;">
	<div class="weui-cells" style="margin-top:0;">
		<div class="weui-cell">
			<div class="weui-cell__bd weui_cell__primary tc">
				助家生活登录
			</div>
		</div>
	</div>
	<div class="weui-cells weui-cells_form mt20">
		<div class="weui-cell">
			<div class="weui-cell__hd">
				<div class="icon0"></div>
			</div>

			<div class="weui-cell__bd weui-cell__primary">
				<input name="phone" type="tel" placeholder="请输入您的手机号码" class="weui-input" v-model="phone" minlength="11" maxlength="11">
			</div>
			<div class="weui-cell__ft">
				<i :class="{'weui-icon-success':isPhone}"></i>
			</div>
		</div>
		<div class="weui-cell">
			<div class="weui-cell__hd">
				<div class="icon1"></div>
			</div>
			<div class="weui-cell__bd weui-cell__primary">
				<input name="psd" type="password" placeholder="请输入密码" class="weui-input" v-model="password">
			</div>
			<div class="weui-cell__ft">
				<i :class="{'weui-icon-success':isPassword}"></i>
			</div>
		</div>
	</div>
	<div class="foot">
		<button :class="{'weui-btn_disabled':isSubmit}" @click="submit" class="weui-btn weui-btn_primary">登录</button>
		<div class="mt10">
			<router-link to="/regist" class="footlink pblue">免费注册</a>
			<router-link to="/forget" class="footlink pblue fr">忘记密码</a>
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
            <p class="weui-toast__content">正在登录...</p>
        </div>
    </div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
	name:"login",
	data(){
		return {
			phone:"",
			password:"",
			isError:false,
			errorMsg:"",
			isLoading:false
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
			if(this.isPhone && this.isPassword){
				return false;
			}else{
				return true;
			}
		}
	},
	methods:{
		submit(){
			if(this.isSubmit === false){
				this.isLoading = true;
				// 登录
		    async function login(phone,password){
		      let response = await axios.post(API.Login,qs.stringify({
		        "LoginName": phone,
		        "Password": password,
		      }),{ 
		        headers: {'Content-Type':'application/x-www-form-urlencoded'}
		      }).catch(function (error) {
		        console.log(error);
		      });
		      return response;
		    }
		    // 获取个人信息
		    async function getUserInfo(token){
		      let response = await axios.post(API.GetUserInfo,qs.stringify({
		        "Token":token
		      }),{
		        headers: {'Content-Type':'application/x-www-form-urlencoded'}
		      }).catch(function (error) {
		        console.log(error);
		      });
		      return response;
		    }
		    login(this.phone,this.password).then((res)=>{
		      console.log("token",res.data);
		      this.isLoading = false;
		      if(res.data.Body && res.data.Body.Token){
		      	// 保存token进cookie 
		      	this.$store.dispatch('setToken',{
		      		txt:res.data.Body.Token
		      	});

		        getUserInfo(res.data.Body.Token).then((res)=>{
		          console.log("获取个人信息",res.data);
		          if(res.data.Meta.ErrorCode === '0'){
		            this.setUserInfo(res.data.Body.Info);
		            this.$router.push({path:'/menu/service'});
		          }else{
		          	this.isError = true;
          			this.errorMsg = res.data.Meta.ErrorMsg;
		          }
		        });

		        // 跳转到上一级的页面
		        this.$router.go(-1);
		      }else{
          	this.isError = true;
          	this.errorMsg = res.data.Meta.ErrorMsg;
          }
		    });
			}
		},
		setUserInfo(data){
      this.$store.dispatch('setUserInfo',{
        txt:data
      });
    },
    setToken(token){
    	this.$store.dispatch('setToken',{
        txt:data
      });
    }
	}
}
</script>

<style scoped>
/*浮动 左 右*/
.fl{ float:left;}
.fr{ float:right;}

/*清除浮动 左 中 右*/
.cb{ clear:both;}
.cl{ clear:left;}
.cr{ clear:right;}
/*配色*/
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
.weui-cell {
	padding:15px;
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

.foot {
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
	position: relative;
}
.footlink {
	text-decoration: none;
}	
</style>