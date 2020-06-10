<template>
	<div id="">
		<div class="login-panel">
				<!--<el-form ref="form" :model="form" label-width="80px">
				  <el-form-item label="用户名">
				    <el-input v-model="form.name"></el-input>
				  </el-form-item>
				  <el-form-item label="密码">
				    <el-input v-model="form.pwd"></el-input>
				  </el-form-item>
					<el-form-item label=''>
						<el-button type="primary" @click="onSubmit">登录</el-button>
					</el-form-item>
				</el-form>-->
				
				<ul>
					<li><label>用户名</label><input v-model='form.name'/></li>
					<li><label>密码</label><input type="password" v-model='form.pwd' @keypress.enter="login"/></li>
					<li><label></label><a class="btn" @click="login">登录</a></li>
					<li><a>忘记密码？</a><a>注册</a></li>
				</ul>
		</div>
		 
	</div>
</template>

<script>
	export default {
		 data() {
      return {
        form: {
          name: '',
        	pwd:''
        }
      }
    },
    methods: {
      login() {
       	this.$http({
       		type:"get",
       		url:"/api/userLogin",
       		params:{id:this.form.name,pwd:this.form.pwd}
       	}).then(res=>{
       		if(res.data.length>0){
       			sessionStorage.setItem("loginToken",true);
       			this.$router.push({
       				name:"Index"
       			})
       		}else{
       			sessionStorage.setItem("loginToken",false);
       			this.$message({
					message: '用户不存在！请确认账号和密码',
					type: 'failed',
					center: true,
					customClass:"popTips",
					duration:1000
				});
       		}
       	})
      }/*login()*/
    }
	}
</script>

<style lang="less">
	@import "../assets/css/common.less";
  @import "../assets/css/login.less";
</style>
<style scoped>
  
</style>