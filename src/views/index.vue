<template>
  <div>
      <div class="operation" style="text-align: right;">
      	<el-select v-model="qcondition" placeholder="按时间排序">
      		<el-option label="按时间排序" value="1"></el-option>
      		<el-option label="按访问量排序" value="2"></el-option>
      		<el-option label="按评论数排序" value="3"></el-option>
      	</el-select>
      	<el-input v-model="qval" placeholder="请输入内容" style="width:200px">
      		<i slot="prefix" class="el-input__icon el-icon-search"></i>
      	</el-input>
      	<el-button type="primary" class="query-btn" style="background-color: @red;" @click="queryAssetsList">查询</el-button>
        <el-button type="primary" class="query-btn" style="background-color: @red;" @click="ask">我要提问</el-button>
      </div>
    <ul class="list">
      <li v-for="(item,index) in tableData" :key="index" class="art-list" @click="go2Details(0,item.id)">
        <p class="art-title">{{item.title}}</p>
        <p class="art-content">{{item.message}}</p>
        <p class="art-info">
          <span>{{item.updateAt}}</span>
          <span><img src="../assets/img/icon/zhiboguankanshu.png">{{item.praiseNum>10000?'1w+':item.praiseNum}}</span>
         <!-- <span><img src="../assets/img/icon/pinglun.png">{{item.comment>10000?'1w+':item.comment}}</span> -->
        </p>
      </li>
    </ul>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="100">
    </el-pagination>
  </div>
</template>

<script>
  export default{
    data () {
      return{
        qcondition:'',
        qval:'',
        tableData: [{id:"1111",title:'文章标题1',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',date:'2020-06-03 22:30',readnums:'11111',comment:'11'},
        {id:"121",title:'文章标题2',content:'文章内容sfd dgfdgf 发电公司地方敢股市跌幅高达发给对方个首付大概发地方顺丰大概死队风格豆腐干地方公司的分割算法的鬼地方高浮雕个首付大概是豆腐干反对广泛的的风格发2',date:'2020-06-03 22:30',readnums:'1991',comment:'11'},
        {id:"11211",title:'文章标题3',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',date:'2020-06-03 22:30',readnums:'11',comment:'6655'},
        {id:"12111",title:'文章标题4',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',date:'2020-06-03 22:30',readnums:'11',comment:'11'},
        {id:"112211",title:'文章标题4',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',date:'2020-06-03 22:30',readnums:'11',comment:'11'},
        {id:"1112221",title:'文章标题4',content:'IEEE Spectrum近日发布了2020年度编程语言排行榜，令人些许意外的是，Python连续三年问鼎巅峰，你怎么看？',date:'2020-06-03 22:30',readnums:'11',comment:'11'},
        {id:"111221",title:'文章标题5',content:'文章简介或者内容截取',date:'2020-06-03 22:30',readnums:'11',comment:'11'}],
      }
    },
    mounted() {
      this.getArticleList()
    },
    methods:{
      handleSizeChange(val) {

        console.log("handleSizeChange:"+val)
      },
      handleCurrentChange(val) {
        console.log("handleCurrentChange:"+val)
      },
      handleSelectionChange(val) {
        console.log("handleSelectionChange:"+val)
      },
      handleClose(done) {
        console.log("handleClose:"+val)
      },
      getArticleList(){
        this.$http.get('/api/post-article/aritclePage',{params:{
          pageNo:1,
          pageSize:10
        }}).then( res => {
          this.tableData=res.data.content.records
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

<style lang="less" scoped>
  @import "../assets/css/common.less";
  @import "../assets/css/table.less";
  .list{
    position: relative;
    width: 94%;
    margin: 0 auto;
    min-height: 80%;
    padding:10px 0;
    .art-list{
      height: auto;
      padding: 10px 0;
      text-align: left;
      border-bottom: 1.5px solid @whitegray;
    }
    .art-list:last-child{
      border-bottom: none;
    }
    .art-title{
      color: @black;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .art-content{
     display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      color: @blackgray;
      font-size: 14px;
    }
    .art-info{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width:260px;
      font-size: 13px;
      color: @iconcolor;
      margin-top:10px;
      img{
        width: 20px;
        height: 20px;
      }
      span{
        min-width: 60px;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
