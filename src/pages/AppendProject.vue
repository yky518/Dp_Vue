<template>
  <div id="append_project">
    <div class="header">
      <Header active="user2"></Header>
    </div>
    <AppendPart style="min-height: 850px;"></AppendPart>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import AppendPart from "../components/AppendPart";

    export default {
        name: "AppendProject",
      data(){


          return {
            formulaString: '',
            form: {
              elements: '',
              authors: this.$store.state.name,
              keywords: '',
              notes: ''
            }
          }
      },
      methods:{
          infoChange(value){
            this.formulaString = value

          },
          submit(formName){
            let string = this.formulaString
            let params = {
              elements: string,
              authors: this.form.authors,
              keywords: this.form.keywords,
              abstract: this.form.abstract
            }
              this.axios.post('/v1/user/insert_project', params).then(res=>{
                console.log(res.data.new_id)
                if(res.data.new_id!=-1){
                  this.showMessage('Success')
                  this.$router.push({path: "/project_edit",query:{
                      project_id: res.data.new_id
                    }})
                }

              }).catch(err=>{
                console.log(err)
              })
          },
        showMessage(message) {
          let icon = ''
          if (message == 'Success') {
            icon = 'el-icon-circle-check'
          } else {
            icon = 'el-icon-circle-close'
          }
          this.$alert(message, '', {
            confirmButtonText: 'OK',
            showClose: false,
            iconClass: icon,
            center: true,
            customClass: 'success-box',
            callback: action => {
              // this.$router.push("user_projects")
            }
          })
        },
        reset(formName){
          this.$refs[formName].resetFields();
          this.$refs['elementPicker'].clearElement();

        }
      },
      components:{
        Header,
        AppendPart,
        Footer
      }
    }
</script>

<style>

  .el-button{
    font-size: 22px!important;

  }

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

  .header{
    height: 100px;
    background: url("../assets/images/详情页头图.png");
    background-size:100% 100%;
  }

  .footer{
/*    position: fixed;
    bottom: 0;
    z-index: 100;*/
  }
</style>
