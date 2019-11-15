<template>
  <div class="purchase-order">
    <div class="box-inform">
      <div class="card-header">
        <h5 class="sales-Order">已出库单</h5>
        <el-radio-group v-model="headerStatus" size="medium">
          <el-radio-button v-for="item in orderStatus" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
        </el-radio-group>
      </div>

      <div class="date-time">
        <selectDdate @refresh="init"></selectDdate>
      </div>

      <div class="card-bottom">
        <el-form class="search-form-input" ref="form" :model="form">
          <el-row class="row">
            <el-form-item label="客户 :" prop="kid" label-width="62px">
              <el-select v-model="form.kid" placeholder="请选择">
                <el-option
                  v-for="item in customerList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库 :" prop="warehouse" label-width="188px">
              <el-select v-model="form.warehouse" placeholder="请选择">
                <el-option
                  v-for="item in warehouseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单号 :" prop="number" label-width="146px">
              <el-input v-model="form.number" placeholder="单行输入"></el-input>
            </el-form-item>
          </el-row>

          <el-row class="row">
            <el-form-item label="制单人 :" prop="maker" label-width="62px">
              <el-select v-model="form.maker" placeholder="请选择">
                <el-option
                  v-for="item in orderList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="制单人所属门店 :" prop="store" label-width="188px">
              <el-select v-model="form.store" placeholder="请选择">
                <el-option
                  v-for="item in orderStoreList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单据类型 :" prop="type" label-width="146px">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button class="search-bottom" type="primary" @click="search">查询</el-button>
          </el-row>
        </el-form>
      </div>
    </div>

    <div class="box-table">
      <el-table :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="look(scope.row.status2, scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="print(scope.row)" type="text" size="small">打印</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status_name" label="状态" align="center"></el-table-column>
        <el-table-column prop="number" label="单号" align="center"></el-table-column>
        <el-table-column prop="create_time" label="日期" align="center"></el-table-column>
        <el-table-column prop="kid" label="客户" align="center"></el-table-column>
        <el-table-column prop="warehouse" label="仓库" align="center"></el-table-column>
        <el-table-column prop="maker" label="制单人" align="center"></el-table-column>
        <el-table-column prop="type_name" label="单据类型" align="center"></el-table-column>
        <el-table-column prop="des" label="备注" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { enumFinshed } from "@/utils/enums";
import { customerCategoryList } from "@/api/index.js";
import { MakerList, AllStore, warehouseList } from "@/api/api.js";
import selectDdate from "@/components/select-date";
import {
  supplierSelectList,
  warehouseSelectList,
  prepareList,
  KeeperList,
  storeList,
  OutStockList
} from "@/api/api.js";
export default {
  components: {
    selectDdate
  },

  // 监听表头搜索状态
  watch: {
    headerStatus(newVal) {
      this.form.status = newVal;
      this.init();
    }
  },

  data() {
    return {
      orderStatus: enumFinshed,
      customerList: [],
      warehouseList: [],
      orderList: [],
      orderStoreList: [],
      form: {},
      listQuery: {
        size: 10,
        page: 1,
        start: 2
      },
      total: 0,
      // 当前选中状态
      headerStatus: "",
      tableData: [],
      typeList: [
        { id: "", name: "全部" },
        { id: 1, name: "销售单" },
        { id: 2, name: "配货单" },
        { id: 3, name: "调拨单" },
        { id: 4, name: "采购单" },
        { id: 5, name: "退货单" }
      ],
      firstArr: [{ id: null, name: "全部" }] // 下拉列表全部
    };
  },

  created() {
    this.init();
    this.getSelectValue();
  },

  methods: {
    print(row) {
      this.$common.printPdf("outstock_out", row.id);
    },
    init(start_time, end_time) {
      OutStockList({
        params: {
          ...this.form,
          ...this.listQuery,
          start_time: start_time,
          end_time: end_time
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.list.data;
          this.total = res.list.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 获取下拉值
    getSelectValue() {
      // 客户下拉列表
      customerCategoryList().then(res => {
        if (res.code === 200) {
          this.customerList = this.firstArr.concat(res.data.data);
        } else {
          this.$message.error(res.message);
        }
      });

      // 仓库下拉列表
      warehouseSelectList().then(res => {
        if (res.code === 200) {
          this.warehouseList = this.firstArr.concat(res.data);
        } else {
          this.$message.error(res.message);
        }
      });

      // 制单人下拉列表
      MakerList().then(res => {
        if (res.code === 200) {
          this.orderList = this.firstArr.concat(res.data);
        } else {
          this.$message.error(res.message);
        }
      });

      // 查询门店下拉列表
      AllStore().then(res => {
        if (res.code === 200) {
          this.orderStoreList = this.firstArr.concat(res.data);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 点击查询
    search() {
      this.init();
    },

    // 查看
    look(status, id) {
      console.log(status);
      this.$router.push({
        path: "/purchase/newBuild",
        query: { status: status, id: id }
      });
    },

    // 获取表格点击行
    handleSelectionChange(list) {
      // this.currentData = list
      // let arr = []
      // list.forEach(item => {
      //   arr.push(item.collectId)
      // })
      // this.chooseRowIds = arr.join(',') // 获取所选id集合
    },

    // 点击序号分页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.date-time {
  .date {
    margin: 25px 0 30px 140px;
    .time-tit {
      line-height: 33px !important;
    }
  }
}
.search-form-input {
  .row {
    display: flex;
  }
}
</style>