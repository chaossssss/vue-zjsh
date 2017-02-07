<template>
<div>
  <form name="form" novalidate="novalidate" style="overflow-x:hidden;" enctype="multipart/form-data">

  <!-- 服务类型 begin-->
  <div class="weui_cells weui_cells_access">
    <!-- 服务类型 begin -->
    <div class="weui_cells weui_cells_access" style="margin:15px 0 10px 0;">
      <a href="javascript:;" class="weui_cell" style="padding:5px 10px 5px 0;" >
        <div class="weui_cell_hd"> 
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p class="service_bg">服务类型</p>
        </div>
        <div class="weui_cell_ft">
          <span></span>
        </div>
        <div class="weui_cell_ft">
          <span></span>
          <span></span>
          元起
        </div>  
        <div class="weui_cell_ft"></div>
      </a>
    </div>
    <div class="weui_cell clean_border" style="padding:0 10px 10px;">
      <div class="weui_cell_bd weui_cell_primary">
        <p></p>
      </div>
      <div class="zj_cell_ft">
        <span style="font-size:15px;">
        </span>
      </div>
    </div>
  </div>
  <!-- 服务类型 end-->
  <!-- 服务价格&服务数量&服务时间&服务地址 begin-->
    <div class="weui_cells weui_cells_access">
    <a href="javascript:;" class="weui_cell weui_cell_select" style="padding:5px 0 5px 10px;">
      <div class="weui_cell_hd">
        <img src="/images/quick-order/new-price.png" alt="" style="width:20px;margin-right:10px;display:block">
      </div>
      <div class="weui_cell_bd">
        <p>服务价格</p>
      </div>
      <div class="weui_cell_primary" style="text-align:right;">
        <select class=" weui_select rtl fc8" name="" id="">
          <option value="">--请选择服务价格--</option>
        </select>
      </div>
    </a>
    <div class="weui_cell no_access">
      <div class="weui_cell_hd">
        <img src="/images/quick-order/new-count.png" alt="" style="width:20px;margin-right:10px;display:block">
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>服务数量</p>
      </div>
      <div class="zj_cell_right">
        <div class="zj_select_plus">
          <i class="zj_select_sub"></i>
          <input class="zj_select_num" type="number" maxlength="4" ng-model="vm.Total">
          <i class="zj_select_add"></i>
        </div>
      </div>
      <div></div>
    </div>
    <a href="javascript:;" class="weui_cell">
      <div class="weui_cell_hd">
        <img src="/images/quick-order/new-time.png" alt="" style="width:20px;margin-right:10px;display:block">
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>服务时间</p>
      </div>
      <div class="weui_cell_ft pblue" >请选择服务时间</div>
      <div class="weui_cell_ft pblue">
        <span =></span>
      </div>
    </a>
    <!-- 服务地址 begin -->
    <a href="javascript:;" class="weui_cell">
      <div class="weui_cell_hd">
        <img src="/images/quick-order/new-local.png" alt="" style="width:20px;margin-right:10px;display:block">
      </div>
      <span>服务地址</span>
      <div class="weui_cell_bd weui_cell_primary">
        <p class="pblue" style="float:right;">请选择服务地址</p>
      </div>
      <div class="weui_cell_bd weui_cell_primary" >
        <div class="zj_cell_hd" style="text-align:right;">
          <span class="f12"></span>
          <span class="pl20"></span>
        </div>
        <div class="zj_cell_bd" style="text-align:right;">
          <p class="f14 fc8">
            <span ></span>
            <span ></span>
          </p>
        </div>
      </div>
      <div class="weui_cell_ft"></div>
    </a>
  </div>

  
</form>   	
</div>
</template>

<script>
export default {
	name:"quick_order"
}
</script>
<style scoped> 
/*基础样式*/
a,img,button,input,textarea,ul,li,div{-webkit-tap-highlight-color:rgba(255,255,255,0);}
body {
    background-color: #fbfbfb;
}
ul,li { 
    margin:0;
    padding: 0;
    list-style: none;
}
/*配色方案*/
.pblue {
    color: #27b8f3; 
}
.pgreen {
    color:#04BE02;
}
.pred {
    color: #f43530;
}
.sblue {
    color: #3fbef9;
}
/*活动配色 promotion*/
.p-orange {
    color: #ff5000;
}

