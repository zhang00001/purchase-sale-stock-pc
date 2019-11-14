<template>
  <div class="app-container">
		<div class="box-inform">
			<el-form :inline="true" :model="form">
					<el-form-item label="补货方式 :" prop="replenish" label-width="85px">
						<el-select v-model="form.replenish" placeholder="请选择" @change="selectType">
							<el-option
								v-for="item in BuhuoList" 
								:key="item.id" 
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="补货后销售总天数 :" prop="total_days" v-if="this.isFlag">
						<el-input  v-model='form.total_days' placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="补货后销售总天数 :" v-else >
						<el-input  v-model='form.total_days' placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="供应商 :" prop="Supplier" label-width="78px">
						<el-select v-model="form.Supplier" placeholder="请选择" >
							<el-option
								v-for="item in supplierList"
								:key="item.id" 
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>

				<el-form-item label="仓库 :" prop="warehouse" label-width="78px">
					<el-select v-model="form.warehouse" placeholder="请选择">
						<el-option
								v-for="item in warehouseList"
								:key="item.id" 
								:label="item.name"
								:value="item.id"
							></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类 :" prop="category" label-width="85px">
					<el-select v-model="form.category" placeholder="请选择">
						<el-option
							v-for="item in classifyList"
							:key="item.id" 
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="品牌 :" prop="brand" label-width="131px">
					<el-select v-model="form.brand" placeholder="请选择">
						<el-option
							v-for="item in brandList"
							:key="item.id" 
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品 :" label-width="78px">
					<el-input v-model='form.commodity' placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="box-table">
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column	type="selection" width="55"></el-table-column>
				<el-table-column	label="商品名称"	prop="commodity.name"	width="100" align="center"></el-table-column>
				<el-table-column	prop="commodity.goods_code"	label="货号" width="100" align="center"></el-table-column>
				<el-table-column	prop="color"	label="颜色"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="size" label="尺码"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="commodity.brand.brand_name"	label="品牌"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="commodity.category.cate_name"	label="分类"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="commodity.unit.unit_name"	label="单位"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="commodity.purchase_price"	label="采购价"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="commodity.name.type"	label="供应商"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="stock.stock"	label="当前库存"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="stock.stock"	label="可用库存"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="info.sum_push_num"	label="待出库"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="info.sum_pull_num"	label="待入库"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="stock_lower"	label="库存预警下限"	width="110px"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="info.lower_stock"	label="低于预警数"	width="110px"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="info.averageDailySales"	label="近15天日均销量"	width="120px"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="info.supportSalesDays"	label="支撑销售天数"	width="110px"	show-overflow-tooltip align="center"></el-table-column>
				<el-table-column	prop="info.replenish"	label="建议补货量"	width="110px"	show-overflow-tooltip align="center"></el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
			<div style="text-align:center">
				<el-button type="primary" style="margin-top:20px;text-align:center;width:150px;height:40px;line-height:10px;" @click="jumpTo">补货</el-button>
			</div>
    </div>
  </div>
</template>

<script>
import {
	supplierSelectList,
	warehouseSelectList,
	ReplenishList,
	Replenish
} from "@/api/api.js"
import { CategoryList, BrandList } from "@/api/index.js"
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
export default {
  data() {
    return {
			BuhuoList: [
				{id: "1", name: "补货至库存预警下线"},
				{id: "2", name: "补货至特定销售天数"},
			],
			tableDataList: "",
			goodsId: "",
			classifyList: [],
			brandList: [],
			supplierList: [],
			warehouseList: [],
      form: {},
      orderStatus: enumSaleStatus,
     	tableData: [],
			isFlag: false,
			total: 0,
			listQuery: {
				size: 10,
				page: 1,
			},
			firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
    }
  },
  created() {
		this.init()
		this.getSelectValue()
	},
  methods: {
		// 初始化表格
		init() {
			ReplenishList({
				params: {
					...this.form,
					...this.listQuery,
        }
			}).then(res => {
        if (res.code === 200) {
					this.tableData = res.data.data
					this.total = res.data.total
        } else {
					this.$message.error(res.message)
				}
      })
		},

		// 获取下拉框数据
		getSelectValue() {
			// 查询供应商下拉列表
      supplierSelectList().then(res => {
        if (res.code === 200) {
					this.supplierList = this.firstArr.concat(res.data)
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
		
			// 商品分类下拉列表
			CategoryList().then( res => {
				if(res.code === 200) {
					this.classifyList = this.firstArr.concat(res.data.data)
				} else {
					this.$message.error(res.message)
				}
			})

			// 商品品牌下拉列表
			BrandList({...this.listQuery}).then( res => {
				if(res.code === 200) {
					this.brandList = this.firstArr.concat(res.data.data)
				} else {
					this.$message.error(res.message)
				}
			})
		},

    //查询表格
    search(){

		},
		
		// 获取表格序号
    handleSelectionChange(val) {
			this.purchase_id = val[0].relation[0].pid // 采购单id
			this.product_id = val[0].id // 单品id
			this.replenish = val[0].info.replenish // 补货数量

			if(val.length > 1) {
				this.$message.error("只能选择一件单品")
			}	else {
				this.tableDataList = val
			}
		},
		
    //补货
    jumpTo(){
				if(!this.tableDataList) {
					this.$message.error("请选择单品")
				} else if(this.tableDataList[0].relation.length == "0") {
					this.$message.error("该单品暂不支持补货,请新建单品")
				} else if(this.replenish == false) {
					this.$message.error("该单品暂不支持补货,请新建单品")
				}
				else {
					Replenish({
						purchase_id: this.purchase_id,
						product_id: this.product_id,
						replenish: this.replenish
					}).then(res => {
					if(res.code === 200) {
						this.$message.success("补货成功")
						this.$router.push({ path: '/purchase/order' })
					} else {
						this.$message.error(res.message)
					}
				})


	
				// this.goodsId = this.tableDataList[0].relation[0].purchase.id
				// this.$router.push({ path: '/purchase/newBuild',  query: {order: '5', id: this.goodsId} })
			}  
		},
		
		// 点击补货方式下拉
		selectType(value) {
			if(value == '0') {
				this.isFlag = true
			} else {
				this.isFlag = false
			}
		},

    // 点击序号分页
    handleCurrentChange(val) {
			this.listQuery.page = val
      this.init()
		}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.marginRight30： {
  margin-right: 30px !important;
}
.searchInput {
  width: 190px;
}
.date {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-right: 16px;
  }
  .datepicker {
    margin-left: 16px;
  }
}
.label {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  position: relative;
  text-indent: 10px;
}
.label::after {
  content: "";
  left: 0;
  top: 3px;
  position: absolute;
  width: 4px;
  height: 14px;
  background: rgba(51, 51, 51, 1);
  border-radius: 3px;
}
.el-form--inline .el-form-item {
	margin-right: 40px;
}
</style>
