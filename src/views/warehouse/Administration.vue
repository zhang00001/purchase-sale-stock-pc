<template>
  <div class="app-container">
		<div class="box-inform">
			<el-form :inline="true" :model="form">
				<el-form-item label="名称:">
					<el-input class="width200" v-model='form.name' placeholder="请输入"></el-input>
				</el-form-item>
					<el-button class="search-btn" type="primary" @click="search">查询</el-button>
					<el-button type="primary" @click="showdialog('add')" class="search-btn">新增仓库</el-button>
			</el-form>
		</div>
   
		<div class="box-table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column label="操作" width="150" align="center">
					<template slot-scope="scope">
						<el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
						<el-button slot="reference"  @click="showdialog('edit', scope.row.id)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="仓库名称" align="center"></el-table-column>
				<el-table-column prop="person" label="负责人" align="center"></el-table-column>
				<el-table-column prop="store" label="所属门店" align="center"></el-table-column>
				<el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="edit_time" label="更新时间" align="center"></el-table-column>
				<el-table-column prop="sort" label="排序" align="center"></el-table-column>
				<el-table-column prop="status" label="状态" align="center">
					<template slot-scope="scope">
						<span
							:class="{
							'm-primary': scope.row.status=='2',
							'm-warning ': scope.row.status=='1'}"
						>
							{{ scope.row.status == '1'? '禁用' : '启用'}}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="des" label="备注" align="center"></el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
		</div>
       
		<!-- 新增仓库弹框 -->
		<dialogcreatestore ref="dialogcreatestore" @refresh="init"></dialogcreatestore>
  </div>
</template>

<script>
import { warehouseList, warehouseDel } from "@/api/api.js"
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
import dialogcreatestore from "./dialog-create-store"
export default {
	components: {
		dialogcreatestore
	},
  data() {
    return {
			dialogFormVisible:true,
      form: {},
      orderStatus: enumSaleStatus,
       listQuery: {
        page: 1,
        size: 10,
			},
			total: 0,
     tableData: [],
    };
  },
  created() {
		this.init()
	},
  methods: {
		init() {
			warehouseList({
				params: {
					...this.form,
					...this.listQuery,
				}
			}).then(res => {
				if(res.code == 200 ) {
					this.tableData = res.data.data
					this.total = res.data.total
				} else {
					this.$message.error(res.message)
				}
			})
		},
     handleDelete(id) {
			 this.$common.confirm(
				{
					title: "删除仓库",
					content: "该仓库将被删除，请谨慎操作"
				},
				() => {
				warehouseDel(id).then(res => {
					if(res.code == 200 ) {
						this.$message.success("仓库删除成功") 
					} else {
						this.$message.error(res.message)
					}
					this.init()
				})
			})
		},
		
		// 新增 编辑弹框
    showdialog(type, id){
      this.$refs.dialogcreatestore.init(type, id)
		},
		
    handleUse(){

    },
    //查询表格
    search(){
			this.init()
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
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
