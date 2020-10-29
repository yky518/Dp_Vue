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

        <div class="card-title" :style="{'overflow':'hidden','max-height':hiddenInfo?'200PX':'none'}">
          <div style="margin:0 10px;box-sizing:border-box;">
            <el-row type="flex" justify="space-between" gutter="10">
              <el-col :span="8">
                <p class="subtitle"><strong>Element: </strong>{{project_info.elements}}</p>
              </el-col>
              <el-col :span="8">
                <p class="subtitle"><strong>Keywords: </strong>{{project_info.keywords}}</p>
              </el-col>
              <el-col :span="8">
                <p class="subtitle"><strong>Authors: </strong>{{project_info.authors}}</p>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" gutter="10">
              <el-col :span="24">
                <p class="subtitle"><strong>License: </strong>{{license}}</p>
              </el-col>
            </el-row>
            <el-row ref="abstract">
              <el-col :span="24">
                <p class="subtitle">
                  <strong>Abstract: </strong>
                  <br>
                  <span  style="margin: 20px;line-height:18px;vertical-align: middle">{{project_info.abstract}}</span>
                </p>
              </el-col>
            </el-row>
            <el-button v-if="hiddenInfo" style="position:absolute;bottom: 0;left:0;width:100%;" @click="expand">Show more</el-button>


          </div>
          <el-button v-if="foldButton" style="width:100%;" @click="foldUp">Fold Up</el-button>


        </div>

        <div class="card">
          <el-table :data="models_info" width="100%" border :header-cell-style="{'background-color': '#eeeeee'}">
            <el-table-column align="center" prop="version" label="Model Versions"></el-table-column>
            <el-table-column align="center" label="Operations">
              <template  v-slot="scope">
                <el-popover :ref="'model_notes'+scope.$index" placement="bottom-start" width="300" trigger="hover" :content="scope.row.notes"></el-popover>
                <el-popover v-if="scope.row.data" placement="bottom-start" width="250" trigger="hover" :content="'File size: '+(scope.row.data_size/1024/1024).toFixed(3)+'M'">
                  <el-button  slot="reference" round   @click="download(scope.row.data)" class="button-primary">
                    <img src="../assets/images/下载.png" class="icon-img">
                    <span style="vertical-align:middle;">Data</span>
                  </el-button>
                </el-popover>
                <el-button round v-else class="button-disable" disabled>
                  <img src="../assets/images/下载—无.png" class="icon-img">
                  <span style="vertical-align:middle;">Unavailable</span>

                </el-button>

                <el-button round v-if="scope.row.param" class="button-note"
                           @click="download(scope.row.param)"
                           type="warning">
                  <img src="../assets/images/笔记.png" class="icon-img">
                  <span style="vertical-align:middle;">Params</span>
                </el-button>
                <el-button round v-else class="button-disable" disabled>
                  <img src="../assets/images/下载—无.png" class="icon-img">
                  <span style="vertical-align:middle;">Unavailable</span>

                </el-button>

                <el-button round v-if="model_note_isfile" class="button-note"
                           @click="download(scope.row.notes)"
                           type="warning">
                  <img src="../assets/images/笔记.png" class="icon-img">
                  <span style="vertical-align:middle;">Notes</span>
                </el-button>
                <el-button round v-else-if="scope.row.data" class="button-note"
                           type="warning" v-popover="'model_notes'+scope.$index">
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
        <el-popover v-if="project_info.data" placement="bottom-start" width="250" trigger="hover" :content="'File size: '+(project_info.data_size/1024/1024).toFixed(2)+'M'">
          <el-button  slot="reference" round   @click="download(project_info.data)" class="button-primary">
            <img src="../assets/images/下载.png" class="icon-img">
            <span style="vertical-align:middle;">Download</span>
          </el-button>
        </el-popover>
        <el-button round v-else class="button-disable" disabled>
          <img src="../assets/images/下载—无.png" class="icon-img">
          <span style="vertical-align:middle;">Download</span>
        </el-button>
        <el-button round   @click="download(project_info.input_file)" class="button-primary">
          <img src="../assets/images/下载.png" class="icon-img">
          <span style="vertical-align:middle;">Input File</span>
        </el-button>

        <el-button v-if="isNotesFile" round  class="button-note" @click="download(project_info.notes)">
          <img src="../assets/images/笔记.png" class="icon-img">
          <span style="vertical-align:middle;">Notes</span>
        </el-button>
        <el-button v-else-if="project_info.notes" round  class="button-note" @click="showNotes=!showNotes">
          <img src="../assets/images/笔记.png" class="icon-img">
          <span style="vertical-align:middle;">Notes</span>
        </el-button>
        <el-button round v-else class="button-note-disable" disabled>
          <img src="../assets/images/笔记.png" class="icon-img">
          <span style="vertical-align:middle;">Notes</span>
        </el-button>
        <div v-if="showNotes" class="notes-panel">
          <pre class="notes-text">
