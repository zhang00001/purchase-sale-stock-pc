<template>
	<el-dialog
		:title="this.title"
		:visible.sync="dialogVisible"
		width="889px">
		<el-form :inline="true" :model="form">
			<el-row>
				<el-form-item label="商品 :" label-width="48px">
					<el-input v-model='form.name' placeholder="单行输入"></el-input>
				</el-form-item>
				<el-form-item label="分类 :" label-width="115px">
					<el-select v-model="form.category_name" placeholder="请选择">
						<el-option
							v-for="item in classifyList"
							:key="item.id" 
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标签 :" label-width="58px">
					<el-select v-model="form.tag" placeholder="请选择">
						<el-option
							v-for="item in labelList"
							:key="item.id" 
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
			</el-row>
			
			<el-row>
				<el-form-item label="品牌 :" label-width="48px">
					<el-select v-model="form.brand_name" placeholder="请选择">
						<el-option
							v-for="item in brandList"
							:key="item.id" 
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运费模板类型 :" label-width="115px">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option
							v-for="item in freightType"
							:key="item.id" 
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" class="ml-10">查询</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-table
			ref="multipleTable"
			:data="dialogData"
			border
			@selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="category_name" label="分类" ></el-table-column>
			<el-table-column prop="brand_name" label="品牌"></el-table-column>
			<el-table-column prop="name" label="商品" show-overflow-tooltip></el-table-column>
			<el-table-column prop="tag" label="标签" show-overflow-tooltip></el-table-column>
			<el-table-column prop="type" label="运费模板" show-overflow-tooltip></el-table-column>
			<el-table-column prop="goods_code" label="商品条码" show-overflow-tooltip></el-table-column>
		</el-table>
		<el-pagination
		@current-change="handleCurrentChange"
		:page-size="10"
		layout="total, prev, pager, next"
		:total="total">
		</el-pagination>
		<div slot="footer" class="dialog-footer">
			<el-button @click="sure" type="primary" v-if="this.dialogType == '4' || this.dialogType == '5'">保 存</el-button>
			<el-button @click="save" type="primary" v-if="this.dialogType == '1' || this.dialogType == '2' || this.dialogType == '3'">保 存</el-button>
			<el-button @click="batchSave" type="primary" v-if="this.dialogType == '6'">保 存</el-button>
			<el-button class="sure-btn" @click="cancel">取 消</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { 
	goodsTag, 
	getOnshopList, 
	batchShopTag,
	editFreight,
	batchShopFreight,
	getFreightList
} from "@/api/api"
import { CategoryList, BrandList } from "@/api/index"
export default {
	data () {
		return {
			form: {},
			title: "",
			brandList: [],
			labelList: [],
			classifyList: [],
			dialogData: [],
			listQuery: {
				size: 10,
				page: 1,
			},
			total: 0,
			dialogType: "",
			freightType: [],
			firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
			dialogVisible: false
		}
	},

	methods: {
		init(shop_name, id, dialogType, images, templateId) {
			this.id = id 
			this.images = images
			this.shop_name = shop_name
			this.dialogType = dialogType
			this.templateId = templateId
			this.tit = "批量设置商品标签 ："
			switch(dialogType) {
				case "1":
					this.title = this.tit + "精品"
					break
				case "2":
					this.title = this.tit + "热卖"
					break
				case "3":
					this.title = this.tit +  "新品"
					break
				case "4":
					this.title = "更换商品"
					break
				case "5":
					this.title = "新增商品"
					break
				case "6":
					this.title = "批量设置商品数量"
					break
			}
			if(!this.images && !id) {
				this.$message.error("请先上传照片")
			} else {
				this.dialogVisible = true
				this.getSelectValue()
				this.getDialogDetail()
			}
		},

		// 获取下拉列表
		getSelectValue() {
			// 商品标签下拉列表
			goodsTag({...this.listQuery}).then(res => {
				if(res.code === 200) {
					this.labelList = this.firstArr.concat(res.data)
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

			// 运费模板下拉列表
			getFreightList({...this.listQuery}).then( res => {
				if(res.code === 200) {
					this.freightType = this.firstArr.concat(res.data)
				} else {
					this.$message.error(res.message)
				}
			})
		},

		// 获取弹框表格数据
		getDialogDetail() {
			getOnshopList({
				...this.listQuery,
				...this.form
			}).then(res => {
				if(res.code === 200) {
					this.dialogData = res.data.data
					this.total = res.data.total
				} else {
					this.$message.error(res.message)
				}
			})
		},

		handleSelectionChange(val) {
			if(this.dialogType == "4" || this.dialogType == "5") {
				if(val.length > 1) {
					this.$message.error("只能选择一件商品")
					val.forEach(item => {
						this.selectId = item.id
						this.shop_name = item.name
					})
				}
			} else if(this.dialogType == "1" || this.dialogType == "2" || this.dialogType == "3" || this.dialogType == "6") {
				let newStr = ''
					val.forEach((item, i) => {
					newStr += item.id + ','	
				})
				this.batchId = newStr.substring(0, newStr.length - 1)
			}	
		},

		// 确定
		sure() {
			if(!this.selectId) {
				this.$message.error("请选择商品")
			}	
			else {
				if(this.id) {
					this.operate = "更换"
				} else {
					this.operate = "新增"
				}
				this.$common.confirm(
				{
					title: this.operate + "商品",
					content: "该商品将被" + this.operate + "，" + "请谨慎操作"
				},
					() => {
						if(this.id) {
						shopBannerEdit({
							id: this.id,
							images: this.images,
							shop_name: this.shop_name,
							shop_id: this.selectId
						}).then( res => {
							if(res.code === 200) {
								this.$message.success(this.operate + "商品成功")
								this.dialogVisible = false
								this.selectId = ""
								this.images = ""
								this.init()
							} else {
								this.$message.error(res.message)
							}
						})
					} else {
						shopBannerAdd({
							images: this.images,
							shop_name: this.shop_name,
							shop_id: this.selectId
						}).then( res => {
							if(res.code === 200) {
								this.$message.success(this.operate + "商品成功")
								this.selectId = ""
								this.images = ""
								this.dialogVisible = false
								this.init()
							} else {
								this.$message.error(res.message)
							}
						})
					}
				})
			}
		},

		save() {
			if(!this.selectId) {
				this.$message.error("请选择商品")
			} else {
				switch(this.dialogType) {
					case "1":
						this.title = "精品"
						this.typeParams = "1"
						break
					case "2":
						this.title = "热卖"
						this.typeParams = "2"
						break
					case "3":
						this.title = "新品"
						this.typeParams = "3"
						break
				}
				this.$common.confirm(
				{
					title: "批量设置" + this.title + "商品数量",
					content: "该" + this.title + "商品将被批量设置，请谨慎操作"
				},
				() => {
					batchShopTag({
						type: this.typeParams,
						goods_id: this.selectId
					}).then( res => {
						if(res.code === 200) {
							this.$message.success("商品批量设置成功")
							this.selectId = ""
							this.dialogVisible = false
						} else {
							this.$message.error(res.message)
						}
					})
				})
			}
		},

		batchSave() {
			if(!this.batchId) {
				this.$message.error("请选择商品")
			} else {
				this.$common.confirm(
			{
				title: "批量设置商品数量",
					content: "该商品数量将被批量设置，请谨慎操作"
				},
				() => {
					batchShopFreight({
						id: this.templateId,
						goods_id: this.batchId
					}).then( res => {
						if(res.code === 200) {
							this.$message.success("商品批量设置成功")
							this.$emit("refresh")
							this.batchId = ""
							this.dialogVisible = false
						} else {
							this.$message.error(res.message)
						}
					})
				})
			}
		},

		// 取消
		cancel() {
			this.dialogVisible = false
		},

		// // 点击序号分页
    handleCurrentChange(val) {
			this.listQuery.page = val
      this.getDialogDetail()
		},
		
		// 点击查询
		search(){
			this.getDialogDetail()
		},
	}
}
</script>