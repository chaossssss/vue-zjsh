<template>
<div class="bg">
  <!-- 充值金额 -->
	<div class="price-list">
    <div v-for="list in rechargeList" class="row">
      <span v-for="item in list" :class="{ 'given': item.ReturnType == undefined ? false : true }" class="recharge-amount">{{ item.RechargeMoney }}元<span v-if="item.ReturnType" class="given-title">赠送{{ item.ReturnMoney }}元</span></span>
    </div>
	</div>

  <!-- 金额信息 -->
  <div class="weui-cells amount-info">
    <div class="weui-cell recharge-info">
      <div class="weui-cell__bd">充值金额：</div>
      <div class="weui-cell__ft">{{ rechargeAmount }}</div>
    </div>
    <div class="weui-cell given-info" v-show="givenAmount!=0">
      <div class="weui-cell__bd">额外赠送<span class="given-amount">{{ givenAmount }}元</span></div>
      <div class="weui-cell__ft">实际可得<span class="total-amount">{{ rechargeAmount + givenAmount }}</span></div>
    </div>
  </div>

  <!-- 支付方式 -->
  <div class="pay-list">
    <div class="pay-way">
      <span class="way-title">选择支付方式</span>

      <ul>
        <li class="way-item" @click="payWay=0">
          <img class="way-icon" src="../../static/images/pic-zhifubao.png">

          <div class="item-right">
            <span class="way-name">支付宝支付</span>

            <i class="way-radio" :class="{ 'active': payWay==0 }"></i>
          </div>
        </li>

        <li class="way-item" @click="payWay=1">
          <img class="way-icon" src="../../static/images/wechat.png">

          <div class="item-right">
            <span class="way-name">微信支付</span>

            <i class="way-radio" :class="{ 'active': payWay==1 }"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- 支付按钮 -->
  <a @click="recharge" class="weui-btn btn-recharge">立即支付{{ rechargeAmount }}元</a>
</div>
</template>

<script>
import API from '../../config/backend';
import COM from '../../config/common';
import axios from 'axios';
import qs from 'qs';

export default {
  name: "recharge",
  data() {
    return {
      rechargeAmount: 0,
      givenAmount: 0,
      // 支付方式：0->支付宝，1->微信
      payWay: 0,
      rechargeList: []
    }
  },
  mounted() {
    axios.post(API.GetRechargeListEx, qs.stringify({}), {
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      let list = res.data.Body.List;
      for(let i = 0, j = 0; i < list.length; i++) {
        if(i % 3 == 0) {
          let arr = [];
          arr.push(list[i]);
          arr.push(list[i + 1]);
          arr.push(list[i + 2]);
          this.rechargeList[j] = arr;
          j++;
        }
      }
    }).catch(function(error) {
      console.log(error);
      this.isError = true;
      this.errorMsg = "获取工人收藏失败，请检查网络是否正常!";
    })
  },
  methods: {
    recharge() {

    }
  }
}
</script>

<style scoped>

/* common */

.bg
{
  box-sizing: border-box;

  min-height: 100%;
  padding-top: 15px;

  background: #eee;
}

/* common end */

/* 价格列表 */

.row
{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

   padding: 0 15px;
  /*overflow: hidden; */
}

.row:not(:first-child)
{
  margin-top: 15px;
}

.row .recharge-amount
{
  /*float: left;
  box-sizing: border-box;
  display: block;*/
  width: 30%;
  height: 80px;
  /*margin: 0 auto;*/
  line-height: 80px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;

  text-align: center;
  font-size: 20px;
  color: #333;
  background-color: #fff;
}

.row .recharge-amount.active
{
  border:1px solid #27b7f3;
  color:#27b7f3;
}

.row .recharge-amount.given
{
  position: relative;
}

.row .recharge-amount.given::before
{
  content: '';
  width: 39px;
  height: 22px;
  position: absolute;
  top: -4px;
  right: 10px;

  background-image: url(../../static/images/wallet_tip.png);
  background-size: 100% 100%;
}

.row .recharge-amount.given .given-title
{
  position: absolute;
  left: 0;
  top: 54px;

  width: 100%;
  height: 20px;
  line-height: 20px;

  text-align: center;
  font-size: 12px;
  color: #999;
}

/* 价格列表 end */

/* 支付金额 */

.amount-info
{
  margin-top: 40px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.weui-cell
{
  padding: 10px 25px;
}

.recharge-info .weui-cell__bd
{
  color: #333;
  font-size: 16px;
}

.recharge-info .weui-cell__ft
{
  color: #333;
  font-size: 26px;
}

.recharge-info .weui-cell__ft::before
{
  content: '￥';

  font-size: 16px;
  color: #999;
}

.given-info .weui-cell__bd
{
  line-height: 100%;

  color: #666;
}

.given-info .weui-cell__ft
{
  line-height: 100%;

  color: #666;
}

.given-info .given-amount
{
  margin-left: 10px;

  color: #27b7f3;
}

.given-info .total-amount
{
  margin-left: 10px;

  color: #26b6f3;
  font-size: 16px;
}

.given-info .total-amount::before
{
  content: '￥';
  font-size: 12px;
}

/* 支付金额 end */

/* 支付方式 */

.pay-list
{
  margin-top: 40px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  background-color: #fff;
}

.pay-list .way-title
{
  display: block;

  margin-left: 15px;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;

  color: #666;
  font-size: 14px;
}

.pay-list .way-item
{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  padding-left: 30px;
}

.way-item .way-icon
{
  width: 40px;

  padding: 10px 0;
}

.way-item .item-right
{
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  padding: 10px 0;
}

.way-item:not(:first-child) .item-right
{
  border-top: 1px solid #ccc;
}

.item-right .way-name
{
  font-size: 16px;
}

.item-right .way-radio
{
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-top: 7px;
  margin-right: 15px;

  background-image: url(../../static/images/unselected.png);
  background-size: 100% 100%;
}

.item-right .way-radio.active
{
  background-image: url(../../static/images/select.png);
}


/* 支付方式 end */

/* 支付按钮 */

.btn-recharge
{
  box-sizing: border-box;

  margin: 30px 15px 80px;
  padding: 0 15px;

  color: #fff;
  background-color: #27b8f3;
  font-size: 18px;
}

/* 支付按钮 end */

</style>