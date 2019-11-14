<template>
  <div class="app-container">
		<div class="box-inform">
			<el-form :inline="true" :model="form">
				<el-form-item label="模糊搜索 :" label-width="76px">
					<el-input v-model='form.name_phone' placeholder="请输入客户手机、昵称"></el-input>
				</el-form-item>
				<el-form-item label="关联状态 :" prop="status" label-width="76px">
					<el-select v-model="form.status" placeholder="请选择" >
						<el-option
							v-for="item in relationList"
							:key="item.id" 
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
			</el-form>
		</div>

		<div class="box-table">
			<el-table :data="tableData" border>
				<el-table-column label="操作" align="center" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="disassociate(scope.row.id)">关联</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="shop_phone" label="微商城客户手机" align="center"></el-table-column>
				<el-table-column  prop="nick_name" label="微商城客户昵称" align="center"></el-table-column>
				<el-table-column prop="shop_name" label="微商城客户名称" align="center"></el-table-column>
				<el-table-column prop="status_name" label="关联状态" align="center"></el-table-column>
				<el-table-column prop="kh_phone" label="手机" align="center"></el-table-column>
				<el-table-column prop="kh_tel" label="电话" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="kh_email" label="邮箱" align="center"></el-table-column>
				<el-table-column prop="kh_address" label="地址" align="center"></el-table-column>
				<el-table-column prop="kh_status_name" label="状态" align="center">
					<template slot-scope="scope">
						<span
							:class="{
							'm-primary': scope.row.status=='0',
							'm-warning ': scope.row.status=='1'}"
						>
							{{ scope.row.status == '1'? '启用' : '禁用'}}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="kh_remark" label="备注" align="center"></el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
    </div>

		<el-dialog
			class="inform-dialog"
			title="账户信息"
			:visible.sync="dialogVisible"
			width="700px">

			<span class="dialog-tit">会员信息</span>
			<el-row>
				<el-col :span=8>
					<span>手机 :</span> 
					<span>{{ form.shop_phone }}</span>
				</el-col>

				<el-col :span=10>
					<span class="name">昵称 :</span>
					<span>{{ form.nick_name }}</span>
				</el-col>
			</el-row>

			<div class="dialog-tit-number">关联进销存客户信息</div>
			<el-form class="search-form" :model="form">
				<el-form-item label="关联至进销存客户 :" prop="Supplier">
					<el-select v-model="form.keeper_name" filterable placeholder="请输入会员、手机号"	@change="selsectRelation">
						<el-option
							v-for="item in clientList"
							:key="item.id" 
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-row>
				<el-col :span=8>
					<span>客户名称 :</span> <span>{{ form.shop_name }}</span>
				</el-col>
				<el-col :span=8>
					<span>客户类型 :</span> <span>{{ form.cate_name }}</span>
				</el-col>
				<el-col :span=8>
					<span>手机 :</span> <span>{{ form.kh_phone }}</span>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span=8>
					<span>电话 :</span> <span>{{ form.kh_tel }}</span>
				</el-col>

				<el-col :span=8>
					<span class="ml-45">邮箱 :</span> <span>{{ form.kh_email }}</span>
				</el-col>

				<el-col :span=8>
					<span class="ml-45">启用 :</span> <span>{{ form.kh_status_name }}</span>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span=24>
					<span>地址 :</span> <span>{{ form.kh_address }}</span>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span=24 class="remark">
					<span>备注 :</span> <span>{{ form.kh_remark }}</span>
				</el-col>
			</el-row>

			<div slot="footer" class="dialog-footer">
				<el-button @click="sure('form')" type="primary">保 存</el-button>
				<el-button class="sure-btn" @click="cancel">取消关联</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { memberList, clientList, memberInfo, memberRelation, memberMove } from "@/api/api"
import http from "@/utils/request"
export default {
  data() {
    return {
			form: {},
      BuhuoList: [],
			SupplierList: [],
			clientList: [],
      storehouseList: [],
			typeList: [],
			relationList: [
				{id: "2", name: "全部"},
				{id: "0", name: "未关联"},
				{id: "1", name: "已关联"}
			],
			listQuery: {
				size: 10,
				page: 1,
			},
			total: 0,
			tableData: [],
			dialogVisible: false
    };
  },

	created() {
		this.init()
	},
	
  methods: {
		init() {
			memberList({
				params: {
					...this.listQuery,
					...this.form
				}
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        } else {
          this.$message.error(res.message)
        }
			})
			
			clientList().then(res => {
				if(res.code === 200) {
					this.clientList = res.data.data
				} else {
					this.$message.error(res.message)
				}
			})
		},

		// 选择关联进销存客户
		selsectRelation(id) {
			this.selsectId = id
		},

		// 关联
		disassociate(id) {
			this.memberId = id
			this.dialogVisible = true
			memberInfo(id).then(res => {
				if (res.code === 200) {
					this.form = res.data
				} else {
					this.$message.error(res.message)
				}
			})
		},

		sure() {
			if(!this.selsectId) {
				this.$message.error("请选择关联客户")
			} else {
				this.$common.confirm(
				{
					title: "关联账户",
					content: "该账户将被关联，请谨慎操作"
				},
				() => {
					memberRelation({
						user_id: this.selsectId,
						member_id: this.memberId
					}).then(res => {
						if (res.code === 200) {
							this.$message.success("关联客户成功")
							this.dialogVisible = false
							this.memberId = ""
							this.init()
						} else {
							this.$message.error(res.message)
						}
					})
				})
			}
		},

		// 取消
		cancel() {
			this.$common.confirm(
				{
					title: "取消关联账户",
					content: "该账户将被取消关联，请谨慎操作"
				},
				() => {
					memberMove({
						id:	this.memberId
					}).then(res => {
						if (res.code === 200) {
							this.$message.success("取消关联成功")
							this.dialogVisible = false
							this.memberId = ""
							this.init()
						} else {
							this.$message.error(res.message)
						}
					})
				})
		},

    //查询表格
    search(){
			this.init()
    },
   
    handleCurrentChange() {
      this.listQuery.page = val
      this.init()
		}
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
			width: 130px;
		}
		span {
			color: #DCDFE6;
		}
	}
}
.el-dialog {
		.el-col {
		span {
			font-size: 14px;
			color: #999999;
			margin-bottom: 10px;;
		}
		.custor {
			margin-bottom: 10px;
		}
	}
.dialog-tit {
	font-size: 15px;
	color: #333333;
	font-weight: 600;
	line-height: 30px;
}
.dialog-tit-number {
	font-size: 15px;
	color: #333333;
	font-weight: 600;
	margin: 20px 0 15px 0;
}
span {
	line-height: 30px;
}
.remark {
	margin-bottom: 30px;
}
}
.search-form {
	.el-form-item {
		display: flex;
		margin-bottom: 15px;
	}
}

</style>
