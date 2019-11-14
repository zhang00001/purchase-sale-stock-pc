<template>
	<div class="purchase-order">
		<div class="box-inform">
			<el-form ref="form" :model="form">
				<el-row class="search-form-input">
					<el-form-item label="仓库 :" prop="warehouse" label-width="48px">
						<el-select v-model="form.warehouse" placeholder="请选择">
							<el-option
								v-for="item in warehouseList" 
								:key="item.id" 
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品 :" prop="name" label-width="118px">
						<el-select v-model="form.name" placeholder="请选择">
							<el-option
								v-for="item in productList" 
								:key="item.id" 
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="颜色 :" prop="color" label-width="118px">
						<el-select v-model="form.color" placeholder="请选择">
							<el-option
								v-for="item in ColorList" 
								:key="item.id" 
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-row>

				<el-row class="search-form-input search-form-other">
					<el-form-item label="尺码 :" prop="sizes" label-width="48px">
						<el-select v-model="form.sizes" placeholder="请选择">
							<el-option
								v-for="item in numberList" 
								:key="item.id" 
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日期 :" prop="startDate" label-width="118px"> 
						<el-date-picker 
							v-model="form.start_time" 
							type="date" 
							placeholder="请选择日期" 
							value-format="yyyy-MM-dd">
						</el-date-picker>
						<el-date-picker 
							v-model="form.end_time" 
							type="date" 
							placeholder="请选择日期" 
							value-format="yyyy-MM-dd"
							class="ml-10">
						</el-date-picker>
						<el-button type="primary" @click="search" class="ml-30">查询</el-button>
					</el-form-item>
				</el-row>
			</el-form>
		</div> 

		<el-card class="box-card">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column  prop="create_time" label="业务时间" align="center"></el-table-column>
				<el-table-column prop="item" label="货号" align="center"></el-table-column>
				<el-table-column prop="name" label="名称" align="center"></el-table-column>
				<el-table-column prop="color" label="颜色" align="center"></el-table-column>
				<el-table-column prop="size" label="尺码" align="center"></el-table-column>
				<el-table-column prop="warehouse" label="仓库" align="center"></el-table-column>
				<el-table-column prop="type" label="业务类型" align="center"></el-table-column>
				<el-table-column prop="number" label="业务单号" align="center"></el-table-column>
				<el-table-column prop="add_num" label="库存增加数量" align="center"></el-table-column>
				<el-table-column prop="sur_num" label="剩余数量" align="center"></el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
import { 
		commodityList, 
		warehouseSelectList, 
		ColorList, 
		SizeList,
		turnoverList
	} from "@/api/api.js"
  export default {
    data() {
      return {
				form: {},
				warehouseList: [],
				ColorList: [],
				numberList: [],
				productList: [],
				tableData: [],
				listQuery: {
					size: 10,
					page: 1
				},
				total: 0,
				firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
      }
		},	
		created() {
			this.init()
			this.getSelectValue()
		},

    methods: {
			init() {
				turnoverList({
					params: {
						...this.form,
						...this.listQuery,
					}
				}).then(res => {
					if(res.code == 200 ) {
						this.tableData = res.data.data
						this.total = res.data.total
					} else {
						this.$message.error(res.message)
					}
				})
			},

			// 获取下拉值
			getSelectValue() {
				// 查询商品下拉列表
				commodityList().then(res => {
					if (res.code === 200) {
						this.productList = this.firstArr.concat(res.data.data)
					} else {
						this.$message.error(res.message)
					}
				})

				// 查询仓库下拉列表
				warehouseSelectList().then(res => {
					if (res.code === 200) {
						this.warehouseList = this.firstArr.concat(res.data)
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
				
				// 尺码下拉列表
				SizeList().then(res => {
					if (res.code === 200) {
						this.numberList = this.firstArr.concat(res.data.data)
					} else {
						this.$message.error(res.message)
					}
				})
			},

			// 查询
			search() {
				this.init()
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
	/deep/.box-inform  {
		padding-bottom: 20px!important;
		.search-form-input {
			display: flex;
		}
	}
</style>