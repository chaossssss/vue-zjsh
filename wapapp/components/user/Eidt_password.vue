<template>
	<div>
    <div class="fill-pwd" style="margin-top:21px;">
      <div v-if="seeOri" class="show-msg">输入原密码{{seeOri}}</div>
      <input id="oriPassword" v-model="oPassword" v-bind="{type: pwdType}" @keyup="inputPwd" :class="[hasInputPwd ? input : noInput]" placeholder="输入原密码">
      <div v-show="seeTop" :class="[isShowPwd ? show_on : show_off]" @click="showPwd"></div>
    </div>

    <div class="fill-pwd">
      <div v-if="seeNew" class="show-msg">输入新密码</div>
      <input id="newPassword" v-model="nPassword" v-bind="{type: newPwdType}" @keyup="inputNewPwd" :class="[hasInputNewPwd ? input : noInput]" placeholder="输入新密码">
      <div v-show="seeMiddle" :class="[isShowNewPwd ? show_on : show_off]" @click="showNewPwd"></div>
    </div>

    <div class="fill-pwd">
      <div v-if="seeRep" class="show-msg">确认新密码</div>
      <input id="rePassword" v-model="rPassword" v-bind="{type: rePwdType}" @keyup="inputRePwd" :class="[hasInputRePwd ? input : noInput]" placeholder="确认新密码">
      <div v-show="seeBottom" :class="[isShowRePwd ? show_on : show_off]" @click="showRePwd"></div>
    </div>
    <div class="submit" @click="setPwd">确认</div>


    <!-- 状态提示 -->
    <div class="js_dialog" id="iosDialog2" v-show="isOk">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">{{ submitMsg }}</div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="submitResult">朕 知道了!</a>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import API from '../../config/backend';
import COM from '../../config/common';
import axios from 'axios';
import qs from 'qs';

export default{
  name: 'eidtPassword',
  data: function() {
    return {
      pwdType: 'password',
      newPwdType: 'password',
      rePwdType: 'password',
      seeOri: false,
      seeNew: false,
      seeRep: false,
      oPassword: '',
      nPassword: '',
      rPassword: '',
      hasInputPwd: false,
      hasInputNewPwd: false,
      hasInputRePwd: false,
      input: 'pwd-filled',
      noInput: 'pwd-fill',
      seeTop: false,
      seeMiddle: false,
      seeBottom: false,
      isShowPwd: false,
      isShowNewPwd: false,
      isShowRePwd: false,
      show_on: 'visibility_on',
      show_off: 'visibility_off',
      isOk: false,
      isSuccess: false,
      submitMsg: ''
    }
  },
  methods: {
    setPwd() {
      if (oPassword == nPassword || oPassword == rPassword) {
        this.isOk = true;
        this.submitMsg = '新密码不能与原密码一致！';
      } else if(nPassword != rPassword) {
        this.isOk = true;
        this.submitMsg = '两次输入的新密码不一致！'
      } else {
        axios.post(API.SetPwd, qs.stringify({
          "Token": this.Token,
          "Password": this.oPassword,
          "NewPassword": this.nPassword
        }), {
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.isOk = true;
          if (res.data.Meta.ErrorCode == '0') {
            this.submitMsg = '密码修改成功';
            this.isSuccess = true;
          } else {
            this.submitMsg = res.data.Meta.ErrorMsg;
          }
        }).catch(function(error) {
          console.log(error);
          this.isOk = true;
          this.submitMsg = "密码修改失败，请检查网络是否正常！";
        })
      }
    },
    submitResult() {
      this.isOk = false;
      if(this.isSuccess) {
        this.$router.go(-1);
      }
    },
    inputPwd(event) {
      if (this.oPassword != '') {
        this.seeOri = true;
        this.seeTop = true;
        this.hasInputPwd = true;
      } else {
        this.seeOri = false;
        this.seeTop = false;
        this.hasInputPwd = false;
      }
    },
    inputNewPwd(event) {
      if (this.nPassword != '') {
        this.seeNew = true;
        this.seeMiddle = true;
        this.hasInputNewPwd = true;
      } else {
        this.seeNew = false;
        this.seeMiddle = false;
        this.hasInputNewPwd = false;
      }
    },
    inputRePwd(event) {
      if (this.rPassword != '') {
        this.seeRep = true;
        this.seeBottom = true;
        this.hasInputRePwd = true;
      } else {
        this.seeRep = false;
        this.seeBottom = false;
        this.hasInputRePwd = false;
      }
    },
    showPwd(event) {
      if (this.isShowPwd) {
        this.isShowPwd = !this.isShowPwd;
        this.pwdType = 'password';
      } else {
        this.isShowPwd = !this.isShowPwd;
        this.pwdType = 'text';
      }
    },
    showNewPwd(event) {
      if (this.isShowNewPwd) {
        this.isShowNewPwd = !this.isShowNewPwd;
        this.newPwdType = 'password';
      } else {
        this.isShowNewPwd = !this.isShowNewPwd;
        this.newPwdType = 'text';
      }
    },
    showRePwd(event) {
      if (this.isShowRePwd) {
        this.isShowRePwd = !this.isShowRePwd;
        this.rePwdType = 'password';
      } else {
        this.isShowRePwd = !this.isShowRePwd;
        this.rePwdType = "text";
      }
    }
  },
  computed: mapState(['Token'])
}
</script>

<style scoped>
.fill-pwd{
  width: 86%;
  height: 65px;
  position: relative;
  margin: 0 auto;
}
.fill-pwd:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #a4a4a4;
  color: #a4a4a4;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.pwd-input{
  border: none;
  outline: none;
  margin-top: 39px;
}
.pwd-fill{
  border: none;
  outline: none;
  margin-top: 48px;
}
.pwd-filled{
  border: none;
  outline: none;
}
input::-webkit-input-placeholder { font-size: 15px; color: #a4a4a4; }
input::-moz-placeholder { font-size: 15px; color: #a4a4a4; } /* firefox 19+ */
input:-ms-input-placeholder { font-size: 15px; color: #a4a4a4; } /* ie */
input:-moz-placeholder { font-size: 15px; color: #a4a4a4; }
.show-msg{
  color: #a4a4a4;
  font-size: 12px;
  padding-top: 23px;
}
.submit{
  width: 86%;
  height: 41px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 41px;
  background: #32beff;
  border-radius: 4px;
  margin: 20px auto 0px;
}
.visibility_on{
  background: url(../../static/images/visibility_on.png);
  background-size: 18px 12px;
  width: 18px;
  height: 12px;
  float: right;
  margin-top: 0px;
}
.visibility_off{
  background: url(../../static/images/visibility_off.png);
  background-size: 18px 9px;
  width: 18px;
  height: 9px;
  float: right;
  margin-top: 4px;
}
</style>