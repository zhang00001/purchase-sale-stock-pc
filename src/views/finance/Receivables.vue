<template>
  <div class="purchase-order">
    <el-card>
      <div class="card-bottom">
        <el-form class="search-form-input" ref="form" :model="form" label-width="auto">
          <el-row class="row">
            <el-form-item label="日期 :">
              <el-date-picker
                v-model="form.start_time"
                type="date"
                placeholder="开始日期"
                value-format="yyyy-MM-dd"
                class="datepicker"
              ></el-date-picker>
              <el-date-picker
                v-model="form.end_time"
                type="date"
                placeholder="结束日期"
                value-format="yyyy-MM-dd"
                class="datepicker"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="交易状态">
              <el-select v-model="form.Supplier" placeholder="请选择">
                <el-option
                  v-for="item in planState"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易类型">
              <el-select v-model="form.type1" placeholder="请选择">
                <el-option
                  v-for="item in planState2"
                  :key="item.index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付类型">
              <el-select v-model="form.set_account" placeholder="请选择">
                <el-option
                  v-for="item in setAcounts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <el-row class="row">
            <el-form-item label="单号">
              <el-input v-model="form.number" placeholder="单行输入"></el-input>
            </el-form-item>
            <el-form-item label="操作人">
              <el-select v-model="form.maker" placeholder="请选择">
                <el-option
                  v-for="item in makers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作人所属门店">
              <el-select v-model="form.makerStore" placeholder="请选择">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in stores"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-button class="search-bottom" type="primary" @click="getTabData(1)">查询</el-button>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <!-- <el-table-column prop="date" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>-->
        <el-table-column prop="create_time" label="交易时间" align="center"></el-table-column>
        <el-table-column prop="number" label="交易单号" align="center"></el-table-column>
        <el-table-column prop="account_type_name" label="交易类型" align="center"></el-table-column>

        <el-table-column prop="relation_number" label="单据编号" align="center"></el-table-column>
        <el-table-column prop="type1" label="支付类型" align="center"></el-table-column>
        <el-table-column prop="number" label="交易金额" align="center"></el-table-column>

        <el-table-column prop="number" label="操作人" align="center"></el-table-column>
        <el-table-column prop="number" label="操作人所属门店" align="center"></el-table-column>

        <el-table-column prop="number" label="交易状态" align="center"></el-table-column>
        <el-table-column prop="number" label="退款状态" align="center"></el-table-column>

        <!-- <el-table-column prop="type1" label="业务类型" align="center"></el-table-column>
      
        <el-table-column prop="maker" label="操作人" align="center"></el-table-column>
        <el-table-column prop="set_account" label="结算账户" align="center"></el-table-column>
        <el-table-column prop="type" label="账目类型" align="center"></el-table-column>
        <el-table-column prop="total" label="应付金额" align="center"></el-table-column>
        <el-table-column prop="payment" label="实付金额" align="center"></el-table-column>
        <el-table-column prop="balance" label="本单应付余额" align="center"></el-table-column>
        <el-table-column prop="money" label="累计应收款余额" align="center"></el-table-column>
        <el-table-column prop="des" label="备注" align="center"></el-table-column>-->
      </el-table>
      <el-pagination
        background
        style="margin-top:20px; text-align: right;"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { collectionFlow, getAllMaker, getSetAcount } from "@/api/index";
import { storeList } from "@/api/api";
import { enumHistorys1 } from "@/utils/enums";
export default {
  data() {
    return {
      orderStatus: enumHistorys1,
      Salesperson: "",
      region: "",
      form: {},
      stores: [],
      setAcounts: [],
      total: 0,
      // 交易状态
      planState: [
        { id: "", name: "全部" },
        { id: 1, name: "支付成功" },
        { id: 2, name: "待支付" },
        { id: 3, name: "关闭" },
        { id: 4, name: "退款" }
      ],
      // 交易类型
      planState2: [
        { id: "", name: "全部" },
        { id: 1, name: "销售单" },
        { id: 2, name: "快速收款" },
        { id: 3, name: "客户对账单收款" },
        { id: 4, name: "二维码收款" },
        { id: 5, name: "零售单" },
        { id: 6, name: "微商城" }
      ],
      // 当前选中状态
      status: 0,
      // 新增路由跳转参数
      // 表格数据
      tableData: [],
      makers: [],
      searchList: [
        { id: "", name: "全部" },
        { id: 3, name: "今日" },
        { id: 4, name: "昨日" },
        { id: 5, name: "一周内" },
        { id: 6, name: "一个月内" }
      ]
    };
  },
  created() {
    this.getTabData(1);
    this.getSelectData();
  },
  methods: {
    handleClick(e) {},
    handleCurrentChange(e) {
      this.getTabData(e);
    },
    getTabData(page) {
      collectionFlow({ page: page, size: 10, ...this.form }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;

        // this.tableData.forEach((val, index) => {
        //   val.balance = (val.total - val.payment).toFixed(2);
        //   val.money = eval(
        //     res.data.data
        //       .map(val => (val.total - val.payment).toFixed(2))
        //       .splice(0, index + 1)
        //       .join("+")
        //   ).toFixed(2);
        // });
      });
    },
    getSelectData() {
      getSetAcount(1, 100000).then(res => {
        this.setAcounts = res.data;
      });
      getAllMaker().then(res => {
        this.makers = res.data;
      });
      storeList({ page: 1, size: 100000 }).then(res => {
        this.stores = res.data;
      });
    },
    search() {},
    // table切换
    handleClick(tab, event) {
      console.log(tab, event);
      this.$router.push({ path: "/purchase/newBuild", query: { order: "1" } });
    }
  }
};
</script>

<style lang="scss" scoped>
.purchase-order {
  // min-width: 1615px;
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
  }
  .order-search {
    margin: 15px 0 40px 125px;
    display: flex;
    p {
      margin: 10px 16px 0 0;
    }
    .datepicker {
      margin-left: 16px;
    }
  }
  .search-form-input {
    .el-select {
      width: 190px;
    }
    .el-input {
      width: 190px;
    }
    .row {
      display: flex;
    }
  }
  .box-card {
    margin-top: 20px;
  }
}
.el-card {
  min-width: 1475px;
}
.search-bottom {
  margin-left: 16px;
  width: 64px;
  height: 40px;
}
</style>