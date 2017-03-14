<template>
<div class="page tabbar">

  <search-all></search-all>

  <div class="vue-topnav">
    <div class="vue-topnav__primary">
      <span :class="{'vue-topnav__item_on': mapFastType === '全部'}" class="vue-topnav__item" @click="searchType('全部')">全部</span>
      <span :class="{'vue-topnav__item_on': mapFastType === item.Name}" class="vue-topnav__item" v-for="item in totals" @click="searchType(item.Name)">{{item.Name}}</span>
    </div>
    <img class="vue-topnav__swit-btn" src="../../static/images/button-swit.png" alt="">
  </div>

  <div class="vue-slider" @click="switchType()">
    <img v-show="mapClassType === 0" src="../../static/images/button_home_all.png" alt="">
    <img v-show="mapClassType === 1" src="../../static/images/button_home_worker.png" alt="">
    <img v-show="mapClassType === 2" src="../../static/images/button_home_boss.png" alt="">
  </div>

	<div id="map-container"></div>

  <div class="vue-swiper" v-show="isSwiper">
    <div class="swiper-container swiper-container-horizontal">
      <div class="swiper-wrapper" style="transition-duration: 0ms; -webkit-transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
            <!-- 这边的顺序需要和swipeList里面一致 -->
            <!-- 全城服务 -->
            <div class="swiper-slide" v-if="item.Belong === 3 || item.Belong === 4" v-for="item in swiperList">
              <service-city :msg="item"></service-city>
            </div>
            <!-- 工人 -->
            <div class="swiper-slide" v-if="item.Belong === 0" v-for="item in swiperList">
              <service-worker :msg="item"></service-worker>
            </div>
            <!-- 商户 -->
            <div class="swiper-slide" v-if="item.Belong === 1" v-for="item in swiperList">
              <service-shop :msg="item"></service-shop>
            </div>
        </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import searchAll from "../search/Search_all.vue";
import searchFast from "../search/Search_fast.vue";
import serviceCity from "./Service_city.vue";
import serviceWorker from './Service_worker.vue';
import serviceShop from './Service_shop.vue';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

import LocalImg from '../../static/images/pic-local.png';

import slider from '../swiper/slider.vue';

import workerImg from '../../static/images/pic-worker.png';
import bossImg from '../../static/images/pic-boss.png';
import wholeImg from '../../static/images/pic-whole.png';

function clear_active(map,point) {
    // console.log("point",point);
    let allOverlay = map.getOverlays();
    allOverlay.map(function(i,v,arry){
      if(i instanceof BLNOverlay || i instanceof LocalOverlay){
      }else if(i._point.lat === point.lat && i._point.lng === point.lng){
        i.show();
      }else {
        i.hide();
      }
    })
}
/**
 * 查找point在数组中是第几个
 * return index
 */
function swiper_slide(point,arry){
  let index;
  arry.map((v,i,arr)=>{
    if(v.Latitude === point.Latitude && v.Longitude === point.Longitude){
      index = i;
    }
  })
  return index;
}

