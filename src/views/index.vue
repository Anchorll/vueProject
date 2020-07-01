<template>
  <div class="content">
    <user-info></user-info>
    <List :getList="getList" class="lista"></List>
  </div>
</template>

<script>
 import userInfo from '@/components/userInfo.vue'
 import List from '@/components/list.vue'
  export default{
    components:{
     userInfo,
     List
    },
    data () {
      return{
        qcondition:'',
        qval:'',
        tableData: [{id:"1111",title:'文章标题1',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',updateAt:'2020-06-03 22:30',readnums:'11111',comment:'11'},
        {id:"121",title:'文章标题2',content:'文章内容sfd dgfdgf 发电公司地方敢股市跌幅高达发给对方个首付大概发地方顺丰大概死队风格豆腐干地方公司的分割算法的鬼地方高浮雕个首付大概是豆腐干反对广泛的的风格发2',updateAt:'2020-06-03 22:30',readnums:'1991',comment:'11'},
        {id:"11211",title:'文章标题3',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',updateAt:'2020-06-03 22:30',readnums:'11',comment:'6655'},
        {id:"12111",title:'文章标题4',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',updateAt:'2020-06-03 22:30',readnums:'11',comment:'11'},
        {id:"112211",title:'文章标题4',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',updateAt:'2020-06-03 22:30',readnums:'11',comment:'11'},
        {id:"1112221",title:'文章标题4',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',updateAt:'2020-06-03 22:30',readnums:'11',comment:'11'},
        {id:"111221",title:'文章标题5',content:'文章简介或者内容截取',updateAt:'2020-06-03 22:30',readnums:'11',comment:'11'}],
      }
    },
    mounted() {

    },
    methods:{

      getList(){
       return this.$http.get('/api/post-article/aritclePage',{params:{
          pageNo:1,
          pageSize:10
        }}).then( res => {
            return res
        })
      },

      go2Details(type,id){
          this.$router.push({
                   path: `/Details/${type}/${id}`,
       })
      },
	  queryAssetsList(){
		  console.log("文章查询")
	  },
	  ask(){
		  console.log("我要提问")
	  }
    }
  }
</script>

<style lang="less" scoped="scoped">
  @import "../assets/css/common.less";
  @import "../assets/css/table.less";
  .content{
    display: flex;
    justify-content: space-between;
  }
</style>
