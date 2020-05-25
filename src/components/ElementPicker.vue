<template>
  <div id="element-picker">
    <!--formula样式element-->
    <div id="formula" style="font-size:0">
        <el-input v-model="formulaString"  placeholder="Al3-Cu4" style="width:56%;margin-right:2%;" @input="toJson"></el-input>
        <el-select v-model="elementAppend" @visible-change="addElement" style="width:20%;margin-right:2%;">
          <el-option
            v-for="item in elementsList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select v-model="numberAppend" @visible-change="addNumber" style="width:20%">
          <el-option
            v-for="item in numbersList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ElementPicker",
      props:['formula'],
      data(){
        let elementsList = ['H', 'He', 'Li', 'Be','B',"C","N","O","F","Ne",
          "Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr",
          "Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb",
          "Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb",
          "Te","I","Xe","Cs","Ba","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg",
          "Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Rf","Db","Sg","Bh","Hs","Mt",
          "Ds","Rg","Cn","Nh","Fi","Mc","Lv","Ts","Og"
        ]
        return {
          elementsList: elementsList,
          numbersList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          elementAppend: '',
          numberAppend: '',
          formulaJson: {},
          formulaString: this.formula
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
        addNumber(value) {
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
        },
        addElement(value) {
          if (!value) {
            if (!this.formulaJson[this.elementAppend]) {
              this.$set(this.formulaJson, this.elementAppend, '')
            }
            this.formulaString = ''
            for (let key in this.formulaJson) {
              if (this.formulaString) {
                this.formulaString += '-' + key + this.formulaJson[key]
              } else {
                this.formulaString += key + this.formulaJson[key]
              }

            }
            this.$emit('formchange', this.formulaJson, this.formulaString)
          }
        },
        toJson() {
          let elements = {}
          let formulaSplit = this.formulaString.split('-')
          for (let item of formulaSplit) {
            let number = item.replace(/[^0-9]/ig, "")
            let element = item.replace(/[0-9]/ig, "")
            if (element) {
              elements[element] = number
            }
            this.formulaJson = elements
            this.$emit('formchange', this.formulaJson, this.formulaString)
          }
        }

      }
    }
</script>

<style>
  .el-input,.el-select-dropdown__item{
    font-size: 22px!important;
  }
</style>
