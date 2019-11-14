


<template>
  <div>
    <!-- type:0新增  1编辑  2 详情 -->
    <el-button v-if="type==0||type==1" @click="dialogFormVisible2 = true">添加参与商品</el-button>
    <el-table :data="selectGoodTable" border style="width: 100%">
      <!-- <el-table-column prop="id" label="id"></el-table-column> -->
      <el-table-column prop="name" label="参与商品"></el-table-column>
      <el-table-column prop="color_name" label="颜色" v-if="status==3"></el-table-column>
      <el-table-column prop="size_name" label="尺码" v-if="status==3"></el-table-column>

      <el-table-column prop="original" label="原价" width="80"></el-table-column>
      <el-table-column prop="seckill_price" label="秒杀价" v-if="status==3">
        <template slot-scope="scope">
          <el-input
            v-if="type==0||type==1"
            v-model="scope.row.seckill_price"
            @blur="changeNum(scope.row,scope.$index,2)"
          ></el-input>
          <span v-else>{{scope.row.seckill_price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" v-if="status==3"></el-table-column>
      <el-table-column prop="seckill_num" label="秒杀数量" v-if="status==3">
        <template slot-scope="scope">
          <el-input
            v-if="type==0||type==1"
            v-model="scope.row.seckill_num"
            @blur="changeNum(scope.row,scope.$index,2)"
          ></el-input>
          <span v-else>{{scope.row.seckill_num}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="discount" label="折扣（%）" v-if="status==2">
        <template slot-scope="scope">
          <el-input
            v-if="type==0||type==1"
            v-model="scope.row.discount"
            @blur="changeNum(scope.row,scope.$index,1)"
          ></el-input>
          <span v-else>{{scope.row.discount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="discount_price" label="折后价" v-if="status==2">
        <template slot-scope="scope">
          <el-input
            v-if="type==0||type==1"
            v-model="scope.row.discount_price"
            @blur="changeNum(scope.row,scope.$index,2)"
          ></el-input>
          <span v-else>{{scope.row.discount_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" v-if="type==0||type==1">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="选择商品"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="false"
      append-to-body
    >
      <GoodList
        :Orderstatus="status"
        ref="goodTable"
        @closeModel="closeModel"
        @selectGoods="selectGoods"
      ></GoodList>
    </el-dialog>
  </div>
</template>
<script>
import {
  integralShop,
  customerCategoryListUse,
  BrandList,
  discountShop,
  productList
} from "@/api/index";
import GoodList from "@/components/GoodList";
export default {
  components: {
    GoodList
  },
  data() {
    return {
      name: "",

      dialogFormVisible2: false,
      category: "",

      rule: "",
      cates: [],
      brand: "",
      brands: [],

      dialogFormVisible: true,
      page: 1,
      multipleSelection: [],
      selectGoodTable: []
    };
  },
  //  type:0新增  1编辑  2 详情  status:0 客户积分 1 优惠券 2 限时折扣 3 秒杀
  props: ["goodTable", "type", "isShow", "status"],
  mounted() {
    this.selectGoodTable = this.goodTable;
  },
  created() {},
  watch: {
    goodTable(e) {
      this.selectGoodTable = e;
    },
    type(e) {}
  },
  methods: {
    changeNum(row, index, type) {
      if (type == 1) {
        row.discount_price =
          (Number(row.original) * Number(row.discount)) / 100;
      }
      if (type == 2) {
        row.discount =
          (Number(row.discount_price) / Number(row.original)) * 100;
      }
    },
    handleClick(e, index) {
      this.$confirm("是否删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.goodTable.splice(index, 1);
        this.$emit("selectGoodTable", this.selectGoodTable);
      });
    },
    closeModel(e) {
      this.dialogFormVisible2 = e;
    },
    async selectGoods(e) {
      if (this.status == 3) {
        await productList(JSON.parse(JSON.stringify(e[0].id))).then(res => {
          debugger;
          this.selectGoodTable = res.data.data;
        });
      } else {
        e.forEach(val => {
          this.selectGoodTable.push({
            id: val.id,
            name: val.name,
            original: val.price,
            discount: 100,
            discount_price: val.price
          });
        });
        let hash = {};
        this.selectGoodTable = this.selectGoodTable.reduce((item, next) => {
          if (!hash[next.id]) {
            hash[next.id] = true;
            item.push(next);
          }
          return item;
        }, []);
      }
      debugger;
      this.$emit("selectGoodTable", this.selectGoodTable);
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













