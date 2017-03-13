<template>
<div class="wrapper">
<header class="business-info" :style="{backgroundImage:'url('+info.Photo+')'}">
  <div class="image-wrapper">
    <div class="flex-row" style="justify-content: flex-start;">
      <!-- 商户头像 -->
      <img class="business-img" :src="info.Photo">

      <!-- 商户信息 -->
      <div class="flex-column info-detail">
        <!-- 商户名称 -->
        <span class="business-name hide-as-point">
          <span class="business-certification">N项认证</span>
          <span class="business-certification" v-for="item in info.SystemCertification">{{ item }}</span>
          {{ info.Name }}
        </span>

        <!-- 商户服务数量 -->
        <div class="business-amount hide-as-point">
          <span class="order-count">接单数：{{ info.OrderCount2 }}</span>
          <i class="split"></i>
          <span class="phone-count">电话数：{{ info.PhoneCount2 }}</span>
          <i class="split"></i>
          <span class="grade">评分：{{ info.Grade2 }}</span>
        </div>

        <!-- 商户标签 -->
        <ul class="flex-row tag-list">
          <li class="business-tag" v-for="tag in tagList">{{ tag.Name }}</li>
        </ul>
      </div>

      <!-- 联系商户图标 -->
      <a class="phone-number" :href="'tel:' + info.PhoneNumber"></a>
    </div>

    <!-- 商户活动信息 -->
    <ul class="business-activity" v-if="serviceTypeRules.length != 0">
      <li class="activity-item" v-for="item in serviceTypeRules">
        <img class="activity-img" v-if="item.ReturnType==='0'" src="../../static/images/pic-orange-cut.png">
        <img class="activity-img" v-if="item.ReturnType==='1'" src="../../static/images/pic-red-back.png">
        <span class="activity-help">{{ item.Help }}</span>
      </li>
    </ul>
  </div>
</header>

<div class="container">
  <!-- 分页切换 -->
  <ul class="header-nav flex-row">
    <li class="nav-item" :class="{ 'active': navFlag === 1 }" @click="navFlag = 1">服务</li>
    <li class="nav-item" :class="{ 'active': navFlag === 2 }" @click="navFlag = 2">评价</li>
    <li class="nav-item" :class="{ 'active': navFlag === 3 }" @click="navFlag = 3">商户</li>
  </ul>

  <!-- 分页：服务 -->
  <div class="business-service flex-row" v-show="navFlag === 1">
    <!-- 左侧服务列表 -->
    <ul class="service-title">
      <li class="title-item" v-for="(item, index) in serviceList">
        <span class="item-name hide-as-point" :class="{ 'active': serviceFlag == parseInt(index) }" @click="getServiceDetailList(index)">{{ item.Name }}</span>
      </li>
    </ul>

    <!-- 右侧服务详情 -->
    <ul class="service-detail" id="wrapper0">
      <li class="detail-item flex-row" v-for="item in serviceDetailList">
        <!-- 服务图标 -->
        <img class="item-img" :src="item.Icon">

        <!-- 服务详情 -->
        <div class="detail-info flex-column">
          <!-- 服务名称 -->
          <span class="info-title hide-as-point">{{ item.Name }}</span>

          <!-- 服务描述 -->
          <span class="info-intro hide-as-point2">{{ item.Description }}</span>

          <!-- 服务价格&支付 -->
          <div class="info-buy flex-row">
            <span class="info-price hide-as-point">{{ item.Price }}</span>

            <span class="info-pay">购买</span>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <!-- 分页：评论 -->
  <div class="business-evaluate" v-show="navFlag === 2">
    <ul v-if="evaluateList.length > 0">
      <li class="evaluate-item flex-row" v-for="item in evaluateList">
        <img class="evaluate-img" :src="item.ClientPic">

        <div class="evaluate-info flex-column">
          <div class="info-top flex-row">
            <span class="evaluate-tel">{{ item.ClientName }}</span>

            <span class="evaluate-date">{{ dateFormat(item.Date) }}</span>
          </div>

          <div class="evaluate-level">{{ item.Score }}</div>

          <div class="evaluate-content">{{ item.Content }}</div>
        </div>
      </li>
    </ul>

    <div class="evaluate-null" v-else>
      <img class="evaluate-null-img" src="../../static/images/no-pingjia.png">
      <span class="evaluate-null-msg">暂无评价</span>
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
</div>
</template>

