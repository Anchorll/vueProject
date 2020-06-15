import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/views/main.vue'
import Index from '@/views/index.vue'
import Manage from '@/views/manage.vue'
import Question from '@/views/question.vue'
import Details from '@/views/details.vue'

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
      ]
    },

  ]
})
