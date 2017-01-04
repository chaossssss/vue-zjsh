<template>
	<div style="background:#eef2f5;width:100%;height:100%;position:absolute;">
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">头像</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;">
          <div class="avatar"></div>
        </div>
      </a>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">昵称</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;font-size:14px;color:#999;">我是条咸鱼</div>
      </a>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">我的二维码</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;">
          <div class="QR_code"></div>
        </div>
      </a>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">修改密码</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
    <div class="service_phone">修改手机号联系客服：
      <a class="phone_number" href="tel:4008-262-056">4008-262-056</a>
    </div>
	</div>
</template>

<script>

</script>

<style>
.avatar{
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: url(../../static/images/logo.png);
  background-size: 62px 62px;
}
.service_phone{
  margin: 17px 0 0 16px;
  color: #9a9a9a;
  font-size: 13px;
}
.phone_number{
  color: #27b7f3;
  text-decoration: none;
}
.phone_number:active,.phone_number:visited,.phone_number:hover{
  color: #27b7f3;
  text-decoration: none;
}
.QR_code{
  background: url(../../static/images/my_code.png);
  background-size: 20px 20px;
  width: 20px;
  height: 20px;
}
</style>