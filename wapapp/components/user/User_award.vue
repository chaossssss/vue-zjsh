<template>
	<div class="bg">
    <div class="zj-box">
      <div class="title f14">
        <p>
          邀请<span class="pblue">好友</span>且注册成功，您将获得 <span class="pblue">邀请奖励</span>
          ，此外您可以从好友的订单中获得 <span class="pblue">佣金奖励</span>
        </p>
        <p class="pblue mtb10"><a href="rule-detail.html" class="pblue see-detail">查看详细规则</a></p>
      </div>
      <div class="bd">
        <p class="f14">邀请码</p>
        <div class="bd_img">
          <img class="img_left" src="../../static/images/Invitation_code_star.png" alt="">
          <p class="f18 lh40 my-code"></p>
          <img class="img_right" src="../../static/images/Invitation_code_star.png" alt="">
        </div>
        <p class="f12">(长按复制)</p>
      </div>
      <div class="mt10">
        <div id="code"></div>
        <p class="f12">让好友扫一扫二维码，立即注册</p>
      </div>
    </div>
    <div class="foot">
      <a class="weui-btn" href="javascript:;">
        查看我的奖励
      </a>
    </div>
	</div>
</template>

<script>

</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url('../../static/images/award_background.png') no-repeat;
  background-size: 100%;
}
.pblue {
  color: #27b8f3;
}
.mtb10 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.f12 {
  font-size: 12px;
}
.f14 {
  font-size: 14px;
}
.zj-box {
  position: relative;
  padding: 15px;
  background-color: #fff;
  margin-left:auto;
  margin-right: auto;
  margin-top: 42px;
  width: 60%;
  text-align: center;
  color: #666;
}
.zj-box .bd {
  position: relative;
  padding: 10px 15px 3px;
}
.zj-box .bd:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-top:1px dashed #d9d9d9;
  -webkit-transform-origin:0 0;
  transform-origin: 0 0;
  -webkit-transform:scaleY(0.5);
  transform: scaleY(0.5);
  color: #d9d9d9;
}
.zj-box .bd:after{
  content: "";
  position: absolute;
  left: 0;
  bottom: 0; 
  width: 100%;
  border-bottom:1px dashed #d9d9d9;
  -webkit-transform-origin:0 0;
  transform-origin: 0 0;
  -webkit-transform:scaleY(0.5);
  transform: scaleY(0.5);
  color: #d9d9d9;
}
.zj-box .bd .bd_img {
  position: relative;
  height: 40px;
  box-sizing: border-box;
}
.bd .bd_img .img_left {
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  margin-top: -10px;
}
.bd .bd_img .img_right {
  position: absolute;
  top: 50%;
  right: 0;
  width: 20px;
  margin-top: -10px;
}
.foot a {
  width: 90%;
  margin-top: 54px;
  margin-left: auto;
  margin-right: atuo;
  background-color: #4a90e2;
}
</style>