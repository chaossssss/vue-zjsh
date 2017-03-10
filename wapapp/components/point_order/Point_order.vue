<template>
<div style="position:relative;background-color: #fbfbfb;height:100%;">
  <form name="form" novalidate="novalidate" style="overflow-x:hidden;" enctype="multipart/form-data">
  <!-- 个人信息 -->
  <div class="weui-cells zj_border" style="margin-top:0;"> 
    <div @click="routerToAddr" class="weui-cell weui-cell_access">
      <div class="weui-cell__hd">
        <img src="../../static/images/pic-location.png" alt="" style="width:20px;margin-right:10px;display:block">
      </div>
      <span>服务地址</span>    
      <div class="weui-cell__bd weui-cell_primary" style="padding-left:10px;" v-show="addr">
        <div class="zj_cell_hd">
          <span class="f12">{{addr.Contact}}</span>
          <span class="pl10 f12" v-show="addr.Gender === '0'">男</span>
          <span class="pl10 f12" v-show="addr.Gender === '1'">女</span>
          <span class="pl10">{{addr.PhoneNumber}}</span>
        </div>
        <div class="zj_cell_bd">
          <p class="f14 fc8">
            <span>{{addr.Address1}}</span><br>
            <span>{{addr.Address2}}</span>
          </p>
        </div>
      </div>
      <div class="weui-cell__bd weui-cell_primary" v-show="JSON.stringify(addr) === '{}'">
        <p class="pblue" style="float:right;">请选择服务地址</p>
      </div>
      <div class="weui-cell__ft"></div>
    </div> 
    <div class="weui-cell" style="padding:10px;">
      <div class="weui-cell__hd"><img :src="pointShop.ObjectPhoto" alt="" style="width:26px;margin-right:15px;display:block;border-radius:50%;"></div>
      <div class="weui-cell__bd weui-cell_primary">
        <span>{{pointShop.ObjectName}}</span>
        <span v-if="pointShop.ObjectGender && pointShop.ObjectGender ==='0'">师傅</span>
        <span v-if="pointShop.ObjectGender && pointShop.ObjectGender ==='1'">阿姨</span>
      </div>
      <div class="zj_cell_ft icon_phone">
          <a :href="wkPhoneNumber"><img src="../../static/images/phone.png" alt="" style="width:28px;height:28px;display:block;padding-right:7px;"></a>
        </div>
    </div>
  </div>
  <!-- 服务类型-->
  <div class="weui-cells">
    <div  @click="routeToType" class="weui-cell weui-cell_access" style="padding:5px 10px 5px 0;" >
      <div class="weui-cell__hd"> 
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p class="service_bg">服务类型</p>
      </div>
      <div class="weui-cell__ft" v-show="pointShop.ServiceTypeId">
        <span>{{pointShop.ServiceTypeName}}</span>
      </div>
      <div class="weui-cell__ft" v-show="!pointShop.ServiceTypeId">
         请选择服务类型
      </div>
    </div>
  </div>
  <!-- IsNegotiable 1 面议，0 定价 -->
  <!-- <div class="weui-cells" style="margin-top:-1px;" v-show="pointShop.IsNegotiable">
    <div class="weui-cell clean_border" style="padding:5px 30px;text-align:right;color:#888;">
      <div class="weui-cell__bd weui-cell_primary">
        <p>{{pointShop.ServiceTypeName}} 价格范围：¥{{sv.Min}}~{{sv.Max}}/{{sv.UnitName}}</p>
      </div>
    </div>
  </div> -->
  <!-- 服务价格&服务数量&服务时间-->
  <div class="weui-cells">
    <a href="javascript:;" class="weui-cell weui-cell_access" v-show="pointShop.IsNegotiable ==='0'" style="padding: 12px 15px;">
      <div class="weui-cell__hd">
        <img src="../../static/images/pic-price.png" alt="" style="width:20px;margin-right:10px;display:block">
      </div>
      <div class="weui-cell__bd">
        <p>服务价格</p>
      </div>
      <div class="weui-cell__ft" style="text-align:right;">
        {{pointShop.ServicePrice}}
      </div>
      <!-- <div class="weui-cell_primary" style="text-align:right;">
        <select class=" weui-select rtl fc8" name="" id="" v-model="pointShop.ServicePrice">
          <option :value="item" v-for="item in sv.PriceList">{{item}}</option>
        </select>
      </div> -->
    </a>
    <div class="weui-cell" :class="{'weui-cell_access':ct}"  v-show="pointShop.IsNegotiable ==='0'">
      <div class="weui-cell__hd">
        <img src="../../static/images/pic-count.png" alt="" style="width:20px;margin-right:10px;display:block">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p>服务数量</p>
      </div>
      <div class="weui-cell__ft flex1" style="text-align:right;" v-if="ct">
        <select class="vue-select rtl fc8" name="" id="" v-model="pointShop.Total">
          <option :value="item" v-for="item in ct">{{item}}{{pointShop.UnitName}}</option>
        </select>
      </div>
      <div class="zj_cell_right" v-if="!ct">
        <div class="zj_select_plus">
          <i class="zj_select_sub" @click="pointShop.Total--"></i>
          <input class="zj_select_num" type="number" maxlength="4" v-model="pointShop.Total">
          <i class="zj_select_add" @click="pointShop.Total++"></i>
        </div>
      </div>
    </div>
    <a href="javascript:;" @click="chooseDate" class="weui-cell weui-cell_access" style="padding:12px 15px">
      <div class="weui-cell__hd">
        <img src="../../static/images/pic-time.png" alt="" style="width:20px;margin-right:10px;display:block">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <p>服务时间</p>
      </div>
      <div class="weui-cell__ft pblue" v-show="!pointShop.ServiceStartAt">请选择服务时间</div>
      <div class="weui-cell__ft pblue" v-show="pointShop.ServiceStartAt">
        <span>{{pointShop.ServiceStartAt}}</span>
      </div>
    </a> 
  </div>

  <!-- 活动 -->
  <div class="weui-cells" style="padding:10px 15px 0px 15px;" v-if="serviceTypeRules.length > 0 && pointShop.IsNegotiable ==='0'">
    <div class="webkit_box pb10" v-show="item.ReturnType === '1'" v-for="item in serviceTypeRules" >
      <div class="weui-cell__hd">
        <img src="../../static/images/pic-orange-back.png" alt="" style="width:14px;margin-right:5px;display:block;">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <span class="f14 fc8">{{item.Title}}</span>
      </div>
      <div class="zj_cell_ft">
        <img style="width:16px;" src="../../static/images/pic-new-choose.png">
        <!-- <img v-show="item.Upper > bill" style="width:16px;" src="../../static/images/pic-new-unchoose.png"> -->
      </div>
    </div>
    <div class="webkit_box pb10" v-show="item.ReturnType === '0'" v-for="item in serviceTypeRules">
      <div class="weui-cell__hd">
        <img src="../../static/images/pic-red-cut.png" alt="" style="width:14px;margin-right:5px;display:block;">
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <span class="f14 fc8">{{item.Title}}</span>
      </div>
      <div class="zj_cell_ft">
        <img style="width:16px;" src="../../static/images/pic-new-choose.png">
        <!-- <img v-show="item.Upper > bill" style="width:16px;" src="../../static/images/pic-new-unchoose.png"> -->
      </div>
    </div>
  </div>

  <!-- 订单总计 -->
  <div class="weui-panel weui-panel_access" v-if="pointShop.IsNegotiable ==='0'">
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_text">
        <span class="f14">订单金额</span>
        <span style="float:right;font-size:14px;color:#888">
          <span style="padding-right:20px;">¥{{pointShop.ServicePrice}} x {{pointShop.Total}}</span>
          <span>¥{{bill}}</span>
        </span>
      </div>
    </div>
    <div class="weui-panel__bd" v-show="serviceTypeRules.length > 0 && item.ReturnType === '0'" v-for="item in serviceTypeRules">
      <div class="weui-media-box weui-media-box_text">
        <span class="f14">{{item.Title}}</span>
        <span style="float:right;font-size:14px;color:#888">
          <span>-¥{{item.Rule.Minus}}</span>
        </span>
      </div>
    </div>
    <div class="weui-panel__ft">
      <div class="weui-cell weui-cell_link">
        <div class="weui-cell_hd">
          <span style="color:#333">订单总计</span>
        </div>
        <div class="zj_cell_right">
          ¥{{payable}}
        </div>
      </div>
    </div>
  </div>
  
  <!-- 备注 & 图片-->
  <div class="weui-cells">
    <div class="weui-cell" style="padding:10px;">
      <div class="weui-cell__bd weui-cell_primary">
        <h4>备注</h4>
        <textarea name="" id="textarea" textarea-size cols="20" rows="4" placeholder="描述您的服务要求，例如服务总时间，对工人的要求等" class="weui-textarea h40" maxlength="200" v-model="pointShop.ServiceContent"></textarea>
        <div class="weui-textarea-counter">
          <span></span>
          {{pointShop.ServiceContent.length}}/200
        </div>
      </div>
    </div>
    <!-- <div class="weui-cell weui-cells_form" style="padding:10px;">
      <div class="weui-cell__bd weui-cell_primary">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <div class="weui-cell__bd weui-cell_primary">上传图片（供工人参考，最多8张）</div>
            <div class="zj_cell_ft">
              <img src="../../static/images/btn-addition.png" alt="" style="width: 20px;vertical-align:middle;">
            </div>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
              <li class="weui-uploader__files" style="background-image:url(../../static/images/pic.png);">
                <i></i>
              </li>
            </ul>
            <div class="weui-uploader__input-box">
              <input id="file" type="file" accept="image/*multiple" class="weui-uploader__input">
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div> -->
  </div>
  
  <!-- 服务说明-->
  <div class="weui-cell bgf mb49 fc8 lh30">
    <div class="weui-cell__bd weui-cell_primary">
      <p class="f14">服务说明</p>
      <p class="f13" style="line-height:1.8em;" v-for="item in fw">{{item}}</p>
    </div>
  </div>
  
  <!-- 支付 -->
  <div class="zj_foot webkit_box">
    <div class="zj_foot_hd">
      总计
    </div>
    <div class="zj_foot_bd" v-show="!pointShop.IsNegotiable">
    </div>
    <div class="zj_foot_bd" v-show="pointShop.IsNegotiable ==='0'">
      <span>¥{{payable}}</span>
      <span class="f14 fc8">已优惠¥{{discountSum}}</span>
    </div>
    <div class="zj_foot_bd" v-show="pointShop.IsNegotiable ==='1'">
      <span>¥{{pointShop.ServicePrice}}</span>
      <span class="f14 fc8">起</span>
    </div>
    <div class="zj_foot_ft" @click="submit">
      <span class="btn">提交订单</span>
    </div>
  </div>
