<template>
<div style="background-color:#eff2f5;position:relative;height:100%;">
	<div class="vue-search-bar">
	    <form class="vue-search-bar__form" action="javascript:return true;">
	        <div class="vue-search-bar__box">
	            <i class="weui-icon-search"></i>
	            <input type="search" class="vue-search-bar__input" v-model="searchInput" v-focus placeholder="搜服务/工人/商户" required="" autofocus>
	            <a href="javascript:" class="weui-icon-clear" @click="searchClear"></a>
	        </div>
<!-- 	        <label class="vue-search-bar__label">
	            <i class="weui-icon-search"></i>
	            <span>搜索</span>
	        </label> -->
	    </form>
	    <router-link to="/menu/service" class="vue-search-bar__cancel-btn">取消</router-link>
	</div>
	
	<!-- 搜索结果 -->
	<div class="vue-cells searchbar-result" id="searchResult" style="transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1); display: block;">
      <div class="vue-cell">
          <div class="vue-cell__bd vue-cell_primary">
              <p>实时搜索文本</p>
          </div>
          <div>
          	<button class="vue-btn vue-btn_primary">一键下单</button>
          </div>
      </div>
      <div class="vue-cell">
          <div class="vue-cell__bd vue-cell_primary">
              <p class="vue-cell__p">
              	<span>实时搜索文本</span>
              	<span class="vue-cell__label">
              		<i></i>
              		<em>38岁</em>
              	</span>
              </p>
              <p class="vue-cell__p">
              	<span class="vue-cell__span">小时工(<span>擦玻璃</span>)</span>
              </p>
          </div>
          <div>
          	<button class="vue-btn vue-btn_primary">一键下单</button>
          </div>
      </div>
      <div class="vue-cell">
          <div class="weui-cell__bd ">
              <span>实时搜索文本</span>
              <span class="vue-cell__label">全程商户</span>
          </div>
          <div>
          	<button class="vue-btn vue-btn_primary">一键下单</button>
          </div>
      </div>
      <div class="vue-cell">
          <div class="weui-cell__bd vue-cell_primary">
              <p>实时搜索文本</p>
          </div>
      </div>
  </div>

</div>
</template>

<script>
export default {
	name:"search",
	data(){
		return {
			searchInput:""
		}
	},
	methods:{
		searchClear(){
			this.searchInput = "";
		}
	},
	directives:{
		focus:{
			inserted:function(el){
				el.focus();
			}
		}
	}
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
// search-bar
.vue-search-bar {
	position:relative;
	padding:10px 12px;
	display:flex;
	box-sizing:border-box;
	background-color:#fff;
	
	&:after {
		.setBottomLine(#D7D6DC);
		left:@weuiCellGapH;
		right:@weuiCellGapH;
	}
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

	&:after {
		content:" ";
		position:absolute;
		left:0;
		top:0;
		width:200%;
		height:200%;
		transform:scale(.5);
		transform-origin:0 0;
		border-radius:100px;
		border:1px solid #eeeff1;
		box-sizing:border-box;
		background:#fff;
	}
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

// cell
.vue-cells {
	background-color:@weuiCellBg;
	line-height:@weuiCellLineHeight;
	font-size:@weuiCellFontSize;
	overflow:hidden;

	position:relative;
	&:after {
		.setBottomLine(@weuiCellBorderColor);
	}
}

.vue-cell {
	padding:@weuiCellGapV @weuiCellGapH;
	position:relative;
	display:flex;
	align-items:center;
	&:before {
		.setTopLine(@weuiCellBorderColor);
		left:@weuiCellGapH;
		right:@weuiCellGapH;
	}
	&:first-child {
		&:before {
			display:none;
		}
	}
}

.vue-cell_primary {
	align-items:flex-strat;
}
.vue-cell__bd {
	flex:1
}
.vue-cell__ft {
	text-align:right;
	color:@weuiTextColorGray;
}
.vue-cell__p {
	font-size:14px;
	line-height:20px;
}
.vue-cell__span {
	font-size:12px;
	line-height:20px;
}
.vue-cell__label {
	margin-left:6px;
	font-size:12px;
	padding:2px;
	border-radius:4px;
	background-color:#ccc;
	color:#fff;
	i {

	}
	em {
		padding-left:2px;
		font-style:normal;
	}
}

// vue-btn
.setTapColor(@c:rgba(0,0,0,0)) {
    -webkit-tap-highlight-color: @c;
}
@weuiBtnHeight:34px;
@weuiBtnFontSize:14px;
@weuiBtnFontColor:#FFFFFF;
@weuiBtnBorderRadius:4px;

@weuiBtnPrimaryBg:rgb(38,184,243);
@weuiBtnActiveFontColor:rgba(255,255,255,.6);
@weuiBtnPrimaryActiveBg:#33aada;

.vue-btn {
	position:relative;
	display:block;
	margin-left:auto;
	margin-right:auto;
	padding-left:6px;
	padding-right:6px;
	box-sizing:border-box;
	font-size:@weuiBtnFontSize;
	text-align:center;
	text-decoration:none;
	color:@weuiBtnFontColor;
	line-height:unit(@weuiBtnHeight/@weuiBtnFontSize);
	border-radius:@weuiBtnBorderRadius;
	.setTapColor();
	overflow:hidden;
	&:after {
		content:' ';
		width:200%;
		height:200%;
		position:absolute;
		top:0;
		left:0;
		border:1px solid rgba(0,0,0,.2);
		transform:scale(.5);
		transform-origin:0 0 ;
		box-sizing:border-box;
		border-radius:@weuiBtnBorderRadius;
	}
}

.vue-btn_primary {
  background-color: @weuiBtnPrimaryBg;
  &:not(.weui-btn_disabled):visited {
      color: @weuiBtnFontColor;
  }
  &:not(.weui-btn_disabled):active {
      color: @weuiBtnActiveFontColor;
      background-color: @weuiBtnPrimaryActiveBg;
  }
}

button, input {
    &.vue-btn {
        width: 100%;
        border-width: 0;
        outline: 0;
        -webkit-appearance: none;
        &:focus {
            outline: 0;
        }
    }
    &.vue-btn_inline,&.vue-btn_mini {
        width: auto;
    }
    &.vue-btn_plain-primary,&.vue-btn_plain-default{
        border-width: 1px;
        background-color: transparent;
    }
}

</style>

