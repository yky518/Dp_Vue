webpackJsonp([6],{FM1C:function(t,e){},Y9S0:function(t,e){},YEzQ:function(t,e,s){"use strict";var r=s("dNXE"),o={name:"AppendPart",data(){return{formulaString:"",form:{elements:"",authors:this.$store.state.name,keywords:"",notes:""}}},methods:{infoChange(t){this.formulaString=t},submit(t){let e={elements:this.formulaString,authors:this.form.authors,keywords:this.form.keywords,abstract:this.form.abstract};this.axios.post("/v1/user/insert_project",e).then(t=>{console.log(t.data.new_id),-1!=t.data.new_id&&(this.showMessage("Success"),this.$router.push({path:"/project_edit",query:{project_id:t.data.new_id}}))}).catch(t=>{console.log(t)})},showMessage(t){let e="";e="Success"==t?"el-icon-circle-check":"el-icon-circle-close",this.$alert(t,"",{confirmButtonText:"OK",showClose:!1,iconClass:e,center:!0,customClass:"success-box",callback:t=>{}})},reset(t){this.$confirm("Are you sure to reset this project?","",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then(()=>{this.$refs[t].resetFields(),this.$refs.elementPicker.clearElement()}).catch(()=>{})}},components:{ElementPicker:r.a}},a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"append"}},[r("el-card",[r("h2",[t._v("Add Your Project")]),t._v(" "),r("hr",{staticStyle:{border:"1px dashed #b6afd7"}}),t._v(" "),r("el-form",{ref:"form",staticClass:"form-margin",attrs:{model:t.form,"label-position":"left","label-width":"0.80rem"}},[r("el-row",[r("el-col",{attrs:{span:22}},[r("el-form-item",{attrs:{label:"Elements",prop:"elements"}},[r("ElementPicker",{ref:"elementPicker",attrs:{id:"project-picker"},on:{formchange:function(e){return t.infoChange(e)}}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"Authors",prop:"authors"}},[r("el-input",{model:{value:t.form.authors,callback:function(e){t.$set(t.form,"authors",e)},expression:"form.authors"}})],1)],1),t._v(" "),r("el-col",{attrs:{span:10,offset:2}},[r("el-form-item",{attrs:{label:"Keywords",prop:"keywords"}},[r("el-input",{model:{value:t.form.keywords,callback:function(e){t.$set(t.form,"keywords",e)},expression:"form.keywords"}})],1)],1)],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:22}},[r("el-form-item",{attrs:{label:"Abstract",prop:"abstract"}},[r("el-input",{attrs:{type:"textarea",rows:"3"},model:{value:t.form.abstract,callback:function(e){t.$set(t.form,"abstract",e)},expression:"form.abstract"}})],1)],1)],1),t._v(" "),r("el-row",{staticStyle:{"text-align":"center"}},[r("el-button",{staticClass:"button-submit",attrs:{round:""},on:{click:function(e){return t.submit("form")}}},[r("img",{staticClass:"icon-img",attrs:{src:s("PbtZ")}}),t._v(" "),r("span",{staticStyle:{"vertical-align":"middle"}},[t._v("Submit")])]),t._v(" "),r("el-button",{staticClass:"button-cancel",attrs:{round:""},on:{click:function(e){return t.reset("form")}}},[t._v("Reset")])],1)],1)],1)],1)},staticRenderFns:[]};var n=s("VU/8")(o,a,!1,function(t){s("FM1C")},"data-v-3705c794",null);e.a=n.exports},d7J9:function(t,e){},mUv9:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("teIl"),o=s("TVmP"),a=s("YEzQ"),n={name:"AppendProject",data(){return{formulaString:"",form:{elements:"",authors:this.$store.state.name,keywords:"",notes:""}}},methods:{infoChange(t){this.formulaString=t},submit(t){let e={elements:this.formulaString,authors:this.form.authors,keywords:this.form.keywords,abstract:this.form.abstract};this.axios.post("/v1/user/insert_project",e).then(t=>{console.log(t.data.new_id),-1!=t.data.new_id&&(this.showMessage("Success"),this.$router.push({path:"/project_edit",query:{project_id:t.data.new_id}}))}).catch(t=>{console.log(t)})},showMessage(t){let e="";e="Success"==t?"el-icon-circle-check":"el-icon-circle-close",this.$alert(t,"",{confirmButtonText:"OK",showClose:!1,iconClass:e,center:!0,customClass:"success-box",callback:t=>{}})},reset(t){this.$refs[t].resetFields(),this.$refs.elementPicker.clearElement()}},components:{Header:r.a,AppendPart:a.a,Footer:o.a}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"append_project"}},[e("div",{staticClass:"header"},[e("Header",{attrs:{active:"user2"}})],1),this._v(" "),e("AppendPart",{staticStyle:{"min-height":"850px"}}),this._v(" "),e("Footer",{staticClass:"footer"})],1)},staticRenderFns:[]};var i=s("VU/8")(n,c,!1,function(t){s("Y9S0"),s("d7J9")},"data-v-27f377f0",null);e.default=i.exports}});