let MarkerOverlay = {
  worker(lng,lat,obj){
    let point = new BMap.Point(lng, lat);
    return new MirrorOverlay(point,obj);
  },
  boss(lng,lat,obj){
    let point = new BMap.Point(lng, lat);
    return new HouseOverlay(point,obj);
  },
  whole(lng,lat,obj){
    let point = new BMap.Point(lng, lat);
    return new WholeOverlay(point,obj);
  }
}
function LocalOverlay(point,obj){
  this._point = point;
  this._obj = obj;
  this._image = this._obj.image;
}
LocalOverlay.prototype = new BMap.Overlay();
LocalOverlay.prototype.initialize = function(map){
  this._map = map;
  var div = this._div = document.createElement("div");
  div.style.position = "absolute";
  div.style.width = "38px";
  div.style.height = "38px";
  div.style.background = "url("+this._image+") no-repeat";
  div.style.backgroundSize = "100% 100%";
  div.style.zIndex = "9999";

  map.getPanes().labelPane.appendChild(div);
  return div;
}
LocalOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x -19 +"px";
  this._div.style.top = pixel.y -38 + "px";
}
function BLNOverlay(point){
  this._point = point;
}
BLNOverlay.prototype = new BMap.Overlay();
BLNOverlay.prototype.initialize = function(map){
  this._map = map;
  var div = this._div = document.createElement("div");
  div.style.position = "absolute";
  div.style.width = "20px";
  div.style.height = "20px";
  div.style.backgroundColor = "#fff";
  div.style.borderRadius ="50%";
  div.style.boxShadow = "0 0 10px -3px #4d4f58";
  div.style.zIndex = "8888";

  var circle = this._circle = document.createElement("div");
  circle.style.position = "absolute";
  circle.style.top = "50%";
  circle.style.left = "50%";
  circle.style.background = "#33a9fc";
  circle.style.width = "14px";
  circle.style.height = "14px";
  circle.style.borderRadius = "50%";
  circle.style.marginLeft = "-7px";
  circle.style.marginTop = "-7px";
  circle.style.animation = "breatheLight 2s linear infinite";

  div.appendChild(circle);

  map.getPanes().labelPane.appendChild(div);
  return div;
}
BLNOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x +"px";
  this._div.style.top = pixel.y -17 + "px";
}
function MirrorOverlay(point,obj){
  this._point = point;
  this._obj = obj;
  this._image = this._obj.image;
  this._text = this._obj.text;
  this._bgImage = this._obj.bgImage;
  this._bgcolor = this._obj.bgcolor;
  this._touchStart = this._obj.touchStart;
}
MirrorOverlay.prototype = new BMap.Overlay();
MirrorOverlay.prototype.initialize = function(map){
  this._map = map;
  var box = this._box = document.createElement("div");
  box.style.position = "absolute";
  box.style.padding = "0";
  box.style.margin = "0";
  box.style.border = "0";
  box.style.width = "1000px";
  box.style.height = "0";

  var container = this._container = document.createElement("div");
  container.style.position = "absolute";
  container.style.width = "38px";
  container.style.height = "52px";
  // container.style.backgroundRepeat = "no-repeat";
  // container.style.backgroundSize = "cover";
  box.appendChild(container);

  var div = this._div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "0";
  div.style.left = "50%";
  div.style.transform = "translateX(-50%)";
  div.style.backgroundRepeat = "no-repeat";
  div.style.backgroundSize = "cover";
  div.style.backgroundColor = this._bgcolor || "transparent";
  div.style.borderRadius = "50%";
  div.style.padding = "2px";
  div.style.color = "white";
  div.style.MozUserSelect = "none";
  container.appendChild(div);

  var arrow = this._arrow = document.createElement("div");
  arrow.style.background = "url("+this._image+") no-repeat";
  arrow.style.backgroundSize = "cover";
  arrow.style.width = "32px";
  arrow.style.height = "32px";
  arrow.style.overflow = "hidden";
  arrow.style.borderRadius = "50%";
  div.appendChild(arrow);
 
  var span = this._span = document.createElement("span");
  span.style.position = "absolute";
  span.style.display = "inline-block";
  span.style.color = "#fff";
  span.style.lineHeight = "22px";
  span.style.fontSize = "12px";
  span.style.top = "-25px";
  span.style.left = "-6px";
  span.style.height = "22px";
  span.style.padding = "1px 8px";
  span.style.textAlign = "center";
  span.style.backgroundColor = "rgba(0,0,0,0.5)";
  span.style.borderTopLeftRadius = "20px";
  span.style.borderTopRightRadius = "20px";
  span.style.borderBottomLeftRadius = "20px";
  span.style.borderBottomRightRadius = "20px";
  box.appendChild(span);
  span.appendChild(document.createTextNode(this._text));

  div.addEventListener('touchstart',() => {
    clear_active(this._map,this._point);
    this._touchStart();
    // container.style.background = "url("+this._bgImage+")";
    // container.style.backgroundSize = "cover";
    // span.style.opacity = "0";
    // container.style.zIndex = "8000";
  })

  map.getPanes().markerPane.appendChild(box);
  return box;
}
MirrorOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._box.style.left = pixel.x +"px";
  this._box.style.top = pixel.y -30 + "px";
  // this._box.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
  // this._box.style.top  = pixel.y - 30 + "px";
}
MirrorOverlay.prototype.hide = function(){
  var span = this._span;
  var container = this._container;
  container.style.background = "";
  span.style.opacity = "1";
  container.style.zIndex = "0";
}
MirrorOverlay.prototype.show = function(){
  var container = this._container;
  var span = this._span;
  container.style.background = "url("+this._bgImage+")";
  container.style.backgroundSize = "cover";
  span.style.opacity = "0";
  container.style.zIndex = "8000";
}
function HouseOverlay(point,obj){
  this._point = point;
  this._obj = obj;
  this._image = this._obj.image;
  this._text = this._obj.text;
  this._bgImage = this._obj.bgImage;
  this._bgcolor = this._obj.bgcolor;
  this._touchStart = this._obj.touchStart;
}
HouseOverlay.prototype = new BMap.Overlay();
HouseOverlay.prototype.initialize = function(map){
  this._map = map;
  var box = this._box = document.createElement("div");
  box.style.position = "absolute";
  box.style.padding = "0";
  box.style.margin = "0";
  box.style.border = "0";
  box.style.width = "1000px";
  box.style.height = "0";

  var container = this._container = document.createElement("div");
  container.style.position = "absolute";
  container.style.width = "51px";
  container.style.height = "50px";
  container.style.backgroundRepeat = "no-repeat";
  container.style.backgroundSize = "cover";
  box.appendChild(container);

  var div = this._div = document.createElement("div");
  div.style.position = "absolute";
  div.style.backgroundColor = this._bgcolor || "#fff";
  div.style.backgroundRepeat = "no-repeat";
  div.style.backgroundSize = "cover";
  div.style.bottom = "0";
  div.style.left = "8px";
  div.style.borderRadius = "50%";
  div.style.height = "36px";
  div.style.width = "36px";
  div.style.borderRadius = "50%";
  div.style.MozUserSelect = "none";
  container.appendChild(div);

  var arrow = this._arrow = document.createElement("div");
  arrow.style.background = "url("+this._image+") no-repeat";
  arrow.style.backgroundSize = "cover";
  arrow.style.position = "absolute";
  arrow.style.bottom = "2px";
  arrow.style.left = "10px";
  arrow.style.width = "32px";
  arrow.style.height = "32px";
  arrow.style.overflow = "hidden";
  arrow.style.borderRadius = "50%";
  container.appendChild(arrow);

  var span = this._span = document.createElement("span");
  span.style.position = "absolute";
  span.style.display = "inline-block";
  span.style.color = "#fff";
  span.style.lineHeight = "22px";
  span.style.fontSize = "12px";
  span.style.top = "-14px";
  span.style.left = "-6px";
  span.style.height = "22px";
  span.style.padding = "1px 8px";
  span.style.textAlign = "center";
  span.style.backgroundColor = "rgba(0,0,0,0.5)";
  span.style.borderTopLeftRadius = "20px";
  span.style.borderTopRightRadius = "20px";
  span.style.borderBottomLeftRadius = "20px";
  span.style.borderBottomRightRadius = "20px";
  box.appendChild(span);
  span.appendChild(document.createTextNode(this._text));

  arrow.addEventListener('touchstart',() => {
    clear_active(this._map,this._point);
    this._touchStart();
  })

  map.getPanes().markerPane.appendChild(box);
  return box;
}
HouseOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._box.style.left = pixel.x +"px";
  this._box.style.top = pixel.y -35 + "px";
  // this._box.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
  // this._box.style.top  = pixel.y - 30 + "px";
}
HouseOverlay.prototype.hide = function(){
  var bgcolor = this._bgcolor;
  var container = this._container;
  var div = this._div;
  var span = this._span;
  container.style.backgroundImage = "";
  container.style.zIndex = "0";
  div.style.backgroundColor = bgcolor || "#fff";
  span.style.opacity = "1";
}
HouseOverlay.prototype.show = function(){
  var container = this._container;
  var div = this._div;
  var span = this._span;
  container.style.backgroundImage = "url("+this._bgImage+")";
  container.style.zIndex = "8000";
  div.style.backgroundColor = "transparent";
  span.style.opacity = "0";
}
function WholeOverlay(point,obj){
  this._point = point;
  this._obj = obj;
  this._image = this._obj.image;
  this._text = this._obj.text;
  this._bgImage = this._obj.bgImage;
  this._bgcolor = this._obj.bgcolor;
  this._touchStart = this._obj.touchStart;
}
WholeOverlay.prototype = new BMap.Overlay();
WholeOverlay.prototype.initialize = function(map){
  this._map = map;
  var box = this._box = document.createElement("div");
  box.style.position = "absolute";
  box.style.padding = "0";
  box.style.margin = "0";
  box.style.border = "0";
  box.style.width = "1000px";
  box.style.height = "0";

  var container = this._container = document.createElement("div");
  container.style.position = "absolute";
  container.style.width = "51px";
  container.style.height = "50px";
  container.style.backgroundRepeat = "no-repeat";
  container.style.backgroundSize = "cover";
  box.appendChild(container);

  var div = this._div = document.createElement("div");
  div.style.position = "absolute";
  div.style.backgroundColor = this._bgcolor || "#fff";
  div.style.backgroundRepeat = "no-repeat";
  div.style.backgroundSize = "cover";
  div.style.bottom = "0";
  div.style.left = "8px";
  div.style.borderRadius = "50%";
  div.style.height = "36px";
  div.style.width = "36px";
  div.style.borderRadius = "50%";
  // div.style.padding = "2px";
  div.style.MozUserSelect = "none";
  container.appendChild(div);

  var arrow = this._arrow = document.createElement("div");
  arrow.style.background = "url("+this._image+") no-repeat";
  arrow.style.backgroundSize = "cover";
  arrow.style.position = "absolute";
  arrow.style.bottom = "2px";
  arrow.style.left = "10px";
  arrow.style.width = "32px";
  arrow.style.height = "32px";
  arrow.style.overflow = "hidden";
  arrow.style.borderRadius = "50%";
  container.appendChild(arrow);

  var span = this._span = document.createElement("span");
  span.style.position = "absolute";
  span.style.display = "inline-block";
  span.style.color = "#fff";
  span.style.lineHeight = "22px";
  span.style.fontSize = "12px";
  span.style.top = "-14px";
  span.style.left = "0";
  span.style.height = "22px";
  span.style.padding = "1px 8px";
  span.style.textAlign = "center";
  span.style.backgroundColor = "rgba(76,197,98,0.4)";
  span.style.borderTopLeftRadius = "20px";
  span.style.borderTopRightRadius = "20px";
  span.style.borderBottomLeftRadius = "20px";
  span.style.borderBottomRightRadius = "20px";
  box.appendChild(span);
  span.appendChild(document.createTextNode("全城服务"));

  container.addEventListener('touchstart',() => {
    clear_active(this._map,this._point);
    this._touchStart();
    // container.style.backgroundImage = "url("+this._bgImage+")";
    // div.style.backgroundColor = "transparent";
    // span.style.opacity = "0";
    // div.style.zIndex = "8000";
  })

  map.getPanes().markerPane.appendChild(box);
  return box;
}
WholeOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._box.style.left = pixel.x +"px";
  this._box.style.top = pixel.y -35 + "px";
}
WholeOverlay.prototype.hide = function(){
  var container = this._container;
  var div = this._div;
  var span = this._span;
  var bgcolor = this._bgcolor;
  container.style.backgroundImage = "";
  div.style.backgroundColor = bgcolor || "#fff";
  span.style.opacity = "1";
  div.style.zIndex = "0";
}
WholeOverlay.prototype.show = function(){
  var container = this._container;
  var div = this._div;
  var span = this._span;
  container.style.backgroundImage = "url("+this._bgImage+")";
  div.style.backgroundColor = "transparent";
  span.style.opacity = "0";
  div.style.zIndex = "8000";
}

