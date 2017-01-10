<template>
<div class="page tabbar">
  
  <search-all></search-all>

  <div class="vue-topnav">
    <div class="vue-topnav__primary">
      <span class="vue-topnav__item" v-for="item in totals">{{item}}</span>
    </div> 
    <div class="vue-topnav__swit-btn">
      <img src="../../static/images/button-swit.png" alt="">
    </div>
  </div>

	<div id="map-container"></div> 
  
    

</div>
</template>

<script>
import searchAll from "../search/Search_all.vue";
import searchFast from "../search/Search_fast.vue";

export default {
	name:"service",
  data(){
    return {
      totals:["全部","小时工","木工","三级类型","保姆","类型",]
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
  },
  components:{searchAll,searchFast}
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
  background-color:#fff;
  display:flex;
  justify:center;
  align-items:center;
}
.vue-topnav__primary{
  flex:1;
  

  .vue-topnav__item {
    line-height:44px;
    padding:0 16px;
    color: #999;

    &.vue-topnav__item_on {
      color: rgb(38,184,243);
    } 

  }
}
.vue-topnav__swit-btn {
  margin-right:10px;
}
</style>