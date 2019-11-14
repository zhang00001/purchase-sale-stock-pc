<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <div style="margin:0 60px 0 20px;">
              <el-radio-group v-model="status" size="medium" @change="getDate(1)">
                <el-radio-button
                  v-for="item in puchStatus"
                  :label="item.id"
                  :key="item.id"
                >{{item.name}}</el-radio-button>
              </el-radio-group>
              <div style="display:flex;alain-item:center;margin-top:24px;">
                <selectaDate ref="datePicker"></selectaDate>
                <el-button type="primary" style="margin-left:20px;" @click="dialogVisible = true">查询</el-button>
              </div>
              <div class="number">
                <p>销售单品数：{{baseData.saleNum}}</p>
                <p>销售额：{{baseData.money}}</p>
                <p>销售毛利：{{baseData.profit}}</p>
                <p>销售毛利率：{{baseData.rate}}</p>
              </div>
            </div>
          </div>

          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%" max-height="600">
            <el-table-column
              prop="name"
              sortable
              label="名称"
              v-if="status=='0'||status=='1'||status=='2'"
            ></el-table-column>
            <el-table-column
              prop="item"
              width="150px;"
              label="货号"
              sortable
              v-if="status=='0'||status=='1'||status=='2'"
            ></el-table-column>
            <el-table-column
              prop="goods_code"
              label="条码"
              width="150px;"
              v-if="status=='0'||status=='1'||status=='2'"
            ></el-table-column>
            <el-table-column
              prop="brand"
              sortable
              label="品牌"
              v-if="status=='0'||status=='1'||status=='2'"
            ></el-table-column>
            <el-table-column
              prop="category"
              label="分类"
              v-if="status=='0'||status=='1'||status=='2'"
            ></el-table-column>

            <el-table-column prop="color" label="颜色" v-if="status=='0'||status=='1'"></el-table-column>
            <el-table-column prop="size" label="尺码" v-if="status=='0'||status=='1'"></el-table-column>
            <el-table-column prop="unit" label="单位" v-if="status=='0'||status=='1'||status=='2'"></el-table-column>
            <el-table-column
              prop="put_number"
              label="单品数"
              sortable
              v-if="status=='0'||status=='1'||status=='2'||status=='3'||status=='4'||status=='5'||status=='6'||status=='7'"
            ></el-table-column>
            <el-table-column prop="price" label="单价" v-if="status=='0'||status=='1'||status=='2'"></el-table-column>
            <el-table-column
              prop="discount"
              label="折扣（%）"
              width="100px;"
              v-if="status=='0'||status=='1'||status=='2'"
            ></el-table-column>
            <el-table-column
              prop="discount_price"
              label="折后价"
              v-if="status=='0'||status=='1'||status=='2'||status=='7'"
            ></el-table-column>
            <el-table-column prop="money" label="金额" v-if="status=='0'||status=='1'||status=='2'"></el-table-column>
            <el-table-column
              prop="discount_money"
              label="折扣金额"
              sortable
              v-if="status=='0'||status=='1'||status=='2'||status=='4'||status=='5'||status=='6'"
            ></el-table-column>
            <el-table-column prop="avg" label="采购均价" v-if="status=='0'||status=='1'"></el-table-column>
            <el-table-column
              prop="cost"
              label="采购成本"
              v-if="status=='0'||status=='1'||status=='2'||status=='3'||status=='4'||status=='5'||status=='6'||status=='7'"
            ></el-table-column>

            <el-table-column
              prop="profit"
              label="毛利润"
              sortable
              v-if="status=='0'||status=='1'||status=='2'||status=='3'||status=='4'||status=='5'||status=='6'||status=='7'"
            ></el-table-column>
            <el-table-column
              prop="rate"
              label="毛利润(%)"
              sortable
              width="150px;"
              v-if="status=='0'||status=='1'||status=='2'||status=='3'||status=='4'||status=='5'||status=='6'"
            ></el-table-column>

            <el-table-column
              prop="number"
              label="单据编号"
              width="150px;"
              v-if="status=='0'||status=='3'"
            ></el-table-column>
            <el-table-column prop="type1" label="业务类别" v-if="status=='0'||status=='3'"></el-table-column>
            <el-table-column prop="maker" label="制单人" sortable v-if="status=='0'||status=='3'"></el-table-column>
            <el-table-column prop="sales" label="销售员" sortable v-if="status=='0'||status=='5'"></el-table-column>
            <el-table-column
              prop="kid"
              label="客户"
              sortable
              v-if="status=='0'||status=='3'||status=='4'"
            ></el-table-column>
            <el-table-column
              prop="warehouse"
              label="仓库"
              width="150px;"
              sortable
              v-if="status=='0'||status=='1'||status=='3'||status=='2'"
            ></el-table-column>

            <el-table-column prop="style" label="款式" v-if="status=='0'||status=='1'||status=='2'"></el-table-column>
            <el-table-column
              prop="material"
              label="材质"
              v-if="status=='0'||status=='1'||status=='2'"
            ></el-table-column>
            <el-table-column prop="season" label="季节" v-if="status=='0'||status=='1'||status=='2'"></el-table-column>
            <el-table-column prop="year" label="年份" v-if="status=='0'||status=='1'||status=='2'"></el-table-column>
            <el-table-column
              prop="set_account"
              width="150px;"
              label="结算账户"
              sortable
              v-if="status=='0'||status=='3'"
            ></el-table-column>
            <el-table-column
              prop="total"
              width="150px;"
              label="单据总金额"
              v-if="status=='0'||status=='3'"
            ></el-table-column>

            <el-table-column prop="small" label="抹零金额" v-if="status=='3'"></el-table-column>
            <el-table-column prop="money" label="其他费用" v-if="status=='3'"></el-table-column>
            <el-table-column prop="type" label="其他账目类型" v-if="status=='3'"></el-table-column>

            <el-table-column
              prop="payment"
              label="实收金额"
              width="150px;"
              v-if="status=='0'||status=='3'"
            ></el-table-column>

            <el-table-column
              prop="create_time"
              width="180px;"
              label="单据日期"
              sortable
              v-if="status=='0'||status=='3'"
            ></el-table-column>
            <el-table-column
              prop="wareStore"
              width="150px;"
              label="仓库所属门店"
              v-if="status=='0'||status=='3'"
            ></el-table-column>
            <el-table-column
              prop="saleStore"
              label="销售员所属门店"
              width="150px;"
              v-if="status=='0'||status=='3'||status=='5'||status=='6'||status=='7'"
            ></el-table-column>
            <el-table-column prop="des" width="150px;" label="单据备注" v-if="status=='0'||status=='3'"></el-table-column>
            <el-table-column prop="dess" label="单品备注" v-if="status=='0'"></el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            background
            style="margin-top:20px;"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="查询" :visible.sync="dialogVisible" width="40%">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="商品" v-if="status=='0'||status=='1'||status=='2'">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类" v-if="status=='0'||status=='1'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.category">
            <el-option :label="item.name" :value="item.id" v-for="item in cates" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" v-if="status=='0'||status=='1'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.brand">
            <el-option :label="item.name" :value="item.id" v-for="item in brands" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库" v-if="status=='0'||status=='1'||status=='2'||status=='3'">
          <el-select clearable filterable v-model="ruleForm.warehouse">
            <el-option :label="item.name" :value="item.id" v-for="item in warehs" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户" v-if="status=='0'||status=='2'||status=='3'||status=='4'">
          <el-select clearable filterable v-model="ruleForm.kid">
            <el-option :label="item.name" :value="item.id" v-for="item in users" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="仓库所属门店"
          v-if="status=='0'||status=='1'||status=='2'||status=='3'||status=='4'||status=='5'||status=='7'"
        >
          <el-select clearable filterable v-model="ruleForm.store">
            <el-option :label="item.name" :value="item.id" v-for="item in stores" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制单人" v-if="status=='0'||status=='3'">
          <el-select clearable filterable v-model="ruleForm.maker">
            <el-option :label="item.name" :value="item.id" v-for="item in makers" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售员" v-if="status=='0'||status=='2'||status=='3'||status=='5'">
          <el-select clearable filterable v-model="ruleForm.sales">
            <el-option :label="item.name" :value="item.id" v-for="item in sales" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="结算账户" v-if="status=='0'||status=='3'">
          <el-select clearable filterable v-model="ruleForm.set_account">
            <el-option :label="item.name" :value="item.id" v-for="item in acounts" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="销售员所属门店" v-if="status=='0'||status=='3'||status=='5'||status=='6'">
          <el-select clearable filterable v-model="ruleForm.s_store">
            <el-option :label="item.name" :value="item.id" v-for="item in stores" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="颜色" v-if="status=='0'||status=='1'">
          <el-select clearable filterable v-model="ruleForm.color">
            <el-option :label="item.name" :value="item.id" v-for="item in colors" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="尺码" v-if="status=='0'||status=='1'">
          <el-select clearable filterable v-model="ruleForm.sizes">
            <el-option :label="item.name" :value="item.id" v-for="item in sizes" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="款式" v-if="status=='0'||status=='1'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.style">
            <el-option :label="item.name" :value="item.id" v-for="item in styles" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="材质" v-if="status=='0'||status=='1'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.material">
            <el-option :label="item.name" :value="item.id" v-for="item in maters" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位" v-if="status=='0'||status=='1'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.unit">
            <el-option :label="item.name" :value="item.id" v-for="item in units" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年份" v-if="status=='0'||status=='1'||status=='2'">
          <el-date-picker v-model="ruleForm.year" type="year" placeholder="选择年"></el-date-picker>
        </el-form-item>
        <el-form-item label="季节" v-if="status=='0'||status=='1'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.season">
            <el-option :label="item.name" :value="item.id" v-for="item in seasons" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单号" v-if="status=='0'||status=='3'">
          <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item
          label="状态"
          v-if="status=='0'||status=='1'||status=='2'||status=='3'||status=='4'||status=='5'||status=='6'||status=='7'"
        >
          <el-select clearable filterable v-model="ruleForm.status">
            <el-option :label="item.name" :value="item.id" v-for="item in puchType" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  SaleSingle,
  SaleGoods,
  SaleBill,
  SaleCustom,
  SalePerson,
  SaleStore,
  WareStore,
  Sale,
  CategoryList,
  BrandList,
  supplierList,
  getCacheSize,
  SeasonList,
  MaterialList,
  getGroupSpec,
  UnitList,
  userList,
  getAllMaker,
  getAllSales,
  getSetAcount
} from "@/api/index";
import { warehouseSelectList, storeList } from "@/api/api";
import http from "@/utils/request";
import selectaDate from "@/components/select-date";
export default {
  components: {
    selectaDate
  },
  data() {
    return {
      status: 0,
      value1: "",
      region: "",
      total: 0,
      cates: [],
      brands: [],
      warehs: [],
      acounts: [],
      sales: [],
      supps: [],
      stores: [],
      seasons: [],
      maters: [],
      styles: [],
      sizes: [],
      colors: [],
      makers: [],
      users: [],
      units: [],
      makers: [],
      baseData: {
        saleNum: 0,
        money: 0,
        profit: 0,
        rate: 0
      },
      puchStatus: [
        { id: 0, name: "销售明细" },
        { id: 1, name: "按照单品汇总" },
        { id: 2, name: "按商品汇总" },
        { id: 3, name: "按单据汇总" },
        { id: 4, name: "按客户汇总" },
        { id: 5, name: "按销售员汇总" },
        { id: 6, name: "按销售员所属门店汇总" },
        { id: 7, name: "按仓库所属门店汇总" }
      ],
      puchType: [
        { id: 1, name: "已出库" },
        { id: 2, name: "撤销" },
        { id: 3, name: "草稿" }
      ],
      dialogVisible: false,

      tableData: [],
      selectData: "",
      ruleForm: {
        status: "",
        name: "",
        category: "",
        brand: "",
        warehouse: "",
        supplier: "",
        store: "",
        maker: "",
        color: "",
        sizes: "",
        style: "",
        material: "",
        unit: "",
        year: "",
        season: "",
        number: ""
      }
    };
  },
  filters: {},
  mounted() {
    this.getDate(1);
  },
  created() {
    this.getSelectDate();
  },
  methods: {
    handleCurrentChange(e) {
      this.getDate(e);
    },
    goAdd() {
      this.$router.push({ path: "/sale/order_add" });
    },
    handleClick(row) {
      console.log(row);
    },
    getSelectDate() {
      getSetAcount().then(res => {
        this.acounts = res.data;
      });

      getAllSales().then(res => {
        this.sales = res.data;
      });
      getAllMaker().then(res => {
        this.makers = res.data;
      });
      userList(1, 100000).then(res => {
        this.users = res.data.data;
      });
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
      // 供应商

      supplierList({ page: 1, size: 100000 }).then(res => {
        this.supps = res.data.data;
      });
      // 门店
      storeList({ page: 1, size: 100000 }).then(res => {
        this.stores = res.data;
      });
      // 采购员
      // 材质
      MaterialList({ page: 1, size: 100000 }).then(res => {
        this.maters = res.data.data;
      });
      // 季节
      SeasonList({ page: 1, size: 100000 }).then(res => {
        this.seasons = res.data.data;
      });
      UnitList({ page: 1, size: 100000 }).then(res => {
        this.units = res.data.data;
      });
      // 颜色  1颜色    2尺码    5款式
      getGroupSpec(1).then(res => {
        res.data.forEach(val => {
          if (val.son && val.son.length > 0) {
            val.son.forEach(item => this.colors.push(item));
          }
        });
      });
      // 尺码
      getGroupSpec(2).then(res => {
        res.data.forEach(val => {
          if (val.son && val.son.length > 0) {
            val.son.forEach(item => this.sizes.push(item));
          }
        });
      });
      // 款式
      getGroupSpec(5).then(res => {
        res.data.forEach(val => {
          if (val.son && val.son.length > 0) {
            val.son.forEach(item => this.styles.push(item));
          }
        });
      });
    },
    submitForm() {
      this.getDate(1);
      this.dialogVisible = false;
    },
    getDate(page) {
      //  status  0,  销售明细   1,  "按照单品汇总"    2,  "按商品汇总"    3,   "按单据汇总"  4,   "按客户汇总"   5,   "按销售员汇总" 6 按销售员所属门店汇总 7按仓库所属门店汇总
      let httpName = "";
      let parmas = {};

      switch (this.status) {
        case 0:
          httpName = Sale;
          parmas = this.ruleForm;

          break;
        case 1:
          httpName = SaleSingle;
          parmas = {
            name: this.ruleForm.name,
            category: this.ruleForm.category,
            brand: this.ruleForm.brand,
            warehouse: this.ruleForm.warehouse,
            store: this.ruleForm.store,

            color: this.ruleForm.color,
            sizes: this.ruleForm.sizes,
            style: this.ruleForm.style,
            material: this.ruleForm.material,
            unit: this.ruleForm.unit,
            year: this.ruleForm.year,
            season: this.ruleForm.season,

            status: this.ruleForm.status
          };
          break;
        case 2:
          httpName = SaleGoods;
          parmas = {
            name: this.ruleForm.name,
            category: this.ruleForm.category,
            brand: this.ruleForm.brand,
            warehouse: this.ruleForm.warehouse,
            kid: this.ruleForm.kid,
            store: this.ruleForm.store,
            sales: this.ruleForm.sales,
            style: this.ruleForm.style,
            material: this.ruleForm.material,
            unit: this.ruleForm.unit,
            year: this.ruleForm.year,
            season: this.ruleForm.season,

            status: this.ruleForm.status
          };
          break;
        case 3:
          httpName = SaleBill;
          parmas = {
            warehouse: this.ruleForm.warehouse,
            kid: this.ruleForm.kid,
            store: this.ruleForm.store,
            maker: this.ruleForm.maker,
            sales: this.ruleForm.sales,
            set_account: this.ruleForm.set_account,
            s_store: this.ruleForm.s_store,
            number: this.ruleForm.number,
            status: this.ruleForm.status
          };
          break;
        case 4:
          httpName = SaleCustom;
          parmas = {
            kid: this.ruleForm.kid,
            store: this.ruleForm.store,

            status: this.ruleForm.status
          };
          break;
        case 5:
          httpName = SalePerson;
          parmas = {
            sales: this.ruleForm.sales,
            store: this.ruleForm.store,
            s_store: this.ruleForm.s_store,
            status: this.ruleForm.status
          };
          break;
        case 6:
          httpName = SaleStore;
          parmas = {
            s_store: this.ruleForm.s_store,

            status: this.ruleForm.status
          };
          break;
        case 7:
          httpName = WareStore;
          parmas = {
            store: this.ruleForm.store,

            status: this.ruleForm.status
          };
          break;
          return httpName;
      }
      parmas.year = this.ruleForm.year.slice(0, 4);

      httpName({
        page: page,
        size: 10,
        start_time: this.$refs.datePicker.start_time,
        end_time: this.$refs.datePicker.end_time,
        ...parmas
      }).then(res => {
        this.tableData = res.list.data;
        this.baseData = {
          saleNum: res.list.saleNum,
          money: res.list.money,
          profit: res.list.profit,
          rate: res.list.rate
        };
        this.total = res.list.total;
      });
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
    margin-right: 166px;
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
