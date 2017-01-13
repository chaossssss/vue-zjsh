<template>
	<div style="background:rgba(0, 0, 0, 0.6);width:100%;height:100%;position:absolute;">
    <div class="QRcode-container">
      <img :src="avatarUrl" class="user-avatar">
      <div class="user-info">
        <span class="name">我是条咸鱼</span>
        <img class="user-sex">
      </div>
      <div class="user-addr">
        <span>浙江</span>
        <span>杭州</span>
      </div>
      <div class="qr-code"></div>
      <div class="code-msg">扫一扫上面的二维码图案，加我</div>
    </div>
	</div>
</template>

<script>
export default{
  data(){
    return{
      avatarUrl:'',

    }
  }
}
</script>

<style scoped>
.QRcode-container{
  width: 91%;
  height: 477px;
  background: #fff;
  margin: 48px auto 0;
}
.user-avatar{
  margin: 20px 0 0 23px;
  width: 80px;
  height: 80px;
  border-radius: 2px;
  background: url(../../static/images/logo.png) no-repeat;
  background-size: 80px 80px;
}
.user-info{
  position: relative;
  top: -75px;
  left: 118px;
  font-size: 18px;
  color: #3f3e48;
}
.name{
  position: relative;
/*  top: -51px;
  left: 6px;*/
}
.user-sex{
  background: url(../../static/images/female_logo.png) no-repeat;
  width: 8px;
  height: 14px;
  background-size: 8px 14px;
}
.user-addr{
  position: relative;
  top: -68px;
  left: 119px;
  font-size: 13px;
  color: #3f3e48;
}
.qr-code{
  width: 295px;
  height: 295px;
  background: grey;
  margin: -34px auto 0;
}
.code-msg{
  color: #3f3e48;
  font-size: 11px;
  text-align: center;
  margin-top: 15px;
}
</style>