<template>
<div>
	<header style="background-image: url(http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg);">
		<div class="shade"></div>
		<div class="header-cont">
			<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="head-img">
			<div class="info f_left">
				<div class="names">
					<span class="qualification f_left">N项认证</span>
					<span class="name f_left">商户主页</span>
				</div>
				<div class="clear"></div>
				<div class="grade">接单数:45/电话数:99/评分:5</div>
				<div class="servs">
					<div class="ser-itel">充氟利昂</div>
					<div class="ser-itel">充氟利昂</div>
					<div class="ser-itel">小时工</div>
				</div>
			</div>
			<a href="tel:13148366695"><img src="../../static/images/call.png" alt="" class="img-call f_right"></a>
			<div class="clear"></div>
			<div class="activity-list">
				<div class="items">
					<div class="ac-item"><span class="ac-icon bg-o">减</span>在线支付满200减20</div>
					<div class="ac-item"><span class="ac-icon bg-r">返</span>领取优惠券，满200减20</div>
				</div>
				<div class="ac-nums f_right">2个活动</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="clear"></div>
	</header>
	<div class="main">
		<div class="tab">
			<ul class="score">
				<li :class="{'active':flag==1}" @click="tab='aa',flag=1">服务</li>
				<li :class="{'active':flag==2}" @click="tab='bb',flag=2">评价</li>
				<li :class="{'active':flag==3}" @click="tab='cc',flag=3">商户</li>		
			</ul>
			<div class="clear"></div>
		</div>
		<!-- 服务tab -->
		<div v-show="tab==='aa'" id="tab-fuwu">
			<div class="type-list f_left">
				<ul>
					<li class="score" :class="{'ty-ac':Htab==1}" @click="Htab=1">最新优惠</li>
					<li class="score" :class="{'ty-ac':Htab==2}" @click="Htab=2">小食甜品</li>
					<li class="score" :class="{'ty-ac':Htab==3}" @click="Htab=3">金针菇</li>
					<li class="score" :class="{'ty-ac':Htab==4}" @click="Htab=4">金针菇</li>
					<li class="score" :class="{'ty-ac':Htab==5}" @click="Htab=5">金针菇</li>
					<li class="score" :class="{'ty-ac':Htab==6}" @click="Htab=6">金针菇</li>
					<li class="score" :class="{'ty-ac':Htab==7}" @click="Htab=7">金针菇</li>
					<li class="score" :class="{'ty-ac':Htab==8}" @click="Htab=8">aaaaa</li>
				</ul>
			</div>
			<div class="type-cont f_right">
				<div class="type-nums">一个分类</div>
				<div class="cont-lists">
					<div class="cont-item score">
						<div class="cont-name">木工</div>
						<div class="cont-price"><span class="price">￥250</span>元起</div>
						<div class="btn-buy">购买</div>
					</div>
					<div class="cont-item score">
						<div class="cont-name">小时工</div>
						<div class="cont-price"><span class="price">￥250</span>元起</div>
						<div class="btn-buy">购买</div>
					</div>
					<div class="cont-item score">
						<div class="cont-name">金针工</div>
						<div class="cont-price"><span class="price">￥250</span>元起</div>
						<div class="btn-buy">购买</div>
					</div>
				</div>

			</div>
			<div class="clear"></div>
		</div>
		<!-- 评价tab -->
		<div v-show="tab==='bb'">
			<div class="pingjia-list">
				<!-- 没有评价要显示的 -->
				<div class="no-pingjia">
					<img src="../../static/images/no-pingjia.png" alt="">
					<div class="no-title">暂无评价</div>
				</div>
				<!-- 有评价要显示的 -->
				<div class="pingjia-item score">
					<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="img-pingjia f_left">
					<div class="pingjia-info f_left">
						<div class="phone">
							<span class="f_left">13144***5454</span>
							<span class="f_right">2015-12-10 11:12</span>
						</div>
						<div class="clear"></div>
						<div class="xing">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
						</div>
						<div class="clear"></div>
						<div class="pingjia-cont">
							卢阿姨真的不错！卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真
						</div>
					</div>
					<div class="clear"></div>
				</div>
				<div class="pingjia-item score">
					<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="img-pingjia f_left">
					<div class="pingjia-info f_left">
						<div class="phone">
							<span class="f_left">13144***5454</span>
							<span class="f_right">2015-12-10 11:12</span>
						</div>
						<div class="clear"></div>
						<div class="xing">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
							<img src="../../static/images/xing.png" alt="">
						</div>
						<div class="clear"></div>
						<div class="pingjia-cont">
							卢阿姨真的不错！卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真的不错卢阿姨真
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			<img src="../../static/images/write-cont.png" alt="" class="write-cont">
		</div>
		<!-- 商户tab -->
		<div v-show="tab==='cc'">
			<div class="detail-info">
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">服务信息</div>
					<div class="info-cont score">服务时间：10:00-12:00</div>
					<div class="info-cont score">商户地址：延安里延安里延安里延安里里延安里</div>
					<div class="info-cont score">服务范围：小时工 月嫂</div>
					<div class="info-cont score">标签：
						<div class="info-tags f_right">
							<span class="info-tag">人美</span>
							<span class="info-tag">善良</span>
							<span class="info-tag">金针菇</span>
							<span class="info-tag">金针菇</span>
							<span class="info-tag">金针菇</span>
							<span class="info-tag">金针菇</span>
							<span class="info-tag">金针菇</span>
							<span class="info-tag">金针</span>
						</div>
						<div class="clear"></div>
					</div>
					<div class="info-cont">认证：
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="img-rz">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="img-rz">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="img-rz">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="" class="img-rz">
					</div>
				</div>
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">商户信息</div>
					<div class="worker-info f_left score-right">	
						<div class="worker-cont">成立时间：2016.1.14</div>
						<div class="worker-cont">营业面积：100cm</div>
						<div class="worker-cont">经营规模：30万元</div>
					</div>
					<div class="worker-info f_right">
						<div class="worker-cont">商户性质：个体</div>
						<div class="worker-cont">员工人数：5人</div>
					</div>
					<div class="clear"></div>
					<div class="info-sign">
						<div class="signature score">个性签名：我是帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥</div>
						<div class="signature">系统介绍：我是帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥</div>
					</div>
				</div>
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">商户照片及员工服务照</div>
					<div class="worker-img">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
					</div>
				</div>
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">营业执照</div>
					<div class="licence-img">
						<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487741338921&di=112a961418a1d1b4d16edf086ea797a8&imgtype=0&src=http%3A%2F%2Fimg.jdzj.com%2FUserDocument%2F2014c%2Fgym2014%2FPicture%2F2014528102617.jpg" alt="">
						<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487741338921&di=112a961418a1d1b4d16edf086ea797a8&imgtype=0&src=http%3A%2F%2Fimg.jdzj.com%2FUserDocument%2F2014c%2Fgym2014%2FPicture%2F2014528102617.jpg" alt="">
					</div>
				</div>				
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
	
