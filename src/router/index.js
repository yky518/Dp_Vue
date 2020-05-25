import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import ElementsList from "../pages/ElementsList";
import PapersList from "../components/PapersList";
import ProjectDetails from "../pages/ProjectDetails";
import Login from "../pages/Login";
import UserProjects from "../pages/UserProjects";
import AppendProject from "../pages/AppendProject";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ProjectEdit from "../pages/ProjectEdit";
import ChangePassword from "../pages/ChangePassword";
import ForgetPassword from "../pages/ForgetPassword";
import UserInfo from "../pages/UserInfo";
import axios from 'axios';
import store from "../store"



Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/privacy_policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/elements_list',
      name: 'ElementsList',
      component: ElementsList
    },
    {
      path: '/papers_list',
      name: 'PapersList',
      component: PapersList
    },
    {
      path: '/project_details',
      name: 'ProjectDetails',
      component: ProjectDetails
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user_projects',
      name: 'UserProjects',
      component: UserProjects,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/change_password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/user_info',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/forget_password',
      name: 'ForgetPassword',
      component: ForgetPassword,
    },
    {
      path: '/append_project',
      name: 'AppendProject',
      component: AppendProject,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/project_edit',
      name: 'ProjectEdit',
      component: ProjectEdit,
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
