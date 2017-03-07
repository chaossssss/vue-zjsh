<template>
<div>
  <header>
    <ul class="tab-nav clr">
      <li :class="{'active':flag==1}" @click="flag=1;">未使用</li>
      <li :class="{'active':flag==2}" @click="flag=2;">已使用</li>
      <li :class="{'active':flag==3}" @click="flag=3;">已过期</li>
    </ul>
  </header>

  <!-- 未使用 -->
  <div class="discount no-use" v-show="flag==1">
    <!-- 没有红包 -->
    <div class="no-discount" v-if="discountNoUseList.length==0">
      <img class="no-discount-img" src="../../static/images/no-hb.png">
    </div>

    <!-- 红包列表 -->
    <div class="discount-item" v-else v-for="item in discountNoUseList">
      <div class="discount-top">
        <div class="item-left">
          <!-- 红包金额 -->
          <span class="money">{{ item.CouponDetails[0].DiscountAmount }}</span>

          <span class="use-condition">满{{ item.CouponDetails[0].Amount }}可用</span>
        </div>

        <!-- 红包分割线 -->
        <div class="split-vertical"></div>

        <!-- 红包信息 -->
        <div class="item-right">
          <span class="discount-type">{{ item.Title }}</span>

          <span class="discount-condition" v-if="item.ServiceTypes.length==0">全品类可用</span>
          <span class="discount-condition" v-if="item.ServiceTypes.length!=0">
            <span v-for="type in item.ServiceTypes">{{ type.ServiceName }}</span>
          </span>

          <span class="discount-date">{{ item.StartTime | msToDate }}至{{ item.EndTime | msToDate }}</span>
        </div>
      </div>

      <div class="split-across"></div>

      <!-- 红包范围与过期时间 -->
      <div class="discount-bottom">
        <span class="discount-range">不限区域</span>

        <span class="discount-overdue-date">还有{{ getRemainingDay(item.EndTime, item.StartTime) }}天过期</span>
      </div>
    </div>
  </div>

  <!-- 已使用 -->
  <div class="discount used" v-show="flag==2">
    <!-- 没有红包 -->
    <div class="no-discount" v-if="discountUsedList.length==0">
      <img class="no-discount-img" src="../../static/images/no-hb.png">
    </div>

    <!-- 红包列表 -->
    <div class="discount-item" v-else v-for="item in discountUsedList">
      <div class="discount-top">
        <div class="item-left">
          <!-- 红包金额 -->
          <span class="money">{{ item.CouponDetails[0].DiscountAmount }}</span>

          <span class="use-condition">满{{ item.CouponDetails[0].Amount }}可用</span>
        </div>

        <!-- 红包分割线 -->
        <div class="split-vertical"></div>

        <!-- 红包信息 -->
        <div class="item-right">
          <span class="discount-type">{{ item.Title }}</span>

          <span class="discount-condition" v-if="item.ServiceTypes.length==0">全品类可用</span>
          <span class="discount-condition" v-if="item.ServiceTypes.length!=0">
            <span v-for="type in item.ServiceTypes">{{ type.ServiceName }}</span>
          </span>

          <span class="discount-date">{{ item.StartTime | msToDate }}至{{ item.EndTime | msToDate }}</span>
        </div>

        <!-- 已使用红包图标 -->
        <img class="used-img" src="../../static/images/yishiyong@2x.png">
      </div>

      <div class="split-across"></div>

      <!-- 红包范围 -->
      <div class="discount-bottom">
        <span class="discount-range">不限区域</span>
      </div>
    </div>
  </div>

  <!-- 已过期 -->
  <div class="discount overdue" v-show="flag==3">
    <!-- 没有红包 -->
    <div class="no-discount" v-if="discountOverdueList.length==0">
      <img class="no-discount-img" src="../../static/images/no-hb.png">
    </div>

    <!-- 红包列表 -->
    <div class="discount-item" v-else v-for="item in discountOverdueList">
      <div class="discount-top">
        <div class="item-left">
          <!-- 红包金额 -->
          <span class="money">{{ item.CouponDetails[0].DiscountAmount }}</span>

          <span class="use-condition">满{{ item.CouponDetails[0].Amount }}可用</span>
        </div>

        <!-- 红包分割线 -->
        <div class="split-vertical"></div>

        <!-- 红包信息 -->
        <div class="item-right">
          <span class="discount-type">{{ item.Title }}</span>

          <span class="discount-condition" v-if="item.ServiceTypes.length==0">全品类可用</span>
          <span class="discount-condition" v-if="item.ServiceTypes.length!=0">
            <span v-for="type in item.ServiceTypes">{{ type.ServiceName }}</span>
          </span>

          <span class="discount-date">{{ item.StartTime | msToDate }}至{{ item.EndTime | msToDate }}</span>
        </div>

        <!-- 已过期红包图标 -->
        <img class="overdue-img" src="../../static/images/yigouqi@2x.png">
      </div>

      <div class="split-across"></div>

      <!-- 红包范围 -->
      <div class="discount-bottom">
        <span class="discount-range">不限区域</span>
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
      <p class="weui-toast__content">正在获取数据...</p>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'userDiscount',
  data() {
    return {
      flag: 1,
      discountNoUseList: [],
      discountUsedList: [],
      discountOverdueList: [],
      isError: false,
      errorMsg: '',
      isLoading: false
    }
  },
  computed: {
    ...mapState(['Token'])
  },
  filters: {
    msToDate(millisecond) {
      //从数据库中取出的日期为毫秒数，需要加三个0才能转换
      let date = new Date(parseInt(millisecond + '000'));
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  },
  methods: {
    getRemainingDay(endDate, startDate) {
      return ((endDate + '000') - (startDate + '000')) / 1000 / 60 / 60 / 24;
    }
  },
  mounted() {
    axios.post(API.CouponList, qs.stringify({
      "Token": this.Token
    }), {
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      let disList = res.data.Body.CouponList;

      disList.forEach((val) => {
        if (val.EndTime + '000' <= new Date().getTime()) {
          //已过期
          this.discountOverdueList.push(val);
        } else {
          if (val.IsUsed == '0') {
            //未使用
            this.discountNoUseList.push(val);
          } else if (val.IsUsed == '1') {
            if (val.EndTime + '000' >= new Date().getTime()) {
              //已使用
              this.discountUsedList.push(val);
            }
          }
        }
      });
    }).catch(function(error) {
      console.log(error);
      this.isError = true;
      this.errorMsg = "获取工人收藏失败，请检查网络是否正常!";
    })


  }
}
</script>

