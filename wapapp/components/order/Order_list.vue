<template>
<div style="background-color: #fbfbfb">
	<div class="vue-tab">
		<div class="vue-navbar">
			<div :class="{'vue-navbar__item_on':type===0}" @click="type=0" class="vue-navbar__item">全部</div>
			<div :class="{'vue-navbar__item_on':type===4}" @click="type=4" class="vue-navbar__item" >待接单</div>
			<div :class="{'vue-navbar__item_on':type===1}" @click="type=1" class="vue-navbar__item">待付款</div>
			<div :class="{'vue-navbar__item_on':type===2}" @click="type=2" class="vue-navbar__item">待确认</div>
			<div :class="{'vue-navbar__item_on':type===3}" @click="type=3" class="vue-navbar__item">待评价</div>
		</div>

		<div class="vue-tab__panel" id="wrapper_list">
			<div class="vue-panel" v-for="item in list">
				<div class="vue-panel__hd" :class="{
					'green':item.Service.RootId === '170',
					'purple':item.Service.RootId === '171',
					'pink':item.Service.RootId === '172',
					'red':item.Service.RootId === '169',
					'orange':item.Service.RootId === '168'}">
					<div class="vue-cell">
						<div class="vue-cell__hd">
							<span class="fc0">{{item.Service.ServiceName}}</span>
						</div>
						<div class="vue-cell__bd"></div>
            <div class="vue-cell__ft blue" v-if="item.situation === 101 || item.situation === 1003">
              <span>待接单</span>
            </div>
            <div class="vue-cell__ft blue" v-if="item.situation === 100 || item.situation === 210 || item.situation === 2103">
              <span>待付款</span>
            </div>
            <div class="vue-cell__ft blue" v-if="item.situation === 211 || item.situation === 2113">
              <span>待服务</span>
            </div>
            <div class="vue-cell__ft blue" v-if="item.situation === 311">
              <span>待确认</span>
            </div>
            <div class="vue-cell__ft blue" v-if="item.situation === 411">
              <span>待评价</span>
            </div>
            <div class="vue-cell__ft blue" v-if="item.situation === 501 || item.situation === 511">
              <span>退款中</span>
            </div>
            <div class="vue-cell__ft blue" v-if="item.situation === 600 || item.situation === 601 || item.situation === 610 || item.situation === 611">
              <span>已取消</span>
            </div>
					</div>
				</div>
				<div class="vue-panel__bd" @click="routerTo(item.OrderId)">
						<div class="vue-cell" style="padding:0 15px 5px;" v-if="item.Worker">
							<div class="vue-cell__hd">
								<img :src="item.Worker.Icon" alt="" style="width:25px;height:25px;margin-right:10px;display:block;border-radius:50%;">
							</div>
							<div class="vue-cell__bd">
								<span>{{item.Worker.Name}}</span>
								<span v-if="item.Worker.Gender === '1'">阿姨</span>
								<span v-if="item.Worker.Gender === '0'">师傅</span>
							</div>
						</div>
						<div class="vue-cell" style="padding:3px 15px">
							<div class="vue-cell__bd">
								<p class="fc9">服务时间</p>
							</div>
							<div class="vue-cell__ft">
								{{item.serviceStartTime}}
							</div>
						</div>
						<div class="vue-cell" style="padding:3px 15px">
							<div class="vue-cell__bd">
								<p class="fc9">服务地址</p>
							</div>
							<div class="vue-cell__ft" style="width:80%;">
								{{item.Service.AddressInfo.Address1}}{{item.Service.AddressInfo.Address2}}
							</div>
						</div>
						<div class="vue-cell" style="padding:3px 15px">
							<div class="vue-cell__bd">
								<p class="fc9">服务价格</p>
							</div>
              <div class="vue-cell__ft" v-if="!item.TotalPrice && !item.StartingPrice && !item.Price">
                面议
              </div>
							<div class="vue-cell__ft" v-if="item.Price && item.TotalPrice">
								¥{{item.Price}}/{{item.UnitName}} &nbsp;x{{item.Total}}
							</div>
							<div class="vue-cell__ft" v-if="!item.Price && item.StartingPrice">
								¥{{item.StartingPrice}}元&nbsp;起
							</div>
						</div>
						<div class="vue-cell" style="padding-top:5px;" v-if="item.IsPayOff == 0">
							<div class="vue-cell__bd"></div>
							<div class="vue-cell__ft">
								 <span >待支付：</span>
								<span class="red f16">¥ {{item.payable}}</span>
							</div>
						</div>
						<div class="vue-cell" style="padding-top:5px;" v-if="item.IsPayOff == 1">
							<div class="vue-cell__bd"></div>
							<div class="vue-cell__ft">
								 <span >实付：</span>
								<span class="red f16">¥ {{item.payable}}</span>
							</div>
						</div>
				</div>
				<div class="vue-panel__ft">
					<div class="vue-cell" style="padding:5px 15px;">
						<div class="vue-cell__bd"></div>
						<div class="vue-cell_ft">
							<button @click="delOrder(item.OrderId)" v-if="item.situation === 600 || item.situation === 601 || item.situation === 610 || item.situation === 611" class="vue-btn vue-btn_plain-default">删除订单</button>
			        <button @click="cancelOrder(item.OrderId)" v-if="item.situation === 501 || item.situation === 511" class="vue-btn vue-btn_plain-default">取消订单</button>
			        <button @click="payOrder(item.OrderId)" v-if="item.IsPayOff == 0 && item.situation < 300" class="vue-btn vue-btn_plain-primary">支付</button>
			        <button @click="sureOrder(item.OrderId)" v-if="item.situation === 311" class="vue-btn vue-btn_plain-success">确认服务完成</button>
						</div>
					</div>
				</div>
			</div>

			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
		    <span class="vue-loader" slot="no-results">没有更多订单了</span>
		  </infinite-loading>
		</div>

	</div>

  <!-- 错误提示 -->
  <div class="js_dialog" id="iosDialog2" v-show="isError">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
          <div class="weui-dialog__bd">{{errorMsg}}</div>
          <div class="weui-dialog__ft">
              <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="isError = false">朕 知道了!</a>
          </div>
      </div>
  </div>

  <!-- 正在提交提示 -->
  <div id="loadingToast" v-show="isLoading">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
          <i class="weui-loading weui-icon_toast"></i>
          <p class="weui-toast__content">正在提交...</p>
      </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import API from '../../config/backend';
