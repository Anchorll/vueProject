<template>
	<div id="assets_list" ref="showpanel">
		<div class="operation" style="text-align: right;">
			<el-button type="primary" @click="delassetsmultiple" v-if="show">批量删除</el-button>
			<el-button type="primary" @click="dialogVisible = true">新增类型</el-button>

		</div>

		<!--编辑弹窗-->
		<el-dialog :title="popname" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>
		  	<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			  <el-form-item label="类型名称" prop="typename">
			    <el-input v-model="form.typename"></el-input>
			  </el-form-item>
			  <el-form-item prop="typeid" label="类型编号">
			    <el-input v-model="form.typeid" :disabled="iddisabled"></el-input>
			  </el-form-item>
			  <el-form-item label="备注">
			    <el-input v-model="form.typedescribe"></el-input>
			  </el-form-item>
			</el-form>
		  </span>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisibleClose();	">取 消</el-button>
		    <el-button type="primary" @click="addAssetsType('form')">确 定</el-button>
		  </span>
		</el-dialog>

		<!--数据列表-->
		<el-table :data="tableData" stripe @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="typename" label="类型名称">
			</el-table-column>
			<el-table-column prop="typeid" label="类型编号" >
			</el-table-column>
			<el-table-column prop="typedescribe" label="类型描述">
			</el-table-column>
			<el-table-column prop="typeindate" label="操作日期">
			</el-table-column>
			<el-table-column label="操作" width="180">
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
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalpage">
		</el-pagination>
		
	</div>
</template>

<style lang="less">
	@import "../assets/css/common.less";
	@import "../assets/css/table.less";
</style>

<script>
	export default {
		data() {
			return {
				tableData: [],
				popname: '新增类型',
				totalpage: 1,
				currentPage: 1,
				pageSize: 10,
				dialogVisible: false,
				rules: {
					typeid: [{
							required: true,
							message: '输入类型编号',
							trigger: blur
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					typename:[{
						required: true,
						message: '输入类型名称',
						trigger: blur
					}]
				},
				form: {
					typename: '',
					typeid: '',
					typedescribe: '',
				},
				show: false,
				iddisabled:false
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
				this.getAssetsTypeList();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getAssetsTypeList();
			},
			handleSelectionChange(val) {
				val.length == 0 ? (this.show = false) : (this.show = true);
				this.multipleSelection = val;
			},
			handleClose(done) {
				done();
				this.dialogVisibleClose();	
			},
			dialogVisibleClose(){
				this.form.typename = '';
				this.form.typeid = '';
				this.form.typedescribe = '';
				this.dialogVisible = false;
				this.iddisabled = false;
				this.popname = '新增类型';
				
			},
			deleteRow(index, rows) {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/delAssetsType', {
						typeid: rows[index].typeid
					}).then((res) => {
						//console.log(res);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})

					this.getAssetsTypeList();

				}).catch(() => {

				});

			},
			delassetsmultiple() {
				this.$confirm('此操作将永久删除这些记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var didstring = '';
					this.multipleSelection.forEach(item => {
						didstring += '"' + item.typeid + '",'
					});
					didstring = didstring.substring(0, didstring.length - 1);
					this.$http.post('/api/delassetsTypemultiple', {
						dids: didstring
					}).then((res) => {
						if(res.data.affectedRows == this.multipleSelection.length) {
							this.multipleSelection = [];
							this.$message({
								message: '删除成功！',
								type: 'success'
							});
							this.getAssetsTypeList();
						} else {

						}

					})

				}).catch(() => {

				});

			},
			edit(index, data) {
				this.popname = "类型编辑";
				this.iddisabled=true;
				this.dialogVisible = true;
				this.form.typename = data[index].typename;
				this.form.typeid = data[index].typeid;
				this.form.typedescribe = data[index].typedescribe;
			},
			getAssetsTypeList() {
				this.$http.get('/api/getAssetsTypeList', {
					params: {
						pageStart: (this.currentPage - 1) * this.pageSize,
						pageEnd: this.pageSize
					}
				}).then((res) => {
					if(res.data.length != 0) {
						this.tableData = res.data[0];
						this.totalpage = res.data[1][0].total;
					} else {

					}
				})
			},
			addAssetsType(formName) {
				/*表单验证是否通过判断*/
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.iddisabled) {
							this.$http.post('/api/editAssetsType', this.form).then((res) => {
								//console.log('res',res);
								if(res.data.affectedRows == 1) {
									this.$message({
										message: '修改成功！',
										type: 'success'
									});
									this.getAssetsTypeList();
									this.dialogVisibleClose();	
								} else {
									alert('修改失败');
								}
							})
						} else {
							this.$http.post('/api/addAssetsType', this.form).then((res) => {
								//console.log('res',res);
								if(res.data.affectedRows == 1) {
									this.$message({
										message: '入库成功！',
										type: 'success'
									});
									this.getAssetsTypeList();
									this.dialogVisibleClose();	
								} else {
									alert('入库失败');
								}
							})
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				});

				//console.log(this.form);
				/*	*/
			}

		},
		mounted() {
			this.getAssetsTypeList()
		},
		watch: {},
	}
</script>