<style scoped>

/* header */

header
{
  position: fixed;
  top: 0;

  width: 100%;

  background-color: #fff;
  z-index: 9999;
}

header:before
{
  content: '';
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  bottom: -2px;

  width: 200%;
  height: 1px;
  border-bottom: 1px solid #ccc;

  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(.5,.5);
  transform: scale(.5,.5);
}

header .tab-nav
{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  height: 40px;
  line-height: 40px;

  font-size: 16px;
}

header .tab-nav > li
{
  width: 25%;

  height: 100%;

  list-style: none;
  text-align: center;
  color: #999;
}

.active
{
  border-bottom: 2px solid #27B8F3;

  color:#27b8f3 !important;
}

/* header end */

.discount
{
  height: 100%;
  padding-top: 32px;
}

.discount .no-discount-img
{
  width: 40%;

  margin: 40% 30% 0;
}

/* 红包通用列表样式（默认效果为未使用） */

.discount-item
{
  width: 90%;
  height: 126px;
  margin: 0 5%;
  border-radius: 10px;

  background-image: url(../../static/images/hongbao@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.discount-item:first-child
{
  margin-top: 24px;
}

.discount-item:not(:first-child)
{
  margin-top: 5%;
}

.discount-item .discount-top
{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  padding: 12px 0;
}

/* discount-top flex 布局比例 */

.discount-top .item-left
{
  width: 20%;
  margin-left: 5%;
}

.discount-top .split-vertical
{
  width: 1%;
  height: 60px;
  margin: 0 2%;
  border-left: 1px dashed #ccc;
}

.discount-top .item-right
{
  width: 45%;
}

/* discount-top flex 布局比例 end */

/* 红包列表左侧 */

.item-left
{
  color: #ff5340;
}

/* 红包金额 */
.item-left .money
{
  position: relative;
  display: block;

  height: 45px;
  line-height: 45px;

  font-size: 50px;
  text-align: center;
}

.item-left .money::before
{
  content: '￥';
  position: absolute;
  top: 12px;
  left: -6px;

  font-size: 18px;
}

/* 使用条件 */
.item-left .use-condition
{
  display: block;

  text-align: center;
}

/* 红包列表左侧 end */

/* 红包列表右侧 */

.item-right .discount-type
{
  display: block;

  height: 28px;

  font-size: 18px;
  font-weight: bolder;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-right .discount-condition
{
  display: block;

  height: 19px;

  color: #666;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-right .discount-date
{
  display: block;

  height: 19px;

  color: #666;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-right .discount-condition::before,
.item-right .discount-date::before
{
  content: '·';

  font-weight: bolder;
  margin-right: 2px;
}

/* 红包列表右侧 end */

.split-across
{
  width: 90%;
  margin: 0 auto;
  border-top: 1px dashed #cfcfcf;
}

/* 红包列表下方 */

.discount-item .discount-bottom
{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  height: 34px;
  padding: 0 5%;
}

.discount-bottom .discount-range
{
  color: #666;
}

.discount-bottom .discount-range::before
{
  content: '·';

  font-weight: bolder;
  margin-right: 2px;
}

.discount-bottom .discount-overdue-date
{
  color: #fe1a55;
}

/* 红包列表下方 end */

/* 红包通用列表样式 end */

/* 已使用红包 */

.used .money,
.used .use-condition,
.used .discount-type,
.used .discount-condition,
.used .discount-date,
.used .discount-range
{
  color: #ccc;
}

.used .discount-item
{
  background-image: url(../../static/images/anhongbao@2x.png);
}

.used .discount-item .used-img
{
  position: absolute;
  right: 20px;
  width: 96px;
}

/* 已使用红包 end */

/* 已过期红包 */

.overdue .money,
.overdue .use-condition,
.overdue .discount-type,
.overdue .discount-condition,
.overdue .discount-date,
.overdue .discount-range
{
  color: #ccc;
}

.overdue .discount-item
{
  background-image: url(../../static/images/anhongbao@2x.png);
}

.overdue .discount-item .overdue-img
{
  position: absolute;
  right: 20px;
  width: 96px;
}

/* 已过期红包 end */

/* 340以下像素适应 */

@media screen and (max-width: 340px)
{
  .item-left .use-condition
  {
    font-size: 12px;
  }

  .discount-top .item-left
  {
    margin-left: 5%;
  }

  .item-left .money
  {
    font-size: 36px;
  }

  .item-left .money::before
  {
    top: 8px;
  }

  .discount-top .item-right
  {
    width: 45%;
  }

  .used .discount-item .used-img,
  .overdue .discount-item .overdue-img
  {
    width: 64px;
  }
}

/* 340以下像素适应 end */

</style>