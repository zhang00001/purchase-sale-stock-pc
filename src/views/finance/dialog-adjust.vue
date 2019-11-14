<template>
  <el-dialog
    :title="this.pageType==='customer'?'客户初期调整':'供应商初期调整'"
    :visible.sync="dialogFormVisible"
    class="inform-dialog"
    :close-on-click-modal="false"
    :before-close="closeModel"
    width="760px"
  >
    <el-form :model="form" ref="form" :rules="rules" label-width="auto">
      <el-row class="mb-30">
        <el-col :span="12">
          <el-form-item label="客户 :" v-if="this.pageType==='customer'" prop="customer_id">
            <el-select v-model="form.customer_id" placeholder="请选择">
              <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="供应商 :" v-if="this.pageType==='supplier'">
            <el-select v-model="form.supplier_id" placeholder="请选择">
              <el-option
                v-for="item in suppliers"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="初期客户欠款 :"
            prop="amount"
            class="input-tips"
            v-if="this.pageType==='customer'"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="正数表示客户初期有收款，负数表示客户初期有预存款"
              placement="top-start"
            >
              <el-input v-model="form.amount" placeholder="请输入"></el-input>
            </el-tooltip>
            <span>元</span>
          </el-form-item>

          <el-form-item label="初期欠供应商款 :" class="input-tips" v-if="this.pageType==='supplier'">
            <el-tooltip
              class="item"
              effect="dark"
              content="正数表示欠供应商款，负数表示供应商有欠款"
              placement="top-start"
            >
              <el-input v-model="form.amount" placeholder="请输入"></el-input>
            </el-tooltip>
            <span>元</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="业务日期 :" prop="business_time">
            <el-date-picker
              v-model="form.business_time"
              type="date"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              class="datepicker"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="备注 :" prop="des">
            <el-input v-model="form.des" placeholder="单行输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button class="sure-btn" type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userList, adjustment, adjustmentSup, supplierList } from "@/api/index";
export default {
  data() {
    return {
      form: {},
      users: [],
      supOne: {},
      suppliers: [],
      pageType: "customer", // customer客户对账单 supplier供应商对账单
      rules: {
        customer_id: [{ required: true, message: "必填", trigger: "blur" }],
        amount: [{ required: true, message: "必填", trigger: "blur" }],

        business_time: [{ required: true, message: "必填", trigger: "blur" }],

        des: [{ required: true, message: "必填", trigger: "blur" }]
      },
      planState: [],
      dialogFormVisible: false
    };
  },
  created() {
    this.getSelectData();
  },
  methods: {
    chanSelSup() {
      this.supOne = this.suppliers.find(val => val.id == this.form.supplier_id);
    },
    getSelectData() {
      userList(1, 100000).then(res => {
        this.users = res.data.data;
      });
      supplierList({ page: 1, size: 100000 }).then(res => {
        this.suppliers = res.data.data;
      });
    },
    init(type) {
      this.pageType = type;
      this.dialogFormVisible = true;
    },

    // 取消
    closeModel() {
      this.dialogFormVisible = false;
      this.form = {};
      // Object.assign(this.$data.form, this.$options.data().form);
      // Object.assign(this.$data.cusOne, this.$options.data().cusOne);
    },

    // 确定
    sure() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveData();
        }
      });
    },
    async saveData() {
      let res;
      if (this.pageType === "customer") {
        res = await adjustment({ ...this.form });
      } else if (this.pageType === "supplier") {
        res = await adjustmentSup({ ...this.form });
      }
      if (res) {
        this.$message.success("新增成功");
        this.closeModel();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.tips-info {
  margin-left: 10px !important;
}
</style>