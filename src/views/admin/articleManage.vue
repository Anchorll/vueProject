<template>
  <div class="content">
    <List :getList="getArticleList" ref="list" >
      <template slot="extra-action">
        <el-button type="primary" @click="addNewArticle">新增</el-button>
      </template>
      <template slot="table">
          <el-table-column prop="title" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="author" label="作者" width="180">
          </el-table-column>
          <el-table-column prop="createAt" label="创建时间">
          </el-table-column>
          <el-table-column prop="updateAt" label="更新时间">
          </el-table-column>
      </template>
      </List>

  </div>
</template>

<script>
  import List from '../../components/admin/table.vue'
  export default {
    components: {
      List
    },
    data() {
      return {
        searchForm: {
          classifyId: '',
          title: '',
          state: null
        },
        isLoading: false,
        loading: false,
        changeLoading: false,
        tableData: []
      }
    },
    mounted() {
      //this.getArticleList()
    },
    methods: {
      handleSizeChange(val) {

        console.log("handleSizeChange:" + val)
      },
      handleCurrentChange(val) {
        console.log("handleCurrentChange:" + val)
      },
      handleSelectionChange(val) {
        console.log("handleSelectionChange:" + val)
      },
      handleClose(done) {
        console.log("handleClose:" + val)
      },
      queryAssetsList() {
        console.log("文章查询")
      },
      ask() {
        console.log("我要提问")
      },
      addNewArticle() {
        this.$router.push("/admin/articleEdit")
      },
      getArticleList(){
       return this.$http.get('/api/post-article/aritclePage',{params:{
          pageNo:1,
          pageSize:10
        }}).then( res => {
          this.tableData=res.data.content.records
          return res
        })
      },
    }
  }
</script>

<style>
</style>
