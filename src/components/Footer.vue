<template>
  <div class="footer">
    <div class="footer-center">
      <el-row>
<!--        <el-col :span="3">
          <h2>Partners</h2>
          <p>
            <el-link class="footer-text">Review</el-link>
          </p>
        </el-col>-->
        <el-col :span="3">
          <h2>Tools</h2>
          <p><el-link class="footer-text" @click="to('https://github.com/deepmodeling/deepmd-kit')">DeePMD-kit</el-link></p>
          <p><el-link class="footer-text" @click="to('https://github.com/deepmodeling/dpgen')">DP-GEN</el-link></p>
          <p><el-link class="footer-text" @click.native="to('https://github.com/deepmodeling/dpdata/tree/master/dpdata')">DPData</el-link></p>
        </el-col>
        <el-col :span="3">
          <h2>Links</h2>
          <p><el-link class="footer-text" @click="$router.push('privacy_policy')">Privacy Policy</el-link></p>
          <p><el-link class="footer-text" @click="$router.push('aboutus')">About Us</el-link></p>
          <p><el-link class="footer-text" @click="$router.push('help')">Help</el-link></p>
          <p><el-link class="footer-text" @click="$router.push('contact')">Contact Us</el-link></p>

        </el-col>
        <el-col :span="3">
          <h2>Publication</h2>
          <p><el-link class="footer-text">Review</el-link></p>
          <p><el-link class="footer-text">Application</el-link></p>
        </el-col>
        <el-col :span="6" :offset="6">
          <img src="../assets/images/logo_foot.png"  class="footer-img">
        </el-col>
      </el-row>
      <p style="text-align: center;color: #8c939d;font-size: 12px;font-family: 'Avenir', Helvetica, Arial, sans-serif">&copy;Copyright2018-2020&nbsp;<strong>DP Potential</strong>. All Rights Reserved</p>
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

  .footer-center h2{
    font-size: 20px;
  }
  .footer-img {
    height: 100px;
    padding-top: 36px;
    float:right;
  }
  .footer-text{
    font-weight: 400;
    color: #a9a9a9;

  }
  .footer-text >>> .el-link--inner{
    font-size: 14px;
    color: #a9a9a9;
  }

</style>
