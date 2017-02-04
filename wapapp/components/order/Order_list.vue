<template>
<div class="page tabbar">
	   <h2 @click="test">Index for click</h2>
     

    <slider :pages="someList" :sliderinit="sliderinit" @slide='slide'>
      <template slot="item" scope="props">
        <div class="slider-item" style="background:red;">
            <span>{{props.item.title}}</span>
        </div>
      </template>
    </slider>
  <div class="sliderButton">
    <button @click="slidePre">上一页</button>
    <button @click="slideNext">下一页</button>
    <button @click="appendslider">添加一页</button>
    <button @click="turnTo(2)">跳转到第三页</button>
  </div>


  <slider :pages="someList" :sliderinit="sliderinit" @slide='slide'>
    <template slot="item" scope="props">
        <div class="slider-item" style="background:red;">
            <span>{{props.item.title}}</span>
        </div>
      </template>
  </slider>
  <div class="sliderButton">
  <button @click="slidePre">上一页</button>
  <button @click="slideNext">下一页</button>
  <button @click="appendslider">添加一页</button>
  <button @click="turnTo(2)">跳转到第三页</button>

    
</div>
</template>

<script>
import { mapState } from 'vuex';
import slider from '../swiper/slider.vue';
export default {
	name:"order",
  data(){
    return {
      someList:[
          {
              title: 'slide1',
              style:{
                   'background':'#1bbc9b',
              },
          },
          {
              title: 'slide2',
              style:{
                   'background':'#4bbfc3',
              },
          },
          {
              title: 'slide3',
              style:{
                   'background':'#7baabe',
              },
          }
      ],
      sliderinit: {
        currentPage: 1,
        start: {},
        end: {},
        tracking: false,
        thresholdTime: 500,//滑动判定距离
        thresholdDistance: 100,//滑动判定时间
        loop:true,//无限循环
      }
    }
  },
  computed:mapState({
    data:state => state.database.data.length
  }),
  methods:{
    test(){
       this.$store.dispatch('addInfo',{text:'aaa'}); 
    },
    turnTo (num) {
        // 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
        this.$children[0].$emit('slideTo', num);
        console.log(this);
    },
    slideNext () {
        this.$children[0].$emit('slideNext');
    },
    slidePre () {
        this.$children[0].$emit('slidePre');
    },
    appendslider(){
        this.someList.push({
            title: 'slidernew',
            style:{
                background:'#333',
                color:'#fff'
            }
        });
    },
    // 监听事件也发生了变化,需要指向一个子组件实例
    slide(pagenum){
        console.log(pagenum);
    }
  },
  components:{slider}
}
</script>
<style scoped>
.sliderButton{
    text-align: center;
}
.sliderButton button{
    display: inline-block;
    background: #fff;
    border-radius: 3px;
/*    width: 100px;*/
    height: 30px;
    border: 1px solid #333;
    line-height: 30px;
    margin-left: 10px;
    padding: 0 15px;
     margin-top: 10px;
}
</style>