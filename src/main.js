// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
// import './plugins/element.js'
import md5 from 'js-md5';
import './assets/stylesheets/base.css'
import 'font-awesome/css/font-awesome.min.css'
import 'lib-flexible/flexible'
import store from './store'
import VueCookies from 'vue-cookies'
Vue.use(vueAxios, axios)
Vue.use(VueCookies)
Vue.config.productionTip = false

axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials=true
Vue.$cookies.config('7d')

axios.interceptors.request.use((config) => {
  let key = 'yrarbilpD';
  let timestamp = parseInt(new Date().getTime() / 1000) + '';
  let nonce = Math.random().toString(36).substr(2, 15);
  let str0 = timestamp +  key + nonce;
  let sign = md5(str0);
  Vue.$cookies.set('sign', sign);
  Vue.$cookies.set('timestamp', timestamp);
  Vue.$cookies.set('nonce', nonce);
  // if(config.method === 'post') {
  //   config.data = qs.stringify(config.data);
  // }
  return config;  //添加这一行
}, (error) => {
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

