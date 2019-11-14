<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-card class="box-card">
        <el-page-header @back="goBack" style="margin-bottom:20px;"></el-page-header>
        <span class="header">基本信息</span>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户分类" prop="region">
              <el-select v-model="ruleForm.category" placeholder="请选择活动区域">
                <el-option
                  v-for="item in classList"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人" prop="contacts">
              <el-input v-model="ruleForm.contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户昵称" prop="nickname">
              <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="性别" prop="sex">
              <el-radio v-model="ruleForm.sex" label="0">男</el-radio>
              <el-radio v-model="ruleForm.sex" label="1">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生日">
              <el-date-picker v-model="ruleForm.brithday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否启用" prop="status">
              <el-radio v-model="ruleForm.status" label="0">启用</el-radio>
              <el-radio v-model="ruleForm.status" label="1">不启用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="ruleForm.sort" style="width:80px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="ruleForm.fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="商城微会员">
              <!-- <p>未绑定/已绑定</p> -->
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="会员手机">
              <!-- <p>16552358988</p> -->
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="会员昵称">
              <!-- <p>占三</p> -->
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="来源方式">
              <!-- <p>线上注册/线下注册</p> -->
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="微信昵称">
              <!-- <p>线上注册/线下注册</p> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="margin-top:20px;">
        <span class="header">财务信息</span>
        <el-row>
          <el-col :span="8">
            <el-form-item label="银行名称" prop="bank">
              <el-input v-model="ruleForm.bank"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会员卡号">
              <span></span>
              <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行卡号" prop="bank_account">
              <el-input v-model="ruleForm.bank_account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <div class="card">
        <span class="header">地址信息</span>
        <el-row>
          <el-col :span="8">
            <el-form-item label="地址">
              <Region ref="region" :region="region"></Region>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-card class="box-card">
        <span class="header">发货信息</span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="默认发货方式" prop="mode">
              <span v-if="this.ruleForm.mode=='1'">自提</span>
              <span v-if="this.ruleForm.mode=='2'">送车</span>
              <span v-if="this.ruleForm.mode=='3'">送指定点</span>
              <span v-if="this.ruleForm.mode=='4'">电子面单</span>
              <span v-if="this.ruleForm.mode=='5'">发物流</span>

              <el-button type="text" @click="editMode">修改</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-form-item style="margin-top:30px;">
        <el-button type="primary" @click="save(0)">保存</el-button>
        <el-button type="primary" @click="save(1)">保存并新增</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <ShipType
      :mode="ruleForm.mode"
      :mode_address="ruleForm.mode_des"
      :dialogVisible="dialogVisible"
      :showCheckBox="false"
      @modedes="getmodedes"
      @mode="getMode"
      @hidedialogVisible="hidedialogVisible"
    ></ShipType>
  </div>
</template>
<script>
import { customerCategoryList, addCus, cusDetail, editCus } from "@/api/index";

import Region from "@/components/Region";
import ShipType from "@/components/ShipType";
export default {
  components: {
    Region,
    ShipType
  },
  data() {
    return {
      classList: [],
      selected: [],
      region: [],
      ruleForm: {
        name: "",
        contacts: "",
        phone: "",
        nickname: "",
        category: "",
        sex: "",
        brithday: "",
        status: "",
        sort: "",
        tel: "",
        fax: "",
        email: "",
        bank: "",
        bank_account: "",
        province: "",
        areas: "",
        city: "",
        mode_des: "",
        mode: "1"
      },
      dialogVisible: false,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getClass();
  },
  mounted() {
    if (this.$route.query.id) {
      this.getCusData(this.$route.query.id);
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/customer/detail") {
        this.getCusData(to.query.id);
      }
      if (to.path != from.path) {
        this.resetForm("ruleForm");
      }
    }
  },
  methods: {
    getCusData(e) {
      cusDetail(this.$route.query.id).then(res => {
        this.$nextTick(() => {
          this.ruleForm = {
            id: res.data.id,
            name: res.data.name,
            contacts: res.data.contacts,
            phone: res.data.phone,
            nickname: res.data.nickname,
            category: res.data.category,
            sex: res.data.sex.toString(),
            brithday: res.data.brithday,
            status: res.data.status.toString(),
            sort: res.data.sort,
            tel: res.data.tel,
            fax: res.data.fax,
            email: res.data.email,
            bank: res.data.bank,
            bank_account: res.data.bank_account,
            province: res.data.province,
            areas: res.data.areas,
            city: res.data.city,
            mode_des: res.data.mode_address,
            mode: res.data.mode,
            address: res.data.address
          };

          this.region = [res.data.province, res.data.city, res.data.area];
        });
      });
    },
    hidedialogVisible(e) {
      this.dialogVisible = e;
    },
    getMode(e) {
      this.ruleForm.mode = e;
    },
    getmodedes(e) {
      this.ruleForm.mode_address = JSON.stringify(e);
    },
    editMode() {
      this.dialogVisible = true;
    },
    goBack() {
      this.$router.go(-1);
    },
    save(e) {
      if (this.$refs.region.selected.length > 0) {
        this.ruleForm.province = this.$refs.region.selected[0];
        this.ruleForm.city = this.$refs.region.selected[1];
        this.ruleForm.areas = this.$refs.region.selected[2];
      }

      this.saveData(e);
    },
    async saveData(e) {
      let res;

      if (this.ruleForm.id) {
        res = await editCus(this.ruleForm.id, this.ruleForm);
      } else {
        res = await addCus(this.ruleForm);
      }
      if (res) {
        this.$message.success(res.msg);
        // 0 保存  1 继续新增
        if (e == 0) {
          this.$router.go(-1);
        } else {
          this.$router.push({ path: "/customer/add" });
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.category = "";
      this.ruleForm.brithday = "";
      this.region = [];
    },
    getClass() {
      customerCategoryList().then(res => {
        this.classList = res.data.data;
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .map .area-select .area-selected-trigger {
  top: -8px !important;
}
.card {
  background: #fff;
  padding: 20px;
  box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 0.5);
  margin: 20px 0;
}
.header {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  position: relative;
  text-indent: 10px;
  display: inline-block;
}
.header::after {
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