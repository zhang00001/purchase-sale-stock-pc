






<template>
  <div class="app-container">
    <div class="box-table">
      <div class="top" style="display:flex">
        <h5 class="label">积分规则</h5>

        <el-button type="primary" style="margin-left:500px; " @click="addSupplier">新增积分规则</el-button>
      </div>

      <el-table :data="tableData" border>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            <el-button slot="reference" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="cid_name" label="适用客户" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.cid_name">{{scope.row.cid_name}}</template>
            <template v-else>全部</template>
          </template>
        </el-table-column>
        <el-table-column prop="product_num" label="适用商品数量" align="center"></el-table-column>
        <el-table-column prop="default" label="新增商品默认参与" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.default==0">启用</template>
            <template v-else>关闭</template>
          </template>
        </el-table-column>
        <el-table-column prop="gain" label="获取积分" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.gain==0">开启</template>
            <template v-else>关闭</template>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="积分抵现" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.cash==0">开启</template>
            <template v-else>关闭</template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout=" total,prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      :visible.sync="dialogFormVisible"
      title="积分规则"
      :close-on-click-modal="false"
      :before-close="celData"
    >
      <div class="box">
        <div class="row">
          <span class="lable" style="  margin-top:10px;">规则名称</span>
          <el-input v-model="form.name" class="inputName"></el-input>
        </div>

        <div class="row">
          <span class="lable">适用客户</span>
          <div class="group">
            <el-radio-group v-model="form.cid">
              <el-radio label="0">全部客户</el-radio>
              <el-radio :label="item.id" v-for="item in customers" :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>

            <br />
            <p class="tip">注：一个客户分类只能适用于一个积分规则</p>
          </div>
        </div>

        <div class="row">
          <span class="lable">适用商品</span>
          <div class="group">
            <span class="lable">适用规则的商品数量：{{this.selectGood?this.selectGood.length:0}}</span>
            <el-button type="text" @click="dialogFormVisible2=true">选择商品</el-button>
            <br />
            <div class="margin_top">
              <span class="lable">开启商品默认参与：</span>
              <el-radio-group v-model="form.default">
                <el-radio :label="0">开启</el-radio>
                <el-radio :label="1">关闭</el-radio>
              </el-radio-group>
            </div>
            <p class="tip" style="margin-top:10px;">开启后则新商品会默认参与该积分规则</p>
          </div>
        </div>
        <div class="row">
          <span class="lable">获取积分</span>
          <div class="group">
            <el-radio-group v-model="form.gain">
              <el-radio :label="0">开启</el-radio>
              <el-radio :label="1">关闭</el-radio>
            </el-radio-group>
            <br />
            <div class="margin_top">
              <span class="lable">客户每消费</span>
              <el-input v-model="form.gain_tj" class="inputCode"></el-input>
              <span class="lable">元，赠送</span>
              <el-input v-model="form.gain_jf" class="inputCode"></el-input>
              <span class="lable">点积分</span>
            </div>
          </div>
        </div>
        <div class="row">
          <span class="lable">积分抵现</span>
          <div class="group">
            <el-radio-group v-model="form.cash">
              <el-radio :label="0">开启</el-radio>
              <el-radio :label="1">关闭</el-radio>
            </el-radio-group>
            <br />
            <div class="margin_top">
              <span class="lable">每</span>
              <el-input v-model="form.cash_very" class="inputCode"></el-input>
              <span class="lable">积分，可抵现</span>
              <el-input v-model="form.cash_money" class="inputCode"></el-input>
              <span class="lable">元</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择商品" :visible.sync="dialogFormVisible2" :close-on-click-modal="false">
      <GoodList
        :Orderstatus="0"
        ref="goodTable"
        :good="selectGood"
        @closeModel="closeModel"
        @selectGoods="selectGoods"
      ></GoodList>
    </el-dialog>
  </div>
</template>

<script>
import {
  integral,
  logistics,
  integralAdd,
  integralInfo,
  integralEdit,
  integralDel,
  customerCategoryListUse
} from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";

