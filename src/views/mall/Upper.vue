<template>
  <div class="app-container">
		<div class="box-inform">
			<el-form :inline="true" :model="form">
				<el-row>
					<el-form-item label="商品 :" label-width="50px">
						<el-input v-model='form.name_item' placeholder="单行输入"></el-input>
					</el-form-item>
					<el-form-item label="价格区间 :" label-width="78px" class="price">
						<el-input v-model='form.min_price' placeholder="请输入"></el-input>
						<span>-</span>
						<el-input v-model='form.max_price' placeholder="请输入"></el-input>
					</el-form-item>

					<el-form-item label="运费模板类型 :" label-width="106px">
						<el-select v-model="form.type" placeholder="请选择">
							<el-option
								v-for="item in freightType"
								:key="item.id" 
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="品牌 :" label-width="50px">
						<el-select v-model="form.brand" placeholder="请选择">
							<el-option
								v-for="item in brandList"
								:key="item.id" 
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="标签 :" label-width="50px">
						<el-select v-model="form.tag" placeholder="请选择">
							<el-option
								v-for="item in labelList"
								:key="item.id" 
								:label="item.name"
								:value="item.name"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品状态 :" label-width="78px">
						<el-select v-model="form.com_status" placeholder="请选择" >
							<el-option
								v-for="item in goodsState"
								:key="item.id" 
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上架状态 :" label-width="104px">
						<el-select v-model="form.sale_status" placeholder="请选择" >
							<el-option
								v-for="item in upperState"
								:key="item.id" 
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
					</el-form-item>
				</el-row>
			</el-form>
			<el-button type="primary" @click="grounding('1')" class="ml-20">上架</el-button>
			<el-button type="primary" @click="grounding('2')" class="ml-20">下架</el-button>
			<!-- <el-button type="primary" @click="search" class="ml-20">批量打印商品二维码</el-button> -->
		</div>

		<div class="box-table">
			<el-table 
			:data="tableData" 
			border 
			@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="42"></el-table-column>
				<el-table-column label="操作" align="center" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
						<el-button type="text" size="small" @click="share(scope.row)">分享</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="sort" label="排序" align="center"></el-table-column>
				<el-table-column  prop="category_name" label="分类" align="center"></el-table-column>
				<el-table-column prop="tag" label="标签" align="center"></el-table-column>
				<el-table-column prop="name" label="商品" align="center"></el-table-column>
				<el-table-column prop="goods_code" label="商品条码" align="center"></el-table-column>
				<el-table-column prop="sale_status_name" label="上架状态" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="material_name" label="材质" align="center"></el-table-column>
				<el-table-column prop="season_name" label="季节" align="center"></el-table-column>
				<el-table-column prop="style_name" label="款式" align="center"></el-table-column>
				<el-table-column prop="sex_name" label="男女款" align="center"></el-table-column>
				<el-table-column prop="trade_price" label="价格" align="center"></el-table-column>
				<el-table-column prop="purchase_price" label="采购价" align="center"></el-table-column>
				<el-table-column prop="retail_price" label="零售价" align="center"></el-table-column>
				<el-table-column prop="year" label="年份" align="center"></el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
    </div>
  </div>
</template>

<script>
import { BrandList } from "@/api/index"
import { 
	upperList,
	upperGoods,
	goodsTag,
	downGoods
 } from "@/api/api"
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
export default {
  data() {
    return {
			brandList: [], // 品牌列表
			// 标签列表
			labelList: [], 
			// 运费模板类型
			freightType: [
				{id : "0", name: "暂无接口"}
			],
			// 商品状态
			goodsState: [
				{id : "2", name: "全部"},
				{id : "1", name: "开启"},
				{id : "0", name: "关闭"}
			],
			// 上架状态 
			upperState: [
				{id : "2", name: "全部"},
				{id : "0", name: "已上架"},
				{id : "1", name: "已下架"}
			],
      form: {},
			listQuery: {
				size: 10,
				page: 1,
			},
      total: 0,
			tableData: [],
			multipleSelection: [],
			orderStatus: enumSaleStatus,
			firstArr: [{ id: null, name: '全部' }] // 下拉列表全部
    }
	},
	
	created() {
		this.init()
		this.getSelectValue()
	},
	
  methods: {
		init() {
      upperList({
        params: {
					...this.form,
					...this.listQuery
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        } else {
          this.$message.error(res.message)
        }
      })
		},

		// 点击查询
    search() {
      this.init()
		},

		// 获取下拉框数据
		getSelectValue() {
			// 商品品牌下拉列表
			BrandList({...this.listQuery}).then( res => {
				if(res.code === 200) {
					this.brandList = this.firstArr.concat(res.data.data)
				} else {
					this.$message.error(res.message)
				}
			})

			// 商品标签下拉列表
			goodsTag({...this.listQuery}).then( res => {
				if(res.code === 200) {
					this.labelList = this.firstArr.concat(res.data)
				} else {
					this.$message.error(res.message)
				}
			})
		},
		
		// 点击序号分页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.init()
		},

			// 上架   
		grounding(params) {
			if(!this.multipleSelection.length) {
        this.$message({
          message: '请选择藏品',
          type: 'warning'
        })
      } else {
				if(params == "1") {
				this.operate = "上架"
			} else if (params == "2") {
				this.title = "下架"
			} 
				this.$common.confirm(
				{
					title: this.operate + "商品",
      		content: "该商品将被"+ this.operate + '，' + "请谨慎操作"
				},
				() => {
					switch(params) {
						case '1':
							upperGoods({
								id_list: this.upId
							}).then( res => {
								if(res.code === 200) {
									this.$message.success("商品上架成功")
									this.init()
								} else {
									this.$message.error(res.message)
								}
							})
							break
						case '2':
							downGoods({
								id_list: this.downId
							}).then( res => {
							if(res.code === 200) {
								this.$message.success("商品下架成功")
								this.init()
							} else {
								this.$message.error(res.message)
							}
						})
						break
					}
				})
			}
		},

		// 或许表格选中数据
		handleSelectionChange(val) {
			this.multipleSelection = val
			val.forEach(item => {
				 let strUp = ''
				 let strDown = ''
          	this.multipleSelection.forEach((it, i) => {
						strUp += it.id + ','	
						strDown += it.shop_id + ','
				 })
				 this.upId = strUp.substring(0, strUp.length - 1)
				 this.downId = strDown.substring(0, strDown.length - 1)
			})
		},

		// 下架
		downIng() {

		},

		// 编辑
		edit(id) {
			this.$router.push({ path: "/commodity/add", query: {pageType: 1, id: id} })
		},
		
		// 分享
		share(){},
  }
}
</script>

<style lang="scss" scoped>
.app-container {
	.el-form--inline .el-form-item {
		margin-right: 40px;
	}
	.price {
		.el-input {
			width: 88px;
		}
		span {
			color: #DCDFE6;
		}
	}
}
/deep/.box-inform {
	padding: 30px;
}
</style>
