<template>
  <div class="app-container">
    <div class="box-inform">
      <el-form :inline="true" :model="form">
        <el-form-item label="客户 :" prop="Supplier" label-width="50px">
          <!-- <el-option label="全部" value="0"></el-option> -->
          <el-select v-model="form.kid" placeholder="请选择">
            <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户分类 :" prop="Supplier" label-width="145px">
          <!-- <el-option label="全部" value="0"></el-option> -->
          <el-select v-model="form.category" placeholder="请选择">
            <el-option v-for="item in cates" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="欠款金额 :" label-width="145px" class="price">
          <el-input v-model="form.min" placeholder="请输入"></el-input>
          <span>至</span>
          <el-input v-model="form.max" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>

      <div class="inform-bottom">
        <el-checkbox v-model="state" class="checkbox">不显示欠款客户</el-checkbox>
        <el-button type="primary" @click="getTabData(1)">查询</el-button>
        <div class="number">
          <p>客户数：{{baseNumber.total}}</p>
          <p>欠款客户数：{{baseNumber.arrearsNum}}</p>
          <p>欠款金额：{{baseNumber.arrears}}</p>
        </div>
      </div>
    </div>

    <div class="box-table">
      <el-table :data="tableData" border>
        <el-table-column fixed prop="id" label="序号"></el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="cateName" label="客户分类"></el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="手机"></el-table-column>
        <el-table-column prop="arrears" label="欠款"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { FinanceList, userList, customerCategoryList } from "@/api/index";
import http from "@/utils/request";
import selectaDate from "@/components/select-date";
export default {
  components: {
    selectaDate
  },
  data() {
    return {
      form: {
        kid: "",
        category: "",
        min: "",
        max: "",
        state: 0
      },
      baseNumber: {
        arrears: 0,
        arrearsNum: 0,
        total: 0
      },
      state: false, //1有欠款 0 无欠款
      total: 0,
      SupplierList: [],
      tableData: [],
      users: [],
      cates: []
    };
  },
  filters: {},
  mounted() {
    this.getTabData(1);
  },
  created() {
    this.getSelectdata();
  },
  methods: {
    handleCurrentChange(e) {
      this.getTabData(e);
    },
    getSelectdata() {
      userList(1, 100000).then(res => {
        this.users = res.data.data;
      });
      customerCategoryList({ page: 1, size: 100000 }).then(res => {
        this.cates = res.data.data;
      });
    },
    getTabData(page) {
      this.form.state = this.state ? 1 : 0;

      FinanceList({ page: page, size: 10, ...this.form }).then(res => {
        this.tableData = res.list.list.data;
        this.total = res.list.list.total;
        this.baseNumber = {
          arrears: res.list.arrears,
          arrearsNum: res.list.arrearsNum,
          total: res.list.total
        };
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-inform {
  padding: 30px;
  span {
    margin: 0 10px;
  }
  .inform-bottom {
    display: flex;
    .checkbox {
      margin: 10px 30px 0 0;
    }
    .number {
      display: flex;
      padding: 10px 85px;
      p {
        margin-right: 60px;
        font-size: 16px;
        color: rgba(85, 161, 255, 1);
        font-weight: 600;
      }
    }
  }
}
</style>
