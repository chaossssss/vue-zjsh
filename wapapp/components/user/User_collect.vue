<template>
<div>
  <header>
    <ul class="tab-nav clr">
      <li :class="{'active':flag==1}" @click="flag=1">工人收藏(<span class="worker-nums">{{ workerCollNum }}</span>)</li>
      <li :class="{'active':flag==2}" @click="flag=2">商户收藏(<span class="bus-nums">{{ businessCollNum }}</span>)</li>
    </ul>
  </header>
  <!-- 工人收藏 -->
  <div class="worker-list" v-show="flag==1">
    <!-- 没有收藏 -->
    <div class="no-collect" v-if="workerCollNum==0">
      <img class="no-collect-img" src="../../static/images/no-shoucang.png" alt="">
      <p class="title">没有收藏</p>
      <p class="content">您的收藏夹空空<br>赶紧去地图找喜欢的工人收藏吧</p>
    </div>

    <!-- 收藏 -->
    <router-link to="" v-if="workerCollNum!=0" v-for="data in workerCollList">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <!-- 工人头像 -->
          <img class="worker-img" :src="data.Photos[0].HqPic">
        </div>

        <div class="weui-cell__bd">
          <!-- 工人相关 -->
          <div class="worker-about clr">
            <!-- 工人姓名 -->
            <span class="worker-name f-left">{{ data.Name }}</span>

            <!-- 评价列表 -->
            <div class="worker-evaluate f-left">
              <!-- 点赞 -->
              <img class="like-icon" v-show="data.IsPraise==1" src="../../static/images/dianzan.png" alt="">
              <img class="like-icon" v-show="data.IsPraise==0" src="../../static/images/hand.png" alt="">
              <span class="like">{{ data.FavoriteCount }}</span>

              <!-- 收藏 -->
              <img class="star-icon" src="../../static/images/shoucang.png" alt="">
              <span class="star">{{ data.PraiseCount }}</span>

              <!-- 评分 -->
              <img class="grade-icon" src="../../static/images/pingfen.png" alt="">
              <span class="grade">{{ data.Grade2 }}</span>
            </div>
          </div>

          <!-- 工人信息 -->
          <div class="worker-info">
            <!-- 工作类型 -->
            <span class="info-type">{{ data.Services.DefaultServiceType.Name }}</span>

            <!-- 籍贯 -->
            <span class="info-address">{{ data.NativePlace }}</span>

            <!-- 工作年限 -->
            <span class="info-year">{{ data.DisplayAttribute }}</span>

            <!-- 详情图标 -->
            <img class="right_gray f-right" src="../../static/images/right_gray.png" alt="">
          </div>

          <!-- 认证图标 -->
          <div class="worker-badge">
            <img class="badge-icon" v-for="img in data.SystemCertification" :src="img.HqPic" alt="">
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <!-- 商户收藏 -->
  <div class="business-list" v-show="flag==2">
    <!-- 没有收藏 -->
    <div class="no-collect" v-if="businessCollNum==0">
      <img class="no-collect-img" src="../../static/images/no-shoucang.png" alt="">
      <p class="title">没有收藏</p>
      <p class="content">您的收藏夹空空<br>赶紧去地图找喜欢的商户收藏吧</p>
    </div>

    <!-- 收藏 -->
    <router-link to="" v-if="businessCollNum!=0" v-for="data in businessCollList">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <!-- 公司头像 -->
          <img class="business-img" :src="data.Photos[0].HqPic">
        </div>

        <div class="weui-cell__bd">
          <div class="business-about">
            <!-- 商家名称 -->
            <span class="business-name">{{ data.Name }}</span>
          </div>

          <!-- 商家信息 -->
          <div class="business-info clr">
            <!-- 服务类型 -->
            <span class="business-type f-left">{{ data.Services.DefaultServiceType.Name }}</span>

            <!-- 详情图标 -->
            <img class="right_gray f-right" src="../../static/images/right_gray.png" alt="">

            <!-- 商家评价 -->
            <div class="business-evaluate f-right">
              <!-- 点赞 -->
              <img class="like-icon" v-show="data.IsPraise==1" src="../../static/images/dianzan.png" alt="">
              <img class="like-icon" v-show="data.IsPraise==0" src="../../static/images/hand.png" alt="">
              <span class="like">{{ data.PraiseCount }}</span>

              <!-- 收藏 -->
              <img class="star-icon" src="../../static/images/shoucang.png" alt="">
              <span class="star">{{ data.FavoriteCount }}</span>

              <!-- 评分 -->
              <img class="grade-icon" src="../../static/images/pingfen.png" alt="">
              <span class="grade">{{ data.Grade2 }}</span>
            </div>
          </div>

          <!-- 认证图标 -->
          <div class="business-badge">
            <img class="badge-icon" v-for="img in data.SystemCertification" :src="img.HqPic" alt="">
          </div>
        </div>
      </div>
    </router-link>
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
  name: 'userCollect',
  data(){
    return{
        flag: 1,
        workerCollList: [],
        workerCollNum: 0,
        businessCollList: [],
        businessCollNum: 0,
        isError: false,
        errorMsg: '',
        isLoading: true
    }
  },
  computed:mapState(['Token']),
  methods: {
    getWorkerCollect() {
      axios.post(API.WorkerList, qs.stringify({
        "Token": this.Token
        }),{
          header: {'Content-Type':'application/x-www-form-urlencoded'}
        }).then((res) => {
          this.workerCollNum = res.data.Body.WorkerFavoritesList.length;
          this.workerCollList = res.data.Body.WorkerFavoritesList;
        }).catch(function (error) {
          console.log(error);
          this.isError = true;
          this.errorMsg = "获取工人收藏失败，请检查网络是否正常!";
        })
    },
    getBusinessCollect(callback) {
      axios.post(API.BusinessList, qs.stringify({
        "Token": this.Token
      }),{
        header: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res) => {
        this.businessCollNum = res.data.Body.BusinessFavoritesList.length;
        this.businessCollList = res.data.Body.BusinessFavoritesList;
        callback();
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "获取工人收藏失败，请检查网络是否正常!";
      })
    }
  },
  mounted() {
    //获取工人与商户的收藏列表
    this.getWorkerCollect();
    this.getBusinessCollect(()=> {
      this.isLoading = false;
    });
  }
}
</script>

