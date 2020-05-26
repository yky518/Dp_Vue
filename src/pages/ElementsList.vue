<template>
  <div id="element_list">
    <div class="header">
      <Header active="elements_list"></Header>
    </div>
    <div class="form-row">
      <el-form :model="searchForm" ref="searchForm" :inline="true" size="mini" class="search-form">
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <el-form-item prop="element_selected">
              <el-select multiple filterable placeholder="Choose element..." v-model="searchForm.element_selected"  class="form-item" :popper-append-to-body="false">
                <el-option v-for="(element, index) in distinct_elements" :key="'elements' + index" :label="element.elements" :value="element.elements"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="model_selected">
              <el-select clearable name="models" placeholder="Model version" v-model="searchForm.model_selected"  class="form-item" :popper-append-to-body="false">
                <el-option v-for="(model, index)  in distinct_models" :value="model.version" :key="'models' + index" :label="model.version"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="authors" >
              <el-input id="author-search" type="text" placeholder="Author: " name="authors" v-model="searchForm.authors" class="form-item"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="keywords">
              <el-input id="keywords-search" type="text"  placeholder="Keywords: " name="keywords" v-model="searchForm.keywords" class="form-item"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
              <el-button @click="reset" style="background-color:#ffffff;border: 0;"  class="form-item"><i class="el-icon-close form-icon"></i></el-button>
          </el-col>
          <el-col :span="1">
            <el-button @click="onSubmit" style="background-color:#ffffff;border: 0;"  class="form-item"><i class="el-icon-search form-icon"></i></el-button>
          </el-col>


        </el-row>
      </el-form>
    </div>
    <div class="center-panel">
      <el-table class="list-table"
                :cell-style="{}"
                :header-cell-style="{'background-color': '#f3f3fe'}" id="table" :data="result_details" @row-click="toProject">
        <el-table-column align="center" prop="project_id" min-width="12%">

          <template slot="header" slot-scope="scope">
            <div style="display: flex;justify-content: center;">
              <div style="display: flex">
                Project
              </div>
            </div>


          </template>
        </el-table-column>
        <el-table-column align="center" prop="elements" label="Elements" min-width="12%">
        </el-table-column>
        <el-table-column align="center" prop="authors" label="Authors" min-width="12%">
        </el-table-column>
        <el-table-column align="center" prop="keywords" label="Keywords" min-width="12%">
        </el-table-column>
        <el-table-column align="center" prop="models" label="Model" min-width="12%">
        </el-table-column>
        <el-table-column align="center"  label="Raw Data" min-width="12%">
          <template slot-scope="scope">
