<template>
<div>
	<header>
		<ul class="red-state">
			<li id="unuse"  :class="{'active':flag==1}" @click="flag=1">未使用</li>
			<li style="margin-left: 13%;" id="used" :class="{'active':flag==2}" @click="flag=2">已使用</li>
			<li id="delay" :class="{'active':flag==3}"  @click="flag=3">已过期</li>

		</ul>
		<div class="clear"></div>
	</header>
	<div class="sysm"><a href="">使用说明</a></div>
	<div class="clear"></div>
	<div class="red-list">
		<div class="red-item">
            <img src="../../static/images/bg-y.png" alt="" class="bg-y">
			<div class="item-left">
				<div class="price"><span class="rmb">￥</span>
					<span class="DiscountAmount">9</span>
				</div>
				<div class="Amount">满80可用</div></div>
				<div class="item-right"><div class="red-name">闪付红包</div>
				<ul class="red-rule">
					<li class="ServiceTypes">全品类使用</li>
					<li><span class="StartTime">2016/11/12</span>至<span class="EndTime">2016/12/12</span></li>
				</ul>
			</div>
		</div>
        <div class="red-item">
            <img src="../../static/images/bg-n.png" alt="" class="bg-y">
            <div class="item-left-n">
                <div class="price"><span class="rmb">￥</span>
                    <span class="DiscountAmount">9</span>
                </div>
                <div class="Amount">满80可用</div></div>
                <div class="item-right"><div class="red-name">闪付红包</div>
                <ul class="red-rule">
                    <li class="ServiceTypes">全品类使用</li>
                    <li><span class="StartTime">2016/11/12</span>至<span class="EndTime">2016/12/12</span></li>
                </ul>
            </div>
        </div>
	</div>

	<div class="no-hb">
		<img src="../../static/images/no-hb.png" alt="">
	</div>
</div>
</template>

<style scoped>
img{
    width: 94%;
}
.clear{
	clear: both;
}
.red-state{
	position: relative;
	width: 89%;
    margin: auto;
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
    width: 23%;
    text-align: center;
    padding: 10px 0;
    color: #999;
    margin-left: 6px;
}
.red-state>li:last-child{
	float: right;
}
.active{
    border-bottom: 2px solid #27b8f3;
    color:#27b8f3;
}

.sysm a{
    float:right;
    padding-right: 8%;
    margin-top: 10px;
    color: #27b7f3;
}
.red-item{
    height: 6rem;
    width: 94%;
    margin: auto;
    margin-top: 10px;
}

.item-left,.item-left-n{
	position: relative;
	float: left;
	height: 79%;
    width: 30%;  
    margin-top: 4%; 
}
.item-left{
    color: #ff1b56;
}
.item-left-n{
    color: #888082;
}

.item-right{
    float: right;
    width: 66%;
    height: 80%;
    margin-top: 4%;
}
.item-left:before {
    content: '';
    position: absolute;
    height: 200%;
    width: 1px;
    right: 0;
    border-right: 1px dashed #ccc;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.price,.Amount{
	position: absolute;
}
.price{
    top: -17%;
    width: 100%;
    margin-left: 27%;
    text-align: center;   
}

.rmb{
    float: left;
    line-height: 5.4;
}
.DiscountAmount{
	float: left;
    font-size: 2.5rem;
    margin-top: 5px;
}
.Amount{
    bottom: 10%;
    width: 100%;
    text-align: center;
    font-size: 14px;
}
.red-name{
	color: #333;
    font-size: 1.1rem;
    font-weight: bold;
}
.red-rule{
    color: #666;
    font-size: 0.9rem;
    margin-left: 8%;
}
.no-hb{
    display: none;
    width: 35%;
    margin: auto;
    margin-top: 30%;
}
.bg-y{
    position: absolute;
    z-index: -10;
}
</style>

<script>
import $ from 'jquery';
// 头部菜单切换效果
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