<template>
  <div id="file_upload" style="display: inline-block">

    <input
      type="file"
      :id="upload_id"
      class=""
      style="display:none;"
      @change="upload($event)"
    />
    <p style="margin: 0"><el-button class="file-button" :disabled="disabled" @click="browse" style="height:40px">{{text}}</el-button><i>{{file}}</i></p>

  </div>
</template>

<script>
  export default {
    name: "FileUpload",
    props:{
      upload_id: {
        type: String,
        default: ""
      },
      text: {
        type: String,
        default: ""
      },

      disabled: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return {
        file: ''
      }
    },
    methods:{
      upload(event){
        let file = event.target.files[0]
        this.file = file.name
        this.$emit("upload",file)
      },
      browse(){

        console.log("fas")
        console.log(this.upload_id)
        document.getElementById(this.upload_id).click()
      }

    }

  };
</script>

<style scoped lang="scss">
  .file-button{
    background-color:#f6f6f6;
    padding: 10px 20px;
    //margin-right: 20px;
    &:hover{
      color: #fff;
      background-color: #303479;
    }

  }
</style>
