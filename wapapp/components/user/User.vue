<template>
<div>
    
	<div class="weui-cells" style="margin-top:10px;padding: 15px 0px;">
        <router-link to="/user_info">
            <div class="weui-cell">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" style="width: 50px;display: block;border-radius: 25px;" class="bor-radius25">
                </div>
                <div class="weui-cell__bd">
                    <p style="color:#33363b;">肯德基爷爷</p>
                    <p style="font-size: 14px;color: #888888;">13148366695</p>
                </div>
                <div class="weui-cell_ft" style="font-size: 12px;color: #888888;">
                    个人信息　<img src="../../static/images/right_gray.png" alt="" class="right_gray">
                </div>
            </div>
        </router-link>
    </div>
    
    <div class="weui-cells" style="padding: 12px;margin-top: 0.5em;">
        <div class="weui-flex">
            <div class="weui-flex__item score">
                <router-link to="/user_wallet">
                    <div class="placeholder"><img src="../../static/images/my_account.png" alt=""></div>
                    <div class="item-name">我的帐户</div>
                </router-link>
            </div>
            
            <div class="weui-flex__item score">
                <router-link to="/user_discount">
                    <div class="placeholder"><img src="../../static/images/my_red_packet.png" alt=""></div>
                    <div class="item-name">我的红包</div>
                </router-link>
            </div>
            
            <div class="weui-flex__item">
                <router-link to="/user_collect">
                    <div class="placeholder"><img src="../../static/images/my_collect.png" alt=""></div>
                    <div class="item-name">我的收藏</div>
                </router-link>
            </div>
        </div>
    </div>
	<div class="weui-cells mt15" style="margin-top: 0.5em;font-size:14px;color:#333639;">
        <router-link class="list-item weui-cell_access" to="javascript:;">
            <div class="weui-cell__bd">
                <p>服务地址</p>
            </div>
            <div class="weui-cell__ft"></div>
        </router-link>
        <router-link class="list-item weui-cell_access" to="/call_log">
            <div class="weui-cell__bd">
                <p>通话记录</p>
            </div>
            <div class="weui-cell__ft"></div>
        </router-link>
        <router-link class="list-item weui-cell_access" to="/user_feedback">
            <div class="weui-cell__bd">
                <p>我的评价</p>
            </div>
            <div class="weui-cell__ft"></div>
        </router-link>
    </div>
    <div class="weui-cells mt15" style="margin-top: 0.5em;font-size:14px;color:#333639;">
        <router-link class="list-item weui-cell_access" to="/user_award">
            <div class="weui-cell__bd">
                <p>推荐有奖</p>
            </div>
            <div class="weui-cell__ft"></div>
        </router-link>
        <router-link class="list-item weui-cell_access" to="/invite_code">
            <div class="weui-cell__bd">
                <p>填写邀请码</p>
            </div>
            <div class="weui-cell__ft"></div>
        </router-link>
    </div>
    <div class="footer">
        <p class="tel">客服电话：<a href="tel:4008-026-056" style="color:#26b8f3;">4008-026-056</a></p>
        <p class="ser-time">服务时间：每天9:00-21:00</p>
    </div>
    
</div>
</template>

<script>
export default {
	name:"user"
}
</script>

<style scoped>
.mt10 {
	margin-top:10px;
}
.mt15 {
	margin-top:15px;
}
.my-items li{
    width: 32%;
    height:20px;
    background: red;
}
.placeholder{
    width: 27%;
    margin: auto;
}
.placeholder img{
    width: 100%;
}
.item-name{
    text-align: center;
    font-size: 12px;
    color: #666;
}
.score{
    position: relative;
}
.score:before {
    content: '';
    position: absolute;
    height: 200%;
    width: 1px;
    right: 0;
    border-right: 1px solid #e5eaee;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.right_gray{
    width: 8%;
    float: right;
    margin-top: 3px;
}
.list-item{
    padding: 19px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.list-item:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 1px;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #eef2f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.footer{
    color: #999;
    padding: 20px 10px;
    text-align: center;
}
.tel{
    font-size: 13px;
}
.ser-time{
    font-size: 12px;
}
</style>