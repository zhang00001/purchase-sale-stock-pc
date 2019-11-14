<template>
  <!-- 客户收款单   -->
  <el-dialog
    :title="this.pageType"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :before-close="closeModel"
    class="inform-dialog"
    width="900px"
  >
    <el-form :model="form" :rules="rules" label-width="auto" ref="form">
      <el-row>
        <template v-if="this.pageType=='账户互转'">
          <el-col :span="12">
            <el-form-item label="转出账户 :" prop="out_account_id">
              <el-select v-model="form.out_account_id" placeholder="请选择" @change="chanSelCus">
                <el-option
                  v-for="item in setAcounts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span>账户余额 :</span>
              <span>￥{{cusOne.money}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转入账户 :" prop="set_account_id">
              <el-select v-model="form.set_account_id" placeholder="请选择" @change="chanSelCus">
                <el-option
                  v-for="item in setAcounts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转账金额 :" prop="amount">
              <el-input v-model="form.amount" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </template>
        <template v-else>
          <el-col :span="12">
            <el-form-item label="结算账户 :" prop="set_account_id">
              <el-select v-model="form.set_account_id" placeholder="请选择" @change="chanSelCus">
                <el-option
                  v-for="item in setAcounts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span>账户余额 :</span>
              <span>￥{{cusOne.money}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="this.pageType=='收入'||this.pageType=='支出'">
            <el-form-item label="账目类型 :" prop="account_type_id">
              <el-select v-model="form.account_type_id" placeholder="请选择">
                <el-option
                  v-for="item in allAcounta"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="this.pageType=='收入'||this.pageType=='支出'">
            <el-form-item label="收入金额 :" prop="amount" class="input-tips">
              <el-input v-model="form.amount" placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="this.pageType=='初期调整'">
            <el-form-item label="期初金额 :" prop="amount">
              <el-input v-model="form.amount"></el-input>
            </el-form-item>
          </el-col>
        </template>

        <el-col :span="12">
          <el-form-item label="业务日期 :" prop="business_time">
            <el-date-picker
              v-model="form.business_time"
              type="date"
              placeholder="请选择"
              value-format="yyyy-MM-dd"
              class="datepicker"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="备注 :" prop="des">
            <el-input v-model="form.des" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="this.pageType=='收入'||this.pageType=='支出'">
        <el-upload
          class="avatar-uploader"
          action
          :http-request="uploadFile"
          :show-file-list="false"
        >
          <img v-if="images" :src="images" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button class="sure-btn" type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  userList,
  getSetAcount,
  getAllAcount,
  customerReconciliationAdd,
  setAccountFlowAdd
} from "@/api/index";
import commonupload from "@/components/common-upload"; // 上传组件
import axios from "axios";
export default {
  components: {
    commonupload
  },
  data() {
    return {
      form: { type: "" },
      images: "",
      users: [],
      pageType: "customer", // customer客户收款单 supplier供应商付款单
      rules: {
        out_account_id: [{ required: true, message: "必填", trigger: "blur" }],
        customer_id: [{ required: true, message: "必填", trigger: "blur" }],
        set_account_id: [{ required: true, message: "必填", trigger: "blur" }],
        account_type_id: [{ required: true, message: "必填", trigger: "blur" }],
        amount: [{ required: true, message: "必填", trigger: "blur" }],
        business_time: [{ required: true, message: "必填", trigger: "blur" }],
        discounted_price: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        des: [{ required: true, message: "必填", trigger: "blur" }]
      },
      allAcounta: [],
      setAcounts: [],
      planState: [],
      fileList: [],
      cusOne: {},
      dialogFormVisible: false
    };
  },
  created() {
    this.getSelectData();
  },
  methods: {
    chanSelCus() {
      if (this.pageType == "账户互转") {
        this.cusOne = this.setAcounts.find(
          val => val.id == this.form.out_account_id
        );
      } else {
        this.cusOne = this.setAcounts.find(
          val => val.id == this.form.set_account_id
        );
      }
    },
    closeModel() {
      (this.dialogFormVisible = false), (this.images = "");
      (this.form = {}), (this.cusOne = {});
    },
    getSelectData() {
      getSetAcount(1, 100000).then(res => {
        this.setAcounts = res.data;
      });
      getAllAcount(1, 100000).then(res => {
        this.allAcounta = res.data;
      });
      userList(1, 100000).then(res => {
        this.users = res.data.data;
      });
    },
    init(type) {
      this.pageType = type;
      this.dialogFormVisible = true;
    },

    // 确定
    sure() {
      if (this.pageType == "收入") {
        this.form.type = "in";
        this.form.images = this.images;
      }
      if (this.pageType == "支出") {
        this.form.type = "out";
        this.form.images = this.images;
      }
      if (this.pageType == "初期调整") {
        this.form.type = "adjustment";
      }
      if (this.pageType == "账户互转") {
        this.form.type = "mutual";
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveData();
        }
      });
    },
    async saveData() {
      let res = await setAccountFlowAdd({ ...this.form });
      if (res) {
        this.$message.success("新增成功");
        this.closeModel();
      }
    },
    uploadFile(item) {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("token")
        }
      };
      const formdata = new FormData();
      formdata.append("images[]", item.file);

      axios
        .post(process.env.BASE_API + "/api/uploadImage/test", formdata, config)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("图片上传成功");
            this.images = process.env.BASE_API + "/" + res.data.data[0];
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.tips-info {
  margin-left: 200px !important;
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 400px;
  height: 133px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 133px;
  line-height: 133px;
  text-align: center;
}
// .avatar-uploader {
//   border: 1px dashed #d9d9d9;
// }
.avatar,
.avatar-uploader {
  width: 400px;
  height: 133px;
  display: block;
}
</style>