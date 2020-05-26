//import Vue from "vue"
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

//Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: Cookie.get('name')?Cookie.get('name'):'',
    email: '',
    email_verify: '',
    create_time: ''
  },
  mutations: {
    login(state, data){
      state.name = data.user_name
      Cookie.set('name', data.user_name)
      state.email = data.email
      state.email_verify = parseInt(data.email_verify)
      state.create_time = data.create_time
      console.log(state.email )
    },
    logout:function (state) {
      //修改这两个变量的值
      state.name=""
      state.email=""
      state.email_verify=""
      state.create_time=""
      //    往cookie中写数据
      Cookie.remove('name')
    }
  },


})

export default store
