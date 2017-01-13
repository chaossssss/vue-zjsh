<!-- <template>
<div style="background: #eee;height:100%">
	<div class="price-list">
		<div class="weui-flex">
	        <div class="weui-flex__item"><div class="placeholder">10元</div></div>
	        <div class="weui-flex__item"><div class="placeholder">20元</div></div>
	        <div class="weui-flex__item"><div class="placeholder">30元</div></div>
	        <div class="weui-flex__item"><div class="placeholder">50元</div></div>
	        <div class="weui-flex__item"><div class="placeholder">100元<p class="give-price">赠送10元</p></div></div>
	        <div class="weui-flex__item"><div class="placeholder">500元<p class="give-price">赠送80元</p></div></div>
	    </div>	
	</div>
	
</div>	
</template>

<script>
export default {
    data(){
        return{
            flag: 1,
            items:{
            	[price:'10',give-price:'0'],
            	[price:'20',give-price:'0'],
            	[price:'30',give-price:'0'],
            	[price:'50',give-price:'0'],
            	[price:'100',give-price:'10'],
            	[price:'500',give-price:'80']
            }
        }            
    },
    methods: {   
    }
}	
</script>

<style scoped>
.price-list{
	/*padding: 16px;*/
}
.weui-flex{
	text-align: center;
}
.weui-flex__item{
	position: relative;
	margin:9px;
	height: 80px;
	background: #fff;
	border:1px solid #ccc;
	border-radius: 8px;
    line-height: 80px;
    font-size: 20px;
    color:#333;
    font-weight: bold;
}
.give-price{
	position: absolute;
	line-height: 0;
	font-size: 12px;
	color: #999;
	bottom: 16px;
	width: 100%;
}
.active{
	border:1px solid #27b7f3;
	color:#27b7f3;
}
</style> -->