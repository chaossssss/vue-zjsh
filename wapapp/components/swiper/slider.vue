<style>
.slider-container {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  z-index: 1;
  /*height: 400px;*/
  margin: 0 auto;
  width: 100%;
}
.slider-wrapper {
  box-sizing: content-box;
  /*display: flex;*/
  height: 100%;
  position: relative;
  transition-property: transform;
  width: 100%;
  z-index: 1;
  display: box;              /* OLD - Android 4.4- */
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
  /* 09版 */
  -webkit-box-orient: horizontal;
  /* 12版 */
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
}
.slider-item {
    flex-shrink: 0;
    height: 100%;
    position: relative;
    width: 100%;
}
.slider-item {
    /*align-items: center;*/
    background: #fff none repeat scroll 0 0;
    display: flex;
    font-size: 40px;
    justify-content: center;
    /*text-align: center;*/
    /*color: #fff;*/
}
.slider-item {
    background-position: center center!important;
    background-size: cover!important;
}
.animation-ease {
    -webkit-transition: -webkit-transform 350ms cubic-bezier(.165, .84, .44, 1);
    transition: transform 350ms cubic-bezier(.165, .84, .44, 1);
}
.slider-pagination {
    position: absolute;
    text-align: center;
    transform: translate3d(0px, 0px, 0px);
    /*transition: all 350ms ease 0s;*/
    z-index: 10;
}
.slider-pagination-bullets{
    bottom: 10px;
    left: 0;
    width: 100%;
}
.slider-pagination-bullet{
    background: #000 none repeat scroll 0 0;
    border-radius: 100%;
    display: inline-block;
    height: 8px;
    opacity: 0.2;
    width: 8px;
    cursor: pointer;
    margin: 0 5px;
}
/*移动端优化*/
 @media screen and (max-width:414px) {
    .slider-container {
    height: 152px;
    margin: 0 auto;
    width: 100%;
    }
}
</style>
<template>
  <div class='slider-container' :class = 'basicdata.containerClass'>
    <div class="slider-wrapper"
    :style="styleobj"
    :class="basicdata.animation"
    @touchmove="swipeMove"
    @touchstart="swipeStart"
    @touchend="swipeEnd"
    @mousedown="swipeStart"
    @mouseup="swipeEnd"
    @mousemove="swipeMove"
    >
    <!-- 正常滚动 -->
     <template  v-if="!sliderinit.loop">
      <slot name="item" :item="item" v-for="item in pages">
        <div class="slider-item" :style="item.style">
        <!-- {{item.title}}+{{index}} -->
        </div>
      </slot>
     </template>
      
      <!-- 无缝滚动 -->
       <template  v-if="sliderinit.loop">
        <div class="slider-item" :style="pages[pages.length-1].style">{{pages[pages.length-1].title}}</div>
         <slot name="item"  v-for="item in pages">
          <div class="slider-item" :style="item.style">{{item.title}}</div>
         </slot>
        <div class="slider-item" :style="pages[0].style">{{pages[0].title}}</div>
       </template>
    </div>
    <!-- <div class="slider-pagination slider-pagination-bullets">
       <template v-for="n in pagenums">
         <span @click='slide(n-1)' class="slider-pagination-bullet" :class="n-1 == sliderinit.currentPage ? 'slider-pagination-bullet-active':''"></span>
      </template>
    </div> -->
  </div>
