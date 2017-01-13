<template>
<div>
	<div class="vue-slider">
    <div class="vue-silder__box">
      <div class="vue-slider__box_content">
        <div class="vue-box__hd">
          <img style="width:85px;" src="../../static/images/pic.png" alt="">  
        </div>
        <div class="vue-box__bd">
          <div class="vue-box__bd_title">
            <label class="label">红玲电动车维修店 </label>
            <span class="service">全城服务</span>
          </div> 
          <div class="vue-box__bd_content">
            <span class="star">🌟🌟🌟🌟🌟</span>
            <span class="score">5.0</span>
            <i class="discount">减</i>
            <i class="rebate">返</i>
            <em class="distance">1.1km</em>
          </div>
          <div class="vue-box__bd__location">
            <img class="location" src="../../static/images/pic-location.png" alt="">
            <p class="content">江干区秋涛路11号秋涛路11江干区秋涛路11号秋涛路11</p>
          </div>
          <p class="vue-box__bd_foot">汽车维修、电瓶车维修、汽车补胎、自行车补胎、自行车维修</p>
        </div>
      </div>
      <div class="vue-slider__box_footer">
        <div class="vue-box__btn_left">
          <img src="../../static/images/pic-order.png" alt="">
          <span>下单</span>
        </div>
        <div class="vue-box__btn_right">
          <img src="../../static/images/pic-phone.png" alt="">
          <span>电话</span>
        </div>
      </div>
    </div>
  </div>
</div>	
</template>
<script>
export default {
	name:"serviceCity"
}
</script>

<style lang="less" scoped>
.vue-slider {
  position:absolute;
  bottom:30px;
  width:100%;
  height:140px;
  background-color:transparent;
  z-index:3;
  font-size:14px;
}
.vue-silder__box {
  position:relative;
  background-color:#fff;
  width:330px;
  margin:0 auto;
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

	.vue-box__bd_title {
		.label {
	  	font-size:18px;
	  }
	  .service {
			color:#fff;
			border-radius:4px;
			padding:3px;
			display:inline-block;
			line-height:1em;
			background:linear-gradient(to right, #7424fc,#f49acd);
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
	position:relative;

	.location {
		width:14px;
		position:absolute;
		left:0;
	}
	.content {
		color:#999;
		padding-left:20px;
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
	
</style>