import GoodList from "@/components/GoodList";
export default {
  components: {
    GoodList
  },

  data() {
    return {
      form1: {},
      phone: "",
      name: "",
      dialog: false,
      address: "",
      sends: [],
      dialogFormVisible: false,
      form: {
        name: "",
        cid: "",
        goods: "",
        default: "",
        gain: "",
        gain_tj: "",
        gain_jf: "",
        cash: "",
        cash_very: "",
        cash_money: ""
      },
      dialogFormVisible2: false,

      orderStatus: enumSaleStatus,
      pagination: {
        pageSize: 0,
        currentPage: 1,
        total: 0
      },

      tableData: [],
      page: 1,
      total: 0,
      customers: [],
      selectGood: []
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getSelectList();
    this.getTableData(1);
  },
  methods: {
    selectGoods(e) {
      this.selectGood = e;
    },
    closeModel(e) {
      this.dialogFormVisible2 = e;
    },
    search() {
      this.getTableData(this.page);
    },
    handleCurrentChange(e) {
      this.page = e;
      this.getTableData(e);
    },
    getSelectList() {
      customerCategoryListUse({ page: 1, size: 100000 }).then(res => {
        this.customers = res.data.data;
      });
    },
    getTableData(page) {
      integral({ page, size: 10, name: this.name, phone: this.phone }).then(
        res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      );
    },

    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        integralDel(row.id).then(res => {
          this.getTableData(this.page);
        });
      });
    },
    handleEdit(row) {
      integralInfo(row.id).then(res => {
        this.form = {
          id: res.data.id,
          name: res.data.name,
          cid: res.data.cid.toString(),
          goods: res.data.goods,
          default: res.data.default,
          gain: res.data.gain,
          gain_tj: res.data.gain_tj,
          gain_jf: res.data.gain_jf,
          cash: res.data.cash,
          cash_very: res.data.cash_very,
          cash_money: res.data.cash_money
        };
        this.selectGood = res.data.goods;
      });
      this.dialogFormVisible = true;
    },
    save() {
      this.form.goods = this.selectGood.map(val => val.id).toString();
      this.saveData();
    },
    async saveData() {
      let status;
      if (this.form.id) {
        status = await integralEdit(this.form.id, this.form);
      } else {
        status = await integralAdd(this.form);
      }
      if (status.code == 200) {
        this.celData();
        this.getTableData(this.page);
      }
    },
    celData() {
      this.dialogFormVisible = false;
      this.selectGood = [];
      Object.assign(this.$data.form, this.$options.data().form);
    },
    addSupplier() {
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.btn_row {
  display: flex;
  justify-content: center;
  /deep/ .el-button {
    width: 200px;
  }
}
.row {
  margin-bottom: 24px;
  display: flex;
  .lable {
    width: 80px;
  }
  .margin_top {
    margin-top: 18px;
  }
  // /deep/ .el-radio-group{
  //     margin-bottom: 18px;
  // }
  /deep/ .el-input {
    width: 370px;
  }
  /deep/ .el-button--text {
    margin-left: 42px;
    padding: 0;
  }
  .inputCode {
    width: 72px;
  }
  .tip {
    font-size: 14px;

    font-weight: 500;
    color: rgba(153, 153, 153, 1);
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
/deep/ .map .area-select .area-selected-trigger {
  top: -7px !important;
}
.new-add {
  margin-bottom: 30px;
  float: right;
}
.diagCenter {
  padding-left: 35%;
}
.mT10 {
  margin-top: 10px;
}
.mL50 {
  msrgin-left: 50px;
}
.border-bottom {
  border-bottom: 1px dashed #ddd;
  padding-bottom: 5px;
}
.colorBlue {
  color: #4e9bff;
}
.tDiag {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}
.aicon {
  width: 100px;
  height: 30px;
  background-color: #4e9bff;
  text-align: center;
  line-height: 30px;
}
.width200 {
  width: 200px;
}
.marginRight30： {
  margin-right: 30px !important;
}
.date {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-right: 16px;
  }
}
.top {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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















