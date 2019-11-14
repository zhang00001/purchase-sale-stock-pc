<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <div style="margin:0 60px 0 20px;">
              <el-button type="primary" @click="receivable('收入')">收入</el-button>
              <el-button type="primary" @click="receivable('支出')">支出</el-button>
              <el-button type="primary" @click="receivable('账户互转')">账户互转</el-button>
              <el-button type="primary" @click="receivable('初期调整')">初期调整</el-button>
              <el-button type="primary" @click="dialogVisible = true">打印</el-button>
              <el-button type="primary" @click="search">查询</el-button>
              <div style="margin-top:20px;">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="日期">
                    <el-date-picker
                      v-model="ruleForm.start_time"
                      type="date"
                      placeholder="开始日期"
                      value-format="yyyy-MM-dd"
                      class="datepicker"
                    ></el-date-picker>
                    <el-date-picker
                      v-model="ruleForm.end_time"
                      type="date"
                      placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                      class="datepicker"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="账目类型" prop="account_type">
                    <el-select v-model="ruleForm.account_type" placeholder="请选择">
                      <el-option
                        v-for="item in allAcounta"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="结算账户" prop="set_account">
                    <el-select v-model="ruleForm.set_account" placeholder="请选择">
                      <el-option
                        v-for="item in setAcounts"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="单号" prop="number">
                    <el-input v-model="ruleForm.number"></el-input>
                  </el-form-item>
                  <el-form-item label="操作人" prop="maker">
                    <el-select v-model="ruleForm.maker" placeholder="请选择">
                      <el-option
                        v-for="item in makers"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属门店" prop="account_store">
                    <el-select v-model="ruleForm.account_store" placeholder="请选择">
                      <el-option
                        :label="item.name"
                        :value="item.id"
                        v-for="item in stores"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="交易类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择">
                      <el-option
                        v-for="item in planState2"
                        :key="item.index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="结算方式" prop="payment_mode">
                    <el-select v-model="ruleForm.payment_mode" placeholder="请选择">
                      <el-option
                        v-for="item in planState3"
                        :key="item.index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="备注" prop="des">
                    <el-input v-model="ruleForm.des"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="number">
                <p>收入：100</p>
                <p>支出：100</p>
                <p>盈利：¥100000</p>
              </div>
            </div>
          </div>

          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%">
            <!-- <                                              -->
            <el-table-column prop="business_time" label="时间" align="center"></el-table-column>
            <el-table-column prop="business_number" label="单据编号" align="center"></el-table-column>
            <el-table-column prop="account_type_name" label="账目类型" align="center"></el-table-column>
            <el-table-column prop="set_account.name" label="结算账户" align="center"></el-table-column>
            <el-table-column prop="business_type" label="交易类型" align="center"></el-table-column>
            <el-table-column prop="payment_mode" label="结算方式" align="center"></el-table-column>

            <el-table-column prop="customer_name" label="交易方" align="center"></el-table-column>

            <el-table-column prop="maker" label="操作人" align="center"></el-table-column>
            <el-table-column prop="in_amount" label="收入" align="center"></el-table-column>
            <el-table-column prop="out_amount" label="支出" align="center"></el-table-column>

            <el-table-column prop="surplus" label="盈余" align="center"></el-table-column>
            <el-table-column prop="set_account.money" label="账户余额" align="center"></el-table-column>
            <el-table-column prop="des" label="备注" align="center"></el-table-column>
          </el-table>
          <el-pagination
            background
            style="margin-top:20px; text-align: right;"
            layout="total,prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <dialogAccount ref="dialogAccount"></dialogAccount>
  </div>
</template>

<script>
import {
  setAccountFlow,
  getAllMaker,
  getAllAcount,
  getSetAcount,
  storeList
} from "@/api/index";
import http from "@/utils/request";
import selectaDate from "@/components/select-date";
import GoodList from "@/components/GoodList";
import dialogAccount from "./dialog-account";
export default {
  components: {
    selectaDate,
    GoodList,
    dialogAccount
  },
  data() {
    return {
      planState2: [
        { id: "", name: "全部" },
        { id: 1, name: "销售单" },
        { id: 2, name: "快速收款" },
        { id: 3, name: "客户对账单收款" },
        { id: 4, name: "二维码收款" },
        { id: 5, name: "零售单" },
        { id: 6, name: "微商城" }
      ],
      planState3: [
        { id: "", name: "全部" },
        { id: 1, name: "扫码收款" },
        { id: 2, name: "现金收款" }
      ],
      status: "0",
      value1: "",
      region: "",
      total: 0,
      dialogVisible: false,
      page: 1,
      stores: [],
      makers: [],
      tableData: [],
      selectData: "",
      ruleForm: {},
      allAcounta: [],
      setAcounts: [],
      time: "",
      ruleForm: {}
    };
  },
  filters: {},
  created() {
    this.getTabData(this.page);
    this.getSelectData();
  },
  methods: {
    search() {
      this.getTabData(this.page);
    },

    handleCurrentChange(e) {
      this.page = e;
      this.getTabData(e);
    },

    getTabData(page) {
      setAccountFlow({ page: page, size: 10, ...this.ruleForm }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    getSelectData() {
      storeList({ page: 1, size: 100000 }).then(res => {
        this.stores = res.data.data;
      });
      getAllMaker().then(res => {
        this.makers = res.data;
      });
      getSetAcount(1, 100000).then(res => {
        this.setAcounts = res.data;
      });
      getAllAcount(1, 100000).then(res => {
        this.allAcounta = res.data;
      });
    },
    // 收款
    receivable(pageType) {
      console.log(pageType);
      this.$refs.dialogAccount.init(pageType);
    },

    // 初期调整
    adjust(pageType) {
      this.$refs.dialogAdjust.init(pageType);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.number {
  display: flex;

  p {
    margin-right: 138px;
    font-size: 16px;
    color: rgba(85, 161, 255, 1);
    font-weight: 600;
  }
}
.tip {
  margin-top: 20px;
  font-size: 14px;

  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.demo-ruleForm {
  display: flex;
  flex-wrap: wrap;
}
.demo-ruleForm /deep/ .el-input {
  width: 190px;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: rgba(225, 238, 255, 1);
  color: #55a1ff;
  box-shadow: none;
}
/deep/ .el-radio-button--medium .el-radio-button__inner {
  background: rgba(243, 243, 243, 1);
}
.searchInput {
  width: 190px;
}

.top {
  display: flex;
  align-items: flex-start;
}
.label {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  position: relative;
  text-indent: 10px;
}
.center {
  margin: 20px;
}
.label::after {
  content: "";
  left: 0;
  top: 3px;
  position: absolute;
  width: 4px;
  height: 14px;
  background: rgba(51, 51, 51, 1);
  border-radius: 3px;
}
</style>