</form>

<!-- 选择服务时间 -->
  <div class=""> 
    <div class="weui-mask" :class="[isTime ? 'weui-animate-fade-in':' weui-animate-fade-out none']"></div> 
    <div class="weui-picker" :class="[isTime ? 'weui-animate-slide-up':'weui-animate-slide-down']"> 
      <div class="weui-picker__bd">
        <div class="weui-picker__group" style="overflow:auto"> 
            <div class="weui-picker__item" v-for="item in dp" :class="{'blue':item.Date === dpDate}" @click="checkDate(item)">{{item.Date}} </div>
        </div>
        <div class="weui-picker__group" style="display: block;overflow:auto"> 
          <div class="weui-picker__content" style="transform: translate3d(0px, 0px, 0px);">
             <div class="weui-picker__item" :class="{'blue':(item.Time === dpTime&& item.IsVacant ==='1')}" @click="checkTime(item)" v-for="item in timeRange2"><span :class="{'fc8': item.IsVacant ==='0'}">{{item.Time}}&nbsp;<span v-show="item.IsVacant ==='0'">约满</span></span></div>
          </div> 
        </div>
      </div> 
      <div class="weui-picker__hd"> 
        <a href="javascript:;" @click="isTime = false"  data-action="cancel" class="weui-picker__action">取消</a> 
      </div> 
    </div> 
  </div>

