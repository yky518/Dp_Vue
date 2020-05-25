<template>
  <div id="project_details">
    <div class="header">
      <Header active="elements_list"></Header>
    </div>
    <div class="header-back">

    </div>
    <div class="center-panel">
      <div class="panel-item">
        <h2>{{project_info.project_id}}</h2>
        <el-row>
          <el-col :span="6">
            <p class="subtitle"><strong>Element: </strong>{{project_info.elements}}</p>
          </el-col>
          <el-col :span="6">
            <p class="subtitle"><strong>Keywords: </strong>{{project_info.keywords}}</p>
          </el-col>
          <el-col :span="6">
            <p class="subtitle"><strong>Authors: </strong>{{project_info.authors}}</p>
          </el-col>
        </el-row>
        <div class="card">
          <el-table :data="models_info" width="100%" border :header-cell-style="{'background-color': '#eeeeee'}">
            <el-table-column align="center" prop="version" label="Model Versions"></el-table-column>
            <el-table-column align="center" label="Operations">
              <template  v-slot="scope">
                <el-popover :ref="'model_notes'+scope.$index" placement="bottom-start" width="300" trigger="hover" :content="scope.row.notes"></el-popover>
 <!--               <el-button round v-if="scope.row.data" class="button-primary"  @click="download(scope.row.data)">
                  <img src="../assets/images/下载.png" class="icon-img">
                  <span style="vertical-align:middle;">Download</span>
                </el-button>-->
                <el-popover v-if="scope.row.data" placement="bottom-start" width="300" trigger="hover" :content="'File size: '+(scope.row.data_size/1024/1024).toFixed(3)+'M'">
                  <el-button  slot="reference" round   @click="download(scope.row.data)" class="button-primary">
                    <img src="../assets/images/下载.png" class="icon-img">
                    <span style="vertical-align:middle;">Download</span>
                  </el-button>
                </el-popover>
                <el-button round v-else class="button-disable" disabled>
                  <img src="../assets/images/下载—无.png" class="icon-img">
                  <span style="vertical-align:middle;">Unavailable</span>

                </el-button>
                <el-button round v-if="scope.row.data" class="button-note"  type="warning" v-popover="'model_notes'+scope.$index">
                  <img src="../assets/images/笔记.png" class="icon-img">
                  <span style="vertical-align:middle;">Notes</span>
                </el-button>
                <el-button round v-else class="button-note-disable"  v-popover="'model_notes'+scope.$index">
                  <img src="../assets/images/笔记-无.png" class="icon-img">
                  <span style="vertical-align:middle;">Notes</span>
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>

      <el-card id="raw-data" class="card-margin">
        <h3><strong>Raw Data</strong></h3>
        <el-popover v-if="project_info.data" placement="bottom-start" width="300" trigger="hover" :content="'File size: '+(project_info.data_size/1024/1024).toFixed(2)+'M'">
          <el-button  slot="reference" round   @click="download(project_info.data)" class="button-primary">
            <img src="../assets/images/下载.png" class="icon-img">
            <span style="vertical-align:middle;">Download</span>
          </el-button>
        </el-popover>
        <el-button round v-else class="button-disable" disabled>
          <img src="../assets/images/下载—无.png" class="icon-img">
          <span style="vertical-align:middle;">Download</span>
        </el-button>

        <el-popover v-if="project_info.notes" ref="popover1" placement="bottom-start" width="300" trigger="hover" :content="project_info.notes">
          <el-button slot="reference" round  class="button-note" >
            <img src="../assets/images/笔记.png" class="icon-img">
            <span style="vertical-align:middle;">Notes</span>
          </el-button>
        </el-popover>
        <el-button round v-else class="button-note-disable" disabled>
          <img src="../assets/images/笔记.png" class="icon-img">
          <span style="vertical-align:middle;">Notes</span>
        </el-button>
        <el-row>
          <el-col :span="10"><p>First Submited Time: {{project_info.first_submission_time}}</p></el-col>
          <el-col :span="10"><p>Updated Time: {{project_info.update_time}}</p></el-col>
        </el-row>
      </el-card>
      <el-card id="test-result"  class="card-margin">
        <h3>Test Results</h3>
        <div>
          <el-form>
            <el-row>
              <el-col :span="6">
                <el-form-item label="Task">
                  <el-select name="type" id="type" v-model="type" @change="getModels" placeholder="eos">
                    <el-option v-for="(typeItem, index) in allTypes" :value="typeItem" :key="index" :label="typeItem"></el-option>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="7">
                <el-form-item label="Task type">
                  <el-select name="models" id="models"   v-model="model_selected" @change="getStructures" placeholder="deepmd">
                    <el-option v-for="(modelItem,index) in tmpModels" :value="modelItem" :key="index" :label="modelItem"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="Structure">
                  <el-select name="structure" id="structure" v-model="structure" placeholder="hcc">
                    <el-option v-for="(structureItem, index) in tmpStructures" :value="structureItem" :key="index" :label="structureItem"></el-option>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="4">

                <el-button  round class="button-search" v-if="type&&model_selected&&structure"  @click="show_data">
                  <img src="../assets/images/筛选.png" class="icon-img">
                  <span style="vertical-align:middle;">Show results</span>
                </el-button>
                <el-button round class="button-search-disable"  v-else disabled>
                  <img src="../assets/images/筛选.png" class="icon-img">
                  <span style="vertical-align:middle;">Show results</span>
                </el-button>
              </el-col>
            </el-row>

          </el-form>
          <el-card v-if="show_img || show_text||show_tif||show_link">
            <div id="collapse-panel" >
              <img :src="result_data" alt="">
              <img v-if="show_img" :src="result_data" alt="img error" class="img-fluid">
              <a v-if="show_text" :href="result_data" style="word-wrap: break-word;">
                {{result_data}}
              </a>
              <div id="tif" v-if="show_tif" style="text-align: center">
              </div>
              <p v-if="show_link" style="text-align: center;color: red;">
                {{result_data}}
              </p>

            </div>
          </el-card>
        </div>
      </el-card>

      <el-card  id="papers" class="card-margin">
        <h3>Papers</h3>
        <el-collapse accordion>
          <el-collapse-item v-for="(paper, index) in papers_info" :key="index" :title="'Citation: ' + paper.citations">
            <div class="paper-item">
              <p><strong>Keywords:</strong>{{paper.keywords}}</p>
              <p><strong>DOI:</strong>{{paper.DOI}}</p>
              <p><strong>Update Time:</strong>{{paper.update_time}}</p>
              <p><strong>Abstract:</strong>{{paper.abstract}}</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card id="feedback" class="card-margin">
        <h3>Feedback</h3>
        <div class="user-row">
          <img src="../assets/images/头像-默认.png" class="avator-icon">
          <span class="main-user">
            {{current_user}}
          </span>
        </div>
        <el-form ref="user_reply" :model="my_feedback" :rules="rules" id="user_reply">
          <el-form-item prop="reply">
            <el-input type="textarea" v-model="my_feedback.reply" :rows="2"></el-input>
          </el-form-item>
          <el-row style="text-align:right;">
            <el-form-item>
              <el-button round class="button-primary" @click="globalSubmit('user_reply')">Reply</el-button>
              <el-button round @click="resetForm('user_reply')">Cancel</el-button>
            </el-form-item>
          </el-row>

        </el-form>
        <hr style="height:1px;border:none;border-top:1px solid #eeeefc;">

        <div style="padding: 10px;">
          <div  v-for="(feedback, index) in feedback_main_show">
            <div class="main-reply" @click="showReply(index)">
              <div class="user-row">
                  <img src="../assets/images/头像-默认.png" class="avator-icon">
                  <span class="name-text">{{feedback.user_name}}</span>
              </div>
              <div class="reply-content">
                <p class="feedback-text">{{feedback.data}}</p>
              </div>
              <p class="reply-time-text">{{feedback.update_time}}</p>
            </div>

            <div class="sub-reply" style="padding:10px;background-color:#f6f6f6;" v-if="feedback_sub[index].length" >
              <div v-for="(subFeedback, subIndex) in feedback_sub[index]">
                <div class="user-row">
                    <img src="../assets/images/头像-默认.png" class="avator-icon">
                    <span class="name-text">{{subFeedback.user_name}}</span>
                </div>
                <div class="reply-content">
                  <p class="feedback-text">{{subFeedback.data}}</p>
                </div>
                <p class="reply-time-text">{{subFeedback.update_time}}</p>
                <hr style="height:1px;border:none;border-top:1px dashed #f6f6f6;">
              </div>
            </div>
            <div class="sub-reply-form">
              <el-form ref="subreply" :rules="rules" :model="subReply[index]" v-if="subReply[index].show">
                <el-form-item prop="reply">
                  <el-input type="textarea"  v-model="subReply[index].reply" :rows="2"></el-input>
                </el-form-item>
                <el-row style="text-align:right;">
                  <el-form-item>
                    <el-button round class="button-primary" @click="subSubmit('subreply',index)">Reply</el-button>
                    <el-button round @click="subResetForm('subreply',index)">Cancel</el-button>
                  </el-form-item>
                </el-row>

              </el-form>
            </div>

