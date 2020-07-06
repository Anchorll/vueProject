<template>
  <div class="content">
    <div class="c-main">
      <List :getList="getLabelList" ref="tablelist">
        <template slot="extra-action">
          <el-button type="primary" @click="addNew">新增</el-button>
        </template>
        <template slot="table">
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="createAt" label="创建时间" width="280">
          </el-table-column>
          <el-table-column prop="updateAt" label="更新时间" width="280">
          </el-table-column>
          <el-table-column label="操作"  width="280">
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




      <el-dialog :title="dialogtitle" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="标签名称" label-width="100px">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import List from '@/components/admin/table.vue'
  export default {
    components: {
      List
    },
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        form: {
          name: ''
        },
        dialogtitle: "新增标签",
      }
    },
    mounted() {
      /* this.getLabelList() */
    },
    methods: {
      getLabelList(params) {
        return this.$http.get('/api/tab-label/showPageLabels', {
          params
        }).then(res => {
          this.tableData = res.data.content.records
          return res
        })
      },
      edit(index, data) {
        this.dialogtitle = "修改标签"
        this.dialogFormVisible = true
        this.form.name = data[index].name
        this.form.id = data[index].id
      },
      deleteRow(index, data) {
        console.log("删除", data[index])
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/api/tab-label/delLabel',{
            params:{
              id:data[index].id
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
             this.$refs.tablelist.refreshList()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addNew() {
        this.dialogFormVisible = true
        this.form.name = ''
        this.form.id = ''
        this.dialogtitle = '新增标签'
      },
      confirm() {
        if (this.dialogtitle === "新增标签") {
          this.dialogFormVisible = false
          console.log(this.form)
          this.$http.post('/api/tab-label/addLabel', {
            name: this.form.name
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '新增成功！',
                type: 'success'
              });
              this.dialogFormVisible = false
               this.$refs.tablelist.refreshList()
            }
          })
        } else {
          this.$http.post('/api/tab-label/updateLabel',
            this.form
          ).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogFormVisible = false
               this.$refs.tablelist.refreshList()
            }
          })
        }
      }

    }
  }
</script>

<style>
</style>
