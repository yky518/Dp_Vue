//import Vue from 'vue'
import Router from 'vue-router'
import ElementsList from "../pages/ElementsList";
import ProjectDetails from "../pages/ProjectDetails";
import Login from "../pages/Login";
import UserProjects from "../pages/UserProjects";
import AppendProject from "../pages/AppendProject";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ProjectEdit from "../pages/ProjectEdit";
import ChangePassword from "../pages/ChangePassword";
import ForgetPassword from "../pages/ForgetPassword";
import UserInfo from "../pages/UserInfo";



//Vue.use(Router)
/*
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  if(typeof(location)=="string"){
    var Separator = "&";
    if(location.indexOf('?')==-1) { Separator='?'; }
    location = location + Separator + "random=" + Math.random();
  }
  return routerPush.call(this, location).catch(error=> error)
}
*/


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

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    //是否含有name的cookie。否则login
    console.log($cookies.keys())
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
