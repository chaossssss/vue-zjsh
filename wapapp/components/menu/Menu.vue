<template>
  <div class="vue-tab">
      <div class="vue-tab__panel">
    
      <router-view></router-view>
      
      </div>
      <div class="vue-tabbar">
          <router-link to="/menu/service" class="vue-tabbar__item " active-class="vue-bar__item_on">
              <span style="display: inline-block;position: relative;">
                  <img src="../../static/images/logo.png" alt="" class="vue-tabbar__icon">
                  
              </span>
              <p class="vue-tabbar__label">找服务</p>
          </router-link>
          <router-link to="/menu/activity" class="vue-tabbar__item" active-class="vue-bar__item_on">
              <img src="../../static/images/logo.png" alt="" class="vue-tabbar__icon">
              <p class="vue-tabbar__label">活动</p>
          </router-link>
          <router-link to="/quick_order" class="vue-tabbar__item" active-class="vue-bar__item_on">
              <span class="vue-bar__circle" >
                <img src="../../static/images/logo.png" alt="" class="vue-tabbar__icon">     

              </span>
              <p class="vue-tabbar__label vue-tabbar__circle_label">一键下单</p>
          </router-link>
          <router-link to="/menu/order_list" class="vue-tabbar__item" active-class="vue-bar__item_on">
              <span style="display: inline-block;position: relative;">
                  <img src="../../static/images/logo.png" alt="" class="vue-tabbar__icon">
                
              </span>
              <p class="vue-tabbar__label">订单</p>
          </router-link>
          <router-link to="/menu/user" class="vue-tabbar__item" active-class="vue-bar__item_on">
              <img src="../../static/images/logo.png" alt="" class="vue-tabbar__icon">
              <p class="vue-tabbar__label">我的</p>
          </router-link>
      </div>
  </div>

</template>

<script>
export default {
	name:"menu",
}
</script>

<style lang="less"  scoped>
// text
@weuiTextColorGray: #666;

.setTapColor(@c:rgba(0,0,0,0)) {
    -webkit-tap-highlight-color: @c;
}

.setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0; 
    height: 1px;
    border-top: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}

.vue-tab {
  position:relative;
  height:100%;
}
.vue-tab__panel {
  box-sizing:border-box;
  height:100%;
  padding-bottom:50px;
  overflow:auto;
  -webkit-overflow-scrolling:touch;
}
.vue-tabbar {
  display:flex;
  position:absolute;
  z-index:500;
  bottom:0;
  width:100%;
  background-color:#fff;
  box-shadow:0 0 10px 0px rgba(34,48,59,0.33);

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0; 
    height: 1px;
    border-top: 1px solid #C0BFC4;
    color: #C0BFC4;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
}
.vue-tabbar__item {
  position:relative;
  display:block;
  flex:1;
  padding:5px 0 0;
  font-size:0;
  color:@weuiTextColorGray;
  text-align:center;
  .setTapColor();

  &.vue-bar__item_on {
    .vue-tabbar__icon,
    .vue-tabbar__icon > i,
    .vue-tabbar__label {
        color: rgb(38,184,243);
    } 
  }

  .vue-bar__circle {
    display:inline-block;
    background-color:#fff;
    width:70px;
    height:70px;
    position:absolute;
    border-radius:50%;
    top:-17px;
    left: 50%;
    transform:translateX(-50%);
    box-shadow:0 -10px 10px -8px rgba(34,48,59,0.33);

    img {
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
    }  
  }
}



.vue-tabbar__icon {
    display: inline-block;
    width: 27px;
    height: 27px;

    i&,
    > i {
        font-size: 24px;
        color: @weuiTextColorGray;
    }

    img {
        width: 100%;
        height: 100%;
    }
}

.vue-tabbar__label {
    text-align: center;
    color: @weuiTextColorGray;
    font-size: 10px;
    line-height: 1.8;

    &.vue-tabbar__circle_label {
      position:absolute;
      bottom:0;
      left:50%;
      transform:translateX(-50%);
      color:@weuiTextColorGray;
      width:100%;
    }
}



</style>