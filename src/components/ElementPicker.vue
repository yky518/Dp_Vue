<template>
  <div id="element-picker">
    <!--formula样式element-->
    <div id="formula" style="font-size:0">
      <el-form :model="elementPicker" ref="elementPicker">

      </el-form>
      <el-select prop="elementAppend" v-model="elementPicker.elementAppend" filterable clearable @visible-change="addElement" style="width:15%;margin-right:2%;" placeholder="Element:">
        <el-option
          v-for="item in elementsList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
<!--      <el-select v-model="numberAppend" clearable @visible-change="addNumber" style="width:15%;margin-right:2%;" placeholder="Number:">
        <el-option
          v-for="item in numbersList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>-->

      <el-input  v-model="elementPicker.formulaString"  placeholder="Must be formed of elements linked with '-', eg: Al-Cu" clearable style="width:83%;" @change="toJson"></el-input>
<!--      <i class="el-icon-close element-close" @click="clearElement()"></i>-->
    </div>
  </div>
</template>

<script>

  var elementsList = ['H', 'He', 'Li', 'Be','B',"C","N","O","F","Ne",
    "Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr",
    "Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb",
    "Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb",
    "Te","I","Xe","Cs","Ba","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg",
    "Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Rf","Db","Sg","Bh","Hs","Mt",
    "Ds","Rg","Cn","Nh","Fi","Mc","Lv","Ts","Og"
  ];
  var formJson = {};
  for(let key of elementsList){

    formJson[key] = false
  }


    export default {
      name: "ElementPicker",
      props:['formula'],
      data(){

        return {
          elementPicker:{
            formulaString: this.formula,
            elementAppend: '',
            formulaJson: formJson,
          },
          elementsList: elementsList,
          numbersList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          numberAppend: '',

        }
      },
      watch:{
        formula(nv, ov){
          if(nv){
            this.formulaString = nv
          }
        }
      },
      methods: {
       /* addNumber(value) {
          if (!value) {
            if (this.elementAppend) {
              let newNumber = this.formulaJson[this.elementAppend] + this.numberAppend
              this.$set(this.formulaJson, this.elementAppend, newNumber)
              this.formulaString = ''
              for (let key in this.formulaJson) {
                if (this.formulaString) {
                  this.formulaString += '-' + key + this.formulaJson[key]
                } else {
                  this.formulaString += key + this.formulaJson[key]
                }
              }
            }
            this.$emit('formchange', this.formulaJson, this.formulaString)
          }
        },*/
        addElement(value) {
          if (!value) {
/*            if (!this.formulaJson[this.elementAppend]) {
              this.$set(this.formulaJson, this.elementAppend, '')
            }*/
            this.elementPicker.formulaJson[this.elementPicker.elementAppend]=!this.elementPicker.formulaJson[this.elementPicker.elementAppend]

            let formulaString = ''
            for (let key in this.elementPicker.formulaJson) {
              if(this.elementPicker.formulaJson[key]){
                if (formulaString) {
                  formulaString += '-' + key
                } else {
                  formulaString += key
                }
              }

            }
            this.$set(this.elementPicker,"formulaString",formulaString)
            this.$emit('formchange', this.elementPicker.formulaString)

            console.log(this.elementPicker)
          }
        },
        clearElement(){
/*          this.formulaString = ""
          this.formulaJson = {}
          this.elementAppend = ''
          this.numberAppend = ""*/
          this.$refs["elementPicker"].resetFields();


 /*         for(let k of Object.keys(this.formulaJson)){
            this.$delete(this.formulaJson,k);
          }*/
        },
        toJson() {
          let elements = {}

          this.elementPicker.formulaJson = formJson

          for(let key in this.elementPicker.formulaJson){
            this.elementPicker.formulaJson[key] = false
          }

          console.log(this.elementPicker)
          let formString = this.elementPicker.formulaString.replace(/[^a-zA-Z-]/ig, "")
          console
          let formulaSplit = formString.split('-')
          for (let item of formulaSplit) {
            if(this.elementsList.indexOf(item)>=0){
              this.elementPicker.formulaJson[item] = true
            }

          }
          let formulaString = ''

          for (let key of elementsList) {
            if(this.elementPicker.formulaJson[key]){
              if (formulaString) {
                formulaString += '-' + key
              } else {
                formulaString += key
              }
            }

          }
          console.log(formulaString)

          this.$set(this.elementPicker,"formulaString",formulaString)
          this.$emit('formchange', this.elementPicker.formulaString)
        }

      }
    }
</script>

<style scoped>
  .el-input,.el-select-dropdown__item{
    font-size: 22px!important;
  }
  .element-close{
    position: relative;
    font-size: 24px;
    margin-left: -30px;
    z-index: 100;
  }
</style>
