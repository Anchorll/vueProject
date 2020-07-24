<template>
  <div class="content">
    <!-- <img src="/static/img/xx.jpg" class="zsimg"/> -->
    <el-form :model="form" ref="form" :rules="rules" class="form" label-width="160px">
      <el-form-item class="item">
        <h3>吴伟东博客后台管理系统</h3>
      </el-form-item>
      <el-form-item class="item" prop="userName">
        <el-input v-model="form.userName" size="small" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item class="item" prop="password">
        <el-input v-model="form.password" type="password" size="small" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item class="item">
        <el-button @click="login" class="logbtn" type="primary" size="small">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [{
            required: true,
            message: '请填写用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          }],
        },
      };
    },
    methods: {
      login() {
        this.$refs.form.validate(valid => {
          if (!valid) return
          this.$http.post("/api/tab_user/login", this.form).then(res => {
            if (res.data.code == 200) {
            console.log("loigin")
              this.$store.commit('$_setLogin', '1')
              this.$store.commit('$_setStorage', res.data.content)
               sessionStorage.setItem("store",JSON.stringify(this.$store.state))
              this.$router.push({
                name: 'admin'
              })
            }
          })
        })


      }
    }
  }
</script>

<style scoped="scoped" lang="less">
  .content {
    width: 100%;
    height: 100vh;
    background-image: url(/static/img/xxback.jpg);
    background-size: cover;
  }

  .form {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-80%, -80%);
    padding: 40px;
    background-image: url(/static/img/xx.jpg);
    background-size: 200px;
    background-position: 0px -40px;
    background-repeat: no-repeat;

    .item {
      margin: 20px 0;
    }

    .logbtn {
      width: 100%;
    }

    h3 {
      color: #409eff;
    }
  }

  .zsimg {
    position: absolute;
    width: 250px;
    left: 20%;
  }
</style>
