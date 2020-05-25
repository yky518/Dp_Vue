<template>
  <div class="footer">
    <div class="footer-center">
      <el-row>
        <el-col :span="4">
          <h2>Partners</h2>
          <p class="footer-text">Partners</p>
        </el-col>
        <el-col :span="4">
          <h2>Tools</h2>
          <p><el-link class="footer-text" @click="to('https://github.com/deepmodeling/deepmd-kit')">DeePMD-kit</el-link></p>
          <p><el-link class="footer-text" @click="to('https://github.com/deepmodeling/dpgen')">DP-GEN</el-link></p>
          <p><el-link class="footer-text" @click.native="to('https://github.com/deepmodeling/dpdata/tree/master/dpdata')">DPData</el-link></p>
        </el-col>
        <el-col :span="4">
          <h2>Links</h2>
          <el-link class="footer-text" @click="$router.push('privacy_policy')">Privacy Policy</el-link>
        </el-col>
        <el-col :span="6" :offset="6" class="footer-img">
          <img src="../assets/images/DP英文logo-页脚.png"  class="footer-img">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Footer",
      methods:{
          to(url){
            window.open(url, '_blank')
          }
      }
    }
</script>

<style scoped>
  .footer {
    background-color: #f9f9f9;
    font-weight: 900;
    font-size: 20px;
    /*height: 160px;*/
/*    position: fixed;
    bottom: 0;*/
    width: 100%;
  }
  .footer-center{
    padding: 10px 0;
    width: 1400px;
    margin: 0 auto;
  }

  .footer-center p{
    margin:10px 0;
  }
  .footer-img {
    height: 44px;
    padding-top: 36px;
  }
  .footer-text{
    font-weight: 400;
    color: #a9a9a9;

  }
  .footer-text >>> .el-link--inner{
    font-size: 20px;
    color: #a9a9a9;
  }

</style>
