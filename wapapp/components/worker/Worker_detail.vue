<template>
<div class="wrapper flex-column">
<header class="worker-header-info" :style="{backgroundImage:'url('+info.Photo+')'}">
  <div class="image-wrapper">
    <div class="flex-row" style="justify-content: flex-start;">
      <!-- 工人头像 -->
      <img class="worker-img" :src="info.Photo">

      <!-- 工人信息 -->
      <div class="flex-column info-detail">
        <!-- 工人名称 -->
        <span class="worker-name hide-as-point">
          <span class="worker-certification hide-as-point" v-if="info.SystemCertification && info.SystemCertification.length > 0">N项认证</span>{{ info.Name }}
        </span>

        <!-- 工人服务数量 -->
        <div class="worker-amount hide-as-point">
          <span class="order-count">接单数：{{ info.OrderCount2 }}</span>
          <i class="split"></i>
          <span class="phone-count">电话数：{{ info.PhoneCount2 }}</span>
          <i class="split"></i>
          <span class="grade">评分：{{ info.Grade2 }}</span>
        </div>

        <!-- 工人标签 -->
        <ul class="flex-row tag-list" v-if="info.TagList">
          <li class="worker-tag hide-as-point" v-for="tag in info.TagList.TagList">{{ tag.TagName }}</li>
        </ul>
      </div>

      <!-- 联系工人图标 -->
      <a class="phone-number" :href="'tel:' + info.PhoneNumber"></a>
    </div>

    <!-- 工人活动信息 -->
    <div class="worker-activity" :class="{ 'toggle': activityToggle }" v-if="serviceTypeRules.length != 0">
      <ul>
        <li class="activity-item" v-for="item in serviceTypeRules">
          <img class="activity-img" v-if="item.ReturnType==='0'" src="../../static/images/pic-orange-cut.png">
          <img class="activity-img" v-if="item.ReturnType==='1'" src="../../static/images/pic-red-back.png"><span class="activity-help">{{ item.Title }}：{{ item.Help }}</span>
        </li>
      </ul>

      <div class="activity-toggle" @click="activityToggle = !activityToggle">
        {{serviceTypeRules.length}}个活动
        <img class="activity-toggle-img" :class="{ 'trans90': activityToggle }" v-if="serviceTypeRules.length > 1" src="../../static/images/fillet2@2x.png">
      </div>
    </div>
  </div>

  <!-- 分页切换 -->
  <ul class="header-nav flex-row">
    <li class="nav-item" :class="{ 'active': navFlag === 1 }" @click="navFlag = 1">服务</li>
    <li class="nav-item" :class="{ 'active': navFlag === 2 }" @click="navFlag = 2">评价</li>
    <li class="nav-item" :class="{ 'active': navFlag === 3 }" @click="navFlag = 3">工人</li>
  </ul>
</header>