.f20 {
    font-size: 20px;
}
.pb5 {
    padding-bottom: 5px;
}
.pl5 {
    padding-left: 5px;
}
.pl10 {
    padding-left: 10px;
}
.pl20 {
    padding-left: 20px;
}
.mb15 {
    margin-bottom: 15px;
}
.mt10 {
    margin-top: 10px;
}
.mt20 {
    margin-top: 20px;
}
.f13 {
    font-size: 13px;
}
.f15 {
    font-size: 15px;
}
.f14 {
    font-size: 14px;
}
.lh24 {
    line-height: 24px;
}
.lh30 {
    line-height: 30px;
}
.bgf {
    background-color: #fff;
}
.mb49 {
    margin-bottom: 49px;
}
.webkit_box{
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex; 
    display: flex; 
    -webkit-box-orient: horizontal; 
    -webkit-box-align: center;
    -webkit-align-items: center;
          align-items: center;
}
.flex1 {-webkit-flex-grow: 1;-moz-flex-grow: 1; flex-grow: 1;}
.flex2 {-webkit-flex-grow: 2;-moz-flex-grow: 2; flex-grow: 2;}
.flex3 {-webkit-flex-grow: 3;-moz-flex-grow: 3; flex-grow: 3;}
.flexc {align-items:center;}
.flexs {align-self: flex-start;}
.fcb2 {
    color: #b2b2b2;
}
.fc8 {
    color: #888;
}
.w30 {
    width: 30px;
}
.col100 {
    width: 100%;
}
.col90 {
    width: 90%;
}
.blred {
    border-left:3px solid rgb(233,75,20);
}
.blgreen {
    border-left:3px solid rgb(17,184,123);
}
.blpurple {
    border-left: 3px solid rgb(149,90,232);
}
.blorange {
    border-left: 3px solid rgb(253,121,42);
}
.blpink {
    border-left: 3px solid rgb(248,43,75);
}
.rtl {
    direction: rtl;
}
/*Location*/
/*块居中 block center*/
.bc{margin-left: auto;margin-right: auto;}
.container {
    margin-left: auto;
    margin-right: auto;
}
.tr {
    text-align: right;
}
.h20 {
    height: 20px;
}
.h40 {
    height: 40px;
}
.h50 {
    height: 50px;
}
.h30 {
    height: 30px;
}
.lh30 {
    line-height: 30px;
}
.pb2 {
    padding-bottom: 2px;
}
.ptb15 {
    padding:15px 0;     
}
.mr20 {
    margin-right: 20px;
}
.hide {
    opacity: 0;
}
.show {
    opacity: 1;
}
.disnone {
    display: none;
}
/*配色*/
.sblue {
    color: #3fbef9;
}

