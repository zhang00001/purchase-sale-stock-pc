<template>
	<div>
		<el-dialog title="选择商品" :visible.sync="dialogFormVisible" class="dialog-select-goods" width="500px">
			<div>
				<div>
          <el-input v-model="saerchGood" style="width:300px;" placeholder="货号、名称、条码"></el-input>
          <el-button class="ml-20" type="primary" @click="init">搜索</el-button>
        </div>
				<div
					v-for="item in goodsList"
					:key="item.id"
					@click="selsctGood(item)"
					class="goodList">
					{{item.name }}
				</div>
   
				<el-pagination
					@current-change="handleCurrentChange"
					:page-size="10"
					layout="total, prev, pager, next"
					:total="total">
				</el-pagination>
			</div>
		</el-dialog>

		<!-- 根据商品id，弹框商品选择详情弹框 -->
		<dialog-select-goods ref="dialogSelectGoods" @refresh="getData"></dialog-select-goods>
	</div>
</template>

<script>
import dialogSelectGoods from "@/components/dialog-select-goods"
import { goodsList } from "@/api/index"
export default {
	components: {
		dialogSelectGoods
	},
	data() {
		return {
			goodsList: "",
			saerchGood: "", ///输入商品搜索
			listQuery: {
				size: 10,
				page: 1,
			},
			total: 0,
			dialogFormVisible: false
		}
	},

	created() {

	},

	methods: {
		getData() {
			this.$emit("refresh")
		},

		init() {
			this.dialogFormVisible = true
			this.saerchGood = ""
			goodsList({
				params: {
					...this.listQuery,
					saerchGood: this.saerchGood
				}
			}).then(res => {
        this.goodsList = res.data.data
        this.total = res.data.total
      })
		},

		search() {

		},

		// 根据新增商品列表弹出弹框
		selsctGood(goodsList) {
			this.$refs.dialogSelectGoods.init(goodsList)
			this.dialogFormVisible = false
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
.dialog-select-goods {
	.goodList {
		font-size: 16px;
		margin-top: 30px;
		cursor: pointer;
	}
	.goodList:hover {
		color: #55A1FF;
	}
	 .el-dialog__body {
		.el-input {
				margin-top: 10px;
		}
		.el-button {
			width: 60px;
			padding: 0;
		}
	}
}


</style>