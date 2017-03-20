<template>
	<div>
    <div class="name_container">
      <input v-model="name" id="name-input" @keyup="addName" class="name_input" type="text" maxlength="10" placeholder="请输入新的昵称">
      <div id="name-controller" v-if="seen" @click="cleanName" class="clean_btn"></div>
    </div>
    <div class="message">请把您的昵称控制在10个字符以内哦</div>
    <div class="submit" @click="result">确认保存</div>

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
import COM from '../../config/common';
import axios from 'axios';
import qs from 'qs';

export default{
  name: 'eidtPetName',
  data(){
    return{
        seen:false,
        name:'',
        isSubmit: false,
        isChanged: false,
        msg: ''
    }
  },
  methods:{
    result() {
      console.log(this.userInfo)
      if (this.name != '') {
        axios.post(API.SetNickName, qs.stringify({
          "Token": this.Token,
          "NickName": this.name
        }), {
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.isSubmit = true;
          let that = this;
          if (res.data.Meta.ErrorCode == '0') {
            this.msg = '昵称修改成功';
            this.isChanged = true;

            let _userInfo = this.userInfo;
            _userInfo.NickName = this.name;
            this.$store.dispatch('setUserInfo', {
              txt: _userInfo
            })

            setTimeout(function() {
              that.isChanged = true;
              that.$router.go(-1);
            }, 1000);
          } else {
            this.msg = res.data.Meta.ErrorMsg;
          }
        }).catch(function(error) {
          console.log(error);
          this.isSubmit = true;
          this.msg = "密码修改失败，请检查网络是否正常！";
        })
      } else {
        this.isSubmit = true;
        this.msg = '昵称不能为空';
      }
    },
    submitResult() {
      this.isSubmit = false;
      if(this.isChanged) {
        this.$router.go(-1);
      }
    },
    addName(event){
      if(this.name != ''){
        this.seen = true;
      }
    },
    cleanName(event){
      if(this.name != ''){
        this.name = '';
        this.seen = false
      }
    }
  },
  computed: mapState(['userInfo', 'Token'])
}
</script>

<style scoped>
.name_container{
  height: 50px;
  position: relative;
}
.name_container:after{
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
.name_input{
  border: none;
  margin: 19px 0 0 16px;
  outline: none;
}
input::-webkit-input-placeholder { font-size: 13px; }
input::-moz-placeholder { font-size: 13px; } /* firefox 19+ */
input:-ms-input-placeholder { font-size: 13px; } /* ie */
input:-moz-placeholder { font-size: 13px; }
.clean_btn{
  background: url(../../static/images/clean_btn.png);
  background-size: 12px 12px;
  margin: 19px 18px 0 0;
  width: 12px;
  height: 12px;
  float: right;
}
.message{
  margin-top: 8px;
  margin-left: 16px;
  color: #8c8a9f;
  font-size: 11px;
}
.submit{
  color: #8c8a9f;
  font-size: 14px;
  width: 70%;
  height: 35px;
  border: 1px #e0dfe9 solid;
  border-radius: 2px;
  text-align: center;
  line-height: 35px;
  margin: 50px auto;
}
</style>