<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {

  },
  created() {
    let sessionData=sessionStorage.getItem("store")
    if(sessionData){
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionData)))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },

}
</script>

<style lang="less">
@import "assets/css/common.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
