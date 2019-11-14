<template>
  <div class="app-container">
    <div class="box-inform">
			<el-form :inline="true" :model="form">
				<el-form-item label="名称:">
					<el-input v-model='form.name' placeholder="请输入"></el-input>
				</el-form-item>
					<el-button type="primary" @click="search" class="ml-10">查询</el-button>
					<el-button type="primary" @click="showDialog('add', 'season')" class="search-btn">新增季节</el-button>
			</el-form>
		</div>
   
		<div class="box-table">
			<el-table
				:data="tableData"
				border
				style="width: 100%;text-align:center">
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
						<el-button slot="reference"  @click="showDialog('edit', 'season', scope.row.id)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
				<el-table-column
					prop="name"
					label="季节名称"
					align="center">
				</el-table-column>
				<el-table-column
					prop="sort"
					label="排序"
					align="center"
					>
				</el-table-column>
					<el-table-column
					prop="des"
					label="备注"
					align="center"
					>
				</el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
		</div>

		<dialog-addGoods-info ref="dialogAddGoodsInfo" @refresh="init"></dialog-addGoods-info>
  </div>
</template>

<script>
import {} from "@/api/index"
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
import { seasonList, seasonDel } from "@/api/api.js"
import dialogAddGoodsInfo from '@/components/dialog-addGoods-info'
export default {
	components: {
		dialogAddGoodsInfo
	},
  data() {
    return {
      dialogFormVisible:false,
			form: {},
			listQuery: {
				 size: 10,
				 page: 1
			 },
      rules: {
				ptname: [
					{ required: true, message: '必填', trigger: 'blur' },
				]
			},
      orderStatus: enumSaleStatus,
			total: 0,
     	tableData: [],
    };
	},
	
  created() {
		this.init()
	},

  methods: {
		init() {
			seasonList({
				...this.listQuery,
				...this.form
			}).then(res => {
				if(res.code == 200 ) {
					this.tableData = res.data.data
					this.total = res.data.total
				} else {
					this.$message.error(res.message)
				}
			})
		},

		// 季节新增 详情
    showDialog(type, pageType, id) {
			this.$refs.dialogAddGoodsInfo.init(type, pageType, id)
		},

		// 季节列表删除
     handleDelete(id) {
			 seasonDel(id).then(res => {
				 if(res.code == 200 ) {
					 this.$message.success("商品季节列表删除成功") 
				 } else {
					 this.$message.error(res.message)
				 }
				 this.init()
			 })
		},
		
		// 查询
		search() {
			this.init()
		},
		
		// 取消
		cancel() {
			this.dialogFormVisible = false
		},

		// 确定
		sure() {
			this.dialogFormVisible = false
		},
  
    handleCurrentChange() {
      this.listQuery.page = val
      this.init()
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
