<template>
<div  style="position:relative;height:100%;">
	<div class="weui-msg">
	    <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
	    <div class="weui-msg__text-area">
	        <h2 class="weui-msg__title">操作成功</h2>
	        <p class="weui-msg__desc">您的订单已经支付成功!</p>
	    </div>
	    <div class="weui-msg__opr-area">
	        <p class="weui-btn-area">
	            <router-link to="/order_detail" class="weui-btn weui-btn_primary"> 确定</router-link>
	        </p>
	    </div>
	    <div class="weui-msg__extra-area">
	        <div class="weui-footer">
	            <p class="weui-footer__links">
	                <a href="javascript:void(0);" class="weui-footer__link">合作联系</a>
	            </p>
	            <p class="weui-footer__text">Copyright © 2005-2017 助家生活</p>
	        </div>
	    </div>
	</div>	
</div>
</template>
<script>
export default {
	name:"success"
}	
</script>
<style scoped>
.weui-icon-success {
	color:#27b8f3;
}	
.weui-btn_primary {
	background-color:#27b8f3;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  color: rgba(255, 255, 255, 0.6);
  background-color: #27b8f3;
}
</style>