<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="box">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="auto"
              class="demo-ruleForm"
            >
              <el-form-item label="账号" prop="name">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="ruleForm.des"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="dialogVisible=true">重置密码</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="cel">
      <el-form :model="form2" ref="ruleForm2">
        <el-form-item label="原密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },]">
          <el-input v-model="form2.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },]">
          <el-input v-model="form2.new_password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <!-- <el-input v-model="password" type="password"></el-input> -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="cel">取 消</el-button>
        <el-button type="primary" @click="updatePass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userUpdate, changePwd } from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {},

      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        email: [
          { required: false, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      form2: {
        password: "",
        new_password: ""
      }
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getUser();
  },
  methods: {
    cel() {
      (this.dialogVisible = false), (this.form2.password = "");
    },
    getUser() {
      this.ruleForm = JSON.parse(sessionStorage.getItem("user"));
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          userUpdate(this.ruleForm).then(res => {
            if (res.code == 200) {
              sessionStorage.setItem("user", JSON.stringify(res.data));
            }
          });
        }
      });
    },
    updatePass() {
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          changePwd(this.form2).then(res => {
            if (res.code == 200) {
              this.$confirm("重新登陆?", "退出管理平台", {
                confirmButtonText: "确定"
              })
                .then(() => {
                  sessionStorage.clear();
                  this.$router.push({ path: "/login" });
                })
                .catch(() => {});
            }
          });
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
