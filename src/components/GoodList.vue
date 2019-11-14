<template>
  <div>
    <div class="searBar">
      <span>商品</span>
      <el-input v-model="name"></el-input>
      <span>分类</span>
      <el-select v-model="category" placeholder="请选择" clearable filterable>
        <el-option :label="item.name" :value="item.id" v-for="item in cates" :key="item.id"></el-option>
      </el-select>
      <!-- <span>上架状态</span> -->
      <!-- <el-select v-model="status" placeholder="请选择">
        <el-option label="上架" value="0"></el-option>
        <el-option label="下架" value="1"></el-option>
      </el-select>-->

      <span>品牌</span>
      <el-select v-model="brand" placeholder="请选择" clearable filterable>
        <el-option :label="item.name" :value="item.id" v-for="item in brands" :key="item.id"></el-option>
      </el-select>
      <br />
      <span v-if="Orderstatus=='0'">当前积分规则</span>
      <el-select v-if="Orderstatus=='0'" v-model="rule" placeholder="请选择" clearable filterable>
        <el-option :label="item.name" :value="item.id" v-for="item in rules" :key="item.id"></el-option>
      </el-select>
      <el-button type="primary" @click="search">查询</el-button>
    </div>

    <el-table
      :data="gridData"
      row-key="id"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column property="category" v-if="Orderstatus==0" label="分类"></el-table-column>
      <el-table-column property="brand" v-if="Orderstatus==0" label="品牌"></el-table-column>
      <el-table-column property="name" label="名称"></el-table-column>
      <el-table-column property="price" label="价格" v-if="Orderstatus==2||Orderstatus==1"></el-table-column>
      <el-table-column property="rule" v-if="Orderstatus==0" label="当前积分规则"></el-table-column>
      <el-table-column property="status" label="上架状态"></el-table-column>
      <el-table-column property="images" v-if="Orderstatus==0" label="图片">
        <template slot-scope="scope" v-if="scope.row.images">
          <img :src="scope.row.images[0]" alt style="width:50px;" />
        </template>
      </el-table-column>
      <el-table-column property="goods_code" v-if="Orderstatus=='0'" label="条码"></el-table-column>

      <el-table-column property="item" label="货号"></el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top:20px;"
      layout="total,prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="saveGood">确 定</el-button>
    </div>
  </div>
</template>
<script>
import {
  integralShop,
  customerCategoryListUse,
  BrandList,
  discountShop,
  commodityList,
  integral
} from "@/api/index";
export default {
  data() {
    return {
      loading: false,
      count: 10,
      name: "",
      category: "",
      status: 0,
      rule: "",
      cates: [],
      brand: "",
      brands: [],
      gridData: [],
      dialogFormVisible: true,
      page: 1,
      total: 0,
      rules: [],
      multipleSelection: []
    };
  },
  // status : status:0 客户积分 1 优惠券 2 限时折扣 3 秒杀 4 分校规则
  props: ["Orderstatus", "isShow", "good"],
  mounted() {
    this.getGood(this.page);
  },
  created() {
    this.getBaseData();
  },
  watch: {
    isShow(e) {
      // this.checked();
    },
    good(e) {
      // this.checked();
    },
    Orderstatus(e) {}
  },
  methods: {
    checked() {
      let a = [];

      if (this.Orderstatus == 0 || this.Orderstatus == 4) {
        this.good.forEach(item =>
          a.push(this.gridData.find(val => val.id == item.id))
        );
      }

      this.toggleSelection(a);
    },
    handleCurrentChange(e) {
      this.page = e;
      this.getGood(this.page);
    },

    closeModel() {
      this.$emit("closeModel", false);
    },
    saveGood() {
      this.$emit("closeModel", false);
      this.$emit("selectGoods", this.multipleSelection);
      // this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      if (this.Orderstatus == 3) {
        this.multipleSelection = val;
        this.$emit("closeModel", false);
        this.$emit("selectGoods", this.multipleSelection);
        this.$refs.multipleTable.clearSelection();
      } else {
        this.multipleSelection = val;
      }
    },
    search() {
      this.getGood(1);
    },
    getBaseData() {
      integral({ page: 1, size: 1000000 }).then(res => {
        this.rules = res.data.data;
      });

      customerCategoryListUse({ page: 1, size: 100000 }).then(res => {
        this.cates = res.data.data;
      });
      BrandList({ page: 1, size: 100000 }).then(res => {
        this.brands = res.data.data;
      });
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
    async getGood() {
      let parm = {
        name: this.name,
        category: this.category,
        status: this.status,
        brand: this.brand,
        page: this.page,
        size: 10
      };
      let res;
      if (this.Orderstatus == 0 || this.Orderstatus == 4) {
        res = await integralShop({ ...parm, rule: this.rule });
      }
      if (this.Orderstatus == 2 || this.Orderstatus == 1) {
        res = await discountShop({ ...parm });
      }
      if (this.Orderstatus == 3) {
        res = await commodityList({ ...parm });
      }

      this.gridData = res.data.data;
      this.total = res.data.total;

      this.gridData.forEach(val => {
        val.images = val.images
          ? val.images.map(item => process.env.BASE_API + "" + item)
          : [];
      });
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