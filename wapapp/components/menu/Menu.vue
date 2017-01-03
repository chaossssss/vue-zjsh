<template>
    <div class="container">
    	<div class="page tabbar js_show">
            <div class="page__bd" style="height: 100%;">
                <div class="weui-tab">
                    <div class="weui-tab__panel">

                    <router-view></router-view>

                    </div>
                    <div class="weui-tabbar">
                        <router-link to="/menu/service" class="weui-tabbar__item" 
                        active-class="weui-bar__item_on">
                            <span style="display: inline-block;position: relative;">
                                <img src="../../static/images/menu-service-off.png" alt="" class="weui-tabbar__icon">   
                            </span>
                            <p class="weui-tabbar__label">找服1务</p>
                        </router-link>
                        <router-link to="/menu/activity" class="weui-tabbar__item" 
                        active-class="weui-bar__item_on">
                            <img src="../../static/images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                            <p class="weui-tabbar__label">活动</p>
                        </router-link>
                        <router-link to="/menu/quick_order" class="weui-tabbar__item"
                        active-class="weui-bar__item_on">
                            <span style="display: inline-block;position: relative;">
                                <img src="../../static/images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                            </span>
                            <p class="weui-tabbar__label">一键下单</p>
                        </router-link>
                        <router-link to="/menu/order" class="weui-tabbar__item"
                        active-class="weui-bar__item_on">
                            <img src="../../static/images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                            <p class="weui-tabbar__label">订单</p>
                        </router-link>
                        <router-link to="/menu/user" class="weui-tabbar__item"
                        active-class="weui-bar__item_on">
                            <img src="../../static/images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                            <p class="weui-tabbar__label">我的</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name:"menu"
}
</script>

<style>
.container {
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
}
.page {
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color: #f8f8f8;
}

</style>