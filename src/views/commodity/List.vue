
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <el-button type="primary" @click="goAdd">新建</el-button>
            <el-button type="primary">打印条码</el-button>
          </div>
          <div class="center">
            <span>商品：</span>
            <el-input class="searchInput" v-model="searchName" placeholder="名称、货号、条码"></el-input>
            <span>分类：</span>
            <el-select v-model="selectClass" placeholder="请选择" clearable>
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in classMore"
                :key="item.id"
              ></el-option>
            </el-select>
            <span>品牌：</span>
            <el-select v-model="selectBrand" placeholder="请选择" clearable>
              <el-option :label="item.name" :value="item.id" v-for="item in brands" :key="item.id"></el-option>
            </el-select>
            <span>状态：</span>
            <el-select v-model="selectStatus" placeholder="请选择" clearable>
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>

            <el-button type="primary" @click="search">查询</el-button>
          </div>
          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%" size="mini">
            <el-table-column label="操作" width="150px;" fixed>
              <template slot-scope="scope">
                <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="copy(scope.row)" type="text" size="small">复制</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="item" label="货号"></el-table-column>
            <el-table-column prop="goods_code" label="条码"></el-table-column>
            <el-table-column prop="products" label="图片">
              <template slot-scope="scope">
                <template v-if="scope.row.images">
                  <img :src="scope.row.images[0]" alt style="width:50px;" />
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="brand.brand_name" label="品牌"></el-table-column>
            <el-table-column prop="category.cate_name" label="分类"></el-table-column>
            <el-table-column prop="colors" label="颜色"></el-table-column>

            <el-table-column prop="sizes" label="尺码"></el-table-column>
            <el-table-column prop="num" label="包装数"></el-table-column>
            <el-table-column prop="trade_price" label="批发价"></el-table-column>

            <el-table-column prop="retail_price" label="零售价"></el-table-column>
            <el-table-column prop="recom_price" label="厂家建议零售价"></el-table-column>
            <el-table-column prop="styles" label="款式"></el-table-column>
            <el-table-column prop="material.material_name" label="材质"></el-table-column>
            <el-table-column prop="season.season_name" label="季节"></el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope">
                <template v-if="scope.row.sex==1">女款</template>
                <template v-if="scope.row.sex==0">男款</template>
                <template v-if="scope.row.sex==2">通款</template>
              </template>
            </el-table-column>
            <el-table-column prop="year" label="年份"></el-table-column>
            <el-table-column prop="mini" label="起订量">
              <template slot-scope="scope">
                <template
                  v-if="scope.row.products.length>0&&scope.row.products[0].mini"
                >{{scope.row.products[0].mini}}</template>
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>

            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="stock_upper" label="库存预警（上）">
              <template slot-scope="scope">
                <template
                  v-if="scope.row.products.length>0&&scope.row.products[0].stock_upper"
                >{{scope.row.products[0].stock_upper}}</template>
              </template>
            </el-table-column>
            <el-table-column prop="stock_lower" label="库存预警（下）">
              <template slot-scope="scope">
                <template
                  v-if="scope.row.products.length>0&&scope.row.products[0].stock_lower"
                >{{scope.row.products[0].stock_lower}}</template>
              </template>
            </el-table-column>
            <el-table-column prop="remarks" label="备注"></el-table-column>
          </el-table>
          <el-pagination
            background
            style="margin-top:20px;"
            layout="total,prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { goodsList, goodsDel, CategoryList, BrandList } from "@/api/index";
import http from "@/utils/request";
export default {
  data() {
    return {
      total: 0,
      tableData: [],
      brands: [],
      classMore: [],
      searchName: "",
      selectClass: "",
      selectBrand: "",
      selectStatus: ""
    };
  },
  created() {
    this.getGoods(1);
    this.getSelectData();
  },
  methods: {
    search() {
      this.getGoods(1);
    },
    handleCurrentChange(e) {
      this.getGoods(e);
    },
    goAdd() {
      this.$router.push({ path: "/commodity/add", query: {pageType: 2} });
    },
    //   删除
    del(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsDel(e.id).then(res => {
            this.getGoods(1);
          });
        })
        .catch(() => {});
    },
    // 编辑
    edit(e) {
      this.$router.push({ path: "/commodity/add", query: { id: e.id, pageType: '3' } });
    },
    // 复制
    copy(e) {},
    getSelectData() {
      CategoryList({ page: 1, size: 1000000 }).then(res => {
        this.classMore = res.data.data;
      });
      BrandList({ page: 1, size: 1000000 }).then(res => {
        this.brands = res.data.data;
      });
    },
    getGoods(page) {
      goodsList({
        params: {
          page: page,
          size: 10,
          status: this.selectStatus,
          name: this.searchName,
          brand: this.selectBrand,
          category: this.selectClass
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;
          this.tableData.forEach(val => {
            val.images = val.images
              ? val.images.map(item => process.env.BASE_API + "" + item)
              : [];
            val.styles = val.products.map(item => item.style + "，");
            val.colors = val.products.map(item => item.color + "，");
            val.sizes = val.products.map(item => item.size + "，");
          });
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.searchInput {
  width: 190px;
}
.date {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-right: 16px;
  }
  .datepicker {
    margin-left: 16px;
  }
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


 
