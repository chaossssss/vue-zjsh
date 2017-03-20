<template>
<div style="position:relative;height:100%;background-color:rgb(238,238,238);">
	<div class="zj_toptips weui_warn">
		<span></span>
	</div>

	<div class="weui-cells" style="margin-top:0;">
		<div class="weui_cell_two">
			<div class="weui-cell__hd">
				<label for="" class="weui-label">联系人</label>
			</div>
			<div class="weui-cell__bd weui-cell_primary weui-cells_checkbox">
				<div class="weui-cell weui-cell_primary weui_vmar weui_vpad">
					<input type="text" @blur="saveToSession('contact', vm.Contact)" v-model="vm.Contact" placeholder="您的姓名" class="weui-input" maxlength="15">
				</div>
				<div class="weui-cell" style="padding-left:0;">
					<label class="mr30 webkit_box">
						<input @click="saveToSession('gender', vm.Gender)" v-model="vm.Gender" type="radio" name="radio" class="weui-check" id="s10" value="0">
						<i class="weui-icon-checked mr10"></i>
						先生
					</label>
					<label class="weui_cell_hd webkit_box" for="s11">
						<input @click="saveToSession('gender', vm.Gender)" v-model="vm.Gender" type="radio" name="radio" class="weui-check"  id="s11" value="1">
						<i class="weui-icon-checked mr10"></i>
						女士
					</label>
				</div>
			</div>
		</div>
		<div class="weui-cell">
			<div class="weui-cell__hd">
				<label class="weui-label">联系电话</label>
			</div>
			<div class="weui-cell__bd webkit_box">
				<input type="tel" @blur="saveToSession('phone', vm.PhoneNumber)" v-model="vm.PhoneNumber" class="weui-input" placeholder="您的联系电话" minlength="11"  maxlength="11">
			</div>
		</div>
		<div class="weui_cell_two weui_cell_bord">
			<div class="weui-cell__hd">
				<label for="" class="weui-label">服务地址</label>
			</div>
			<div class="w100">
				<a href="javascript:;" class="zj_clearA">
					<div class="weui-cell__bd pb10">
            <router-link to="/addr_map" v-if="vm.Address1 == ''" style="color: #ddd;">小区/写字楼/大厦/学校等</router-link>
						<router-link to="/addr_map" v-else style="color: #333;">{{ vm.Address1 }}</router-link>
					</div>
					<div class="weui-cell__bd weui_cell_bord pt10 pb10">
						<input type="text" @blur="saveToSession('address2', vm.Address2)" v-model="vm.Address2"  class="weui-input" placeholder="详细地址（如1单元203室...）">
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="weui-cells weui-cells_checkbox mt10 plt5">
		<div class="weui-cell">
			<div class="weui-cell__hd">
				<label for="" class="weui-label">
					标签
				</label>
			</div>

      <div class="weui-cell__bd">
        <label for="no_tag" @click="saveToSession('tag', vm.Tag)">
          <input v-model="vm.Tag" type="radio" name="radio1" class="weui-check" id="no_tag" value="无">
          <i class="weui-icon-checked"></i>
          无
        </label>

        <label :for="tag.Id" @click="saveToSession('tag', tag.Id)" v-for="tag in tagList">
          <input v-model="vm.Tag" type="radio" name="radio1" class="weui-check" :id="tag.Id" :value="tag.Id">
          <i class="weui-icon-checked"></i>
          {{ tag.Name }}
        </label>
      </div>
		</div>
	</div>

	<div class="foot" >
		<a href="javascript:;" :class="{'weui-btn_disabled':!isRequired}" @click="saveAddr" class="weui-btn weui-btn_primary">保存</a>
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
import mapState from 'vuex';
import API from '../../config/backend';
import COM from '../../config/common';
import axios from 'axios';
import qs from 'qs';

export default {
	name:'addrAdd',
	data(){
		return {
      vm: {
        PhoneNumber: '',
        Contact: '',
        Gender: '',
        Address1: '',
        Address1Lat: -1,
        Address1Lng: -1,
        Address2: '',
        Tag: ''
      },
      tagList: [],
      isError: false,
      errorMsg: "",
      Token: null
    }
	},
	mounted(){
    //从sessionStorage中读取选择制定地点的位置信息
    if(sessionStorage.getItem('mapAddr')) {
      this.vm.Address1 = sessionStorage.getItem('mapAddr');
      this.vm.Address1Lat = sessionStorage.getItem('mapAddrLng');
      this.vm.Address1Lng = sessionStorage.getItem('mapAddrLat');
    }

    //从sessionStorage中读取已填写数据
    this.vm.Contact = sessionStorage.getItem('contact');
    this.vm.PhoneNumber = sessionStorage.getItem('phone');
    this.vm.Address2 = sessionStorage.getItem('address2');
    this.vm.Gender = sessionStorage.getItem('gender');
    this.vm.Tag = sessionStorage.getItem('tag');

    //从cookie读取Token
		this.Token = COM.getCookie("Token");
		// 获取标签
    axios.post(API.GetAddressTags,qs.stringify({

    }),{
      headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }).then((res)=>{
    	if(res.data.Meta.ErrorCode === '0'){
    		this.tagList = res.data.Body;
    	}else{
    		this.isError = true;
    		this.errorMsg = res.data.Meta.ErrorMsg;
    	}
		}).catch(function (error) {
      console.log(error);
      this.isError = true;
  		this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
    });
	},
  computed: {
    isPhone() {
      return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.vm.PhoneNumber);
    },
    isRequired() {
      if (this.isPhone && this.vm.Contact && this.vm.Gender && this.vm.Address1 && this.vm.Address1Lat && this.vm.Address1Lng && this.vm.Address2 && this.vm.Tag) {
        return true;
      } else {
        return false;
      }
    }
  },
	methods:{
    saveToSession(key, val) {
      sessionStorage.setItem(key, val);
    },
		saveAddr(){
			if(this.isRequired){
				axios.post(API.AddAddress,qs.stringify({
		      "Token": this.Token,
		      "Address": this.vm
		    }),{
		      headers: {'Content-Type':'application/x-www-form-urlencoded'}
		    }).then((res)=>{
		    	if(res.data.Meta.ErrorCode === '0'){
		    		this.$router.push({path:'addr_list'});
		    	}else{
		    		this.isError = true;
		    		this.errorMsg = res.data.Meta.ErrorMsg;
		    	}
				}).catch(function (error) {
		      console.log(error);
		      this.isError = true;
	    		this.errorMsg = "小主，请在WIFI，4g环境下享用本服务 么么哒!";
		    });
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
.pb10 {
	padding-bottom: 10px;
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
.weui-cells {
	font-size: 15px;
}
.weui-cell {
	padding:15px 10px;
}
.weui-cell.weui_vpad {
	padding:0;
}
.weui-cell:before {
	content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  /*left: 10px;*/
}
.weui-cell.weui-cell_select{
	padding:0 0 0 10px;
}
.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
  display: block;
  content: '\EA08';
  color: #27b8f3;
  font-size: 16px;
}
.weui-cells_checkbox .weui-cell__hd {
  padding-right: 0.35em;
}
.weui-cells_checkbox .weui-icon-checked:before {
  content: '\EA01';
  color: #C9C9C9;
  font-size: 23px;
  display: block;
}
.weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before {
  content: '\EA06';
  color: #27b8f3;
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
.weui-dialog__btn_primary{
	color: #27b8f3
}
/*新的样式*/
.weui_cell_two {
	padding: 15px 0 0 10px;
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