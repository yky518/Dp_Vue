<template>
  <div id="user_info">
    <div class="upper-part">
      <div class="header">
        <Header active="user3"></Header>
      </div>
<!--      <div class="sub-header">

      </div>-->
      <div >
        <el-card class="card">
          <h2>User Info</h2>
          <hr style="border:1px dashed #b6afd7;" />
          <el-form ref="user_form" label-position="left" :model="userInfo" label-width="1.00rem">
            <el-row>
              <el-col :span="10">
                <el-form-item label="Name" prop="username">
                  <el-input v-model="username"></el-input>
                </el-form-item>
              </el-col>
<!--              <el-col :span="10" :offset="2">
                <el-form-item label="Avator" prop="avator">
                  <el-avatar :src="userInfo.avator"></el-avatar>
                </el-form-item>
              </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="Created Time" prop="creatTime">
                  <span class="create-time">{{creatTime}}</span>
                </el-form-item>
              </el-col>
<!--              <el-col :span="10" :offset="2">
                <el-form-item label="Third-party" prop="third_party">
                  <el-input  v-model="userInfo.third_party"></el-input>
                </el-form-item>
              </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="Email" prop="email">
                  <span class="email-link">{{email}}</span>
                  <el-link v-if="show" class="email-tips" @click.native="emailActivate">Click to activate</el-link>
                </el-form-item>
              </el-col>
<!--              <el-col :span="10" :offset="2">
                <el-form-item label="Phone" prop="phone">
                  <el-input  v-model="userInfo.phone"></el-input>
                </el-form-item>
              </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="Password">
                  <el-button @click="changePassword" class="pass-button">
                    <img src="../assets/images/修改密码.png" class="icon-img">
                    <span style="vertical-align: middle">Change Password</span>


                  </el-button>
<!--                  <el-link @click.native="changePassword" class="password-link">Change Password</el-link>-->
                </el-form-item>
              </el-col>
<!--              <el-col :span="10" :offset="2">
                <el-form-item label="Occupation" prop="avator">
                  <el-input  v-model="userInfo.occupation"></el-input>
                </el-form-item>
              </el-col>-->
            </el-row>

            <div style="text-align: center;">
              <el-button round size="small" class="button-submit" @click="submitForm('loginForm')">Submit</el-button>
              <el-button round size="small" class="button-cancel" @click="resetForm('loginForm')">Cancel</el-button>
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
    export default {
        name: "UserInfo",
      data(){
          return {
            userInfo:{
              avatar:"",
              third_party: "",
              phone:"",
              occupation:""

            },
/*            username: this.$store.state.name,
            eamil: this.$store.state.email,
            show: this.$store.state.email_verify < 1,
            creattime: this.$store.state.create_time*/
          }
      },
      computed:{
          username(){
            return this.$store.state.name
          },
          email(){
            return this.$store.state.email
          },
         show(){
            return this.$store.state.email_verify < 1;
         },
        creatTime(){
          return this.$store.state.create_time
        }
      },
      created() {
      },
      methods:{
        changePassword(){
          this.$router.push("/change_password")
        },
        emailActivate(){
          console.log("email acvivate")
          this.axios.get("/v1/user/get_email_verify").then(res=>{
            console.log(res)
            console.log(res.data.result==1)
            if(res.data.result==1){
              console.log(alert)
              this.$alert('Send email successful' ,{
                confirmButtonText: 'OK',
                showClose: false,
                iconClass: "el-icon-circle-check",
                center: true,
                customClass: 'success-box',
                callback: action => {
                  this.reload()
                }
              })
            }else{
              this.$alert('Failure' ,'', {
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
        },

      },
      components:{
        Header,
        Footer
      }
    }
</script>

<style scoped lang="scss">

  .upper-part{
    min-height: 950px;

    .header{
      background: url("../assets/images/userproject-导航背景.png");
      width: 100%;
      z-index:10;
      height: 100px;
      background-size:100% 100%;
    }
    .sub-header{
      background: url("../assets/images/userproject-作者背景.png");
      width: 100%;
      height: 80px;
      background-size:100% 100%;
    }
    .card{
      width: 1400px;
      margin: 10px auto 240px;
      padding: 10px 20px;
      /*border-radius: 10px;*/
      >>> .el-form-item{
        .el-form-item__label{
          font: 24px/40px "Microsoft Ya Hei";
          font-weight: 500;
          color: #333333;
        }

        .el-form-item__content{
          line-height: 40px;
        }

        .el-input__inner{
          background-color: #f6f6f6;
          font: 24px/40px "Microsoft Ya Hei";
        }
      }
      .email-link{
        font: 22px/40px "Microsoft Ya Hei";
        font-weight: 500;
        color: #303479;
      }
      .create-time{
        color: #333333;
        font-size: 22px;
        font-family: "Microsoft Ya Hei";
        line-height: 40px;
      }

      .email-tips{
        color: #c04851;
        font: 18px/30px "Microsoft Ya Hei";
        font-weight: 500;
        &:hover::after {
          border-bottom: 2px solid #c04851;
        }
      }

      .password-link{
        color: #303479;
        font: 22px/40px "Microsoft Ya Hei";
        font-weight: 500;
        &:hover::after {
          border-bottom: 4px solid #303479;
        }
      }

      .pass-button{
        background-color: #303479;
        border-radius: 10px;
        color: #fff;
        font-size: 22px;
        .icon-img{
          vertical-align: middle;
          height: 24px;
          margin-right: 5px;
        }
      }
      .button-submit{
        background-color: #33327e;
        color: #fff;
        font: 24px/24px  "Microsoft Ya Hei";
      }

      .button-cancel{
        background-color: #e1e1e1;
        color: #fff;
        font: 24px/24px  "Microsoft Ya Hei";
      }
    }

  }


  .footer{
/*    position: fixed;
    bottom: 0;
    z-index: 100;*/
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
