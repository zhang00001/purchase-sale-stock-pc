<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="top-head">
        <el-card class="box-card">
          <div :span="24" style="float:right;margin-top:23px;">
           <el-button type="primary" @click="addSupplier" class="new-build">新增供应商</el-button>
          </div>
          <div class="center">
            <el-form :inline="true" :model="form">
              <el-form-item label="供应商 :" class="name">
                <el-input  v-model='form.name' placeholder="请输入供应商名称"></el-input>
              </el-form-item>
               <el-form-item label="负责人 :" label-width="105px">
                <el-input  v-model='form.contact' placeholder="请输入负责人姓名"></el-input>
              </el-form-item>
								<el-button type="primary" @click="search" class="search-botton">查询</el-button>
						</el-form>
          </div>
          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-table">
          <el-table
            :data="tableData"
            border>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="供应商名称"	align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="contact" label="负责人"	align="center"></el-table-column>
            <el-table-column prop="arrear" label="欠供应商款"	align="center"></el-table-column>
            <el-table-column label="状态" width="150" align="center">
              <template slot-scope="scope">
								<span
									:class="{
									'm-primary': scope.row.status=='0',
									'm-warning ': scope.row.status=='1'}"
								>
									{{ scope.row.status == '1'? '禁用' : '启用'}}
								</span>
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center"></el-table-column>
          </el-table>
          <el-pagination
						@current-change="handleCurrentChange"
						:current-page="listQuery.page"
            :page-size="listQuery.size"
						layout="total, prev, pager, next"
						:total="total">
					</el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {} from "@/api/index"
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
import { supplierList, supplierDel } from "@/api/api.js"
export default {
  data() {
    return {
      form: {},
      orderStatus: enumSaleStatus,
		  tableData: [],
			total: 0,
			listQuery: {
        page: 1,
        size: 10
      }
    }
  },
 
	created() {
		this.init()
	},
	
  methods: {
		init() {
			supplierList({
				params: { 
					...this.form,
					...this.listQuery
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

		// 新增供应商
		addSupplier() {
       this.$router.push({ path: "/purchase/AddSupplier" })
		},
		
		//查询表格
		search(){
			 this.init()
		},

    // 点击序号
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.init()
    },

		// 供应商列表删除
     handleDelete(id) {
			 this.$common.confirm(
        {
          title: "删除供应商列表",
          content: "该供应商列表将被删除，请谨慎操作"
        },
				() => {
					supplierDel(id).then(res => {
						if(res.code == 200 ) {
							this.$message.success("商品品牌删除成功") 
						} else {
							this.$message.error(res.message)
						}
						this.init()
					})
        }
      ) 
		}
  }
}
</script>

<style lang="scss" scoped>
.app-container {
	.center {
		margin-top: 20px;
	}
	.box-table {
		padding: 20px;
		
	}
}


</style>
