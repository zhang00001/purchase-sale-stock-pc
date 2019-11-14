<template>
  <!-- 客户分类列表 -->
  <div>
    <div class="searBar">
      <span>客户</span>
      <el-input v-model="name" placeholder="手机名称微信昵称"></el-input>
      <span>分类</span>
      <el-select v-model="category" placeholder="请选择活动区域" clearable>
        <el-option label="全部" value></el-option>
        <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in cates"></el-option>
      </el-select>

      <el-button type="primary" @click="getTabData">查询</el-button>
    </div>
    <el-table
      :data="gridData"
      row-key="id"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column property="category" label="分类"></el-table-column>
      <el-table-column property="name" label="客户名称"></el-table-column>
      <el-table-column property="phone" label="手机号"></el-table-column>
      <el-table-column property="we_nickname" label="微信昵称"></el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top:20px;"
      layout="total,prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { retailCustomer, customerCategoryList } from "@/api/index";
export default {
  data() {
    return {
      name: "",
      category: "",
      cates: [],
      gridData: [],
      page: 1,
      total: 0,
      multipleSelection: []
    };
  },
  props: ["cus"],
  created() {
    this.getBaseData();
    this.getTabData(this.page);
  },
  watch: {
    cus(e) {}
  },
  methods: {
    checked() {
      let a = [];

      this.cus.forEach(item =>
        a.push(this.gridData.find(val => val.id == item.id))
      );

      this.toggleSelection(a);
    },
    handleCurrentChange(e) {
      this.page = e;
      this.getTabData(this.page);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    save() {
      this.$emit("closeModel", false);
      this.$emit("selectCates", this.multipleSelection);
      // this.$refs.multipleTable.clearSelection();
    },
    getBaseData() {
      customerCategoryList({ params: { page: 1, size: 10000000 } }).then(
        res => {
          if (res.code == 200) {
            this.cates = res.data.data;
          }
        }
      );
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    async getTabData(page) {
      let res = await retailCustomer({
        page: page,
        size: 10,
        name: this.name,
        category: this.category
      });
      this.gridData = res.data.data;
      this.total = res.data.total;
      this.checked();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.searBar {
  /deep/ .el-input {
    width: 190px;
    margin-right: 30px;
  }
  /deep/ .el-button {
    margin-top: 20px;
  }
}
</style>