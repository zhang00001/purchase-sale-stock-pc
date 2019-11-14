<template>
  <div class="app-container">
		<div class="box-table">
			<el-button type="primary" @click="showDialog('add', 'brand')" class="new-add">新增品牌</el-button>
			<el-table
				:data="tableData"
				border
				style="width: 100%;text-align:center">
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
						<el-button slot="reference"  @click="showDialog('edit', 'brand', scope.row.id)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
				<el-table-column
					prop="name"
					label="品牌名称"
					align="center">
				</el-table-column>
				<el-table-column
					prop="website"
					label="网址"
					align="center"
					>
				</el-table-column>
				<el-table-column
					prop="des"
					label="描述"
					align="center"
					>
				</el-table-column>
				<el-table-column
					prop="sort"
					label="排序"
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
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
import dialogAddGoodsInfo from '@/components/dialog-addGoods-info'
import { BrandAdd, BrandList, BrandDel,BrandEdit } from "@/api/index"
export default {
	components: {
		dialogAddGoodsInfo
	},
  data() {
    return {
      dialogFormVisible:false,
      orderStatus: enumSaleStatus,
		 	tableData: [],
			 total: 0,
			 listQuery: {
				 size: 10,
				 page: 1
			 }
    }
  },
  created() {
		this.init()
	},
  methods: {
		init() {
			BrandList({
				...this.listQuery
			}).then(res => {
				if(res.code == 200 ) {
					this.tableData = res.data.data
					this.total = res.data.total
				} else {
					this.$message.error(res.message)
				}
			})
		},

		// 品牌新增 详情
    showDialog(type, pageType, id) {
			this.$refs.dialogAddGoodsInfo.init(type, pageType, id)
		},

		// 品牌列表删除
     handleDelete(id) {
			 BrandDel(id).then(res => {
				 if(res.code == 200 ) {
					 this.$message.success("商品品牌删除成功") 
				 } else {
					 this.$message.error(res.message)
				 }
				 this.init()
			 })
		},
	
    handleCurrentChange(val) {
			this.listQuery.page = val
      this.init()
    },
  }
};
</script>

<style lang="scss" scoped>
.new-add {
	margin-bottom: 30px;
	float: right;
}
</style>