<b>Notes:</b>
{{project_info.notes}}
          </pre>

        </div>
        <h3>PseudoPotential</h3>
        <div v-if="isVasp">
          <p v-for="(item, index) in pseudoList" :key="'vasp' + index">
            <strong>{{ item.element }}: </strong>{{ item.hash }}
          </p>
        </div>
        <div v-else>
          <el-button round @click="download(pseudo)" class="button-primary">
            <img src="../assets/images/下载.png" class="icon-img">
            <span style="vertical-align:middle;">Download</span>
          </el-button>
        </div>
        <el-row>
          <el-col :span="10"><p>First Submitted Time: {{project_info.first_submission_time}}</p></el-col>
          <el-col :span="10"><p>Updated Time: {{project_info.update_time}}</p></el-col>
        </el-row>
      </el-card>
      <el-card id="test-result"  class="card-margin">
        <h3>Test Results</h3>
        <div>
          <el-form>
            <el-row>
              <el-col :span="7">
                <el-form-item label="Structure">
                  <el-select name="structure" id="structure" v-model="structure"  @change="getTasks" placeholder="hcc">
                    <el-option v-for="(structureItem, index) in allStructures" :value="structureItem" :key="index" :label="structureItem"></el-option>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="6">
                <el-form-item label="Task">
<!--                  @change="getModels"-->
                  <el-select name="type" id="type" v-model="type"  placeholder="eos" @change="getTaskTypes">
                    <el-option v-for="(typeItem, index) in tmpTasks" :value="typeItem" :key="index" :label="typeItem"></el-option>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="7">
                <el-form-item label="Task type">
                  <el-select name="models" id="models"   v-model="models" placeholder="deepmd">
                    <el-option v-for="(modelItem,index) in tmpTaskTypes" :value="modelItem" :key="index" :label="modelItem"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">

                <el-button  round class="button-search" v-if="type&&models&&structure"  @click="show_data">
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
          <el-card v-show="show_img || show_txt||show_tif||show_button||show_err" id="collapse-panel">

            <el-button size="small" v-if="show_button" @click="downloadResult">Download</el-button>
            <div>
              <p v-if="show_err">No data</p>
<!--              <img :src="result_data" alt="">-->
              <img v-if="show_img" :src="result_data" alt="img error" class="img-fluid">

              <div v-if="show_general" style="padding: 10px;">
                <pre>{{general_data}}</pre>
              </div>

              <div v-show="show_txt">
<!--                <a  :href="result_data" style="word-wrap: break-word;">
                  {{result_data}}
                </a>-->
                <div v-if="isElastic">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="elastic-div">
                        <pre>{{result_data.deepmdData}}</pre>

                      </div>

                    </el-col>
                    <el-col :span="8">
                      <div  class="elastic-div">
                        <pre>{{result_data.vaspData}}</pre>

                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="elastic-div">
                        <pre>{{result_data.rate}}</pre>

                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div v-if="isEqui">
                  <el-table :data="result_data" :header-cell-style="{backgroundColor:'#f8f8f9'}">
                    <el-table-column label="expr_type" prop="expr_type">

                    </el-table-column>
                    <el-table-column label="a" prop="a">

                    </el-table-column>
                    <el-table-column label="b" prop="b">

                    </el-table-column>

                    <el-table-column label="c" prop="c">

                    </el-table-column>
                    <el-table-column label="alpha" prop="alpha">

                    </el-table-column>
                    <el-table-column label="beta" prop="beta">

                    </el-table-column>
                    <el-table-column label="gamma" prop="gamma">

                    </el-table-column>
                    <el-table-column label="density" prop="density">

                    </el-table-column>
                    <el-table-column label="volume" prop="volume">

                    </el-table-column>
                    <el-table-column label="Energy(eV/atom)" prop="energy">

                    </el-table-column>
                  </el-table>
                </div>
                <div id="chart" v-show="!isElastic&&!isEqui" class="chart">

