<template>
<div>
	<div class="vue-slider">
    <div class="vue-silder__box">
      <div class="vue-slider__box_content">
        <div class="vue-box__hd"> 
          <img style="width:85px;height:85px;position:relative;" :src="msg.Photo" alt="">  
        </div>
        <div class="vue-box__bd">
          <div class="vue-box__bd_title">
            <label class="label">{{msg.Name}} </label>
            <span class="privacy" :class="[msg.Gender ==='1' ? 'blue' : 'pink']">
            	<span v-show="msg.Gender ==='1'">男</span>
              <span v-show="msg.Gender ==='0'">女</span>
            	<span>{{msg.Age}}</span>
            </span>
            <span class="price">
							<span class="unit">{{msg.ServicePrice}}</span>
							<!-- <span>起</span> -->
            </span>
          </div> 
          <div class="vue-box__bd_content">
            <span class="star">🌟🌟🌟🌟🌟</span>
            <span class="score">{{msg.Grade}}</span>
            <i class="discount" v-show="msg.IsReduction === '1'">减</i>
            <i class="rebate" v-show="msg.IsReturn === '1'">返</i>
            <em class="distance">{{msg.Distance}}</em>
          </div>
          <div class="vue-box__bd__location">
            <p class="content">
            	<span>籍贯:{{msg.NativePlace}}</span> 
            	&nbsp;
            	<span>从业:{{msg.WorkingYears}}</span>  	
            </p>
          </div>
          <p class="vue-box__bd_foot"><span style="margin-right:10px;" v-for="item in msg.ServiceTypes">{{item.Name}}</span></p>
        </div>
      </div>
      <div class="vue-slider__box_footer">
        <div @click="routeToOrder" class="vue-box__btn_left">
          <img src="../../static/images/pic-order.png" alt="">
          <span>下单</span>
        </div>
        <a :href="phoneNumber" class="vue-box__btn_right">
          <img src="../../static/images/pic-phone.png" alt="">
          <span style="color:#000">电话</span>
        </a>
      </div>
    </div>
  </div>
</div>	
</template>
<script>
export default {
	name:"serviceWorker",
  props: ['msg'],
  data(){
    return {

    }
  },
  computed:{
    phoneNumber(){
      return "tel:"+this.msg.PhoneNumber;
    },
    pointShop(){
      return this.$store.state.pointShop;
    }
  },
  methods:{
    routeToOrder(){
      this.pointShop.ObjectId = this.msg.Id;
      if(this.msg.Belong === 0){
        this.pointShop.ObjectType = '1';
      }
      this.setPointShop();
      this.$router.push({path:'/point_order'});
    },
    setPointShop(){
      this.$store.dispatch('setPointShop',{
        txt:this.pointShop
      });
    }
  }
}
</script>

<style lang="less" scoped>
.vue-slider {
 
  height:140px;
  background-color:transparent;
  z-index:3;
  font-size:14px;
}
.vue-silder__box {
  position:relative;
  background-color:#fff;
  width:330px;

  box-shadow:0 0 10px -2px rgba(34,48,59,0.33);

  &:before {
    content:" ";
    width:200%;
    height:200%;
    position:absolute;
    left:0;
    top:0;
    border:1px solid rgba(0, 0, 0, 0.2);
    transform:scale(0.5);
    transform-origin:0 0;
    box-sizing:border-box;
    border-radius:3px;
  }
}
.vue-slider__box_content {
  position:relative;
  display:flex;
  align-items:center;
  padding:10px;

  &:before {
    content:" ";
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    border-bottom:1px solid rgba(0, 0, 0, 0.2);
    color:#D9D9D9;
    transform:scaleY(0.5);
    transform-origin:0 0;

  }  
}
.vue-box__bd {
  flex:1;
  overflow:hidden;
  padding-left:10px;
}
.vue-box__bd_title {
  position:relative;

	.label {
    color:#000;
  	font-size:18px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    max-width:100px;
    display:inline-block;
    line-height:1.1em;
  }
  .privacy {
    position:absolute;
    top:0;
    margin-left:10px;
    line-height:1.1em;
  	color:#fff;
  	padding:2px;
  	
  	border-radius:3px;
  }

  .blue {
    background-color:#14aef5;
  }
  .pink {
    background-color:#f65a7e;
  }

  .price {
		float:right;
    line-height:1.3em;
		color:#fd552e;
	
		.unit {
			font-size:18px;
		}

  }
}
.vue-box__bd_content {
	color:#666;

	.score {
		color:#fd552e;
	}
	.discount {
		background-color:#ff5c5b;
		color:#fff;
		border-radius:3px;
		font-style:normal;
		padding:0 1px;
	}
	.rebate {
		background-color:#ffa229;
		color:#fff;
		border-radius:3px;
		font-style:normal;
		padding:0 1px;
	}
	.distance {
		float:right;
		font-style:normal;
	}
}
.vue-box__bd__location {

	.content {
		color:#999;
		width:90%;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
}
.vue-box__bd_foot {
	color:#666;
	width:100%;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}

.vue-slider__box_footer {
  display:flex;
  align-items:center;
  text-align:center;
  padding:8px;

  .vue-box__btn_left {
    &:after {
      position:absolute;
      content:" ";
      top:0;
      right:0;
      height:100%;
      border-right:1px solid rgba(0, 0, 0, 0.2);
      transform:scaleX(0.5);
    }
  } 
}
.vue-box__btn_left,
  .vue-box__btn_right {
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;

    img {
      width:18px;
      height:18px;
      margin-right:10px;
    }
    span {

    }
  }
img:after { 
  content: url('../../static/images/pic.png');
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width:85px;
  height:85px;
  overflow:hidden;
  background-color: #fff;
}	
</style>