<template>
<div>
	 <header>
      <ul class="bill-state">
        <li id="unuse" class="all" :class="{'active':flag==1}" @click="flag=1">全部</li>
        <li style="margin-left: 13%;" id="used" :class="{'active':flag==2}" @click="flag=2">收入</li>
        <li id="delay" :class="{'active':flag==3}"  @click="flag=3">支出</li>
      </ul>
      <div class="clear"></div>
    </header>
    <main>
      <div class="bill-top">
        <div class="first-line">
          <div class="bill-title">订单支付</div>
          <div class="bill-money">-100</div>
          <div class="clear"></div>
        </div>
        <div class="second-line">
          <div class="bill-time">今天09:42</div>
          <div class="bill-type">(线下交易)</div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="bill">
        <div class="first-line">
          <div class="bill-title">返现</div>
          <div class="bill-money">+100</div>
          <div class="clear"></div>
        </div>
        <div class="second-line">
          <div class="bill-time">今天09:42</div>
          <div class="bill-type"></div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="bill">
        <div class="first-line">
          <div class="bill-title">返现</div>
          <div class="bill-money">+100</div>
          <div class="clear"></div>
        </div>
        <div class="second-line">
          <div class="bill-time">今天09:42</div>
          <div class="bill-type"></div>
          <div class="clear"></div>
        </div>
      </div>
    </main>
</div>	
</template>

<script>
export default {
  data(){
    return{
      flag: 1
    }            
  },
  methods: {   
  }
}
</script>

<style scoped>
.clear{
  clear: both;
}
.bill-state{
  position: relative;
  width: 89%;
  margin: auto;
}
header{
  position: relative;
}

header:before {
  content: '';
  position: absolute;
  width: 200%;
  height: 1px;
  bottom: 0;
  border-bottom: 1px solid #ccc;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(.5,.5);
  transform: scale(.5,.5);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.bill-state>li{
  display: inline-block;
  width: 23%;
  text-align: center;
  padding: 10px 0;
  color: #999;
  margin-left: 6px;
}
.bill-state>li:last-child{
  float: right;
}
.active{
  border-bottom: 2px solid #27b8f3;
  color:#27b8f3;
}
/*.all{
  background: url(../../static/images/wallet_all.png) no-repeat 0px 12px;
  background-size: 22px 22px;
}*/
.bill-top{
  height: 70px;
  position: relative;
}
.bill{
  height: 70px;
  position: relative;
}
.bill:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #ddd;
  color: #ddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 12px;
}
.bill-title{
  font-size: 16px;
  color: #333;
  float: left;
}
.bill-money{
  font-size: 16px;
  color: #333;  
  float: right;
}
.bill-time{
  font-size: 12px;
  color: #999;
  float: left;
}
.bill-type{
  font-size: 12px;
  color: #666;
  float: right;
}
.first-line{
  padding: 16px 12px 0; 
}
.second-line{
  padding: 4px 12px 0;
}	
</style>