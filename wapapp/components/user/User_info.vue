<template>
	<div style="background:#eef2f5;width:100%;height:100%;position:absolute;">
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" @click="editAvatar" href="javascript:;">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">头像</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;">
          <div class="avatar"></div>
        </div>
      </a>
      <router-link class="weui-cell weui-cell_access" to="/eidt_petname">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">昵称</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;font-size:14px;color:#999;">我是条咸鱼</div>
      </router-link>
      <router-link class="weui-cell weui-cell_access" to="/user_QRcode">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">我的二维码</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;">
          <div class="QR_code"></div>
        </div>
      </router-link>
      <router-link class="weui-cell weui-cell_access" to="/eidt_password">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">修改密码</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
    <div class="service_phone">修改手机号联系客服：
      <a class="phone_number" href="tel:4008-262-056">4008-262-056</a>
    </div>
    <div v-if="showPic">
      <div class="mask"></div>
      <div class="container">
        <div class="container-top">
          头像设置
        </div>
        <div class="container-main">
          <div class="main-left">
            <img class="picture" src="../../static/images/use_picture.png">
            <div style="color:#8c8a9f;font-size:13px;margin-top:13px;">图片库</div>
          </div>
          <div class="main-right">
            <img class="picture" src="../../static/images/take_photo.png">
            <div style="color:#8c8a9f;font-size:13px;margin-top:13px;">拍照</div>
          </div>
          <div class="clear"></div>
        </div>
        <div @click="cancel" class="container-bottom">
          取消
        </div>
      </div>
    </div>  
	</div>
</template>

<script>
export default{
  data:function(){
    return{
      showPic:false
    }
  },
  methods:{
    editAvatar:function(event){
      this.showPic =true;
    },
    cancel:function(event){
      this.showPic = false;
    }
  }
}
</script>

<style scoped>
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
.mask{
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.container{
  width: 277px;
  height: 177px;
  background: #fff;
  position: relative;
  z-index: 1001;
  margin: -116px auto 0;
}
.container-top{
  height: 35px;
  position: relative;
  text-align: center;
  line-height: 35px;
  font-size: 12px;
  color: #3f3e48;
}
.container-top:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e4e4e4;
  color: #e4e4e4;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.container-main{
  height: 108px;

}
.container-bottom{
  height: 33px;
  position: relative;
  text-align: center;
  line-height: 33px;
  font-size: 12px;
  color: #3f3e48;
}
.container-bottom:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e4e4e4;
  color: #e4e4e4;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.picture{
  width: 34px;
  height: 28px;
}
.main-left{
  margin-left: 67px;
  margin-top: 22px;
  float: left;
}
.main-right{
  margin-top: 23px;
  margin-right: 67px;
  float: right;
}
.clear{
  clear: both;
}
</style>