<template>
  <div style="background:#fbfbfb;width:100%;height:100%;position:absolute;">
    <div class="money-container">
      <div class="recharge-line">
        <div class="title">充值金额</div>
        <div class="recharge-amount">108元</div>
        <div class="clear"></div>
      </div>
      <div class="payment-line">
        <div class="title">支付金额</div>
        <div class="payment-amount">100元</div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">选择支付方式</div>
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" style="width:30px;height:30px;">
            <label for="zhifubao">
              <img class="weui-media-box__thumb" src="../../static/images/alipay.png" alt="">
            </label>
          </div>
          <div class="weui-media-box__bd">
            <label for="zhifubao">
              <h4 class="weui-media-box__title">支付宝支付</h4>
            </label>
          </div>
          <input id="zhifubao" :checked="isAlipay" @click="chooseAlipay" type="checkbox" name="zhifubao" value="zhifubao">
        </a>
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" style="width:30px;height:30px;">
            <label for="weixin">
              <img class="weui-media-box__thumb" src="../../static/images/wechat.png" alt="">
            </label>
          </div>
          <div class="weui-media-box__bd">
            <label for="weixin">
              <h4 class="weui-media-box__title">微信支付</h4>
            </label>
          </div>
          <input id="weixin" :checked="isWechat" @click="chooseWechat" type="checkbox" name="weixin" value="weixin">
        </a>
      </div>
    </div>
    <div style="margin-top:25px;margin-left:14px;font-size:14px;color:#888;">
      <p>温馨提示:</p>
      <p>1.在线支付才能享受特价等优惠活动哦</p>
      <p>2.如有疑问请联系客服 <a href="tel:4008-262-056"><span style="color:#27b8f3;">4008-262-056</span></a></p>
    </div>
    <a id="goPayment" href="javascript:void(0);">
      <div id="submitBtn" class="submit-btn">支付</div>
    </a>
  </div>
</template>

<script>
export default{
  data(){
    return{
      isAlipay:false,
      isWechat:false
    }
  },
  methods:{
    chooseAlipay:function(event){
      this.isAlipay = true;
      this.isWechat = false;
    },
    chooseWechat:function(event){
      this.isAlipay = false;
      this.isWechat = true;
    }
  }
}
</script>

<style scoped>
.clear{
  clear: both;
}
.money-container{
  height: 90px;
  background: #fff;
  position: relative;
}
.money-container:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #cccccc;
  color: #cccccc;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.money-container:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #cccccc;
  color: #cccccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.recharge-line{
  height: 45px;
  padding-left: 12px;
}
.payment-line{
  height: 45px;
  padding-left: 12px;
  position: relative;
}
.payment-line:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #cccccc;
  color: #cccccc;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 12px;  
}
.title{
  float: left;
  color: #000;
  font-size: 14px;
  line-height: 45px;
}
.recharge-amount{
  float: right;
  padding-right: 15px;
  color: #fe552e;
  line-height: 45px;
}
.payment-amount{
  float: right;
  padding-right: 15px;
  color: #333333;
  line-height: 45px;
}
.pay-mode{
  height: 129px;
  background: #fff;
  position: relative;
  margin-top: 15px;
}
.pay-mode:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #cccccc;
  color: #cccccc;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.pay-mode:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #cccccc;
  color: #cccccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
input[type=checkbox]{
  outline: none;
  -webkit-appearance:none;
  appearance:none;
  width: 21px;
  height: 21px;
  margin: 0;
  cursor: pointer;
  vertical-align: bottom;
  background: url(../../static/images/unselected.png);
  background-size: 21px 21px;
  -webkit-border-radius: 1px;
  -moz-border-radius: 1px;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  border: none;
}
input[type=checkbox]:checked{
  outline: none;
  -webkit-appearance:none;
  appearance:none;
  width: 21px;
  height: 21px;
  margin: 0;
  cursor: pointer;
  vertical-align: bottom;
  background: url(../../static/images/select.png);
  border: none;
  background-size: 21px 21px;
  -webkit-border-radius: 1px;
  -moz-border-radius: 1px;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}
.submit-btn{
  width: 100%;
  height: 50px;
  color: #fff;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
  background: #51d862;
  position: fixed;
  bottom: 0;
}
</style>