# vue-zjsh
webpack2-vue2-vuex-Amap

## ui库

[weui github](https://github.com/weui/weui)

[weui io](https://weui.io)

## 如何运行项目

安装:

```
sudo yarn install
```

1.webpack打包

```bash
webpack

```
2.运行热加载模式

```bash
sudo npm run dev-hmr

```

3.在浏览器中打开

[http://localhost:8080/](http://localhost:8080/)


## 图片命名原则

图片的名称分为头尾两部分，用下划线隔开，头部分表示此图片的大类性质

- 例如：广告、标志、菜单、按钮等等。 放置在页面顶部的广告、装饰图案等长方形的图片取名： banner 
- 标志性的图片取名为：logo
- 在页面上位置不固定并且带有链接的小图片我们取名为 button 
- 在页面上某一个位置连续出现，性质相同的链接栏目的图片我们取名： menu 
- 装饰用的照片我们取名： pic
- 不带链接表示标题的图片我们取名： title  

> 范例：banner_sohu.gif  banner_sina.gif  menu_aboutus.gif  menu_job.gif  title_news.gif  logo_police.gif   logo_national.gif   pic_people.jpg 

- 鼠标感应效果图片命名规范为"图片名+_+on/off"

> 例如：menu1_on.gif  menu1_off.gif       
