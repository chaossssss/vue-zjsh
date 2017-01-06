<template>

	<div class="vue-search-bar" id="searchBar">
      <form class="vue-search-bar__form">
          <div class="vue-search-bar__box">
              <i class="vue-icon-search"></i>
              <input type="search" class="vue-search-bar__input" id="searchInput" placeholder="搜索" required="">
              <a href="javascript:" class="vue-icon-clear" id="searchClear"></a>
          </div>
      </form>
      <a href="javascript:" class="vue-search-bar__cancel-btn" id="searchCancel">取消</a>
  </div>
	
</template>

<script>
export default {
	name:"search"
}

</script>

<style lang="less" scoped>

.setBottomLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid @c;
    color: @c;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
}

.vue-search-bar {
	position:relative;
	padding:8px 10px;
	display:flex;
	box-sizing:border-box;
	background-color:#fff;
	
	&:after {
		.setBottomLine(#D7D6DC);
	}
	&.weui-search-bar_focusing {
		.weui-search-bar__cancel-btn {
			display:block;
		}
		.weui-search-bar__label {
			display:none;
		}
	}
}

.vue-search-bar__form {
	position:relative;
	flex:auto;
	background-color:#eff0f2;
	border-radius:50%;

	&:after {
		content:" ";
		position:absolute;
		left:0;
		top:0;
		width:200%;
		height:200%;
		transform:scale(.5);
		transform-origin:0 0;
		border-radius:10px;
		border:1px solid #eeeff1;
		box-sizing:border-box;
		background:#fff;

	}
}
	
	
</style>

