<template>
	<div id="assets_list" ref="showpanel">
		<div class="operation" style="text-align: right;">
			<el-select v-model="qcondition" placeholder="选择搜索类型">
				<el-option label="设备名称" value="dname"></el-option>
				<el-option label="设备使用者" value="duser"></el-option>
				<el-option label="设备区域" value="darea"></el-option>
				<el-option label="设备编号" value="did"></el-option>
			</el-select>
			<el-input v-model="qval" placeholder="请输入内容" style="width:200px">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
			<el-button type="primary" style="float:left" @click="queryAssetsList">查询</el-button>
			<el-button type="primary" @click="print" v-if="show">批量打印</el-button>
			<el-button type="primary" @click="delassetsmultiple" v-if="show">批量删除</el-button>
			<el-button type="primary" @click="dialogVisible = true">新增资产</el-button>

		</div>

		<!--编辑弹窗-->
		<el-dialog :title="popname" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>
		  	<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			  <el-form-item label="资产名称">
			    <el-input v-model="form.dname"></el-input>
			  </el-form-item>
			  <el-form-item prop="did" label="资产编号">
			    <el-input v-model="form.did"></el-input>
			  </el-form-item>
			  <el-form-item label="所属区域" >
			    <el-select style="width:100%" v-model="form.darea" placeholder="请选所属区域">
			      <el-option label="软件部" value="软件部"></el-option>
			      <el-option label="人事部" value="人事部"></el-option>
			      <el-option label="财务部" value="财务部"></el-option>
			      <el-option label="行政部" value="行政部"></el-option>
			      <el-option label="采购部" value="采购部"></el-option>
			      <el-option label="工程部" value="工程部"></el-option>
			      <el-option label="销售部" value="销售部"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="资产类型">
			    <el-select style="width:100%"  v-model="form.dtype" placeholder="请选择设备类型">
			      <el-option label="桌椅" value="桌椅"></el-option>
			      <el-option label="日消品" value="日消品"></el-option>
			      <el-option label="电气电子设备" value="电气电子设备"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="价格">
			    <el-input v-model="form.dprice"></el-input>
			  </el-form-item>
			  <el-form-item label="备注">
			    <el-input v-model="form.ddescribe"></el-input>
			  </el-form-item>
			  <el-form-item label="使用人员">
			    <el-input v-model="form.duser"></el-input>
			  </el-form-item>
			</el-form>
		  	
		  </span>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisibleClose()">取 消</el-button>
		    <el-button type="primary" @click="addAssets('form')">确 定</el-button>
		  </span>
		</el-dialog>

		<!--数据列表-->
		<el-table :data="tableData" stripe @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="dname" label="资产名称">
			</el-table-column>
			<el-table-column prop="did" label="资产编号">
			</el-table-column>
			<el-table-column prop="duser" label="资产使用者">
			</el-table-column>
			<el-table-column prop="dprice" label="价格">
			</el-table-column>
			<el-table-column prop="darea" label="所属区域/部门">
			</el-table-column>
			<el-table-column prop="dindate" label="入库日期">
			</el-table-column>
			<el-table-column prop="dtype" label="资产类型" width="100" :filters="[{ text: '桌椅', value: '桌椅' }, { text: '电气电子涉笔', value: '电气电子涉笔' }]" :filter-method="filterTag" filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag type="success" disable-transitions>{{scope.row.dtype}}</el-tag>
				</template>
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
		<div id="qrCode" ref="qrCodeDiv"></div>
	</div>
</template>

<style lang="less">
	@import "../assets/css/common.less";
	@import "../assets/css/table.less";
</style>

