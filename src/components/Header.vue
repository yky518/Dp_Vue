<template>
  <div class="header">
    <el-menu @select="handleSelect" class="header-menu" menu-trigger="hover" :default-active="active" background-color="transparent" mode="horizontal" text-color="#999999" active-text-color="#ffffff">
      <el-menu-item  @click="$router.push('home')" style="padding-left:0;" >
        <img class="header-img" src="../assets/images/LOGO-头部.png">
      </el-menu-item>
      <el-submenu class="submenu" index="user"  v-if="name" :style="{float: 'right', 'border-bottom': headerOver[5]?'0.020833rem solid #fff':'0.020833rem solid transparent'}" @mouseenter.native="headerItemOver(5)" @mouseleave.native="headerItemOut(5)">
        <template slot="title"><img src="../assets/images/头像.png" class="icon-img user-icon"><span class="header-item">{{name}}</span></template>
        <el-menu-item index="user1" :style="{'background': subitemHover[0]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(0)" @mouseleave.native="mouseout(0)">
            <img src="../assets/images/总项目.png" class="icon-img">
          <el-link :underline="false" @click="changeTab('/user_projects')">
            Projects
          </el-link>
        </el-menu-item>
        <el-menu-item index="user2" :style="{'background': subitemHover[1]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(1)" @mouseleave.native="mouseout(1)">
            <img src="../assets/images/提交—导航滑动.png" class="icon-img">
          <el-link :underline="false" @click="changeTab('/append_project')">
            Add Project
          </el-link>

        </el-menu-item>
        <el-menu-item index="user3" :style="{'background': subitemHover[2]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(2)" @mouseleave.native="mouseout(2)">
          <img src="../assets/images/用户中心.png" class="icon-img">
          <el-link :underline="false" @click="changeTab('/user_info')">
            User Info
          </el-link>

        </el-menu-item>
        <el-menu-item  @click="quit"  :style="{'background': subitemHover[3]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(3)" @mouseleave.native="mouseout(3)">
            <img src="../assets/images/退出.png" class="icon-img">
          <el-link :underline="false" >Quit</el-link>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else index="Login" :style="{float: 'right','border-bottom': headerOver[6]?'0.020833rem solid #fff':'0.020833rem solid transparent'}" @mouseenter.native="headerItemOver(6)" @mouseleave.native="headerItemOut(6)">
        <el-link :underline="false" class="header-item" @click="changeTab('login')">LOGIN</el-link>
      </el-menu-item>

      <el-submenu class="submenu"  style="float: right;"  index="about" :style="{float: 'right', 'border-bottom': headerOver[4]?'0.020833rem solid #fff':'0.020833rem solid transparent'}"
                  @mouseenter.native="headerItemOver(4)" @mouseleave.native="headerItemOut(4)">
        <template slot="title"><span class="header-item">ABOUT</span></template>
        <el-menu-item :style="{'background': subitemHover[4]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(4)" @mouseleave.native="mouseout(4)">
          <el-link :underline="false" @click="changeTab('home', 'home')">DPlibrary</el-link>
        </el-menu-item>
        <el-menu-item :style="{'background': subitemHover[5]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(5)" @mouseleave.native="mouseout(5)">
          <el-link :underline="false" @click="changeOuterTab('https://github.com/deepmodeling/deepmd-kit')">DeePMD-kit</el-link>
        </el-menu-item>
        <el-menu-item :style="{'background': subitemHover[6]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(6)" @mouseleave.native="mouseout(6)">
          <el-link :underline="false" @click="changeOuterTab('https://github.com/deepmodeling/dpgen')">DP-GEN</el-link>
        </el-menu-item>
        <el-menu-item :style="{'background': subitemHover[7]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(7)" @mouseleave.native="mouseout(7)">
          <el-link :underline="false" @click="changeOuterTab('https://github.com/deepmodeling/dpdata/tree/master/dpdata')">DPData</el-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu class="submenu"  style="float: right;"  index="API" :style="{float: 'right', 'border-bottom': headerOver[3]?'0.020833rem solid #fff':'0.020833rem solid transparent'}"
                  @mouseenter.native="headerItemOver(3)" @mouseleave.native="headerItemOut(3)">
        <template slot="title"><span class="header-item">API</span></template>
        <el-menu-item index="API1" :style="{'background': subitemHover[8]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(8)" @mouseleave.native="mouseout(8)">
          <el-link :underline="false" >Documentation</el-link>

        </el-menu-item>
        <el-menu-item index="API2"  :style="{'background': subitemHover[9]? '#f3f3fe': 'transparent'}" @mouseenter.native="mouseover(9)" @mouseleave.native="mouseout(9)">
          <el-link :underline="false" >Forum</el-link>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="elements_list" class="header-item-margin" :style="{float: 'right','background-color': backgroundColor, 'border-bottom': headerOver[2]?'0.020833rem solid #fff':''}"
                    @mouseenter.native="headerItemOver(2)" @mouseleave.native="headerItemOut(2)">
        <el-link :underline="false" class="header-item" target="_blank" @click="changeTab('/elements_list')">
          PROJECTS
        </el-link>

      </el-menu-item>
      <el-menu-item :style="{float: 'right','border-bottom': headerOver[1]?'0.020833rem solid #fff':'0.020833rem solid transparent'}"  class="header-item-margin"
                    @mouseenter.native="headerItemOver(1)" @mouseleave.native="headerItemOut(1)">
        <span class="header-item">DOCUMENT</span>
      </el-menu-item>
      <el-menu-item index="home" :style="{float: 'right', 'border-bottom': headerOver[0]?'0.020833rem solid #fff':'0.020833rem solid transparent'}" class="header-item-margin"
        @mouseenter.native="headerItemOver(0)" @mouseleave.native="headerItemOut(0)">
        <el-link :underline="false" class="header-item" @click="changeTab('home')">
          HOME
        </el-link>
      </el-menu-item>
    </el-menu>


  </div>
