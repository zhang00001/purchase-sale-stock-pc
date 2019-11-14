<template>
  <div class="app-container">
    <div class="box-inform">
			<el-form :model="form">
				<el-form-item label="名称 :">
					<el-input v-model='form.name' placeholder="单行输入"></el-input>
					<el-button type="primary" @click="search" class="ml-10">查询</el-button>
					<el-button type="primary" @click="showDialog('add', 'material' )"  class="search-btn">新增材质</el-button>
				</el-form-item>
					
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
						<el-button slot="reference"  @click="showDialog('edit', 'material', scope.row.id)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
				<el-table-column
					prop="name"
					label="材质名称"
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
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
import dialogAddGoodsInfo from '@/components/dialog-addGoods-info'
import { MaterialList, MaterialDel, MaterialSearch } from "@/api/index"
export default {
	components: {
		dialogAddGoodsInfo
	},
  data() {
    return {
      form: {},
      rules: {
				ptname: [
					{ required: true, message: '必填', trigger: 'blur' },
				]
			},
		 tableData: [],
		 total: 0,
		 listQuery: {
				 size: 10,
				 page: 1
			 }
    };
	},
	
  created() {
		this.init()
	},

  methods: {
		init() {
			MaterialList({
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

		// 材质新增 详情
    showDialog(type, pageType, id) {
			this.$refs.dialogAddGoodsInfo.init(type, pageType, id)
		},

		// 材质列表删除
     handleDelete(id) {
      MaterialDel(id).then(res => {
				if(res.code == 200 ) {
					this.$message.success("商品材质列表删除成功") 
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
  
    handleCurrentChange() {
      this.listQuery.page = val
      this.init()
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
