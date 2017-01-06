<template>
<div>
  <section>
      <ul>
        <li class="sl-li ui-border-b">
          <div class="sl-content">
            <img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" />
            <div class="call">
              <div class="call-name">肯德基姐</div>
              <div class="call-info"><img src="../../static/images/call-log.png" alt="" class="tel-img">浙江杭州 | 上午9:20</div>
            </div>
            <div class="phone-img f-right score">
              <img src="../../static/images/call-phone.png" alt="">
            </div>
            
          </div>
          <div class="sl-opts">
            <span style="background-color: #F95F61; color: #fff;">删除</span>
          </div>
        </li>
        <li class="sl-li ui-border-b">
          <div class="sl-content">
            <img src="http://img2.touxiang.cn/file/20161229/33eaaec318ed71b958ef7b4ec9966e5c.jpg" alt="" />
            <div class="call">
              <div class="call-name">肯德基姐 (2)</div>
              <div class="call-info">
                <img src="../../static/images/call-log.png" alt="" class="tel-img">
                <span>浙江杭州</span> | <span>上午9:20</span>
              </div>
            </div>
            <div class="phone-img f-right score">
              <img src="../../static/images/call-phone.png" alt="">
            </div>
            
          </div>
          <div class="sl-opts">
            <span style="background-color: #F95F61; color: #fff;">删除</span>
          </div>
        </li>
      </ul>
  </section>
</div>
</template>

<script>
import $ from 'jquery'
// 右滑效果

export default {
    data(){
        return{
          
        }            
    },
    methods: {   

    }
}
	

</script>

<style scoped>
img{
  width: 100%;
}
.f-left{
	float: left;
}
.f-right{
	float: right;
}
ul {list-style: none;}
.sl-content {
  overflow: hidden;
}
.sl-content >img {
  width: 35px;
  height:35px;
  margin-right: 16px;
  float: left;
}
.sl-li {
  height: 100%;
  position: relative;
  background-color: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
.sl-li .sl-content {
  height: 100%;
  overflow: hidden;
  padding: 13px 10px;
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.sl-li .sl-content.animated {
  -webkit-transition: -webkit-transform .2s ease-out;
  transition: transform .2s ease-out;
}
.sl-li .sl-opts {
  height: 100%;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
}
.sl-li .sl-opts span {
  height: 100%;
  padding: 0 10px;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}
.call-name{
  font-size: 15px;
  color:#333;
}
.call-info{
  font-size: 12px;
  color: #666;
}
.call{
    float: left;
    margin-top: -3px;
}
.tel-img{
    width: 14px;
    vertical-align: top;
    margin-right: 5px;
}
.phone-img{
  width: 26px;
  height: 26px;
  padding-left: 5%;
  margin-right: 5%;
  margin-top: 6px;
}
.score{
  position: relative;
}

.score:before {
  content: '';
  position: absolute;
  height: 250%;
  width: 1px;
  left: 0;
  top:-4px;
  border-left: 1px solid #ccc;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(.5,.5);
  transform: scale(.5,.5);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.sl-content:after{
  content: '';
  position: absolute;
  width: 200%;
  height: 1px;
  left:0;
  bottom: 0;
  border-bottom: 1px solid #ccc;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(.5,.5);
  transform: scale(.5,.5);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>