<template>
	<el-card>
			<div class="card-header">
				<h5 class="sales-Order">采购订单</h5>
				<el-radio-group v-model="status" size="medium">
					<el-radio-button
						v-for="item in orderStatus"
						:label="item.id"
						:key="item.id">
						{{item.name}}
					</el-radio-button>
				</el-radio-group>
				<el-button class="build-botton" type="primary" @click='goBuild'>新建采购订单</el-button>
			</div>
			<div class="order-search">
				<p>单据日期 :</p>
				<el-button type="text" v-for="(item, index) in searchList" :key="index" @click="searchTerm(item.id)">
					{{item.name}}
				</el-button>
					<el-date-picker 
					v-model="form.startDate" 
					type="date" 
					placeholder="开始日期" 
					value-format="yyyy-MM-dd"
					class="datepicker">
				</el-date-picker>
			<!-- </el-form-item> -->
			<!-- <el-form-item  prop="endDate"> -->
				<el-date-picker 
					v-model="form.endDate" 
					type="date" 
					placeholder="结束日期" 
					value-format="yyyy-MM-dd"
					class="datepicker">
				</el-date-picker> 
			</div>

			<div class="card-bottom">
				<el-form class="search-form" ref="form" :model="form">
					<el-form-item label="供应商" prop="Supplier" label-width="100px">
						<el-select v-model="form.Supplier" placeholder="请选择">
							<el-option
								v-for="item in planState"
								:key="item.index"
								:label="item.dictName"
								:value="item.index"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="仓库" prop="Supplier" label-width="100px">
						<el-select v-model="form.Supplier" placeholder="请选择">
							<el-option
								v-for="item in planState"
								:key="item.index"
								:label="item.dictName"
								:value="item.index"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="单号" prop="name" label-width="140px">
						<el-input v-model="form.name"  placeholder="单行输入"></el-input>
					</el-form-item>
					<el-button class="search-bottom" type="primary" @click="search">查询</el-button>
				</el-form>
			</div>
		</el-card> 
</template>

<script>
import { enumSaleStatus } from "@/utils/enums"
export default {
	data(){
		return {
			orderStatus: enumSaleStatus,
			status: 0,
			form: {},
			// 供应商
			planState: [],
			searchList: [
				{id:2,name:'全部'},
				{id:3,name:'今日'},
				{id:4,name:'昨日'},
				{id:5,name:'一周内'},
				{id:6,name:'一个月内'},
			],
			// id: this.$route.params.order,
		}
	},
	// created() {
	// 		console.log(this.id)
	// 		console.log(this.id.substr(1,4))
	// 	},
	methods: {
		search() {},
		// 新建销售订单
		goBuild(){
			this.$router.push({ path: '/purchase/newBuild',  query: {order: '1'} })
		},
	}
}
</script>

<style lang="scss" scoped>
	.purchase-order {
		.card-header {
			display: flex;
			align-items: flex-start;
			.sales-Order {
				font-size: 18px;
				font-family: PingFangSC;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				line-height: 18px;
				position: relative;
				text-indent: 10px;
				margin: 10px 60px 0 0;
			}
			.sales-Order::after {
				content: "";
				left: 0;
				top: 3px;
				position: absolute;
				width: 4px;
				height: 14px;
				background: rgba(51, 51, 51, 1);
				border-radius: 3px;
			}
			.build-botton {
				margin-left: 300px;
			}
		}
		.order-search {
			margin: 15px 0 40px 140px;
			display: flex;
			p {
				margin: 10px 16px 0 0;
			}
			.datepicker {
				margin-left: 16px;
			}
		}
		.order-date {
			display: flex;
			margin-left: 20px;
		}
		.box-card {
			margin-top: 20px;
		}
	}
	.el-card {
		min-width: 1475px;
	}
	.card-bottom {
	margin: 20px;
	.search-bottom {
		margin-left: 16px;
		width: 64px;
		height: 40px;
	}
}
</style>

