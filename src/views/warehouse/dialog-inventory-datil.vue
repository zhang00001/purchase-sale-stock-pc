<template>
	<el-dialog title="盘点明细" :visible.sync="dialogFormVisible" width="1000px" class="detail-dialog">
		<el-form  ref="form" :model="form">
			<el-row>
				<el-col :span="6">
					<el-form-item label="盘点人 :" prop="maker" label-width="62px">
						<el-select v-model="form.maker" placeholder="请选择">
							<el-option
								v-for="item in MakerList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="商品 :" prop="goods" label-width="54px">
						<el-select v-model="form.goods" placeholder="请选择">
							<el-option
								v-for="item in goodsList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
		
				<el-col :span="6">
					<el-form-item label="颜色 :" prop="color" label-width="48px">
						<el-select v-model="form.color" placeholder="请选择">
							<el-option
								v-for="item in ColorList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="尺码 :" prop="sizes" label-width="48px">
						<el-select v-model="form.sizes" placeholder="请选择">
							<el-option
								v-for="item in SizeList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item>
				<el-checkbox v-model="form.num" @change="changeClickFilter">盘点数量为零</el-checkbox>
				<el-button class="search-bottom" type="primary" @click="search">查 询</el-button>
			</el-form-item>
		</el-form>

		<div>
			<template>
    <el-table
      :data="tableData"
			border>
      <el-table-column prop="name" label="商品" align="center"></el-table-column>
      <el-table-column prop="item" label="货号" align="center"></el-table-column>
      <el-table-column prop="goods_code" label="条码" align="center"></el-table-column>
			<el-table-column prop="color" label="颜色" align="center"></el-table-column>
			<el-table-column prop="size" label="尺码" align="center"></el-table-column>
			<el-table-column prop="unit" label="单位" align="center"></el-table-column>
			<el-table-column prop="put_number" label="盘点数量" align="center"></el-table-column>
			<el-table-column prop="front" label="盘点前数量" align="center"></el-table-column>
    </el-table>
		<el-pagination
			@current-change="handleCurrentChange"
			:page-size="10"
			layout="total, prev, pager, next"
			:total="total">
		</el-pagination>
  </template>
		</div>
	</el-dialog>
</template>

<script>
import { 
	commodityList, 
	ColorList, 
	MakerList,
	SizeList,
	getInventory,
	InventoryDetailed
} from "@/api/api.js"
export default {
	data() {
		return {
			dialogFormVisible: false,
			form: {},
			num: "",
			MakerList: [],
			planState: [],
			goodsList: [],
			ColorList: [],
			tableData: [],
			SizeList: [],
			id: this.$route.query.id,
			firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
			listQuery: {
				size: 10,
				page: 1,
			},
			total: 0
		}
	},
	
	methods: {
		init() {
			this.dialogFormVisible = true
			this.form = {}
			this.getDatil()
			this.getSelectValue()
		},

		// 过滤无库存
		changeClickFilter(val) {
			// if(val === true) {
			// 	this.form.num = "0"
			// } else {
			// 	this.form.num = ""
			// }
		},

		// 列表详情
		getDatil() {
			InventoryDetailed({
				params: {
					...this.form,
					...this.listQuery
				}
			}).then(res => {
        if (res.code === 200) {
					this.tableData = res.list.data
					this.total = res.list.total
        } else {
					this.$message.error(res.message)
				}
			})
		},

		// 获取下拉列表
    getSelectValue() {
			// 获取商品列表
			commodityList().then(res => {
        if (res.code === 200) {
					this.goodsList = this.firstArr.concat(res.data.data)
        } else {
					this.$message.error(res.message)
				}
			})
			
      // 所盘点人下拉列表
      MakerList().then(res => {
        if (res.code === 200) {
					this.MakerList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
      })

      // 颜色下拉列表
      ColorList().then(res => {
        if (res.code === 200) {
					this.ColorList = this.firstArr.concat(res.data.data)
        } else {
					this.$message.error(res.message)
				}
			})
			
			// 颜色下拉列表
      SizeList().then(res => {
        if (res.code === 200) {
					this.SizeList = this.firstArr.concat(res.data.data)
        } else {
					this.$message.error(res.message)
				}
      })
		},

		// 查询
		search() {
			this.getDatil()
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
		},

		// 点击序号分页
    handleCurrentChange(val) {
			this.listQuery.page = val
      this.init()
    }
	}
}
</script>

<style lang="scss" scoped>
	/deep/.el-form {
		.el-form-item {
			.el-input {
				width: 140px!important;
			}
			.el-select {
				width: 140px!important;
			}
		}
		/deep/.search-bottom {
			padding: 0;
			width: 70px;
			height: 40px;
		}
	}
</style>