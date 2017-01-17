<template>
<div class="page tabbar">
  
  <search-all></search-all>

  <div class="vue-topnav">
    <div class="vue-topnav__primary">
      <span :class="{'vue-topnav__item_on': type === item}" class="vue-topnav__item" v-for="item in totals" @click="searchType(item)">{{item}}</span>
    </div> 
    <img class="vue-topnav__swit-btn" src="../../static/images/button-swit.png" alt="">
  </div>

	<div id="map-container"></div> 
  
  <!-- <search-city></search-city> -->
  <!-- <search-worker></search-worker> -->
  <search-shop></search-shop>
     

</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import searchAll from "../search/Search_all.vue";
import searchFast from "../search/Search_fast.vue";
import searchCity from "./Service_city.vue";
import searchWorker from './Service_worker.vue';
import searchShop from './Service_shop.vue';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

import LocalImg from '../../static/images/pic-local.svg';

/**
 * 初始化定位(根据浏览器定位)
 * @param  {[type]} map [description]
 * @param  {[type]} mk  [description]
 * @return {[type]}     [description]
 */
function firstGeolocation(map,mk) {
    var point;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            point = r.point;
            var myIcon = new BMap.Icon(LocalImg, new BMap.Size(22, 22));
            var mark = new BMap.Marker(r.point, {
                icon: myIcon
            });
            mark.setTop(true); // 放置到最顶层
            mark.setZIndex(10000);
            mark.disableMassClear(); //不能被clear掉
            map.addOverlay(mark); //mk放到地图中
            map.panTo(r.point); //地图中心移动到定位点

            console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
        } else {
            alert('failed' + this.getStatus());
        }
    }, {
        enableHighAccuracy: true
    })
    return point;
}

function GeolocationControl(){
  var geolocationControl = new BMap.GeolocationControl({
    anchor: BMAP_ANCHOR_BOTTOM_LEFT, //控件停靠位置
    offset: new BMap.Size(10, 30),
    showAddressBar: false, //是否显示定位信息面板
    locationIcon: new BMap.Icon(LocalImg, new BMap.Size(22, 22)) //自定义定位中心点的icon
  });
  geolocationControl.addEventListener("locationSuccess", function(e) {
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    console.log("当前定位地址为：" + e);
    var pot = e.point;
    map.clearOverlays();
    //alert(pot);    
    // var myIcon = new BMap.Icon(localTop, new BMap.Size(22,46));
    // if(mk0.point || mk1.point){
    //     //已经定位成功，移动到定位点
    //     console.log("mk0:",mk0.point,"mk1:",mk1.point);
    // map.panTo(mk0.point); 
    // mk1.setPosition(mk0.point);
    // }            
  });
  geolocationControl.addEventListener("locationError", function(e) {
    // 定位失败事件
    alert(e.message);
  });
}

export default {
	name:"service",
  data(){
    return {
      totals:["全部","小时工","木工","保姆","三级类型","保姆","类型"]
    }
  },
	mounted:function(){
    let map = new BMap.Map("map-container");          // 创建地图实例  
    let point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
    let myIcon = new BMap.Icon(LocalImg, new BMap.Size(22, 22));
    let mk = new BMap.Marker(point, {
        icon: myIcon
    });     
    let GeoloPoint = firstGeolocation(map);
    mk.setTop(true); // 放置到最顶层
    mk.setZIndex(10000);
    mk.disableMassClear(); //不能被clear掉
    map.addOverlay(mk); //mk放到地图中

    //移动地图事件
    map.addEventListener("moveend",function(){
      // console.log("地图移动结束时触发此事件");
      let point_c = map.getCenter();
      // console.log("移动定位中点",point_c);
      mk.setPosition(point_c);
      // searchData(point_c.lng,point_c.lat);

      // localStorage.setItem("Map_Lng",point_c.lng);
      // localStorage.setItem("Map_Lat",point_c.lat+0.019439); //加上百度坐标偏移

      console.log("移动后定位点的坐标",mk.getPosition());
    })      


    async function SearcData(){
      await axios.post(API.IndexEx2,qs.stringify({
        "Latitude":"39.9",
        "Longitude":"116.39",
        "Type":"0",
        "QueryStr":"",
        "QueryType":"3",
        "ServiceId":"",
        "Token":""
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res) => {
        console.log(res.data);
      })
    }
    SearcData();
  },
  computed: mapState(['type']),
  methods:{
    searchType(item){
      this.$store.dispatch('searchMap',{
        txt:item
      });
      console.log(this);
    }
  },
  components:{searchAll,searchFast,searchCity,searchWorker,searchShop}
}
</script>

<style lang="less" scoped>
.page {
  position: relative;
  height: 100%;
}
#map-container {
    width:100%;
    height:calc(100%);
}
.vue-topnav {
  position:absolute;
  top:56px;
  height:44px;
  left:0;
  z-index:2;
  background-color:#fff;
  width:100%;
  box-shadow:0 3px 3px -2px rgba(34,48,59,0.33); 
}
.vue-topnav__primary{
  display:inline-block;
  width:84%;
  overflow-x:auto;
  white-space:nowrap;

  .vue-topnav__item {
    line-height:44px;
    display:inline-block;
    padding:0 16px;
    color: #999;

    &.vue-topnav__item_on {
      color: rgb(38,184,243);
    } 

  }
}
.vue-topnav__swit-btn {
  width:22px;
  position:absolute;
  top:50%;
  right:16px;
  transform:translateY(-50%);
}



</style>