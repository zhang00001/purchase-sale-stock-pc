<template>
	<div class="table">
					<table border="1">
							<tr class="table">
			          <th></th>
			          <th @click="selectSize">S</th>
			          <th>M</th>
			          <th>L</th>
			          <th>XL</th>
			          <th>XXL</th>
								<th>XXXL</th>
			        </tr>
			        <tr>
			          <th>黑色</th>
			          <td>
								<el-input placeholder="输入" v-model="form.input1"></el-input>
								</td>
			          <td>
									{{ 11 }}
								</td>
			          <td>
									{{ 1 }}
								</td>
			          <td>
									{{ 2 }}
								</td>
			          <td>
									{{ 1 }}
									<td>
									{{ 10 }}	
								</td>
			        </tr>
			        <tr>
			          <th>红色</th>
			          <td>
									{{ 111 }}
								</td>
			          <td>
									{{ 11 }}
								</td>
			          <td>
									{{ 1 }}
								</td>
			          <td>
									{{ 2 }}
								</td>
			          <td>
									{{ 1 }}
									<td>
									{{ 10 }}	
								</td>
			        </tr>
						</table>
			</div>
</template>

<script>
export default {
	data() {
		return {
			form: {}
		}
	},
	methods: {
		// 表格选择尺寸
		selectSize() {
			this.isShow = !this.isShow
			console.log('ddd')
		},
	},
}
</script>

<style lang="scss" scoped>
table{
	border-collapse:collapse;
	border: 1px solid #E9E9E9;
}
table tr{
	border:1px solid black;
}  
table tr td{
	border:1px solid black;
}
table {
	width: 250px;
}
table tr th {
	width: 250px;
	height: 45px;
	color: #909399;
	font-size: 14px;
	cursor: pointer;
}

table tr td {
	width: 250px;
	height: 45px;
	color: #606266;
	font-size: 14px;
	text-align: center;
}
table tr td img{
	position: relative;
	left: 7px;
	top: 5px;
}
</style>