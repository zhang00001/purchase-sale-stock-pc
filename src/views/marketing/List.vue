<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <div style="margin:0 60px 0 20px;">
              <div class="center">
                <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="日期：" prop="start_time">
                    <el-date-picker v-model="form.start_time" type="date" placeholder="选择日期"></el-date-picker>

                    <span>-</span>
                    <el-date-picker v-model="form.end_time" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="单号：" prop="order_num">
                    <el-input class="searchInput" v-model="form.order_num"></el-input>
                  </el-form-item>
                  <el-form-item label="客户分类：" prop="user_cate_id">
                    <el-select v-model="form.user_cate_id" clearable>
                      <el-option
                        :label="item.name"
                        :value="item.id"
                        v-for="item in cates"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="分销状态：" prop="user_cate_id">
                    <el-select v-model="form.status" clearable>
                      <el-option label="全部" value="0"></el-option>
                      <el-option label="未完成" value="1"></el-option>
                      <el-option label="已取消" value="2"></el-option>
                      <el-option label="佣金未转账" value="1"></el-option>
                      <el-option label="佣金已转账" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="分销客户：" prop="user_cate_id">
                    <el-input v-model="form.name_mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="确认转账：" prop="user_cate_id">
                    <el-select v-model="form.earn_status" clearable>
                      <el-option label="全部" value="0"></el-option>
                      <el-option label="卖家确认" value="1"></el-option>
                      <el-option label="客户确认" value="2"></el-option>
                      <el-option label="都未确认" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="getTableData(1)">查询</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="number">
                <p>未完成（单）：{{baseData.undone_num}}</p>
                <p>已取消（单）：{{baseData.cancel_num}}</p>
                <p>佣金未转账（单）：{{baseData.untransfer_num}}</p>
                <p>佣金已转账（单）：{{baseData.transfered_num}}</p>
              </div>
              <div class="number">
                <p>订单金额总计（￥）：{{baseData.total_order_money}}</p>
                <p>佣金总计（￥）：{{baseData.total_retail}}</p>
                <p>未到账佣金总计（￥）：{{baseData.undo_total_retail}}</p>
                <p></p>
              </div>
            </div>
          </div>

          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">打印</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed prop="status_name" label="分销状态"></el-table-column>
            <el-table-column prop="cate_name" label="客户"></el-table-column>
            <el-table-column prop="order_num" label="单号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="nickname" label="微信"></el-table-column>
            <el-table-column prop="ctime_date" label="下单时间"></el-table-column>
            <el-table-column prop="shop_num" label="适用商品数量"></el-table-column>
            <el-table-column prop="order_money" label="适用商品的支付金额（元）"></el-table-column>
            <el-table-column prop="retail_user1_name" label="一级分销客户"></el-table-column>
            <el-table-column prop="retail_rate1" label="佣金收益率"></el-table-column>
            <el-table-column prop="retail_earn1" label="佣金"></el-table-column>
            <el-table-column prop="retail_time1_date" label="转账时间"></el-table-column>
            <el-table-column prop="retail_user2_name" label="二级分销客户"></el-table-column>
            <el-table-column prop="retail_rate2" label="佣金收益率"></el-table-column>
            <el-table-column prop="retail_earn2" label="佣金"></el-table-column>
            <el-table-column prop="retail_time2_date" label="转账时间"></el-table-column>
            <el-table-column prop="total_retail" label="总佣金"></el-table-column>
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
import {
  CategoryList,
  BrandList,
  Analys,
  retailList,
  retailTotal
} from "@/api/index";
import http from "@/utils/request";
import selectaDate from "@/components/select-date";
export default {
  components: {
    selectaDate
  },
  data() {
    return {
      status: "0",
      value1: "",
      region: "",
      cates: [],
      brands: [],
      brand: "",
      category: "",
      name: "",
      dialogVisible: false,
      total: 0,
      tableData: [],
      selectData: "",
      form: {
        start_time: "",

        end_time: "",
        order_num: "",

        user_cate_id: "",
        status: "",

        name_mobile: "",

        earn_status: ""
      },
      baseData: {
        cancel_num: "",
        total_order_money: "",
        total_retail: "",
        transfered_num: "",
        undo_total_retail: "",
        undone_num: "",
        untransfer_num: ""
      }
    };
  },
  filters: {},
  mounted() {
    this.getTableData(1);
  },
  created() {
    this.getSelectDate();
    this.getTotal();
  },
  methods: {
    async getTotal() {
      let res = await retailTotal();
      this.baseData = res.data;
    },
    handleCurrentChange(e) {
      this.getTableData(e);
    },
    async getTableData(page) {
      let res = await retailList({ ...this.form, page: page, size: 10 });
      if (res) {
        this.tableData = res.data.data;
        this.total = res.data.total;
      }
    },
    getSelectDate() {
      // 分类
      CategoryList({ page: 1, size: 100000 }).then(res => {
        this.cates = res.data.data;
      });
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .date {
  display: flex;
  align-items: center;
}
.number {
  display: flex;
  margin-top: 34px;
  p {
    margin-right: 138px;
    font-size: 16px;
    color: rgba(85, 161, 255, 1);
    font-weight: 600;
  }
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
