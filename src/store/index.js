import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const key = 'user'
const isLogin = 'isLogin'
const store = new Vuex.Store({
  state () {
    return {
      user:[],
      isLogin: '0',
     
    }
  },
  getters: {
    getStorage: function (state) {
      /*if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
        state.isLogin = localStorage.getItem(isLogin)
      }*/
      return state.user
    },
     getUname: function (state) {
      /*if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
        state.isLogin = localStorage.getItem(isLogin)
      }*/
      return state.user.uname
    },
    getIsLogin: function (state) {
      /*if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
        state.isLogin = localStorage.getItem(isLogin)
      }*/
      return state.isLogin 
    }
  },
  mutations: {
    $_setLogin (state, value) {
    	
      state.isLogin = value
     /* localStorage.setItem(isLogin, value)*/
    },
    $_setStorage (state, value) {
    	console.log(value);
      state.user = value
     /* localStorage.setItem(key, JSON.stringify(value))*/
    },
    $_setUname (state, value) {
      state.user.uname = value
     /* localStorage.setItem(key, JSON.stringify(value))*/
    },
    $_removeStorage (state) {
      state.user = null
     /* localStorage.removeItem(key)*/
    }
  }
})
 
export default store
