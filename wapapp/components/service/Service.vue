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
import VueSlider from 'vue-slider';
import API from '../../config/backend';

export default {
	name:"service",
  data(){
    return {
      totals:["全部","小时工","木工","保姆","三级类型","保姆","类型"]
    }
  },
	mounted:function(){
    let map = new AMap.Map('map-container', {
      zoom: 15,
      center: [116.39, 39.9]
    });
    let marker = new AMap.Marker({
        position: [116.39, 39.9],
        map:map
    });
    console.warn("this",this);
    let that = this;
    async function Init(){
      console.log("this",this);
      await that.$http.post(API.IndexEx2,{
        "Latitude":"39.9",
        "Longitude":"116.39",
        "Type":"0",
        "QueryStr":"",
        "QueryType":"3",
        "ServiceId":"3",
        "Token":""
      },{
        emulateJSON:true
      }).then((res) => {
        console.log("第一输出");
      })
    }
    Init();
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
  components:{searchAll,searchFast,searchCity,searchWorker,searchShop,VueSlider}
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