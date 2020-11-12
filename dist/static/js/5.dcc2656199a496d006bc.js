webpackJsonp([5],{FM1C:function(e,t){},YEzQ:function(e,t,a){"use strict";var o=a("dNXE"),r={name:"AppendPart",data(){return{formulaString:"",form:{elements:"",authors:this.$store.state.name,keywords:"",notes:""}}},methods:{infoChange(e){this.formulaString=e},submit(e){let t={elements:this.formulaString,authors:this.form.authors,keywords:this.form.keywords,abstract:this.form.abstract};this.axios.post("/v1/user/insert_project",t).then(e=>{console.log(e.data.new_id),-1!=e.data.new_id&&(this.showMessage("Success"),this.$router.push({path:"/project_edit",query:{project_id:e.data.new_id}}))}).catch(e=>{console.log(e)})},showMessage(e){let t="";t="Success"==e?"el-icon-circle-check":"el-icon-circle-close",this.$alert(e,"",{confirmButtonText:"OK",showClose:!1,iconClass:t,center:!0,customClass:"success-box",callback:e=>{}})},reset(e){this.$confirm("Are you sure to reset this project?","",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then(()=>{this.$refs[e].resetFields(),this.$refs.elementPicker.clearElement()}).catch(()=>{})}},components:{ElementPicker:o.a}},s={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"append"}},[o("el-card",[o("h2",[e._v("Add Your Project")]),e._v(" "),o("hr",{staticStyle:{border:"1px dashed #b6afd7"}}),e._v(" "),o("el-form",{ref:"form",staticClass:"form-margin",attrs:{model:e.form,"label-position":"left","label-width":"0.80rem"}},[o("el-row",[o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"Elements",prop:"elements"}},[o("ElementPicker",{ref:"elementPicker",attrs:{id:"project-picker"},on:{formchange:function(t){return e.infoChange(t)}}})],1)],1)],1),e._v(" "),o("el-row",[o("el-col",{attrs:{span:10}},[o("el-form-item",{attrs:{label:"Authors",prop:"authors"}},[o("el-input",{model:{value:e.form.authors,callback:function(t){e.$set(e.form,"authors",t)},expression:"form.authors"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:10,offset:2}},[o("el-form-item",{attrs:{label:"Keywords",prop:"keywords"}},[o("el-input",{model:{value:e.form.keywords,callback:function(t){e.$set(e.form,"keywords",t)},expression:"form.keywords"}})],1)],1)],1),e._v(" "),o("el-row",[o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"Abstract",prop:"abstract"}},[o("el-input",{attrs:{type:"textarea",rows:"3"},model:{value:e.form.abstract,callback:function(t){e.$set(e.form,"abstract",t)},expression:"form.abstract"}})],1)],1)],1),e._v(" "),o("el-row",{staticStyle:{"text-align":"center"}},[o("el-button",{staticClass:"button-submit",attrs:{round:""},on:{click:function(t){return e.submit("form")}}},[o("img",{staticClass:"icon-img",attrs:{src:a("PbtZ")}}),e._v(" "),o("span",{staticStyle:{"vertical-align":"middle"}},[e._v("Submit")])]),e._v(" "),o("el-button",{staticClass:"button-cancel",attrs:{round:""},on:{click:function(t){return e.reset("form")}}},[e._v("Reset")])],1)],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(r,s,!1,function(e){a("FM1C")},"data-v-3705c794",null);t.a=l.exports},"cC/C":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("teIl"),r=a("TVmP"),s=a("CzdK"),l=a("YEzQ"),i={name:"UserProjects",data:()=>({userProjects:[],currentPageData:[],currentPage:1,countAll:0,pageSize:10}),watch:{$route(e,t){this.$router.go(0)}},mounted(){this.axios.get("/v1/projects/get_user_details").then(e=>{console.log(e.data);let t=e.data.result_details;this.$route.query.page&&(this.currentPage=parseInt(this.$route.query.page)),this.countAll=e.data.result_details.length;let a=Math.min(this.currentPage*this.pageSize,this.countAll);this.currentPageData=t.slice((this.currentPage-1)*this.pageSize,a),console.log(this.currentPageData)}).catch(e=>{console.log(e)})},methods:{handleEdit(e,t){console.log(e,t);let{href:a}=this.$router.resolve({path:"/project_edit",query:{project_id:t.project_id}});window.open(a,"_blank")},handleCurrentChange(e){console.log(e),this.$router.push({path:"/user_projects",query:{page:e}}).catch(e=>{console.log(e)})},download(e){if(0==this.$store.state.email_verify)this.$alert("Please activate email before download!","",{confirmButtonText:"OK",showClose:!0,iconClass:"el-icon-circle-close",center:!0,customClass:"success-box",callback:e=>{this.$router.push("/user_info")}});else{let t="https://deeplibrary0.oss-cn-beijing.aliyuncs.com",a=e.replace(t,"");this.axios.get("/v1/user/get_token").then(e=>{if(console.log(a),console.log(e.data),0==this.$store.state.email_verify)this.$confirm("Please activate email before download!","",{confirmButtonText:"To Activate",cancelButtonText:"Cancel",showClose:!0,iconClass:"el-icon-circle-close",center:!0,customClass:"success-box"}).then(()=>{this.$router.push("/user_info")}).catch(()=>{});else{let t=e.data.result;console.log(t);let o=Object(s.a)(t,a);console.log(o),window.location.href=o}}).catch(e=>{console.log(e)})}},formatter:(e,t)=>e.update_time.split(" ")[0]},components:{Header:o.a,Footer:r.a,AppendPart:l.a}},n={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"use_projects"}},[o("div",{staticClass:"header"},[o("Header",{attrs:{active:"user"}})],1),e._v(" "),o("div",{staticClass:"header-back"}),e._v(" "),o("div",{staticClass:"center-panel"},[o("el-row",[o("el-col",{attrs:{span:1}},[o("el-avatar",{attrs:{src:a("MHnk")}})],1),e._v(" "),o("el-col",{staticClass:"author",attrs:{span:5}},[o("span",{staticStyle:{color:"#fff"}},[e._v("User: "+e._s(e.$store.state.name))])]),e._v(" "),o("el-button",{staticStyle:{float:"right"},on:{click:function(t){return e.$router.push("/append_project")}}},[e._v("Add Project")])],1),e._v(" "),o("div",{staticClass:"table-panel"},[o("el-table",{attrs:{"header-cell-style":{"background-color":"#f3f3fe"},data:e.currentPageData}},[o("el-table-column",{attrs:{align:"center",prop:"project_id",label:"Project","min-width":"11%"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",prop:"elements",label:"Elements","min-width":"11%"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",prop:"authors",label:"Authors","min-width":"11%"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",prop:"keywords",label:"Keywords","min-width":"11%"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",prop:"models",label:"Model","min-width":"10.5%"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",label:"Raw Data","min-width":"12%"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.data?o("el-popover",{attrs:{placement:"bottom-start",width:"300",trigger:"hover",content:"File size: "+(t.row.data_size/1024/1024).toFixed(3)+"M"}},[o("el-button",{attrs:{slot:"reference",round:"",type:"primary",size:"mini"},on:{click:function(a){return a.stopPropagation(),e.download(t.row.data)}},slot:"reference"},[o("img",{staticClass:"icon-img",attrs:{src:a("cfM6")}}),e._v(" "),o("span",{staticStyle:{"vertical-align":"middle"}},[e._v("Download")])])],1):e._e()]}}])}),e._v(" "),o("el-table-column",{attrs:{align:"center",prop:"downloads",label:"Downloads","min-width":"11%"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",prop:"update_time",label:"Updated Time",formatter:e.formatter,"min-width":"15.5%"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",label:"Edit","min-width":"7%"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{staticStyle:{color:"#33327e"},attrs:{type:"text",size:"small"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[o("img",{staticClass:"icon-img",attrs:{src:a("sZdv")}})])]}}])})],1)],1),e._v(" "),o("div",{staticClass:"pagination-block"},[o("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.countAll,background:""},on:{"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),o("Footer")],1)},staticRenderFns:[]};var c=a("VU/8")(i,n,!1,function(e){a("iF1J"),a("kXxR")},"data-v-f1fdf628",null);t.default=c.exports},iF1J:function(e,t){},kXxR:function(e,t){},sZdv:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzdCRTc5NTA3NDRGMTFFQTlDMTJGQzE5MzY3MkUyRDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzdCRTc5NTE3NDRGMTFFQTlDMTJGQzE5MzY3MkUyRDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MEM4RjcxNzc0NEYxMUVBOUMxMkZDMTkzNjcyRTJEMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MEM4RjcxODc0NEYxMUVBOUMxMkZDMTkzNjcyRTJEMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpZdiPUAAAQjSURBVHjaxFe/b1RHEJ7Z986AENimMHEACS6FkZAQIiBQIgFNmigiAZO4CV2KNEi0NNTU/AEkEin4YSByiiAEEpA0EYSGghBhCwRCUMRYGDuKze3wze68H7bv7j0kIu60t/v2zc43883M7h6LCL2PT9q/6RgxBkxOfw4x0/d43Iq2smKtWvyP9+kXWHg3Puqvs9eMr3zk3NxlzK7y0jMiktwg8hE4F3J0GoNv39LwlY7nN0DxXYBAZYOgPLOrCdA7GKwObvHcdU89e70kNxmSAG4Qsz8JwQz0T7QfoWGyii20p8C7GkHTAGygmxI3dxu9grYwMYu2CkbCY9ojwr+lQN/MLEeCuMhPoOqwKuKaLhegPWEV9G1QUMz3By2edkPsMVx+CITlAL+J+R0OoCOmY9KLO1w/12QJqCPfBOgdzK8x0P0QhOf0HAIfwsznutKxv5IimXaZpt8dC2VJUuWlKm4BVEILnmoiKb19AVToc7RfNdeEdQ1twdIGxwR8pXHKAvMvUz13vaTB0wioSlsbEzev9PZFHmSYhXNQfIbRRiOovPI++UyB501fo05E1bbgAb+G3mDoAKD+yEFFvsbcRXH5igMFKM22PO3E8G9XAyqo9wh+Fn9GoirRmF0PirUKBiK9IV9GIZCtPaRGWNFPKSj6v0p13B20JTHL3YI3tI5j6Q3Y5H7I/pKBUgQ9bzqmDfQBl2qxIp5t4/5BGRT0HqRFoFyAzgB0BxmoZgUqiVw3b715vKim+/F8C/1aA/0G3aUS6EEFpUUxjSECcybXNcZ6gMjCzXkdVmhdrreJQGcJ9ABGF2z8wui9Z9wt2fY6ngCqsGSZg+vX0DdN4kvIjHWgd8o8HeccVIxoGsbofvfk4gUk9+JpyJg44oXGXPG6DPrSe/oYw4mcXqv2wAjLKKQepVVUl7J7dcmQ02ybJhj5ioqYzpinEzlNzHmO4P0WC92yinLicrI1i02a92HzmISSbXg+afNTLaFPs0RSgISLkrTPS+tn0uqzPud9KB8R/UxcEGgx1ZIZL1eF4847v6t95Iv0dzBtIkukBYq5+3HTNavLmwdrXJlXIO56tN3D8yQmp3GjGI/Ssigxq28RHakQKwTT8QR2HK8TmMQtie3bUZ1lpFC9TFB6U7aDsWKNa59JJet1E+HqEywBYJKtCsxLJdXLbDzfdmdWpeoD01LfRS1HMFjaM6PgXFwvIPNfhgtgvU0GrYPeTm/meL1pS0UHoqXbfl8g97hoiHe4al41Hz+B/YNCdS9AdW+hnJOIqvgujmUcwMk5u8w2cPvTC9/m/+EfSy87PhP+oai74k6kIOIFqBgBA2eB3+RYo/dh37N3AKjV2ItjbXt+Bxf3g0h6LdWcAt3nkLvL8eaExpriKTT0jr2e9sSnvPBRTck3AgwAEwuyl9C0THUAAAAASUVORK5CYII="}});