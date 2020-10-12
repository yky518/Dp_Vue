<template>
  <div id="contact">
    <div class="upper-part">
      <div class="header">
        <Header active="contact"></Header>
      </div>
      <div id="body">
        <el-card class="card">
          <h2>Contact US</h2>
          <hr style="border:1px dashed #b6afd7;" />
          <el-form :model="formData" :rules="rules" ref="form" label-width="1.00rem">
            <el-form-item label="Name" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="Content" prop="data">
              <el-input type="textarea" v-model="formData.data"></el-input>
            </el-form-item>
            <el-form-item label="Verification" prop="slide" class="verify-row">
              <Verify  @success="alert('success')" explain="Slide to right" :show-button="false" @error="alert('error')" :type="3" :barSize="{width:'6.0rem',height:'0.28rem'}"></Verify>
            </el-form-item>
            <div style="text-align: center;">
              <el-button round size="small" class="button-submit" @click="onSubmit">Submit</el-button>
              <el-button round size="small" class="button-cancel" @click="reset">Cancel</el-button>
            </div>
          </el-form>
        </el-card>

      </div>
    </div>
    <Footer class="footer"></Footer>

  </div>
</template>

<script>
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import Verify from 'vue2-verify';
    export default {
        name: "Contact",
      data(){
        var validateEmail = (rule, value, callback) => {
          let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (regEmail.test(value)) {
            callback();
          } else {
            callback(new Error('Email Error'));
          }
        };
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
        return {
          formData:{
            name: '',
            email: '',
            data: '',
            slide: false
          },
          rules:{
            name:[
              { required: true, message: 'Input your name', trigger: 'blur' },
              { min: 4, max: 36, message: 'Length between 4 and 36', trigger: 'blur' }
            ],
            email: [
              { required: true, validator: validateEmail, trigger: 'blur' }
            ],
            data:[
              { required: true, message: 'Input your opinion', trigger: 'blur' },
            ],
            slide: [
              { required: true, validator: slidePass, trigger: 'blur' }
            ],
          }
        }
      },
      methods:{
        onSubmit(){
          this.$refs.form.validate((valid) => {
            if(valid){
              this.axios.post('/v1/user/insert_contact', {
                user_name: this.formData.name,
                email: this.formData.email,
                data: this.formData.data
              }).then(res=>{
                console.log(res.data)
                if(res.data.result >0){
                  this.$alert('Successfully upload' ,'', {
                    confirmButtonText: 'OK',
                    showClose: false,
                    iconClass: "el-icon-circle-check",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      // this.reload()
                      location.reload();
                    }
                  })
                }else{
                  console.log(res.data.result)
                  // this.showErr = true
                  this.$alert('Upload Failure' ,'', {
                    confirmButtonText: 'OK',
                    showClose: false,
                    iconClass: "el-icon-circle-close",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      // this.reload()
                      location.reload();
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
        reset(){
          this.$refs['form'].resetFields();
        },
        alert(text) {
          console.log(text)
          if(text == "success"){
            this.formData.slide = true
          }
        },
      },
      components:{
        Header,
        Footer,
        Verify
      }

    }
</script>

<style scoped lang="scss">
  #contact{
    background: url("../assets/images/登录页背景.jpg");
    background-size:100% 100%;
    .upper-part{


      min-height: 950px;
      .card {
        width: 1400px;
        margin: 10px auto 100px;
        padding: 10px;

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
        >>> .el-textarea__inner{
          resize: none;
        }
      }
    }
  }


</style>

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

</style>
