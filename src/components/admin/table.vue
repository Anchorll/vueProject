<template>
  <div class="common-list">
    <div class="listName">
      <slot name="listName" />
    </div>
    <div class="tableheader">
      <el-form
        :inline="true"
        ref="searchForm"
        class="search-form"
        label-position="right"
        size="small"
        stripe
      >
        <slot name="form"></slot>
        <div class="action-wrapper">
          <slot name="extra-action" />
        </div>
        <slot name="action">
        </slot>
      </el-form>
    </div>
    <div class="tablediv">
    <el-table
      :data="tableData"
      element-loading-text="拼命加载中"
      border
      ref="table"
      :header-cell-style="{background: '#F7F7F9', padding: '4px', color: 'black',}"
      :cell-style="{padding: '5px', overflow: 'unset', lineHeight: '100%'}"
    >
      <slot name="table"></slot>
    </el-table>
    </div>
    <div class="padding">
      <slot name="footer-action" />
    </div>
    <el-row v-if="true">
      <div class="block pagination">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :layout="pageLayout"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'List',
  props: {
    params: {
      type: Object,
      default () {
        return {
          pageNo: 1,
          pageSize: 10
        }
      }
    },
   getList: {
      type: Function,
      required: true
    },
   refreshTable:Function,
   pageLayout: {
        type: String,
        default: 'sizes, total, prev, pager, next, jumper'
      },
    pageSizes: {
      type: Array,
      default () {
        return [this.params.pageSize, 15, 50]
      }
    },
  },
  data () {
    return {
      tableData: [],
      loadingList:false,
      total:0,
      currentPage:1,
    }
  },
  mounted () {
    this.cgetList()
  },
  watch: {

  },
  methods: {
    handleSizeChange (size) {
      console.log(size)
      this.params.pageSize=size
      this.refreshList({pageNo:1})
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.cgetList({ pageNo: page })
    },
    cgetList(data = {}){
      const params = Object.assign(this.params,data)
      console.log(params)
      this.getList(params).then(res=>{
        let data=res.data.content
          this.tableData = data.records
          this.total=data.total*1
          this.currentPage=data.current*1
      })
    },
    refreshList (params) {
      console.log('params: ', params)
      let page =this.currentPage
      if(params){
         page = (this.currentPage = 1)
      }
      this.cgetList({ pageNo: page,pageSize:this.params.pageSize,params })
    },
  }
}
</script>
<style lang="less" scoped="scoped">
.action-wrapper{
  padding: 10px;
  text-align: right;
}
.pagination{
  margin: 20px;
  text-align: right;
}
/deep/ .cell{
  text-align: center;
}
.tablediv{
  min-height: 75vh;
  max-height: 75vh;
  overflow-y: auto;
}

</style>