<style scoped>
/* common style */

.f-left
{
  float: left;
}

.f-right
{
  float: right;
}

/* 清除浮动 */
.clr::before,
.clr::after
{
  content: '';
  display: block;

  clear: both;
}

.right_gray
{
  width: 8px;
}

/* common style end */

/* header */

header
{
  position: relative;
}

header:before
{
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

header .tab-nav
{
  position: relative;
}

header .tab-nav > li
{
  display: inline-block;

  width: 50%;
  padding: 8px 0;

  list-style: none;
  text-align: center;
  color: #999;
}

header .tab-nav > li:last-child
{
  float: right;
}

.active
{
  border-bottom: 2px solid #27b8f3;

  color:#27b8f3 !important;
}

/* header end */

/* worker-list&business-list common style */

/* no collect style */

.no-collect
{
  margin-top: 40%;

  text-align: center;
}

.no-collect .no-collect-img
{
  width: 24%;
}

.no-collect .title
{
  font-size: 18px;
  color: #3f3e48;
}

.no-collect .content
{
  margin-top:10px;

  font-size: 12px;
  color: #8c8a9f;
}

/* no collect style end */

.weui-cell
{
  border-bottom: 1px solid #F3F0F0;
}

.weui-cell__hd
{
  position: relative;

  margin-right: 17px;
  margin-top: 0;
  padding: 0;
}

.weui-cell__hd .worker-img,
.weui-cell__hd .business-img
{
  display: block;

  width: 60px;
  height: 60px;
  border-radius: 5px;
}

.weui-cell__bd
{
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: calc(100% - 70px - 17px - 30px);
  width: -moz-calc(100% - 70px - 17px - 30px);
  width: -webkit-calc(100% - 70px - 17px - 30px);
  height: 60px;
  line-height: 100%;
  padding: 0;
}

.worker-badge,
.business-badge
{
  /* 清除回车符带来的间距 */
  min-height: 15px;
  line-height: 100%;

  font-size: 0;
}

.badge-icon
{
  width: 15px;
  margin-right: 5px;
}

.badge-icon:last-child
{
  margin-right: 0;
}

.like,
.star,
.grade
{
  font-size: 12px;
  color: #8c8a9f;
}

.like-icon,
.star-icon,
.grade-icon
{
  width: 12px;

  margin-left: 15px;
}

.like-icon
{
  margin-left: 0;
}

/* worker-list&businesss-list common style */

/* worker list style */

.worker-about .worker-name
{
  width: 90px;

  font-size: 14px;
  color:#3f3e48;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.worker-about .worker-evaluate
{
  margin-left: 16px;
}

.worker-info
{
  font-size: 12px;
  color:#3f3e48;
}

.worker-info .info-type,
.worker-info .info-address,
.worker-info .info-year
{
  margin-right: 5px;
}

/* worker list style end */

/* business list style */

.business-about .business-name
{
  display: block;

  width: 100%;

  font-size: 14px;
  color:#3f3e48;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.business-info
{
  font-size: 12px;
  color:#3f3e48;
}

.business-info .business-type
{
  width: 40%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.business-info .business-evaluate
{
  margin-right: 12px;
}

/* business list style end */

@media screen and (max-width: 320px)
{
  .weui-cell__hd
  {
    margin-right: 10px;
  }

  .like-icon,
  .star-icon,
  .grade-icon
  {
    margin-left: 4px;
  }

  .worker-about .worker-evaluate
  {
    margin-left: 8px;
  }

  .business-info .business-type
  {
    width: 25%;
  }
}

</style>