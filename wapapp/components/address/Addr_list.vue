<template>
<div>
	<div class="msg">
		<div class="weui_msg">
			<div class="weui_icon_area">
				<img src="/images/location/img-local.png" alt="" style="width:130px;">
			</div>
			<div class="weui_text_area">
				<p class="weui_msg_desc">
					您还没有添加服务地址哦，快去 <a  href="javascript:;" class="pblue" >新增&nbsp;</a>吧
				</p>
			</div>
		</div>
	</div>

	<div class="weui_cells weui_cells_access" style="margin-bottom:44px;">
		<a href="javascript:;" class="weui_cell" >
			<div class="zj_cell_left">
				<div class="weui_cell_hd">
					<span ng-bind="item.Contact"></span>
					<span class="pl10">男</span>
					<span class="pl10">女</span>
					<span class="pl10"></span>
				</div>
				<div class="weui_cell_bd">
					<span class="tag" ></span>
					<span class="f12 fc8"></span>
					<span class="f12 fc8"></span>
				</div>
			</div>
			<div class="zj_cell_right" ng-cloak>
				<p><img src="/images/location/edit.png" alt="" style="width:22px;"></p>
			</div>
		</a>
	</div>
	
	<div class="footer">
		<div class="weui_cells weui_cells_access">
			<a href="javascript:;" class="weui_cell flexjc" style="padding:10px" >
				<div class="weui_cell_hd">
					<img src="/images/location/add.png" alt="" style="width:20px;display:block;margin-right:10px;">
				</div>
				<div class="weui_cell_bd">
					<p>新增地址</p>
				</div>
			</a>
		</div>
	</div>
</div>	
</template>

<script>
export default {
	name:'addrList',
	data(){
		return {

		}
	}
}
</script>
<style scoped>
/*基础样式*/
body {
	background-color: rgb(238,238,238);
}
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
.weui_msg {
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