<script>
	import QRCode from 'qrcodejs2';
	export default {
		data() {
			return {
				tableData: [],
				popname: '新增资产',
				totalpage: 1,
				currentPage: 1,
				pageSize: 10,
				dialogVisible: false,
				rules: {
					did: [{
							required: true,
							message: '输入设备编号',
							trigger: blur
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					]
				},
				form: {
					dname: '',
					dtype: '',
					dprice: '',
					darea: '',
					ddescribe: '',
					did: '',
					duser: ''
				},
				show: false,
				printdata: [],
				filter: [],
				qval: '',
				qcondition: '',

			}
		},
		methods: {
			formatter(row, column) {
				return row.dtype;
			},
			filterTag(value, row) {
				return row.dtype === value;
			},
			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getAssetsList();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getAssetsList();

			},
			handleSelectionChange(val) {
				val.length == 0 ? (this.show = false) : (this.show = true);
				this.multipleSelection = val;
				this.printdata = val[0];
			},
			handleClose(done) {
				var self = this;
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
						self.form.dname = '';
						self.form.did = '';
						self.form.darea = '';
						self.form.ddscribe = '';
						self.form.duser = '';
						self.form.dprice = '';
						self.form.dtype = '';
					})
					.catch(_ => {});

			},
			dialogVisibleClose() {
				this.form.dname = '';
				this.form.did = '';
				this.form.darea = '';
				this.form.ddscribe = '';
				this.form.duser = '';
				this.form.dprice = '';
				this.form.dtype = '';
				this.dialogVisible = false;
			},
			deleteRow(index, rows) {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/delAssets', {
						did: rows[index].did
					}).then((res) => {
						//console.log(res);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})

					this.getAssetsList();

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
						didstring += '"' + item.did + '",'
					});
					didstring = didstring.substring(0, didstring.length - 1);
					this.$http.post('/api/delassetsmultiple', {
						dids: didstring
					}).then((res) => {
						if(res.data.affectedRows == this.multipleSelection.length) {
							this.multipleSelection = [];
							this.$message({
								message: '删除成功！',
								type: 'success'
							});
							this.getAssetsList();
						} else {

						}

					})

				}).catch(() => {

				});

			},
			edit(index, data) {
				this.popname = "资产编辑";
				this.dialogVisible = true;
				this.form.dname = data[index].dname;
				this.form.did = data[index].did;
				this.form.dtype = data[index].dtype;
				this.form.darea = data[index].darea;
				this.form.ddescribe = data[index].ddescribe;
				this.form.duser = data[index].duser;
				this.form.dprice = data[index].dprice;
			},
			print() {
				let printtext = JSON.stringify(this.printdata);
				new QRCode(this.$refs.qrCodeDiv, {
					text: printtext,
					width: 200,
					height: 200,
					colorDark: "#333333", //二维码颜色
					colorLight: "#ffffff", //二维码背景色
					correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
				})

			},
			getAssetsList() {

				this.$http.get('/api/getAssetsList', {
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
			queryAssetsList() {
				if(this.qcondition == '' || this.qval == '') {
					this.getAssetsList();
					return;
				}
				this.$http.get('/api/queryAssetsList', {
					params: {
						pageStart: 0,
						pageEnd: this.pageSize,
						condition: this.qcondition,
						val: this.qval
					}
				}).then((res) => {
					if(res.data.length != 0) {
						this.tableData = res.data[0];
						this.totalpage = res.data[1][0].total;
					} else {

					}
				})

			},
			addAssets(formName) {
				/*表单验证是否通过判断*/
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.popname == "资产编辑") {
							this.$http.post('/api/editAssets', this.form).then((res) => {
								//console.log('res',res);
								if(res.data.affectedRows == 1) {
									this.$message({
										message: '修改成功！',
										type: 'success'
									});
									this.getAssetsList();
									this.dialogVisible = false;
									this.popname = '新增资产';
								} else {
									alert('修改失败');
								}
							})
						} else {
							this.$http.post('/api/addAssets', this.form).then((res) => {
								//console.log('res',res);
								if(res.data.affectedRows == 1) {
									this.$message({
										message: '入库成功！',
										type: 'success'
									});
									this.getAssetsList();
									this.dialogVisible = false
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
			this.getAssetsList()
		},
		watch: {},
	}
</script>