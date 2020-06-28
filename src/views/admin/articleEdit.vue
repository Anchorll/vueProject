<template>
  <div class="content">
  <div class="cmain">
     <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="150px">
       <el-form-item label="标题：" prop="title">
         <el-input v-model="formData.title" type="text" placeholder="请输入标题" show-word-limit maxlength="50"></el-input>
       </el-form-item>
       <el-form-item label="分类：" prop="kind">
          <el-select v-model="formData.kind" placeholder="请选择分类">
                <el-option v-for="(item,index) in kindArray" :label="item.name" :value="item.id"></el-option>
          </el-select>
       </el-form-item>
       <el-form-item label="标签：" prop="tag">
         <el-checkbox-group v-model="formData.checkList">
            <el-checkbox :label="item.name"  name="tag" v-for="(item,index) in formData.tag"></el-checkbox>
          </el-checkbox-group>
       </el-form-item>
       <!-- <el-form-item label="附件添加：" prop=""></el-form-item> -->
       <el-form-item label="内容：" prop="content">
         <editor :content="formData.content" :catchData="catchData"></editor>
       </el-form-item>

     </el-form>
     <div class="btn-box">
       <el-button size="small" type="primary"  @click="submit">提交</el-button>
     </div>

  </div>

  </div>
</template>

<script>
  import editor from '@/components/Editor'
  export default{
    components:{
      editor
    },
    data(){
      return{
        kindArray:[],//分类数组
        formData:{
          title:'',
          kind:'',
          tag:[],
          content:'',
          checkList:[]
        },
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
        this.$http.get('/api/kind/showKinds',{
          params:{
            pageNo:1,
            pageSize:10
          }
        }).then( res => {
         this.kindArray=res.data.content
        })


      },
      getTag(){
        this.$http.get('/api/tab-label/showLabels',{
        params:{
          pageNo:1,
          pageSize:10
        }
        }).then( res => {
         this.formData.tag=res.data.content
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
        userId:"715987215280377856"
       }).then( res => {
         // this.tableData=res.data.content.records
       })
      }
    }
  }
</script>

<style>
  .el-form{
    width: 500px;
  }

</style>
