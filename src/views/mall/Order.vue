<template>
  <div class="purchase-order">
    <div class="box-inform">
      <div class="card-header">
        <h5 class="sales-Order">采购订单</h5>
        <el-radio-group v-model="headerStatus" size="medium">
          <el-radio-button v-for="item in orderStatus" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
        </el-radio-group>
      </div>

      <div class="date-time">
        <selectDdate @refresh="init"></selectDdate>
      </div>

      <div class="card-bottom">
        <el-form class="search-form" :model="form">
          <el-form-item label="会员 :" prop="member" label-width="62px">
            <el-input v-model="form.member" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="单号 :" prop="order_num" label-width="118px">
            <el-input v-model="form.order_num" placeholder="请输入"></el-input>
          </el-form-item>
          <el-button class="search-bottom" type="primary" @click="search">查询</el-button>
        </el-form>
      </div>
    </div>

    <div class="box-table">
      <el-table  ref="multipleTable" 
				:data="tableData"
				border
				@selection-change="handleSelectionChange">
				<el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="look(scope.row.status2, scope.row.id, scope.row.sale_id)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
				<el-table-column  prop="status_name" label="状态" align="center"></el-table-column>
				<el-table-column prop="create_date" label="时间" align="center"></el-table-column>
				<el-table-column prop="shop_name" label="会员" align="center"></el-table-column>
				<el-table-column prop="shop_phone" label="手机" align="center"></el-table-column>
				<el-table-column prop="money" label="已收款" align="center"></el-table-column>
				<el-table-column prop="delivery_name" label="配送方式" align="center" ></el-table-column>
				<el-table-column prop="payment_name" label="付款方式" align="center"></el-table-column>
				<el-table-column prop="member_status_name" label="关联状态" align="center"></el-table-column>
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
import { enumDingdan } from "@/utils/enums"
import selectDdate from "@/components/select-date"
import {
  supplierSelectList,
  warehouseSelectList,
	orderList
} from "@/api/api"
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
      orderStatus: enumDingdan,
      form: {},
      // 当前选中状态
			headerStatus: '',
			listQuery: {
				size: 10,
				page: 1,
			},
			total: 0,
      tableData: [],
			firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
    }
	},
	
  created() {
    this.init()
  },

  methods: {
    init(start_time, end_time) {
      orderList({
        params: {
					...this.form,
					...this.listQuery,
					start_time: start_time,
					end_time: end_time
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        } else {
          this.$message.error(res.message)
        }
      })
		},

    // 点击查询
    search() {
      this.init()
    },

    // 查看
    look(status, id, sale_id) {
      this.$router.push({
        path: "/purchase/newBuild",
        query: { status: status, id: id, sale_id: sale_id }
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