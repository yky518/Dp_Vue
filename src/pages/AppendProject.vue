<template>
  <div id="append_project">
    <div class="header">
      <Header active="use2"></Header>
    </div>
    <div id="body">
      <el-card>
        <h2>Add Your Project</h2>
        <hr style="border:1px dashed #b6afd7;" />

        <el-form ref="form" :model="form" label-position="left"  label-width="0.80rem" class="form-margin">
          <el-row>
            <el-col :span="22">
              <el-form-item label="Elements" prop="elements">
                <ElementPicker ref="elementPicker" id="project-picker" @formchange="infoChange(arguments)"></ElementPicker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="Authors" prop="authors">
                <el-input v-model="form.authors"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="Keywords" prop="keywords">
                <el-input v-model="form.keywords"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="Abstract" prop="abstract">
                <el-input type="textarea" rows="3" v-model="form.abstract"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align: center;">
              <el-button round  class="button-submit" @click="submit('form')">
                <img src="../assets/images/提交.png" class="icon-img">
                Submit
              </el-button>
              <el-button round  class="button-cancel" @click="reset('form')">Cancel</el-button>
          </el-row>

        </el-form>
      </el-card>

    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
  import ElementPicker from "../components/ElementPicker";
  import Header from "../components/Header";
  import Footer from "../components/Footer";

    export default {
        name: "AppendProject",
      data(){


          let elements = ['H', 'He', 'Li', 'Be']
          let elementsList = ['H', 'He', 'Li', 'Be']
          return {
            elementsList: elementsList,
            numbersList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            elementAppend: '',
            numberAppend: '',
            formulaJson: {},
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
            this.formulaJson = value[0]
            this.formulaString = value[1]

          },

          elementCheck(){
            let string = ''
            for(let key in this.formulaJson){
              let tempItem = ''
              if(parseInt(this.formulaJson[key]) == 1){
                tempItem = key
              }else if(parseInt(this.formulaJson[key]) == 0){
                tempItem = ''
              }else{
                tempItem = key + (this.formulaJson[key].length>0?parseInt(this.formulaJson[key]): '')
              }
              if(!string){
                string += tempItem
              }else {
                string += tempItem?"-"+tempItem :''
              }
            }
            return string
          },
          submit(formName){
            let string = this.elementCheck()
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
        ElementPicker,
        Header,
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
  #body{
    width: 1400px;
    margin: 20px auto 240px;
  }
  #body >>> .el-input__inner{
    background-color: #f6f6f6;
  }


  #body >>> .el-textarea__inner{
    background-color: #f6f6f6;
    resize: none;
    font-size: 22px;
  }

  #body >>> .el-form-item__label{
    font: 24px/40px PingFang SC;
    font-weight: 500;
    color: #333333;
  }

  .button-submit{
    background-color: #33327e;
    color: #fff;
    font: 24px/24px "Microsoft Ya Hei";

  }

  .button-cancel{
    background-color: #e1e1e1;
    color: #fff;
    font: 24px/24px  "Microsoft Ya Hei";
  }

  .icon-img{
    height: 22px
  }
  .form-margin{
    margin-top: 30px;
  }
  .footer{
    position: fixed;
    bottom: 0;
    z-index: 100;
  }
</style>
