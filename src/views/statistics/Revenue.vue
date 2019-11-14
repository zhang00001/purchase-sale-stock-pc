<template>
  <div class="management-status">
    <el-card class="box-card">
      <div class="center">
        <span>日期：</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期" class="searchInput"></el-date-picker>

        <span>销售员：</span>
        <el-select clearable filterable v-model="sales" placeholder="请选择">
          <el-option :label="item.name" :value="item.id" v-for="item in Allsales" :key="item.id"></el-option>
        </el-select>

        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </el-card>

    <div class="box-card">
      <div class="box-card-header">
        <h5 class="sales-Order">销售信息</h5>
      </div>
      <div class="box-card-body">
        <el-card class="box-card">
          <el-row>
            <el-col :span="4">
              <div class="box">
                <div class="row">
                  <h6>{{coll.coll_total+return1.return_total+sale.sale_total?coll.coll_total+return1.return_total+sale.sale_total:0}}</h6>

                  <p class="sale">总开单数</p>
                </div>
              </div>
            </el-col>

            <el-col :span="5">
              <div class="box">
                <div class="row">
                  <h6>{{sale.sale_payment+coll.coll_payment?sale.sale_payment+coll.coll_payment:0}}</h6>

                  <p class="sale">销售金额</p>
                </div>
              </div>
            </el-col>

            <el-col :span="5">
              <div class="box">
                <div class="row">
                  <h6>{{sale.sale_num+coll.coll_num?sale.sale_num+coll.coll_num:0}}</h6>

                  <p class="sale">销售量</p>
                </div>
              </div>
            </el-col>

            <el-col :span="5">
              <div class="box">
                <div class="row">
                  <h6>{{return1.return_payment?return1.return_payment:0}}</h6>

                  <p class="sale">退货金额</p>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="box">
                <div class="row">
                  <h6>{{return1.return_num?return1.return_num:0}}</h6>

                  <p class="sale">退货量</p>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="tableDiv">
            <div class="row">
              <span>单据类型</span>
              <span>开单数</span>
              <span>销售量</span>
              <span>实收</span>
            </div>
            <div class="row">
              <span>零售店</span>
              <span>{{coll.coll_total?coll.coll_total:0}}</span>
              <span>{{coll.coll_num?coll.coll_num:0}}</span>
              <span>{{coll.coll_payment?coll.coll_payment:0}}</span>
            </div>
            <div class="row">
              <span>销售单</span>
              <span>{{sale.sale_total?sale.sale_total:0}}</span>
              <span>{{sale.sale_num?sale.sale_num:0}}</span>
              <span>{{sale.sale_payment?sale.sale_payment:0}}</span>
            </div>
          </div>
          <div class="tableDiv">
            <div class="row">
              <span>单据类型</span>
              <span>开单数</span>
              <span>退货量</span>
              <span>实退</span>
            </div>
            <div class="row">
              <span>退货单</span>
              <span>{{return1.return_total?return1.return_total:0}}</span>
              <span>{{return1.return_num?return1.return_num:0}}</span>
              <span>{{return1.return_payment?return1.return_payment:0}}</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="box-card">
        <div class="box-card-header">
          <h5 class="sales-Order">收款信息</h5>
        </div>
        <div class="box-card-body">
          <el-card class="box-card">
            <el-row>
              <el-col :span="6">
                <div class="box">
                  <div class="row">
                    <h6>{{weChat?weChat:0}}</h6>

                    <p class="sale">微信</p>
                  </div>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="box">
                  <div class="row">
                    <h6>{{ali?ali:0}}</h6>

                    <p class="sale">支付宝</p>
                  </div>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="box">
                  <div class="row">
                    <h6>{{pos?pos:0}}</h6>

                    <p class="sale">POS</p>
                  </div>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="box">
                  <div class="row">
                    <h6>{{xian?xian:0}}</h6>

                    <p class="sale">现金</p>
                  </div>
                </div>
              </el-col>
            </el-row>

            <el-table
              :data="set_account"
              border
              style="width: 100%"
              class="management-table"
              :header-cell-style="{background:'rgba(247,247,247,1)'}"
            >
              <el-table-column prop="account" label="账户" align="center"></el-table-column>
              <el-table-column prop="weChat" label="微信" align="center"></el-table-column>
              <el-table-column prop="ali" label="支付宝" align="center"></el-table-column>
              <el-table-column prop="pos" label="POS" align="center"></el-table-column>
              <el-table-column prop="xian" label="现金" align="center"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>

      <div class="box-card">
        <div class="box-card-header">
          <h5 class="sales-Order">欠款信息</h5>
        </div>
        <div class="box-card-body">
          <el-card class="box-card">
            <el-row>
              <el-col :span="6">
                <div class="box">
                  <div class="row">
                    <h6>{{totalCus?totalCus:0}}</h6>

                    <p class="sale">欠款客户数</p>
                  </div>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="box">
                  <div class="row">
                    <h6>{{arrearsNum?arrearsNum:0}}</h6>

                    <p class="sale">尚欠款</p>
                  </div>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="box">
                  <div class="row">
                    <h6>{{repaymentNum?repaymentNum:0}}</h6>

                    <p class="sale">已还款</p>
                  </div>
                </div>
              </el-col>
            </el-row>

            <el-table
              :data="payment"
              border
              style="width: 100%"
              class="management-table"
              :header-cell-style="{background:'rgba(247,247,247,1)'}"
            >
              <el-table-column prop="customer" label="客户" align="center"></el-table-column>
              <el-table-column prop="arrears" label="尚欠款" align="center"></el-table-column>

              <el-table-column prop="repayment" label="已还款" align="center"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Revenue, getAllSales } from "@/api/index";
