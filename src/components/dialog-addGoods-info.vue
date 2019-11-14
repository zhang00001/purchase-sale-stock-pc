<template>
	<el-dialog :title="titleMap" :visible.sync="dialogFormVisible" class="inform-dialog" width="335px">
		<el-form :model="form" label-width="auto" :rules="rules" ref="form">

			<div v-if="this.pageType === 'brand'">
				<el-form-item label="品牌名称" prop="name">
					<el-input v-model="form.name" autocomplete="off" placeholder="请输入"></el-input>
				</el-form-item>

				<el-form-item label="网址" prop="website">
					<el-input v-model="form.website" autocomplete="off" placeholder="请输入"></el-input>
				</el-form-item>

				<el-form-item label="描述" prop="des">
					<el-input v-model="form.des" autocomplete="off" placeholder="请输入"></el-input>
				</el-form-item>
			</div>

			<div v-if="this.pageType === 'material'">
				<el-form-item label="材质名称" prop="name">
					<el-input v-model="form.name" autocomplete="off" placeholder="请输入"></el-input>
				</el-form-item>
			</div>

			<div v-if="this.pageType === 'company'">
				<el-form-item label="单位名称" prop="name">
					<el-input v-model="form.name" autocomplete="off" placeholder="请输入"></el-input>
				</el-form-item>
			</div>
			
			<div v-if="this.pageType === 'season'">
				<el-form-item label="季节名称" prop="name">
					<el-input v-model="form.name" autocomplete="off" placeholder="请输入"></el-input>
				</el-form-item>
			</div>

			<div v-if="this.pageType === 'season' || this.pageType === 'material' || this.pageType === 'company'">
				<el-form-item label="备注" prop="des">
					<el-input v-model="form.des" autocomplete="off" placeholder="请输入"></el-input>
				</el-form-item>
			</div>

			<el-form-item label="排序" prop="sort">
				<el-input v-model.number="form.sort" autocomplete="off" placeholder="请输入"></el-input>
			</el-form-item>

			
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="cancel">取 消</el-button>
			<el-button class="sure-btn" type="primary" @click="sure('form')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { BrandAdd, BrandDetail,  MaterialAdd, MaterialDetail } from "@/api/index"
import { materialDetail, seasonlDetail, seasonAdd, companyAdd, companyDetail, BrandEdit, MaterialEdit, SeasonEdit, UnitEdit } from "@/api/api.js"
export default {
	data () {
		return {
			form: {},
			rules: {
				name: [
					{ required: true, message: '必填', trigger: 'blur' },
				],
				sort: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ type: 'number', message: '排序必须为数字值'}
				]
			},
			pageType: '', // brand品牌页  material材质页  season季节页  company单位页
			type: '', // add添加  edit编辑
			titleMap: '', // 弹框标题
			dialogFormVisible: false
		}
	},

	methods: {
		init(type, pageType, id) {
			this.type = type
			this.pageType = pageType
			this.id = id
			this.dialogFormVisible = true
			if (type === 'add') {
				this.form = {}
				if(pageType === 'brand') {
					this.titleMap = '品牌信息'
				} else if(pageType === 'material') {
					this.titleMap = '材质信息'
				} else if(pageType === 'season') {
					this.titleMap = '季节信息'
				} else if(pageType === 'company') {
					this.titleMap = '单位信息'
				} 
			} else if(pageType === 'brand' && type === 'edit') {
				this.titleMap = '品牌详情'
				BrandDetail(id).then(res => {
					this.commonRes(res)
					this.clearValidate()
				})
			} else if( pageType === 'material' && type === 'edit') {
				this.titleMap = '材质详情'
					materialDetail(id).then(res => {
					this.commonRes(res)
					this.clearValidate()
				})
			} else if(pageType === 'season' && type === 'edit') {
				this.titleMap = '季节详情'
					seasonlDetail(id).then(res => {
					this.commonRes(res)
					this.clearValidate()
				})
			}	else if(pageType === 'company' && type === 'edit') {
				this.titleMap = '单位详情'
					companyDetail(id).then(res => {
					this.commonRes(res)
					this.clearValidate()
				})
			}		
		},

		// 共同响应结果
		commonRes(res) {
			if(res.code == 200 ) {
					this.form = res.data 
				} else {
					this.$message.error(res.message)
				}
		},

		// 清空验证方法
		clearValidate() {
			this.$refs['form'].clearValidate() // 清空验证状态
		},

		// 确定
		sure(form) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					if( this.pageType === 'brand' && this.type === 'edit' ) {
						BrandEdit(this.id, {...this.form}).then(res => {
							if(res.code == 200) {
								this.$message.success("商品品牌编辑成功")
								this.$emit('refresh')
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if( this.pageType === 'material' && this.type === 'edit' ) {
						MaterialEdit(this.id, {...this.form}).then(res => {
							if(res.code == 200) {
								this.$message.success("商品材质编辑成功")
								this.$emit('refresh')
							} else {
								this.$message.error(res.message)
							}
						})
					} else if( this.pageType === 'season' && this.type === 'edit' ) {
						SeasonEdit(this.id, {...this.form}).then(res => {
							if(res.code == 200) {
								this.$message.success("商品季节编辑成功")
								this.$emit('refresh')
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if( this.pageType === 'company' && this.type === 'edit' ) {
						UnitEdit(this.id, {...this.form}).then(res => {
							if(res.code == 200) {
								this.$message.success("商品品牌编辑成功")
								this.$emit('refresh')
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if( this.pageType === 'brand' && this.type === 'add' ) {
						BrandAdd({...this.form}).then(res => {
							if(res.code == 200) {
								this.$message.success("新增商品品牌成功")
								this.$emit('refresh')
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.pageType === 'material' && this.type === 'add') {
						MaterialAdd({...this.form}).then(res => {
							if(res.code == 200) {
								this.$message.success("新增商品材质成功")
								this.$emit('refresh')
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.pageType === 'season' && this.type === 'add') {
						seasonAdd({...this.form}).then(res => {
							if(res.code == 200) {
								this.$message.success("新增商品季节品牌成功")
								this.$emit('refresh')
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.pageType === 'company' && this.type === 'add') {
						companyAdd({...this.form}).then(res => {
							if(res.code == 200) {
								this.$message.success("新增商品单位成功")
								this.$emit('refresh')
							} else {
								this.$message.error(res.message)
							}
						})
					}
					this.dialogFormVisible = false
				}
			})
			
		},
		// 取消
		cancel() {
			this.dialogFormVisible = false
		},
	},
}
</script>