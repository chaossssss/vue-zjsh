<template>
  <div class="container">

    <router-view></router-view>
    <div id="menu">
        <a href="">12354</a>
    </div>
    <div class="post">
            <a href="">4573123</a>
        </div>
    
    <nav> 
      <div class="vue-tabbar">
        <router-link to="/service" class="vue-tabber__item vue-tabbar__item_on">
           <span>
             
           </span>
           <p class="vue-tabbar__label">找服务</p>
        </a>
      </router-link>
    </nav>   
    <div class="weui-tabbar">
        <router-link to="/menu/user" class="weui-tabbar__item weui-bar__item_on">
            <span style="display: inline-block;position: relative;">
                <img src="../../static/images/logo.png" alt="" class="weui-tabbar__icon">
                <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">0</span>
            </span>
            <p class="weui-tabbar__label">微信</p>
        </router-link>
        <a href="javascript:;" class="weui-tabbar__item">
            <img src="../../static/images/logo.png" alt="" class="weui-tabbar__icon">
            <p class="weui-tabbar__label">通讯录</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item">
            <span style="display: inline-block;position: relative;">
                <img src="../../static/images/logo.png" alt="" class="weui-tabbar__icon">
                <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
            </span>
            <p class="weui-tabbar__label">发现</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item">
            <img src="../../static/images/logo.png" alt="" class="weui-tabbar__icon">
            <p class="weui-tabbar__label">我</p>
        </a>
    </div>
  </div>
</template>

<script>
export default {
	name:"menu"
}
</script>

<style lang="less" scoped>
.vue-tabbar {
  display:flex;
}

</style>