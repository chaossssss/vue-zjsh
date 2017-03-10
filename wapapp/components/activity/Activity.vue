<template>
<div>
    <p class="vue-banner" v-for="item in list">
      <a :href="item.ObjectApns.Url">
        <img class="vue-banner__item" :src="item.ImageUrl" alt="">
      </a>
    </p>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
      <span class="vue-loader" slot="no-results">没有更多信息了</span>
    </infinite-loading>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import image from "../../static/images/activity-02.png";
import API from '../../config/backend';
import axios from 'axios';

export default {
	name:'activity',
  data() {
    return {
      list: []
    };
  },
  methods: {
    async onInfinite() {
      await axios.get(API.GetAds, JSON.stringify({}),{
        headers: {'Content-Type':'application/json;charset=utf-8'}
      }).then((res)=>{
        // console.log(res.data.Body);
        if(res.data.Body && res.data.Body.Ads){
          this.list = this.list.concat(res.data.Body.Ads);
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        }
      });
      // await axios.get(API.GetAds).then((res) => {
      //   console.log(res.data.Body);
      //   if(res.data.Body && res.data.Body.Ads){
      //     this.list = this.list.concat(res.data.Body.Ads);
      //     this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
      //   }
      // })
    }
  },
  components:{InfiniteLoading}
}
</script>

<style lang="less" scoped>
.vue-banner {
  margin:15px 0;

  .vue-banner__item {
    display:block;
    width:92%;
    height:150px;
    margin:0 auto;
  }
}

.vue-banner__item_off {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);

  filter: gray;
}

.vue-loader {
  color:#999;
}


</style>