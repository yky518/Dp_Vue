<template>
  <div id="main">
    <div class="upper-part">
      <Header active="Login"></Header>
      <div id="login">

        <el-tabs type="border-card" id="login-tabs">
          <el-tab-pane label="Login">
            <el-form status-icon :rules="rules" label-position="left" ref="loginForm" :model="loginForm" label-width="0.90rem">
              <el-form-item label="Username" prop="name">
                <el-input v-model="loginForm.name"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item label="Verification" prop="slide" class="verify-row">
                <Verify  @success="alert('success')" explain="Slide to right" :show-button="false" @error="alert('error')" :type="3" :barSize="{width:'1.82rem',height:'0.24rem'}"></Verify>
              </el-form-item>
              <el-form-item prop="checked"  class="agreement-row" label-width="0">
                <input type="checkbox" class="checkbox" v-model="loginForm.checked">
                Accept the <router-link to="/privacy_policy"> <i>user agreement</i> </router-link>
              </el-form-item>
              <div style="text-align: center;" class="button-row">
                <el-button round size="small" class="button-submit" @click="submitForm('loginForm')">Submit</el-button>
                <el-button round size="small" class="button-cancel" @click="resetForm('loginForm')">Cancel</el-button>
              </div>
              <div class="form-bottom">
                <el-link @click.native="toForget" class="forget-link">Forget Password?</el-link>
              </div>

            </el-form>
            <hr style="height:1px;border:none;border-top:1px solid #bdbddb;">
            <div style="display: flex;justify-content: flex-end;">
<!--              <span class="third-party">Thrid Party Login</span>-->
              <el-avatar :src="require('../assets/images/github.jpg')" class="third-avatar"></el-avatar>
            </div>

          </el-tab-pane>
          <el-tab-pane label="Register">
            <Register></Register>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
    <Footer class="footer"></Footer>

  </div>
</template>

