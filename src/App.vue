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
      //加载页面时，判断后台session状态，自动登录
      axios.get('v1/user/check_username').then(res=>{
        console.log(this.$cookies)
        if(res.data.result == 'failed'){
          this.$store.commit('logout')
        }else{
          this.$store.commit('login',res.data)
        }
      }).catch(err=>{
        console.log(err)
      })
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
