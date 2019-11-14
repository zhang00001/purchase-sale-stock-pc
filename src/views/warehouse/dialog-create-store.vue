<template>
	<el-dialog title="仓库信息" :visible.sync="dialogFormVisible" width="665px" class="inform-dialog">
		<el-form  ref="form" :model="form" label-width="100px" :rules="rules">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="仓库名称 :" prop="name">
						<el-input v-model="form.name"  placeholder="单行输入"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="仓库负责人 :" prop="person">
						<el-select v-model="form.person" placeholder="请选择">
							<el-option
								v-for="item in personList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
		
				<el-col :span="12">
					<el-form-item label="所属门店 :" prop="store">
						<el-select v-model="form.store" placeholder="请选择">
							<el-option
								v-for="item in storeList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="启用 :" prop="status">
						<el-select v-model="form.status" placeholder="请选择">
							<el-option
								v-for="item in statusList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
		
				<el-col :span="12">
					<el-form-item label="排序 :" prop="sort">
						<el-input v-model="form.sort"  placeholder="单行输入"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="备注 :" prop="des">
						<el-input v-model="form.des"  placeholder="单行输入"></el-input>
					</el-form-item>
				</el-col>

			</el-row>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="cancel">取 消</el-button>
			<el-button class="sure-btn" type="primary" @click="sure('form')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { warehouseAdd, AllStore, KeeperList, warehouseEdit, warehouseDetail } from "@/api/api.js"
export default {
	data() {
		return {
			dialogFormVisible: false,
			rules: {
				name: [
					{ required: true, message: '必填', trigger: 'blur' },
				],
				person: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				store: [
					{ required: true, message: '必填', trigger: 'change' },
				],
			},
			form: {},
			planState: [],
			personList: [],
			storeList: [],
			statusList: [
				{id: 1, name: "禁用"},
				{id: 2, name: "启用"},
			],
			firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
		}
	},

	created() {
    this.getSelectValue()
	},
	
	methods: {
		init(type, id) {
			this.type = type
			this.id = id
			this.dialogFormVisible = true
			this.form = {}
			if(type == "edit") {
				this.getDatil()
			}
			this.$nextTick(() => {
				this.$refs['form'].clearValidate() // 清空验证状态
			})
		},

		// 获取仓库详情
		getDatil() {
			warehouseDetail(this.id).then(res => {
        if (res.code === 200) {
					this.form = res.data
        } else {
					this.$message.error(res.message)
				}
      })
		},

		// 获取下拉值
    getSelectValue() {
      // 所属门店下拉列表
      AllStore().then(res => {
        if (res.code === 200) {
					this.storeList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
      })

      // 仓库负责人下拉列表
      KeeperList().then(res => {
        if (res.code === 200) {
					this.personList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
      })
		},

		// 取消
		cancel() {
			this.dialogFormVisible = false
			this.form = {}
		},
		// 确定
		sure(form) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					if(this.type == "add") {
						warehouseAdd({
							...this.form
						}).then(res => {
						if(res.code == 200 ) {
							this.$message.success("新增仓库成功")
							this.dialogFormVisible = false
							this.$emit('refresh')
						} else {
							this.$message.error(res.message)
							}
						})
					}	else if(this.type == "edit") {
						warehouseEdit(this.id, {
							...this.form
						}).then(res => {
						if(res.code == 200 ) {
							this.$message.success("仓库编辑成功")
							this.dialogFormVisible = false
							this.$emit('refresh')
						} else {
							this.$message.error(res.message)
							}
						})
					}
				} 
			})
		}
	}
}
</script>