<template>
  <div class="purchase-order">
    <div class="box-inform">
      <div class="card-header">
        <h5 class="sales-Order">配货订单</h5>
        <el-radio-group v-model="headerStatus" size="medium">
          <el-radio-button v-for="item in orderStatus" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
        </el-radio-group>
        <el-button class="build-botton" type="primary" @click="goBuild">新建配货单</el-button>
      </div>

      <div class="date-time">
        <selectDdate @refresh="init"></selectDdate>
      </div>

      <div class="card-bottom">
				<el-form class="search-form" ref="form" :model="form">
					<el-form-item label="仓管员 :" prop="keeper" label-width="62px">
						<el-select v-model="form.keeper" placeholder="请选择">
							<el-option
								v-for="item in storePersonList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="仓库 :" prop="warehouse" label-width="118px">
						<el-select v-model="form.warehouse" placeholder="请选择">
							<el-option
								v-for="item in warehouseList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="门店 :" prop="store" label-width="118px">
						<el-select v-model="form.store" placeholder="请选择">
							<el-option
								v-for="item in storeList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="单号 :" prop="number" label-width="118px">
						<el-input v-model="form.number"  placeholder="请输入"></el-input>
					</el-form-item>
					<el-button class="search-bottom" type="primary" @click="search">查询</el-button>
				</el-form>
			</div>
    </div>

    <div class="box-table">
      <el-table :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="look(scope.row.status2, scope.row.id)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">打印</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status1" label="状态" align="center"></el-table-column>
        <el-table-column prop="number" label="配货订单编号" align="center"></el-table-column>
        <el-table-column prop="create_time" label="日期" align="center"></el-table-column>
        <el-table-column prop="store" label="门店" align="center"></el-table-column>
        <el-table-column prop="warehouse" label="仓库" align="center"></el-table-column>
        <el-table-column prop="keeper" label="仓管员" align="center"></el-table-column>
        <el-table-column prop="mode" label="发货方式" align="center"></el-table-column>
        <el-table-column prop="des" label="备注" align="center"></el-table-column>
      </el-table>
      <el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
    </div>
  </div>
</template>

<script>
import { enumDistribution } from "@/utils/enums"
import selectDdate from "@/components/select-date"
import {
  supplierSelectList,
  warehouseSelectList,
	prepareList,
	KeeperList,
	storeList
} from "@/api/api.js"
export default {
  components: {
    selectDdate
	},

	// 监听表头搜索状态
	watch: {
		headerStatus(newVal) {
			this.form.status = newVal
			this.init()
		}
	},

  data() {
    return {
      orderStatus: enumDistribution,
			storePersonList: [], // 仓库员列表
			warehouseList: [], // 仓库列表
			storeList: [], // 门店列表
      Salesperson: "",
      region: "",
      form: {
				keeper: "",
				warehouse: "",
				store: "",
				number: "",
			},
			listQuery: {
				size: 10,
				page: 1,
			},
			total: 0,
      // 当前选中状态
      headerStatus: "",
      tableData: [],
			firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
    }
	},
	
  created() {
    this.init()
    this.getSelectValue()
  },

  methods: {
    init(start_time, end_time) {
      prepareList({
        params: {
					...this.form,
					...this.listQuery,
					start_time: start_time,
					end_time: end_time
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.list.data
          this.total = res.list.total
        } else {
          this.$message.error(res.message)
        }
      })
		},

    // 获取下拉值
    getSelectValue() {
      // 查询供应商下拉列表
      supplierSelectList().then(res => {
        if (res.code === 200) {
					this.supplierList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
      })

      // 查询仓库下拉列表
      warehouseSelectList().then(res => {
        if (res.code === 200) {
					this.warehouseList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
			})
			
			// 查询仓管员下拉列表  
      KeeperList().then(res => {
        if (res.code === 200) {
					this.storePersonList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
			})
			
			// 查询门店下拉列表  
      storeList().then(res => {
        if (res.code === 200) {
					this.storeList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
      })
    },

    // 点击查询
    search() {
      this.init()
    },

    // 新建销售订单
    goBuild() {
      this.$router.push({ path: "/purchase/newBuild", query: { order: "3", orderType: "add" } })
    },

    // 查看
    look(status, id) {
      this.$router.push({
        path: "/purchase/newBuild",
        query: { status: status, id: id }
      })
    },

    // 获取表格点击行
    handleSelectionChange(list) {
      // this.currentData = list
      // let arr = []
      // list.forEach(item => {
      //   arr.push(item.collectId)
      // })
      // this.chooseRowIds = arr.join(',') // 获取所选id集合
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
/deep/.date-time {
  .date {
    margin: 25px 0 30px 140px;
    .time-tit {
      line-height: 33px !important;
    }
  }
}
</style>