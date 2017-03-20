<template>
	<div style="background:rgba(0, 0, 0, 0.6);width:100%;height:100%;position:absolute;">
    <div class="QRcode-container">
      <div class="container">
        <img :src="userInfo.SmallPic" class="user-avatar">
        <p class="user-info">
          {{userInfo.NickName}}
        </p>
        <p class="name">

        </p>
      </div>    
      <div class="qr-code">
        <img :src="userInfo.QrCode" style="width:100%;"  alt="">
      </div>
      <div class="code-msg">扫一扫上面的二维码图案，加我</div>
    </div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default{
  data(){
    return{

    }
  },
  computed: mapState(['userInfo'])
}
</script>

<style scoped>
.QRcode-container{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 91%;
  background: #fff;
}
.container {
  position: relative;
  padding:20px;
  height: 80px;
}
.user-avatar{
  position: absolute;
  top:20px;
  left:20px;
  width: 80px;
  height: 80px;
  border-radius: 2px;
}
.user-info{
  padding-left:100px;
  margin-top: 15px;
  font-size: 18px;
  color: #3f3e48;
}
.name {
  padding-left:100px;
  font-size: 18px;
  color: #3f3e48;
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
  width: 80%;
  margin:0 auto;
}
.code-msg{
  color: #3f3e48;
  font-size: 11px;
  text-align: center;
  margin: 6px 0;
}
</style>