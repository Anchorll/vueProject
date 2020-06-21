<template>
  <div class="pannel">
    <el-breadcrumb separator="/" class="cnavi">
      <el-breadcrumb-item :to="{ path: '/ Index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>文章详情</a></el-breadcrumb-item>
    </el-breadcrumb>
    <h3>{{title}}</h3>
    <p class="article-info">
       <span>发布时间：{{dateTime}}</span>
       <span><img src="/static/img/icon/zhiboguankanshu.png"> {{viewNums}} </span>
       <span><img src="/static/img/icon/pinglun.png"> {{commentNums}}</span>
     </p>
    <div v-html="replaceAllImg(content)" class="article-content"></div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        title:"我是文章标题",
        content:"<span>我是文章内容</span><i>我是文章内容</i><img src='/static/img/icon/zhiboguankanshu.png' />",
        commentList:[],
        commentNums:0,
        viewNums:0,
        dateTime:"2020年6月9日16点42分",
      }
    },
    mounted() {


    },
    methods:{
      getDetails(id){

      },
      replaceAllImg(content){
        return this.$utils.replaceAllImg(content)
      }

    }
  }
</script>

<style lang="less" scoped>
  .cnavi{
    padding: 30px;
  }
  .article-info{
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20px 0;
      width: 70%;
      margin: 0 auto;
span{
      display: flex;
      justify-content: center;
      align-items: center;
    }
   
    img{
      width: 20px;
      height: 20px;
    }
  }
  .article-content{
    img{
      display: block;
    }
  }
</style>
