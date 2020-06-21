import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/main.vue'
import Index from '@/views/index.vue'
import Manage from '@/views/manage.vue'
import Question from '@/views/question.vue'
import Details from '@/views/details.vue'
import PersonalCenter from '@/views/personalCenter.vue'
import admin from '@/views/admin/admin.vue'
import login from '@/views/admin/Login.vue'
import articleManage from '@/views/admin/articleManage.vue'
import tagManage from '@/views/admin/tagManage.vue'
import kindManage from '@/views/admin/kindManage.vue'
import adindex from '@/views/admin/index.vue'
import articleEdit from '@/views/admin/articleEdit.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/Index',
      children: [{
          name: 'Index',
          component: Index,
          path: '/Index',
        },
        {
          name: 'Manage',
          component: Manage,
          path: '/Manage',
        },
        {
          name: 'Question',
          component: Question,
          path: '/Question',
        },
        {
          name: 'Details',
          component: Details,
          path: '/Details/:type/:id',
        },
          {
          name: 'PersonalCenter',
          component: PersonalCenter,
          path: '/PersonalCenter',
        },
      ]
    },
    {
      name: 'login',
      component: login,
      path: '/login',
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta:{
      	auth:true,
      },
      redirect: '/admin/adindex',
      children: [
        {
          name: 'adindex',
          component: adindex,
          path: '/admin/adindex',
        },
        {
          name: 'articleManage',
          component: articleManage,
          path: '/admin/articleManage',
        },
        {
          name: 'articleEdit',
          component: articleEdit,
          path: '/admin/articleEdit',
        },
        {
          name: 'tagManage',
          component: tagManage,
          path: '/admin/tagManage',
        },{
          name: 'kindManage',
          component: kindManage,
          path: '/admin/kindManage',
        },
      ]
    }

  ]
})
