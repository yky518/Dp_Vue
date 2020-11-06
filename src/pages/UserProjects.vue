<template>
  <div id="use_projects">
    <div class="header">
      <Header active="user"></Header>
    </div>
    <div class="header-back">

    </div>
    <div class="center-panel">
      <el-row >
        <el-col :span="1">
          <el-avatar :src="require('../assets/images/头像.png')"></el-avatar>
        </el-col>
        <el-col :span="5" class="author" >
          <span style="color:#fff;">User: {{$store.state.name}}</span>
        </el-col>
        <el-button @click="$router.push('/append_project')" style="float: right">Add Project</el-button>
      </el-row>

      <div class="table-panel">
        <el-table :header-cell-style="{'background-color': '#f3f3fe'}" :data="currentPageData">
          <el-table-column align="center" prop="project_id" label="Project"  min-width="11%"></el-table-column>
          <el-table-column align="center" prop="elements" label="Elements" min-width="11%"></el-table-column>
          <el-table-column align="center" prop="authors" label="Authors" min-width="11%"></el-table-column>
          <el-table-column align="center" prop="keywords" label="Keywords" min-width="11%"></el-table-column>
          <el-table-column align="center" prop="models" label="Model" min-width="10.5%"></el-table-column>
          <el-table-column align="center" label="Raw Data" min-width="12%">
            <template slot-scope="scope">
<!--              <el-button round v-if="scope.row.data" size="mini" type="primary" @click.stop="download(scope.row.data)">
&lt;!&ndash;                <img src="../assets/images/下载.png" class="icon-img">&ndash;&gt;
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
          <el-table-column align="center" prop="downloads" label="Downloads" min-width="11%"></el-table-column>
          <el-table-column align="center" prop="update_time" label="Updated Time" :formatter="formatter"  min-width="15.5%"></el-table-column>
          <el-table-column align="center" label="Edit" min-width="7%">
            <template v-slot="scope">
              <el-button type="text" style="color: #33327e;" size="small" @click="handleEdit(scope.$index, scope.row)">
                <img src="../assets/images/编辑.png" class="icon-img">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination-block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="countAll" background>
        </el-pagination>
      </div>
    </div>
    <Footer></Footer>

  </div>
</template>

<script>
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import getSignatureUrl from "@/utils/oss.js";
  import AppendPart from "../components/AppendPart";
    export default {
      name: "UserProjects",
      data(){
          return {
            userProjects: [],
            currentPageData: [],
            currentPage: 1,
            countAll: 0,
            pageSize: 10
          }
      },
      watch: {
        '$route' (to, from) {
          this.$router.go(0);
        }
      },
      mounted() {
        this.axios.get('/v1/projects/get_user_details').then(res=>{
          console.log(res.data)
          let allProjects = res.data.result_details
          if(this.$route.query.page){
            this.currentPage = parseInt(this.$route.query.page)
          }
          this.countAll = res.data.result_details.length
          let end = Math.min(this.currentPage * this.pageSize, this.countAll )
          this.currentPageData = allProjects.slice((this.currentPage - 1)*this.pageSize, end)
          console.log(this.currentPageData)
        }).catch(err=>{
          console.log(err)
        })

      },
      methods:{
        handleEdit(index, row) {
          console.log(index, row);
          let { href } = this.$router.resolve({ path: '/project_edit', query: {project_id:row.project_id }} );
          window.open(href, '_blank')
        },
        handleCurrentChange(currentPage){
          console.log(currentPage)
          this.$router.push({ path: '/user_projects', query: {page: currentPage}}).catch(err=>{
            console.log(err)
          })
        },
        download(dataUrl){
          if(this.$store.state.email_verify==0){
            this.$alert('Please activate email before download!' ,'', {
              confirmButtonText: 'OK',
              showClose: true,
              iconClass: "el-icon-circle-close",
              center: true,
              customClass: 'success-box',
              callback: action => {
                this.$router.push("/user_info")
              }
            })
          }else{
            let region = 'https://deeplibrary0.oss-cn-beijing.aliyuncs.com'
            let object_key = dataUrl.replace(region, '')

            this.axios.get('/v1/user/get_token').then(res => {
              console.log(object_key)
              console.log(res.data)

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


            }).catch(err => {
              console.log(err)
            })
          }

        },
        formatter(row, column){
          let date = row.update_time.split(' ');
          return date[0]
        }
      },
      components: {
        Header,
        Footer,
        AppendPart
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
/*    position: fixed;
    top: 0;*/
    z-index:10;
    height: 100px;
    background: url("../assets/images/userproject-导航背景.png");
    background-size:100% 100%;
  }
  .header-back{
    /*margin-top: 100px;*/
    height: 80px;
    background: url("../assets/images/userproject-作者背景.png");
    background-size:100% 100%;
  }
  .center-panel{
    width: 1400px;
    margin: -60px auto 40px;
    min-height: 600px;

  }
  .author{
    margin-top: 20px;
    margin-left: 20px;
    font-size: 22px;
  }
  .table-panel{
    padding-top: 20px;
  }

  .center-panel >>> .el-button--primary{
    background-color: #33327e;
    border: 0;
    color: #fff;
  }
  .center-panel >>> .el-avatar{
    height:60px;
    width: 60px;
  }

  .center-panel >>> .el-table__body{
    border-spacing: 0 30px
  }

  .center-panel >>> .el-table{
    background-color: transparent;
    font-size: 22px;
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
  .center-panel >>> .el-table .cell .el-button--mini{
    padding: 5px 10px;
    font-size: 14px;
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

  .center-panel >>> .el-table .sort-caret.ascending{
    top:0;
    border-width: 8px;
  }

  .center-panel >>> .el-table .sort-caret.descending{
    bottom: 0;
    border-width: 8px;
  }
  .center-panel >>> td{
    border: 0!important;
  }

  .pagination-block >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #33327e;
    color: #fff;
  }

  .pagination-block{
    font-size: 30px;
    margin: 20px 0;
    text-align: center;
  }

  .pagination-block >>> .el-pager li{
    font-size: 22px;
    padding: 0 5px ;
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

  .icon-img{
    height: 20px;
    vertical-align: middle;
  }


</style>
