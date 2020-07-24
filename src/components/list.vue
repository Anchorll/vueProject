<template>
  <div class="c-content">
      <div class="operation" style="text-align: right;" @change="change">
      	<el-select v-model="qcondition" placeholder="请选择" >
      		<el-option label="按时间排序" value="1"></el-option>
      		<el-option label="按访问量排序" value="2"></el-option>
      		<el-option label="按评论数排序" value="3"></el-option>
      	</el-select>
      	<el-input v-model="qval" placeholder="请输入内容" style="width:200px">
      		<i slot="prefix" class="el-input__icon el-icon-search"></i>
      	</el-input>
      	<el-button type="primary" class="query-btn" style="background-color: @red;" @click="query">查询</el-button>
        <el-button type="primary" class="query-btn" style="background-color: @red;" @click="ask">我要提问</el-button>
      </div>
    <ul class="list">
      <li v-for="(item,index) in tableData" :key="index" class="art-list" @click="go2Details(0,item.id)">
        <p class="art-title">{{item.title}}</p>
        <p class="art-content">{{filterHtml(item.message)}}</p>
        <p class="art-info">
          <span>{{item.updateAt}}</span>
          <span><img src="/static/img/icon/zhiboguankanshu.png">{{item.praiseNum>10000?'1w+':item.praiseNum}}</span>
         <!-- <span><img src="../assets/img/icon/pinglun.png">{{item.comment>10000?'1w+':item.comment}}</span> -->
        </p>
      </li>
    </ul>
    <!-- <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="100">
    </el-pagination> -->
  </div>
</template>

<script>
  export default{
    props:{
      getList:Function
    },
    data () {
      return{
        qcondition:'',
        qval:'',
        tableData:[]
      }
    },
    mounted() {
      this.queryList()
    },
    methods:{
      filterHtml(test){
        return test.replace(/<[^>]+>|&[^>]+;/g, "")
      },
      // handleSizeChange(val) {

      //   console.log("handleSizeChange:"+val)
      // },
      // handleCurrentChange(val) {
      //   console.log("handleCurrentChange:"+val)
      // },
      // handleSelectionChange(val) {
      //   console.log("handleSelectionChange:"+val)
      // },
      // handleClose(done) {
      //   console.log("handleClose:"+val)
      // },

	  queryList(){
		  this.getList().then(res =>{
        console.log(res)
        this.tableData=res.data.content.records
      })
	  },
    change(){

    },
    query(){
    
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
  .c-content{
    width: 82%;
  }
  .operation{
  }
  .list{
    position: relative;
    min-height: 80%;
    padding:0 10px;
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
