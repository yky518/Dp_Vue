<template>
  <div id="papers_list">
    <el-table :data="papersList" style="margin:0 auto;width:600px;">
      <el-table-column prop="title" label="Title" width="150"></el-table-column>
      <el-table-column prop="elements" label="Elements" width="150"></el-table-column>
      <el-table-column prop="keywords" label="Keywords" width="150"></el-table-column>
      <el-table-column prop="DOI" label="DOI" sortable width="150"> </el-table-column>
    </el-table>
    <div class="block" style="text-align: center;">
      <el-pagination
        :current-page="pagination.currentPage"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="pagination.count_all" background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "PapersList",
      data(){
          return {
            papersList: [],
            pagination:{
              currentPage: 1,
              count_all: 0
            }
        }
      },
      created(){
        this.pagination.currentPage = parseInt(this.$route.query.page)
        let url = 'http://39.98.150.188:5002/dplibrary/v1/projects/get_papers_list?'
        if(this.$route.query.elements){
          url += '&elements=' + this.$route.query.elements
        }
        if(this.$route.query.page){
          url += '&page=' + this.$route.query.page
        }
        if(this.$route.query.keywords){
          url += '&keywords=' + this.$route.query.keywords
        }
        if(this.$route.query.doi){
          url += '&doi=' + this.$route.query.doi
        }
          this.axios.get('/v1/projects/get_papers_list').then(res=>{
            console.log(res.data)
            this.papersList = res.data
          }).catch(err=>{
            console.log(err)
          })
      },
      methods:{
        handleCurrentChange(currentPage){
          let pageQuery = {elements: this.$route.query.elements}
          pageQuery.page = currentPage
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
          this.$router.push({ path: 'papers_list', query: pageQuery}).catch(err=>{
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>

</style>
