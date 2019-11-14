<template>
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
			<el-form-item label="活动名称" prop="name" label-width="140px">
				<el-input v-model="form.name"  placeholder="单行输入"></el-input>
			</el-form-item>
			<el-button class="search-bottom" type="primary" @click="search">查询</el-button>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			Salesperson: '',
			region: '',
			form: {},
			// 供应商
			planState: [],
		}
	},
	methods: {
		search() {

		}
	}
}
</script>

<style lang="scss" scoped>
	.card-bottom {
		margin: 20px;
		.search-bottom {
			margin-left: 16px;
			width: 64px;
			height: 40px;
		}
}
</style>