import COM from '../../config/common';
import axios from 'axios';
import qs from 'qs';

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export default {
  name: "order_list",
  data() {
    return {
      type: 0,
      list: [],
      isError: false,
      errorMsg: "",
      isLoading: false,
      Token:null
    }
  },
  created(){
    this.Token = COM.getCookie("Token");
  },
  methods: {
    async onInfinite() {
      await axios.post(API.GetOrderListEx, qs.stringify({
        "Token": this.Token,
        "PageIndex": this.list.length / 10 + 1,
        "PageSize": "10",
        "Type": this.type
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data.Meta.ErrorCode === '0') {
          if (res.data.Body.OrderList && res.data.Body.OrderList.length > 0) {
            res.data.Body.OrderList.map((v, i, arry) => {
              let isAccept = parseInt(v.ServiceProviderType) === 0 ? 0 : 1;
              arry[i]['situation'] = this.situation(v.OrderStatus, v.RefundStatus, v.IsPayOff, v.IsNegotiable, isAccept);
              arry[i]['payable'] = this.payable(v.ActivityNgs, v.DiscountAmount, v.TotalPrice, v.StartingPrice);
              arry[i]['serviceStartTime'] = this.formatTime(v.Service.ServiceStartTime);
            })
            this.list = this.list.concat(res.data.Body.OrderList);
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        } else {
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function(error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      });
    },
    delOrder(orderId) {
      this.isLoading = true;
      if (orderId) {
        axios.post(API.RemoveOrderEx, qs.stringify({
          "Token": this.Token,
          "OrderId": orderId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.isLoading = false;
          console.log("删除订单", res.data);
          if (res.data.Meta.ErrorCode === '0') {
            this.$router.go(0);
          } else {
            this.isDelete = false;
            this.isError = true;
            this.errorMsg = res.data.Meta.ErrorMsg;
          }
        }).catch(function(error) {
          console.log(error);
          this.isError = true;
          this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
        });
      }
    },
    cancelOrder(orderId) {
      this.isLoading = true;
      if (orderId) {
        axios.post(API.CancelOrderEx, qs.stringify({
          "Token": this.Token,
          "OrderId": orderId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.isLoading = false;
          console.log("取消订单", res.data);
          if (res.data.Meta.ErrorCode === '0') {
            this.$router.go(0)
          } else {
            this.isDelete = false;
            this.isError = true;
            this.errorMsg = res.data.Meta.ErrorMsg;
          }
        }).catch(function(error) {
          console.log(error);
          this.isError = true;
          this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
        });
      }
    },
    payOrder(orderId) {
      if (orderId) {
        this.$store.dispatch('setOrderId', {
          txt: orderId
        });
        this.$router.push({
          path: '/pay'
        });
      }
    },
    sureOrder(orderId) {
      this.isLoading = true;
      if (orderId) {
        axios.post(API.CompleteOrderEx, qs.stringify({
          "Token": this.Token,
          "OrderId": orderId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.isLoading = false;
          console.log("确认订单", res.data);
          if (res.data.Meta.ErrorCode === '0') {
            this.$router.go(0)
          } else {
            this.isDelete = false;
            this.isError = true;
            this.errorMsg = res.data.Meta.ErrorMsg;
          }
        }).catch(function(error) {
          console.log(error);
          this.isError = true;
          this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
        });
      }
    },
    situation(orderStatus, refundStatus, isPayOff, isNegotiable, isAccept) {
      //状态码返回规范
      //状态码由三位数组成，其中
      //百位：1:待接单 2:待服务 3:待确认 4:已完成 5.退款中 6.已退款
      //十位：0:工人未接单 1:工人已接单
      //个位：0:未付款 1:已付款

      //例外：面议单中顺序为先等工人接单再付款，为保证一致，在部分状态码后补3以区别（并非所有面议单状态码后都补3）

      //orderStatus:订单状态码（见接口文档）
      //refundStatus:退款码（见接口文档），如果未退款则为空
      //isPayOff:是否支付（0否1是）
      //isNegotiable:是否面议（0否1是）
      //isAccept:工人是否接单（0否1是）

      if (isNegotiable == 0) {
        //定价

        //定价，未付款
        if (isPayOff == 0) {
          //取消订单
          if (orderStatus == 50) {
            //定价，未付款，工人未接，取消中/已取消
            if (isAccept == 0) {
              return 600;
            }

            //定价，未付款，工人已接，取消中/已取消
            if (isAccept == 1) {
              return 610;
            }
          }

          //未取消订单
          //定价，未付款
          if (refundStatus == '' && orderStatus != 50) {
            return 100;
          }
        }

        //定价，已付款
        if (isPayOff == 1) {
          //取消订单
          if (orderStatus == 50) {
            //定价，已付款，工人未接，退款中
            if (refundStatus == 1 && isAccept == 0) {
              return 501;
            }

            //定价，已付款，工人已接，退款中
            if (refundStatus == 1 && isAccept == 1) {
              return 511;
            }

            //定价，已付款，工人未接，已退款
            if (refundStatus == 2 && isAccept == 0) {
              return 601;
            }

            //定价，已付款，工人已接，已退款
            if (refundStatus == 2 && isAccept == 1) {
              return 611;
            }
          }

          //未取消订单
          if (refundStatus == '') {
            //定价，已付款，工人未接
            if (isAccept == 0 || (orderStatus == 1 || orderStatus == 10)) {
              return 101;
            }

            //定价，已付款，工人已接，待服务
            if (orderStatus == 20 && isAccept == 1) {
              return 211;
            }

            //定价，已付款，工人已接，服务完成，待确认
            if (orderStatus == 30 && isAccept == 1) {
              return 311;
            }

            //定价，已付款，工人已接，服务完成，已确认
            if (orderStatus == 40 && isAccept == 1) {
              return 411;
            }
          }
        }
      }

      if (isNegotiable == 1) {
        //面议单

        //面议单，未付款
        if (isPayOff == 0) {
          //取消订单
          //面议单，未付款，取消中/已取消
          if (orderStatus == 50) {
            return 600;
          }

          //未取消订单
          if (refundStatus == '') {
            //面议单，未付款，工人未接单
            if ((orderStatus == 1 || orderStatus == 10) && isAccept == 0) {
              return 1003;
            }

            //面议单，未付款，工人已接单
            if (orderStatus == 20 && isAccept == 1) {
              return 210;
            }

            //面议单，未付款，工人已接单，待确认
            if (orderStatus == 30 && isAccept == 1) {
              return 2103;
            }
          }
        }

        //面议单，已付款
        if (isPayOff == 1 && isAccept == 1) {
          //取消订单
          if (orderStatus == 50) {
            //面议单，已付款，取消中
            if (refundStatus == 1 && orderStatus == 50) {
              return 511;
            }

            //面议单，已付款，已取消
            if (refundStatus == 2 && orderStatus == 50) {
              return 611;
            }
          }

          //未取消订单
          if (refundStatus == '') {
            //面议单，已付款，待服务
            if (orderStatus == 20) {
              return 211;
            }

            //面议单，已付款，待确认
            if (orderStatus == 30) {
              return 311;
            }

            //面议单，已付款，已完成
            if (orderStatus == 40) {
              return 411;
            }
          }
        }
      }

      return 'error'
    },
    payable(activityNgs, discountAmount, totalPrice, startPrice) {
      // 传入活动，红包折扣，订单总计
      // 返回 计算优惠后的价格
      // 订单优惠后价格 应付价格 0 满减 ，1 满返
      if(!totalPrice) {
        if(startPrice != null || startPrice != '') {
          return startPrice + '起';
        } else {
          return '面议';
        }
      }

      let discountList = [];
      if (activityNgs.ServiceTypeRules && activityNgs.ServiceTypeRules.length > 0) {
        activityNgs.ServiceTypeRules.map((v) => {
          v.Details.map((x) => {
            if (x.ReturnType === '0') {
              let rule = [];
              x.Rules.map((y) => {
                if (parseFloat(totalPrice) >= parseFloat(y.Upper)) {
                  rule.push(parseFloat(y.Minus));
                }
              })
              if (rule.length > 0) {
                let max = rule.reduce((x, y) => {
                  return (x > y) ? x : y;
                })
                discountList.push(max);
              }
            }
          })
        })
        if (discountList.length > 0) {
          var discountSum = discountList.reduce((x, y) => {
            return x + y;
          }, 0)
        }
        if (discountAmount) {
          return totalPrice - discountSum - parseFloat(discountAmount);
        } else {
          return totalPrice - discountSum;
        }
      } else {
        return totalPrice;
      }
    },
    formatTime(times) {
      let time = times + "000";
      //添加时间可能为null的可能
      if(times == null || times == '') {
        return '';
      }
      return new Date(parseInt(time, 10)).Format("yyyy-MM-dd hh:mm:ss");
    },
    routerTo(orderId) {
      this.$store.dispatch('setOrderId', {
        txt: orderId
      });
      this.$router.push({
        path: '/order_detail'
      });
    }
  },
  watch: {
    type() {
      this.list = [];
      this.onInfinite();
    }
  },
  mounted() {
    this.onInfinite();
  },
  components: {
    InfiniteLoading
  }
}
</script>
<style scoped>
.fc0 {
	color: #000;
}
.fc9 {
	color: #999;
}
.f16 {
	font-size: 16px;
}
.blue {
	color:#27b8f3;
}
.red {
	color:#ee2c09;
}
.vue-tab {
	position: relative;
	height: 100%;
}
.vue-navbar {
	display: -webkit-box;
	display:-webkit-flex;
	display: flex;
	position: fixed;
	z-index: 500;
	top:0;
	width: 100%;
	background-color: #fff;
}
.vue-navbar:after{
	content:" ";
	position: absolute;
	left:0;
	bottom: 0;
	border-bottom: 1px solid #d9d9d9;
	width:100%;
	height: 1px;
	transform-origin: 0 0;
	-webkit-transform:translateY(0.5);
	transform: translateY(0.5);
}
.vue-navbar__item {
	position: relative;
	display: block;
	-webkit-box-flex:1;
	-webkit-flex:1;
	flex:1;
	padding:11px 0;
	text-align: center;
	font-size: 14px;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.vue-navbar__item_on {
	position: relative;
	color:#27b8f3;
}
.vue-navbar__item_on:after {
	content:" ";
	position: absolute;
	left: 50%;
	right:0;
	bottom: 0;
	border-bottom: 4px solid #27b8f3;
	width: 80%;
	transform:translateX(-50%);
}
.vue-tab__panel {
	padding-top: 44px;
}
.vue-panel {
	position: relative;
	margin-top: 10px;
	background-color: #fff;
	line-height: 1.41176471;
	font-size: 14px;
	overflow: hidden;
}
.vue-panel:before {
	content: " ";
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 1px;
	border-top: 1px solid #d9d9d9;
	color:#d9d9d9;
	-webkit-transform-origin:0 0;
	transform-origin: 0 0;
	-webkit-transform:scaleY(0.5);
	transform: scaleY(0.5);
}
.vue-panel:after {
	content:" ";
	position: absolute;
	bottom: 0;
	left:0;
	right:0;
	height: 1px;
	border-bottom: 1px solid #d9d9d9;
	color:#d9d9d9;
	-webkit-transform-origin:0 0;
	transform-origin: 0 0;
	-webkit-transform:scaleY(0.5);
	transform: scaleY(0.5);
}
.vue-cell {
	position: relative;
	padding:10px 15px;
	display:-webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
}
.vue-cell__bd {
	-webkit-box-flex:1;
	-webkit-flex:1;
	flex:1;
}
.vue-cell__ft {
	text-align: right;
	color:#999;
}
.vue-cell__ft.blue {
	color:#27b8f3;
}
.vue-panel__hd {
	position: relative;
	/*padding: 5px 0;*/
}
.vue-panel__hd:before {
	content:" ";
	position: absolute;
	border-left: 4px solid transparent;
	top: 50%;
	left: 0;
	width:4px;
	height: 80%;
	transform:translateY(-50%);
	transform-origin: 0 0 ;
}
.vue-panel__hd.red:before {
	border-color: #ee2c09;
}
.vue-panel__hd.green:before {
	border-color: #11b87b;
}
.vue-panel__hd.pink:before {
	border-color: #f82b4b;
}
.vue-panel__hd.orange:before {
	border-color: #fd792a;
}
.vue-panel__hd.purple:before {
	border-color: #955ae8;
}
.vue-panel__bd {
	position: relative;
}
.vue-panel__bd:after {
	content:" ";
	position: absolute;
	bottom: 0;
	left: 15px;
	border-bottom: 1px solid #d9d9d9;
	height:1px;
	width: 100%;
	transform: scaleY(0.5);
	transform-origin: 0 0;
	color: #d9d9d9;
}
.vue-panel:last-child {
	margin-bottom: 40px;
}
.vue-loader {
  color:#999;
}
.vue-btn {
  position:relative;
  display: inline-block;
  width:120px;
  padding:5px;
  box-sizing: border-box;
  font-size:14px;
  line-height:1.4em; 
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  text-decoration: none;
  background:#fff;
  outline: 0;
  border:1px solid transparent;
}
.vue-btn:after {
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #000;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  box-sizing: border-box;
  border-radius: 5px;
}
.vue-btn_plain-primary.vue-btn:after {
  border: 1px solid #f43530;
}
.vue-btn_plain-primary {
  color:#f43530;
}
.vue-btn_plain-success {
  color:#27b8f3;
}
.vue-btn_plain-success.vue-btn:after {
  border: 1px solid #27b8f3;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  color: rgba(255, 255, 255, 0.6);
  background-color: #27b8f3;
}
.weui-btn_primary {
  background-color: #27b8f3;
}
.weui-icon-success {
  color:#27b8f3;
}
.weui-dialog__btn_primary{
  color: #27b8f3
}
</style>