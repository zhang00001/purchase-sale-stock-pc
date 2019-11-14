<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <div style="margin:0 60px 0 20px;">
              <div style="display:flex;alain-item:center;margin-top:24px;">
                <selectaDate ref="datePicker"></selectaDate>
              </div>

              <div class="center">
                <span>商品：</span>
                <el-input class="searchInput" v-model="name"></el-input>
                <span>分类：</span>
                <el-select clearable filterable v-model="category">
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in cates"
                    :key="item.id"
                  ></el-option>
                </el-select>
                <span>品牌：</span>
                <el-select clearable filterable v-model="brand">
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in brands"
                    :key="item.id"
                  ></el-option>
                </el-select>
                <el-button type="primary" @click="getTableData(1)">查询</el-button>
              </div>
              <div class="number">
                <p>单品数：{{baseData.single}}</p>
                <p>商品数：{{baseData.goods}}</p>
                <p>库存商品总金额：{{baseData.money}}</p>
              </div>
            </div>
          </div>

          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">打印</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed prop="name" label="名称" sortable></el-table-column>
            <el-table-column prop="item" label="货号" sortable></el-table-column>
            <el-table-column prop="goods_code" label="条码" sortable></el-table-column>
            <el-table-column prop="category" label="分类"></el-table-column>
            <el-table-column prop="brand" label="品牌"></el-table-column>
            <el-table-column prop="caiNum" label="采购单品数" sortable></el-table-column>
            <el-table-column prop="caiMoney" label="采购金额" sortable></el-table-column>
            <el-table-column prop="saleNum" label="销售单品数" sortable></el-table-column>
            <el-table-column prop="saleMoney" label="销售金额" sortable></el-table-column>
            <el-table-column prop="kid" label="购买客户数" sortable></el-table-column>
            <el-table-column prop="stock" label="当前库存" sortable></el-table-column>
          </el-table>
          <el-pagination
            background
            style="margin-top:20px;"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { CategoryList, BrandList, Analys } from "@/api/index";
import http from "@/utils/request";
import selectaDate from "@/components/select-date";
export default {
  components: {
    selectaDate
  },
  data() {
    return {
      status: "0",
      value1: "",
      region: "",
      cates: [],
      brands: [],
      brand: "",
      category: "",
      name: "",
      dialogVisible: false,
      total: 0,
      tableData: [],
      selectData: "",
      ruleForm: {},
      baseData: {
        goods: 0,
        money: 0,
        single: 0
      }
    };
  },
  filters: {},
  mounted() {
    this.getTableData(1);
  },
  created() {
    this.getSelectDate();
  },
  methods: {
    handleCurrentChange(e) {
      this.getTableData(e);
    },
    getTableData(page) {
      Analys({
        page: page,
        size: 10,

        name: this.name,

        category: this.category,

        brand: this.brand,

        start_time: this.$refs.datePicker.start_time,

        end_time: this.$refs.datePicker.end_time
      }).then(res => {
        this.tableData = res.list.data;
        this.total = res.list.total;
        this.baseData = {
          goods: res.list.goods,
          money: res.list.money,
          single: res.list.single
        };
      });
    },
    getSelectDate() {
      // 分类
      CategoryList({ page: 1, size: 100000 }).then(res => {
        this.cates = res.data.data;
      });
      // 品牌
      BrandList({ page: 1, size: 100000 }).then(res => {
        this.brands = res.data.data;
      });
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .date {
  display: flex;
  align-items: center;
}
.number {
  display: flex;
  margin-top: 34px;
  p {
    margin-right: 138px;
    font-size: 16px;
    color: rgba(85, 161, 255, 1);
    font-weight: 600;
  }
}
.demo-ruleForm {
  display: flex;
  flex-wrap: wrap;
}
.demo-ruleForm /deep/ .el-input {
  width: 190px;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0;
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
  width: 190px;
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
</style>
