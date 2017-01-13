<template>
	<div style="background:#fbfbfb;width:100%;height:100%;position:absolute;">
    <div v-if="showBroadcast" class="zj_broadcast">
      <div class="news_broadcast">助家生活充值全部8.5折</div>
      <div @click="closeBroadcast" class="close_broadcast"></div>
    </div>
    <div class="my_wallet">
      <div class="balance_title">
        账户余额(元)
      </div>
      <div class="balance_number">
        0.00
      </div>
    </div>
    <div class="recharge_interface">
      <router-link to="/user_recharge">
        <div class="recharge_btn">充值</div>
      </router-link>
    </div>
    <div class="weui-cells">
    <router-link class="weui-cell weui-cell_access" to="/user_bill">
      <div class="weui-cell__hd">
        <img class="wallet_bill" src="../../static/images/wallet_bill.png">
      </div>
      <div class="weui-cell__bd">
        <router-link to="/user_bill">
          <p>账单明细</p>
        </router-link>
      </div>
      <div class="weui-cell__ft"></div>
    </router-link>
</div>
	</div>
</template>

<script>
export default{
  data(){
    return{
      showBroadcast:true
    }
  },
  methods:{
    closeBroadcast:function(){
      this.showBroadcast = false;
    }
  }
}
</script>

<style scoped>
a:active,a:hover,a:visited{
  color: #333333;
}
.zj_broadcast{
  width: 100%;
  height: 25px;
  background: #feffd3;
}
.news_broadcast{
  color: #ffa701;
  font-size: 14px;
  background: url(../../static/images/wallet_trumpet.png) 0 3px no-repeat;
  background-size: 17px 16px;
  margin-left: 12px;
  padding-left: 24px;
  float: left;
}
.close_broadcast{
  width: 15px;
  height: 15px;
  margin: 5px 7px 0 0;
  background: url(../../static/images/wallet_close.png);
  background-size: 15px 15px;
  float: right;
}
.my_wallet{
  height: 180px;
  background: url(../../static/images/wallet_background.png);
  background-size: cover;
}
.balance_title{
  color: #fff;
  font-size: 15px;
  text-align: center;
  padding-top: 43px;
}
.balance_number{
  color: #fff;
  font-size: 48px;
  text-align: center;
  margin-top: 22px;
  line-height: 1.0;
}
.recharge_interface{
  height: 62px;
  padding-top: 12px;
  background: #fff;
  position: relative;
}
.recharge_interface:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #dddddd;
  color: #dddddd;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.recharge_btn{
  width: 350px;
  background: #27b7f3;
  color: #fff;
  height: 50px;
  text-align: center;
  border-radius: 2px;
  line-height: 50px;
  margin: 0 auto;
}
.wallet_bill{
  width: 28px;
  height: 28px;
  margin-top: 3px;
  padding-right: 13px;
}
</style>