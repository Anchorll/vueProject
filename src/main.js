// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import md5 from 'js-md5'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import QRCode from 'qrcodejs2';

Vue.prototype.$qrCode = QRCode; 
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.prototype.$md5 = md5


router.beforeEach((to, from, next) => {
  if(to.meta.auth){
  	console.log(sessionStorage.getItem("loginToken"));
  	if(sessionStorage.getItem("loginToken")){
  			next()
  	}else{
  		console.log(11);
  		next({name:"Login"})
  	}
  }else{
  	next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