</template>

<script>

    export default {
      name: "Header",
      props: ['active'],
      inject:['reload'],
      data(){
          return {
            subitemHover: [false, false, false, false, false, false, false, false, false,false],
            headerOver: [false, false, false, false, false, false,false],
            backgroundColor: 'transparent'
          }
      },
      created(){
        console.log(this.active)
      },
      computed:{
          name(){
            return this.$cookies.get("name")
          }
      },
      updated(){
      },
      methods:{
        headerItemOver(index){
          this.$set(this.headerOver, index, true)
        },
        headerItemOut(index){
          this.$set(this.headerOver, index, false)
        },
        mouseover(index){
          this.$set(this.subitemHover, index, true)
        },
        mouseout(index){

          this.$set(this.subitemHover, index, false)
        },
        changeTab(to){

          this.$router.push(to)
        },
        changeOuterTab(to){
          window.open(to, '_blank')
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        quit(){
          this.axios.get('/v1/user/quit').then(res=>{
            console.log(res)
            this.$store.commit('logout')
            location.reload();
          }).catch(err=>{
            console.log(err)
          })

        },

    }
    }
</script>


<style lang="scss">
  .el-menu--horizontal{
    background-color: #ffffff;
    border-radius: 20px;
    overflow: auto;

    .el-menu.el-menu--popup{

      .el-menu-item{
        height: 60px;

        .el-link{
          font-size: 22px;
        }
      }
    }


  }

</style>

<style scoped>
  .header {
    width: 100%;
    z-index: 100;
    /*height: 100px;*/
  }
  .header-menu{
    width: 1400px;
    margin: 0 auto;
    border: 0;
    overflow: hidden;
  }

  .header-img {
    height: 44px;
    width: 180px;
  }
  .header-item {
    font-weight: 900;
    font-size: 24px;
    font-family: "Microsoft Ya Hei";
  }

  .header-item-margin {
    margin-right: 60px;
  }
  .sub-item {
    text-decoration: none;
    color: #333333;
    font-weight: 500;

  }
  .header >>> .el-menu-item{
    padding: 0 10px;
    background-color: transparent!important;
    box-sizing: content-box;
  }

  .header >>> .el-menu{
    border: 0;
  }

  .header >>> .el-submenu__title{
    background-color: transparent!important;
  }

  .header >>> .el-menu-item.is-active{
    border-bottom: 0.020833rem solid #ffffff!important;
  }

  .header >>> .el-submenu.is-active{
    border-bottom: 0.020833rem solid #ffffff!important;
  }

  .header >>> .el-submenu .el-submenu__title{
    border: 0;
  }


  .icon-img{
    height: 22px;
  }
  .icon-img.user-icon{
    margin-right: 5px;
  }

  .icon-setting{
    color:#303479!important;
    font-size: 24px;
  }

</style>
