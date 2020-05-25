<template>
  <div id="project_edit">
    <div class="header">
      <Header active="user"></Header>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Project Info" name="project">
          <div class="card">
            <h2>Project Info</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form ref="project_info" :model="project_info" :label-width="labelWidth" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="ID">
                    <!--                <el-input v-model="project_info.project_id"></el-input>-->
                    {{project_info.project_id}}
                  </el-form-item>
                </el-col>
                <el-col :span="10"  :offset="2">
                  <el-form-item label="Elements">
                    <!--                <el-input v-model="project_info.project_id"></el-input>-->
                    {{project_info.elements}}
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="10">
                  <el-form-item label="Authors" prop="authors">
                    <el-input v-model="project_info.authors"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Keywords" prop="keywords">
                    <el-input v-model="project_info.keywords"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22" >
                  <el-form-item label="Abstract" prop="abstract">
                    <el-input type="textarea" rows="3" v-model="project_info.abstract"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Updated Time" label-width="1rem">
                    <!--                <el-input v-model="project_info.update_time"></el-input>-->
                    {{project_info.update_time}}
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Submited Time" label-width="1rem">
                    <!--                <el-input v-model="project_info.first_submission_time"></el-input>-->
                    {{project_info.first_submission_time}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="text-align: center;">
                <el-button class="button-share"  round @click="changeAvilable()" :style="{backgroundColor: project_info.available>=0? '#e47a00':'#fbe7d1' }">
                  <img src="../assets/images/共享.png" class="icon-img">
                  <span style="vertical-align:middle">{{ project_info.available >= 0?'Share':'Not Share'}}</span>
                </el-button>
                <el-button class="button-cancel"  round @click="reload"><span class="cancel-text">Cancel</span></el-button>
                <el-button class="button-delete" round @click="projectDelete({ type: 'projects'})">
                  <img src="../assets/images/删除.png" class="icon-img">
                    <span style="vertical-align:middle">Delete</span>
                  </el-button>
                <el-button class="button-submit" round @click="projectSubmit">
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <!--      Model-->
        <el-tab-pane label="Model" name="model">
          <div class="card" id="model_info" v-if="models_info.length">
            <h2>Model Information</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form :label-width="labelWidth"v-for="(model, index) in models_info" :key="index" :ref="'model' + index" :model="model" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="ID">
                    <el-input v-model="model.id" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Update Time" label-width="1rem">
                    <el-input v-model="model.update_time" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Version">
                    <el-input v-model="model.version"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Notes">
                    <el-input v-model="model.notes"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Data">
                    <input type="file" :ref="'model_update'+index" @change="fileUpdate($event, 'model_update'+index,'models_info', index)" name="file">
                    <span v-if="model_update_input[index]" class="file-notice">Waiting for upload...</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="model['data']"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="button-row">
                <el-button round  class="button-submit" @click="modelEditSubmit">
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
                <el-button round  class="button-delete" @click="modelDelete({project_id: project_info['project_id'], model_id: model['id'], type: 'models'})">
                  <img src="../assets/images/删除.png" class="icon-img">
                  <span style="vertical-align:middle">Delete</span>
                </el-button>
              </el-row>
              <hr class="hr-margin" style="border:2px dotted #b6afd7;" v-if="index<models_info.length-1"/>

            </el-form>
          </div>
          <div class="card" id="model_add">
            <h2>Add Model</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form ref="model_add" :rules="rules1" :model="model_add" :label-width="labelWidth" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Version" prop="version">
                    <el-input v-model="model_add.version"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Notes" prop="notes">
                    <el-input v-model="model_add.notes"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Data" prop="data">
                    <!--                  <el-input v-model="model_add.notes"></el-input>-->
                    <input type="file" ref="model_add_input" @change="fileAdd($event, 'model_add_input','model_add')">
                    <span v-if="model_add_input" class="file-notice">Waiting for upload...</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="model_add.data"></el-input>
                  </el-form-item>

                </el-col>
              </el-row>
              <el-row class="button-row">
                  <el-button round  class="button-submit" @click="modelAddSubmit" v-if="model_add.version">
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>
                <el-button round  class="button-submit-disable" disabled v-else>
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
                  <el-button round  class="button-cancel" @click="resetForm('model_add')"><span class="cancel-text">Cancel</span></el-button>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Raw Data" name="data">
          <div class="card" id="raw_data">
            <h2>Raw Data</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form ref="raw_data" :model="project_info" :label-width="labelWidth" class="form-margin">
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Notes" prop="notes">
                    <el-input type="textarea" rows="3" v-model="project_info.notes"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Data" prop="data">
                    <input type="file" ref="raw_input" @click="testClick($event)" @change="fileAdd($event, 'raw_input','project_info')" name="file">
                    <span v-if="raw_input" class="file-notice">Waiting for upload...</span>
                    <el-input
                      type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  v-model="project_info['data']">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="button-row">
                  <el-button round  class="button-submit" @click="projectSubmit">
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>
                  <el-button round  class="button-cancel" @click="reload"><span class="cancel-text">Cancel</span></el-button>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="References" name="references">
          <div class="card" id="references" v-if="papers_info.length">
            <h2>Paper Information</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form :label-width="labelWidth" v-for="(paper, index) in papers_info" :ref="'paper' + index" :key="index" :model="paper" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Title">
                    <el-input v-model="paper.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Year">
                    <el-input v-model="paper.year"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Citation">
                    <el-input v-model="paper.citations"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="DOI">
                    <el-input v-model="paper.DOI"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Elements">
                    <ElementPicker :formula="paper.elements" @formchange="paperElementChange(arguments,index)"></ElementPicker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">
                  <el-form-item label="Software">
                    <el-input v-model="paper.software"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Keywords">
                    <el-input v-model="paper.keywords"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="Abstract">
                  <el-input type="textarea" rows="3" v-model="paper.abstract"></el-input>
                </el-form-item>
              </el-row>
              <el-row  class="button-row">
                <el-button round  class="button-submit" @click="paperEditSubmit(index)">
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
                <el-button round  class="button-delete" @click="paperDelete({project_id: project_info['project_id'], paper_id: paper['id'], type: 'papers'})">
                  <img src="../assets/images/删除.png" class="icon-img">
                  <span style="vertical-align:middle">Delete</span>
                </el-button>
              </el-row>
              <hr style="border:1px dotted #b6afd7;" />
            </el-form>
          </div>
          <div class="card" id="paper_add">
            <h2>Add New Paper</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form ref="paper_add" :rules="rules2" :model="paper_add" :label-width="labelWidth" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Title" prop="title">
                    <el-input v-model="paper_add.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Year" prop="year">
                    <el-input v-model="paper_add.year"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Citation" prop="citations">
                    <el-input v-model="paper_add.citations"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="DOI" prop="DOI">
                    <el-input v-model="paper_add.DOI"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Elements" prop="elements">
                    <ElementPicker ref="elementPicker" :formula="paper_add.elements" @formchange="paperAddElementChange(arguments)"></ElementPicker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">
                  <el-form-item label="Software" prop="software">
                    <el-input v-model="paper_add.software"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2" prop="keywords">
                  <el-form-item label="Keywords">
                    <el-input v-model="paper_add.keywords"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Abstract" prop="abstract">
                    <el-input type="textarea" rows="3" v-model="paper_add.abstract"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  class="button-row">
                  <el-button round  class="button-submit" @click="paperAddSubmit" v-if="paper_add.title">
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>
                  <el-button round  class="button-submit-disable" disabled v-else>
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>

                  <el-button round  @click="resetForm('paper_add')"><span class="cancel-text">Cancel</span></el-button>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Test Results" name="results">
          <div class="card" id="results_info" v-if="results_info.length">
            <h2>Result Information</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form  :label-width="labelWidth" v-for="(result, index) in results_info" :key="index" :model="result" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="ID">
                    <el-input v-model="result.id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Structure">
                    <el-input v-model="result.structure" placeholder="hcc"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Task">
                    <el-input v-model="result.type" placeholder="eos"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Task type"  >
                    <el-input v-model="result.models" placeholder="deepmd"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Data">
                    <input type="file" :ref="'result'+index" @change="fileUpdate($event, 'result'+index,'results_info', index)">
                    <span v-if="result_update_input[index]" class="file-notice">Waiting for upload...</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="result['data']"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  class="button-row">
                <el-button round  class="button-submit" @click="resultEditSubmit">
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
                <el-button round  class="button-delete" @click="resultDelete({project_id: project_info['project_id'], result_id: result['id'], type: 'results'})">
                  <img src="../assets/images/删除.png" class="icon-img">
                  <span style="vertical-align:middle">Delete</span>
                </el-button>
              </el-row>
              <hr class="hr-margin" style="border:1px dotted #b6afd7;" v-if="index<results_info.length-1"/>
            </el-form>
          </div>
          <div class="card" id="result_add">
            <h2>Add New Results</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form ref="result_add" :rules="rules3" :model="result_add"  :label-width="labelWidth" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Structure" prop="structure">
                    <el-input v-model="result_add.structure" placeholder="hcc"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Task" prop="type">
                    <el-input v-model="result_add.type"  placeholder="eos"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="Task type" prop="models">
                  <el-input v-model="result_add.models" placeholder="deepmd"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Data" prop="data">
                    <input type="file" ref="result_add_input" @change="fileAdd($event, 'result_add_input','result_add')">
                    <span v-if="result_add_input" class="file-notice">Waiting for upload...</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="result_add['data']"></el-input>
                  </el-form-item>

                </el-col>
              </el-row>
              <el-row  class="button-row">
                <el-button round  class="button-submit" @click="resultAddSubmit" v-if="result_add.structure">
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
                <el-button round  class="button-submit-disable" disabled v-else>
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>

                </el-button>
                <el-button round  class="button-cancel" @click="resetForm('result_add')"><span class="cancel-text">Cancel</span></el-button>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
    <Footer></Footer>

  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementPicker from "../components/ElementPicker";
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import style from "../common/style";

  let OSS = require('ali-oss');
    export default {
        name: "ProjectEdit",
      inject:['reload'],
      data(){

        return {
          test: 'Cu=Al',
          activeName: 'project',
          project_info: {},
          // porjectElementJson: {},
          models_info: [],
          papers_info: [],
          paparsElementJson: [],
          paparAddElementJson: {},
          results_info: [],
          model_add: {
            version: "",
            data: "",
            notes: "",
          },
          labelWidth: style.labelWidth,
          paper_add: {
            citations: "",
            title: "",
            elements: "",
            DOI: "",
            keywords: "",
            abstract: "",
            year: "",
            software: "",
          },
          result_add: {
            structure: "",
            type: "",
            models: "",
            data: ''
          },
          //文件提示
          model_update_input:[],
          model_add_input: false,
          raw_input: false,
          result_update_input:[],
          result_add_input:false,
          rules1:{
            version: [
              { required: true, message: 'Input your version', trigger: 'blur' }
            ],
          },
          rules2:{
            title: [
              { required: true, message: 'Input your version', trigger: 'blur' }
            ],
          },
          rules3:{
            structure: [
              { required: true, message: 'Input your version', trigger: 'blur' }
            ],
          },

        }
      },
      created(){
          this.axios.get('/v1/projects/project_details?project_id=' + this.$route.query.project_id).then(res=>{
            console.log(res.data)
            let data = res.data
            this.project_info = data.project_info
            this.models_info = data.models_info
            this.papers_info = data.papers_info
            this.results_info = data.results_info
            console.log(data.results_info.length)
            for(let i=0;i<data.results_info.length;i++){
              this.result_update_input.push(false)
            }
            for(let i=0;i<data.models_info.length;i++){
              this.model_update_input.push(false)
            }
            console.log(this.result_update)
            this.formulaString = data.project_info.elements
          }).catch(err=>{
            console.log(err)
          })
      },
      methods: {
      //提交前字符串校验，去掉0，1
        elementCheck(formulaJson){
          console.log(formulaJson)
          let string = ''
          for(let key in formulaJson){
            console.log(key)
            let tempItem = ''
            if(parseInt(formulaJson[key]) == 1){
              tempItem = key
            }else if(parseInt(formulaJson[key]) == 0){
              tempItem = ''
            }else{
              console.log(key)
              tempItem = key + (formulaJson[key].length>0?parseInt(formulaJson[key]): '')
            }
            if(!string){
              string += tempItem
            }else {
              string += tempItem?"-"+tempItem :''
            }
          }
          console.log(string)
          return string
        },
          // project_info 相关
/*        infoChange(value){
          this.porjectElementJson = value[0]
        },*/
        projectSubmit(){
          console.log(this.project_info)
          // this.project_info.elements =  this.elementCheck(this.porjectElementJson)
          this.axios.post('/v1/user/update_project', this.project_info).then(res=>{
            console.log(res.data)
            this.showMessage('Success')
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure')
          })
        },
        changeAvilable(){
          Vue.set(this.project_info, 'available', -1 - this.project_info.available)
          // this.project_info.elements =  this.elementCheck(this.porjectElementJson)
          this.axios.post('/v1/user/update_project', this.project_info).then(res=>{
            console.log(res.data)
            this.showMessage('Success')
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure')
          })
        },
        handleClick(tab, event){
          console.log(tab, event)
        },
        projectDelete: function(args){
          console.log(args)
          if(confirm('Are you sure to delete the data?')){
            this.axios.get('/user/delete_data?project_id=' + this.project_info.project_id +'&type=' + args['type']).then(res=>{
              console.log(res.data)
              this.$router.push('user_projects')
            }).catch(err=>{
              console.log(err)
            })
          }
        },

        //model相关
        modelDelete: function(args){
          console.log(args)
          if(confirm('Are you sure to delete the data?')){
            this.axios.get('/v1/user/delete_data?project_id=' + args['project_id'] + '&model_id='+ args['model_id']+'&type=' + args['type']).then(res=>{
              console.log(res)
              this.reload();
            })
            // window.open('http://39.98.150.188:5002/dplibrary/user/delete_data?project_id=' + args['project_id'] + '&model_id='+ args['model_id']+'&type=' + args['type'])
          }
        },
        modelEditSubmit(){
          this.axios.post('/v1/user/update_models', {
            models_data: this.models_info, project_id: this.project_info['project_id']
          }).then(res=>{
            console.log(res.data)
            this.showMessage('Success')
            // this.reload()
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure')
          })
        },
        modelAddSubmit(){
          if(this.model_add.version){
            this.models_info.push(this.model_add)
          }
          this.axios.post('/v1/user/update_models', {
            models_data: this.models_info, project_id: this.project_info['project_id']
          }).then(res=>{
            console.log(res.data)
            this.showMessage('Success')
            // this.reload()
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure')
          })
        },

        // paper相关
        paperElementChange(value, index){
          this.paparsElementJson[index] = value[0]
        },
        paperAddElementChange(value){
          this.paparAddElementJson = value[0]
        },
        paperDelete(args){
          console.log(args)
          if(confirm('Are you sure to delete the paper?')) {
            this.axios.get('/user/delete_data?project_id=' + args['project_id'] + '&paper_id=' + args['paper_id'] + '&type=' + args['type']).then(res => {
              console.log(res)
              // this.reload();
            })
          }
        },
        paperEditSubmit(index){
          this.papers_info[index].elements = this.elementCheck(this.paparsElementJson[index])
          console.log(
            this.papers_info
          )
          this.axios.post('/v1/user/update_papers', {
            papers_data:this.papers_info, project_id: this.project_info['project_id']
          }).then(res=>{
            console.log(res.data)
            this.reload()
          }).catch(err=>{
            console.log(err)
          })
        },
        paperAddSubmit(){
          this.paper_add.elements = this.elementCheck(this.paparAddElementJson)
          if(this.paper_add.title){
            this.papers_info.push(this.paper_add)
          }

          this.axios.post('/v1/user/update_papers', {
            papers_data:this.papers_info, project_id: this.project_info['project_id']
          }).then(res=>{

            console.log(res.data)
            this.showMessage('Success')
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure')
          })
        },
        //result相关
        resultDelete: function(args){
          console.log(args)
          if(confirm('Are you sure to delete the result?')){
            this.axios.get('/user/delete_data?project_id=' + args['project_id'] + '&result_id='+ args['result_id']+'&type=' + args['type']).then(res=>{
              console.log(res)
              this.reload();
            })
            // window.open('http://39.98.150.188:5002/dplibrary/user/delete_data?project_id=' + args['project_id'] + '&model_id='+ args['model_id']+'&type=' + args['type'])
          }
        },

        resultEditSubmit(){
          console.log({
            results_data: this.results_info, project_id: this.project_info['project_id']
          })
          this.axios.post('/v1/user/update_results', {
            results_data: this.results_info, project_id: this.project_info['project_id']
          }).then(res=>{

            console.log(res.data)
            this.showMessage('Success')
            // this.reload()
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure')
          })
        },
        resultAddSubmit(){
          if(this.result_add.structure){
            this.results_info.push(this.result_add)
          }

          console.log({
            results_data: this.results_info, project_id: this.project_info['project_id']
          })
          this.axios.post('/v1/user/update_results', {
            results_data: this.results_info, project_id: this.project_info['project_id']
          }).then(res=>{

            console.log(res.data)
            this.showMessage('Success')
            // this.reload()
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure')
          })
        },
        resetForm(formName) {
          console.log(formName)
          this.$refs[formName].resetFields();
          if(formName=="paper_add"){
            this.$refs['elementPicker'].clearElement();
          }
        },
        fileAdd:function(e,ref, fileType){

          let file = e.target.files[0];
          console.log(e.target)
          if(file.size>1024*1024*1024){
            this.$alert('size <= 1G!' ,'', {
              confirmButtonText: 'OK',
              showClose: false,
              iconClass: "el-icon-circle-close",
              center: true,
              customClass: 'success-box',
              callback: action => {
                this.$refs[ref].value = ""
                this[fileType].data=""
              }
            })
          }else{
            console.log(ref)
            this[ref] = true
            console.log(e.target)

            let storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/" + file.name;
            console.log(storeAs)
            console.log(this[fileType])

            console.log(file.name + ' => ' + storeAs);
            this.axios.get('/v1/user/get_token').then(res=>{
              let that = this
              let result = res.data.result
              console.log({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0',

              })
              let client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0',

              });
              var options = {
                callback: {
                  // 您的回调服务器地址，如http://oss-demo.aliyuncs.com:23450或http://127.0.0.1:9090。
                  url: 'http://39.98.150.188:5001/test_post',
                  // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                  host: 'oss-cn-hangzhou.aliyuncs.com',
                  // 设置发起回调请求的Content-Type。
                  body: 'bucket=1',
                  contentType: 'application/x-www-form-urlencoded',
                  // 设置发起回调请求的自定义参数。
                  customValue: {
                    var1: 'value1',
                    var2: 'value2'
                  }
                }
              }
              client.put(storeAs, file, options).then(function (result) {
                console.log(result);
                that[fileType].data= "https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs
                that[fileType].data_size= file.size
                that[ref] = false

                //文件上传成功消息提示
                const h = that.$createElement;
                that.$message({message:h('p',{style:'color:#33327e;font-size:0.15rem;'},"Upload successfully！")});

              }).catch(function (err) {
                console.log(err);
              });

            }).catch(err=>{
              console.log(err)
            })
            // OSS.urlib是sdk内部封装的发送请求的逻辑，开发者可以使用任何发送请求的库向`sts-server`发送请求
          }

        },
        fileUpdate:function(e,ref, fileType, index){

          let file = e.target.files[0];
          if(file.size>1024*1024*1024){
            this.$alert('Size <= 1M!' ,'', {
              confirmButtonText: 'OK',
              showClose: false,
              iconClass: "el-icon-circle-close",
              center: true,
              customClass: 'success-box',
              callback: action => {
                this.$refs[ref].value = ""
                that[fileType][index].data=""
              }
            })
          }else {
            //展示文件等待
            console.log(this.model_update_input)
            if(fileType=="results_info"){
              this.$set(this.result_update_input,index,true)
            }else if(fileType=="models_info"){
              this.$set(this.model_update_input,index,true)
            }
            let storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/" + file.name;
            console.log(storeAs)
            console.log(this[fileType])

            console.log(file.name + ' => ' + storeAs);
            // OSS.urlib是sdk内部封装的发送请求的逻辑，开发者可以使用任何发送请求的库向`sts-server`发送请求 http://39.98.150.188:5001/get_secret
            this.axios.get('/v1/user/get_token').then(res=>{
              let that = this
              let result = res.data.result
              console.log(res.data)
              console.log({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0',

              })
              let client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0',

              });
              var options = {
                callback: {
                  // 您的回调服务器地址，如http://oss-demo.aliyuncs.com:23450或http://127.0.0.1:9090。
                  url: 'http://39.98.150.188:5001/test_post',
                  // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                  host: 'oss-cn-hangzhou.aliyuncs.com',
                  // 设置发起回调请求的Content-Type。
                  body: 'bucket=1',
                  contentType: 'application/x-www-form-urlencoded',
                  // 设置发起回调请求的自定义参数。
                  customValue: {
                    var1: 'value1',
                    var2: 'value2'
                  }
                }
              }
              client.put(storeAs, file, options).then(function (result) {
                console.log(result);
                that[fileType][index].data= "https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs
                that[fileType][index].data_size= file.size
                //文件上传消息提醒
                if(fileType=="results_info"){
                  that.$set(that.result_update_input,index,false)
                }else if(fileType=="models_info"){
                  that.$set(that.model_update_input,index,false)
                }
                const h = that.$createElement;
                that.$message({message:h('p',{style:'color:#33327e;font-size:0.15rem;'},"Upload successfully！")});
              });

            }).catch(function (err) {
              console.log(err);
            });

          }

        },
        testClick(e){
          console.log(e.target)
        },
        showMessage(message){
          let icon = ''
          if(message=='Success'){
            icon = 'el-icon-circle-check'
          }else{
            icon = 'el-icon-circle-close'
          }
          this.$alert( message,'', {
            confirmButtonText: 'OK',
            showClose: false,
            iconClass: icon,
            center: true,
            customClass: 'success-box',
            callback: action => {
              this.reload()
            }
          })
        },
        signatureUrl(url){

        },
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

  .body{
    min-height: 800px;
  }

  #project_edit >>> .el-tabs__nav-scroll{
    margin-top: 20px;
  }

  #project_edit >>> .el-tabs__nav-wrap::after{
    height: 0;
  }
  #project_edit >>>  .el-tabs__item.is-active{
    color: #fff;
    background-color: #303479;
  }
  #project_edit >>>  .el-tabs__item{
    color: #333333;
    font-family: "Microsoft Ya Hei";
    font-size: 22px;
    margin: 10px 30px;
    padding: 0;
    width: 200px;
    box-shadow: 0 0 4px #8c939d;
    border-radius: 10px;
    line-height: 60px;
    height: 60px;
    text-align: center;
  }
  #project_edit >>>  .el-tabs__nav{
    width: 1400px;
    margin: 0 260px;
  }
  #project_edit >>>  .el-tabs__active-bar{
    height: 0;
  }
  #project_edit >>> .el-form-item__label{
    font-weight: 700;
    color: #353535;
    font-size: 22px;
  }

  #project_edit >>>.el-input{
    font-size: 22px;
  }
  #project_edit >>>.el-form-item__content{
    font-size: 22px;
  }

  #project_edit >>> .el-input__inner{
    background-color: #f6f6f6;
  }

  .button-share{
    background-color: #e47a00;
    color: #fff;
  }
  .button-cancel{
    background-color: #e1e1e1;
    color: #fff;
  }
  .button-delete{
    background-color: #d5334a;
    color: #fff;
  }
  .button-submit{
    background-color: #33327e;
    color: #fff;
  }

  .button-submit-disable{
    background-color: #b9bade;
    color: #fcffff;
  }

  .icon-img{
    height: 24px;
    vertical-align:middle;
  }

  #project_edit >>> .el-textarea__inner{
    background-color: #f6f6f6;
    resize: none;
    font-size: 22px;
  }
  .card{
    border-radius: 10px;
    box-shadow: 0 0 10px #e6e6f2;
    position: relative;
    padding:20px;
    z-index: 100;
    width: 1400px;
    margin: 20px auto;
  }

  .center-panel >>> .el-table__body{
    border-spacing: 0 30px
  }

  .center-panel >>> .el-table thead tr{
    height: 80px;
    border-radius: 20px;
  }

  .center-panel >>> tbody tr{
    height: 120px;
    margin-top: 10px;
    box-shadow: 0px 0px 20px #e9e9f4;
    border-collapse: separate;
    cellspacing:2px;
    cellpadding:2px;

  }

  .center-panel >>> .el-table__header-wrapper{
    border-radius: 20px;
  }

  .center-panel >>> td{
    border: 0!important;
  }

  .form-margin{
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .button-row{
    margin: 10px 0;
    text-align: center;
  }

  .hr-margin{
    margin-top: 20px;
  }

  .file-notice{
    color: red;
    font-size: 18px;
    font-family: "Microsoft Ya Hei";
  }

  .cancel-text{
    vertical-align: middle;
    line-height: 24px;
  }

</style>
