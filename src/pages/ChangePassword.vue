<template>
  <div id="change-password">
    <Header active="use3"></Header>
    <div class="center-panel">
      <el-row>
        <h2 style="text-align: center">Change Password</h2>
      </el-row>
      <el-form status-icon :rules="rules" ref="changeForm" :model="changeForm" label-position="left" label-width="1.2rem">
        <el-form-item label="Old Password" prop="oldPassword" class="form-item">
          <el-input type="password" v-model="changeForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="newPassword" class="form-item">
          <el-input type="password" v-model="changeForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass" class="form-item">
          <el-input type="password" v-model="changeForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="Verification" prop="slide" class="verify-row">
          <Verify  @success="alert('success')" explain="Slide to right" :show-button="false" @error="alert('error')" :type="3" :barSize="{width:'1.82rem',height:'0.24rem'}"></Verify>
        </el-form-item>
        <div style="text-align: center;" class="bottom-row">
          <el-button round size="small" class="button-submit" @click="submitForm('changeForm')">Submit</el-button>
          <el-button round size="small" class="button-cancel" @click="resetForm('changeForm')">Cancel</el-button>
        </div>
      </el-form>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
  import Verify from 'vue2-verify'
  import Header from "../components/Header";
  import Footer from "../components/Footer";
    export default {

      name: "ChangePassword",
      inject: ['reload'],
      data(){
        var validateOldPass = (rule, value, callback) => {
          console.log(value)
          if(value.length < 6 || value.length > 36){
            callback(new Error('Length between 6 and 36'))
          }else {
            callback();
          }
        }
        var validatePass = (rule, value, callback) => {
          console.log(value)
          if(value.length < 6 || value.length > 36){
            callback(new Error('Length between 6 and 36'))
          }else {
            if (this.changeForm.checkPass !== '') {
              this.$refs.changeForm.validateField('checkPass');
            }
            callback();
          }
        }
        var validatePass2 = (rule, value, callback) => {
          console.log(value)
          if (value === '') {
            callback(new Error('Confirm password'));
          } else if (value !== this.changeForm.newPassword) {
            callback(new Error('Input same password'));
          } else {
            callback();
          }
        };
        var slidePass = (rule, value, callback) => {
          if(value){
            callback();
          }else{
            callback(new Error('Slide Error'));
          }
        };
        return {
          changeForm: {
            oldPassword: '',
            newPassword: '',
            checkPass: '',
            slide: false,
          },
          rules: {
            oldPassword: [
              {
                required: true, validator: validateOldPass, trigger: 'blur'
              }
            ],
            newPassword: [
              {
                required: true, validator: validatePass, trigger: 'blur'
              }
            ],
            checkPass: [
              { required: true, validator: validatePass2, trigger: 'blur' }
            ],
            slide: [
              { required: true, validator: slidePass, trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        submitForm(formName){
          this.$refs[formName].validate((valid) => {
            if(valid){
              this.axios.post('v1/user/change_password', {
                new_password: this.changeForm.newPassword,
                old_password: this.changeForm.oldPassword
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
                      if(this.$route.query.redirect){
                        this.$router.push(this.$route.query.redirect)
                      }else{
                        this.$router.push('home')
                      }
                    }
                  })
                }else if(res.data.result==-2){
                  console.log(res.data.result)
                  // this.showErr = true
                  this.$alert('Incorrect Password' ,'', {
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
        alert(text) {
          console.log(text)
          if (text == "success") {
            this.changeForm.slide = true
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

<style>

  .success-box .el-button--small{
    background-color: #303479;
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

</style>

<style scoped>
  #change-password{
    background: url("../assets/images/登录页背景.jpg");
    background-size:100% 100%;
    min-height: 950px;
  }

  #change-password >>> .el-input__inner{
    background-color: #f6f6f6;
    border-radius: 10px;
    height: 50px;
  }

  #change-password >>> .el-input{
    width: 350px;
  }

  #change-password >>> .el-form-item__label{
    font-weight: 400;
    color: #333333;
    font: 24px/50px "PingFang SC";
    /*text-align: right;*/
  }

  #change-password >>> .el-form-item__content{
    font-size: 24px;
  }

  .button-submit{
    background-color: #33327e;
    color: #fff;
  }

  .button-cancel{
    background-color: #e1e1e1;
    color: #fff;
  }
  .form-item{
    margin-top: 40px;
  }
  .verify-row {
    margin: 30px 0;
  }

  .verify-row >>> .verify-bar-area{
    display: inline-block;
    vertical-align: middle;
  }

  .bottom-row{
    padding-bottom: 40px;
  }

  .center-panel{
    width: 620px;
    padding: 0 10px;
    margin: 60px auto;
    background-color: #fff;
    border-radius: 15px;
  }

  .footer{
/*    position: fixed;
    bottom: 0;
    z-index: 100;*/
  }

</style>
