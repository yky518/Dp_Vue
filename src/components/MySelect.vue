<template>
  <div id="my-select" >
    <div style="display: flex;">
        <el-select v-model="value" @change="select" clearable>
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-input v-model="input" v-if="this.value=='others'"
                  style="width: 80px"
                  @change="inputOthers" placeholder="Others..."></el-input>

    </div>
  </div>
</template>

<script>
export default {
  name: "MySelect",
  props: ['options','default'],
  data(){
    return {
      value: "",
      input: ''
    }
  },
  watch:{
    default(n,o){
      console.log(n)
      this.default = n;
      this.value = this.default;
    }
  },
  created() {
    this.$nextTick(()=>{
      console.log(this.default)
      if(this.default){
        if(this.options.indexOf(this.default)>=0){
          this.value = this.default;
        }else{
          this.value = 'others';

          this.input = this.default;
        }
      }else{
        this.input = '';
      }
    })



  },
  methods:{
    select(){
      if(this.value != 'others'){
        this.$emit('success',this.value);
      }
    },
    inputOthers(){
      // this.value = this.input;
      this.$emit('success',this.input);
    }
  }

}
</script>

<style scoped>

</style>