import http from "@/utils/request";

export default {
  data() {
    return {
      searchList: [
        { id: 2, name: "日" },
        { id: 3, name: "周" },
        { id: 4, name: "月" },
        { id: 5, name: "年" }
      ],
      tableData: [],
      value1: "",
      page: 1,
      total: 0,
      sales: "",
      totalCus: 0,
      arrearsNum: 0,
      repaymentNum: 0,
      ali: "",
      pos: "",
      weChat: "",
      xian: "",
      start_time: "",
      end_time: "",
      Allsales: [],
      coll: {},
      return1: {},
      sale: {},
      payment: [],
      set_account: []
    };
  },
  created() {
    this.getBaseData();
    this.getTableData();
  },
  methods: {
    search() {
      this.getTableData();
    },
    getBaseData() {
      getAllSales().then(res => {
        this.Allsales = res.data;
      });
    },
    async getTableData() {
      this.start_time = this.value1
        ? Number(this.value1.setHours(0, 0, 0, 0) / 1000).toFixed(0)
        : "";
      this.end_time = this.value1
        ? Number(this.value1.setHours(24, 0, 0, 0) / 1000).toFixed(0)
        : "";
      let res = await Revenue({
        sales: this.sales,
        start_time: this.start_time,
        end_time: this.end_time
      });

      if (res) {
        this.ali = 0;
        this.pos = 0;
        this.weChat = 0;
        this.xian = 0;
        this.coll = 0;
        this.return1 = res.list.return;
        this.sale = res.list.sale;
        this.coll = res.list.coll;
        this.set_account = res.list.set_account;
        this.payment = res.list.payment;
        if (this.set_account && this.set_account.length > 0) {
          this.set_account.forEach(val => {
            this.ali += val.ali;
            this.pos += val.pos;
            this.weChat += val.weChat;
            this.xian += val.xian;
          });
        }
        if (this.payment && this.payment.length > 0) {
          this.totalCus = this.payment.length;
          this.set_account.forEach(val => {
            this.arrearsNum += val.arrears;
            this.repaymentNum += val.repayment;
          });
        }
      }
    },
    searchTerm(id) {
      console.log(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.tableDiv {
  border: 1px solid rgba(233, 233, 233, 1);
  border-bottom: none;
  border-right: none;
  margin-bottom: 30px;
  .row {
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    height: 53px;
    span {
      display: inline-block;
      width: 24.78%;

      line-height: 53px;
      text-align: center;
      font-size: 16px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      border-right: 1px solid rgba(233, 233, 233, 1);
    }
  }
  .row:first-child {
    background: rgba(247, 247, 247, 1);
  }
}
.management-status {
  .box-card {
    .box-card-header {
      display: flex;
      height: 50px;
      background-color: #55a1ff;
      padding: 5px 0;
      .sales-Order {
        font-size: 18px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgb(248, 236, 236);
        line-height: 18px;
        position: relative;
        text-indent: 10px;
        padding: 11px 70px 0 40px;
      }
      .sales-Order::after {
        content: "";
        left: 37px;
        top: 13px;
        position: absolute;
        width: 4px;
        height: 14px;
        background: #fff;
        border-radius: 3px;
      }
      .search-btn {
        background-color: #fff;
        margin-left: 615px;
        .el-button {
          width: 66px;
          height: 45px;
        }
      }
    }
    .box-card-body {
      .management-table {
        h5 {
          font-size: 17px;
          color: #909399;
        }
      }
    }
  }
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
.box {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 20px 20px 0 20px;
  margin-bottom: 43px;
  border-bottom: 1px solid #fff;
  .row {
    h6 {
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-bottom: 10px;
      text-align: center;
    }
    p {
      height: 20px;
      font-size: 14px;
      font-family: PingFang-SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
    .sale {
      color: #333333;
      font-size: 16px;
      margin-top: 20px;
    }
  }
}
.center {
  margin: 20px;
}
.searchInput {
  width: 190px;
}
</style>