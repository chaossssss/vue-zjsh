<template>
<div style="height: 100%;">
  <header class="header-search">
  </header>

  <div class="map" id="map"></div>

  <ul class="arround-list">
    <li class="list-item" v-for="item in arroundList" @click="backWithParam(item)">{{ item.address }}</li>
  </ul>
</div>
</template>

<script>
import { mapState } from 'vuex';
import slider from '../swiper/slider.vue';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'addrMap',
  data() {
    return {
      arroundList: [],
      point: {
        lng: 116.404,
        lat: 39.915
      }
    }
  },
  mounted() {
    let that = this;

    //地图初始化
    let map = new BMap.Map('map');
    let pit = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(pit, 15);

    //移动点point sessionStorage 做本地缓存
    //从缓存中读取经纬度
    if (sessionStorage.getItem("Point")) {
      let storePoint = JSON.parse(sessionStorage.getItem("Point"));
      this.point = storePoint;
      this.getAroundLocation(storePoint);

      let store = new BMap.Point(storePoint.lng, storePoint.lat);
      map.panTo(store); //地图中心移动到定位点
    } else {
      //自动获取当前经纬度
      this.getPosition();
      this.getAroundLocation(this.point);
    }

    //监听拖动地图事件
    map.addEventListener('dragend', function() {
      //设置坐标为拖动后地图的中心坐标
      that.point = map.getCenter();
      //获取新坐标附近的位置信息
      that.getAroundLocation(that.point);
    })
  },
  methods: {
    //获取当前坐标（经纬度）
    getPosition() {
      let that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(result) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          that.point = result.point;
        }
      }, {
        enableHighAccuracy: true
      })
    },
    //获取当前坐标附近位置信息
    getAroundLocation(point) {
      let that = this;
      let geo = new BMap.Geocoder();
      geo.getLocation(new BMap.Point(point.lng, point.lat), function(result) {
        that.arroundList = result.surroundingPois;
      })
    },
    //选择好位置后将数据保存在sessionStorage
    backWithParam(val) {
      sessionStorage.setItem('mapAddr', val.address);
      sessionStorage.setItem('mapAddrLng', val.point.lng);
      sessionStorage.setItem('mapAddrLat', val.point.lat);
      //返回上一页
      this.$router.go(-1);
    }
  },
  computed: mapState(['Token'])
}
</script>

<style scoped>

/* common */

li
{
  list-style: none;
}

a
{
  color: #333;
}

/* common end */


/* header */

.header-search
{
  position: fixed;
  top: 0;

  width: 100%;
  height: 44px;
  border-bottom: 1px solid #ddd;

  background: #fff;
  z-index: 999;
}

/* header end */


/* container */

#map
{
  height: 100%;
}

.arround-list
{
  position: fixed;
  bottom: 0;

  width: 100%;
  height: 135px;


  background-color: #fff;
  z-index: 999;
  overflow-x: hidden;
}

.list-item
{
  height: 44px;
  line-height: 44px;
  padding-left: 36px;
}

.list-item:not(:first-child)
{
  bottom-top: 1px solid #ddd;
}

.item-link
{
  display: block;

  width: 100%;
  height: 100%;
}

/* container end */
</style>