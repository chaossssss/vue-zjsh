<template>
<div class="wrapper flex-column">
<header class="business-header-info" :style="{backgroundImage:'url('+info.Photo+')'}">
  <div class="image-wrapper">
    <div class="flex-row" style="justify-content: flex-start;">
      <!-- 商户头像 -->
      <img class="business-img" :src="info.Photo">

      <!-- 商户信息 -->
      <div class="flex-column info-detail">
        <!-- 商户名称 -->
        <span class="business-name hide-as-point">
          <span class="business-certification hide-as-point" v-if="info.SystemCertification && info.SystemCertification.length > 0">N项认证</span>{{ info.Name }}
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
        <ul class="flex-row tag-list" v-if="info.TagList">
          <li class="business-tag hide-as-point" v-for="tag in info.TagList.TagList">{{ tag.TagName }}</li>
        </ul>
      </div>

      <!-- 联系商户图标 -->
      <a class="phone-number" :href="'tel:' + info.PhoneNumber"></a>
    </div>

    <!-- 商户活动信息 -->
    <div class="business-activity" v-if="serviceTypeRules.length != 0">
      <ul>
        <li class="activity-item" v-for="item in serviceTypeRules">
          <img class="activity-img" v-if="item.ReturnType==='0'" src="../../static/images/pic-orange-cut.png">
          <img class="activity-img" v-if="item.ReturnType==='1'" src="../../static/images/pic-red-back.png"><span class="activity-help">{{ item.Help }}</span>
        </li>
      </ul>

      <div class="activity-toggle" @click="atyToggle">
        {{serviceTypeRules.length}}个活动
        <img class="activity-toggle-img" :class="{ 'trans90': activityToggle }" v-if="serviceTypeRules.length > 1" src="../../static/images/fillet2@2x.png">
      </div>
    </div>
  </div>

  <!-- 分页切换 -->
  <ul class="header-nav flex-row">
    <li class="nav-item" :class="{ 'active': navFlag === 1 }" @click="navFlag = 1">服务</li>
    <li class="nav-item" :class="{ 'active': navFlag === 2 }" @click="navFlag = 2">评价</li>
    <li class="nav-item" :class="{ 'active': navFlag === 3 }" @click="navFlag = 3">商户</li>
  </ul>
</header>

