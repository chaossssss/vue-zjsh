<template>
<div>
	<header>
		<ul class="red-state">
			<li :class="{'active':flag==1}" @click="flag=1">工人收藏(<span class="worker-nums">1</span>)</li>
			<li :class="{'active':flag==2}" @click="flag=2">商户收藏(<span class="bus-nums">2</span>)</li>
		</ul>
		<div class="clear"></div>
	</header>
	<!-- 工人收藏 -->
	<div v-if="flag==1">
		<!-- <div class="no-shoucang">
			<img src="../../static/images/no-shoucang.png" alt="">
			<p style="font-size:18px;color:#3f3e48;">没有收藏</p>
			<p style="font-size:13px;color:#8c8a9f;margin-top:10px;">您的收藏夹空空<br>赶紧去地图找喜欢的工人收藏吧</p>
		</div> -->
		<router-link to="">
			<div class="weui-cell">
	            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
	                <img src="http://img22.mtime.cn/up/2010/07/12/172120.79503515_500.jpg" class="head-img">
	            </div>
	            <div class="weui-cell__bd">
	                <div style="margin-top: 2px;">
	                	<div>
	                		<span class="name f-left">肯德鸡姐</span>
	                		<div class="info-datas f-left">
	                			<img src="../../static/images/dianzan.png" alt="" class="icons">
		                		<span class="dianzan">321</span>
		                		<img src="../../static/images/shoucang.png" alt="" class="icons">
		                		<span class="shoucang">123</span>
		                		<img src="../../static/images/pingfen.png" alt="" class="icons">
		                		<span class="shoucang">5.0</span>
	                		</div>
	                	</div>
	                	<div class="clear"></div>
	                	<div class="info">
	                		<span class="info-name">小时工</span>
	                		<span class="info-add">浙江籍</span>
	                		<span class="info-times">从业6年</span>
	                		<img src="../../static/images/right_gray.png" alt="" class="right_gray">
	                	</div>
	                	<div>
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                	</div>
	                </div>               
	            </div>
	        </div>
	    </router-link>
	    <router-link to="">
			<div class="weui-cell">
	            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
	                <img src="http://img22.mtime.cn/up/2010/07/12/172120.79503515_500.jpg" class="head-img">
	            </div>
	            <div class="weui-cell__bd">
	                <div style="margin-top: 2px;">
	                	<div>
	                		<span class="name f-left">肯德鸡姐</span>
	                		<div class="info-datas f-left">
	                			<img src="../../static/images/dianzan.png" alt="" class="icons">
		                		<span class="dianzan">321</span>
		                		<img src="../../static/images/shoucang.png" alt="" class="icons">
		                		<span class="shoucang">123</span>
		                		<img src="../../static/images/pingfen.png" alt="" class="icons">
		                		<span class="shoucang">5.0</span>
	                		</div>
	                	</div>
	                	<div class="clear"></div>
	                	<div class="info">
	                		<span class="info-name">小时工</span>
	                		<span class="info-add">浙江籍</span>
	                		<span class="info-times">从业6年</span>
	                		<img src="../../static/images/right_gray.png" alt="" class="right_gray">
	                	</div>
	                	<div>
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                	</div>
	                </div>               
	            </div>
	        </div>
	    </router-link>
	</div>
	<!-- 商户收藏 -->
	<div v-if="flag==2">
<!-- 		<div class="no-shoucang">
			<img src="../../static/images/no-shoucang.png" alt="">
			<p style="font-size:18px;color:#3f3e48;">没有收藏</p>
			<p style="font-size:13px;color:#8c8a9f;margin-top:10px;">您的收藏夹空空<br>赶紧去地图找喜欢的商户收藏吧</p>
		</div> -->
		<router-link to="">
			<div class="weui-cell">
	            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
	                <img src="http://img22.mtime.cn/up/2010/07/12/172120.79503515_500.jpg" class="head-img">
	            </div>
	            <div class="weui-cell__bd">
	                <div style="margin-top: 2px;">
	                	<div>
	                		<span class="name f-left">杭州万象城迪凯国际</span>
	                	</div>
	                	<div class="clear"></div>
	                	<div class="info">
	                		<span class="info-name f-left">小时工</span>
	                		<img src="../../static/images/right_gray.png" alt="" class="right_gray f-right">
							<div class="info-datas-bs f-right">
	                			<img src="../../static/images/dianzan.png" alt="" class="icons">
		                		<span class="dianzan">321</span>
		                		<img src="../../static/images/shoucang.png" alt="" class="icons">
		                		<span class="shoucang">123</span>
		                		<img src="../../static/images/pingfen.png" alt="" class="icons">
		                		<span class="shoucang">5.0</span>
	                		</div>
	                		
	                	</div>
	                	<div class="clear"></div>
	                	<div>
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                		<img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" class="icon-img">
	                	</div>
	                </div>               
	            </div>
	        </div>
	    </router-link>
	</div>
</div>
</template>

<script>
export default {
    data(){
        return{
            flag: 1
        }            
    },
    methods: {   
    }
}
</script>

<style scoped>
.f-left{
	float: left;
}
.f-right{
	float:right;
}
.weui-cell{
	border-bottom: 1px solid #F3F0F0;
}
.clear{
	clear: both;
}
.red-state{
	position: relative;
}
header{
	position: relative;
}

header:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 1px;
    bottom: 0;
    border-bottom: 1px solid #ccc;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.red-state>li{
    display: inline-block;
    width: 50%;
    text-align: center;
    padding: 8px 0;
    color: #999;
}
.red-state>li:last-child{
	float: right;
}
.active{
    border-bottom: 2px solid #27b8f3;
    color:#27b8f3 !important;
}
.head-img{
	width:60px;
	height: 60px;
	display: block;
	border-radius: 10px;
}
.name,.info{
	color:#3f3e48;
}

.info-datas{
	margin-top: -3px;
    margin-left: 7%;
}
.info-datas-bs{
	margin-top: -2px;
    margin-right: 7%;
}
.name{
	font-size: 15px;
}
.info{
	font-size: 13px;
}
.icon-img{
	width: 15px;
}
.info-name,.info-add,.info-times{
	margin-right: 5px;
}
.icons{
	width: 12px;
	vertical-align: text-bottom;
}
.dianzan,.shoucang,.pingfen{
	font-size: 12px;
	color: #8c8a9f;
}
.right_gray{
    width: 0.5rem;
    margin-top: 4px;
}
.no-shoucang{
    text-align: center;
    margin-top: 40%;
}
.no-shoucang img{
    width: 24%;
}
</style>