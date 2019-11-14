<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <div style="margin:0 60px 0 20px;">
              <el-radio-group v-model="status" size="medium" @change="getTableDaTa(1)">
                <el-radio-button
                  v-for="item in puchStatus"
                  :label="item.id"
                  :key="item.id"
                >{{item.name}}</el-radio-button>
              </el-radio-group>
              <el-button type="primary" @click="dialogVisible = true">添加限时折扣</el-button>
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
                <el-button
                  v-if="status==1"
                  @click="handleClick(scope.row,1)"
                  type="text"
                  size="small"
                >编辑</el-button>
                <el-button v-if="status==1" @click="cel(scope.row)" type="text" size="small">撤销</el-button>

                <el-button
                  v-if="status!=1"
                  @click="handleClick(scope.row,2)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed prop="name" label="名称"></el-table-column>

            <el-table-column prop="start_time" label="开始时间"></el-table-column>
            <el-table-column prop="end_time" label="结束时间"></el-table-column>
            <el-table-column prop="maker" label="最后编辑人"></el-table-column>
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
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="clearForm">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name" v-if="type==0||type==1"></el-input>
          <span v-else>{{ruleForm.name}}</span>
        </el-form-item>

        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker
            class="datePiker"
            v-model="ruleForm.start_time"
            v-if="type==0||type==1"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
          <span v-else>{{ruleForm.start_time}}</span>
        </el-form-item>
        <el-form-item label="结束日期" prop="end_time">
          <el-date-picker
            class="datePiker"
            v-model="ruleForm.end_time"
            v-if="type==0||type==1"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            @change="changeEndTime"
            placeholder="选择日期时间"
          ></el-date-picker>
          <span v-else>{{ruleForm.end_time}}</span>
        </el-form-item>
      </el-form>
      <DiscountGood
        ref="discountgood"
        :goodTable="goodsTable"
        :type="type"
        :status="2"
        @selectGoodTable="selectGoodTable"
      ></DiscountGood>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="saveDiscount" v-if="type==0||type==1">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  discount,
  discountAdd,
  discountRevoke,
  discountInfo,
  discountEdit
} from "@/api/index";
import http from "@/utils/request";
import selectaDate from "@/components/select-date";

import DiscountGood from "@/components/Discount-good";

export default {
  components: {
    selectaDate,

    DiscountGood
  },
  data() {
    return {
      goodsTable: [],
      status: 2,
      value1: "",
      region: "",
      title: "新增限时折扣",
      puchStatus: [
        { id: 2, name: "进行中" },
        { id: 1, name: "未开始" },
        { id: 3, name: "已经结束" },
        { id: 4, name: "已撤销" }
      ],
      dialogVisible: false,
      dialogFormVisible2: false,
      tableData: [],
      tableData2: [],
      selectData: "",
      ruleForm: {
        name: "",
        end_time: "",
        start_time: ""
      },
      total: 0,

      type: "", //当前状态
      page: 1
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getTableDaTa(this.page);
  },
  methods: {
    handleCurrentChange(e) {
      this.page = e;
      this.getTableDaTa(this.page);
    },
    selectGoodTable(e) {
      this.goodsTable = e;
    },
    //撤销
    cel(e) {
      this.$confirm("是否撤销?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        discountRevoke(e.id).then(res => {
          if (res) {
            this.$message.success(res.msg);
            this.getTableDaTa(this.page);
          }
        });
      });
    },
    // 编辑回显 type:0新增  1编辑  2 详情
    async handleClick(e, type) {
      this.type = type;
      if (type == 1) {
        this.title = "编辑限时折扣";
      }
      if (type == 2) {
        this.title = "限时折扣详情";
      }
      let res = await discountInfo(e.id);
      if (res) {
        this.dialogVisible = true;
        this.ruleForm = {
          id: res.data.id,
          name: res.data.name,
          start_time: res.data.start_time,
          end_time: res.data.end_time
        };
        this.goodsTable = res.data.goods;
      }
    },
    // 详情回显

    // 结束时间选择后判断
    changeEndTime() {
      if (this.ruleForm.start_time && this.ruleForm.end_time) {
        if (
          new Date(this.ruleForm.end_time).getTime() <
          new Date(this.ruleForm.start_time).getTime()
        ) {
          this.$message.error("结束时间不能小于开始时间");
          this.ruleForm.end_time = "";
        }
      }
    },
    async saveDiscount() {
      let res;
      if (this.ruleForm.id) {
        res = await discountEdit(this.ruleForm.id, {
          ...this.ruleForm,
          goods: this.$refs.discountgood.goodTable
        });
      } else {
        res = await discountAdd({
          ...this.ruleForm,
          goods: this.$refs.discountgood.goodTable
        });
      }

      if (res) {
        this.dialogVisible = false;
        this.$message.success(res.msg);
        this.getTableDaTa(this.page);
        this.clearForm();
      }
    },
    clearForm() {
      (this.dialogVisible = false), (this.title = "新增");
      this.type = 0;
      this.goodsTable = [];

      Object.assign(this.$data.ruleForm, this.$options.data().ruleForm);
    },

    async getTableDaTa(page) {
      let res = await discount({ status: this.status, page: page, size: 10 });
      this.tableData = res.data.data;
      this.total = res.data.total;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-date-picker__editor-wrap .el-input {
  width: 100% !important;
}
.number {
  display: flex;
  margin-top: 34px;
  p {
    margin-right: 166px;
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