<div class="container">
  <!-- 分页：服务 -->
  <section class="worker-service flex-row" v-show="navFlag === 1">
    <!-- 服务列表 -->
    <ul class="service-detail" id="wrapper0">
      <li class="detail-item" v-for="item in serviceList">

        <div class="item-single flex-row" v-if="item.Child && item.Child.length == 0">
          <div class="info-msg flex-column">
            <!-- 服务名称 -->
            <span class="info-title hide-as-point">{{ item.Name }}</span>

            <!-- 服务描述 -->
            <span class="info-intro hide-as-point">{{ item.Description }}</span>
          </div>

          <!-- 服务价格&支付 -->
          <div class="info-buy flex-column">
            <span class="info-price hide-as-point">
              <span class="service-price-amount">{{ item.Price | priceAmount }}</span>
              <span class="service-price-suffix">{{ item.Price | priceSuffix }}</span>
            </span>

            <span class="info-pay" @click="pointOrder(item)">购买</span>
          </div>
        </div>

        <div class="item-multi flex-row" v-else>
          <div class="info-msg flex-column">
            <!-- 服务名称 -->
            <span class="info-title hide-as-point">{{ item.Name }}</span>

            <!-- 子服务列表 -->
            <ul class="multi-sub-list">
              <li class="sub-list-item" v-for="elem in item.Child">
                <!-- 子服务名称 -->
                <span class="info-title hide-as-point">{{ elem.Name }}</span>
              </li>
            </ul>
          </div>

          <!-- 服务价格&支付 -->
          <div class="info-buy flex-column">
            <span class="info-pay" @click="subServiceFlag = 1">购买</span>

            <!-- 子服务列表 -->
            <ul class="multi-sub-list">
              <li class="sub-list-item" v-for="elem in item.Child">
                <!-- 子服务价格 -->
                <span class="info-price hide-as-point">
                  <span class="service-price-amount">{{ item.Price | priceAmount }}</span>
                  <span class="service-price-suffix">{{ item.Price | priceSuffix }}</span>
                </span>
              </li>
            </ul>
          </div>

          <!-- 子服务列表详情图 -->
          <div class="sub-service-wrapper" v-show="subServiceFlag === 1">
            <div class="sub-service-mask" @click.stop="subServiceFlag = 0">
            </div>

            <div class="sub-service-list">
              <header class="sub-service-title">选择“{{ item.Name }}”的详细分类</header>
              <ul class="sub-service-contain">
                <li class="flex-row sub-service-item" @click="pointOrder(elem)" v-for="elem in item.Child">
                  <span class="sub-service-name">{{ elem.Name }}</span>
                  <span class="sub-service-price">
                    <span class="service-price-amount">{{ elem.Price | priceAmount }}</span>
                    <span class="service-price-suffix">{{ elem.Price | priceSuffix }}</span>
                  </span>
                </li>
              </ul>

              <div class="sub-service-split"></div>

              <button class="sub-service-cancel" @click.stop="subServiceFlag = 0">取消</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>

  <!-- 分页：评论 -->
  <section class="worker-evaluate" v-show="navFlag === 2">
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
          <span class="vue-loader" slot="no-more">没有更多评论了</span>
        </infinite-loading>
    </div>

    <div class="evaluate-null" v-else>
      <img class="evaluate-null-img" src="../../static/images/no-pingjia.png">
      <span class="evaluate-null-msg">暂无评价</span>
    </div>

    <img class="evaluate-write" src="../../static/images/write-cont.png">
  </section>

  <!-- 分页：工人 -->
  <section class="worker-about" v-show="navFlag === 3">
    <!-- 服务信息 -->
    <div class="service-info">
      <header class="service-title">服务信息</header>

      <div class="service-time hide-as-point" v-if="info.ServiceTime">服务时间：{{ info.ServiceTime }}</div>

      <div class="service-address hide-as-point" v-if="info.Address">工人地址：{{ info.Address }}</div>

      <div class="service-range hide-as-point" v-if="info.ServiceScope">服务范围：{{ info.ServiceScope }}</div>

      <div class="service-tag flex-row" v-if="info.TagList && parseInt(info.TagList.Count) > 0">
        <span class="tag-title">标签：</span>

        <ul class="tag-list flex-row">
          <li class="list-item hide-as-point" v-for="tag in info.TagList.TagList">{{ tag.TagName }}</li>
        </ul>
      </div>

      <div class="service-certification flex-row" v-if="info.SystemCertification && info.SystemCertification.length > 0">
        <span class="certification-title">认证：</span>

        <div class="certification-list flex-row">
          <img class="list-item" v-for="item in info.SystemCertification" :src="item">
        </div>
      </div>
    </div>

    <!-- 工人信息 -->
    <div class="worker-info">
      <header class="worker-title">工人信息</header>

      <div class="flex-row worker-info-wrapper">
        <div class="worker-info-left">
          <div class="worker-native-place hide-as-point" v-if="info.NativePlace">籍贯：{{ info.NativePlace }}</div>

          <div class="worker-education hide-as-point" v-if="info.Education">学历：{{ info.Education }}</div>

          <div class="worker-stature hide-as-point" v-if="info.Stature">身高：{{ info.Stature }}</div>

          <div class="worker-blood-type hide-as-point" v-if="info.BloodType">血型：{{ info.BloodType }}</div>
        </div>

        <div class="worker-info-right">
          <div class="worker-working-years hide-as-point" v-if="info.WorkingYears">工作年限：{{ info.WorkingYears }}</div>

          <div class="worker-constellation hide-as-point" v-if="info.Constellation">星座：{{ info.Constellation }}</div>
        </div>
      </div>

      <footer class="worker-footer" v-if="info.Signature != null && info.Signature != '' && info.Intro != null && info.Intro != ''">
        <div class="business-signature" v-if="info.Signature != null && info.Signature != ''">个性签名：{{ info.Signature }}</div>

        <div class="worker-intro" v-if="info.Intro != null && info.Intro != ''">工人介绍：{{ info.Intro }}</div>
      </footer>
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
  name: "worker",
  data() {
    return {
      navFlag: 1, //默认显示工人服务
      serviceFlag: 0, //默认显示服务分页下的第一个服务
      subServiceFlag: 0, //点击二级菜单下的购买弹出选择详细服务窗口
      info: {}, //工人信息
      activityToggle: false,//工人活动列表开关
      serviceList: {}, //工人服务列表
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
            this.info = res.data.Body.Worker;
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
      this.pointShop.ObjectType = '2';
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
    dateAddZero(value) {
      return value >= 10 ? value : '0' + value;
    },
    dateFormat(value) {
      let date = new Date(parseInt(value + '000'));
      return date.getFullYear() + '-' + this.dateAddZero(date.getMonth() + 1) + '-' + this.dateAddZero(date.getDate()) + ' ' + this.dateAddZero(date.getHours() + 1) + ':' + this.dateAddZero(date.getMinutes());
    },
    getServiceList() {
      window.scrollTo(0, 0);
      axios.post(API.GetWorkerServicePriceListEx, qs.stringify({
        "Token": this.Token,
        "Id": this.objectInfo.Id
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data.Meta.ErrorCode === '0') {
          this.serviceList = res.data.Body.ServiceTypeList;
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
    async onInfinite() {
      if(!!this.objectInfo) {
        await axios.post(API.GetWorkerEvaluationList, qs.stringify({
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


.header-nav
{
  justify-content: space-between;

  width: 100%;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #e5eaee;

  background-color: #fff;
}

/* common end */

/* 商家头部信息 */

.worker-header-info
{
  background-repeat: no-repeat;
  background-size: 100%;
}

.worker-header-info .worker-img
{
  width: 30%;
  height: 30%;
  border-radius: 5px;
}

.worker-header-info .info-detail
{
  width: 60%;
  line-height: 100%;
  margin-left: 15px;
  padding: 10px 0;
}

.worker-header-info .worker-name
{
  display: block;

  height: 20px;
  line-height: 20px;

  font-size: 18px;
}

.worker-name .worker-certification
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

.worker-header-info .worker-amount
{
  margin-top: -5px;

  color: #feffff;
  font-size: 10px;
}

.worker-header-info .tag-list
{
  justify-content: flex-start;

  height: 16px;
}

.worker-header-info .worker-tag
{
  width: 50px;
  height: 16px;
  padding: 2px 5px;
  border: 1px solid #66c0e2;
  border-radius: 2px;

  font-size: 10px;
}

.worker-header-info .worker-tag:not(:first-child)
{
  margin-left: 5px;
}

.worker-header-info .phone-number
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

.worker-header-info .worker-activity
{
  position: relative;

  max-height: 18px;
  margin-top: 12px;

  overflow: hidden;
  transition: all .5s;
}

.worker-header-info .worker-activity.toggle
{
  max-height: 100px;
}

.worker-activity .activity-toggle
{
  position: absolute;
  right: 0;
  top: 0;

  height: 14px;
  line-height: 14px;

  font-size: 12px;
  cursor: pointer;
}

.worker-activity .activity-toggle-img
{
  width: 10px;
  height: 6px;
  margin-left: 5px;

  transform: rotate(180deg);
  transform-origin: 5px 3px;
  transition: transform .5s;
}

.worker-activity .activity-toggle-img.trans90
{
  transform: rotate(0deg);
  transition: transform .5s;
}

.worker-activity .activity-item
{
  height: 16px;
  line-height: 16px;
}

.worker-activity .activity-item:not(:first-child)
{
  margin-top: 12px;
}

.worker-activity .activity-img
{
  width: 16px;
  height: 16px;

  vertical-align: middle;
}

.worker-activity .activity-help
{
  margin-left: 6px;

  font-size: 10px;
}

/* 商家头部信息 end */

/* 标签页切换头部 */

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

.worker-service .service-detail
{
  width: 100%;
}

.worker-service .detail-item
{
  box-sizing: border-box;

  border-bottom: 1px solid #e5eaee;

  background-color: #fff;
}

.detail-item .info-buy
{
  width: 20%;

  text-align: right;
}

.detail-item .info-pay
{
  padding: 5px 0px;
  border: 1px solid #ffbcac;
  border-radius: 5px;

  color: #fd552e;
  text-align: center;
}


.detail-item .info-price
{
  color: #fd552e;
  text-align: right;
  font-size: 10px;
}

/* 没有子服务 */

.detail-item .item-single
{
  box-sizing: border-box;

  height: 80px;
  line-height: 100%;
  padding: 16px;
}

.item-single .info-msg
{
  width: 80%;
}

.item-single .info-msg .info-title
{
  color: #333;
  font-size: 14px;
}

.item-single .info-msg .info-intro
{
  color: #656565;
  font-size: 12px;
}

/* 没有子服务 end */

/* 存在子服务 */

.detail-item .item-multi
{
  padding: 15px 16px;
}

.item-multi .sub-list-item
{
  line-height: 100%;
  margin-top: 12px;
}

.item-multi .info-msg .info-title
{
  color: #666;
}

.item-multi .sub-list-item .info-title
{
  font-size: 10px;
}

.item-multi .info-buy .sub-list-item
{
  text-align: right;
}

.item-multi .sub-service-wrapper
{
  position: fixed;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 100%;
}

.sub-service-wrapper .sub-service-mask
{
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.6);
}

.sub-service-wrapper .sub-service-list
{
  position: absolute;
  bottom: 0;

  width: 100%;
}

.sub-service-list .sub-service-title
{
  width: 100%;
  height: 50px;
  line-height: 50px;

  background-color: #3b3535;
  color: #fff;
  font-size: 16px;
  text-align: center;
}

.sub-service-list .sub-service-contain
{
  max-height: 167px;

  overflow: hidden;
  background-color: #fff;
}

.sub-service-contain .sub-service-item
{
  height: 55px;
  line-height: 55px;
  margin-left: 16px;
  padding-right: 32px;
}

.sub-service-contain .sub-service-item:not(:last-child)
{
  border-bottom: 1px solid #eef2f5;
}

.sub-service-list .sub-service-split
{
  width: 100%;
  height: 1px;
  background-color: #eef2f5;
}

.sub-service-list .sub-service-cancel
{
  width: 100%;
  height: 55px;
  line-height: 55px;
  border: none;

  background-color: #fff;
  text-align: center;
}

/* 存在子服务 end */

/* 分页：服务 end */

/* 分页：评价 */

.worker-evaluate
{
  background-color: #fff;
}

.worker-evaluate .evaluate-item
{
  margin-left: 16px;
  padding: 12px 16px 16px 0;
}

.worker-evaluate .evaluate-item:not(:last-child)
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

/* 分页：工人 */

.worker-about > *
{
  margin-top: 10px;
}

.worker-about .service-info
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

  width: 42px;
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

.service-tag  .tag-list .list-item:not(:last-child)
{
  margin-right: 6px;
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

.worker-about .worker-info
{
  padding-left: 16px;
  padding-bottom: 16px;

  background-color: #fff;
}

.worker-info .worker-info-wrapper
{
  align-items: stretch;
}

.worker-info > .worker-title,
.worker-info > .worker-time,
.worker-info > .worker-address,
.worker-info > .worker-range
{
  height: 44px;
  line-height: 44px;
}

.worker-info > *:not(:first-child)
{
  color: #666;
  font-size: 12px;
}

.worker-info-left .worker-native-place,
.worker-info-left .worker-education,
.worker-info-left .worker-stature,
.worker-info-left .worker-blood-type,
.worker-info-right .worker-working-years,
.worker-info-right .worker-constellation
{
  margin-top: 12px;
}

.worker-info .worker-info-left
{
  margin: 12px 0;
}

.worker-info .worker-info-right
{
  box-sizing: border-box;

  margin: 12px 16px 12px 0;
  padding-left: 16px;
  padding-right: 15%;
  border-left: 1px solid #eef2f5;
}

.worker-info .worker-footer
{
  margin-right: 16px;
  padding-left: 12px;
  padding-right: 18px;
  border-radius: 3px;

  background-color: #f2f6f9;
  overflow: hidden;
}

.worker-footer .worker-signature
{
  border-bottom: 1px solid #e5eaee;
}

.worker-footer .worker-signature,
.worker-footer .worker-intro
{
  padding-top: 8px;
  padding-bottom: 12px;
}

.worker-licence
{
  align-items: center;

  height: 44px;
  line-height: 44px;
  padding: 0 16px;

  background-color: #fff;
  color: #333;
}

.worker-licence .right-arrow
{
  height: 14px;
}

/* 分页：工人 end */

</style>