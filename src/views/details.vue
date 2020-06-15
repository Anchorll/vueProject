<template>
  <div class="pannel">
    <h3>{{title}}</h3>
    <p class="article-info">
       <span>发布时间：{{dateTime}}</span>
       <span><img src="../assets/img/icon/zhiboguankanshu.png"> {{viewNums}} </span>
       <span><img src="../assets/img/icon/pinglun.png"> {{commentNums}}</span>
     </p>
    <div v-html="content"></div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        title:"我是文章标题",
        content:"<span>我是文章内容</span><i>我是文章内容</i>",
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

      }
    }
  }
</script>

<style lang="less" scoped>
  
</style>
