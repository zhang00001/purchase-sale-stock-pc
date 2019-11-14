<template>
  <div class="management-status">
    <el-card class="box-card">
      <div class="center">
        <span>日期：</span>
        <el-date-picker
          v-model="start_time"
          type="date"
          placeholder="开始日期"
          class="searchInput"
          value-format="yyyy-MM-dd"
        ></el-date-picker>-
        <el-date-picker
          v-model="end_time"
          type="date"
          placeholder="结束日期"
          class="searchInput"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <span>仓库：</span>
        <el-select v-model="warehouse" clearable>
          <el-option :label="item.name" :value="item.id" v-for="item in warehs" :key="item.id"></el-option>
        </el-select>
        <span>商品：</span>
        <el-input class="searchInput" v-model="name"></el-input>

        <br />
        <div style="margin-top:20px;">
          <span>分类：</span>
          <el-select v-model="category" clearable>
            <el-option :label="item.name" :value="item.id" v-for="item in cates" :key="item.id"></el-option>
          </el-select>
          <span>品牌：</span>
          <el-select v-model="brand" clearable>
            <el-option :label="item.name" :value="item.id" v-for="item in brands" :key="item.id"></el-option>
          </el-select>

          <el-button type="primary" @click="getTableData(1)">查询</el-button>
        </div>
      </div>
    </el-card>

    <div class="box-card">
      <div class="box-card-header">
        <h5 class="sales-Order">进销对比</h5>
      </div>
      <div class="box-card-body">
        <el-card class="box-card">
          <el-row>
            <el-col :span="12">
              <div class="box">
                <div class="row">
                  <h6>{{baseData.caiNum}}</h6>

                  <p class="sale">总进货量</p>
                </div>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="box">
                <div class="row">
                  <h6>{{baseData.saleNum}}</h6>

                  <p class="sale">销售量</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-table
            :data="tableData"
            border
            style="width: 100%"
            class="management-table"
            show-summary
            :summary-method="getSummaries"
          >
            <el-table-column prop="name" label="商品名称" width="100" align="center"></el-table-column>
            <el-table-column prop="item" label="货号" align="center"></el-table-column>
            <el-table-column prop="color" label="颜色" align="center"></el-table-column>
            <el-table-column prop="size" label="尺码" align="center"></el-table-column>

            <el-table-column prop="caiWare" label="采购仓库" align="center"></el-table-column>
            <el-table-column prop="saleWare" label="销售仓库" align="center"></el-table-column>
            <el-table-column prop="caiNum" label="进货量" align="center" sortable></el-table-column>
            <el-table-column prop="caiMoney" label="进货金额" align="center" sortable></el-table-column>
            <el-table-column prop="saleNum" label="销售量" align="center" sortable></el-table-column>
            <el-table-column prop="saleMoney" label="销售金额" align="center" sortable></el-table-column>
          </el-table>

          <el-pagination
            background
            style="margin-top:20px;"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { CategoryList, BrandList, Contrast } from "@/api/index";
import { warehouseSelectList } from "@/api/api";
export default {
  data() {
    return {
      name: "",
      category: "",
      brand: "",
      warehouse: "",
      start_time: new Date(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() +
          8 * 60 * 60 * 1000 -
          30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      end_time: new Date(
        new Date().getTime() + 8 * 60 * 60 * 1000
      ).toISOString(),
      warehs: [],
      brands: [],
      cates: [],
      total: 0,
      searchList: [],
      tableData: [],
      baseData: {
        caiNum: 0,
        saleNum: 0
      }
    };
  },
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
      Contrast({
        page: page,
        size: 10,

        name: this.name,

        category: this.category,

        brand: this.brand,
        warehouse: this.warehouse,
        start_time: this.start_time.split("T")[0],

        end_time: this.end_time.split("T")[0]
      }).then(res => {
        this.tableData = res.list.data;
        this.total = res.list.total;
        (this.baseData.caiNum = res.list.caiNum),
          (this.baseData.saleNum = res.list.saleNum);
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
      // 仓库
      warehouseSelectList({ page: 1, size: 100000 }).then(res => {
        this.warehs = res.data;
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index > 4) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += "";
          } else {
            sums[index] = "";
          }
        }
      });

      return sums;
    }
  }
};
</script>

<style lang="scss" scoped>
.management-status {
  .box-card {
    .box-card-header {
      display: flex;
      height: 50px;
      background-color: #55a1ff;
      padding: 5px 0;
      .sales-Order {
        font-size: 18px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgb(248, 236, 236);
        line-height: 18px;
        position: relative;
        text-indent: 10px;
        padding: 11px 70px 0 40px;
      }
      .sales-Order::after {
        content: "";
        left: 37px;
        top: 13px;
        position: absolute;
        width: 4px;
        height: 14px;
        background: #fff;
        border-radius: 3px;
      }
      .search-btn {
        background-color: #fff;
        margin-left: 615px;
        .el-button {
          width: 66px;
          height: 45px;
        }
      }
    }
    .box-card-body {
      .management-table {
        h5 {
          font-size: 17px;
          color: #909399;
        }
      }
    }
  }
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
.box {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 20px 20px 0 20px;
  margin-bottom: 43px;
  border-bottom: 1px solid #fff;
  .row {
    h6 {
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-bottom: 10px;
      text-align: center;
    }
    p {
      height: 20px;
      font-size: 14px;
      font-family: PingFang-SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
    .sale {
      color: #333333;
      font-size: 16px;
      margin-top: 20px;
    }
  }
}
.center {
  margin: 20px;
}
.searchInput {
  width: 190px;
}
</style>