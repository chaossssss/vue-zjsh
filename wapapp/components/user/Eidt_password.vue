<template>
	<div>
    <div class="fill-pwd" style="margin-top:21px;">
      <div v-if="seeInput" class="show-msg">输入新密码</div>
      <input id="password" v-model="password" v-bind="{type: pwdType}" @keyup="inputPwd" :class="[hasInputPwd ? input : noInput]" placeholder="输入新密码">
      <div v-show="seeTop" :class="[isShowPwd ? show_on : show_off]" @click="showPwd"></div>
    </div>
    <div class="fill-pwd">
      <div v-if="seeCheck" class="show-msg">确认新密码</div>
      <input id="repassword" v-model="repassword" v-bind="{type: repwdType}" @keyup="inputRepwd" :class="[hasInputRepwd ? input : noInput]" placeholder="确认新密码">
      <div v-show="seeBottom" :class="[isShowRepwd ? show_on : show_off]" @click="showRepwd"></div>
    </div>
    <div class="submit">确认</div>
	</div>
</template>

<script>
export default{
  data:function(){
    return{
      pwdType:'password',
      repwdType:'password',
      seeInput:false,
      seeCheck:false,
      password:'',
      repassword:'',
      hasInputPwd:false,
      hasInputRepwd:false,
      input:'pwd-filled',
      noInput:'pwd-fill',
      seeTop:false,
      seeBottom:false,
      isShowPwd:false,
      isShowRepwd:false,
      show_on:'visibility_on',
      show_off:'visibility_off'
    }
  },
  methods:{
    inputPwd:function(event){
      if(this.password != ''){
        this.seeInput = true;
        this.seeTop = true;
        this.hasInputPwd = true;
      }else{
        this.seeInput = false;
        this.seeTop = false;
        this.hasInputPwd = false;        
      }
    },
    inputRepwd:function(event){
      if(this.repassword != ''){
        this.seeCheck = true;
        this.seeBottom = true;
        this.hasInputRepwd = true;
      }else{
        this.seeCheck = false;
        this.seeBottom = false;
        this.hasInputRepwd = false;        
      }
    },
    showPwd:function(event){
      if(this.isShowPwd){
        this.isShowPwd = !this.isShowPwd;
        this.pwdType = 'password';
      }else{
        this.isShowPwd = !this.isShowPwd;
        this.pwdType = 'text';        
      }
    },
    showRepwd:function(event){
      if(this.isShowRepwd){
        this.isShowRepwd = !this.isShowRepwd;
        this.repwdType = 'password';
      }else{
        this.isShowRepwd = !this.isShowRepwd;
        this.repwdType = "text";
      }
    }
  }
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