<template>
  <div class="bg">
    <div class="con">
      <div class="card">
        <img :src="require('@/assets/images/left.png')" alt />
        <el-form
          autocomplete="on"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          class="inputRow"
        >
          <el-form-item prop="username">
            <el-input
              name="username"
              type="text"
              v-model="loginForm.username"
              autocomplete="on"
              placeholder="请输入管理员名称"
            >
              <img slot="prefix" :src="require('@/assets/images/user.png')" alt />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              name="password"
              :type="pwdType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              autocomplete="on"
              placeholder="请输入密码"
            >
              <img slot="prefix" :src="require('@/assets/images/password.png')" alt />
            </el-input>
          </el-form-item>

          <el-form-item style="margin-top: 80px">
            <el-button
              type="primary"
              :loading="loading"
              @click.native.prevent="handleLogin"
              class="login"
            >立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";

import http from "@/utils/request";
import { register } from "@/api/index";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };

    return {
      routers: [],
      name: "",
      btn: [],

      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",

      dialogVisible: false
    };
  },
  mounted() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;

          register(this.loginForm).then(res => {
            this.loading = false;
            if (res.code == "200") {
              this.$message.success("注册成功，前往登录");
              this.$router.push({ path: "/login" });
            } else {
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped  rel="stylesheet/scss" lang="scss" >
.card {
  /* padding: 240px; */
  width: 47vw;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 10px 0px rgba(251, 80, 88, 0.14);

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1231px;
  height: 733px;
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
}
.login-title {
  text-align: center;
}

.con {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 84vh;

  margin: 0;
}

.bg {
  width: 100%;
  height: 100vh;
  background: url(../../assets/images/bg@2x.png) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 320px;
  height: 66px;
  background: rgba(79, 147, 254, 1);
  border: 1px solid rgba(26, 114, 254, 1);
  border-radius: 33px;
  font-size: 20px;
}
.inputRow .el-input {
  display: flex;
  align-items: center;
  width: 100%;
}

.inputRow /deep/ .el-input--prefix .el-input__inner {
  border: none;
  border-bottom: 1px solid #ddd;
  padding-bottom: 9px;
  padding-left: 57px;
}
</style>
 
