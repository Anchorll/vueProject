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
          <div class="action">
          <el-button
            type="primary"

            size="small"
          >搜索</el-button>
          <el-button

            size="small"
          >清空</el-button>
          <slot name="child-action"></slot>
          </div>
          <div>
            <slot name="another-filter"></slot>
          </div>
        </slot>
      </el-form>
    </div>
    <div class="other-action">
      <slot name="other-action"></slot>
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
          :current-page="1"
          :page-size="2"
          :page-sizes="pageSizes"
          :layout="pageLayout"
          :total="10"
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
          pageSize: 20
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
      loadingList:false
    }
  },
  mounted () {
    this.cgetList()
  },
  watch: {

  },
  methods: {

    handleSizeChange (size) {
      this.size = size
    },
    handleCurrentChange (page) {
      this.current = page
    },
    cgetList(){
      this.getList().then(res=>{
          this.tableData = res.data.content.records || []
      })
    }
  }
}
</script>
<style lang="less">

</style>
