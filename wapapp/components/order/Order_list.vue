<template>
<div class="page tabbar">
	   <h2 @click="test">Index for click</h2>
     
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name:"order",
  computed:mapState({
    data:state => state.database.data.length
  }),
  methods:{
    test(){
       this.$store.dispatch('addInfo',{text:'aaa'}); 
    }
  }
}
</script>