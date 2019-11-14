<template>
	<div class="purchase-order">
		<div class="order-search">
			<!-- <el-form class="order-date" ref="form" :model="form"> -->
				<p>单据日期 :</p>
					<el-button type="text" v-for="(item, index) in searchList" :key="index" @click="searchTerm(item.id)">
						{{item.name}}
					</el-button>	
			
				<!-- <el-form-item  prop="startDate" label-width="20px">  -->
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
				<!-- </el-form-item> -->
			<!-- </el-form> -->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {},
			radio1: '',
			endDate: '',
			startDate: '',
			searchList: [
					{id:2,name:'全部'},
					{id:3,name:'今日'},
					{id:4,name:'昨日'},
					{id:5,name:'一周内'},
					{id:6,name:'一个月内'},
			],
		}
	},
	methods: {
		// table切换
		handleClick(tab, event) {
			console.log(tab, event);
		},
		// 搜索单据日期
		searchTerm(id) {
			console.log(id)
		}
	}
}
</script>

<style lang="scss" scoped>
	.purchase-order {
		.order-search {
			margin: 15px 0 20px 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			p {
    margin-right: 16px;
  }
  .datepicker {
    margin-left: 16px;
  }
		}
		.order-date {
			display: flex;
			margin-left: 20px;
		}
	}
	</style>