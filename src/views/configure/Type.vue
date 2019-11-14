<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="center">
            <span>日期：</span>
            <el-date-picker v-model="start_time" type="date" placeholder="选择日期"></el-date-picker>——
            <el-date-picker v-model="end_time" type="date" placeholder="选择日期"></el-date-picker>

            <span style="margin-left:10px;">操作员姓名：</span>
            <el-select v-model="maker" placeholder="请选择">
              <el-option :label="item.name" :value="item.id" v-for="item in makers" :key="item.id"></el-option>
            </el-select>

            <el-button type="primary">查询</el-button>
          </div>
          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="create_time" label="日期" width="150px"></el-table-column>
            <el-table-column prop="id" label="操作人" width="100px"></el-table-column>
            <el-table-column prop="name" label="操作人姓名" width="150px"></el-table-column>
            <el-table-column prop="ip" label="IP" width="150px"></el-table-column>
            <el-table-column prop="equipment" label="设备"></el-table-column>
          </el-table>
          <el-pagination
            background
            style="margin-top:20px;"
            layout="total,prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { systemLogs, getAllMaker } from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
export default {
  data() {
    return {
      status: "0",
      value1: "",
      region: "",
      page: 1,
      start_time: "",
      end_time: "",
      orderStatus: enumSaleStatus,
      maker: "",
      tableData: [],
      makers: []
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getSelectData();
    this.getTableData(this.page);
  },
  methods: {
    handleCurrentChange(e) {
      this.page = e;
      this.getTableData(this.page);
    },
    getSelectData() {
      getAllMaker().then(res => {
        this.makers = res.data;
      });
    },
    async getTableData(page) {
      let res = await systemLogs({
        page: page,
        size: 10,
        maker: this.maker,
        start_time: this.start_time,
        end_time: this.end_time
      });
      this.tableData = res.data.data;
      this.total = res.data.total;
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
