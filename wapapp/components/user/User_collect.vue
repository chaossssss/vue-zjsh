<template>
<div>
	<header>
		<ul class="red-state">
			<li :class="{'active':flag==1}" @click="flag=1">工人收藏(1)</li>
			<li :class="{'active':flag==2}" @click="flag=2">商户收藏(2)</li>
		</ul>
		<div class="clear"></div>
	</header>
	<div style="display:none;" :class="{'workers':flag==1}">1111</div>
	<div style="display:none;" :class="{'busniess':flag==2}">22222</div>
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
.workers,.busniess{
	display: block;
}
</style>