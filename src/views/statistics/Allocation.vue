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
                <p>调拨单品数：{{baseData.single}}</p>
                <p>调拨商品数：{{baseData.goods}}</p>
                <p>调拨总数量：{{baseData.num}}</p>
                <p>调入仓库数：{{baseData.wareIn}}</p>
                <p>调出仓库数：{{baseData.wareOut}}</p>
              </div>
            </div>
          </div>

          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column width="150px" prop="number" label="单号" v-if="status=='0'||status=='1'"></el-table-column>
            <el-table-column prop="status" label="状态" v-if="status=='0'||status=='1'"></el-table-column>
            <el-table-column
              width="180px"
              prop="create_time"
              label="调拨时间"
              v-if="status=='0'||status=='1'"
            ></el-table-column>
            <el-table-column prop="name" label="名称" v-if="status=='0'||status=='2'"></el-table-column>
            <el-table-column width="150px" prop="item" label="货号" v-if="status=='0'||status=='2'"></el-table-column>
            <el-table-column
              width="150px"
              prop="goods_code"
              label="条码"
              v-if="status=='0'||status=='2'"
            ></el-table-column>
            <el-table-column prop="brand" label="品牌" v-if="status=='0'||status=='2'"></el-table-column>
            <el-table-column prop="category" label="分类" v-if="status=='0'||status=='2'"></el-table-column>

            <el-table-column prop="color" label="颜色" v-if="status=='0'"></el-table-column>
            <el-table-column prop="size" label="尺码" v-if="status=='0'"></el-table-column>
            <el-table-column prop="unit" label="单位" v-if="status=='0'||status=='2'"></el-table-column>
            <el-table-column prop="warehouse" label="仓库" v-if="status=='3'"></el-table-column>
            <el-table-column width="150px" prop="state" label="调入/调出" v-if="status=='3'"></el-table-column>
            <el-table-column
              prop="allotNum"
              label="调拨数量"
              v-if="status=='0'||status=='1'||status=='2'||status=='3'"
            ></el-table-column>

            <el-table-column prop="outName" label="调出仓库" v-if="status=='0'||status=='1'"></el-table-column>
            <el-table-column prop="inName" label="调入仓库" v-if="status=='0'||status=='1'"></el-table-column>
            <el-table-column prop="maker" label="调拨人" v-if="status=='0'||status=='1'"></el-table-column>

            <el-table-column prop="style" label="款式" v-if="status=='0'||status=='2'"></el-table-column>
            <el-table-column prop="material" label="材质" v-if="status=='0'||status=='2'"></el-table-column>
            <el-table-column prop="season" label="季节" v-if="status=='0'||status=='2'"></el-table-column>
            <el-table-column prop="year" label="年份" v-if="status=='0'||status=='2'"></el-table-column>
            <el-table-column prop="year" label="备注" v-if="status=='0'||status=='1'"></el-table-column>
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
    <el-dialog title="查询" :visible.sync="dialogVisible" width="38%">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="单号" v-if="status=='0'||status=='1'">
          <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="商品" v-if="status=='0'||status=='2'">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="调出仓库" v-if="status=='0'||status=='1'">
          <el-select v-model="ruleForm.call_out" clearable filterable>
            <el-option :label="item.name" :value="item.id" v-for="item in warehs" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调入仓库" v-if="status=='0'||status=='1'">
          <el-select v-model="ruleForm.call_in" clearable filterable>
            <el-option :label="item.name" :value="item.id" v-for="item in warehs" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调拨人" v-if="status=='0'||status=='1'">
          <el-select v-model="ruleForm.maker" clearable filterable>
            <el-option :label="item.name" :value="item.id" v-for="item in makers" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" v-if="status=='1'">
          <el-input v-model="ruleForm.des"></el-input>
        </el-form-item>
        <el-form-item label="分类" v-if="status=='0'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.category">
            <el-option :label="item.name" :value="item.id" v-for="item in cates" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" v-if="status=='0'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.brand">
            <el-option :label="item.name" :value="item.id" v-for="item in brands" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="颜色" v-if="status=='0'">
          <el-select clearable filterable v-model="ruleForm.color">
            <el-option :label="item.name" :value="item.id" v-for="item in colors" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="尺码" v-if="status=='0'">
          <el-select clearable filterable v-model="ruleForm.sizes">
            <el-option :label="item.name" :value="item.id" v-for="item in sizes" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="款式" v-if="status=='0'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.style">
            <el-option :label="item.name" :value="item.id" v-for="item in styles" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="材质" v-if="status=='0'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.material">
            <el-option :label="item.name" :value="item.id" v-for="item in maters" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位" v-if="status=='0'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.unit">
            <el-option :label="item.name" :value="item.id" v-for="item in units" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年份" v-if="status=='0'||status=='2'">
          <el-date-picker v-model="ruleForm.year" type="year" placeholder="选择年"></el-date-picker>
        </el-form-item>
        <el-form-item label="季节" v-if="status=='0'||status=='2'">
          <el-select clearable filterable v-model="ruleForm.season">
            <el-option :label="item.name" :value="item.id" v-for="item in seasons" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" v-if="status=='0'||status=='1'||status=='2'||status=='3'">
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
  Allot,
  AllotBill,
  AllotGoods,
  AllotWare,
  CategoryList,
  BrandList,
  supplierList,
  getCacheSize,
  SeasonList,
  MaterialList,
  getGroupSpec,
  UnitList,
  getAllMaker
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
      supps: [],
      stores: [],
      seasons: [],
      maters: [],
      styles: [],
      makers: [],
      sizes: [],
      colors: [],
      makers: [],
      units: [],
      baseData: {
        single: 0,
        goods: 0,
        num: 0,
        wareIn: 0,
        wareOut: 0
      },
      puchStatus: [
        { id: 0, name: "调拨明细" },
        { id: 1, name: "按照调拨单汇总" },
        { id: 2, name: "按商品汇总" },
        { id: 3, name: "按仓库汇总" }
      ],
      puchType: [
        { id: 1, name: "已调拨" },
        { id: 2, name: "撤销" },
        { id: 3, name: "草稿" }
      ],
      dialogVisible: false,

      tableData: [],
      selectData: "",
      ruleForm: {
        number: "",
        name: "",
        call_out: "",
        call_in: "",
        maker: "",
        des: "",

        category: "",
        brand: "",

        color: "",
        sizes: "",
        style: "",
        material: "",
        unit: "",
        year: "",
        season: "",
        status: ""
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

    handleClick(row) {
      console.log(row);
    },
    getSelectDate() {
      getAllMaker().then(res => {
        this.makers = res.data;
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
      //  status  0,  调拨明细   1,  "按照调拨单汇总"    2,  "按商品汇总"    3,   "按照仓库汇总"
      let httpName = "";
      let parmas = {};

      switch (this.status) {
        case 0:
          httpName = Allot;
          parmas = this.ruleForm;

          break;
        case 1:
          httpName = AllotBill;
          parmas = {
            number: this.ruleForm.number,
            call_out: this.ruleForm.call_out,
            call_in: this.ruleForm.call_in,
            maker: this.ruleForm.maker,
            status: this.ruleForm.status
          };
          break;
        case 2:
          httpName = AllotGoods;
          parmas = {
            name: this.ruleForm.name,

            category: this.ruleForm.category,
            brand: this.ruleForm.brand,

            material: this.ruleForm.material,
            unit: this.ruleForm.unit,
            year: this.ruleForm.year,
            season: this.ruleForm.season,

            status: this.ruleForm.status
          };
          break;
        case 3:
          httpName = AllotWare;
          parmas = {
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
          single: res.list.single,
          goods: res.list.goods,
          wareIn: res.list.wareIn,
          wareOut: res.list.wareOut,

          num: res.list.num
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