<div class="container">
  <!-- 分页：服务 -->
  <section class="business-service flex-row" v-show="navFlag === 1">
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
          <span class="info-intro hide-as-point">{{ item.Description }}</span>

          <!-- 服务价格&支付 -->
          <div class="info-buy flex-row">
            <span class="info-price hide-as-point">
              <span class="service-price-amount">{{ item.Price | priceAmount }}</span>
              <span class="service-price-suffix">{{ item.Price | priceSuffix }}</span>
            </span>

            <span class="info-pay" @click="pointOrder(item)">购买</span>
          </div>
        </div>
      </li>
    </ul>
  </section>

  <!-- 分页：评论 -->
  <section class="business-evaluate" v-show="navFlag === 2">
    <div v-if="evaluateList.length > 0">
      <ul>
        <li class="evaluate-item flex-row" v-for="item in evaluateList">
          <img class="evaluate-img" :src="item.ClientPic">

          <div class="evaluate-info">
            <div class="info-top flex-row">
              <span class="evaluate-name">{{ item.ClientName }}</span>

              <span class="evaluate-date">{{ dateFormat(item.Date) }}</span>
            </div>

            <!-- 存在. -->
            <div class="evaluate-level flex-row" v-if="/\./.test(item.Score)">
              <!-- 满星 -->
              <img class="level-star" v-for="star in new Array(parseInt(item.Score.split('.')[0]))" src="../../static/images/xing.png">

              <!-- 半星 -->
              <img class="level-star" src="../../static/images/xing.png">

              <!-- 空星 -->
              <img class="level-star" v-for="star in new Array(5 - parseInt(item.Score.split('.')[0]))" src="../../static/images/star2@2x.png">
            </div>

            <!-- 不存在. -->
            <div class="evaluate-level flex-row" v-else>
              <!-- 满星 -->
              <img class="level-star" v-for="star in new Array(parseInt(item.Score))" src="../../static/images/xing.png">

              <!-- 空星 -->
              <img class="level-star" v-for="star in new Array(5 - parseInt(item.Score))" src="../../static/images/star2@2x.png">
            </div>

            <div class="evaluate-content">{{ item.Content }}</div>
          </div>
        </li>
      </ul>

      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
        <span slot="no-more">没有更多评论了</span>
      </infinite-loading>
    </div>

    <div class="evaluate-null" v-else>
      <img class="evaluate-null-img" src="../../static/images/no-pingjia.png">
      <span class="evaluate-null-msg">暂无评价</span>
    </div>



    <img class="evaluate-write" src="../../static/images/write-cont.png">
  </section>

  <!-- 分页：商户 -->
  <section class="business-about" v-show="navFlag === 3">
    <!-- 服务信息 -->
    <div class="service-info">
      <header class="service-title">服务信息</header>

      <div class="service-time hide-as-point" v-if="info.ServiceTime">服务时间：{{ info.ServiceTime }}</div>

      <div class="service-address hide-as-point" v-if="info.Address">商户地址：{{ info.Address }}</div>

      <div class="service-range hide-as-point" v-if="info.ServiceScope">服务范围：{{ info.ServiceScope }}</div>

      <div class="service-tag flex-row" v-if="info.TagList && info.TagList.Count > 0">
        <span class="tag-title">标签：</span>

        <ul class="tag-list flex-row">
          <li class="list-item hide-as-point" v-for="tag in info.TagList.TagList">{{ tag.TagName }}</li>
        </ul>
      </div>

      <div class="service-certification flex-row">
        <span class="certification-title">认证：</span>

        <div class="certification-list flex-row">
          <img class="list-item" v-for="item in info.SystemCertification" :src="item">
        </div>
      </div>
    </div>

    <!-- 商户信息 -->
    <div class="business-info">
      <header class="business-title">商户信息</header>

      <div class="flex-row" style="align-items: stretch;">
        <div class="business-info-left">
          <div class="business-established-time hide-as-point" v-if="info.EstablishedTime">成立时间：{{ info.EstablishedTime }}</div>

          <div class="business-area hide-as-point" v-if="info.Area">营业面积：{{ info.Area }}</div>

          <div class="business-scale hide-as-point" v-if="info.Scale">经营规模：{{ info.Scale }}</div>
        </div>

        <div class="business-info-right">
          <div class="business-property hide-as-point" v-if="info.Property">商户性质：{{ info.Property }}</div>

          <div class="business-staff-number hide-as-point" v-if="info.StaffNumber">员工人数：{{ info.StaffNumber }}</div>
        </div>
      </div>

      <footer class="business-footer" v-if="info.Signature != null && info.Signature != '' && info.Intro != null && info.Intro != ''">
        <div class="business-signature" v-if="info.Signature != null && info.Signature != ''">个性签名：{{ info.Signature }}</div>

        <div class="business-intro" v-if="info.Intro != null && info.Intro != ''">商户介绍：{{ info.Intro }}</div>
      </footer>
    </div>

    <!-- 商户内部照 -->
    <!-- 暂无 -->

    <!-- 营业执照 -->
    <div class="business-licence flex-row">
      <span class="licence-title">营业执照</span>
      <img class="right-arrow" src="../../static/images/right_gray.png">
    </div>
  </section>
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
      activityToggle: false,//商户活动列表开关
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
    pointOrder(elem) {
      //传值时首先清空pointShop全局对象
      for(let item in this.pointShop) {
        this.pointShop[item] = null;
      }
      this.pointShop.ObjectType = '3';
      this.pointShop.ObjectId = this.info.Id;
      this.pointShop.ObjectName = this.info.Name;
      this.pointShop.ObjectPhoto = this.info.Photo;
      this.pointShop.ObjectGender = this.info.Gender;
      this.pointShop.ObjectPhone = this.info.Phone;
      this.pointShop.ServiceTypeId = elem.Id;
      this.pointShop.ServiceTypeName = elem.Name;
      this.$store.dispatch('setPointShop', {
        txt: this.pointShop
      });
      this.$router.push({path:'/point_order'});
    },
    atyToggle(event) {
      this.activityToggle = !this.activityToggle;
      let aty = document.querySelector('.business-activity');
      let atyCount = parseInt(this.serviceTypeRules.length)
      if(this.activityToggle) {
        aty.style.height = atyCount * 18 + (atyCount - 1) * 12 + 'px';
      } else {
        aty.style.height = '18px';
      }
    },
    dateAddZero(value) {
      return value >= 10 ? value : '0' + value;
    },
    dateFormat(value) {
      let date = new Date(parseInt(value + '000'));
      return date.getFullYear() + '-' + this.dateAddZero(date.getMonth() + 1) + '-' + this.dateAddZero(date.getDate()) + ' ' + this.dateAddZero(date.getHours() + 1) + ':' + this.dateAddZero(date.getMinutes());
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
          "PageIndex": Math.ceil(this.evaluateList.length / 10) + 1,
          "PageSize": '10'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.Meta.ErrorCode === '0') {
            if(res.data.Body.EvaluationList && res.data.Body.EvaluationList.length > 0) {
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
    ...mapState(['Token', 'objectInfo', 'pointShop'])
  },
  filters: {
    priceAmount(value) {
      if(value == null || value == undefined || value == '') {
        return '';
      }
      return value.match(/[0-9]+/g).join('');
    },
    priceSuffix(value) {
      if(value == null || value == undefined || value == '') {
        return '';
      }
      return value.match(/\D*/g).join('');
    }
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

.service-price-amount
{
  font-size: 12px;
  color: #fd552e;
}

.service-price-suffix
{
  font-size: 10px;
  color: #3f3e48;
}

.image-wrapper
{
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  padding: 15px;

  background-repeat: no-repeat;
  background-image: -webkit-linear-gradient(rgba(039,128,210,.9), rgba(43,192,212,.9));
  background-image: -o-linear-gradient(rgba(039,128,210,.9), rgba(43,192,212,.9));
  background-image: linear-gradient(rgba(039,128,210,.9), rgba(43,192,212,.9));
  background-size: 100%;
  color: #fff;
}

#app > .wrapper
{
  justify-content: flex-start;

  height: 100%;

  background-color: #eef2f5;
}

#app > .wrapper > .container
{
  background-color: #eef2f5;
  overflow: scroll;
}

/* common end */

/* 商家头部信息 */

.business-header-info
{
  background-repeat: no-repeat;
  background-size: 100%;
}

.business-header-info .business-img
{
  width: 30%;
  height: 30%;
  border-radius: 5px;
}

.business-header-info .info-detail
{
  width: 60%;
  line-height: 100%;
  margin-left: 15px;
  padding: 10px 0;
}

.business-header-info .business-name
{
  display: block;

  height: 20px;
  line-height: 20px;

  font-size: 18px;
}

.business-name .business-certification
{
  box-sizing: border-box;

  margin-right: 5px;
  padding: 1px 5px;
  border-radius: 2px;

  background-color: #ffd739;
  color: #5a3408;
  font-size: 10px;
  vertical-align: bottom;
}

.business-header-info .business-amount
{
  margin-top: -5px;

  color: #feffff;
  font-size: 10px;
}

.business-header-info .tag-list
{
  justify-content: flex-start;

  height: 16px;
}

.business-header-info .business-tag
{
  width: 50px;
  height: 16px;
  padding: 2px 5px;
  border: 1px solid #66c0e2;
  border-radius: 2px;

  font-size: 10px;
}

.business-header-info .business-tag:not(:first-child)
{
  margin-left: 5px;
}

.business-header-info .phone-number
{
  display: block;
  position: absolute;
  top: 32px;
  right: 16px;

  width: 22px;
  height: 22px;

  background-image: url(../../static/images/call.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.business-header-info .business-activity
{
  position: relative;

  max-height: 18px;
  margin-top: 12px;

  overflow: hidden;
  transition: all .5s;
}

.business-header-info .business-activity.toggle
{
  max-height: 100px;
}

.business-activity .activity-toggle
{
  position: absolute;
  right: 0;
  top: 0;

  height: 14px;
  line-height: 14px;

  font-size: 12px;
  cursor: pointer;
}

.business-activity .activity-toggle-img
{
  width: 10px;
  margin-left: 5px;

  transform: rotate(180deg);
  transition: transform .5s;
}

.business-activity .activity-toggle-img.trans90
{
  transform: rotate(0deg);
  transition: transform .5s;
}

.business-activity .activity-item
{
  height: 16px;
  line-height: 16px;
}

.business-activity .activity-item:not(:first-child)
{
  margin-top: 12px;
}

.business-activity .activity-img
{
  width: 16px;
  height: 16px;

  vertical-align: middle;
}

.business-activity .activity-help
{
  margin-left: 6px;

  font-size: 10px;
}

/* 商家头部信息 end */

/* 标签页切换头部 */

.header-nav
{
  justify-content: space-between;

  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #e5eaee;

  background-color: #fff;
}

.nav-item
{
  flex-grow: 1;

  text-align: center;
  font-size: 14px;
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

.business-service .service-title
{
  width: 25%;
}

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

  padding: 12px 0;
  border-left: 3px solid #fff;

  color: #666;
  text-align: center;
  font-size: 14px;
}

.service-title .item-name.active
{
  border-left: 3px solid #27b7f3;
}

/* 左侧服务列表 end */

/* 右侧服务详情 */

.business-service .service-detail
{
  width: 75%;
}

.service-detail .detail-item
{
  padding: 15px;

  background-color: #fff;
}

.service-detail .item-img
{
  width: 30%;
  height: 30%;
  border-radius: 5px;
}

.service-detail .detail-info
{
  box-sizing: border-box;

  width: 70%;
  padding-left: 15px;
}

.detail-item .info-title
{
  display: block;

  width: 150px;
  line-height: 110%;

  color: #333;
  font-size: 14px;
}

.detail-item .info-intro
{
  color: #656565;
  font-size: 12px;
}

.detail-item .info-buy
{
  align-items: flex-end;
}

.info-buy .info-price
{
  width: 70px;

  color: #fd552e;
  font-size: 12px;
}

.info-buy .info-pay
{
  width: 50px;
  padding: 2px 5px;
  margin-bottom: -3px;
  border: 1px solid #ffbcac;
  border-radius: 5px;

  color: #fd552e;
  text-align: center;
}

/* 右侧服务详情 end */

/* 分页：服务 end */

/* 分页：评价 */

.business-evaluate
{
  background-color: #fff;
}

.business-evaluate .evaluate-item
{
  margin-left: 16px;
  padding: 12px 16px 16px 0;
}

.business-evaluate .evaluate-item:not(:last-child)
{
  border-bottom: 1px solid #e5eaee;
}

.evaluate-item .evaluate-img
{
  width: 15%;
  height: 15%;
  border-radius: 50%;
}

.evaluate-item .evaluate-info
{
  box-sizing: border-box;

  width: 85%;
  padding-top: 6px;
  padding-left: 7px;
}

.evaluate-info .info-top
{
  line-height: 100%;
}

.evaluate-info .evaluate-name
{
  font-size: 10px;
  color: #999;
}

.evaluate-info .evaluate-date
{
  font-size: 10px;
  color: #999;
}

.evaluate-info .evaluate-level
{
  justify-content: flex-start;

  height: 12px;
  margin-top: 10px;
}

.evaluate-level .level-star
{
  width: 12px;
  height: 12px;
}

.evaluate-level .level-star:not(:first-child)
{
  margin-left: 3px;
}

.evaluate-info .evaluate-content
{
  margin-top: 10px;
  padding-right: 9px;

  color: #333639;
  font-size: 12px;
}

.evaluate-null
{
  background-color: #eef2f5;
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
  font-size: 14px;
  color: #999;
}

.evaluate-write
{
  position: fixed;
  right: 25px;
  bottom: 25px;

  width: 55px;
  height: 55px;
}

/* 分页：评价 end */

/* 分页：商户 */

.business-about > *
{
  margin-top: 10px;
}

.business-about .service-info
{
  padding-left: 16px;

  background-color: #fff;
}

.service-info > .service-title,
.service-info > .service-time,
.service-info > .service-address,
.service-info > .service-range
{
  height: 44px;
  line-height: 44px;
}

.service-info > *:not(:last-child)
{
  border-bottom: 1px solid #eef2f5;
}

.service-info > *:not(:first-child)
{
  color: #666;
  font-size: 12px;
}

.service-info .service-title
{
  color: #333639;
}

.service-info .service-tag
{
  justify-content: flex-start;
}

.service-tag .tag-title
{
  display: block;

  width: 40px;
  height: 44px;
  line-height: 44px;
  margin-right: 16px;
}

.service-tag .tag-list
{
  flex-wrap: wrap;
  justify-content: flex-start;
}

.service-tag .tag-list .list-item
{
  box-sizing: border-box;

  width: 92px;
  height: 30px;
  line-height: 30px;
  margin-top: 7px;
  margin-bottom: 7px;
  border: 1px solid #e5eaee;

  text-align: center;
}

.service-tag  .tag-list .list-item:not(:first-child)
{
  margin-left: 6px;
}

.service-info .service-certification
{
  justify-content: flex-start;
}

.service-certification .certification-title
{
  display: block;

  width: 40px;
  height: 44px;
  line-height: 44px;
  margin-right: 16px;
}

.service-certification .certification-list
{
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.certification-list .list-item
{
  width: 18px;
  height: 18px;
}

.certification-list .list-item:not(:first-child)
{
  margin-left: 10px;
}

.business-about .business-info
{
  padding-left: 16px;
  padding-bottom: 16px;

  background-color: #fff;
}

.business-info > .business-title,
.business-info > .business-time,
.business-info > .business-address,
.business-info > .business-range
{
  height: 44px;
  line-height: 44px;
}

.business-info > *:not(:last-child)
{
  border-bottom: 1px solid #eef2f5;
}

.business-info > *:not(:first-child)
{
  color: #666;
  font-size: 12px;
}

.business-info-left .business-area,
.business-info-left .business-scale,
.business-info-right .business-staff-number
{
  margin-top: 12px;
}

.business-info .business-info-left
{
  margin: 12px 0;
}

.business-info .business-info-right
{
  box-sizing: border-box;
  margin: 12px 16px 12px 0;
  padding-left: 16px;

  border-left: 1px solid #eef2f5;
}

.business-info .business-footer
{
  margin-right: 16px;
  padding-left: 12px;
  padding-right: 18px;
  border-radius: 3px;

  background-color: #f2f6f9;
  overflow: hidden;
}

.business-footer .business-signature
{
  border-bottom: 1px solid #e5eaee;
}

.business-footer .business-signature,
.business-footer .business-intro
{
  padding-top: 8px;
  padding-bottom: 12px;
}

.business-licence
{
  align-items: center;

  height: 44px;
  line-height: 44px;
  padding: 0 16px;

  background-color: #fff;
  color: #333;
}

.business-licence .right-arrow
{
  height: 14px;
}

/* 分页：商户 end */

</style>