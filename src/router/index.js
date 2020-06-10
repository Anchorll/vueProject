import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/login'
import Index from '../components/index'
import AssetsList from '../components/assets_list'
import UserList from '../components/user_list'
import AssetsTypeList from '../components/assets_type'
import AreaList from '../components/area_list'
Vue.use(Router)

export default new Router({
  routes: [
   /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
     {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect:'/assets_list',
      meta:{
	  		auth:true,
	  	},
	  	children: [
        {
          name: 'AssetsList',
     			component: AssetsList,
          path: '/assets_list',
        },
        {
          name: 'UserList',
     			component: UserList,
          path: '/user_list',
        },
        {
          name: 'AssetsTypeList',
     			component:AssetsTypeList,
          path: '/assets_type',
        },
        {
          name: 'AreaList',
     			component:AreaList,
          path: '/area_list',
        }
      ]
    }
  ]
})
