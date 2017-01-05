<template>
	<div id="app">

  	<transition name="bounce">
			<router-view></router-view>
    </transition>

	</div>
</template>

<script>
export default {
  name:"app"
}
</script>

<style>
  html,body {
    height: 100%;
  }
  #app {
    height: 100%;
  }

	.bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    /* animation: bounce-out 60ms; */
  }
  @keyframes bounce-in {
    0% {
      -webkit-transform: translate3d(100%,0,0);
      transform: translate3d(100%,0,0);
    }
    100% {
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }
  }
  @keyframes bounce-out {
    0% {
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }
    100% {
      -webkit-transform: translate3d(100%,0,0);
      transform: translate3d(-100%,0,0);
    }
  }
</style>