<template>
<div>
	<div class="vue-search-bar">
	    <form class="vue-search-bar__form" action="javascript:return true;">
	        <div class="vue-search-bar__box">
	            <i class="weui-icon-search"></i>
	            <input type="search" class="vue-search-bar__input" v-model="localSearchInput" placeholder="搜服务/工人/商户" required="">
	            <a href="javascript:;" class="weui-icon-clear" @click="searchClear"></a>
	        </div>
<!-- 	        <label class="vue-search-bar__label">
	            <i class="weui-icon-search"></i>
	            <span>搜索</span>
	        </label> -->
	    </form>
	    <a href="javascript:;" class="vue-search-bar__cancel-btn" @click="searchCancel(localSearchInput)">取消</a>
	</div>

	<!-- 热门服务 && 历史搜索 -->
	<div v-show="localSearchInput === '' && isResult.length === 0" class="vue-hots">
		<p>热门服务</p>
		<p>
			<span v-for="item in hotTotals" @click="searchIcon(item.Name)">{{item.Name}}</span>
		</p>
		<div>
			<img src="../../static/images/button-delete.png" alt="" @click="clearHistory">
			<p style="padding:0;margin-top:20px;">历史搜索</p>
			<p>
				<span v-for="item in history" @click="searchIcon(item)">{{item}}</span>
			</p>
		</div>
	</div>

	<!-- 无 搜索结果 -->
	<div v-show="localSearchInput !== '' && isResult.length === 0" class="vue-noresult" >
		<p>没有相关搜索结果，试试一键下单，</p>
		<p>我们将免费帮您安排工人上门服务</p>

		<router-link to="/quick_order" class="vue-btn vue-btn_primary">一键下单</router-link>
	</div>

	<!-- 搜索结果 -->
	<div v-if="isResult.length>0" class="vue-cells searchbar-result" style="transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1); display: block;">
			<div v-for="item in serviceTypeResult" class="vue-cell">
          <div class="vue-cell__bd vue-cell_primary" @click="goToMapResult(item.Name)">
              <p class="vue-cell__p">
              	<span>{{item.Name}}</span>
              </p>
          </div>
          <div>
          	<button class="vue-btn vue-btn_primary">指定下单</button>
          </div>
      </div>
      <div v-for="item in wholeWorkerResult" class="vue-cell">
          <div class="vue-cell__bd vue-cell_primary">
              <p class="vue-cell__p">
              	<span>{{item.Name}}</span>
              	<span class="vue-cell__label">
              		<i></i>
              		<em>{{item.Age}}</em>
              	</span>
              </p>
              <p class="vue-cell__p">
              	<span v-for="i in item.ServiceTypes" class="vue-cell__span mr10">{{i.Name}}</span>
              </p>
          </div>
          <div>
          	<button class="vue-btn vue-btn_primary">指定下单</button>
          </div>
      </div>
      <div v-for="item in wholeBossResult" class="vue-cell">
          <div class="weui-cell__bd vue-cell_primary">
              <p class="vue-cell__p">
              	<span>{{item.Name}}</span>
              	<span class="vue-cell__label">
              		<em>全城商户</em>
              	</span>
              </p>
              <p class="vue-cell__p">
              	<span v-for="i in item.ServiceTypes" class="vue-cell__span mr10">{{i.Name}}</span>
              </p>
          </div>
          <div>
          	<button class="vue-btn vue-btn_primary">指定下单</button>
          </div>
      </div>
      <div v-for="item in workerResult" class="vue-cell">
          <div class="vue-cell__bd vue-cell_primary">
              <p class="vue-cell__p">
              	<span>{{item.Name}}</span>
              	<span class="vue-cell__label">
              		<i></i>
              		<em>{{item.Age}}</em>
              	</span>
              </p>
              <p class="vue-cell__p">
              	<span v-for="i in item.ServiceTypes" class="vue-cell__span mr10">{{i.Name}}</span>
              </p>
          </div>
          <div>
          	<button class="vue-btn vue-btn_primary">指定下单</button>
          </div>
      </div>
      <div v-for="item in bossResult" class="vue-cell">
          <div class="weui-cell__bd vue-cell_primary">
              <p class="vue-cell__p">
              	<span>{{item.Name}}</span>
              </p>
              <p class="vue-cell__p">
              	<span v-for="i in item.ServiceTypes" class="vue-cell__span mr10">{{i.Name}}</span>
              </p>
          </div>
          <div>
          	<button class="vue-btn vue-btn_primary">指定下单</button>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
  name: "search",
  data() {
    return {
      localSearchInput: "",
      workerResult: [],
      bossResult: [],
      wholeWorkerResult: [],
      wholeBossResult: [],
      serviceTypeResult: [],
      isResult: [],
      history: [],
      hotTotals: []
    }
  },
  mounted: function() {
    // 初始搜索
    this.localSearchInput = this.mapSearchInput;

    // 加载 热门服务
    axios.post(API.GetHotServices, qs.stringify({
        "Latitude": this.mapPoint.lat,
        "Longitude": this.mapPoint.lng,
        "Token": ""
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        console.log(res.data);
        if (res.data.Body) {
          this.hotTotals = res.data.Body;
        }
      })
      // 加载 历史搜索
    if (localStorage.getItem("SearchHistory")) {
      this.history = JSON.parse(localStorage.getItem("SearchHistory"));
    }
  },
  methods: {
    goToMapResult(name) {
      this.$store.dispatch('searchMap', {
        txt: name
      });
      this.$store.dispatch('searchInput', {
        txt: name
      })
      this.$router.push({
        path: '/menu/service'
      });
    },
    clearHistory() {
      if (localStorage.getItem("SearchHistory")) {
        this.history = [];
        localStorage.removeItem("SearchHistory");
      }
    },
    searchIcon(input) {
      this.localSearchInput = input;
    },
    searchClear() {
      this.localSearchInput = "";
      this.workerResult = [];
      this.bossResult = [];
      this.wholeWorkerResult = [];
      this.wholeBossResult = [];
      this.serviceTypeResult = [];
      this.isResult = [];
      this.$store.dispatch('searchInput', {
        txt: ""
      });
    },
    searchCancel(input) {
      // 记录历史搜索结果
      if (localStorage.getItem("SearchHistory")) {
        let searchHistory = JSON.parse(localStorage.getItem("SearchHistory"));
        if (searchHistory.every(function(i) {
            return i !== input;
          })) {
          searchHistory.push(input);
          localStorage.setItem("SearchHistory", JSON.stringify(searchHistory));
        };
      } else {
        let searchHistory = [];
        if (input !== '') {
          searchHistory.push(input);
        }
        localStorage.setItem("SearchHistory", JSON.stringify(searchHistory));
      }
      // 同步 searchInput 与 mapSearchInput 状态
      this.$store.dispatch('searchInput', {
        txt: input
      })
      this.$router.push({
        path: '/menu/service'
      })
    }
  },
  computed: mapState(['mapPoint', 'mapSearchInput']),
  watch: {
    localSearchInput() {
      this.isResult = [1];
      if (this.localSearchInput == '') {
        this.workerResult = [];
        this.bossResult = [];
        this.wholeWorkerResult = [];
        this.wholeBossResult = [];
        this.serviceTypeResult = [];
        this.isResult = [];
      } else {
        axios.post(API.IndexEx2, qs.stringify({
          "Latitude": this.mapPoint.lat,
          "Longitude": this.mapPoint.lng,
          "Type": "0",
          "QueryStr": this.localSearchInput,
          "QueryType": "0",
          "ServiceId": "",
          "Token": ""
        }), {
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          console.log(res.data);
          if (res.data.Body) {
            this.isResult = res.data.Body.Workers.concat(res.data.Body.Business, res.data.Body.WholeWorkers, res.data.Body.WholeBusiness, res.data.Body.ServiceTypes);
          }
          if (res.data.Body && res.data.Body.Workers.length > 0) {
            this.workerResult = res.data.Body.Workers;
          }
          if (res.data.Body && res.data.Body.Business.length > 0) {
            this.bossResult = res.data.Body.Business;
          }
          if (res.data.Body && res.data.Body.WholeWorkers.length > 0) {
            this.wholeWorkerResult = res.data.Body.WholeWorkers;
          }
          if (res.data.Body && res.data.Body.WholeBusiness.length > 0) {
            this.wholeBossResult = res.data.Body.WholeBusiness;
          }
          if (res.data.Body && res.data.Body.ServiceTypes.length > 0) {
            this.serviceTypeResult = res.data.Body.ServiceTypes;
          }
        })
      }
    }
  },
  directives: {
    focus: {
      // inserted:function(el){
      //  el.focus();
      // }
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
	position:fixed;
	top:0;
	width:100%;
	z-index:1;
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
	padding-left:12px;
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

.searchbar-result {
	position: relative;
	top:56px;
}

.vue-hots {
	position:relative;
	top:56px;
	width:90%;
	margin-left:auto;
	margin-right:auto;

	p {
		padding-top:20px;
	}

	span {
		color:#999;
		margin-right:10px;
	}

	img {
		width:22px;
		float:right;
	}
}

.vue-noresult {
	position:relative;
	width:70%;
	top:156px;
	margin-left:auto;
	margin-right:auto;
	text-align:center;
	color:#999;

	.vue-btn {
			margin-top:40px;
      width: 125px;
      line-height:40px;
      border-width: 0;
      outline: 0;
      -webkit-appearance: none;
      &:focus {
          outline: 0;
      }
  }
  .vue-btn_inline,&.vue-btn_mini {
      width: auto;
  }
  .vue-btn_plain-primary,&.vue-btn_plain-default{
      border-width: 1px;
      background-color: transparent;
  }
}

.mr10 {
	margin-right:10px;
}
.mt56 {
	margin-top:56px;
}
</style>

