<template>
  <div class="content">
      <el-form :model="form" ref="form">
       <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
           <el-input v-model="form.password"></el-input>
         </el-form-item>
    </el-form>

    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          form:{
            name:'',
            password:''
          }
        };
      },
      methods: {
       login(){

		   this.$http.post("/api/tab_user/login",{
			   userName:this.form.name,
			   password:this.form.password
		   }).then(res=>{

		   })
        this.$store.commit('$_setLogin', '1')
        this.$router.push({name: 'admin'})
       }
      }
    }
</script>

<style>
</style>
