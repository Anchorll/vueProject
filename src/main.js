// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import less from 'less'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import * as utils from '@/utils/utils'
import store from './store'
Vue.config.productionTip = false
const myPlugins = function (Vue,) {
  Vue.prototype.$utils = utils
}
Vue.use(myPlugins)
Vue.use(ElementUI)
Vue.prototype.$http=axios
Vue.prototype.$store=store
Vue.use(less)
Vue.use(VueLazyload, {

  error: 'dist/error.png',

  loading: 'dist/loading.gif'

});

router.beforeEach((to, from, next) => {
  console.log("to")
  if (to.matched.some(m => m.meta.auth)) {
   let sessionData=sessionStorage.getItem("store")
    let isLogin
   if(sessionData){
     isLogin=JSON.parse(sessionData).isLogin
   }else{
      isLogin=0
   }
    if (isLogin === '1') {
      next()
    } else if (to.path !== '/') {
      next({path: '/login'})
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
