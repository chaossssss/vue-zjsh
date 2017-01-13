<template>
  <div>
    <div class="order-detail">
      <div id="fade" class="black_overlay"></div>
      <div id="MyDiv" class="white_content">
      <div class="swiper-container">
            <div class="swiper-wrapper">
            </div>
        </div>
      </div>
    <!--   <div id="orderStatus" class="order-status">
        <p id="status" class="status"></p>
        <p id="explanation" class="explanation"></p>
      </div>
      <div class="process">
        <div id="proFirst" class="process-status">
          <div id="roundFirst" class="round"></div>
          <span id="tabFirst"></span>
        </div>
        <div id="proSecond" class="process-status">
          <div id="roundSecond" class="round"></div>
          <span id="tabSecond"></span>
        </div>
        <div id="proThird" class="process-status">
          <div id="roundThird" class="round"></div>
          <span id="tabThird"></span>
        </div>
        <div id="proFourth" class="process-status">
          <div id="roundFourth" class="round"></div>
          <span id="tabFourth"></span>
        </div>
      </div> -->
      <div id="statusBg" class="status-bg"></div>
      <div class="bd">
        <div class="weui-cells zj-cell-border">
          <div id="zjWorker" class="weui-cell zj-worker">
            <div class="weui-cell__bd weui-cell__primary">
              <a id="goToProvider" href="">
                <img id="providerHead" class="head-pic" src="" alt="">
                <p class="zj-fontsize worker-call"><span id="serviceProviderName"></span></p>
                <p class="zj-fontsize worker-call"><span id="workerGender"></span></p>
                <p id="toProviderDetail" class="zj-fontsize zj-arrow"></p>
              </a>
            </div>
            <a id="serviceProviderPhone" href="javascript:;"><div id="contactWorker" class="weui-cell__ft contact"></div></a>
          </div>
          <div class="weui-cell zj-cell-border">
            <div class="weui-cell__bd weui-cell__primary">
              <p class="zj-fontsize zj-cell-left">服务类型</p>
            </div>
            <div class="weui-cell__ft zj-fontsize zj-cell-right"><span id="serviceName"></span></div>
          </div>
          <div class="weui-cell zj-cell-border">
            <div class="weui-cell__bd weui-cell__primary">
              <p class="zj-fontsize zj-font">服务时间</p>
            </div>
            <div id="serviceTime" class="weui-cell__ft zj-fontsize zj-cell-right"><span id="serviceAt"></span></div>
          </div>
          <div id="zjRemarks" class="weui-cell zj-mark zj-cell-border">
            <div class="weui-cell__bd weui-cell__primary">
              <p class="zj-fontsize">备注</p>
            </div>
            <div id="addRemark" class="weui-cell__ft zj-remark zj-fontsize" style="display:none">
              </div>
          </div>
            <ul id="remarkLists" class="remark">
            </ul>
          <div id="pictureLine" class="weui-cells weui-cells_form zj-cells zj-cell-border">
            <div class="weui-cell zj-worker-pic">
              <div class="weui-cell__bd weui-cell__primary">
                <div class="weui-uploader">
                  <div class="weui-uploader_bd">
                    <ul id="showPics" class="weui-uploader_files">
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="priceBox" class="weui-media-box weui-media-box_text zj-pay zj-cell-border">
            <div id="servicePrice" class="weui-media-box__desc zj-fontsize spacing">服务价格
            <p id="ifNegotiable" class="money">
              <!-- <span id="negotiable">面议</span>  -->       
              <span id="unitPrice">
                <span id="single"></span>
                <span id="unit"></span>
              </span>
              <span id="multiple" class="multiple">
                <span id="quantity"></span>
              </span>
            </p>
            </div>
            <div id="orderPrice" class="weui-media-box__desc zj-fontsize spacing">订单总价
            <p id="total" class="money"><span id="price"></span></p></div>
            <div id="specialPrice" class="weui-media-box__desc zj-fontsize spacing">
            <span id="specialTitle">活动</span>
            <p id="special" class="money"><span id="hourly"></span></p></div>
    <!--         <div id="activityName" class="weui-media-box__desc zj-fontsize spacing">优惠活动名称
            <p id="activityRight" class="money"><span id="activityPrice"></span></p></div> -->
            <div id="waitOrder" class="weui-media-box__desc zj-fontsize spacing">
            待支付
            <p id="wait" class="money"><span id="toBePaid"></span></p></div>
            <div id="orderDiscount" class="weui-media-box__desc zj-fontsize spacing">红包
            <p class="money"><span id="discountInfo"></span></p></div>
            <div id="orderActual" class="weui-media-box__desc zj-fontsize spacing">实付款
            <p class="money actual"><span id="actualMoney"></span></p></div>
          </div>
          <div id="filling1" class="filling"></div>
          <div id="refundRecord" class="weui-panel weui-panel_access zj-panel zj-cell-border">
            <div class="weui-panel__hd zj-titlewords zj-cell-border">退款记录</div>
            <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_text">
                <div class="weui-media-box__desc zj-fontsize">
                  <p class="refund"><span id="refundAt"></span></p>
                  <p class="refund refund-money"><span id="actualRefundMoney"></span></p>
                  <p class="refund refund-complete"><span id="refundStatus"></span></p>
                </div>
                <div class="weui-media-box__desc zj-fontsize refund-line">
                  <p class="clear refund"></p>
                  <p id="refundDisc" class="refund refund-disc">红包扣除￥<span id="refundDiscount"></span></p>
                  <!-- <p id="refundLost" class="refund refund-lost">误工费￥<span id="lostIncome"></span>，</p> -->
                  <p id="refundSum" class="refund refund-sum">应退<span id="refundAmount"></span>，</p>
                </div>
              </div>
            </div>
          </div>
          <div id="filling2" class="filling"></div>
          <div class="weui-panel weui-panel_access zj-panel zj-cell-border zj-order">
            <div class="weui-panel__hd zj-titlewords zj-cell-border">订单信息</div>
            <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_text">
                <img id="refreshBtn" class="refresh-btn" src="../../static/images/refresh.png">
                <img id="backhomeBtn" class="backhome-btn" src="../../static/images/backhome.png">
                <p class="weui-media-box__desc contacts zj-fontsize">
                  联系人：<span id="clientName"></span>
                  <span id="clientGender"></span>
                </p>
                <p class="weui-media-box__desc contacts zj-fontsize">
                  服务电话：<span id="clinetPhone"></span>
                </p>
                <p class="weui-media-box__desc zj-fontsize">
                  服务地址：<span id="serviceAddress"></span>
                </p>
              </div>
              <div class="weui-media-box weui-media-box_text zj-cell-border">
                <p class="weui-media-box__desc contacts zj-fontsize">
                  订单号：<span id="orderCode"></span>
                </p>
                <p id="orderTime" class="weui-media-box__desc zj-fontsize order-time">
                  下单时间：<span id="createTime"></span>
                </p>
                <p id="acceptTime" class="weui-media-box__desc zj-fontsize order-time">
                  接单时间：<span id="acceptAt"></span>
                </p>
                <p id="cancelTime" class="weui-media-box__desc zj-fontsize order-time">
                  取消时间：<span id="cancelAt"></span>
                </p>
                <p id="payTime" class="weui-media-box__desc zj-fontsize order-time">
                  付款时间：<span id="payOffTime"></span>
                </p>
                <p id="finishTime" class="weui-media-box__desc zj-fontsize">
                  完成时间：<span id="finishAt"></span>
                </p>
              </div>
            </div>
          </div>
      </div>
      <div id="filling3" class="fill-content"></div>
      <div id="optionFooter" class="delete-order">
        <div id="btnRight" class="right-btnfr"></div>
        <div id="btnLeft" class="left-btnfr"></div>
      </div>    
    </div>
    <div class="weui_dialog_confirm" id="workerPhone" style="display:none;">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">联系师傅</strong></div>
        <div class="weui_dialog_bd zj-align  zj-confirm-word">暂时不接受电话</div>
        <div class="weui_dialog_ft">
          <a href="javascript:;" id="cancelBtn" class="weui_btn_dialog default">取消</a>
          <a href="javascript:;" class="weui_btn_dialog primary bluecol">确定</a>
        </div>
      </div>
    </div>
    <!--要打电话-->
    <div class="weui_dialog_confirm" id="callWorkerPhone" style="display:none;">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">联系师傅</strong></div>
        <div id="workerPhoneNum" class="weui_dialog_bd zj-align zj-confirm-word">电话</div>
        <div class="weui_dialog_ft">
          <a href="javascript:;" id="cancelCallBtn" class="weui_btn_dialog default">取消</a>
          <a href="javascript:;" id="callWorker" class="weui_btn_dialog primary bluecol">呼叫</a>
        </div>
      </div>
    </div>
    <!--备注-->
    <div class="weui_dialog_confirm" id="userMemo" style="display:none">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">补充备注</strong></div>
        <div class="weui_dialog_bd"><input id="memoText" class="memo-text" typ="text"/></div>
        <div class="weui_dialog_ft">
          <a href="javascript:;" id="cancelBtn" class="weui_btn_dialog default">取消</a>
          <a href="javascript:;" id="confirmBtn" class="weui_btn_dialog primary">确定</a>
        </div>
      </div>
    </div>
    <!--删除订单-->
    <div class="weui_dialog_confirm" id="deleteOrder" style="display:none">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">删除订单</strong></div>
        <div class="weui_dialog_bd zj-align zj-confirm-word">确定删除订单吗？删除后不可恢复哦</div>
        <div class="weui_dialog_ft">
          <a href="javascript:;" id="deleteCancel" class="weui_btn_dialog default">取消</a>
          <a href="javascript:;" id="deleteBtn" class="weui_btn_dialog primary bluecol">删除</a>
        </div>
      </div>
    </div>
    <!--客户成功下单，取消订单-->
    <div class="weui_dialog_confirm" id="cancelOrder1" style="display:none">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">取消订单</strong></div>
        <div class="weui_dialog_bd zj-align zj-confirm-word">确定取消订单吗？</div>
        <div class="weui_dialog_ft">
          <a href="javascript:;" id="cancelBtn1" class="weui_btn_dialog default">先不取消</a>
          <a href="javascript:;" id="cancelOrderBtn" class="weui_btn_dialog primary zj-bluecol">确定</a>
        </div>
      </div>
    </div>
    <!--提示黑框-->
    <!-- <div id="prompt" class="zj-prompt">
      <p class="prompt-news">抱歉，请耐心等待工人接单</p>
    </div> -->
    <!--支付弹窗-->
    <div class="weui_dialog_alert" id="pay-box" style="display:none">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title"></strong></div>
        <div class="weui_dialog_bd zj-alert-word">您已完成下单，请等待工人接单后完成支付，预计时间0.5-1小时。详情请查看【首页-个人中心-我的订单】</div>
        <div class="weui_dialog_ft">
            <a id="know" href="javascript:;" class="weui_btn_dialog primary zj-bluecol">我知道了</a>
        </div>
      </div>
    </div>
    <!--客户已付款，工人还未确认取消订单-->
    <div class="weui_dialog_confirm" id="cancelOrder2" style="display:none">
      <div class="weui_mask"></div>
      <div class="weui_dialog">
        <div class="weui_dialog_hd">工人/商户已接单，若需取消，请联系客服</div>
        <div class="weui_dialog_bd zj-align zj-confirm-word">客服电话：4008-262-056</div>
        <div class="weui_dialog_ft">
          <a href="javascript:;" id="cancelBtn2" class="weui_btn_dialog default">先不取消</a>
          <a href="tel:4008-262-056;" id="contactWorkerBtn" class="weui_btn_dialog primary zj-bluecol">联系客服</a>
        </div>
      </div>
    </div>
      
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
*{ margin:0; padding:0; list-style:none;}
body{ font-size:14px; background: #f8f8f8;}
div,li,a{ -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }
.clear{ clear: both; height: 0; line-height: 0; font-size: 0; }
/*---*/
.order-detail{ width: 100%; margin: 0 auto; background: #f8f8f8; }
.order-detail .order-status{ height: 148px; width: 100%; text-align: center; background: #eefaff no-repeat center 10px; background-size: 250px 50%; }
.order-detail .order-status .status{ color: #3fbef9; font-size: 18px; padding-top: 86px; }
.order-detail .process{ width: 100%; height: 42.5px; display: flex; display: -webkit-flex; display: box; display: -webkit-box; display: -moz-box; display: -ms-flexbox; background: #fff; border-top: 1px solid #3fbef9; margin-bottom: 13px; border-bottom: 1px #ccc solid; }
.order-detail .process:after{ border-bottom: 1px solid #ccc; transform: scaleY(.5); }
.order-detail .process .process-status{ flex: 1; -webkit-box-flex: 1; -webkit-flex: 1; -moz-box-flex: 1; -ms-flex: 1; text-align: center; line-height: 20px; font-size: 14px; }
.order-detail .explanation{ color: #666; font-size: 12px; margin: 0 auto; width: 200px; }

/*--新版订单状态--*/
.status-bg{ width: 100%; height: 174px; background-size: 100% auto; background-repeat: no-repeat; margin-bottom: 13px; }
/*--新版订单状态--*/

.order-detail .weui-cell .zj-remark{ height: 30px; width: 72px; padding-left: 5px; background: url(../../static/images/addRemark.png) no-repeat; background-size: 100% auto; }
.order-detail .weui-cells .remark{ margin-left: 10px; margin-bottom: 12px; }
.order-detail .weui-cells .remark li{ font-size: 13px; color: #999; word-wrap: break-word; padding-right: 5px; }
.order-detail .weui-cell .zj-show-pic{ width: 74px; height: 74px; border-radius: 6.5px; margin-right: 6px; margin-left: 12px; margin-top: 10.5px; margin-bottom: 10.5px; background: center center no-repeat; background-size: cover; float: left; }
/*.order-detail .weui-cell .zj-show-lastpic{ width: 74px; height: 74px; border-radius: 6.5px; margin-top: 10.5px; margin-bottom: 10.5px; background: center center no-repeat; background-size: cover; float: left; }*/
.order-detail .zj-mark{ padding-bottom: 8px; }
.order-detail .remark-box{ border: 0; outline: 0; }
.order-detail #priceBox{ padding-bottom: 3px; }
.order-detail .zj-cell-border:before{ border-top: 1px solid #ccc; transform: scaleY(.5); }
.order-detail .zj-cell-border:after{ border-bottom: 1px solid #ccc; transform: scaleY(.5); }
.order-detail .zj-cells:before{ left: 10px; }
.order-detail .zj-cells:after{ border-bottom: 0; }
.order-detail .filling{ height: 12.5px; width: 100%; background: #f8f8f8;}
.order-detail .zj-panel{ margin-top: 0px; font-size: 13px; }
.order-detail .zj-titlewords{ font-size: 15px; color: #333; }
.order-detail .zj-fontsize{ font-size: 14px; }
.order-detail .zj-worker-pic{ padding: 10px 0px 13px 0px; }
.order-detail .fill-content{ width: 100%; height: 59px; background: #f8f8f8; }
.order-detail .head-pic{ width: 28px; height: 28px; border-radius: 50%; margin-top: 1.5px; }
.order-detail .worker-call{ display: inline-block; position: relative; top: -9px; left: 5px; color: #333; }
.order-detail .zj-arrow{ background: url(../../static/images/arrow.png) no-repeat; height: 18px; width: 11px; display: inline-block; position: relative; top: -5px; left: 17px; }
.order-detail .zj-cell-left{ color: #333; }
.order-detail .zj-cell-right{ color: #666; }
.order-detail .contact{ height: 30px; width: 72px; padding-left: 5px; background: url(../../static/images/newphone.png) no-repeat; background-size: 100% auto; }
.order-detail .zj-worker{ padding-bottom: 4px; padding-top: 9px; }
.order-detail .money{ float: right; color: #666; }
.order-detail .multiple{ font-size: 14px; color: #999; margin-left: 26px; }
.order-detail .actual{ color: #ff5000; font-size: 18px; }
.order-detail .spacing{ margin-bottom: 12px; color: #333; }
/*.order-detail .zj-pay:before{ border-top: 0; }*/
.order-detail .zj-pay{ padding-bottom: 10px; position: relative; }
.order-detail .zj-pay:before{ left: 10px; }
.order-detail .zj-pay:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #cccccc;
  color: #cccccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.order-detail .refund{ display: inline-block; }
.order-detail .refund-complete{ color: #ff5000; float: right; }
.order-detail .refund-money{ margin-left: 60px; color: #666; float: right; }
.order-detail .refund-sum{ float: right; }
.order-detail .refund-lost{ float: right; }
.order-detail .refund-disc{ float: right; }
.order-detail .refund-line{ margin-top: 12px; }
.order-detail .refund-list{ float: right; }
.order-detail .contacts{ margin-bottom: 11px; }
.order-detail .order-time{ margin-bottom: 11px; }

/*--弹窗输入样式--*/
.order-detail .memo-text{ width: 100%; outline: none; }

/*--正在进行的文字样式--*/
.processing{ color: #3fbef9; }

/*--订单已取消--*/
.round{ width: 11px; height: 11px; border-radius: 50%; position: relative; top: -6px; left: 50%; }
.round-complete{ background: #3fbef9; }
.round-processing{ background: #3fbef9; width: 7px; height: 7px; border: 2px solid #88d7fc; }
.round-undone{ background: #fff; width: 9px; height: 9px; border: 1px solid #88d7fc; }

/*--最下面按钮状态--*/
.order-detail .delete-order{ width: 100%; height: 48.5px; background: #fff; margin-top: 8.5px; position: fixed; bottom: 0px; }
.order-detail .delete-order:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #aaaaaa;
  color: #aaaaaa;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.order-detail .delete-btn{ color: #333; border: 1px #999 solid; font-size: 13px; border-radius: 3px; }
.order-detail .pay-btn{ border: 1px #51d862 solid; background: #51d862; color: #fff; font-size: 13px; border-radius: 3px; }
.order-detail .confirm-btn{ border: 1px #3fbef9 solid; color: #3fbef9; font-size: 13px; border-radius: 3px; }
.order-detail .left-btn{ width: 85px; height: 29px; line-height: 30px; text-align: center; display: inline-block; position: relative; left: 174px; top: 8.5px; }
.order-detail .right-btn{ width: 85px; height: 29px; line-height: 30px; text-align: center; display: inline-block; position: relative; left: 277px; top: 8.5px; }
.order-detail .left-btnfr{ width: 85px; height: 29px; line-height: 30px; text-align: center; float: right; margin-top: 8.5px; margin-right: 14px; }
.order-detail .right-btnfr{ width: 85px; height: 29px; line-height: 30px; text-align: center; float: right; margin-top: 8.5px; margin-right: 10px; }

/*--弹出框样式--*/
.order-detail .weui_dialog_confirm .zj-align{ text-align: center; }
.order-detail .zj-bluecol{ color: #0687ff; }
.weui_dialog_alert .zj-alert-word{ font-size: 14px; color: #333; }
.weui_dialog_confirm .zj-confirm-word{ font-size: 14px; color: #333; }

/*--待接单，点击支付--*/
.zj-prompt{ width: 180px; height: 54px; color: white; opacity: 0; background: rgba(0,0,0,0.5); text-align: center; border-radius: 9px; font-size: 15px; position: absolute; top: 348px; left: 50%; margin-left: -90px; }
.zj-prompt .prompt-news{ margin: 10px 13px 0; line-height: 1.2; }
.prompt-animation
{ 
  animation: prompts 3s;
  -moz-animation: prompts 3s;
  -webkit-animation: prompts 3s;
  -o-animation: prompts 3s;
}
@keyframes prompts
{
  0% { opacity: 1; }
  100% { opacity: 0; }
}
@-moz-keyframes prompts
{
  0% { opacity: 1; }
  100% { opacity: 0; }
}
@-webkit-keyframes prompts
{
  0% { opacity: 1; }
  100% { opacity: 0; }
}
@-o-keyframes prompts
{
  0% { opacity: 1; }
  100% { opacity: 0; }
}
.swiper-container {
        width: 100%;
        height: 100%;
    }
.swiper-slide {
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.black_overlay{
 display: none;
 position: absolute;
 top: 0%;
 left: 0%;
 width: 100%;
 height: 100%;
 background-color: black;
 z-index:1001;
 -moz-opacity: 0.6;
 opacity:.60;
 filter: alpha(opacity=60);
}
.white_content {
 display: none;
 position: absolute;
 top: 15%;
 left: 0;
 width: 100%;
 z-index:1002;
 overflow: auto;
}

/*--新增加的按钮--*/
.refresh-btn{
  position: fixed;
  bottom: 23%;
  right: 15px;
  width: 40px;
  height: 40px;
  z-index: 1000;
}
.backhome-btn{
  position: fixed;
  bottom: 13%;
  right: 15px;
  width: 40px;
  height: 40px;
  z-index:1000;
}
</style>