<template>
	<div style="background:#fbfbfb;width:100%;height:100%;position:absolute;">
    <div style="color:#666;font-size:14px;margin:20px 0 0 12px;">填写邀请码，获得<span>XX</span>优惠</div>
    <div class="weui-cells mt0" style="margin-top:12px;">
      <div class="weui-cell ptb5 plr10">
        <div class="weui-cell__hd">
          <p>邀请码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input ml10 code" placeholder="填写邀请码" type="text" maxlength="11"></div>
        <div class="weui-cell__ft">
          <a class="weui-btn zj-btn confirm" href="javascript:;">确定</a></div>
      </div>
    </div>
    <div class="zj-cells mt32 ptb6 t-myword">
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__hd">
          <img src="../../static/images/Invitation_code_ticket.png" alt="" style="width:44px;margin-right:10px;display:block"></div>
        <div class="weui-cell__bd">
          <p class="f18">想要获得更多优惠吗？</p>
          <p class="f16 pblue">邀请您的好友加入助家生活</p></div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
    <div class="js_dialog" id="iosDialog2" style="opacity: 1;display:none;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd msginfo"></div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn pblue close">知道了</a></div>
      </div>
    </div>
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;display:none;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">请填写正确的邀请码！</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn pblue h_close">知道了</a></div>
      </div>
    </div>
	</div>
</template>

<script>

</script>

<style scoped>
.webkit_box{display: -webkit-flex;display: -moz-flex; display: flex; -webkit-box-orient: horizontal; }
.flex1 {-webkit-flex-grow: 1;-moz-flex-grow: 1; flex-grow: 1;}
.flex2 {-webkit-flex-grow: 2;-moz-flex-grow: 2; flex-grow: 2;}
.flex3 {-webkit-flex-grow: 3;-moz-flex-grow: 3; flex-grow: 3;}
.flexc {align-items:center;}
/*文本 左 中 右*/
.tl {
  text-align: left;
}
.tc {
  text-align: center;
}
.tr {
  text-align: right;
}
/*外边框*/
.ml10 {
  margin-left: 10px;
}
.mt0 {
  margin-top: 0;
}
.mt10 {
  margin-top: 10px;
}
.mtb10 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.mt16 {
  margin-top: 16px;
}
.mt32 {
  margin-top: 32px;
}
.mt54 {
  margin-top: 54px;
}
/*字体*/
.f12 {
  font-size: 12px;
}
.f14 {
  font-size: 14px;
}
.f18 {
  font-size: 18px;
}
.f20 {
  font-size: 20px;
}
.f24 {
  font-size: 24px;
}
.f36 {
  font-size: 36px;
}
/*内边距*/
.ptb5 {
  padding-top: 5px;
  padding-bottom: 5px;
}
.ptb6 {
  padding-top: 6px;
  padding-bottom: 6px;
}
.plr10 {
  padding-left: 10px;
  padding-right: 10px;
}
.p10 {
  padding: 10px;
}
.p15 {
  padding: 15px;
}
.pb10 {
  padding-bottom: 10px;
}
.plr15 {
  padding-left: 15px;
  padding-right: 15px;
}
/*盒模型*/
.iebox {
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  box-sizing: border-box;
}
/*高*/
.h48 {
  height: 48px;
}
.h66 {
  height: 66px;
}
.h68 {
  height: 68px;
}
/*行高*/
.lh40 {
  line-height: 40px;
}
.lh48 {
  line-height: 48px;
}
/*色调*/
.pblue {
  color: #4a90e2;
}
.porange {
  color: #ffb85c;
}
.fc3 {
  color: #333;
}
.fc6 {
  color: #666;
}
.zj-btn {
  background-color: #4a90e2;
  width: 70px;
  line-height: 2;
}
.zj-cells {
  position: relative;
  overflow: hidden;
  font-size: 17px;
  line-height: 1.41176471;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  color: #666;
} 
.zj-cells:after {
  content: "";
  position: absolute;
  top:0;
  left: 0;
  border:1px solid rgba(0,0,0,0.2);
  width: 200%;
  height: 200%;
  box-sizing: border-box;
  border-radius: 10px;
  transform: scale(0.5);
  -webkit-transform:scale(0.5);
  transform-origin:0 0;
  -webkit-tranform-origin:0 0; 
}
.zj-cell {
  /*padding:10px 15px;*/
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display:flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
  align-items: center;
}
.zj-cell:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height:1px;
  border-top: 1px solid #d9d9d9;
  color: #d9d9d9;
  width: 100%;
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
}
.zj-cell:last-child:after {
  display: none;
}
.zj-cell_left {
  position: relative;
  text-align: center;
}
.zj-cell_left:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  border-right: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin:0 0;
  transform-origin:0 0;
  -webkit-transform:scaleX(0.5);
  transform: scaleX(0.5);
}
.zj-cell_right {
  text-align: center;
}
.weui-cell_primary {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
          align-items: flex-start;
}
.weui-cell__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
}
.weui-cell__ft {
  text-align: right;
  color: #999999;
}
</style>