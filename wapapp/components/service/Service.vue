<template>
<div class="page tabbar">
  
  <search-all></search-all>

	<div id="map-container"></div> 
    
</div>
</template>

<script>
import searchAll from "../search/Search_all.vue";

export default {
	name:"service",
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
  components:{searchAll}
}
</script>

<style scoped>
  .page {
    position: relative;
    height: 100%;
  }
  #map-container {
      width:100%;
      height:calc(100%);
  }

</style>