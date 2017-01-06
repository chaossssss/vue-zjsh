<template>
<div class="page tabbar">
  
  <div style="position:absolute;top:0px;z-index:1000;background-color:rgba(255,255,255,0.7);width:100%;">
    123
  </div>

	<div id="map-container"></div> 
    
</div>
</template>

<script>
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
    }
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