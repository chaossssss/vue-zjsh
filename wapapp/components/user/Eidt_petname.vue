<template>
	<div>
    <div class="name_container">
      <input v-model="name" id="name-input" @keyup="addName" class="name_input" type="text" placeholder="请输入新的昵称">
      <div id="name-controller" v-if="seen" @click="cleanName" class="clean_btn"></div>
    </div>
    <div class="message">请把您的昵称控制在10个字符以内哦</div>
    <div class="submit">确认保存</div>
	</div>
</template>

<script>
export default{
  data:function(){
    return{
        seen:false,
        name:''
    }
  },
  methods:{
    addName:function(event){
      if(this.name != ''){
        this.seen = true;
      }
    },
    cleanName:function(event){
      if(this.name != ''){
        this.name = '';
        this.seen = false
      }
    }
  }
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