<template>
  <div class="content">
  <div class="cmain">
    <el-form ref="form" :model="formData" label-width="80px" class="form">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="formData.title" type="text" placeholder="请输入标题" show-word-limit maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="分类：" prop="kind">
        <el-select v-model="formData.kind" placeholder="请选择分类">
           <el-option v-for="(item,index) in kindArray" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tag">
        <el-checkbox-group v-model="formData.checkList">
           <el-checkbox :label="item.name" name="tag" v-for="(item,index) in tag" :key="item.id"></el-checkbox>
         </el-checkbox-group>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <editor :content="formData.content" :catchData="catchData"></editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

  </div>
</template>

<script>
  import editor from '@/components/Editor'
  import {
  	mapState,
  	mapGetters,
  	mapActions,
  	mapMutations
  } from 'vuex';
  export default{
    computed:{
      ...mapState(['user'])
    },
    components:{
      editor
    },
    data(){
      return{
        kindArray:[],//分类数组
        formData:{
          title:'',
          kind:'',
          content:'',
          checkList:[]
        },
        tag:[],
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          kind:[
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
        },
      }
    },
    mounted(){
      this.getKind()
      this.getTag()
    },
    methods:{
      catchData(val){
        let string =  val.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
          console.log(match)
          console.log(capture)
           if (capture.startsWith('/api/file/files/0/')) {
             console.log('xx')
             let index = capture.indexOf('/0/')
             console.log(index)
             capture = capture.substring(18)
             console.log(capture)
             return `<img src="${capture}" alt="图片${capture}">`
           } else {
             return match
           }
         })
         this.formData.content = string
         console.log(string)
      },
      getKind(){
        this.$http.get('/api/kind/showKinds').then( res => {
         this.kindArray=res.data.content
        })
      },
      getTag(){
        this.$http.get('/api/tab-label/showLabels').then( res => {
         this.tag=res.data.content
         console.log(this.formData.tag)
        })
      },
      submit(){
        console.log(this.formData)
       this.$http.post('/api/post-article/addAritcle',{
        author:"cll",
        kindId:this.formData.kind,
        message:this.formData.content,
        labelId:"710189441389563900",
        title:this.formData.title,
        userId:this.user.id
       }).then( res => {
         // this.tableData=res.data.content.records
       })
      }
    }
  }
</script>

<style lang="less" scoped>
  .form{
    width: 500px;
    padding-top: 20px;
  }

</style>
