<template>
  <div class="purchase-order">
    <div class="box-inform">
      <div class="card-header">
        <h5 class="sales-Order">采购退货订单</h5>
        <el-radio-group v-model="headerStatus" size="medium">
          <el-radio-button v-for="item in orderStatus" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
        </el-radio-group>
        <el-button class="build-botton" type="primary" @click="goBuild">新建采购退货单</el-button>
      </div>

      <div class="date-time">
        <selectDdate @refresh="init"></selectDdate>
      </div>

      <div class="card-bottom">
        <el-form class="search-form" :model="form">
          <el-form-item label="供应商 :" prop="supplier" label-width="62px">
            <el-select v-model="form.supplier" placeholder="请选择">
              <el-option
                v-for="item in supplierList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="单号 :" prop="number" label-width="118px">
            <el-input v-model="form.number" placeholder="请输入"></el-input>
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
            <el-button @click="print(scope.row)" type="text" size="small">打印</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status1" label="状态" align="center"></el-table-column>
        <el-table-column prop="number" label="采购退货订单编号" align="center"></el-table-column>
        <el-table-column prop="create_time" label="日期" align="center"></el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center"></el-table-column>
        <el-table-column prop="warehouse" label="仓库" align="center"></el-table-column>
        <el-table-column prop="uid" label="制单人" align="center"></el-table-column>
        <el-table-column prop="set_account" label="结算账户" align="center"></el-table-column>
        <el-table-column prop="payment" label="实收金额" align="center"></el-table-column>
        <el-table-column prop="des" label="备注" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { enumReturnOrder } from "@/utils/enums";
import selectDdate from "@/components/select-date";
import {
  supplierSelectList,
  warehouseSelectList,
  retreatList
} from "@/api/api.js";
export default {
  components: {
    selectDdate
  },

  // 监听表头搜索状态
  watch: {
    headerStatus(newVal) {
      this.form.status = newVal;
      this.init();
    }
  },

  data() {
    return {
      orderStatus: enumReturnOrder,
      supplierList: [], // 供应商列表
      warehouseList: [], // 仓库列表
      form: {
        start_time: "",
        end_time: ""
      },
      // 当前选中状态
      headerStatus: "",
      listQuery: {
        size: 10,
        page: 1
      },
      total: 0,
      tableData: [],
      firstArr: [{ id: null, name: "全部" }] // 下拉列表全部
    };
  },

  created() {
    this.init();
    this.getSelectValue();
  },

  methods: {
    print(row) {
      this.$common.printPdf("purchase_retreat", row.id);
    },
    init(start_time, end_time) {
      retreatList({
        params: {
          ...this.form,
          ...this.listQuery,
          start_time: start_time,
          end_time: end_time
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.list.data;
          this.total = res.list.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 查询供应商下拉列表
    getSelectValue() {
      supplierSelectList().then(res => {
        if (res.code === 200) {
          this.supplierList = this.firstArr.concat(res.data);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 点击查询
    search() {
      this.init();
    },

    // 新建销售订单
    goBuild() {
      this.$router.push({ path: "/purchase/newBuild", query: { order: "2" } });
    },

    // 查看
    look(status, id) {
      this.$router.push({
        path: "/purchase/newBuild",
        query: { status: status, id: id, type: "1" }
      });
    },

    // 点击序号
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.init();
    },

    handleSelectionChange() {}
  }
};
</script>

<style lang="scss" scoped>
/deep/.order-date {
  margin-left: 179px !important;
}
/deep/.date-time {
  .date {
    margin: 25px 0 30px 175px;
    .time-tit {
      line-height: 33px !important;
    }
  }
}
</style>