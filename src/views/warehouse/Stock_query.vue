<template>
  <div class="app-container">
			<div class="box-inform">
				<div class="center">
					<el-form :inline="true" :model="form">
						<el-row>
							<el-form-item label="仓库 :" prop="warehouse" label-width="50px">
								<el-select v-model="form.warehouse" placeholder="请选择" style="width:180px">
									<el-option
										v-for="item in warehouseList" 
										:key="item.id" 
										:label="item.name"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="商品 :" prop="name" label-width="78px">
								<el-select v-model="form.name" placeholder="请选择" style="width:180px">
									<el-option
										v-for="item in productList" 
										:key="item.id" 
										:label="item.name"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="分类 :" prop="category" label-width="78px">
								<el-select v-model="form.category" placeholder="请选择" style="width:180px">
									<el-option
										v-for="item in typeList" 
										:key="item.id" 
										:label="item.name"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="尺码 :" prop="sizes" label-width="78px">
								<el-select v-model="form.sizes" placeholder="请选择" style="width:180px">
									<el-option
										v-for="item in numberList" 
										:key="item.id" 
										:label="item.name"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-row>

						<el-row>
							<el-form-item>
								<el-checkbox v-model="filter" @change="changeClickFilter">过滤无库存</el-checkbox>
							</el-form-item>
							<el-form-item>
								<!-- <el-checkbox v-model="form.status" @change="changeClickgoods">商品列表</el-checkbox> -->
									<el-checkbox  @change="changeClickgoods">商品列表</el-checkbox>
							</el-form-item>
							<el-form-item>
								<el-checkbox v-model="single" @change="changeClickSinle">单品列表</el-checkbox>
							</el-form-item>
								<el-button type="primary" @click="search">查询</el-button>
						</el-row>
					</el-form>
				</div>
				<div class="box"></div>
			</div>

      <el-col :span="24" style="margin-top:20px;">
        <div class="box-table">
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column  prop="name" label="名称" align="center"></el-table-column>
						<el-table-column prop="item" label="货号" align="center"></el-table-column>
						<el-table-column prop="goods_code" label="条码" align="center"></el-table-column>
						<el-table-column prop="images" label="图片" align="center">
							<template slot-scope="scope">
                <template>
                  <img :src="scope.row.images[0] || ''" alt :onerror="defaultImg" style="width:50px; height: 50px"/>
                </template>
              </template>
						</el-table-column>
						<el-table-column prop="category" label="分类" align="center"></el-table-column>
						<el-table-column prop="color" label="颜色" align="center"></el-table-column>
						<el-table-column prop="size" label="尺码" align="center"></el-table-column>
						<el-table-column prop="warehouse" label="仓库" align="center"></el-table-column>
						<el-table-column prop="unit" label="单位" align="center"></el-table-column>
						<el-table-column prop="stock_lower" label="库存预警(下))" align="center"></el-table-column>
						<el-table-column prop="stock_upper" label="库存预警(上))" align="center"></el-table-column>
						<el-table-column prop="stock" label="当前库存数" align="center"></el-table-column>
					</el-table>
					<el-pagination
						@current-change="handleCurrentChange"
						:page-size="10"
						layout="total, prev, pager, next"
						:total="total">
					</el-pagination>
				</div>
      </el-col>
  </div>
</template>

<script>
import { 
	commodityList, 
	warehouseSelectList, 
	CategoryList, 
	izeList,
	StockList,
	SizeList
	} from "@/api/api.js"
import http from "@/utils/request"
export default {
  data() {
    return {
			filter: "",
			single: "",
			warehouseList: [],
      storeList: [],
      productList: [],
      typeList: [],
      numberList: [],
      form: {},
      listQuery: {
				size: 10,
				page: 1
			},
			total: 0,
		 	tableData: [],
			firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
			defaultImg: this.$store.state.defaultImg // 默认图片
    }
	},
	
	created() {
    this.init()
    this.getSelectValue()
	},
	
  methods: {
		init() {
			StockList({
				params: {
					...this.form,
					...this.listQuery,
				}
			}).then(res => {
				if(res.code == 200 ) {
					this.tableData = res.data.data
					this.tableData.forEach(item => {
						item.images = item.images ? item.images.map(item => process.env.BASE_API + "" + item) : []
					})
					this.total = res.data.total
				} else {
					this.$message.error(res.message)
				}
			})
		},
     handleDelete(row) {
      console.log(row);
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
			
			// 分类下拉列表
      CategoryList().then(res => {
        if (res.code === 200) {
					this.typeList = this.firstArr.concat(res.data)
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
		
		// 过滤无库存
		changeClickFilter(val) {
			if(val) {
				this.form.filter = "1"
			} else {
				this.form.filter = ""
			}
		},

		// 切换商品列表
		changeClickgoods(val) {
			// if(val === true) {
			// 	this.form.checked = "1"
			// 	console.log(this.form.checked)
			// } else {
			// 	this.form.checked = "2"
			// 	console.log(this.form.checked)
			// }
		},

		// 切换单品
		changeClickSinle(val) {
			if(val === true) {
				this.form.single = "1"
			} else {
				this.form.single = ""
			}
		},
		
    handleCurrentChange() {
      this.listQuery.page = val
      this.init()
    },
    // 获取表格序号
    handleSelectionChange(val) {
      console.log(val);
      this.tableIndex = val;
      this.multipleSelection = val;
      // this.multipleSelection += val[0].schemeId + ','
    },
    addSupplier() {
       this.$router.push({ path: "/purchase/AddSupplier" })
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
