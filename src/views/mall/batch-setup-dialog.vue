<template>
	<el-dialog
		:title="'批量设置商品标签 ：' + this.dialogType"
		:visible.sync="dialogVisible"
		class="batchSetupSialog">
		<el-form :inline="true" :model="form">
				<el-form-item label="商品 :" label-width="48px">
					<el-input v-model='form.product' placeholder="单行输入"></el-input>
				</el-form-item>
				<el-form-item label="分类 :" label-width="100px">
				<el-select v-model="form.type" placeholder="请选择">
					<el-option
						v-for="item in typeList"
						:key="item.id" 
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标签 :" label-width="100px">
				<el-select v-model="form.biaoqian" placeholder="请选择">
					<el-option
						v-for="item in lableList"
						:key="item.id" 
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="品牌 :" label-width="48px">
				<el-select v-model="form.brand" placeholder="请选择">
					<el-option
						v-for="item in brandList"
						:key="item.id" 
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="上架状态 :" label-width="100px">
				<el-select v-model="form.topType" placeholder="请选择">
					<el-option
						v-for="item in upperState"
						:key="item.id" 
						:label="item.label"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData"
			@selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="name" label="分类" width="120"></el-table-column>
			<el-table-column prop="name" label="品牌" width="120"></el-table-column>
			<el-table-column prop="address" label="商品" show-overflow-tooltip></el-table-column>
			<el-table-column prop="address" label="标签" show-overflow-tooltip></el-table-column>
			<el-table-column prop="address" label="商品条码" show-overflow-tooltip></el-table-column>
			<el-table-column prop="address" label="上架状态" show-overflow-tooltip></el-table-column>
		</el-table>
		<el-pagination
			@current-change="handleCurrentChange"
			:page-size="10"
			layout="total, prev, pager, next"
			:total="total">
		</el-pagination>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancel">取 消</el-button>
			<el-button type="primary" @click="sure">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialogType: "",
			typeList: [],
			lableList: [],
			brandList: [],
			upperState: [],
			tableData: [],
			form: {},
			listQuery: {
				size: 10,
				page: 1,
			},
			total: 0,
			dialogVisible:false,
		}
	},

	created() {
		// this.init()
	},

	methods: {
		init(dialogType) {
			this.dialogType = dialogType
			switch(dialogType) {
				case "1":
					this.dialogType = "精品"
					break
				case "2":
					this.dialogType = "热卖"
					break
				case "3":
					this.dialogType = "新品"
			}
			this.dialogVisible = true
		},

		// 查询
    search(){

		},
		
		// 取消
		cancel() {

		},

		// 确定
		sure() {

		},

		// 分页
		handleCurrentChange() {
			this.listQuery.page = val
			this.init()
		},

		// 获取表格序号
    handleSelectionChange(val) {
		}
	}
}
</script>

<style lang="scss" scoped>
.batchSetupSialog {
	.el-dialog__body {
		padding: 30px;
	}
}
</style>