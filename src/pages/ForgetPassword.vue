<template>
  <div id="forget_password">
    <div id="upper-part">
      <Header active="use3"></Header>
      <div class="center-panel">
        <el-row>
          <h2 style="text-align: center">Forget Password</h2>
        </el-row>
        <el-form status-icon :rules="rules" ref="forgetForm" :model="forgetForm" label-position="left" label-width="160px">
          <el-form-item label="Name" prop="name">
            <el-input v-model="forgetForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="password">
            <el-input type="password" v-model="forgetForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input type="password" v-model="forgetForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  label="Verification" prop="slide">
            <Verify  @success="alert('success')" explain="Slide to right" :show-button="false" @error="alert('error')" :type="3" :barSize="{width:'350px',height:'40px'}"></Verify>
          </el-form-item>
          <el-form-item label="Verification" prop="verification" class="verification">
            <div class="verification-content">
              <el-input v-model="forgetForm.verification" autocomplete="off"></el-input>
              <el-button v-show="show" :disabled="!forgetForm.slide" @click="getCode"
                         :style="forgetForm.slide?{'background-color': '#c04851',color: '#fff'}:{'background-color': '#f6f6f6',color: '#311f1f'}">
                Get Code</el-button>
              <el-button v-show="!show" disabled class="count">{{count}} s</el-button>
            </div>
          </el-form-item>
          <div style="text-align: center;" class="bottom-row">
            <el-button round size="small" class="button-submit" @click="submitForm('forgetForm')">Submit</el-button>
            <el-button round size="small" class="button-cancel" @click="resetForm('forgetForm')">Cancel</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <Footer class="footer"></Footer>
  </div>
</template>

<script>
    import Header from "../components/Header";
    import Verify from "vue2-verify";
    import Footer from "../components/Footer";

    export default {
        name: "ForgetPassword",
      inject: ['reload'],
      data(){

        var checkVerification = (rule, value, callback) => {
          if(value){
            callback()

          }else {
            callback(new Error('Input verification code'))
          }
        }
        var checkName = (rule, value, callback) => {
          var reg = /^[A-Za-z0-9_!@#$%^&]+$/
          if(!reg.test(value)){
            callback(new Error('Numbers, letters, special characters'))
          }else if(value.length < 4 || value.length > 36){
            callback(new Error('Length between 4 and 36'))
          }else{
            callback();
          }
        }
        var validatePass = (rule, value, callback) => {
          console.log('pass')
          if(value.length < 6 || value.length > 36){
            callback(new Error('Length between 6 and 36'))
          }else {
            if (this.forgetForm.checkPass !== '') {
              this.$refs.forgetForm.validateField('checkPass');
            }
            callback();
          }
        }
        var validatePass2 = (rule, value, callback) => {

          if (value === '') {
            callback(new Error('Confirm password'));
          } else if (value !== this.forgetForm.password) {
            callback(new Error('Input same password'));
          } else {
            callback();
          }
        };
        var slidePass = (rule, value, callback) => {
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
        return {
          forgetForm: {
            name: "",
            verification: "",
            password:"",
            checkPass: ""
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
            checkPass: [
              { required: true, validator: validatePass2, trigger: 'blur' }
            ],
            verification: [
              {required: true, validator: checkVerification, trigger: 'blur'}
            ],
            slide: [
              { required: true, validator: slidePass, trigger: 'blur' }
            ]
          },
          show: true,
          count: '',
          timer: null,
        }
      },
      methods: {
        submitForm(formName){
          this.$refs[formName].validate((valid) => {
            if(valid){
              this.axios.post('v1/user/check_reset_password', {
                user_name: this.forgetForm.name,
                reset_password: this.forgetForm.verification,
                password: this.forgetForm.password
              }).then(res=>{
                console.log(res.data)
                if(res.data.result==1){
                  this.$alert('Successfully', {
                    confirmButtonText: 'OK',
                    showClose: false,
                    iconClass: "el-icon-circle-check",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                        this.$router.push('login')
                    }
                  })
                }else if(res.data.result==-1){
                  console.log(res.data.result)
                  // this.showErr = true
                  this.$alert('Verification code error' ,'', {
                    confirmButtonText: 'OK',
                    showClose: false,
                    iconClass: "el-icon-circle-close",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      this.reload()
                    }
                  })
                }else{
                  console.log(res.data.result)
                  // this.showErr = true
                  this.$alert('Parameters error' ,'', {
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
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        getCode(){
          this.axios.post("v1/user/get_reset_password",{
            user_name: this.forgetForm.name
          }).then(res=>{
            console.log(res.data)
            if(res.data.result==1){
              this.$alert('Check your email', {
                confirmButtonText: 'OK',
                showClose: false,
                iconClass: "el-icon-circle-check",
                center: true,
                customClass: 'success-box',
                callback: action => {
                  const TIME_COUNT = 60;
                  if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                      if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                      } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                      }
                    }, 1000)
                  }
                }
              })
            }else{
              this.$alert('Send Email Filure' ,'', {
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

          })

        },
        alert(text) {
          console.log(text)
          if (text == "success") {
            this.$set(this.forgetForm, "slide", true)
            // this.forgetForm.slide = true
          }
        }
      },
      components:{
        Header,
        Verify,
        Footer
      }
    }
</script>


<style lang="scss">

  .success-box {
    border-radius: 15px;

    .el-button--small{
      background-color: #303479!important;
      border-radius: 15px!important;
      padding: 10px 20px;
      border: 0;
    }

    .el-message-box__content{
      padding-bottom: 30px;
      padding-top: 30px;
      font-size: 22px;
      font-family: "Microsoft Ya Hei";
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
  }

  .icon-right::before{
    z-index: 0!important;
  }
</style>

<style scoped lang='scss'>
  #forget_password{
    #upper-part{
      background: url("../assets/images/登录页背景.jpg");
      background-size:100% 100%;
      min-height: 950px;

      .center-panel{
        width: 620PX;
        padding: 0 10PX;
        margin: 60PX auto;
        background-color: #fff;
        border-radius: 15PX;

        >>> .el-form-item{
          //margin: 30PX 0;
        }

        >>> .el-form-item__content{
          font-size: 18PX;
        }
        >>> .el-input{
          width: 350PX;

        }

        >>> .el-input__inner{
          background-color: #f6f6f6;
          border-radius: 10PX;
          height: 40PX;
        }
        >>> .el-form-item__label{
          font-weight: 400;
          color: #333333;
          font: 18PX/40PX "Microsoft Ya Hei";
          /*text-align: right;*/
        }

        >>> .el-form-item__content{
          .el-input{
            font-size: 18PX;
          }
        }

        >>> .el-form-item__error{
          font-size: 18PX;
        }
        .verification{
          >>> .el-input{
            width:220PX;
          }

          .verification-content{
            display: flex;
            justify-content: space-between;
            width: 350PX;

            .verification-button, .count{
              font-size: 18PX;
              line-height: 40PX;
              padding: 0PX 10PX;
            }

            .verification-button{
              background-color: #c04851;
              color: #fff;
            }

            .count{
              background-color: #5cb85c;
              color: #fff;
            }
          }
        }


        .button-submit{
          background-color: #33327e;
          color: #fff;
        }

        .button-cancel{
          background-color: #e1e1e1;
          color: #fff;
        }
        .verify-row {
          >>> .verify-bar-area{
            display: inline-block;
            vertical-align: middle;
          }
        }
        .bottom-row{
          padding-bottom: 40PX;
        }

      }
    }

    .footer{
/*      position: fixed;
      bottom: 0;
      z-index: 100;*/
    }
  }
</style>
