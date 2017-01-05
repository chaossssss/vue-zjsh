<template>
  <div class="container">
    <div id="menu">
        <a href="">12354376232312313</a>
    </div>
    <div class="post">
            <a href="">4573412374617286</a>
        </div>
    <div class="weui-tabbar">
        <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
            <span style="display: inline-block;position: relative;">
                <img src="../../static/images/logo.png" alt="" class="weui-tabbar__icon">
                <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">101</span>
            </span>
            <p class="weui-tabbar__label">微信</p>
        </a>
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

<style lang="less" >
/*一定要加lang不然无法编译*/
    /*测试一下对sass的编译*/
   .bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: green;
  .bordered;
}

.post a {
  color: red;
  .bordered;
}

</style>