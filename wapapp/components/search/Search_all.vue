<template>
	<div class="page__bd">
    <img style="width:35px;margin-left:8px;" src="../../static/images/pic-scan.png" alt="">
    <div style="flex:2">
      <router-link to="/search" class="vue-search-bar">
        <form class="vue-search-bar__form" action="javascript:return true;">
            <div class="vue-search-bar__box">
                <i class="weui-icon-search"></i>
                <input type="search" class="vue-search-bar__input" placeholder="搜服务/工人/商户" v-model="mapSearchInput" required="">
                <!-- <a href="javascript:" class="weui-icon-clear"></a> -->
            </div>
            <!-- <label class="vue-search-bar__label">
                <i class="weui-icon-search"></i>
                <span>搜索</span>
            </label> -->
        </form>
      </router-link>
    </div>
    <img style="width:35px;margin-right:8px;" src="../../static/images/pic-news.png" alt="">
</div> 
</template>

<script>
import { mapState } from 'vuex';
export default {
	name:'searchAll',
  computed:mapState(['mapSearchInput'])
}
</script>

<style lang="less" scoped>
@weuiCellBg:#FFFFFF;
@weuiCellBorderColor:#D9D9D9;
@weuiCellGapV:10px;
@weuiCellGapH:15px;
@weuiCellInnerGapH:.35em;
@weuiCellHeight: 50px;
@weuiCellFontSize:14px;
@weuiCellTipsFontSize:14px;
@weuiCellLabelWidth:105px;

@weuiCellLineHeight: unit((@weuiCellHeight - 2 * @weuiCellGapV) / @weuiCellFontSize); // 高度为44px，减去上下padding的行高
@weuiCellsMarginTop:unit(20 / @weuiCellFontSize, em);

// weui switch
@weuiSwitchHeight: 32px;

// weui uploader
@weuiUploaderBorderColor:#D9D9D9;
@weuiUploaderActiveBorderColor:#999999;
@weuiUploaderFileSpacing: 9px;
@weuiUploaderSize: 79px;
@weuiUploaderBorderWidth: 1px;

// text
@weuiTextColorGray: #999999;

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

.setBottomLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid @c;
    color: @c;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
}

.page__bd {
  display:flex;
  background-color:#fff;
  justify-content:center;
  align-items:center;
}

// search-bar
.vue-search-bar {
  position:relative;
  padding:10px 12px;
  display:flex;
  box-sizing:border-box;
  background-color:#fff;
  
  &.weui-search-bar_focusing {
    .weui-search-bar__cancel-btn {
      display:block;
    }
    .weui-search-bar__label {
      display:none;
    }
  }
}

.vue-search-bar__form {
  position:relative;
  flex:auto;
  background-color:#eff0f2;
  border-radius:50%;
}
  
.vue-search-bar__box {
  position:relative;
  padding-left:40px;
  padding-right:40px;
  height:100%;
  width:100%;
  box-sizing:border-box;
  z-index:1;
  background-color:#eff0f2;
  border-radius:100px;
  .vue-search-bar__input {
    padding:4px 0;
    width:100%;
    height:28/14em;
    border:0;
    font-size:14px;
    line-height:20/14em;
    box-sizing:content-box;
    background:transparent;
    &:focus {
      outline:none;
    }
  }
  .weui-icon-search {
      position: absolute;
      left: 15px;
      top: 0;
      line-height: 36px;
  }
  .weui-icon-clear {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 10px;
      line-height: 36px;
  }
}

.vue-search-bar__label {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    border-radius: 50%;
    text-align: center;
    color: #9B9B9B;
    background-color:#eff0f2;
    line-height:34px;
    span {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
    }
    .weui-icon-search {
        margin-right: 5px;
    }
}

.vue-search-bar__cancel-btn {
  display:block;
  margin-left:12px;
  line-height:36px;
  color:#666 ;
  white-space:nowarp;
}
.vue-search-bar__input:not(:valid) ~ .vue-icon-clear {
    display: none;
}
//干掉input[search]默认的clear button
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
    display: none;
}
	


</style>