<template>
  <div class="content">
    <List :getList="getArticleList" ref="list" >
      <template slot="extra-action">
        <el-button type="primary" @click="addNewArticle">新增</el-button>
      </template>
      <template slot="table">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="author" label="作者" width="180">
          </el-table-column>
          <el-table-column prop="createAt" label="创建时间">
          </el-table-column>
          <el-table-column prop="updateAt" label="更新时间">
          </el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="edit(scope.$index, tableData)" type="primary" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">
                删除
              </el-button>
            </template>
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
      getArticleList(params){
       return this.$http.get('/api/post-article/aritclePage',{params}).then( res => {
          this.tableData=res.data.content.records
          return res
        })
      },
      edit(index,data){
        console.log("编辑",data[index])
      },
      deleteRow(index,data){
        console.log("删除",data[index])
      }
    }
  }
</script>

<style>
</style>