/*自定义样式*/
/*.weui_cells.zj_local_image {
    border-bottom: 1px solid transparent;
    border-image: url("../../images/quick-order/local-border.png");
}*/
.zj_cell_right {
    color: #888;
    -webkit-box-flex:1;
    -webkit-flex:1;
    flex: 1;
    text-align: right;
    align-self: center;
}
.zj_foot {
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
}
.zj_foot:before {
    content: "";
    width: 100%;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform-origin:0 0;
    transform-origin: 0 0;
    -webkit-transform:scaleY(0.5);
    transform: scaleY(0.5);
}
.zj_foot_hd {
    -webkit-box-flex:1;
    flex: 1;
    padding: 10px;
}
.zj_foot_bd {
    -webkit-box-flex:1;
    flex: 2;
    color: #ef4f4f;
    font-size: 20px;
}
.zj_foot_ft {
    -webkit-box-flex:1;
    flex: 1;
    padding: 12px 10px;
    text-align: center;
    color: #fff;
    /*background-color: #04be02;*/
    background-color: #27b8f3;
}
.zj_cell_select {
    -webkit-appearance:none;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
    border:0;
    outline:0;
    background-color: transparent;
    font-size: 17px;
    /*width: 100%;*/
    line-height: 1em;
    text-align: right;
}
.zj_select_plus {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex; 
    display: flex; 
    justify-content: flex-end;
    align-items: center;
    padding-right:6px; 
}
.zj_select_plus .zj_select_num {
    -webkit-appearance:none;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
    outline: 0;
    border:0;
    font-size: 17px;
    width: 50px;
    text-align: center;
}
.zj_select_plus .zj_select_sub {
    display: block;
    position: relative;
    width: 22px;
    height: 22px;
    border:1px solid #D9D9D9;
    border-radius: 11px;
}
.zj_select_plus .zj_select_add {
    display: block;
    position: relative;
    width: 22px;
    height: 22px;
    border:1px solid #D9D9D9;
    border-radius: 11px;
}
.zj_select_plus .zj_select_sub:after {
    width: 10px;
    height: 2px;
    content:"";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #D9D9D9;
}
.zj_select_plus .zj_select_add:before {
    width: 2px;
    height: 10px;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    /*background-color: #04BE02;*/
    background-color: #27b8f3;
}
.zj_select_plus .zj_select_add:after {
    width: 10px;
    height: 2px;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    /*background-color: #04BE02;*/
    background-color: #27b8f3;
}
/*日期样式*/
.zj_date_picker {
    display: block;
}
.zj_mask_transition  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}
.zj_fade_toggle {
    background-color: rgba(0,0,0,0.6);
}
.zj_actionsheet {
    position: fixed;
    left: 0;
    bottom: 0;
    -webkit-transform:translateY(100%);
    transform: translateY(100%);
    -webkit-backface-visibility:hidden;
    backface-visibility: hidden;
    z-index: 5000;
    width: 100%;
    background-color: #efeff4;
    -webkit-transition:-webkit-transform 0.3s;
    transition:-webkit-transform 0.3s;
    transition:transform 0.3s;
    transition:transform 0.3s,-webkit-transform 0.3s;
}
.zj_actionsheet_toggle {
    -webkit-transform:translate(0);
    transform: translate(0);
}
.zj_mask_dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5500;
    background-color: rgba(0,0,0,0.4);
}
.zj_dialog {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6000;
    width: 100%;
    background-color: #efeff4;
}
.zj_dialog .zj_service_dialog {
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 65%;
    z-index:7000;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
}
.zj_dialog .zj_service_dialog .bd {
    position: relative;
    padding: 12px 0;
}
.zj_dialog .zj_service_dialog .bd:after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    border-bottom: 1px solid #d9d9d9;
    width: 100%;
    height: 1px;
    -webkit-transform:scaleY(-0.5);
    transform: scaleY(-0.5);
    -webkit-transform-origin:0 0;
    transform-origin: 0 0;
}
.zj_dialog .zj_service_dialog .bd:active {
    background-color: #ececec;
}
.zj_date_picker .zj_navbar {
    display: -webkit-flex;
    display: -webkit-box;
    display: -moz-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.zj_date_picker .zj_flex_1 {
    -webkit-box-flex:1;
    -webkit-flex:1;
    flex: 1;
}
.zj_tab_bd {
    padding: 0 30px;
}
.zj_navbar_item {
    height: 275px;
    overflow-y: auto;
    background-color: #ececec;
}
.zj_navbar_item li{
    position: relative;
    padding: 15px 0;
}
.zj_navbar_item:first-child:before {
    display: none;
}
.zj_navbar_item li.in_active {
    background-color: #fff;
}
.zj_navbar_item li:not(.in_active):after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    border-right: 1px solid #d9d9d9;
    -webkit-transform-origin:100% 0;
    transform-origin:100% 0;
    -webkit-transform:scaleX(0.5);
    transform: scaleX(0.5);
}
.zj_navbar_item li:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height:1px;
    border-bottom:1px solid #d9d9d9;
    -webkit-transform-origin:0 100%;
    transform-origin: 0 100%;
    -webkit-transform:scaleY(0.5);
    transform: scaleY(0.5);
}
.zj_tab_bd {
    height: 275px;
    overflow-y: auto;
    background-color: #fff;
}
/*.zj_tab_bd .disVacant {
    position: absolute;
    background-color: red;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index:7000;
}*/
.zj_tab_bd li {
    position: relative;
    padding: 15px 0;
}
.zj_tab_bd li:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform-origin:0 100%;
    transform-origin: 0 100%;
    -webkit-transform:scaleY(0.5);
    transform: scaleY(0.5);
}
.zj_tab_bd .zj_li .zj_icon{
    position: absolute;
    right: 0;
}
.zj_date_picker .zj_ft {
    position: relative;
    display: block;
    width: 100%;
    font-size: 18px;
    padding: 10px 0;
    color: #fff;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    overflow: hidden;
    /*background-color: #04be02;*/
    text-align: center;
    background-color: #27b8f3;
}
/*服务类型选择*/
.zj_cell_ft {
    color: #888;
}
.zj_service {
    font-size: 13px;
}
.zj_service .title {
    display: -webkit-box-flex;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
}
.zj_service .zj_cell_ft{
    position: relative;
    text-align: right;
    color: #27b8f3;
}
.zj_service .zj_cell_ft:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    margin-top: -8px;
    right: 10px;
    height: 8px;
    width: 8px;
    border-width: 0 2px 2px 0;
    border-style: solid;
    border-color: #27b8f3;
    transform: matrix(0.71,0.71,-0.71,0.71,0,0);
}
.zj_service .change.zj_cell_ft:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 10px;
    height: 8px;
    width: 8px;
    border-width: 2px 0 0 2px;
    border-style: solid;
    border-color: #27b8f3;
    transform: matrix(0.71,0.71,-0.71,0.71,0,0);
}
.zj_service .bd {
    overflow:hidden;
    text-align: center;
    clear: left;
    background-color: #fff;
}
.zj_service .cell {
    float: left;
    padding: 15px 0;
    width: 33%;
    position: relative;
    /*border-right:1px solid #d9d9d9;*/
}
.zj_service .cell:before {
    content: "";
    position: absolute;
    box-sizing: border-box;
    width: 200%;
    height: 1px;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform-origin:0 0;
    transform-origin: 0 0;
    -webkit-transform:scale(0.5);
    transform: scale(0.5);
}
.zj_service .cell:after {
    content: "";
    position: absolute;
    box-sizing: border-box;
    width: 1px;
    height: 200%;
    top: 0;
    left: 0;
    border-right: 1px solid #d9d9d9;
    -webkit-transform-origin:0 0;
    transform-origin: 0 0;
    -webkit-transform:scale(0.5);
    transform: scale(0.5);
}
.zj_service .cell:active {
    background-color: #ECECEC;
}
/*活动样式 promotion*/
.pro_box {
    display: inline-block;
    color: #fff;
    background-color: #f43530;
    font-size: 14px;
    line-height: 20px;
    padding:0 6px;
}
/*覆盖的样式*/
.weui_uploader_hd {
    padding: 0;
}
.service_bg {
  background: url(/images/quick-order/add-type.png) -6px 0;
  background-size: 128px 36px;
  width: 80px;
  height: 36px;
  color: #fff;
  line-height: 36px;
  padding-left: 42px;
}
.zj_border:before {
  top: 0;
  border-top: 1px solid #ccc;
  transform-origin: 0 0;
  transform: scaleY(.5);
}
.zj_border:after{
  bottom: 0;
  border-bottom: 1px solid #ccc;
  transform-origin: 0 100%;
  transform: scaleY(.5);
}
.clean_border:before {
  border: none;
}
.money {
  float: right;
}
.money_color {
  color: #ef6f21;
}
.pb11 {
  padding-bottom: 11px;
}


</style>