<template>
  <div class="app-container">
    <div class="box-inform">
      <el-form :inline="true" :model="form">
        <el-row>
          <el-form-item label="客户 :" prop="Supplier" label-width="78px">
            <el-select v-model="form.kid" placeholder="请选择" @change="changeCus">
              <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="操作人 :" prop="Supplier" label-width="145px">
            <el-select v-model="form.maker" placeholder="请选择">
              <el-option v-for="item in makers" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="账目类型 :" prop="Supplier" label-width="315px">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in allAcounta"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="结算账户 :" prop="Supplier" label-width="78px">
            <el-select v-model="form.set_account" placeholder="请选择">
              <el-option
                v-for="item in setAcounts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日期 :" prop="Supplier" label-width="145px">
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

          <el-form-item label="单号 :" label-width="120px" class="price">
            <el-input v-model="form.number" placeholder="请输入"></el-input>
          </el-form-item>
          <el-button type="primary" @click="getTabData(1)" class="search-btn">查询</el-button>
        </el-row>
      </el-form>
    </div>

    <div class="box-table">
      <div class="inform-bottom">
        <el-button type="primary" @click="receivable('customer')">收款</el-button>
        <el-button type="primary" @click="adjust('customer')" class="search-btn">初期调整</el-button>
        <el-button type="primary" class="search-btn">打印</el-button>
        <el-button type="primary" class="search-btn">邮件</el-button>
        <div class="number" v-if="form.kid">
          <p>客户 : {{cus.name}}</p>
          <p>日期 : {{form.start_time}}-{{form.end_time}}</p>
          <p>应收金额 : ￥{{totals}}</p>
          <p>实收金额 : ￥{{payment}}</p>
          <p>应收余额 : ￥{{balance}}</p>
        </div>
      </div>
      <el-table :data="tableData" border>
        <!-- <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="delet(scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
        <el-table-column prop="business_time" label="业务时间"></el-table-column>
        <el-table-column prop="business_number" label="单据编号"></el-table-column>
        <el-table-column prop="maker_name" label="操作人"></el-table-column>
        <el-table-column prop="account_type_name" label="账目类型"></el-table-column>
        <el-table-column prop="total" label="应付金额"></el-table-column>
        <el-table-column prop="payment" label="实收金额"></el-table-column>
        <el-table-column prop="balance" label="本单应收余额"></el-table-column>
        <el-table-column prop="des" label="备注"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <dialogReceivables ref="dialogReceivables"></dialogReceivables>
    <dialogAdjust ref="dialogAdjust"></dialogAdjust>
  </div>
</template>

<script>
import {
  userList,
  getAllMaker,
  getSetAcount,
  getAllAcount,
  customerReconciliation
} from "@/api/index";
import http from "@/utils/request";
import selectaDate from "@/components/select-date";
import dialogReceivables from "./dialog-receivables";
import dialogAdjust from "./dialog-adjust";
export default {
  components: {
    selectaDate,
    dialogReceivables,
    dialogAdjust
  },
  data() {
    return {
      form: {
        number: "",
        end_time: "",
        start_time: "",
        set_account: "",
        maker: "",
        kid: "",
        type: ""
      },
      cus: "",
      setAcounts: [],
      allAcounta: [],
      users: [],
      makers: [],
      SupplierList: [],
      tableData: [],
      total: 0,
      totals: 0,
      payment: 0,
      balance: 0
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getSelectDate();
  },
  methods: {
    handleCurrentChange(e) {
      this.getTabData(e);
    },
    changeCus() {
      this.cus = this.users.find(val => val.id == this.form.kid);
    },
    getTabData(page) {
      if (this.form.kid == "") {
        this.$message.error("请选择要查询的客户");
      } else {
        customerReconciliation({ page: page, size: 10, ...this.form }).then(
          res => {
            this.tableData = res.data.data;
            this.total = res.data.total;
            // this.totals = res.list.totals;
            // this.payment = res.list.payment;
            // this.balance = res.list.balance;
            // this.tableData.forEach((val, index) => {
            //   val.money = eval(
            //     res.list.data
            //       .map(val => val.total_balance)
            //       .splice(0, index + 1)
            //       .join("+")
            //   ).toFixed(2);
            // });
          }
        );
      }
    },
    getSelectDate() {
      getSetAcount(1, 100000).then(res => {
        this.setAcounts = res.data;
      });
      getAllAcount(1, 100000).then(res => {
        this.allAcounta = res.data;
      });
      userList(1, 100000).then(res => {
        this.users = res.data.data;
      });
      getAllMaker().then(res => {
        this.makers = res.data;
      });
    },
    // 收款
    receivable(pageType) {
      console.log(pageType);
      this.$refs.dialogReceivables.init(pageType);
    },

    // 初期调整
    adjust(pageType) {
      this.$refs.dialogAdjust.init(pageType);
    },

    // 查看
    look() {
      this.$router.push({ path: "/sale/order_add", query: { type: "look" } });
    },

    // 删除
    delet() {}
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .box-inform {
    span {
      margin: 0 10px;
    }
  }
  .inform-bottom {
    display: flex;
    margin-bottom: 30px;
    .checkbox {
      margin: 10px 30px 0 0;
    }
    .number {
      display: flex;
      padding-top: 10px;
      margin-left: 30px;
      p {
        margin-right: 60px;
        font-size: 16px;
        color: rgba(85, 161, 255, 1);
        font-weight: 600;
      }
    }
  }
}
</style>
