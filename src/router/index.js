//import Vue from 'vue'
import Router from 'vue-router'
import axios from "axios";
import store from "@/store/index.js"

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      component(resolve){
        require(['@/pages/Home.vue'],resolve)
      }
    },
    {
      path: '/home',
      name: 'Home',
      component(resolve){
        require(['@/pages/Home.vue'],resolve)
      }
    },
    {
      path: '/privacy_policy',
      name: 'PrivacyPolicy',
      component(resolve){
        require(['@/pages/PrivacyPolicy.vue'],resolve)
      }
    },
    {
      path: '/elements_list',
      name: 'ElementsList',
      component(resolve){
        require(['@/pages/ElementsList.vue'],resolve)
      }
    },
    {
      path: '/project_details',
      name: 'ProjectDetails',
      component(resolve){
        require(['@/pages/ProjectDetails.vue'],resolve)
      }
    },
    {
      path: '/login',
      name: 'Login',
      component(resolve){
        require(['@/pages/Login.vue'],resolve)
      }
    },
    {
      path: '/help',
      name: 'Help',
      component(resolve){
        require(['@/pages/Help.vue'],resolve)
      }
    },
    {
      path: '/user_projects',
      name: 'UserProjects',
      component(resolve){
        require(['@/pages/UserProjects.vue'],resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/change_password',
      name: 'ChangePassword',
      component(resolve){
        require(['@/pages/ChangePassword.vue'],resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/user_info',
      name: 'UserInfo',
      component(resolve){
        require(['@/pages/UserInfo.vue'],resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component(resolve){
        require(['@/pages/Contact.vue'],resolve)
      }
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component(resolve){
        require(['@/pages/AboutUs.vue'],resolve)
      }
    },
    {
      path: '/forget_password',
      name: 'ForgetPassword',
      component(resolve){
        require(['@/pages/ForgetPassword.vue'],resolve)
      }
    },
    {
      path: '/append_project',
      name: 'AppendProject',
      component(resolve){
        require(['@/pages/AppendProject.vue'],resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/project_edit',
      name: 'ProjectEdit',
      component(resolve){
        require(['@/pages/ProjectEdit.vue'],resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ],
  // mode:'history'
})


export function addAdmin(){
  let adminRouter = [{
      path: '/admin',
      name: 'Admin',
      component(resolve){
        require(['@/pages/Admin.vue'],resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }]
    router.addRoutes(adminRouter);
}

router.beforeEach((to, from, next) => {
  axios.get('v1/user/check_username').then(res=>{
    console.log('call router')
    if(res.data.result == 'failed'){
      store.commit('logout')
    }else{
      store.commit('login',res.data)
    }
    console.log(store.state)
  }).catch(err=>{
    console.log(err)
  })
  if(to.meta.requireAuth) {
    //是否含有name的cookie。否则login
    if($cookies.isKey('name')){
      next();
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else{
    next();
  }
})

export default router
