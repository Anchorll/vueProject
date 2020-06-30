<template>
  <div class="content">
 <div class="c-main">
   <div class="operation">
     <el-button type="primary">新增</el-button>
   </div>
   <el-table :data="tableData" stripe style="width: 95%">
     <el-table-column prop="name" label="名称" width="180">
     </el-table-column>
     <el-table-column prop="createAt" label="创建时间" width="180">
     </el-table-column>
     <el-table-column prop="updateAt" label="更新时间" width="180">
     </el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
         <el-button @click.native.prevent="edit(scope.$index, tableData)" type="primary" size="small">
           编辑
         </el-button>
         <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">
           删除
         </el-button>
       </template>
     </el-table-column>
   </el-table>

  </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        tableData:[]
      }
    },
    mounted() {
      this.getLabelList()
    },
    methods:{
      getLabelList(){
        this.$http.get('/api/tab-label/showLabels').then(res=>{
            this.tableData=res.data.content
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

  .el-table{
      width: 96%;
      margin: 0 auto;
      border-top: 2px solid @red;

  }
  .el-table td,.el-table th{
      padding:5px 0;
        text-align: center;
  }
  .el-pagination{
      margin-top: 20px;
  }
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
      padding-left: 5px;
  }
</style>
