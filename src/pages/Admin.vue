<template>
  <div id="append_project">
    <div class="header">
      <Header active="user2"></Header>
    </div>
    <div class="center-panel">

      <div class="table-panel">
        <el-table :header-cell-style="{'background-color': '#f3f3fe'}" :data="currentPageData" @row-click="toDetail">
          <el-table-column align="center" prop="project_id" label="Project"  min-width="11%"></el-table-column>
          <el-table-column align="center" prop="elements" label="Elements" min-width="11%"></el-table-column>
          <el-table-column align="center" prop="authors" label="Authors" min-width="11%"></el-table-column>
          <el-table-column align="center" prop="keywords" label="Keywords" min-width="11%"></el-table-column>
          <el-table-column align="center" prop="models" label="Model" min-width="10.5%"></el-table-column>
          <el-table-column align="center" label="Raw Data" min-width="10%">
            <template slot-scope="scope">
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
          <el-table-column align="center" label="Review" min-width="9%">
            <template v-slot="scope">
              <el-button type="text" style="color: #33327e;" size="small" @click.stop="handleReview(scope.$index, scope.row)">
                <img src="../assets/images/编辑.png" class="icon-img">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppendPart from "../components/AppendPart";

export default {
  name: "Admin",
  data(){
    return {
      currentPageData: []
    }
  },
  created() {
    this.axios.post('/v1/projects/get_review_projects',{page: 1}).then(res=>{
      console.log(res);
      this.currentPageData = res.data.result_details
    })

  },
  methods:{
    handleReview(index, row) {
      console.log(index, row);
      this.axios.post('/v1/projects/review_project', {
        project_id: row.project_id,
      }).then(res=>{
        console.log(res)
        if(res.data.result == 1){
          this.$alert('Review Success' ,'', {
            confirmButtonText: 'OK',
            showClose: false,
            iconClass: "el-icon-circle-check",
            center: true,
            customClass: 'success-box',
            callback: action => {
              window.location.reload();
            }
          })
        }
      })
    },
    toDetail(row){
      console.log(row);
      this.$router.push({ path: '/project_details' ,query: { project_id: row.project_id }})
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

<style scoped lang="scss">

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

.center-panel{
  width: 1400px;
  margin: 20px auto 40px;
  min-height: 600px;

}

.icon-img{
  height: 20px;
  vertical-align: middle;
}
</style>