<script>
import { mapState } from 'vuex';
import BScroll from 'better-scroll';
import InfiniteLoading from 'vue-infinite-loading';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
  name: "business",
  data() {
    return {
      navFlag: 1, //默认显示商户服务
      serviceFlag: 0, //默认显示服务分页下的第一个服务
      info: {}, //商户信息
      tagList: [], //商户标签列表
      serviceList: {}, //商户服务列表
      serviceDetailList: [], //商户服务详情列表（对应左侧选择的服务）
      evaluateList: [],//评价列表

      scroll: null, // 滚动对象挂载
      isError: false,
      errorMsg: ""
    }
  },
  mounted() {
      if (!!this.objectInfo.Id) {
        axios.post(API.DetailEx, qs.stringify({
          "Token": this.Token,
          "Type": this.objectInfo.Type,
          "Id": this.objectInfo.Id
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.Meta.ErrorCode === '0') {
            this.info = res.data.Body.Business;
            this.tagList = this.info.TagList.TagList;
            this.getServiceList();
            this.onInfinite();
          } else {
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
    dateAddZero(value) {
      return value > 10 ? value : '0' + value;
    },
    dateFormat(value) {
      let date = new Date(parseInt(value + '000'));
      return date.getFullYear() + ':' + this.dateAddZero(date.getMonth() + 1) + ':' + this.dateAddZero(date.getDate()) + ' ' + this.dateAddZero(date.getHours() + 1) + ':' + this.dateAddZero(date.getMinutes());
    },
    getServiceList() {
      window.scrollTo(0, 0);
      axios.post(API.GetMerchantServicePriceListEx, qs.stringify({
        "Token": this.Token,
        "Id": this.objectInfo.Id
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data.Meta.ErrorCode === '0') {
          this.serviceList = res.data.Body.ServiceTypeList;
          //默认加载第一个服务的列表
          this.getServiceDetailList(0);
          this.scroll = new BScroll(document.getElementById('wrapper0'), {
            startX: 0,
            startY: 0
          })
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
    getServiceDetailList(index) {
      this.serviceFlag = parseInt(index);
      this.serviceDetailList = this.serviceList[parseInt(index)].Child;
    },
    async onInfinite() {
      if(!!this.objectInfo) {
        await axios.post(API.GetMerchantEvaluationList, qs.stringify({
          "ID": this.objectInfo.Id,
          "PageIndex": this.evaluateList.length / 10 + 1,
          "PageSize": '10'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.Meta.ErrorCode === '0') {
            if(!!res.data.Body.Count && res.data.Body.Count > 0) {
              this.evaluateList = this.evaluateList.concat(res.data.Body.EvaluationList);
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
      }
    },
    getAssess() {
      window.scrollTo(0, 0);
      // axios.post(API.GetWorkerEvaluationList,qs.stringify({
      //   "ID": this.objectInfo.Id,
      //   "PageIndex": "10",
      //   "PageSize": "1"
      // }),{
      //   headers: {'Content-Type':'application/x-www-form-urlencoded'}
      // }).then((res)=>{
      //   console.log("工人评价列表",res.data);
      //   if(res.data.Meta.ErrorCode === '0'){
      //     this.ac = res.data.Body.EvaluationList;
      //     this.scroll = new BScroll(document.getElementById('wrapper0'), {
      //    startX: 0,
      //    startY: 0
      //  })
      //   }else{
      //     this.isError = true;
      //     this.errorMsg = res.data.Meta.ErrorMsg;
      //   }
      // }).catch(function (error) {
      //   console.log(error);
      //   this.isError = true;
      //   this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      // });
    },
    routerToOrder() {}
  },
  computed: {
    //活动列表
    serviceTypeRules() {
      // 二维数组扁平化
      let list = [];
      if (this.info.hasOwnProperty('ActivityNgs')) {
        this.info.ActivityNgs.ServiceTypeRules.map((v, i, arry) => {
          v.Details.map((x) => {
            list.push(x);
          })
        })
      }
      return list;
    },
    ...mapState(['Token', 'objectInfo'])
  },
  components: {
    InfiniteLoading
  }
}
</script>

<style scoped>

/* common */

li
{
  list-style: none;
}

.flex-row
{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.flex-column
{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.hide-as-point
{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 慎用，只兼容webkit内核浏览器 */
.hide-as-point2
{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.split::before
{
  content: '/';

  color: rgba(200,200,200,.7);
  font-size: 12px;
  font-style: normal;
  margin: 0 2px;
}

.image-wrapper
{
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  padding: 20px;

  background-repeat: no-repeat;
  background-image: -webkit-linear-gradient(rgba(039,128,210,.9), rgba(43,192,212,.9));
  background-image: -o-linear-gradient(rgba(039,128,210,.9), rgba(43,192,212,.9));
  background-image: linear-gradient(rgba(039,128,210,.9), rgba(43,192,212,.9));
  background-size: 100%;
  color: #fff;
}

.wrapper
{
  height: 100%;

  background-color: #eef2f5;
}

.container
{
  background-color: #eef2f5;
}

/* common end */

/* 商家头部信息 */

.business-info
{
  background-repeat: no-repeat;
  background-size: 100%;
}

.business-info .business-img
{
  width: 30%;
  height: 30%;
  border-radius: 5px;
}

.business-info .info-detail
{
  width: 55%;
  line-height: 100%;
  margin-left: 15px;
  padding: 10px 0;
}

.business-info .business-name
{
  display: block;

  height: 20px;

  font-size: 20px;
}

.business-name .business-certification
{
  padding: 5px 5px;
  border-radius: 2px;

  background-color: #ffd739;
  color: #5a3408;
  font-size: 10px;
}

.business-name .business-certification:not(:first-child)
{
  margin-left: 5px;
}

.business-info .business-amount
{
  margin-top: -5px;

  color: #feffff;
  font-size: 12px;
}

.business-info .tag-list
{
  height: 20px;
}

.business-info .business-tag
{
  padding: 2px 5px;
  border: 1px solid #66c0e2;
  border-radius: 2px;
}

.business-info .business-tag:not(:first-child)
{
  margin-left: 10px;
}

.business-info .phone-number
{
  display: block;
  position: absolute;
  right: 16px;

  width: 30px;
  height: 30px;
  margin-top: 5px;

  background-image: url(../../static/images/call.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.business-info .business-activity
{
  margin-top: 15px;
}

.business-activity .activity-item:not(:first-child)
{
  margin-top: 10px;
}

.business-activity .activity-img
{
  vertical-align: middle;
}

.business-activity .activity-help
{
  margin-left: 10px;
}

/* 商家头部信息 end */

/* 标签页切换头部 */

.header-nav
{
  justify-content: space-between;

  margin-bottom: 1px;

  background-color: #fff;
}

.nav-item
{
  flex-grow: 1;

  padding: 15px 0;

  text-align: center;
  font-size: 16px;
  color: #999;
}

.nav-item.active
{
  background-color: #f6fafb;
  color: #27b8f3;
}

/* 标签页切换头部 end */

/* 分页：服务 */

/* 左侧服务列表 */

.service-title .title-item
{
  padding: 15px 0;
  border-bottom: 1px solid #e5eaee;

  background-color: #fff;
}

.service-title .title-item:not(:first-child)
{
  margin-top: 5px;
}

.service-title .item-name
{
  display: block;

  width: 90px;
  padding: 12px 0;
  border-left: 3px solid #fff;

  color: #666;
  text-align: center;
  font-size: 16px;
}

.service-title .item-name.active
{
  border-left: 3px solid #27b7f3;
}

/* 左侧服务列表 end */

/* 右侧服务详情 */

.service-detail
{
  width: 100%;
}

.service-detail .detail-item
{
  padding: 20px;

  background-color: #fff;
}

.service-detail .item-img
{
  width: 35%;
  height: 35%;
  border-radius: 5px;
}

.service-detail .detail-info
{
  justify-content: space-between;

  width: 65%;
  line-height: 100%;
  padding: 5px 20px;

  overflow: hidden;
}

.detail-info .info-title
{
  display: block;

  width: 150px;
  line-height: 110%;

  color: #333;
  font-size: 16px;
}

.detail-info .info-intro
{
  color: #656565;
  font-size: 12px;
}

.detail-info .info-buy
{
  justify-content: space-between;
  align-items: center;
}

.info-buy .info-price
{
  width: 70px;

  color: #fd552e;
}

.info-buy .info-pay
{
  padding: 8px 20px;
  border: 2px solid #ffbcac;
  border-radius: 5px;

  color: #fd552e;
  text-align: center;
}

/* 右侧服务详情 end */

/* 分页：服务 end */

/* 分页：评价 */

.evaluate-item .evaluate-img
{
  width: 15%;
  height: 15%;
}

.evaluate-item .evaluate-info
{
  box-sizing: border-box;

  width: 85%;
  padding: 18px 16px 16px 7px;
}

.evaluate-null .evaluate-null-img
{
  display: block;

  width: 140px;
  margin: 60px auto 0;
}

.evaluate-null .evaluate-null-msg
{
  display: block;

  width: 100%;
  margin-top: 22px;

  text-align: center;
  font-size: 16px;
  color: #999;
}

/* 分页：评价 end */

</style>
