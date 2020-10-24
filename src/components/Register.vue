<template>
  <div id="register">
      <el-form status-icon :rules="rules" ref="registerForm" :model="registerForm" label-position="left" label-width="0.90rem">
      <el-form-item label="Username" prop="name">
        <el-input v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item  label="Verification" prop="slide" class="verify-row">
        <Verify  @success="alert('success')" explain="Slide to right" :show-button="false" @error="alert('error')" :type="3" :barSize="{width:'1.82rem',height:'0.24rem'}"></Verify>
      </el-form-item>
      <el-form-item prop="checked"  class="agreement-row" label-width="0">
        <input type="checkbox" class="checkbox" v-model="registerForm.checked">
        Accept the <router-link to="/privacy_policy"><i>user agreemen</i>t</router-link>
      </el-form-item>
      <div style="text-align: center;" class="button-row">
        <el-button round size="small" class="button-submit" @click="submitForm('registerForm')">Submit</el-button>
        <el-button round size="small" class="button-cancel" @click="resetForm('registerForm')">Cancel</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
  import Verify from "vue2-verify"
    export default {
        name: "Register",
      inject: ['reload'],
      data(){
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
            if (this.registerForm.checkPass !== '') {
              this.$refs.registerForm.validateField('checkPass');
            }
            callback();
          }
        }
        var validatePass2 = (rule, value, callback) => {

          if (value === '') {
            callback(new Error('Confirm password'));
          } else if (value !== this.registerForm.password) {
            callback(new Error('Input same password'));
          } else {
            callback();
          }
        };
        var validateEmail = (rule, value, callback) => {
          let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5._]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (regEmail.test(value)) {
            callback();
          } else {
            callback(new Error('Email Error'));
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
        }
        var checkboxPass = (rule, value, callback) => {
          if(value){
            callback();
          }else{
            callback(new Error('Please tick to accept'));
          }
        };
        return {
          registerForm: {
            name: '',
            password: '',
            checkPass: '',
            email: '',
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
            checkPass: [
              { required: true, validator: validatePass2, trigger: 'blur' }
            ],
            email: [
              { required: true, validator: validateEmail, trigger: 'blur' }
            ],
            slide: [
              { required: true, validator: slidePass, trigger: 'blur' }
            ],
            checked: [
              { required: true, validator: checkboxPass, trigger: 'change' }
            ]
          },
          showErr: false
        }
      },
      methods: {
        submitForm(formName){
          console.log('test')
          this.$refs[formName].validate((valid) => {
            console.log({
              user_name: this.registerForm.name,
              password: this.registerForm.password
            })
            if(valid){
              this.axios.post('/v1/user/append_user', {
                user_name: this.registerForm.name,
                password: this.registerForm.password,
                email: this.registerForm.email
              }).then(res=>{
                console.log(res.data)
                if(res.data.result== 0){
                  this.$alert('Success! Check your email', {
                    confirmButtonText: 'OK',
                    showClose: false,
                    iconClass: "el-icon-circle-check",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      /*this.$store.commit('login', {
                        name: this.registerForm.name,
                        password: this.registerForm.password
                      })*/
                      this.$router.push('home')
                    }
                  })
                }else if(res.data.result== -1){
                  console.log(res.data.result)
                  // this.showErr = true
                  this.$alert('Username duplicated' ,{
                    confirmButtonText: 'OK',
                    showClose: false,
                    iconClass: "el-icon-circle-close",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      this.reload()
                    }
                  })
                } else if(res.data.result== -2){
                  console.log(res.data.result)
                  // this.showErr = true
                  this.$alert('Email duplicated' ,{
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
            this.registerForm.slide = true
          }
        }
      },
      components:{
        Verify
      }
    }
</script>

<style scoped>
  #register >>> .el-input__inner{
    background-color: #f6f6f6;
    border-radius: 10px;
    height: 50px;
  }

  #register >>> .el-input{
    width: 350px;
    font-size: 24px;
  }

  #register >>> .el-form-item__label{
    font-weight: 400;
    color: #333333;
    font: 24px/50px "PingFang SC";
    /*text-align: right;*/
  }

  #register >>> .el-form-item__content{
    font-size: 24px;
  }

  #register >>> .el-form-item__error{
    font-size: 16px;
  }

  #register>>> .el-form-item{
    /*margin: 50px 0;*/
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
    margin-top: 50px;
  }

  .verify-row >>> .verify-bar-area{
    display: inline-block;
    vertical-align: middle;
  }

  .checkbox{
    height: 24px;
    width:24px
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

</style>
