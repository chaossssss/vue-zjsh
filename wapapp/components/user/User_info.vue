<template>
	<div style="background:#eef2f5;width:100%;height:100%;position:absolute;">
    <div class="weui-cells" style="margin-top:0;">
      <a class="weui-cell weui-cell_access" for="image" href="javascript:;" style="line-height:80px">
          <input id="image" type="file" accept="image/gif,image/jpeg,image/png" @change="onFileChange">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">头像</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;">
          <div class="avatar">
            <img :src="userInfo.HqPic" style="width:100%;border-radius:50%;" alt="">
          </div>
        </div>
      </a>
      <router-link to="/eidt_petname" class="weui-cell weui-cell_access" style="line-height:37px;">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">昵称</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;font-size:14px;color:#999;">{{userInfo.NickName}}</div>
      </router-link>
      <router-link class="weui-cell weui-cell_access" to="/user_QRcode" style="line-height:37px;">
        <div class="weui-cell__bd">
          <p style="font-size:14px;color:#333639;">我的二维码</p>
        </div>
        <div class="weui-cell__ft" style="padding-right:22px;">
          <div class="QR_code">
            <img :src="userInfo.QrCode" style="width:100%;"  alt="">
          </div>
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

    <!-- 修改成功提示 -->
    <div id="Toast" v-show="isChanged" @click="isChanged = false">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">修改成功</p>
      </div>
    </div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import API from '../../config/backend';
import axios from 'axios';
import COM from '../../config/common';
import qs from 'qs';

export default {
  name: "userInfo",
  data() {
    return {
      files: null,
      filePath: '',
      errorMsg: '',
      isError: false,
      isChanged: false,
      Token: ''
    }
  },
  mounted() {
    this.Token = COM.getCookie("Token");
  },
  methods: {
    onFileChange(event) {
      let file = event.target.files || event.dataTransfer.files;
      if(!file.length) {
        return;
      }
      this.files = file[0];

      let Json_data = {
        'Token': this.Token,
        'img': this.files,
      }
      let formdata = new FormData();
      formdata.append('Token', this.Token);
      formdata.append('img', this.files);
      formdata.append('JSON_Data', JSON.stringify(Json_data));
      axios.post(API.SetPhoto, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.data.Meta.ErrorCode === '0') {
          let _userInfo = this.userInfo;
          _userInfo.HqPic = res.data.Body.ImgPath;
          this.$store.dispatch('setUserInfo', {
            txt: _userInfo
          });
          this.isChanged = true;
          let that = this;
          setTimeout(function() {
            console.log('changed')
            that.isChanged = false;
          }, 1000);
        } else {
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function(error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      });
    }
  },
  computed: mapState(['userInfo']),
}
</script>

<style scoped>
#image
{
  position: absolute;

  width: 100%;
  height: 100%;

  opacity: 0;
  z-index: 99;
}
.avatar{
  width: 62px;
  height: 62px;
  border-radius: 50%;

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
  /*background: url(../../static/images/my_code.png);*/
  /*background-size: 20px 20px;*/
  width: 20px;
  height: 30px;
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
.container-main .main-title{
  display: block;

  width: 100px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 10px;

  text-align: center;
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