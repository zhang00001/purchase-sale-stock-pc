<template>
  <div class="app-container">
    <div class="box-inform">
      <el-form :model="form" label-width="auto">
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户分类 :">
              <el-select v-model="form.category" placeholder="请选择">
                <el-option v-for="item in cates" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="微商城会员 :">
              <el-select v-model="form.category" placeholder="请选择">
                <el-option v-for="item in cates" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来源方式 :">
              <el-select v-model="form.source" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="线下" value="1"></el-option>
                <el-option label="线上" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启用状态 :">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="启用" value="0"></el-option>
                <el-option label="失效" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建立时间 :">
              <el-date-picker v-model="form.date1" type="date" placeholder="选择日期"></el-date-picker>
              <span>至</span>
              <el-date-picker v-model="form.date2" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="inform-bottom">
        <el-button type="primary" @click="addCus">新增</el-button>
        <el-button type="primary" @click="search">查询</el-button>
        <div class="number">
          <p>客户欠款汇总：¥{{total_arrears?total_arrears:0}}</p>
        </div>
      </div>
    </div>

    <div class="box-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editCus(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="cenlCus(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机" width="180"></el-table-column>
        <el-table-column prop="category.name" label="客户分类"></el-table-column>
        <el-table-column prop="nickname" label="会员昵称"></el-table-column>
        <el-table-column prop="address" label="来源方式"></el-table-column>
        <el-table-column prop="m_account" label="欠款"></el-table-column>
        <el-table-column prop="integral" label="积分"></el-table-column>
        <el-table-column prop="address" label="折扣"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { userList, delCus, customerCategoryList } from "@/api/index";
import http from "@/utils/request";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      form: {
        category: "",
        date1: "",
        name: "",
        status: "",
        source: "",
        date2: ""
      },
      total_arrears: 0,
      cates: [],
      category: ""
    };
  },
  created() {
    this.getUserList(1);
    this.getSelectdata();
  },
  methods: {
    handleCurrentChange(e) {
      this.page = e;
      this.getUserList(this.page);
    },
    search() {
      this.getUserList(this.page);
    },
    getUserList(page) {
      let time1 = this.form.date1 ? this.form.date1.getTime() / 1000 : "";
      let time2 = this.form.date2 ? this.form.date2.getTime() / 1000 : "";
      let time;
      if (time1 || time2) {
        time = `${time1},${time2}`;
      } else {
        time = "";
      }

      userList(
        page,
        10,
        this.form.category,
        this.form.status,
        this.form.name,
        this.form.source,
        time
      ).then(res => {
        if (res.code == 200) {
          this.total = res.data.total;
          this.tableData = res.data.data;
          this.total_arrears = res.data.total_arrears;
        }
      });
    },
    getSelectdata() {
      userList(1, 100000).then(res => {
        this.users = res.data.data;
      });
      customerCategoryList({ page: 1, size: 100000 }).then(res => {
        this.cates = res.data.data;
      });
    },
    addCus() {
      this.$router.push({ path: "/customer/add" });
    },
    editCus(e) {
      this.$router.push({ path: "/customer/detail", query: { id: e.id } });
    },
    cenlCus(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delCus(e.id).then(res => {
          this.getUserList(1);
        });
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