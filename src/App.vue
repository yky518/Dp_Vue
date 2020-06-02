<template>
  <div id="app">
<!--      <el-header style="padding:0;"><Header></Header></el-header>-->

    <router-view v-if="isRouterAlive" class="body"></router-view>

  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import axios from "axios";
  import store from "./store";
  export default {
    name: 'App',
    components: {
      Footer
    },
    provide(){
      return{
        reload:this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true,
      }
    },
    created() {
      window.addEventListener('unload', this.saveState)
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
      saveState() {
        sessionStorage.setItem('state', JSON.stringify(this.$store.state))
      }
    }
  }
</script>

<style>
  #app {
    /*height: 100%;*/
  }
  .main-panel{
    padding:0;
  }
  .body{
    /*margin-bottom: 190px;*/
  }
</style>
