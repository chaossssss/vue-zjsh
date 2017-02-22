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
				<li :class="{'active':flag==3}" @click="tab='cc',flag=3">工人</li>		
			</ul>
			<div class="clear"></div>
		</div>
		<div v-show="tab==='aa'">
			<div class="ser-list">
				<div class="ser-item score">
					<div class="ser-title f_left">新房开荒旧房开心</div>
					<div class="f_right" style="font-size:12px;"><span class="price">￥50</span>元/小时</div>
					<div class="clear"></div>
					<div class="ser-info f_left">新房开荒旧房开心新房开荒旧房开心</div>
					<div class="btn-buy f_right">购买</div>
					<div class="clear"></div>
				</div>
				<div class="ser-item score">
					<div class="ser-title f_left">小时工</div>
					<div class="btn-buy f_right mgtop0">购买</div>
					<div class="clear"></div>
					<div class="ser-info f_left">新房开荒旧房开心新房开荒旧房开心</div>
					<div class="f_right mgtop8" style="font-size:12px;"><span class="price">￥50</span>元/小时</div>
					<div class="clear"></div>
					<div class="ser-info f_left">新房开荒旧房开心新房开荒旧房开心</div>
					<div class="f_right mgtop8" style="font-size:12px;"><span class="price">￥50</span>元/小时</div>
					<div class="clear"></div>
				</div>
					
			</div>
		</div>
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
		<div v-show="tab==='cc'">
			<div class="detail-info">
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">服务信息</div>
					<div class="info-cont score">服务时间：10:00-12:00</div>
					<div class="info-cont score">工人地址：延安里延安里延安里延安里里延安里</div>
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
					<div class="info-title score">工人信息</div>
					<div class="worker-info f_left score-right">	
						<div class="worker-cont">籍贯：浙江</div>
						<div class="worker-cont">学历：大专</div>
						<div class="worker-cont">身高：190cm</div>
						<div class="worker-cont">血腥：B</div>
					</div>
					<div class="worker-info f_right">
						<div class="worker-cont">工作年限：3年</div>
						<div class="worker-cont">星　　座：处女座</div>
					</div>
					<div class="clear"></div>
					<div class="info-sign">
						<div class="signature score">个性说明：我是帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥</div>
						<div class="signature">商户介绍：我是帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥帅哥</div>
					</div>
				</div>
				<div class="line"></div>
				<div class="info-list">
					<div class="info-title score">工人照片</div>
					<div class="worker-img">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
						<img src="http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg" alt="">
					</div>
				</div>
			</div>
		</div>
	</div>

	
</div>	
</template>


<script>
export default {
    data(){
        return{
            tab:'aa',
            flag:1
        }            
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
    background: #2381C3;
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
.img-call{
    width: 20px;
    margin-top: 7%;
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

/*tab框切换*/
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


/*工人服务tab*/
.ser-item,.pingjia-item{
	padding: 13px 15px;
}

.ser-info{
	font-size: 12px;
	color:#666;
	margin-top: 10px;
}
.buy{

}
.price{
	color: #fd552e;
	font-weight: bold;
}
.btn-buy{
    border: 1px solid #fd552e;
    text-align: center;
    font-size: 14px;
    color: #fd552e;
    border-radius: 3px;
    float: right;
    padding: 0px 19px;
    margin-top: 9px;
}
.mgtop0{
	margin-top: 0;
}
.mgtop8{
    margin-top: 8px;
}


/*工人评价*/
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


/*工人tab*/
.line{
	height: 10px;
	background: #eef2f5;
}
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