<!--            <hr style="height:1px;border:none;border-top:1px solid #c3c1c1;">-->


          </div>


        </div>
        <el-row v-if="isMainShow" class="moreview-button" @click.native="showMore">
          <p>
            View all {{feedback_main.length}} replies
          </p>
        </el-row>
<!--        <div v-for="(feedback, index) in feedback_show">
          <el-row style="margin-bottom: 10px;">
            <el-col :span="10">
              <img src="../assets/images/头像-默认.png" class="icon-img">
              <span class="name-text">{{feedback.user_name}}</span>
            </el-col>
          </el-row>
          <div>
            <p class="feedback-text">{{feedback.data}}</p>
          </div>

          <p class="reply-time-text">{{feedback.update_time}}</p>
          <hr>

        </div>
        <el-row v-if="isMainButtonShow" class="moreview-button" @click.native="showMore">
          <p>
            View all {{feedback_info.length}} replies
          </p>
        </el-row>-->
      </el-card>

    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import Footer from "../components/Footer";

  import getSignatureUrl from "@/utils/oss.js";
  const Tiff = require('tiff.js');

    function unique_push(arr, item){
      if(arr.indexOf(item) < 0){
        arr.push(item);
      }
    }

    export default {
        name: "ProjectDetails",
        inject:['reload'],
        data(){
          return {
            feedback_main :[],
            feedback_main_show :[],
            feedback_sub: {},
            feedback_sub_show: {},
            models_info: [],
            papers_info: [],
            project_info: {},
            results_info: [],
            result_data: '',
            isMainShow: false,
            isSubShow: [],
            model_selected: '',
            allTypes: [],
            tmpModels: [],
            tmpStructures: [],
            type: '',
            models: '',
            structure:'',
            show_img: false,
            show_link: false,
            show_text: false,
            show_tif: false,
            current_user: 'Guest',
            my_feedback: {
              reply_tid: '-1',
              reply: '',
              project_id: '',
              user_name: ''
            },
            subReply: [],
            rules:{
              reply: [
                { required: true, message: 'Input your reply', trigger: 'blur' },
                { min: 6,  message: 'Length more then 6', trigger: 'blur' }
              ]
            }



          }
        },
      created() {
          let project_id = this.$route.query.project_id
        this.current_user = this.$store.state.name?this.$store.state.name:"Guest"
        console.log(this.current_user)
          if(project_id){
            let url = '/test/test_project_details?project_id=' + project_id
            this.axios.get(url).then(res => {

              for(let item of res.data.feedback_info){
                if(item.reply_tid == 0){
                  this.feedback_main.push(item)
                }
              }
              console.log(this.feedback_main)
              for(let i=0;i<this.feedback_main.length;i++){
                this.feedback_sub[i] =  []
                this.subReply.push({
                  reply: '',
                  show: false
                })
                this.isSubShow.push(false)
              }

              for(let item of res.data.feedback_info){
                if(item.reply_tid > 0){
                  this.feedback_sub[item.reply_tid-1].push(item)
                }
              }

              if(this.feedback_main.length > 5) {
                this.feedback_main_show = this.feedback_main.slice(0,5)
                this.isMainShow = true
              }else{
                this.feedback_main_show = this.feedback_main
              }
              this.models_info = res.data.models_info
              this.papers_info = res.data.papers_info
              this.project_info = res.data.project_info
              this.results_info = res.data.results_info
              for(let result of this.results_info){
                console.log(result.type)
                unique_push(this.allTypes, result.type);
              }
            }).catch(function (error){
              console.log(error)
            })
          }

      },
      methods: {
        show_data:function(){
          for(let result of this.results_info) {
            if (result.type == this.type && result.models == this.model_selected && result.structure == this.structure) {
              //  获得阿里云token，添加文件下载参数
              if(result.data==""){
                this.show_text = false;
                this.show_img = false;
                this.show_tif = false;
                this.show_link = true;
                this.result_data = "No data"
                return
              }
              let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
              let originalUrl = result.data
              let object_key = originalUrl.replace(region, '')
              this.axios.get('/v1/user/get_token').then(res => {

                let tokenData = res.data.result
                let signatureUrl = getSignatureUrl(tokenData, object_key)

                this.result_data = signatureUrl


                this.show_text = true;
                this.show_img = false;
                this.show_tif = false;
                this.show_link = false;
                let dataStr = object_key.substr(object_key.length - 5, 5)
                //image
                let img_marks = ['.png', '.jpg', '.jpeg', ".gif"]
                for (let img of img_marks) {
                  if (dataStr.indexOf(img) >= 0) {
                    this.show_img = true;
                    this.show_text = false;
                    this.show_tif = false;
                    this.show_link = false;
                  }
                }

                //tiff.js加载网络图片
                if (dataStr.indexOf('.tif') >= 0) {

                  this.show_img = false;
                  this.show_text = false;
                  this.show_tif = true;
                  this.show_link = false;
                  var that = this
                  //tiff
                  var xhr = new XMLHttpRequest();
                  xhr.responseType = 'arraybuffer';
                  xhr.open('GET', this.result_data);

                  var h = that.$createElement;
                  this.$message({message:h('p',{style:'color:#33327e;font-size:0.15rem;'},"Loading tiff file!")});
                  xhr.onload = function (e) {
                    var tiff = new Tiff({buffer: xhr.response});
                    var canvas = tiff.toCanvas();
                    if (canvas) {
                      //这里视个人情况修改
                      canvas.setAttribute('style', 'width: 6.5rem;');
                      var tiff_div = document.getElementById('tif');
                      tiff_div.innerHTML=''
                      tiff_div.appendChild(canvas)
                    }else{
                      that.$message({message:h('p',{style:'color:#33327e;font-size:0.15rem;'},"Failure show Tiff file")});

                    }
                  }
                  xhr.send();


                }
              }).catch(err => {
                console.log(err)
              })
            }

          }

        },
        getModels:function(){
          let type_results = [];
          this.tmpModels = [];
          this.tmpStructures = [];
          this.model_selected = ''
          this.structure = ''
          for(let result of this.results_info){
            if(result.type == this.type){
              type_results.push(result);
              unique_push(this.tmpModels, result.models)
            }
          }
          this.type_results = type_results;
        },
        getStructures:function(){
          let model_results = [];
          this.tmpStructures = [];
          for(let result of this.results_info){
            if(result.type == this.type && result.models == this.model_selected){
              model_results.push(result);
              unique_push(this.tmpStructures, result.structure)
            }
          }
          this.model_results = model_results;
        },
        globalSubmit(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.my_feedback.project_id = this.project_info.project_id
              this.my_feedback.reply_tid = 0
              this.my_feedback.user_name = this.current_user
              console.log(this.my_feedback)
              this.axios.post('/v1/user/append_feedback', this.my_feedback).then(res=>{
                console.log(res.data)
                if(res.data.result == 'success'){
                  this.$alert('Successfully' ,'', {
                    confirmButtonText: 'OK',
                    showClose: false,
                    iconClass: "el-icon-circle-check",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      this.reload();
                    }
                  })
                }else{
                  console.log(res.data.result)
                  // this.showErr = true
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
              }).catch(function(err){
                console.log(err)
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        subSubmit(formName,mainIndex){
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              let reply = {
                project_id:this.project_info.project_id,
                reply_tid: mainIndex+1,
                reply: this.subReply[mainIndex].reply,
                user_name:  this.current_user
              }
              console.log(reply)
              this.axios.post('/v1/user/append_feedback', reply).then(res=>{
                console.log(res.data)
                if(res.data.result == 'success'){
                  this.$alert('Successfully' ,'', {
                    confirmButtonText: 'OK',
                    showClose: false,
                    iconClass: "el-icon-circle-check",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      this.reload();
                    }
                  })
                }else{
                  console.log(res.data.result)
                  // this.showErr = true
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
              }).catch(function(err){
                console.log(err)
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        resetForm(formName){
          this.$refs[formName].resetFields()
        },
        subResetForm(formName){
          this.$refs[formName][0].resetFields()
        },
        showMore(){
          console.log("shiow")
          this.feedback_main_show = this.feedback_main;
          this.isMainShow = false;

        },
        showReply(index){
          this.$set(this.subReply[index],'show', !this.subReply[index].show)
          if(this.subReply[index].show){
            for(let i in this.subReply){
              if(i != index){
                this.$set(this.subReply[i],'show', false)
              }
            }
          }


        },
        download(dataUrl){
          let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
          let object_key = dataUrl.replace(region, '')

          this.axios.get('/v1/user/get_token').then(res => {
            console.log(object_key)
            console.log(res.data)

            if(res.data.result=="failed"){
              //get_token失败
              this.$alert('Login for download' ,'', {
                confirmButtonText: 'OK',
                showClose: false,
                iconClass: "el-icon-circle-close",
                center: true,
                customClass: 'success-box',
                callback: action => {
                  return
                }
              })
            }else{
              let tokenData= res.data.result
              console.log(tokenData)
              let signatureUrl = getSignatureUrl(tokenData,object_key)
              console.log(signatureUrl)
              window.location.href = signatureUrl
            }

          }).catch(err => {
            console.log(err)
          })


        }

      },
      components:{
        Header,
        Footer
      }
    }

</script>

<style>
  .success-box .el-button--small{
    background-color: #303479;
    border-radius: 15px!important;
    padding: 10px 20px;
  }

  .success-box  .el-message-box__status{
    color: #303479;
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
    width: 100%;
    /*position: fixed;*/
    /*top: 0;*/
    z-index:10;
    height: 100px;
    background: url("../assets/images/projectsdetails导航背景.png");
    background-size:100% 100%;
  }
  .header-back{
    /*margin-top: 100px;*/
    height: 350px;
    background: url("../assets/images/projectsdetails头部背景.png");
    background-size:100% 100%;
  }

  .title{
    font-family: "Microsoft Ya Hei";
    font-size: 36px;
    font-weight: 500;
    color: #ffffff;
  }

  .subtitle{
    font-family: "Microsoft Ya Hei";
    font-size: 22px;
    color: #d5d6e7;
  }

  .card{
    overflow: auto;
    border-radius: 10px;
  }
  .center-panel >>> .el-card{
    border-radius: 10px;
  }

  .center-panel{
    width: 1400px;
    margin: -360px auto 40px;
  }


  #papers >>> .el-collapse-item__header {
    background-color: #f9faff;
    padding-left: 10px;
  }
  #papers >>> .el-collapse-item__wrap{
    background-color: #f9faff;
  }
  #user_reply >>> .el-textarea__sub{
    background-color: #f6f6f6;
    resize: none;
  }

  .button-primary{
    background-color: #33327e;
    border: 0;
    color: #fff;
  }
  .button-disable{
    background-color: #dadbed!important;
    border: 0;
    color:#fffeff!important;
  }
  .button-note{
    background-color: #bf6c00;
    border: 0;
    color:#fcffff;
   }
  .button-note-disable{
    background-color: #ebdece;
    border: 0;
    color:#fffeff;
  }
  .button-search{
    background-color: #0088ee;
    border: 0;
    color:#fcffff;
  }
  .button-search-disable{
    background-color: #ddebf5!important;
    border: 0;
    color:#fffeff!important;
  }
  .icon-img{
    height: 20px;
    vertical-align: middle;
  }

  .card-margin{
    margin: 10px 0;
  }
  .reply-time-text{
    color: #999999;
  }
  .moreview-button{
    background-color:#999999;
    text-align: center;
    height: 70px;
    font-size: 20px;
    color:#303479;
    font-family: "Microsoft Ya Hei";
  }


  /*feedback */

  .feedback-panel >>> .el-textarea__inner{
    border-radius: 10px;
    background-color: #f6f6f6;
  }

  .sub-reply-form{
    margin-top: 20px;
  }
</style>

<style scoped lang="scss">
  $main-font:20px;
  $main-font-family: "Microsoft Ya Hei";
  .center-panel{
    p{
      font-size: $main-font;
      font-family: $main-font-family;
    }
    h2{
      font-size: 30px;
      font-family: $main-font-family;
      color: #ffffff;
    }
    h3{
      font-size: 24px;
      font-family: $main-font-family;
      color: #333333;
    }

    .panel-item{
      margin: 10px 0;
      .card{
        >>>.el-table{
          .el-table__header{
            .cell{
              font-size: 24px;
              color: #333333;
              font-family: "Microsoft Ya Hei";
            }

          }
          .el-table__body{
            .cell{
              font-size: 20px;
              color: #666666;
              font-family: "Microsoft Ya Hei";

              .el-button{
                font-size: 20px;
              }
            }

          }

        }


      }
    }

    #raw-data{
      >>> .el-button{
        font-size: 20px;
      }
    }

    #test-result{
      >>> .el-form-item__label{
        font-size: $main-font;
        font-family: $main-font-family;
      }

      >>> .el-input__inner{
        font-size: $main-font;
        font-family: $main-font-family;
        width: 220px;
      }

      >>> .el-button{
        font-size: $main-font;
      }
    }

    #papers{
      >>> .el-collapse-item__header{
        font-size: $main-font;
        font-family: $main-font-family;
      }
      .paper-item{
        padding-left: 20px;
        font-size: 18px;
        font-family: $main-font-family;
      }
    }

    #feedback{
      .user-row{
        margin-bottom: 20px;

        .avator-icon{
          height: 30px;
          vertical-align: middle;
        }
        .main-user{
          font-size: 20px;
          vertical-align: middle;
        }
        .name-text{
          font-size: 20px;
          font-family: "Microsoft Ya Hei";
          color: #333333;
          vertical-align: middle;
        }
      }

      .reply-content{
        .feedback-text{
          text-indent: 20px;
          font-size: 18px;
          font-family: "Microsoft Ya Hei";
        }

      }

    }


  }

</style>

<style lang="scss">
  $main-font:20px;
  $main-font-family: "Microsoft Ya Hei";
  .el-select-dropdown__item{

    font-size: $main-font;
    font-family: $main-font-family;
  }
</style>
