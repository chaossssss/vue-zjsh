<template>
<div class="full">
  <div class="account-balance">
    <span class="balance-title">账户余额（元）</span>
    <span class="balance-amount">{{ balanceAmount }}</span>
  </div>

  <div class="wrapper">
    <div class="wallet-recharge">
      <router-link class="weui-btn btn-recharge" to="/User_recharge">充值</router-link>
    </div>

    <router-link class="weui-cell bill-detail" to="/User_bill">
      <img class="weui-cell__hd bill-img" src="../../static/images/wallet_bill.png">

      <span class="weui-cell__bd bill-title">账单明细</span>

      <img class="weui-cell__ft" src="../../static/images/right_gray.png">
    </router-link>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import API from '../../config/backend';
import COM from '../../config/common';
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'userWallet',
  data() {
    return {
      balanceAmount: 0,
      Token: ''
    }
  },
  computed: mapState(['userInfo']),
  mounted() {
    this.Token = COM.getCookie("Token");
    axios.post(API.MySettlement, qs.stringify({
      "Token": COM.getCookie("Token")
    }), {
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      this.balanceAmount = res.data.Body.SettlementBalance;
    }).catch(function(error) {
      console.log(error);
      this.isError = true;
      this.errorMsg = "获取工人收藏失败，请检查网络是否正常!";
    });
  }
}
</script>

<style scoped>

/* common */

a:link,
a:visited,
a:hover,
a:active
{
  color: #fff;
}

.full
{
  width: 100%;
  height: 100%;

  background-color: #fbfbfb;
}

/* common end */

/* header */

.account-balance
{
  width: 100%;
  height: 240px;
  overflow: hidden;

  color: #fff;
  text-align: center;
  background-image: url(../../static/images/wallet_background.png);
  background-size: 100% 100%;
}

.balance-title
{
  display: block;

  margin-top: 80px;

  font-size: 16px;
}

.balance-amount
{
  font-size: 60px;
}

/* header end */

/* 充值 */

.wallet-recharge
{
  padding: 15px;
  border-bottom: 1px solid #ddd;

  background-color: #fff;
}

.btn-recharge
{
  color: #fff;
  background-color: #27b8f3;
  font-size: 18px;
}

/* 充值 end */

/* 账单详情 */

.bill-detail
{
  padding: 15px;
  border-bottom: 1px solid #ddd;

  background-color: #fff;
}

.bill-img
{
  width: 26px;
}

.bill-title
{
  margin-left: 12px;

  color: #333;
  font-size: 16px;
}

/* 账单详情 end */

</style>