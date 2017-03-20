<template>
<div style="background-color: #fbfbfb;height:100%;">
  <div class="weui-cells" style="margin-top:0;">
    <div class="weui-cell" style="padding:0;">
      <div class="weui-cell__bd">
        <img v-show="situation == 100" style="width:100%;" src="../../static/images/100.png" alt="">
        <img v-show="situation == 1003" style="width:100%;" src="../../static/images/1003.png" alt="">
        <img v-show="situation == 101" style="width:100%;" src="../../static/images/101.png" alt="">
        <img v-show="situation == 210" style="width:100%;" src="../../static/images/210.png" alt="">
        <img v-show="situation == 2103" style="width:100%;" src="../../static/images/2103.png" alt="">
        <img v-show="situation == 211" style="width:100%;" src="../../static/images/211.png" alt="">
        <img v-show="situation == 2113" style="width:100%;" src="../../static/images/2113.png" alt="">
        <img v-show="situation == 311" style="width:100%;" src="../../static/images/311.png" alt="">
        <img v-show="situation == 411" style="width:100%;" src="../../static/images/411.png" alt="">
        <img v-show="situation == 501" style="width:100%;" src="../../static/images/501.png" alt="">
        <img v-show="situation == 511" style="width:100%;" src="../../static/images/511.png" alt="">
        <img v-show="situation == 600" style="width:100%;" src="../../static/images/600.png" alt="">
        <img v-show="situation == 601" style="width:100%;" src="../../static/images/601.png" alt="">
        <img v-show="situation == 610" style="width:100%;" src="../../static/images/610.png" alt="">
        <img v-show="situation == 611" style="width:100%;" src="../../static/images/611.png" alt="">
      </div>
    </div>
  </div>
  <div class="weui-cells">
    <div class="weui-cell" v-if="od.Worker">
      <div class="weui-cell__hd">
        <img :src="od.Worker.Icon" style="width:24px;height:24px;margin-right:10px;display:block;border-radius:50%;" alt="">
      </div>
      <div class="weui-cell__bd">
        <span>{{od.Worker.Name}}</span>
        <span v-if="od.Worker.Gender === '1'">阿姨</span>
        <span v-if="od.Worker.Gender === '0'">师傅</span>
      </div>
      <div class="weui-cell__ft">
        <a :href="wkPhoneNumber"><img src="../../static/images/phone.png" alt="" style="width:24px;height:24px;display:block;"></a>
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>服务类型</p>
      </div>
      <div class="weui-cell__ft">
        {{od.Service.ServiceName}}
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>服务时间</p>
      </div>
      <div class="weui-cell__ft">
        {{serviceStartTime}}
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>备注</p>
        <p class="fc9" v-if="od.Service.Content" v-for="elem in od.Service.Content">{{elem}}</p>
        <p class="fc9" v-else>无任何备注信息</p>
      </div>
    </div>
    <!-- 定价 || 接单后 有价格显示-->
    <div class="weui-panel" v-if="od.TotalPrice != null && od.TotalPrice != ''">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <span class="f14">服务价格</span>
          <span style="float:right;font-size:14px;color:#888">
            <span style="padding-right:20px;">x{{od.Total}}</span>
            <span>¥{{od.Price}}</span>
          </span>
        </div>
      </div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <span class="f14">订单总计</span>
          <span style="float:right;font-size:14px;color:#888">
            <span>¥{{od.TotalPrice}}</span>
          </span>
        </div>
      </div>
      <div class="weui-panel__bd" v-show="od.DiscountAmount">
        <div class="weui-media-box weui-media-box_text">
          <span v-show="od.DiscountInfo" class="f14">{{od.DiscountInfo}}</span>
          <span v-show="!od.DiscountInfo" class="f14">红包</span>
          <span style="float:right;font-size:14px;color:#888">
            <span>-¥{{od.DiscountAmount}}</span>
          </span>
        </div>
      </div>
      <div class="weui-panel__bd" v-if="serviceTypeRules.length > 0">
        <div class="weui-media-box weui-media-box_text"  v-for="item in serviceTypeRules">
          <span class="f14">{{item.Title}}</span>
          <span style="float:right;font-size:14px;color:#888">
            <span>-¥{{item.Rule.Minus}}</span>
          </span>
        </div>
      </div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <span class="f14" v-if="od.IsPayOff==='0'">应付款</span>
          <span class="f14" v-else>实付款</span>
          <span style="float:right;font-size:14px;color:#888">
            <span class="red f16">¥{{payable}}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 面议 || 未接单后 -->
    <div class="weui-panel" v-if="od.IsNegotiable === '1' && !od.TotalPrice">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <span class="f14">服务价格</span>
          <span style="float:right;font-size:14px;color:#888">
            <span>¥{{od.StartingPrice}}元&nbsp;起</span>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="weui-panel" style="margin-top:10px;" v-if="od.Refunds.length > 0">
    <div class="weui-panel__hd">退款记录</div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_text" v-for="item in od.Refunds">
        <p class="weui-media-box__desc">
          <span>{{item.RefundAt}}</span>
          <span class="red" v-if="item.Status ==='1'">退款中</span>
          <span class="red" v-if="item.Status ==='2'">退款完成</span>
          <span>{{item.RefundAmountToBePaid}}</span>
        </p>
        <p class="weui-media-box__desc">
          <span>应退</span>
          <span>¥{{item.RefundAmount}}</span>，
          <span>误工费</span>
          <span>¥{{item.LostIncome}}</span>
          <span>，优惠券扣除</span>
          <span v-if="item.CouponAmount != null && item.CouponAmount != '0'">¥{{item.CouponAmount}}</span>
          <span v-else>￥0</span>
        </p>
      </div>
    </div>
  </div>

  <div class="weui-panel" style="margin-top:10px;">
    <div class="weui-panel__hd">订单信息</div>
    <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <p class="weui-media-box__desc">
            <span>联系人:</span>
            <span> {{od.Service.AddressInfo.Contact}}</span>
          </p>
          <p class="weui-media-box__desc">
            <span>服务电话:</span>
            <span> {{od.Service.AddressInfo.PhoneNumber}}</span>
          </p>
          <p class="weui-media-box__desc">
            <span>服务地址:</span>
            <span> {{od.Service.AddressInfo.Address1}}{{od.Service.AddressInfo.Address2}}</span>
          </p>
        </div>
        <div class="weui-media-box weui-media-box_text">
          <p class="weui-media-box__desc">
            <span>订单号:</span>
            <span>{{od.OrderCode}}</span>
          </p>
          <p class="weui-media-box__desc">
            <span>下单时间:</span>
            <span>{{orderCreateTime}}</span>
          </p>
          <p class="weui-media-box__desc" v-if="acceptTime">
            <span>接单时间:</span>
            <span>{{acceptTime}}</span>
          </p>
          <p class="weui-media-box__desc" v-if="payOverTime">
            <span>付款时间:</span>
            <span>{{payOverTime}}</span>
          </p>
          <p class="weui-media-box__desc" v-if="cancelTime">
            <span>取消时间:</span>
            <span>{{cancelTime}}</span>
          </p>
        </div>
    </div>
  </div>

  <div class="weui-cells" v-if="od.OrderStatus === '50' || od.CanCancel === '1' || (od.IsPayOff === '0' && od.OrderStatus !== '50' && !!od.ConfirmTime) || situation === 311">
    <div class="weui-cell">
      <div class="weui-cell__bd"></div>
      <div class="weui-cell__ft">
        <button @click="delOrder" v-if="od.OrderStatus === '50'" class="vue-btn vue-btn_plain-default">删除订单</button>
        <button @click="cancelOrder" v-if="od.CanCancel === '1'" class="vue-btn vue-btn_plain-default">取消订单</button>
        <button @click="payOrder" v-if="od.IsPayOff === '0' && od.OrderStatus !== '50' && !!od.ConfirmTime" class="vue-btn vue-btn_plain-primary">支付</button>
        <button @click="sureOrder" v-if="situation === 311" class="vue-btn vue-btn_plain-success">确认服务完成</button>
      </div>
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

  <!-- 删除订单提示 -->
  <div id="Toast" v-show="isDeleted">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
          <i class="weui-icon-success-no-circle weui-icon_toast"></i>
          <p class="weui-toast__content">删除成功</p>
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

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
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
  name: "order_detail",
  data() {
    return {
      od: {
        Service: {
          ServiceName: "",
          Content: "",
          AddressInfo: {
            Address1: "",
            Address2: ""
          }
        },
        ActivityNgs: {
          ServiceTypeRules: []
        },
        Refunds: [],
        IsNegotiable: ""
      }, // 订单详情
      discountSum: 0,
      isError: false,
      errorMsg: "",
      isLoading: false,
      isDeleted: false,
      Token:null
    }
  },
  mounted() {
    this.Token = COM.getCookie("Token");
    // 获取订单详情
    if (this.orderId) {
      axios.post(API.GetOrderInfoEx, qs.stringify({
        "Token": this.Token,
        "OrderId": this.orderId
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        console.log("获取订单详情", res.data);
        if (res.data.Meta.ErrorCode === '0') {
          this.od = res.data.Body.Order;
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
  methods: {
    delOrder() {
      this.isLoading = true;
      if (this.orderId) {
        axios.post(API.RemoveOrderEx, qs.stringify({
          "Token": this.Token,
          "OrderId": this.orderId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.isLoading = false;
          console.log("删除订单", res.data);
          if (res.data.Meta.ErrorCode === '0') {
            let that = this;
            this.isDeleted = true;
            setTimeout(function() {
              that.isDeleted = false;
              that.$router.push({
                path: '/menu/order_list'
              });
            }, 500)
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
    cancelOrder() {
      this.isLoading = true;
      if (this.orderId) {
        axios.post(API.CancelOrderEx, qs.stringify({
          "Token": this.Token,
          "OrderId": this.orderId
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
    payOrder() {
      if (this.orderId) {
        this.$router.push({
          path: '/pay'
        });
      }
    },
    sureOrder() {
      this.isLoading = true;
      if (this.orderId) {
        axios.post(API.CompleteOrderEx, qs.stringify({
          "Token": this.Token,
          "OrderId": this.orderId
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
    }
  },
  computed: {
    situation() {
      //状态码返回规范
      //状态码由三位数组成，其中
      //百位：1:待接单 2:待服务 3:待确认 4:已完成 5.退款中 6.已退款
      //十位：0:工人未接单 1:工人已接单
      //个位：0:未付款 1:已付款

      //例外：定价单与面议单中工人未接单且未付款的状态码都为100，但需要显示不同的状态图，因此在出现此种冲突时在面议单的状态码前补3作为其标识

      //orderStatus:订单状态码（见接口文档）
      let orderStatus = this.od.OrderStatus;

      //refundStatus:退款码（见接口文档），如果未退款则为空
      let refundStatus = '';
      //如果存在退款信息则获取其退款状态码
      if(this.od.Refunds.length != 0) {
        refundStatus = this.od.Refunds[0].Status;
      }

      //isPayOff:是否支付（0否1是）
      let isPayOff = this.od.IsPayOff;

      //isNegotiable:是否面议（0否1是）
      let isNegotiable = this.od.IsNegotiable;

       //isAccept:是否接单（0否1是）
      let isAccept = 1;
      //如果没有接收时间则工人未接单
      if(this.od.AcceptTime == null) {
        isAccept = 0;
      }

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
    payable() {
      // 订单优惠后价格 应付价格 0 满减 ，1 满返
      let discountList = [];
      if (this.od.ActivityNgs.ServiceTypeRules && this.od.ActivityNgs.ServiceTypeRules.length > 0) {
        this.od.ActivityNgs.ServiceTypeRules.map((v) => {
          v.Details.map((x) => {
            if (x.ReturnType === '0') {
              let rule = [];
              x.Rules.map((y) => {
                if (parseFloat(this.od.TotalPrice) >= parseFloat(y.Upper)) {
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
          this.discountSum = discountList.reduce((x, y) => {
            return x + y;
          }, 0)
        }
        if (this.od.DiscountAmount) {
          return this.od.TotalPrice - this.discountSum - parseFloat(this.od.DiscountAmount);
        } else {
          return this.od.TotalPrice - this.discountSum;
        }
      } else {
        return this.od.TotalPrice;
      }
    },
    serviceTypeRules() {
      // 活动规则
      let discountList = [];
      if (this.od.ActivityNgs.ServiceTypeRules && this.od.ActivityNgs.ServiceTypeRules.length > 0) {
        this.od.ActivityNgs.ServiceTypeRules.map((v, j, arr) => {
          v.Details.map((x, i, arry) => {
            let rule = [];
            x.Rules.map((y) => {
              if (parseFloat(this.od.TotalPrice) >= parseFloat(y.Upper)) {
                rule.push(y);
              }
            })
            if (rule.length > 0) {
              let max = rule.reduce((x, y) => {
                return (parseFloat(x.Minus) > parseFloat(y.Minus)) ? x : y;
              })
              arry[i]['Rule'] = max;
              discountList.push(x);
            }
          })
        })
      }
      return discountList;
    },
    orderCreateTime() {
      // 订单创建时间
      if (this.od.CreateTime) {
        let time = this.od.CreateTime + "000";
        return new Date(parseInt(time, 10)).Format("yyyy-MM-dd hh:mm:ss");
      }
    },
    payOverTime() {
      // 订单支付时间
      if (this.od.PayOffTime) {
        let time = this.od.PayOffTime + "000";
        return new Date(parseInt(time, 10)).Format("yyyy-MM-dd hh:mm:ss");
      }
    },
    serviceStartTime() {
      // 服务开始时间
      if (this.od.Service.ServiceStartTime) {
        let time = this.od.Service.ServiceStartTime + "000";
        return new Date(parseInt(time, 10)).Format("yyyy-MM-dd hh:mm:ss");
      }
    },
    acceptTime() {
      //接单时间
      if (this.od.AcceptTime) {
        let time = this.od.AcceptTime + "000";
        return new Date(parseInt(time, 10)).Format("yyyy-MM-dd hh:mm:ss");
      }
    },
    cancelTime() {
      // 取消时间
      if (this.od.CancelTime) {
        let time = this.od.CancelTime + "000";
        return new Date(parseInt(time, 10)).Format("yyyy-MM-dd hh:mm:ss");
      }
    },
    wkPhoneNumber() {
      if (this.od.Worker) {
        return "tel:" + this.od.Worker.PhoneNumber;
      }
    },
    ...mapState(['orderId'])
  }
}
</script>
<style scoped>
.red {
  color:#f43530;
}
.f16 {
  font-size: 16px;
}
.fc9 {
  color:#999;
}
.weui-cells {
  margin-top: 10px;
}
.weui-cell {
  font-size:14px;
  line-height:1.75em;
}
.weui-panel {
  margin-top: 0;
  font-size:14px;
  padding:5px 0;
}
.weui-media-box {
  padding:5px 15px 5px 15px;
}
.weui-media-box::before {
  top: 100%;
}
.weui-panel__hd {
  padding:5px 15px 10px;
  font-size:14px;
  color:#000;
}
.weui-media-box__desc {
  line-height:1.8em;
}
.vue-btn {
  position:relative;
  display: inline-block;
  width:120px;
  padding-left: 14px;
  padding-right:14px;
  box-sizing: border-box;
  font-size:14px;
  line-height:2.5em; 
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