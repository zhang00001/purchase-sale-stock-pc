 
 

<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <h5 class="label">收银历史</h5>
            <div style="margin:0 60px 0 20px;">
              <el-radio-group v-model="status" size="medium" @change="getData(1)">
                <el-radio-button
                  v-for="item in enumHistorys"
                  :label="item.id"
                  :key="item.id"
                >{{item.name}}</el-radio-button>
              </el-radio-group>
              <div>
                <selectaDate ref="datePicker"></selectaDate>
              </div>
            </div>
          </div>
          <div class="center">
            <span>销售员：</span>
            <el-select v-model="sales" placeholder="请选择">
              <el-option
                :value="item.id"
                :label="item.name"
                v-for="item in Allsales"
                :key="item.id"
              >{{item.name}}</el-option>
            </el-select>

            <span>单号：</span>
            <el-input class="searchInput" v-model="number"></el-input>

            <el-button type="primary" @click="search">查询</el-button>
          </div>
          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="status1" label="状态">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                >{{scope.row.status1}}</el-button>
                <el-button @click="print(scope.row)" type="text" size="small">打印</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="零售订单编号"></el-table-column>
            <el-table-column prop="create_time" label="日期"></el-table-column>

            <el-table-column prop="warehouse_name" label="仓库"></el-table-column>
            <el-table-column prop="maker_name" label="制单人"></el-table-column>

            <el-table-column prop="payment" label="实付金额"></el-table-column>

            <el-table-column prop="payment" label="备注"></el-table-column>
          </el-table>
          <el-pagination
            background
            style="margin-top:20px;"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userList, collectList, getAllSales } from "@/api/index";
import http from "@/utils/request";

import { enumHistorys } from "@/utils/enums";
import selectaDate from "@/components/select-date";
export default {
  components: {
    selectaDate
  },
  data() {
    return {
      status: "", //当前状态
      sales: "", //销售员
      kid: "", //客户
      number: "", //单号
      value1: "",
      cus: [], //客户列表
      region: "",
      total: 0,
      Allsales: [],
      enumHistorys: enumHistorys,
      tableData: []
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getbaseSelect();
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    print(row) {
      this.$common.printPdf("sale_cash", row.id);
    },
    handleCurrentChange(e) {
      this.getData(e);
    },
    search() {
      this.getData(1);
    },
    getbaseSelect() {
      userList(1, 100000).then(res => {
        this.cus = res.data.data;
      });
      getAllSales().then(res => {
        this.Allsales = res.data;
      });
    },
    getData(page, start_time, end_time) {
      collectList({
        params: {
          page: page,
          size: 10,
          start_time: this.$refs.datePicker.start_time,
          end_time: this.$refs.datePicker.end_time,
          status: this.status,
          sales: this.sales,

          number: this.number
        }
      }).then(res => {
        this.tableData = res.list.data;
        this.total = res.list.total;
      });
    },

    handleClick(row) {
      this.$router.push({
        path: "/sale/historyDetail",
        query: { type: "detail", id: row.id }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
.date {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-right: 16px;
  }
  .datepicker {
    margin-left: 16px;
  }
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


