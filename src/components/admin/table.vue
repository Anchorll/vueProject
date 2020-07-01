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
      >
        <slot name="form"></slot>
        <div class="action-wrapper">
          <slot name="extra-action" />
        </div>
        <slot name="action">
        </slot>
      </el-form>
    </div>
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
      page_size:10
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
    },
    handleCurrentChange (page) {
      this.current = page
    },
    cgetList(){
      this.getList(this.params).then(res=>{
        let data=res.data.content
          this.tableData = data.records
          this.page_size= data.pages
          this.total=data.total
          this.currentPage=data.current
      })
    }
  }
}
</script>
<style lang="less">
.action-wrapper{
  padding: 10px;
  text-align: right;
}
.pagination{
  margin: 20px;
}
</style>
