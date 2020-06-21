<template>
  <div class="content">
    login111
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
  export default {
      data() {
        return {

        };
      },
      methods: {
       login(){
        this.$store.commit('$_setLogin', '1')
        this.$router.push({name: 'admin'})
       }
      }
    }
</script>

<style>
</style>
