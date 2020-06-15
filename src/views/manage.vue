<template>
  <div>
    <el-table :data="tableData"
    stripe @selection-change="handleSelectionChange"
    style="width: 98%;margin: 0 auto;background-color: rgba(255,255,255,0.1);"
    >

    	<el-table-column prop="title" label="分类名称">
    	</el-table-column>
      <el-table-column prop="date" label="操作时间">
    	</el-table-column>
      <el-table-column label="操作" width="180">
      	<template slot-scope="scope">
      		<el-button @click.native.prevent="edit(scope.$index, tableData)" type="primary" size="small">
      			编辑
      		</el-button>
      	</template>
      </el-table-column>

    </el-table>

    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="10">
    </el-pagination>
  </div>
</template>

<script>
  export default{
    data () {
      return{
        tableData: [{title:'分类1',date:'2020年6月2日'},
        {title:'分类2',date:'2020年6月2日'},
        {title:'分类3',date:'2020年6月2日'},
        {title:'分类4',date:'2020年6月2日'},
        {title:'分类5',date:'2020年6月2日'}],
      }
    },
    methods:{
      handleSizeChange(val) {


      },
      handleCurrentChange(val) {
      },
      handleSelectionChange(val) {
      },
      handleClose(done) {
      },
    }
  }
</script>

<style>
</style>
