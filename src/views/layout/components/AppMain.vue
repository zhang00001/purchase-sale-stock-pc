<template>
  <section class="app-main">


    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
      icon:'el-icon-s-fold',
      isCollapse:true
    }
  },
  name: 'AppMain',
  computed: {
  
  },
  created(){
   

 
  },
    watch: {
   
  },
    methods: {
     
}}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
