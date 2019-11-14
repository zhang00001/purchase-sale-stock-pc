<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <div style="margin:0 60px 0 20px;">
              <el-radio-group v-model="status" size="medium" @change="changeType">
                <el-radio-button
                  v-for="item in orderStatus"
                  :label="item.id"
                  :key="item.id"
                >{{item.name}}</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="box">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="auto"
              class="demo-ruleForm"
            >
              <!-- <template v-if="status=='0'">
                <el-form-item label="公司名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </template>-->

              <template v-if="status=='1'">
                <el-form-item label="默认库存预警上限" prop="defaultInventoryWarningLimit">
                  <el-input v-model="ruleForm.defaultInventoryWarningLimit"></el-input>
                </el-form-item>
                <el-form-item label="默认库存预警下限" prop="defaultStockWarningThreshold">
                  <el-input v-model="ruleForm.defaultStockWarningThreshold"></el-input>
                </el-form-item>
                <el-form-item label="负库存出售" prop="negativeStockSale">
                  <el-radio-group v-model="ruleForm.negativeStockSale">
                    <el-radio label="true">启用</el-radio>
                    <el-radio label="false">启用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </template>
            </el-form>
            <el-form ref="ruleForm2" :model="ruleForm2" label-width="auto" class="demo-ruleForm">
              <template v-if="status=='2'">
                <el-form-item label="实收/实付为零" prop="realPayIsZero">
                  <el-radio-group v-model="ruleForm2.realPayIsZero">
                    <el-radio label="true">启用</el-radio>
                    <el-radio label="false">启用</el-radio>
                  </el-radio-group>
                  <p class="tip">设置启用后，开单页面实（付）收金额将默认为零</p>
                </el-form-item>
                <el-form-item label="销售单默认上次价格" prop="salesOrderDefaultLastPrice">
                  <el-radio-group v-model="ruleForm2.salesOrderDefaultLastPrice">
                    <el-radio label="true">启用</el-radio>
                    <el-radio label="false">启用</el-radio>
                  </el-radio-group>
                  <p class="tip">
                    启用后，销售单及销售退货单的价格将默认设置
                    <br />为同上个客户上次出售的价格
                  </p>
                </el-form-item>
                <el-form-item label="采购单默认上次价格" prop="purchaseOrderDefaultLastPrice">
                  <el-radio-group v-model="ruleForm2.purchaseOrderDefaultLastPrice">
                    <el-radio label="true">启用</el-radio>
                    <el-radio label="false">启用</el-radio>
                  </el-radio-group>
                  <p class="tip">
                    启用后，采购单及采购退货单的商品价格将默认设置
                    <br />为同个供应商上次采购的价格
                  </p>
                </el-form-item>
                <el-form-item label="默认收款方式" prop="defaultPaymentMethod">
                  <el-radio-group v-model="ruleForm2.defaultPaymentMethod">
                    <el-radio label="0">默认上次收款方式</el-radio>
                    <el-radio label="1">扫码收银</el-radio>
                    <el-radio label="2">现金收款</el-radio>
                  </el-radio-group>
                  <p class="tip">控制销售单，前台收银的默认收款方式</p>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
                  <el-button type="primary" @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </template>
            </el-form>
            <!-- <template v-if="status=='3'">
                <el-form-item label="微信/支付宝默认收款账户" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="微信/支付宝默认账目类型" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="微信/支付宝默认收款码" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </template>-->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getconfig, Updateconfig } from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
export default {
  data() {
    return {
      status: 1,

      orderStatus: [
        // { id: 0, name: "公司资料" },
        { id: 1, name: "系统参数" },
        { id: 2, name: "用户配置" }
        // { id: 3, name: "收款配置" }
      ],
      ruleForm2: {},
      ruleForm: {},
      rules: {}
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getData(this.status);
  },
  methods: {
    resetForm() {
      this.$refs["ruleForm2"].resetFields();
      this.$refs["ruleForm"].resetFields();
    },
    submitForm() {
      let data;
      if (this.status == 1) {
        data = this.ruleForm;
      } else {
        data = this.ruleForm2;
      }
      Updateconfig({ name: this.status, ...data }).then(res => {});
    },
    changeType() {
      this.getData(this.status);
    },
    getData(status) {
      getconfig({ name: status }).then(res => {
        if (res.data) {
          if (this.status == 1) {
            this.ruleForm = res.data;
          } else {
            this.ruleForm2 = res.data;
          }
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  /deep/ .el-input {
    width: 300px;
  }
  .tip {
    font-size: 14px;
    font-family: PingFang-SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
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
  width: 300px;
}

.top {
  display: flex;
  align-items: flex-start;
}
</style>