<!--            <el-button round v-if="scope.row.data" type="primary" size="mini" @click.stop="download(scope.row.data)">
&lt;!&ndash;              <img src="../assets/images/下载.png" class="icon-img">&ndash;&gt;
              Download
            </el-button>-->
            <el-popover v-if="scope.row.data" placement="bottom-start" width="300" trigger="hover" :content="'File size: '+(scope.row.data_size/1024/1024).toFixed(3)+'M'">
              <el-button  slot="reference" round type="primary" size="mini"  @click.stop="download(scope.row.data)">
                <img src="../assets/images/下载.png" class="icon-img">
                <span style="vertical-align:middle;">Download</span>
              </el-button>
            </el-popover>
          </template>

        </el-table-column>
        <el-table-column align="center" prop="downloads" label="Downloads" min-width="12%">
        </el-table-column>
        <el-table-column align="center" prop="update_time"  :formatter="formatter" min-width="16%">
          <template slot="header" slot-scope="scope">
            <div style="display: flex;justify-content: center;">
              <div class="sort-column" style="display: flex">
                Update Time
              </div>
                <div class="sort-icon">
                  <i class="el-icon-caret-top top-icon" @click="sort(-1)"></i>
                  <i class="el-icon-caret-bottom bottom-icon" @click="sort(0)"></i>
                </div>
              </div>


          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-block">
        <el-pagination
          :current-page="pagination.currentPage"
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="pagination.count_all" background>
        </el-pagination>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  import getSignatureUrl from "@/utils/oss.js";

    export default {
        name: "ElementsList",
        data(){
          return {
            distinct_elements: [],
            distinct_models: [],
            author: '',
            keywords: '',
            result_details: [],
            searchForm: {
              element_selected: [],
              model_selected: '',
              authors: '',
              keywords: '',
            },
            pagination:{
              currentPage: 1,
              count_all: 0
            }
          }
        },
      created() {

        let elementsString = this.$route.query.elements
        let elementsList = new Array()
        if (elementsString){
          elementsList = elementsString.split('-')
        }
        if(elementsList.indexOf('')>=0){
          elementsList.splice(elementsList.length-1,1)
        }
        this.searchForm.element_selected = elementsList
        this.searchForm.keywords = this.$route.query.keywords
        this.searchForm.authors = this.$route.query.authors
        this.searchForm.model_selected = this.$route.query.models

        let param = {
          elements : elementsList ? elementsList : [],
          page: this.$route.query.page ? parseInt(this.$route.query.page): 1,
          keywords: this.$route.query.keywords? this.$route.query.keywords : '',
          authors: this.$route.query.authors ? this.$route.query.authors: '',
          models: this.$route.query.models ?this.$route.query.models: '',
          sort_type: this.$route.query.sort_type ?this.$route.query.sort_type: ''

        }
        this.pagination.currentPage = parseInt(this.$route.query.page)
          let url = '/v1/projects/get_elements_details?'
          this.axios.post(url, param).then((res) => {
            this.result_details = res.data.result_details
            this.distinct_models = res.data.distinct_models
            this.distinct_elements = res.data.distinct_elements
            this.pagination.count_all = parseInt(res.data.count_all)
          }).catch(function(err){
            console.log(err)
          })

      },
      watch: {
        '$route' (to, from) {
          this.$router.go(0);
        }
      },
      methods: {
        onSubmit(){
            let searchQuery = {}
            if(this.searchForm.element_selected.length>0){
              console.log(this.searchForm.element_selected)
              searchQuery.elements = ''
              for(let item of this.searchForm.element_selected){
                searchQuery.elements += item + '-'
              }

            }
            if(this.searchForm.model_selected){
              searchQuery.models = this.searchForm.model_selected
            }
            if(this.searchForm.authors){
              searchQuery.authors = this.searchForm.authors
            }
            if(this.searchForm.keywords){
              searchQuery.keywords = this.searchForm.keywords
            }
            console.log(searchQuery)
            this.$router.push({ path: '/elements_list', query: searchQuery})
          },
        reset(){
          this.$refs["searchForm"].resetFields();
        },
        toProject(row){
            console.log(row.project_id)
            let { href } = this.$router.resolve({ path: '/project_details' ,query: { project_id: row.project_id }});
            window.open(href, '_blank')
        },
        handleCurrentChange(currentPage){
          let pageQuery = {elements: this.$route.query.elements}
          pageQuery.page = currentPage
          if(this.$route.query.sort_type){
            pageQuery.sort_type = this.$route.query.sort_type
          }
          if(this.$route.query.models){
            pageQuery.models = this.$route.query.models
          }
          if(this.$route.query.authors){
            pageQuery.authors = this.$route.query.authors
          }
          if(this.$route.query.keywords){
            pageQuery.keywords = this.$route.query.keywords
          }
          console.log(pageQuery)
          this.$router.push({ path: '/elements_list', query: pageQuery}).catch(err=>{
            console.log(err)
          })
        },
        availableFormat(row, column) {
          if (row.available === '0') {
            return ''
          } else  {
            return 'Available'
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
        },
        formatter(row, column){
          let date = row.update_time.split(' ');
          return date[0]
        },
//排序
        sort(sort_type){
          console.log(sort_type)
          let sortQuery = {sort_type: sort_type}
          if(this.$route.query.elements){
            sortQuery.elements = this.$route.query.elements
          }
          if(this.$route.query.models){
            sortQuery.models = this.$route.query.models
          }
          if(this.$route.query.authors){
            sortQuery.authors = this.$route.query.authors
          }
          if(this.$route.query.keywords){
            sortQuery.keywords = this.$route.query.keywords
          }
          console.log(sortQuery)
          this.$router.push({ path: '/elements_list', query: sortQuery}).catch(err=>{
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

<style scoped>
  #element_list {

  }

  .header{
    width: 100%;
/*    position: fixed;
    top: 0;*/
    z-index:10;
    height: 100px;
    background: url("../assets/images/Projects-导航背景.png");
    background-size:100% 100%;
  }

  .form-row {
    /*margin-top: 100px;*/
    background: url("../assets/images/Projects-搜索背景.png");
    background-size:100% 100%;
    width: 100%;
    height: 78px;
    padding-top: -20px;
  }
  .search-form{
    width: 1400px;
    margin: 0 auto;
  }
  .form-item >>> .el-input__inner{
    border: 0;
    /*background-color: #4d4c8e;*/
    color: #333333;
    -webkit-text-fill-color: #333333;
    height: 44px!important;
    font-size: 20px;
  }

  .form-item >>> .el-select__input{
    font-size: 20px;
    height: 20px;
  }

  .form-item >>> .el-tag{
    font-size: 16px;
  }

  .form-row >>>.el-button{
    padding: 0 12px;
  }
  .form-item >>> .el-select-dropdown__item{
    font-size: 20px;
    margin: 5px 0;
  }

  .form-item{
    height: 44px;
    margin-top: 18px;
  }

  >>> .el-icon-search:before{
    color: #333333;
  }

  .pagination-block >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #33327e;
    color: #fff;
  }

  .pagination-block{
    margin: 20px 0;
    text-align: center;
  }

  .pagination-block >>> .el-pager li{
    font-size: 22px;
    padding: 5px 0;
    height:40px;
  }

  .pagination-block >>> .el-pagination button{
    height: 40px;
    line-height: 40px;
  }
  .pagination-block >>> .el-pagination span{
    font-size: 22px;
    height: 40px;
    line-height: 40px;
  }
  .center-panel{
    width: 1400px;
    margin: 0 auto;
    padding: 60px 0;
    min-height: 600px;
  }

  .center-panel >>> .el-table{
    font-size: 22px;
  }

  .center-panel >>> .el-button--primary{
    background-color: #33327e;
    border: 0;
    color: #fff;
  }

  .center-panel >>> .el-table__body{
    border-spacing: 0 30px
  }

  .center-panel >>> .el-table thead tr{
    height: 80px;
    border-radius: 20px;
  }

  .center-panel >>> .el-table .cell{
    line-height: 30px;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-word;
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

  .sort-icon{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    font-size: 24px;
    line-height: 80%;
  }

  .bottom-icon{
    line-height: 0.8;
  }

  .top-icon{
    line-height: 0.8;
  }

  .icon-img{
    height: 20px;
    vertical-align: middle;
  }
  .center-panel >>> .el-table .sort-caret.ascending{
    top:0;
    border-width: 8px;
  }

  .center-panel >>> .el-table .sort-caret.descending{
    bottom: 0;
    border-width: 8px;
  }
  .center-panel >>> .table-large-cell{
    font-size: 20px;

  }


  .form-icon{
    font-size: 20px;
  }
</style>
