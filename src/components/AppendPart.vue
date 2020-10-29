<template>
  <div id="append">
    <el-card>
      <h2>Add Your Project</h2>
      <hr style="border:1px dashed #b6afd7;" />

      <el-form ref="form" :model="form" label-position="left"  label-width="0.80rem" class="form-margin">
        <el-row>
          <el-col :span="22">
            <el-form-item label="Elements" prop="elements">
              <ElementPicker ref="elementPicker" id="project-picker" @formchange="infoChange($event)"></ElementPicker>
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
            <span style="vertical-align:middle">Submit</span>

          </el-button>
          <el-button round  class="button-cancel" @click="reset('form')">Reset</el-button>
        </el-row>

      </el-form>
    </el-card>

  </div>
</template>

<script>
import ElementPicker from "./ElementPicker";
export default {
  name: "AppendPart",
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
      this.$confirm('Are you sure to reset this project?', '', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$refs[formName].resetFields();
        this.$refs['elementPicker'].clearElement();
      }).catch(() => {
      });


    }
  },
  components: {
    ElementPicker
  }
}
</script>

<style scoped>

#append{
  width: 1400px;
  margin: 40px auto 20px;
}
#append >>> .el-input__inner{
  background-color: #f6f6f6;
}


#append >>> .el-textarea__inner{
  background-color: #f6f6f6;
  resize: none;
  font-size: 22px;
}

#append >>> .el-form-item__label{
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
  height: 22px;
  vertical-align:middle;
}
.form-margin{
  margin-top: 30px;
}
</style>