<script>

  import Verify from 'vue2-verify'
  import Header from "../components/Header";
  import Register from "../components/Register";
  import Footer from "../components/Footer";

  export default {
      name: "Login",
      inject: ['reload'],
      data(){
        //validation
        var checkName = (rule, value, callback) => {
          var reg = /^[A-Za-z0-9_!@#$%^&]+$/
          if(!reg.test(value)){
            callback(new Error('Numbers, letters or special characters'))
          }else if(value.length < 4 || value.length > 36){
            callback(new Error('Length between 4 and 36'))
          }else{
            callback();
          }
        }
        var validatePass = (rule, value, callback) => {
          if(value.length < 6 || value.length > 36){
             callback(new Error('Length between 6 and 36'))
          }else{
            callback();
          }
          }

        var slidePass = (rule, value, callback) => {
          console.log('slide')
          if(value){
            callback();
          }else{

            this.$alert('Check slide verfication' ,'', {
              confirmButtonText: 'OK',
              showClose: false,
              iconClass: "el-icon-circle-close",
              center: true,
              customClass: 'success-box',
              callback: action => {
              }
            })
            callback(new Error('Slide Error'));
          }
        };
        var checkboxPass = (rule, value, callback) => {
          console.log(value)
          if(value){
            callback();
          }else{
            callback(new Error('Please tick to accept'));
          }
        };
        return {
          loginForm: {
            name: '',
            password: '',
            slide: false,
            checked: false
          },
          rules: {
            name: [
              {required: true, validator: checkName, trigger: 'blur'}
            ],
            password: [
              {
                required: true, validator: validatePass, trigger: 'blur'
              }
            ],
            slide: [
              { required: true, validator: slidePass, trigger: 'blur' }
            ],
            checked: [
              { required: true, validator: checkboxPass, trigger: 'change' }
            ]
          },
          showErr: false,
          checked: false
        }
      },
      methods: {
          submitForm(formName){

            this.$refs[formName].validate((valid) => {
              if(valid){
                this.axios.post('/v1/user/check_password', {
                  user_name: this.loginForm.name,
                  password: this.loginForm.password
                }).then(res=>{
                  console.log(res.data)
                  if(res.data.result == 'success'){
                    this.$alert('Successfully login' ,'', {
                      confirmButtonText: 'OK',
                      showClose: false,
                      iconClass: "el-icon-circle-check",
                      center: true,
                      customClass: 'success-box',
                      callback: action => {
                        this.$cookies.set("name", this.loginForm.name)
                        if(this.$route.query.redirect){
                          this.$router.push(this.$route.query.redirect)
                        }else{
                          this.$router.push('home')
                        }
                      }
                    })
                  }else{
                    console.log(res.data.result)
                    // this.showErr = true
                    this.$alert('Login Failure' ,'', {
                      confirmButtonText: 'OK',
                      showClose: false,
                      iconClass: "el-icon-circle-close",
                      center: true,
                      customClass: 'success-box',
                      callback: action => {
                        this.reload()
                      }
                    })
                  }

                }).catch(err=>{
                  console.log(err)
                })
              }else{
                console.log('error submit')
                return false
              }
            })
          },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        alert(text) {
          console.log(text)
          if(text == "success"){
            this.loginForm.slide = true
          }
        },
        toForget(){
            this.$router.push("/forget_password")
        }
      },
      components: {
        Verify,
        Header,
        Register,
        Footer
      }
    }
</script>

<style>
  .success-box .el-button--small{
    background-color: #303479!important;
    border-radius: 15px!important;
    padding: 10px 20px;
    border: 0;
  }

  .success-box  .el-icon-circle-check{
    color: #303479;
    height: 40px;
    font-size: 50px!important;
    font-weight: 500;
  }

  .success-box  .el-icon-circle-close{
    color: #c02c38;
    height: 40px;
    font-size: 50px!important;
    font-weight: 500;
  }


  .success-box .el-message-box__content{
    padding-bottom: 30px;
    padding-top: 30px;
    font-size: 22px;
    font-family: "Microsoft Ya Hei";
  }

  .success-box {
    border-radius: 15px;
  }

  .icon-right::before{
    z-index: 0!important;
  }
  .icon-check::before{
    z-index: 0!important;
  }
</style>

<style scoped>

  #main{
    background: url("../assets/images/登录页背景.jpg");
    background-size:100% 100%;
  }

  .upper-part{
    /*margin-bottom: 200px;*/
    min-height: 950px;
  }
  #login{
    width: 620px;
    padding: 0 10px;
    margin: 60px auto;
  }

  #login >>> .el-card__body{
    padding: 48px 40px;
  }

  #login >>> .el-input{
    width: 350px;
    font-size: 22px;

  }

  #login >>> .el-input__inner{
    background-color: #f6f6f6;
    border-radius: 10px;
    height: 50px;
  }

  #login >>>  .el-checkbox__inner{

  }

  #login >>> .el-form-item__label{
    font-weight: 400;
    color: #333333;
    font: 24px/50px "PingFang SC";
    /*text-align: right;*/

  }
  #login-tabs{
    border-radius: 10px;
    overflow: auto;
    border: 0;
  }


  #login-tabs >>> .el-tabs__nav {
    width: 100%;

  }

  #login-tabs >>> .el-tabs__item{
    width: 50%;
    border: 0;
    color: #333333;
    background-color:#eeeeee;
    font-size: 22px;
    text-align: center;
    height: 80px;
    padding-top: 20px;
  }

  #login-tabs >>> .el-tabs__item.is-active{
    background-color: transparent;
  }

  #login-tabs >>> .el-tabs__header{
    border: 0;
    background-color: transparent;
  }

  #login-tabs>>> .el-form-item{
    /*margin: 50px 0;*/
  }

  #login-tabs >>> .el-form-item__content{
    font-size: 24px;
  }

  #login-tabs >>> .el-form-item__error{
    font-size: 16px;
  }

  .button-submit{
    background-color: #33327e;
    color: #fff;
    border: 0;
  }

  .button-cancel{
    background-color: #e1e1e1;
    color: #fff;
    border: 0;
  }

  .checkbox{
    height: 24px;
    width:24px;
  }

  .verify-row{
    margin: 20px 0!important;
  }

  .verify-row >>> .verify-bar-area{
    display: inline-block;
    vertical-align: middle;
  }

  .footer{
    /*position: fixed;*/
    /*bottom: 0;*/
    /*z-index: 100;*/
  }

  .third-party{
    font: 24px/40px "Microsoft Ya Hei";
  }

</style>

<style scoped lang="scss">
  .form-bottom{
    text-align: right;
  }

  .forget-link{
    font-size: 18px;
    &:hover{
      color: #33327e;

      &::after{
        border-bottom: 0.005208rem solid  #33327e;
      }
    }
  }

  .agreement-row{
    /*text-align: center;*/
    margin: 0!important;
  }
  .agreement-row >>> .el-form-item__error{
    position: static;
    margin-left: 0.90rem;
  }

  .button-row{
    margin: 5px 0;
  }

  .third-avatar{
    width: 40px;
    height: 40px;
  }


</style>
