<template>
  <div>
    <div class="bill-money">-300</div>
    <div class="bill-container">
      <div class="bill-line">
        <div class="bill-content">交易说明:</div>
        <div class="bill-data">订单支付</div>
        <div class="clear"></div>
      </div>
      <div class="bill-line">
        <div class="bill-content">支付方式:</div>
        <div class="bill-data">在线交易</div>
        <div class="clear"></div>
      </div>
      <div class="bill-line">
        <div class="bill-content">订单金额:</div>
        <div class="bill-data">300</div>
        <div class="clear"></div>
      </div>
      <div class="bill-line">
        <div class="bill-content">订单优惠:</div>
        <div class="bill-data">-50</div>
        <div class="clear"></div>
      </div>
      <div class="bill-line">
        <div class="bill-content">增项:</div>
        <div class="bill-data">+100</div>
        <div class="clear"></div>
      </div>
      <div class="bill-line">
        <div class="bill-content">减项:</div>
        <div class="bill-data">-50</div>
        <div class="clear"></div>
      </div>
      <div class="bill-line">
        <div class="bill-content">创建时间:</div>
        <div class="bill-data">2016-20-08 09：00</div>
        <div class="clear"></div>
      </div>
      <div class="bill-line">
        <div class="bill-content">订单号:</div>
        <div class="bill-data" style="color:#25baf2;">123456</div>
        <div class="clear"></div>
      </div>
      <div class="bill-line">
        <div class="bill-content">交易单号:</div>
        <div class="bill-data">201586932384092</div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.clear{
  clear: both;
}
.bill-money{
  height: 111px;
  font-size: 50px;
  color: #333333;
  text-align: center;
  position: relative;
  line-height: 100px;
}
.bill-money:after{
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
.bill-container{
  padding: 25px 15px 0;
}
.bill-line{
  padding-top: 7px;
}
.bill-content{
  font-size: 13px;
  color: #666666;
  float: left;
}
.bill-data{
  font-size: 13px;
  color: #999999;
  float: right;
}
</style>