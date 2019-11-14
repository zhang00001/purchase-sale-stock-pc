<template>
	<div class="box-table">
		<h5 class="sales-Order">首页轮播图</h5>
		<div class="nav">
			<div class="tips">提示: 本地上传图片大小不超过400k，建议长宽比例3：1，如750*250和1242*414，最多可添加5张图片</div>
			<el-button type="primary" @click="addRow" class="ml-20">新增</el-button>
		</div>
		<el-table 
		:data="tableData" 
		border>
			<el-table-column prop="images" label="图片" align="center">
				<template slot-scope="scope">
					<template>
						<img :src="scope.row.images" style="width:60px; height: 60px" v-if="scope.row.id"/>
						<commonUpload :limit='3' :pictureType="picture" @upPicture="upPicture" :imagesList="this.images" v-else></commonUpload>
					</template>
				</template>
			</el-table-column>
			<el-table-column label="排序" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="goMove('1', scope.row.id)" :disabled="scope.row.id ? false : true">上移</el-button>
					<el-button type="text" size="small" @click="goMove('2', scope.row.id)" :disabled="scope.row.id ? false : true">下移</el-button>
				</template>
				
			</el-table-column>
			<el-table-column prop="shop_name" label="商品名称" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button @click="selectProduct(scope.row.shop_name, scope.row.id,'4')" type="text" size="small" v-if="scope.row.id">更换商品</el-button>
					<el-button @click="selectProduct(scope.row.shop_name, scope.row.id, '5')" type="text" size="small" v-else>新增商品</el-button>
					<el-button type="text" size="small" @click="detel(scope.row.id, scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<dialog-common-goods ref="dialogCommonGoods"></dialog-common-goods>
	</div>
</template>

<script>
import { 
	shopBannerList, 
	shopBannerSort, 
	shopBannerDel, 
	shopBannerEdit,
	shopBannerAdd,
} from "@/api/api"
import { BrandList, CategoryList } from "@/api/index"
import commonUpload from "@/components/common-upload"
import dialogCommonGoods from "@/components/dialog-common-goods"
export default {
	components: { 
		commonUpload,
		dialogCommonGoods
	},
	data() {
		return {
			defaultImg: this.$store.state.defaultImg, // 默认图片
			fileList: [],
			listQuery: {
				size: 10,
				page: 1,
			},
			tableData: [],
			list: {
				images: ""
			},
			lists: {},
			picture: "picture"
		}
	},

	created() {
		this.init()
	},

	methods:{
		init() {
			shopBannerList({
				params: {
					...this.listQuery
				}
			}).then(res => {
				if(res.code === 200) {
					this.tableData = res.data
				} else {
					this.$message.error(res.message)
				}
			})
		},

		upPicture(images) {
			this.images = images
		},

		// 商品上移下移
		goMove(val, id) {
			shopBannerSort({
				id: id,
				sort: val == "1" ? "asc" : "desc"
			}).then(res => {
				if(res.code === 200) {
					if(val == "1") {
						this.$message.success("商品上移成功")
					} else if(val == "2") {
						this.$message.success("商品下移成功")
					}
					this.init() 
				} else {
					this.$message.error(res.msg)
				}
			})
		},

		// 删除
		detel(id, index) {
			if(!id) {
				this.tableData.splice(index, 1)
			} else {
				this.$common.confirm(
				{
					title: "删除商品",
					content: "该商品将被删除，请谨慎操作"
				},
				() => {
					shopBannerDel({
						id: id
					}).then(res => {
						if(res.code === 200) {
							this.$message.success("商品删除成功")
							this.init()
						} else {
							this.$message.error(res.message)
						}
					})
				})
			}
		},

		// 选择商品
		selectProduct(shop_name, id, dialogType){
			this.shop_name = shop_name
			this.id = id
			this.$refs.dialogCommonGoods.init(this.shop_name, this.id, dialogType, this.images)
		},

		// 新增
		addRow() {
			this.tableData.unshift(this.list)
		}
	}
}
</script>

<style lang="scss" scoped>
.sales-Order {
	font-size: 16px;
}
.BtnBlue{
	border:none;
	color:#2596FF;
	background-color: #fff;
}
.btnNomal {
	border:none;
	color: #606266;
	background-color: #fff;
}
.imgWidth{
	width:300px;
	height: 100px;
}
table{
border-collapse:collapse;
text-align: center;
font-size:14px;
// margin-top:10px;
}
th{
  width:200px;
  height:50px;
}
table tr{
height:50px;
border:1px solid #E6EAEE;
}  
table tr td{
width:600px;
height:50px;
border:1px solid #E6EAEE;
}
.tips {
	margin: 20px 0;
}
/deep/.el-dialog__footer {
	text-align: center!important;
}
.nav {
	.el-button {
		display: flex;
	height: 40px;
	margin: 18px 0 0 750px;
	}
}
.g-inline-block {
  display: inline-block;
}
</style>