<!--                  <el-button @click="downloadResult(result_data)">Download</el-button>-->
                </div>
              </div>
              <div id="tif" v-if="show_tif" style="text-align: center">
              </div>

            </div>

          </el-card>
        </div>
      </el-card>

      <el-card  id="papers" class="card-margin">
        <h3>Papers</h3>
        <el-collapse accordion v-model="activePaper">
          <el-collapse-item v-for="(paper, index) in papers_info" :key="index" :title="'Citation: ' + paper.citations" :name="(index+1).toString()">
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
        <hr v-if="feedback_main_show.length>0" style="height:1px;border:none;border-top:1px solid #eeeefc;">

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
            isNotesFile: false,
            isVasp: false,
            pseudoList: [],//vasp类型，pseudoList表示MD5 hash的列表
            pseudo: '', //vasp类型时，pseudo表示文件地址
            license: "",
            model_note_isfile: false,
            feedback_main :[],
            feedback_main_show :[],
            feedback_sub: {},
            feedback_sub_show: {},
            models_info: [],
            papers_info: [],
            showNotes: false,
            activePaper: '1',
            project_info: {},
            results_info: [],
            hiddenInfo: false,
            foldButton: false,
            result_data: '',
            isMainShow: false,
            isSubShow: [],
            tmpTasks: [],
            tmpTaskTypes: [],
            allStructures: [],
            type: '',
            models: '',
            structure:'',
            typeResults: [],
            show_button: false,
            show_img: false,
            show_err: false,
            show_general: false,
            show_txt: false,
            show_tif: false,
            general_data: '',
            isElastic: false,
            isEqui: false,
            current_user: 'Guest',
            my_feedback: {
              reply_tid: '-1',
              reply: '',
              project_id: '',
              user_name: ''
            },
            infoHeight: 0,
            subReply: [],
            rules:{
              reply: [
                { required: true, message: 'Input your reply', trigger: 'blur' },
                { min: 6,  message: 'Length more then 6', trigger: 'blur' }
              ]
            }

          }
        },
      computed:{

      },
      mounted() {
          let project_id = this.$route.query.project_id
        this.current_user = this.$store.state.name?this.$store.state.name:"Guest"
        console.log(this.current_user)
          if(project_id){
            let url = '/v1/projects/project_details?project_id=' + project_id
            this.axios.get(url).then(res => {
              console.log(res.data)
              for(let item of res.data.feedback_info){
                if(item.reply_tid == 0){
                  this.feedback_main.push(item)
                }
              }
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
              let notes =  this.models_info[0].notes
              console.log(notes)
              if(/^https/.test(notes)){
                console.log("https")
                this.model_note_isfile = true
              }
              this.project_info = res.data.project_info
              console.log(this.project_info.license)
              switch (this.project_info.license){
                case "1":
                  this.license = 'Attribution-ShareAlike'
                  break
                case "2":
                  this.license = 'Attribution-NoDerivs'
                  break
                case "3":
                  this.license = 'Attribution-NonCommercial'
                  break
                case "4":
                  this.license = 'Attribution-NonCommercial-ShareAlike'
                  break
                case "5":
                  this.license = 'Attribution-NonCommercial-NoDerivs'
                  break
                default:
                  this.license = ''
              }
              console.log(this.license)
              if(this.project_info.code_type==="vasp"){
                this.isVasp = true
                this.pseudoList = JSON.parse(this.project_info.pseudo).elements
              }else{
                this.pseudo = JSON.parse(this.project_info.pseudo).url
              }

              if(/^https:/.test(this.project_info.notes)){
                this.isNotesFile = true
              }

              this.papers_info = res.data.papers_info

              this.results_info = res.data.results_info
              for(let result of this.results_info){
                console.log(result.structure)
                unique_push(this.allStructures, result.structure);
              }

              // this.infoHeight = this.$refs.info
              let me = this;
              this.$nextTick(function () {
                console.log(me.$refs.abstract.$el.scrollHeight)
                me.infoHeight = this.$refs.abstract.$el.scrollHeight
                if(me.infoHeight>200){
                  me.hiddenInfo = true

                }

              })

            }).catch(function (error){
              console.log(error)
            })
          }

      },
      methods: {
        expand(){
          this.hiddenInfo= !this.hiddenInfo
          this.foldButton = true
        },
        foldUp(){
          this.hiddenInfo= !this.hiddenInfo
          this.foldButton = false
        },
          //展示结果
        show_data:function(){
          this.isElastic = false
          this.isEqui =false
          this.axios.get('/v1/user/get_token').then(res => {

            let tokenData = res.data.result
            console.log(res.data)
            if(res.data.result=="failed"){
              this.$confirm('Login for results' ,'', {
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel',
                showClose: true,
                iconClass: "el-icon-circle-close",
                center: true,
                customClass: 'success-box',
              }).then(() => {
                this.$router.push("/login")
              }).catch(() => {
                return
              })
            }else{
              console.log(this.$store.state.email_verify)
              if(this.$store.state.email_verify==0){
                this.$confirm('Please activate email before download!', '', {
                  confirmButtonText: 'To Activate',
                  cancelButtonText: 'Cancel',
                  showClose: true,
                  iconClass: "el-icon-circle-close",
                  center: true,
                  customClass: 'success-box',
                }).then(() => {
                  this.$router.push("/user_info")
                }).catch(() => {
                  return
                })
              }else{
                //展示
                let resultsShow = []
                for(let result of this.results_info) {

                  if (result.type == this.type && result.structure == this.structure) {
                    resultsShow.push(result)
                  }
                }
                //数据
                if(resultsShow[0].data.indexOf('.txt')>0){
                  //txt文件
                  this.show_button = true;
                  this.show_txt = true;
                  this.show_img = false;
                  this.show_tif = false;
                  this.show_err = false;
                  this.show_general = false;

                  document.getElementById('chart').innerHTML= ''

                  if(this.type=='eos'){
                    this.getEosData(tokenData,resultsShow)
                  }else if(this.type=="surf"){
                    this.getSurfData(tokenData,resultsShow)
                  }else if(this.type=="vacancy"){
                    this.getVacancyData(tokenData,resultsShow)
                  }else if(this.type=="elastic"){
                    this.getElasticData(tokenData,resultsShow)
                  }else if(this.type=="equi"){
                    this.getEquiData(tokenData,resultsShow)
                  }
                }else {

                  //非可处理文件
                  let originalUrl = ''
                  let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'

                  for (let result of this.results_info) {
                    if (result.type == this.type && result.structure == this.structure && result.models == this.models) {
                      console.log(result)
                      if(result.data==""){
                        //空数据
                        this.show_button = false;
                        this.show_txt = false;
                        this.show_img = false;
                        this.show_tif = false;
                        this.show_err = true;
                        this.show_general = false;

                      }else{
                        //一般文件
                        originalUrl = result.data
                        let object_key = originalUrl.replace(region, '')
                        let dataStr = object_key.substr(object_key.length - 5, 5)
                        let signatureUrl = getSignatureUrl(tokenData, object_key)
                        this.getGeneralData(tokenData, signatureUrl)
                        this.result_data = signatureUrl
                        this.show_button = true;
                        this.show_img = false;
                        this.show_txt = false;
                        this.show_tif = false;
                        this.show_err = false;
                        this.show_general = true;

                        //图片文件
                        let img_marks = ['.png', '.jpg', '.jpeg', ".gif"]
                        for (let img of img_marks) {
                          if (dataStr.indexOf(img) >= 0) {
                            this.show_button = false;
                            this.show_img = true;
                            this.show_txt = false;
                            this.show_tif = false;
                            this.show_err = false;
                            this.show_general = false;


                          }
                        }

                        //tiff.js加载网络图片
                        if (dataStr.indexOf('.tif') >= 0) {
                          this.show_button = false;
                          this.show_img = false;
                          this.show_text = false;
                          this.show_tif = true;
                          this.show_err = false;
                          this.show_general = false;

                          var that = this
                          //tiff
                          var xhr = new XMLHttpRequest();
                          xhr.responseType = 'arraybuffer';
                          xhr.open('GET', this.result_data);
                          var h = that.$createElement;
                          this.$message({message: h('p', {style: 'color:#33327e;font-size:0.15rem;'}, "Loading tiff file!")});
                          xhr.onload = function (e) {
                            var tiff = new Tiff({buffer: xhr.response});
                            var canvas = tiff.toCanvas();
                            if (canvas) {
                              //这里视个人情况修改
                              canvas.setAttribute('style', 'width: 6.5rem;');
                              var tiff_div = document.getElementById('tif');
                              tiff_div.innerHTML = ''
                              tiff_div.appendChild(canvas)
                            } else {
                              that.$message({message: h('p', {style: 'color:#33327e;font-size:0.15rem;'}, "Failure show Tiff file")});
                            }
                          }
                          xhr.send();
                        }
                      }


                    }
                  }
                }

            }
          }

        }).catch(err => {
          console.log(err)
        })

        },
        getTasks(){
          this.tmpTasks = [];
          this.type = ''
          for(let result of this.results_info){
            if(result.structure == this.structure){
              unique_push(this.tmpTasks, result.type)
            }
          }
        },
        getTaskTypes(){
          this.tmpTaskTypes = []
          for(let result of this.results_info){
            if(result.structure == this.structure&&result.type==this.type){
              unique_push(this.tmpTaskTypes, result.models)
            }
          }
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
                  this.$confirm('Please Login' ,'', {
                    confirmButtonText: 'To Login',
                    cancelButtonText: 'Cancel',
                    showClose: false,
                    iconClass: "el-icon-circle-close",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      this.$router.push("/login")
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
              this.$confirm('Login for download' ,'', {
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel',
                showClose: true,
                iconClass: "el-icon-circle-close",
                center: true,
                customClass: 'success-box',
              }).then(() => {
                this.$router.push("/login")
              }).catch(() => {

              })
            }else{
              if(this.$store.state.email_verify==0) {
                this.$confirm('Please activate email before download!', '', {
                  confirmButtonText: 'To Activate',
                  cancelButtonText: 'Cancel',
                  showClose: true,
                  iconClass: "el-icon-circle-close",
                  center: true,
                  customClass: 'success-box',
                }).then(() => {
                  this.$router.push("/user_info")
                }).catch(() => {

                })
              }else{
                let tokenData= res.data.result
                console.log(tokenData)
                let signatureUrl = getSignatureUrl(tokenData,object_key)
                console.log(signatureUrl)
                window.location.href = signatureUrl
              }


            }

          }).catch(err => {
            console.log(err)
          })

        },
        getEosData: function(tokenData, resultsShow){

          let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
          let pattern = /(-)?\d+.\d+/g

          let data ={}
          let p = []

          let urls = []
          let tmpUrl= ''
          for(let result of resultsShow){
            tmpUrl=getSignatureUrl(tokenData, result.data.replace(region, ''))
            urls.push({
              label: result.models,
              signaturalUrl: tmpUrl
            })
          }
          console.log(urls)
          for(let index in urls){
            let p1 = this.axios.get(urls[index].signaturalUrl,{
              withCredentials: false,
            }).then(res=> {
              console.log(res.data)
              var rows = res.data.split('\n')
              let txtData = []
              for (let i = 2; i < rows.length; i++) {
                txtData.push(rows[i].match(pattern))
              }
              data[urls[index].label]=txtData
            })
            p.push(p1)
          }

          Promise.all(p).then(()=>{
            console.log(data)
            let legend = []
            let series = []

            for(let key in data) {
              legend.push(key)
              series.push(
                {
                  name: key,
                  type: 'line',
                  data: data[key]
                }
              )
            }
            console.log(legend)
            console.log(series)
            var chartDiv = document.getElementById('chart')
            chartDiv.removeAttribute("_echarts_instance_");
            let myChart = this.$echarts.init(chartDiv)
            myChart.setOption({
              title: { text: 'EOS Error Information' },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                data: legend
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },

              xAxis: {
                name: 'x',
                type: 'value',
                nameLocation: 'end',
                boundaryGap: false
              },
              yAxis: { type: 'value' },
              series: series
            })
          })

        },
        getSurfData(tokenData, resultsShow){

          let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
          let pattern = /\d+.\d{3}/g

          let deepmdData = []
          let vaspData = []
          let urls =[]
          let tmpUrl = ''
          let index = []
          let surf_all = []
          let min = 100
          let max = 0
          let p = []
          for(let result of resultsShow){

            tmpUrl=getSignatureUrl(tokenData, result.data.replace(region, ''))
            urls.push({
              label: result.models,
              signaturalUrl: tmpUrl
            })
          }
          console.log(urls)
          for(let url of urls){
            let promise = this.axios.get(url.signaturalUrl,{
              withCredentials: false
            }).then(res=> {
              var rows = res.data.split('\n')

              console.log(rows)
              let txtData = []
              console.log(url)
              for (let i = 2; i < rows.length; i++) {
                if(rows[i].match(pattern)!=null){

                  let tmpData = parseFloat(rows[i].match(pattern)[0])
                  if(tmpData<min){
                    min = tmpData
                  }
                  if(tmpData>max){
                    max=tmpData
                  }

                  index.push(rows[i].split('\s')[0]);
                  if(url.label=="deepmd"){
                    deepmdData.push(tmpData)
                  }else if(url.label=="vasp"){
                    vaspData.push(tmpData)
                  }

                }

              }
            })

            p.push(promise)
          }
          Promise.all(p).then(res=>{
            for(let n in deepmdData){
              surf_all.push([deepmdData[n],vaspData[n]])
            }
            console.log(index)
            console.log(surf_all)
            console.log(min)
            console.log(max)
            var tmpdiv = document.getElementById('chart')
            tmpdiv.removeAttribute("_echarts_instance_");
            let myChart = this.$echarts.init(tmpdiv)

            // surf
            myChart.setOption({
              title: { text: 'Surf vasp/deepmd  Error Information' },
              tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                  var relVal = ''
                  for (var i = 0; i < params.length; i++) {
                    relVal += '<div class="circle" ><span style="background:' + params.color + '"></span>' + index[params[0].dataIndex] + '     Vasp : ' + params[0].value[0] + ', Deepmd:' + params[0].value[1] + '</div>'
                  }
                  return relVal
                }
              },
              legend: {
                data: ['surf_all'],
                left: '70%',
                borderWidth: '2',
                borderColor: '#ccc',
                borderRadius: 5
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },

              xAxis: {
                name: 'vasp',
                nameLocation: 'end',
                boundaryGap: false,
                min: min,
                max: max

              },
              yAxis: {
                min: min,
                max: max
              },
              series: [{
                symbolSize: 20,
                name: 'surf_all',
                type: 'scatter',
                data: surf_all,
                markLine: {
                  symbol: ['none', 'none'], // 去掉箭头
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        type: 'solid',
                        color: {// 设置渐变
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 0, color: 'red '// 0% 处的颜色
                          }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                          }],
                          global: false // 缺省为 false
                        }
                      },
                      label: {
                        show: true,
                        position: 'middle'
                      }
                    }
                  },
                  data: [
                    [
                      {
                        coord: [min, min]
                      },
                      {
                        coord: [max, max]
                      }
                    ]]
                }
              }]
            })
        })
        },
        getVacancyData(tokenData, resultsShow){

          let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
          let pattern =/(([^0][0-9]+|0)\.([0-9]{1,3}))/

          let deepmdData = []
          let vaspData = []
          let index = new Set()
          let urls =[]
          let tmpUrl = ''
          let vacancy_all = []
          let min = 100
          let max = 0
          let p = []
          for(let result of resultsShow){

            tmpUrl=getSignatureUrl(tokenData, result.data.replace(region, ''))
            urls.push({
              label: result.models,
              signaturalUrl: tmpUrl
            })


          }

          for(let url of urls){
            let promise = this.axios.get(url.signaturalUrl,{
              withCredentials: false
            }).then(res=> {
              var rows = res.data.split('\n')
              console.log(rows)
              let txtData = []
              for (let i = 2; i < rows.length; i++) {
                if(rows[i].match(pattern)!=null){

                  let tmpData = parseFloat(rows[i].match(pattern)[0])
                  console.log(tmpData)
                  console.log(rows[i].match(pattern))
                  if(tmpData<min){
                    min = tmpData
                  }
                  if(tmpData>max){
                    max=tmpData
                  }

                  index.add(rows[i].split('\s')[0]);
                  if(url.label=="deepmd"){
                    deepmdData.push(tmpData)
                  }else if(url.label=="vasp"){
                    vaspData.push(tmpData)
                  }

                }

              }
            })

            p.push(promise)

          }

          Promise.all(p).then(res=>{
            for(let n in deepmdData){
              vacancy_all.push([deepmdData[n],vaspData[n]])
            }
            console.log(index)
            console.log(deepmdData)
            console.log(vaspData)
            console.log(vacancy_all)
            console.log(min)
            console.log(max)
            var tmpdiv = document.getElementById('chart')
            tmpdiv.removeAttribute("_echarts_instance_");
            let myChart = this.$echarts.init(tmpdiv)
            // surf
            myChart.setOption({
              title: { text: 'Vacancy vasp/deepmd  Error Information' },
              tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                  console.log(params)
                  var relVal = ''
                  for (var i = 0; i < params.length; i++) {
                    relVal += '<div class="circle" ><span style="background:' + params.color + '"></span>' + index[params[0].dataIndex] + '     Vasp : ' + params[0].value[0] + ', Deepmd:' + params[0].value[1] + '</div>'
                  }
                  return relVal
                }
              },
              legend: {
                data: ['vacancy_all'],
                left: '70%',
                borderWidth: '2',
                borderColor: '#ccc',
                borderRadius: 5
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },

              xAxis: {
                name: 'vasp',
                nameLocation: 'end',
                boundaryGap: false,
                min: min,
                max: max

              },
              yAxis: {
                min: min,
                max: max
              },
              series: [{
                symbolSize: 20,
                name: 'vacancy_all',
                type: 'scatter',
                data: vacancy_all,
                markLine: {
                  symbol: ['none', 'none'], // 去掉箭头
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        type: 'solid',
                        color: {// 设置渐变
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 0, color: 'red '// 0% 处的颜色
                          }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                          }],
                          global: false // 缺省为 false
                        }
                      },
                      label: {
                        show: true,
                        position: 'middle'
                      }
                    }
                  },
                  data: [
                    [
                      {
                        coord: [min, min]
                      },
                      {
                        coord: [max, max]
                      }
                    ]]
                }
              }]
            })
          })
        },
        getElasticData(tokenData, resultsShow){

          let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
          let pattern =/(([^0][0-9]+|0)\.([0-9]{1,3}))/

          let deepmdData = ''
          let deepBulk = 0
          let deepShear = 0
          let deepYoungs = 0
          let deepPoission = 0
          let vaspData = ''
          let vaspBulk = 0
          let vaspShear = 0
          let vaspYoungs = 0
          let vaspPoission = 0
          let bulkRate = 0
          let shearRate = 0
          let youngsRate = 0
          let poissionRate = 0
          let index = new Set()
          let vacancy_all = []
          let min = 100
          let max = 0
          let p = []

          this.result_data = {}

          for(let result of resultsShow){
            //先取deempd数据
            let originalUrl = result.data
            let object_key = originalUrl.replace(region, '')
            let signatureUrl = getSignatureUrl(tokenData, object_key)
            // let corUrl = signatureUrl.replace('http://deeplibrary0.oss-cn-beijing.aliyuncs.com','http://localhost:8080/ali')
            let corUrl = signatureUrl
            console.log(corUrl)
            let promise = this.axios.get(corUrl,{
              withCredentials: false
            }).then(res=> {
              var rows = res.data.split('\n')

              // console.log(rows)
              let txtData = []
              if(result.models=="deepmd"){
                deepmdData = res.data
                for (let i = 2; i < rows.length; i++) {

                  if(rows[i].match('Bulk')){
                    deepBulk = parseFloat(rows[i].match(pattern))
                  }else if(rows[i].match('Shear')){
                    deepShear = parseFloat(rows[i].match(pattern))
                  }else if(rows[i].match('Youngs')){
                    deepYoungs = parseFloat(rows[i].match(pattern))
                  }else if(rows[i].match('Poission')){
                    deepPoission = parseFloat(rows[i].match(pattern))
                  }


                }
              }else if(result.models=="vasp"){
                vaspData = res.data
                for (let i = 2; i < rows.length; i++) {

                  if(rows[i].match('Bulk')){
                    vaspBulk = parseFloat(rows[i].match(pattern))
                  }else if(rows[i].match('Shear')){
                    vaspShear = parseFloat(rows[i].match(pattern))
                  }else if(rows[i].match('Youngs')){
                    vaspYoungs = parseFloat(rows[i].match(pattern))
                  }else if(rows[i].match('Poission')){
                    vaspPoission = parseFloat(rows[i].match(pattern))
                  }

                }
              }
            })
            p.push(promise)
          }
          Promise.all(p).then(res=>{
            console.log(deepmdData)
            console.log(vaspData)
            bulkRate = ((deepBulk/vaspBulk-1)*100).toFixed(2)
            shearRate = ((deepShear/vaspShear-1)*100).toFixed(2)
            youngsRate = ((deepYoungs/vaspYoungs-1)*100).toFixed(2)
            poissionRate = ((deepPoission/vaspPoission-1)*100).toFixed(2)
            let rate = `
            deepmd - vasp / vasp
            Bulk : ${bulkRate}%
            Shear : ${shearRate}%
            Youngs: ${youngsRate}
            Poission Ratio : ${poissionRate}%
            `
            this.isElastic = true
            console.log(deepmdData)
            console.log(vaspData)
            Vue.set(this.result_data, "deepmdData", deepmdData)
            this.$set(this.result_data, "vaspData", vaspData)
            this.$set(this.result_data, "rate", rate)
          })
        },
        getEquiData(tokenData, resultsShow){

          let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
          let pattern =/((-)?([0-9]+|0)\.([0-9]{1,4}))/g

          let deepmdData = {}

          let vaspData = {}
          let p = []

          this.result_data = {}

          for(let result of resultsShow){
            //先取deempd数据
            let originalUrl = result.data
            let object_key = originalUrl.replace(region, '')
            let signatureUrl = getSignatureUrl(tokenData, object_key)
            let corUrl = signatureUrl
            // let corUrl = signatureUrl.replace('http://deeplibrary0.oss-cn-beijing.aliyuncs.com','http://localhost:8080/ali')
            console.log(corUrl)
            let promise = this.axios.get(corUrl,{
              withCredentials: false
            }).then(res=> {
              var rows = res.data.split('\n')
              console.log(rows[1])
              let tmpData = rows[1].match(pattern)
              console.log(tmpData)
              // console.log(rows)
              let txtData = []
              if(result.models=="deepmd"){
                deepmdData = {
                  expr_type: "deepmd",
                  a: tmpData[0],

                  b: tmpData[1],
                  c: tmpData[2],
                  alpha: tmpData[3],
                  beta: tmpData[4],

                  density:tmpData[5],
                  gamma:tmpData[6],
                  volume:tmpData[7],
                  energy:tmpData[8],
              }
              }else if(result.models=="vasp"){
                vaspData = {
                  expr_type: "vasp",
                  a: tmpData[0],

                  b: tmpData[1],
                  c: tmpData[2],
                  alpha: tmpData[3],
                  beta: tmpData[4],
                  gamma:tmpData[5],
                  density:tmpData[6],
                  volume:tmpData[7],
                  energy:tmpData[8],
              }
              }
            })
            p.push(promise)
          }
          Promise.all(p).then(res=>{
            console.log(deepmdData)
            console.log(vaspData)
            this.isEqui = true
            this.result_data = [deepmdData,vaspData]
          })
        },
        getGeneralData(tokenData, signatureUrl){

          this.axios.get(signatureUrl,{
            withCredentials: false,
          }).then(res=> {
            console.log(res.data)
            this.general_data = res.data;
          })


        },
        downloadResult(){


          this.axios.get('/v1/user/get_token').then(res => {

            let tokenData= res.data.result
            console.log(tokenData)

            for(let result of this.results_info) {

              if (result.type == this.type && result.structure == this.structure && result.models== this.models) {

                let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
                let originalUrl = result.data
                let object_key = originalUrl.replace(region, '')
                var signatureUrl = getSignatureUrl(tokenData, object_key)
                window.open(signatureUrl)
                // window.location.href = signatureUrl

              }

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

  .success-box .el-button--primary{
    background-color: #303479;
    border-radius: 15px!important;
    padding: 10px 20px;
  }

  .success-box .el-button--small{
    border-radius: 15px!important;
    padding: 10px 20px;

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


  .subtitle{
    font-family: "Microsoft Ya Hei";
    font-size: 22px;
    color: #333333;
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
    background-color: #ebdece!important;
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
    margin: 20px 0;
  }

  .card-title{
    /*margin: 20px 0;*/
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    margin-bottom: 40px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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

  .chart{
    width:1000px;
    height: 1000px;
  }

  .card-title >>> .el-button:hover{
    color: #303479;
    border-color: inherit;
    background-color: auto;
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
      font-size: 32px;
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

      .notes-panel{
        margin-left: 10px;
        padding: 20px;
        border-radius: 10px;
        background-color: #f9faff;

        .notes-text{
          font-size: 20px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      }

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
      .elastic-div{
        border: 2px solid #333333;
        border-radius: 5px;
        padding: 10px;
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