export default {
	name:"service",
  data(){
    return {
      map:{},
      totals:["全部"],  // 热门服务
      workers:[],       // 工人
      business:[],        // 商户
      wholes:[],         // 全城工人，商户
      swiperList:[],  // 所有数据的集合
      mySwiper:{},    // 滑动对象
      isSwiper:false   // 是否显示滑动
    }
  },
	mounted:function(){
    let map = new BMap.Map("map-container");          // 创建地图实例
    let point = new BMap.Point(116.404, 39.915);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别

    // 移动点point sessionStorage 做本地缓存
    if(sessionStorage.getItem("Point")){
      let storePoint = JSON.parse(sessionStorage.getItem("Point"));
      getHot(storePoint.lng,storePoint.lat).then((res)=>{
        this.totals = res.data.Body;
      });

      let store = new BMap.Point(storePoint.lng, storePoint.lat);
      this.changePoint(store);
      map.panTo(store); //地图中心移动到定位点
    }else{
      autoGeolocation();
    }

    /**
     * 自动定位 初始化
     * @type {BMap}
     */
    function autoGeolocation(){
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            point = r.point;
            var mark = new BLNOverlay(r.point);
            map.addEventListener('clearoverlays',function(){
              map.addOverlay(mark);
            })
            map.addOverlay(mark); //mk放到地图中
            map.panTo(r.point); //地图中心移动到定位点
            console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
        } else {
            alert('failed' + this.getStatus());
        }
      }, {
          enableHighAccuracy: true
      })
    }

    /**
     * 手动定位 初始化
     * @type {BMap}
     */
    var geolocationControl = new BMap.GeolocationControl({
      anchor: BMAP_ANCHOR_BOTTOM_LEFT, //控件停靠位置
      offset: new BMap.Size(10, 60),
      showAddressBar: false, //是否显示定位信息面板
      // locationIcon: new BMap.Icon(LocalImg, new BMap.Size(22, 22)) //自定义定位中心点的icon
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
      var mk1 = new LocalOverlay(pot,{
        image:LocalImg
      });
      map.addOverlay(mk1); 
      var mk2 = new BLNOverlay(pot);
      map.addOverlay(mk2);      
    });
    geolocationControl.addEventListener("locationError", function(e) {
      // 定位失败事件
      alert(e.message);
    });
    map.addControl(geolocationControl);
    this.map = map;
    
    //移动地图事件
    map.addEventListener("moveend",()=>{
      // console.log("地图移动结束时触发此事件");
      
      // 清空缓存
      // this.isSwiper = false;
      // this.swiperList = [];

      let point_c = map.getCenter();   
      this.changePoint(point_c);
      sessionStorage.setItem("Point",JSON.stringify(point_c));

      // 获取热门服务 
      getHot(point_c.lng,point_c.lat).then((res)=>{
        // console.log("热门",res.data);
        this.totals = res.data.Body;
      });   
    })   

    /**
     * 获取热门服务 
     */
    async function getHot(lng,lat){
      let response = await axios.post(API.GetHotServices,qs.stringify({
        "Latitude":lat,
        "Longitude":lng,
        "Token":""
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      })
      return response;
    }  
  },
  computed: mapState(['mapFastType','mapClassType','mapPoint','Token']),
  watch:{
    mapPoint(){
      this.drawMap();
    },
    mapFastType(){
      this.drawMap();
    },
    mapClassType(){
      this.drawMap();
    }
  },
  methods:{
    drawMap(){
      if(this.mapFastType === '全部'){
        // 3 默认搜索 未选择搜索条件
        axios.post(API.IndexEx2,qs.stringify({
          "Latitude":this.mapPoint.lat,
          "Longitude":this.mapPoint.lng,
          "Type": this.mapClassType,
          "QueryStr":"",
          "QueryType":"3",
          "ServiceId":"",
          "Token":""
        }),{
          header: {'Content-Type':'application/x-www-form-urlencoded'}
        }).then((res) => {
          if(res.data.Meta.ErrorCode === '0'){
            // 工人 0，商户 1，全城工人 3，全城商户 4
            if(res.data.Body && res.data.Body.Workers){
              res.data.Body.Workers.map((v,i,arry)=>{
                v['Belong'] = 0
              })
            }
            if(res.data.Body && res.data.Body.Business){
              res.data.Body.Business.map((v,i,arry)=>{
                v['Belong'] = 1
              })
            }
            if(res.data.Body && res.data.Body.WholeWorkers){
              res.data.Body.WholeWorkers.map((v,i,arry)=>{
                v['Belong'] = 3
              })
            }
            if(res.data.Body && res.data.Body.WholeBusiness){
              res.data.Body.WholeBusiness.map((v,i,arry)=>{
                v['Belong'] = 4
              })
            }
            this.isSwiper = false;
            this.wholes = [];
            this.swiperList = [];
            this.wholes = res.data.Body.WholeWorkers.concat(res.data.Body.WholeBusiness);
            this.swiperList = this.wholes.concat(res.data.Body.Workers,res.data.Body.Business);
            this.createMarker(res.data.Body.Workers,res.data.Body.Business,res.data.Body.WholeWorkers,res.data.Body.WholeBusiness);
          }
        })  
      }else{
        // 0 文字搜索 有搜索条件
        axios.post(API.IndexEx2,qs.stringify({
          "Latitude":this.mapPoint.lat,
          "Longitude":this.mapPoint.lng,
          "Type": this.mapClassType,
          "QueryStr":this.mapFastType,
          "QueryType":"0",
          "ServiceId":"",
          "Token":""
        }),{
          header: {'Content-Type':'application/x-www-form-urlencoded'}
        }).then((res) => {
          if(res.data.Meta.ErrorCode === '0'){
            // 工人 0，商户 1，全城工人 3，全城商户 4
            if(res.data.Body && res.data.Body.Workers){
              res.data.Body.Workers.map((v,i,arry)=>{
                v['Belong'] = 0
              })
            }
            if(res.data.Body && res.data.Body.Business){
              res.data.Body.Business.map((v,i,arry)=>{
                v['Belong'] = 1
              })
            }
            if(res.data.Body && res.data.Body.WholeWorkers){
              res.data.Body.WholeWorkers.map((v,i,arry)=>{
                v['Belong'] = 3
              })
            }
            if(res.data.Body && res.data.Body.WholeBusiness){
              res.data.Body.WholeBusiness.map((v,i,arry)=>{
                v['Belong'] = 4
              })
            }
            this.isSwiper = false;
            this.wholes = [];
            this.swiperList = [];
            this.wholes = res.data.Body.WholeWorkers.concat(res.data.Body.WholeBusiness);
            this.swiperList = this.wholes.concat(res.data.Body.Workers,res.data.Body.Business);
            this.createMarker(res.data.Body.Workers,res.data.Body.Business,res.data.Body.WholeWorkers,res.data.Body.WholeBusiness);
          }
        })  
      }
    },
    createMarker(workers,business,wholeW,wholeB){
      // 清除地图
      this.map.clearOverlays();
      // 创建定位点
      let mk = new LocalOverlay(this.mapPoint,{
        image:LocalImg
      });
      this.map.addOverlay(mk);
      // 创建标志点
      let whole = [];
      if(wholeW && wholeB){
        whole = wholeW.concat(wholeB);
        // console.log("whole",whole);
      } 
      if(workers && workers.length > 0){
        workers.map((i,v,arr) => {
          let worker = MarkerOverlay.worker(i.Longitude,i.Latitude,{
            image:i.Photo,
            text:i.DefaultService.Name,
            bgImage:workerImg,
            bgcolor:"#ff9d2f",
            touchStart:()=>{
              let index = swiper_slide(i,this.swiperList);      
              if(!this.isSwiper){
                this.isSwiper = true;
                this.mySwiper = new Swiper ('.swiper-container', {
                  width:330,
                  spaceBetween: 10,
                  onSlideChangeEnd:(swiper)=>{
                    //切换结束时，告诉我现在是第几个slide
                    // console.log(this.swiperList);
                    // console.log(swiper.activeIndex);
                    // console.log("第几个",this.swiperList[swiper.activeIndex]);
                    let lat = this.swiperList[swiper.activeIndex].Latitude;
                    let lng = this.swiperList[swiper.activeIndex].Longitude;
                    let point = new BMap.Point(lng, lat); 
                    clear_active(this.map,point);
                  }
                }) 
              }        
              this.swiperTo(index);
            }
          })
          this.map.addOverlay(worker);
        })
      }
      if(business && business.length > 0){
        business.map((i,v,arr) => {
          let boss = MarkerOverlay.boss(i.Longitude,i.Latitude,{
            image:i.Photo,
            text:i.Name,
            bgImage:bossImg,
            bgcolor:"#1daefa",
            touchStart:()=>{
              // console.log("this.isSwiper",this.isSwiper);
              let index = swiper_slide(i,this.swiperList);      
              if(!this.isSwiper){
                this.isSwiper = true;
                this.mySwiper = new Swiper ('.swiper-container', {
                  width:330,
                  spaceBetween: 10,
                  onSlideChangeEnd:(swiper)=>{
                    //切换结束时，告诉我现在是第几个slide
                    // console.log(this.swiperList);
                    // console.log(swiper.activeIndex);
                    // console.log("第几个",this.swiperList[swiper.activeIndex]);
                    let lat = this.swiperList[swiper.activeIndex].Latitude;
                    let lng = this.swiperList[swiper.activeIndex].Longitude;
                    let point = new BMap.Point(lng, lat); 
                    clear_active(this.map,point);
                  }
                }) 
              }        
              this.swiperTo(index);
            }
          })
          this.map.addOverlay(boss);
        })
      }
      if(whole && whole.length > 0){
        whole.map((i,v,arr) => {
          let all = MarkerOverlay.whole(i.Longitude,i.Latitude,{
            image:i.Photo,
            text:i.DefaultService.Name,
            bgImage:wholeImg,
            bgcolor:"rgb(77,199,102)",
            touchStart:()=>{
              let index = swiper_slide(i,this.swiperList);      
              if(!this.isSwiper){
                this.isSwiper = true;
                this.mySwiper = new Swiper ('.swiper-container', {
                  width:330,
                  spaceBetween: 10,
                  onSlideChangeEnd:(swiper)=>{
                    //切换结束时，告诉我现在是第几个slide
                    // console.log(this.swiperList);
                    // console.log(swiper.activeIndex);
                    // console.log("第几个",this.swiperList[swiper.activeIndex]);
                    let lat = this.swiperList[swiper.activeIndex].Latitude;
                    let lng = this.swiperList[swiper.activeIndex].Longitude;
                    let point = new BMap.Point(lng, lat); 
                    clear_active(this.map,point);
                  }
                }) 
              }        
              this.swiperTo(index);
            }
          })
          this.map.addOverlay(all);
        })
      }  
    },
    changePoint(point){
      this.$store.dispatch('changeMap',{
        point:point
      });
    },
    searchType(item){
      this.$store.dispatch('searchMap',{
        txt:item
      });
      if(item === '全部'){
        this.$store.dispatch('searchInput',{
          txt:""
        })
      }else{
        this.$store.dispatch('searchInput',{
          txt:item
        })
      }
    },
    switchType(){
      this.$store.dispatch('switchMap');
    },
    swiperTo(i){
      this.mySwiper.slideTo(i, 1000, false);
    }
  },
  components:{searchAll,searchFast,serviceCity,serviceWorker,serviceShop}
}
</script>
<style scoped>
#map-container {
    font-size:14px;
    width:100%;
    box-sizing: border-box;
    height:calc(100% - 111px);
}
</style>
<style lang="less" scoped>
.page {
  position: relative;
  height:100%;
  font-size:14px;
  overflow:hidden;
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
.vue-slider {
  position:absolute;
  top:120px;
  right:10px;
  z-index:10;
  width:40px;

  img {
    width:100%;
  }
}
.slider {
  position:absolute;
  bottom:30px;
}
@keyframes breatheLight {
  from,to{
    transform:scale(.9);
  }
  50% {
    transform:scale(.7);
  }
}
.vue-swiper {
  position:absolute;
  bottom:75px;
  left:0;
  height:152px;
}
.swiper-container {
  height:100%;
}
</style>