<template>
<div style="position:relative;height:100%;background-color:rgb(238,238,238);">
	<div class="msg" v-show="addrList.length === 0">
		<div class="weui-msg">
			<div class="weui-msg__icon-area">
				<img src="../../static/images/img-local.png" alt="" style="width:130px;">
			</div>
			<div class="weui-msg__text-area">
				<p class="weui-msg__desc">
					您还没有添加服务地址哦，快去 <router-link  to="/addr_add" class="pblue" >新增&nbsp;</router-link>吧
				</p>
			</div>
		</div>
	</div>

	<div class="weui-cells" style="margin:0 0 44px 0;font-size:15px;">
		<a href="javascript:;" class="weui-cell weui-cell_access" v-for="item in addrList">
			<div class="zj_cell_left" @click="routerTo(item.Id)">
				<div class="weui-cell__bd">
					<span>{{item.Contact}}</span>
					<span class="pl10" v-show="item.Gender === '0'">男</span>
					<span class="pl10" v-show="item.Gender === '1'">女</span>
					<span class="pl10">{{item.PhoneNumber}}</span>
				</div>
				<div class="weui-cell__bd">
					<span class="tag" >{{item.Tag}}</span>
					<span class="f12 fc8">{{item.Address1}}</span>
					<span class="f12 fc8">{{item.Address2}}</span>
				</div>
			</div>
			<router-link :to="{name:'addr_edit',params:{ addrId: item.Id }}" class="zj_cell_right">
				<p><img src="../../static/images/btn-edit.png" alt="" style="width:22px;"></p>
			</router-link>
		</router-link>
	</div>
	
	<div class="footer">
		<div class="weui-cells" style="margin-top:0;">
			<router-link to="/addr_add" class="weui-cell weui-cell_access flexjc" style="padding:10px" >
				<div class="weui-cell__bd">
					<img src="../../static/images/btn-add.png" alt="" style="width:20px;display:block;margin-right:15px;float:right;">
				</div>
				<div class="weui-cell__bd">
					<p>新增地址</p>
				</div>
			</router-link>
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
</div>	
</template>

<script>
import {mapState} from 'vuex';
import API from '../../config/backend';
import COM from '../../config/common';
import axios from 'axios';
import qs from 'qs';

export default {
	name:'addrList',
	data(){
		return {
			addrList:[],
			isError:false,
			errorMsg:"",
			Token:null
		}
	},
	mounted(){
		this.Token = COM.getCookie("Token");
		this.addrList[1];	
		if(this.Token){
			axios.post(API.GetAddress,qs.stringify({
        "Token": this.Token
      }),{
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).then((res)=>{
      	if(res.data.Meta.ErrorCode === '0'){
      		this.addrList = res.data.Body
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
	computed: mapState(['quickShop','pointShop','addrOrigin']),
	methods:{
		setQuickShop(){
			this.$store.dispatch('setQuickShop',{
				txt: this.quickShop
			})
		},
		setPointShop(){
			this.$store.dispatch('setPointShop',{
				txt: this.pointShop
			})
		},
		routerTo(id){
			if(this.addrOrigin === 2){
				this.quickShop.ServiceAddressId = id;
				this.setQuickShop();
				this.$router.push({path:'/quick_order'});
			}else if(this.addrOrigin === 1){
				this.quickShop.ServiceAddressId = id;
				this.setPointShop();
				this.$router.push({path:'/point_order'});
			}
		}
	}
}
</script>
<style scoped>
/*文本 左 中 右*/
.tl{ text-align:left;}
.tc{ text-align:center;}
.tr{ text-align:right;}
/*布局相关 flexbox 
＊“display:box;”或者“box-{*}”属性，那么你看的正是2009年版本的Flexbox。
＊“display:flexbox;”或者“flex()”函数，那么你看的正是2011年版本的Flexbox。（在IE10中将运行Flexbox的中间版本（2011年版本）：display: flexbox;）
＊“display:flex;”和“flex-{*}”属性，那么你查看的是当前的规范。
*/
.webkit_box{display: -webkit-flex;display: -moz-flex; display: flex; -webkit-box-orient: horizontal; }
.flex1 {-webkit-flex-grow: 1;-moz-flex-grow: 1; flex-grow: 1;}
.flex2 {-webkit-flex-grow: 2;-moz-flex-grow: 2; flex-grow: 2;}
.flex3 {-webkit-flex-grow: 3;-moz-flex-grow: 3; flex-grow: 3;}
.flexc {align-items:center;}
.flexjc {justify-content: center;}

.mt10 {
	margin-top: 10px;
}
.mr30 {
	margin-right: 30px;
}
.mr10 { 
	margin-right: 10px;
}
.weui_vpad {
	padding: 0;
}
.weui_vmar {
	margin-bottom: 10px;
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
.w100 {
	width: 100%;
}
.plt5 {
	padding: 5px 0;
}
.pl10 {
	padding-left: 10px;
}
.pt10 {
	padding-top: 10px;
}
.f12 {
	font-size: 12px;
}
.fc8 {
	color: #888;
}
/*配色*/
.pgreen {
	color:#04BE02;
}
.pblue {
	color: #27b8f3;
}
/*display 块*/
.none{ display:none;}
.block{ display:block;}
.inb{ display:inline-block;}
/*重写写*/
.weui_label {
	width: 80px;
}
.weui_cells_checkbox 
.weui_icon_checked:before {
	content:'\EA01';
	color:#c9c9c9;
	font-size: 23px;
	display: inline-block;
}
.weui-msg {
	position: absolute;
	top:40%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 100%;
}
/*新的样式*/
.weui_cell_two {
	padding: 10px 0 0 10px;
	position: relative;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: flex-start;
	-webkit-align-items: flex-start;
	      align-items: flex-start;
}
.weui_cell_two .weui_cell {
	padding-left: 10px;
	padding-bottom: 0;
}
.weui_cell_two .weui_cell_bd {
	margin-bottom: 10px;
}
.weui_cell_bord {
  position: relative;
}
.weui_cell_bord:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
  left: 10px;
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
.foot {
	margin-top: 70px;
	width: 90%;
	margin-left:auto;
	margin-right:auto;
}
.tag {
	/*background-color: #04BE02;*/
	background-color: #27b8f3;
	color: #fff;
	font-size: 12px;
	padding: 0 3px;
}
.zj_toptips {
	-webkit-transform: translateZ(0);
	width: 100%;
	line-height: 26px;
	font-size: 14px;
	text-align: center;
	color: #FFF;
	z-index: 50000;
	transition:all 1s ease;
}
.zj_toptips.weui_warn {
	background-color: #E64340;
}
.zj_toptips.active {
	display: block;
	height: 26px;
}
.zj_toptips.inactive {
	display: none;
}
.zj_clearA {
	text-decoration: none;
	color:#000;
}
.zj-delete-local {
	font-size: 14px;
	line-height: 24px;
	color: #ef4f4f;
}
.zj_cell_left {
	max-width: 270px;
}
.zj_cell_right {
	text-align: right;
	color: #888;
	-webkit-box-flex:1;
	-webkit-flex:1;
	flex: 1;
}
.footer {
	position: fixed;
	width: 100%;
	background-color: #fff;
	/*color:#04BE02;*/
	color: #27b8f3;
	bottom: 0;
}
#select {
	direction:rtl;
}

</style>