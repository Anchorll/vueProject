<template>
  <div class="content">
     <el-form ref="form" :model="form" label-width="80px" class="form">
       <el-form-item label="说说内容" prop="content">
         <el-input v-model="form.message"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="onSubmit">立即创建</el-button>
       </el-form-item>
     </el-form>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        form:{
          message:''
        },
        rules:{
          content: [{
            required: true,
            message: '请填写说说内容',
            trigger: 'blur'
          }],
        }
      }
    },
    methods:{
        onSubmit(){
          this.$refs.form.validate(valid => {
            if (!valid) return
          this.$http.post('/api/tab/newsletters/NewsLetter',this.form).then(res=>{

          })
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .form{
    width: 500px;
    padding: 20px 0;
  }
</style>
