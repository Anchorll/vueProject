<template>
  <div class="content">
    <div class="c-main">
      <div class="operation">
        <el-button type="primary" @click="addNewArticle">新增</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 95%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
        :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
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
      }
    }
  }
</script>

<style>
</style>
