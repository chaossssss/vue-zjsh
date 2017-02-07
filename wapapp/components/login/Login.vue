<template>
<div style="background-color:rgb(238,238,238);height:100%;">
	<form novalidate="novalidate" name="form">
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
				<i></i>
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
				<i></i>
			</div>
		</div>
	</div>
	<div class="foot">
		<button  class="weui-btn weui-btn_primary">登录</button>
		<div class="mt10">
			<a href="/template/login/regist.html" class="footlink pblue">免费注册</a>
			<a href="/template/login/forget.html" class="footlink pblue fr">忘记密码</a>
		</div>
	</div>
</form>	
<!-- <div class="weui-dialog__alert">
	<div class="weui-mask">
		<div class="weui-dialog">
			<div class="weui-dialog_bd mt20"></div>
			<div class="weui-dialog__ft">
				<a href="javascript:;" class="weui-btn__dialog_primary" ng-click="vm.dialogshow = false">
					确定
				</a>
			</div>
		</div>
	</div>
</div>	 -->	
</div>
</template>

<script>

export default {
	name:"login",
	data(){
		return {
			phone:"",
			password:""
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
.weui-btn_primary {
	background-color: #27b8f3;
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