</template>
<script>
export default {
   name:"slider",
   props: ['sliderinit', 'pages'],
   data(){
    return {
      basicdata:{
          poswidth:'0',
          posheight:'0',
          start: {},
          end: {},
          tracking: false,
          animation:{
            'animation-ease':false,
          },
          containerClass:{
            'swiper-container-vertical':false,
          },
          setIntervalid:'',
        }
      }
    },
   computed:{
      // 动画执行obj
      styleobj: function () {
        return {'transform': 'translate3D(' + this.basicdata.poswidth + ',' + this.basicdata.posheight + ',0)'}
      },
      // pagenum滑动数
      pagenums: function(){
        return this.pages.length
      },
      // 组件的核心，计算当前父级需要进行的偏移,每次要遍历节点,应该直接储存节点，提高性能
      currentWidth:{
        get:function(){
          // console.log("this",this.$el.children);
          let poswidth = 0;
          let $slider;  
          let lastPage = this.sliderinit.currentPage-1;
          let srollbar = false;
          // loop 循环情况
          if(this.sliderinit.loop){
            lastPage = this.sliderinit.currentPage;
          }
          // 获取slideritem子集
          for(let item in this.$el.children){
            if(/slider-wrapper/ig.test(this.$el.children[item].className)){
               $slider = this.$el.children[item]
            }
          }
           // 遍历子集 得到移动的距离(宽度+左外边距+右外边距)
           // console.log("$slider",$slider.children);
          let $sliderChildren  = $slider.children;
          for(let item in $sliderChildren){
            if(item <= lastPage){
              // 找到实际宽度clientWidth+外边距
              poswidth += $sliderChildren[item].offsetWidth;
              poswidth += parseInt($sliderChildren[item].style.marginRight.length?$sliderChildren[item].style.marginRight:0,10);
              poswidth += parseInt($sliderChildren[item].style.marginLeft.length?$sliderChildren[item].style.marginLeft:0,10);
            }
            // console.log("poswidth",poswidth);
          }
          return poswidth
        },
       set:function(value){
        return value;
       }
      },
      currentHeight:function(){
        let posheight = 0;
        let $slider;
        let lastPage = this.sliderinit.currentPage-1;
        let srollbar = false;
        if(this.sliderinit.loop){
          lastPage = this.sliderinit.currentPage;
        }
        // 获取slideritem子集
        for(let item in this.$el.children){
          if(/slider-wrapper/ig.test(this.$el.children[item].className)){
             $slider = this.$el.children[item]
          }
        }
         // 遍历子集
        let $sliderChildren  = $slider.children;
        for(let item in $sliderChildren){
          if(item <= lastPage){
            // 找到实际宽度clientWidth+外边距
            posheight += $sliderChildren[item].offsetHeight;
            posheight += parseInt($sliderChildren[item].style.marginTop.length?$sliderChildren[item].style.marginTop:0);
            posheight += parseInt($sliderChildren[item].style.marginBottom.length?$sliderChildren[item].style.marginBottom:0);
          }
        }
        return posheight
      }
   },
  mounted () {
    let that = this;
    //起始跳到指定页 更新为无样式的了,更符合常理
    that.slide(this.sliderinit.currentPage,'animationnone')
    // 定制事件
    // 滑动到第几页
    that.$on('slideTo', (num) => {
        this.slide(num);
    });
    // 滑动到下一页
    that.$on('slideNext', () => {
        this.next();
    });
    // 滑动到上一页
    that.$on('slidePre', () => {
        this.pre();
    });
    //自动轮播 支持无缝滚动
    that.clock().begin(that);
    // 设定垂直轮播class
    if(this.sliderinit.direction == 'vertical'){
      this.basicdata.containerClass['swiper-container-vertical'] = true;
    };
   },
   methods:{
    swipeStart (e) {
      let that = this ;
      this.basicdata.animation['animation-ease'] = false;
      // 暂停自动滚动
      if(this.sliderinit.autoplay){
        let that = this;
        this.clock().stop(that);
      }
      // 阻止页面滚动
      document.addEventListener('touchmove',that.preventDefault(e));
      if (e.type === 'touchstart') {
          if (e.touches.length>1) {
            this.basicdata.tracking = false;
              return;
          } else {
            this.basicdata.tracking = true;
                  /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
            this.basicdata.start.t = new Date().getTime();
            this.basicdata.start.x = e.targetTouches[0].clientX;
            this.basicdata.start.y = e.targetTouches[0].clientY;
            this.basicdata.end.x = e.targetTouches[0].clientX;
            this.basicdata.end.y = e.targetTouches[0].clientY;
          }
      } else {
              this.basicdata.tracking = true;
              /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
              this.basicdata.start.t = new Date().getTime();
              this.basicdata.start.x = e.clientX;
              this.basicdata.start.y = e.clientY;
              this.basicdata.end.x = e.clientX;
              this.basicdata.end.y = e.clientY;
          }
      },
      swipeMove (e) {
          if (this.basicdata.tracking) {
              if (e.type === 'touchmove') {
                  e.preventDefault();
                  this.basicdata.end.x = e.targetTouches[0].clientX;
                  this.basicdata.end.y = e.targetTouches[0].clientY;
              } else {
                  e.preventDefault();
                  this.basicdata.end.x = e.clientX;
                  this.basicdata.end.y = e.clientY;
              }
              if(this.sliderinit.direction == 'vertical'){
                this.basicdata.posheight = -(this.currentHeight) + this.basicdata.end.y - this.basicdata.start.y  + 'px';
                return
              }
              this.basicdata.poswidth = -(this.currentWidth) + this.basicdata.end.x - this.basicdata.start.x  + 'px';
          }
      },
      swipeEnd (e) {
          let that = this;
          this.basicdata.tracking = false;
          let now = new Date().getTime();
          let deltaTime = now - this.basicdata.start.t;
          let deltaX = this.basicdata.end.x - this.basicdata.start.x;
          let deltaY = this.basicdata.end.y - this.basicdata.start.y;
          // 自动滚动重启
          if(this.sliderinit.autoplay){
            let that = this;
            setTimeout(function(){
            that.clock().begin(that);
            },350);
          };
          // 解除阻止
          document.removeEventListener('touchmove',that.preventDefault(e));
          /* work out what the movement was */
          if (deltaTime > this.sliderinit.thresholdTime) {
              this.slide(this.sliderinit.currentPage);
              /* gesture too slow */
              return;
          } else if (this.sliderinit.direction != 'vertical'){
              if ((deltaX > this.sliderinit.thresholdDistance)&&(Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                  //swipe right
                  this.pre();
                  return
              } else if ((-deltaX > this.sliderinit.thresholdDistance)&&(Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                  //swipe left
                  this.next();
                  return
              } else {
                 this.slide(this.sliderinit.currentPage);
                  return
              }
              // 垂直判定
          }else{
              if ((deltaY > this.sliderinit.thresholdDistance)&&(Math.abs(deltaX) < this.sliderinit.thresholdDistance)) {
                  //swipe right
                  this.pre();
                  return
              } else if ((-deltaY > this.sliderinit.thresholdDistance)&&(Math.abs(deltaX) < this.sliderinit.thresholdDistance)) {
                  //swipe left
                  this.next();
                  return
              } else {
                 this.slide(this.sliderinit.currentPage);
                  return
              }
          }
      },
      pre () {
           if (this.sliderinit.currentPage != 0) {
            this.sliderinit.currentPage -= 1;
            this.slide();
           } else if(this.sliderinit.loop) {
             this.sliderinit.currentPage -= 1;
             this.slide(this.sliderinit.currentPage,'loop');
           }else{
            this.slide();
           }
      },
      next () {
         if (this.sliderinit.currentPage != this.pagenums - 1) {
          this.sliderinit.currentPage += 1;
          this.slide();
         } else if(this.sliderinit.loop) {
          this.sliderinit.currentPage += 1;
          this.slide(this.sliderinit.currentPage,'loop');
         }else{
          this.slide();
         }
      },
      slide(pagenum,type){
        let that = this;
        //执行动画
        this.basicdata.animation['animation-ease'] = true;
        // 无样式滚动
        if(type =='animationnone'){
          this.basicdata.animation['animation-ease'] = false;
        }
        if(pagenum||pagenum == 0){
          this.sliderinit.currentPage = pagenum;
        }
        // 增加垂直滚动判定
        if(this.sliderinit.direction == 'vertical'){
          this.basicdata.posheight = -this.currentHeight + 'px';
        }else{
          this.basicdata.poswidth = -this.currentWidth + 'px';
        }
        //下面350定时写死了，下次更新会提供API修改
        if(type == 'loop'){
          setTimeout(function(){
            if(that.sliderinit.currentPage == -1){
              that.slide(that.pagenums-1,'animationnone');
            }else{
              that.slide(0,'animationnone');
            }
          },200);
          // 不传递广播事件
          return
        }
        // 广播事件
        this.$emit('slide',this.sliderinit.currentPage)
      },
      clock:function(){
        // 暂时这么写，写了自调用，但是vue不支持，欢迎小伙伴提供新的思路
        return {
          begin:function(that){
           if(that.sliderinit.autoplay){
            that.setIntervalid = setInterval(function(){
            that.next();
            if(that.sliderinit.currentPage == that.pagenums - 1&&!that.sliderinit.loop){
              clearInterval(that.setIntervalid)
            }
            }, that.sliderinit.autoplay);
            }
          },
          stop:function(that){
            clearInterval(that.setIntervalid)
          },
          }
      },
      // 阻止页面滚动
      preventDefault(e){
        e.preventDefault();
      }
   }
}
</script>