</div>	
</template>

<script>
import { mapState } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import API from '../../config/backend';
import axios from 'axios';
import qs from 'qs';

export default {
	name:"business",
  data(){
    return{
        tab:'aa',
        flag:1,
        Htab:1
    }            
  },
  mounted(){
  	if(this.objectInfo){
  		
  	}
  },
  computed:{
  	...mapState(['Token','objectInfo'])
  }
}
</script>

<style scoped>
/*公用*/
li{
	list-style-type: none;
}
.clear{
	clear:both;
}
.f_left{
	float: left;
}
.f_right{
	float: right;
}
.score{
	position: relative;

}
.score:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 1px;
    bottom: 0;
    left:0;
    border-bottom: 1px solid #e4e4e4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.line{
	height: 10px;
	background: #eef2f5;
}
/*头部*/
header{
    position: relative;
    padding: 15px;
    background-size: 100% 100%;
}
.shade{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    opacity: 0.8;
    z-index: 5;
    background: -webkit-linear-gradient(top,#2883dc,#2bc6dc);
    background:linear-gradient(top,#2883dc,#2bc6dc);
}
.header-cont{
    position: relative;
    z-index: 999;
}
.info{
	width: 60%;
}
.head-img{
	width: 80px;
	float: left;
	border-radius: 2px;
	margin-right: 10px;
}

.qualification{
    background: #ffd737;
    color: #8d6a16;
    font-size: 12px;
    padding: 0 3px;
    border-radius: 2px;
    margin-top: 4px;
}
.name{
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    margin-left: 5px;
    width: 67%;
    overflow: hidden;
    height: 28px;
}
.grade{
    font-size: 12px;
    color:#fff;
}
.img-call{
    width: 20px;
    margin-top: 7%;
}
.servs{
    margin-top: 5px;
    overflow: hidden;
    height: 21px;
}
.ser-itel{
    float: left;
    color: #fff;
    font-size: 12px;
    border: 1px solid #fff;
    border-radius: 2px;
    margin-right: 3%;
    margin-bottom: 5%;
    padding: 0px 8px;
}
.activity-list{
	color:#fff;
	font-size: 12px;
}
.ac-item,.ac-nums{
    margin-top: 12px;
}
.items{
    width: 80%;
    float: left;
}
.ac-icon{
    padding: 2px;
    margin-right: 6px;
    border-radius: 3px;
}

.bg-o{
	background: #eb9268;
}
.bg-r{
	background: #eb6876;
}


/*tab切换框*/
.tab ul{
	height: 45px;
}
.tab li{
	float: left;
	text-align: center;
	width: 33.3%;
	height: 45px;
	line-height: 45px;
	color: #9a9a9a;
}
.active{
    background: #f6fafb;
    color: #2bb7f4 !important;
}

/*商户服务tab*/
.price{
	color: #fd552e;
	font-weight: bold;
}
.type-list{
	width: 21.3%;
    text-align: center;
    color: #666;
    font-size: 14px;
    background: #eef2f5;
    overflow-y: scroll;
    height: 100%;
}
.type-list li{
    padding: 15px 5px 15px 5px;
}
.ty-ac{
	background: #fff;
    border-left: 2px solid #27b7f3;
}
.type-cont{
	width: 78.7%;
	height: 100%;
    overflow-y: scroll;
}
.type-nums{
	background: #f8f8f8;
	border-left: 2px solid #dfe5e5;
	color:#33373a;
	padding: 1px 10px 1px 10px;
	font-size: 14px;
	height: 25px;
}
.cont-item{
	position: relative;
    font-size: 14px;
    color: #343537;
    width: 92%;
    margin: auto;
    padding: 15px 0 15px 0;
}
.cont-price{
	font-size: 12px;
}
.btn-buy{
	position: absolute;
    border: 1px solid #fd552e;
    text-align: center;
    color: #fd552e;
    border-radius: 3px;
    padding: 0px 19px;
	right: 10px;
    top: 28%;
}




/*商户评价tab*/
.pingjia-item{
	padding: 15px;
}
.write-cont{
	position: fixed;
    bottom: 20px;
    right: 20px;
    width: 55px;
    border-radius: 30px;
    box-shadow: 1px 1px 1px 1px #D0D0D0;
}
.img-pingjia{
    width: 40px;
    border-radius: 20px;
}
.pingjia-info{
    width: 84%;
    padding-left: 2%;
}
.phone{
	color: #999;
	font-size: 12px;
}
.xing img{
	width: 16px;
	float: left;
}
.pingjia-cont{
	color: #33373a;
	font-size: 12px;
	margin-top: 10px;
}
.no-pingjia{
	display: none;
	text-align: center;
    color: #989898;
    margin-top: 15%;
}
.no-pingjia img{
	width: 30%;
}


/*商户tab*/

.info-title{
	color:#35363a;
	padding: 12px 0;
}
.info-cont{
	font-size: 14px;
    color: #666;
    padding: 12px 0;
}
.info-tag{
	display: inline-block;
	border: 1px solid #e4e9ec;
	padding: 4px 10px;
    margin-bottom: 10px;
    margin-right: 5px;
}
.img-rz{
	width: 17px;
	vertical-align: text-bottom;
	border-radius: 3px;
}
.info-list{
	padding: 0 15px 0 15px;
	padding-bottom: 0;
}
.worker-info{
    width: 45%;
    margin-top: 10px;
    padding-right: 10px;
}
.worker-cont{
	font-size: 14px;
    color: #666;
    padding: 3px 0;
    height: 22px;
    overflow: hidden;
}
.info-sign{
	background: #f2f6f9;
	color: #656565;
	font-size: 14px;
	margin: 15px 0 15px 0;
}
.signature{
	padding: 10px;
}
.worker-img img{
	width: 75px;
	height: 75px;
	border-radius: 5px;
	margin: 10px 5px 0px 0px;
}
.licence-img{
    text-align: center;
}
.licence-img img{
	width: 82%;
    height: 150px;
	border-radius: 5px;
	margin: 10px 5px 0px 0px;
}

.info-tags{
	width: 83%;
}
.score-right{
	position: relative;

}
.score-right:before {
    content: '';
    position: absolute;
    height: 200%;
    width: 1px;
    right: 0;
    top:0;
    border-right: 1px solid #e4e4e4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