<!-- 错误提示 -->
  <div class="js_dialog" id="iosDialog2" v-show="isError">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
          <div class="weui-dialog__bd">{{errorMsg}}</div>
          <div class="weui-dialog__ft">
              <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="isError = false">朕 知道了!</a>
          </div>
      </div>
  </div>  

<!-- 正在提交提示 -->
  <div id="loadingToast" v-show="isLoading">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
          <i class="weui-loading weui-icon_toast"></i>
          <p class="weui-toast__content">正在提交...</p>
      </div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
  name:"point_order",
  data(){
    return {
      addr:{},  // 地址
      gt:{},  // 活动
      fw:{},  // 服务说明
      sv:{},  // 服务价格
      dp:{},  // 服务时间
      ct:{},  // 服务可选数量
      discountSum:"", // 优惠折扣
      dpDate:"",
      dpTime:"",
      timeRange2:[],
      isTime:false,
      isError:false,
      errorMsg:"",
      isLoading:false
    }
  },
  mounted(){
    // 获取地址详情
    if(this.pointShop.ServiceAddressId){
      axios.post(API.GetAddress,qs.stringify({
        "Token": this.Token,
        "Id": this.pointShop.ServiceAddressId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("地址详情",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          this.addr = res.data.Body[0];
        }else{
          this.isDelete = false;
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      });
    }
    // 获取工人/商户详细信息  Type: 1 工人；2 商户
    // if(this.pointShop.ObjectType === '2'){
    //   var objectType = '1';
    // }else{
    //   var objectType = '2';
    // }
    // if(this.pointShop.ObjectId){
    //   axios.post(API.Detail,qs.stringify({
    //     "Token": this.Token,
    //     "Type": objectType,
    //     "Id": this.pointShop.ObjectId
    //   }),{
    //     headers: {'Content-Type':'application/x-www-form-urlencoded'}
    //   }).then((res)=>{
    //     console.log("工人/商户详细信息",res.data);
    //     if(res.data.Meta.ErrorCode === '0'){
    //       if(res.data.Body){
    //         if(res.data.Body.Business){
    //           this.wk = res.data.Body.Business;
    //         }else{
    //           this.wk = res.data.Body.Worker;
    //           this.iswk = true;
    //         }
    //       }
    //     }else{
    //       this.isDelete = false;
    //       this.isError = true;
    //       this.errorMsg = res.data.Meta.ErrorMsg;
    //     }
    //   }).catch(function (error) {
    //     console.log(error);
    //     this.isError = true;
    //     this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
    //   });
    // }

    // 获取服务价格
    // if(this.pointShop.ServiceAddressId){
    //   if(this.pointShop.ServiceTypeId){
    //     axios.post(API.GetServicePriceEx,qs.stringify({
    //       "Token": this.Token,
    //       "ServiceTypeId": this.pointShop.ServiceTypeId,
    //       "ServiceProviderType": this.pointShop.ObjectType,
    //       "ServiceAddressId": this.pointShop.ServiceAddressId
    //     }),{
    //       headers: {'Content-Type':'application/x-www-form-urlencoded'}
    //     }).then((res)=>{
    //       console.log("服务价格",res.data);
    //       if(res.data.Meta.ErrorCode === '0'){
    //         this.sv = res.data.Body;
    //         if(res.data.Body.IsNegotiable === '0'){
    //           this.pointShop.ServicePrice = res.data.Body.PriceList[0];
    //         }else{
    //           this.pointShop.ServicePrice = res.data.Body.StartingPrice;
    //         }
    //       }else{
    //         this.isDelete = false;
    //         this.isError = true;
    //         this.errorMsg = res.data.Meta.ErrorMsg;
    //       }
    //     }).catch(function (error) {
    //       console.log(error);
    //       this.isError = true;
    //       this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
    //     });
    //   }
    // }

    // 获取服务可选数量
    if(this.pointShop.ServiceTypeId && (this.pointShop.ServiceTypeId ==='5' || this.pointShop.ServiceTypeId === '733')){
      axios.post(API.GetServiceQty,qs.stringify({
        "ServiceId": this.pointShop.ServiceTypeId,
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("服务可选数量",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          this.ct = res.data.Body;
          if(res.data.Body){
            this.pointShop.Total = res.data.Body[0];
          }
        }else{
          this.isDelete = false;
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      });
    }

    // 获取有效服务时间
    if(this.pointShop.ServiceTypeId){
      axios.post(API.ServiceTimeStartAt,qs.stringify({
        "ServiceTypeId": this.pointShop.ServiceTypeId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("有效服务时间",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          this.dp = res.data.Body;
        }else{
          this.isDelete = false;
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      });
    }

    // 获取当前可参与的活动
    if(this.pointShop.ServiceTypeId && this.pointShop.IsNegotiable ==='0'){
      axios.post(API.GetActivityEx,qs.stringify({
        "Token": this.Token,
        "ServiceTypeId": this.pointShop.ServiceTypeId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("当前可参与的活动",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          this.gt = res.data.Body;
        }else{
          this.isDelete = false;
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      });
    }

    // 获取此类型的服务说明
    if(this.pointShop.ServiceTypeId){
      axios.post(API.GetAllDescription,qs.stringify({
        "Code": "Code002",
        "ServiceId": this.pointShop.ServiceTypeId
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
        console.log("服务说明",res.data);
        if(res.data.Meta.ErrorCode === '0'){
          if(res.data.Body && res.data.Body.Description){
            this.fw = this.regDec(res.data.Body.Description);
          } 
        }else{
          this.isDelete = false;
          this.isError = true;
          this.errorMsg = res.data.Meta.ErrorMsg;
        }
      }).catch(function (error) {
        console.log(error);
        this.isError = true;
        this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
      });
    }
  },
  methods:{
    routerToAddr(){
      this.$store.dispatch('setAddrOrigin',{
        txt: 1
      });
      this.$router.push({path:'/addr_list'});
    },
    routeToType(){
      // 选择服务类型
      if(this.pointShop.ServiceAddressId){
        this.$router.push({name:'point_service_type'});
      }else{
        this.isError = true;
        this.errorMsg = "请先选择服务地址！";
      } 
    },
    chooseDate(){
      if(this.pointShop.ServiceTypeId){
        this.isTime = true;
      }else{
        this.isError = true;
        this.errorMsg = "请先选择服务类型";
      }   
    },
    submit(){
      if(this.Token && this.pointShop.ServiceTypeId && this.pointShop.ServiceStartAt && this.pointShop.ServiceAddressId && this.pointShop.ServicePrice){
        this.isLoading = true;
        let Json_data = {
          "Token": this.Token,
          "ObjectType":this.pointShop.ObjectType,
          "ObjectId": this.pointShop.ObjectId,
          "ServiceTypeId": this.pointShop.ServiceTypeId,
          "ServiceContent": this.pointShop.ServiceContent,
          "Total": this.pointShop.Total,
          "OrderFrom": "1",
          "ServiceStartAt": this.pointShop.ServiceStartAt,
          "ServiceAddressId": this.pointShop.ServiceAddressId,
        }
        let formdata = new FormData();
        formdata.append("Token", this.Token);
        formdata.append("ObjectType", this.pointShop.ObjectType);
        formdata.append("ObjectId", this.pointShop.ObjectId);
        formdata.append("ServiceTypeId", this.pointShop.ServiceTypeId);
        formdata.append("ServiceContent", this.pointShop.ServiceContent);
        formdata.append("Total", this.pointShop.Total);
        formdata.append("OrderFrom", "1");
        formdata.append("ServiceStartAt", this.pointShop.ServiceStartAt);
        formdata.append("ServiceAddressId", this.pointShop.ServiceAddressId);
        formdata.append("img","");
        formdata.append("JSON_Data", JSON.stringify(Json_data));
        axios.post(API.CreateOrderOneKey,formdata,{
          headers: {'Content-Type':'multipart/form-data'}
        }).then((res)=>{
          this.isLoading = false;
          console.log("提交表单",res.data);
          if(res.data.Meta.ErrorCode === '0'){
            let orderId = res.data.Body.OrderId;
            this.setOrderId(orderId);
            //0 定价去支付页面，1 面议去订单详情页面
            if(this.pointShop.IsNegotiable === '0'){
              this.$router.push({path:'/pay'});
            }else{
              this.$router.push({path:'/order_detail'});
            }
          }else{
            this.isDelete = false;
            this.isError = true;
            this.errorMsg = res.data.Meta.ErrorMsg;
          }
        }).catch(function (error) {
          console.log(error);
          this.isError = true;
          this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
        });
      }else{
        this.isError = true;
        this.errorMsg = "主人，请仔细检查订单是否有填写!";
      }
      
    },
    checkDate(item){
      // 选定日期
      this.dpDate = item.Date;
      this.timeRange2 = item.TimeRange2;
    },
    checkTime(item){
      // 选定时间
      this.dpTime = item.Time;
      if(this.dpDate && (item.IsVacant === '1')){
        this.pointShop.ServiceStartAt = this.dpDate + '' + this.dpTime;
        this.isTime = false;
      }
    },
    setOrderId(item){
      this.$store.dispatch('setOrderId',{
        txt:item
      })
    },
    regDec(string){
      let content = string.replace(/\n/g,'|');
      let arry = content.split('|');
      return arry;
    }
  },
  computed:{
    bill(){
      // 订单金额
      return parseFloat(this.pointShop.ServicePrice)*parseFloat(this.pointShop.Total);
    },
    payable(){
      // 订单优惠后价格 应付价格 0 满减 ，1 满返
      let discountList =[];
      if(this.gt.ServiceTypeRules && this.gt.ServiceTypeRules.length > 0){
        this.gt.ServiceTypeRules.map((v)=>{
          v.Details.map((x)=>{
            if(x.ReturnType === '0'){
              let rule = [];
              x.Rules.map((y)=>{
                if(parseFloat(this.bill) >= parseFloat(y.Upper)){
                  rule.push(parseFloat(y.Minus));
                }
              })
              let max = rule.reduce((x,y)=>{
                return (x>y) ? x:y;
              })
              discountList.push(max);
            }
          })
        })
        this.discountSum = discountList.reduce((x,y)=>{
          return x+y;
        },0)
        return this.bill-this.discountSum;
      }
    },
    serviceTypeRules(){
      let discountList = [];
      if(this.gt.ServiceTypeRules && this.gt.ServiceTypeRules.length > 0){
        this.gt.ServiceTypeRules.map((v,j,arr)=>{
          v.Details.map((x,i,arry)=>{
            let rule = [];
            x.Rules.map((y)=>{
              if(parseFloat(this.bill) >= parseFloat(y.Upper)){
                rule.push(y);
              }
            })
            let max = rule.reduce((x,y)=>{
              return (parseFloat(x.Minus)> parseFloat(y.Minus)) ? x:y;
            })
            arry[i]['Rule'] = max;
            discountList.push(x);
          })
        })      
      }
      return discountList;
    },
    Token(){
      return this.$store.state.Token;
    },
    pointShop(){
      return this.$store.state.pointShop;
    },
    orderId(){
      return this.$store.state.orderId;
    },
    wkPhoneNumber(){
      return "tel:"+ this.pointShop.ObjectPhone;
    }
  },
  watch:{
    ['pointShop.Total'](){
      if(this.pointShop.Total < 1){
        this.pointShop.Total = 1;
        this.isError = true;
        this.errorMsg = "客官，数量不能小于1哦!";
      } 
      if(!this.pointShop.Total){

      }
    }
  }
}
</script>
<style scoped> 
/*基础样式*/
a,img,button,input,textarea,ul,li,div{-webkit-tap-highlight-color:rgba(255,255,255,0);}
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
.pb10 {
  padding-bottom: 10px;
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
/*覆盖的样式*/
.weui-panel_access {
  padding-top: 10px;
}
.weui-panel__bd {
  padding-top: 0;
}
.weui-media-box:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #E5E5E5;
  color: #E5E5E5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 15px;
}
.weui-media-box {
  padding:0 15px 10px 15px;
}
.weui-cell_select {
  padding:0 15px;
}
.weui-cells {
  margin-top: 10px;
}
.weui-cell {
  font-size:14px;
}
.weui_uploader_hd {
    padding: 0;
}
.weui-btn_disabled.weui-btn_primary {
  background-color: #27b8f3;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  color: rgba(255, 255, 255, 0.6);
  background-color: #27b8f3;
}
.weui-btn_primary {
  background-color: #27b8f3;
}
.weui-icon-success {
  color:#27b8f3;
} 
.weui-dialog__btn_primary{
  color: #27b8f3
}
.weui-cell_select .weui-select {
  padding-right:15px;
}
/*日期覆盖样式*/
.weui-picker__hd {
  background-color: #27b8f3;
}
.weui-picker__action:last-child {
  text-align: center;
  color:#fff;
}
.weui-picker__item {
  position: relative;
  padding: 10px;
}
.weui-picker__item.blue {
  color:#27b8f3;
}
.weui-picker__item:after {
  content:" ";
  position: absolute;
  bottom: 0;
  left: 0;
  height:1px;
  width:100%;
  border-bottom: 1px solid #d9d9d9;
  -webkit-transform:scaleY(-0.5);
  transform:scaleY(-0.5);
  -webkit-transform-origin:0 0;
  transform-origin: 0 0; 
}
/*自定义样式*/
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
    /*-webkit-box-flex:1;
    flex: 1;*/
    padding: 10px;
}
.zj_foot_bd {
    -webkit-box-flex:2;
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
.none {
  display: none;
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
.service_bg {
  background: url('../../static/images/pic-type.png') -6px 0;
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
.vue-select {
  width:100%;
  -webkit-appearance: none;
  border:0;
  outline: 0;
  background-color: transparent;
  position: relative;
  z-index: 1;
  font-size:14px;
  padding:3px 0;
}
</style>