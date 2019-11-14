<template>
  <div>
    <div class="management-status">
      <div class="box-card">
        <div class="box-card-header">
          <h5 class="sales-Order">分销佣金</h5>
        </div>
        <div class="box-card-body">
          <el-card class="box-card">
            <el-checkbox v-model="status">启用</el-checkbox>
            <div class="row">
              <span>一级分销--佣金收益率</span>
              <el-input v-model="first_retail"></el-input>
              <span>%</span>
            </div>
            <div class="row">
              <span>二级分销--佣金收益率</span>
              <el-input v-model="two_retail"></el-input>
              <span>%</span>
            </div>
          </el-card>
        </div>
      </div>
      <div class="box-card">
        <div class="box-card-header">
          <h5 class="sales-Order">适用商品</h5>
        </div>
        <div class="box-card-body">
          <el-card class="box-card">
            <el-radio-group v-model="checked1">
              <el-radio :label="0">全部商品</el-radio>
              <el-radio :label="1">部分商品 使用分销的商品：{{selectGood.length?selectGood.length:0}}</el-radio>
            </el-radio-group>
            <el-button type="text" v-if="checked1=='1'" @click="dialogVisible2=true">设置</el-button>
          </el-card>
        </div>
      </div>

      <div class="box-card">
        <div class="box-card-header">
          <h5 class="sales-Order">适用客户</h5>
        </div>
        <div class="box-card-body">
          <el-card class="box-card">
            <el-radio-group v-model="checked2">
              <el-radio :label="0">全部客户</el-radio>
              <el-radio :label="item.id" v-for="item in cates" :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
            <el-button type="text" @click="goCates">管理客户分类</el-button>
          </el-card>
        </div>
      </div>
      <div class="box-card">
        <div class="box-card-header">
          <h5 class="sales-Order">分销资质</h5>
        </div>
        <div class="box-card-body">
          <el-card class="box-card">
            <el-radio-group v-model="checked3">
              <el-radio :label="0">全部客户</el-radio>
              <el-radio
                :label="1"
              >部分客户 拥有分销资质的客户：{{selectCatesData.length?selectCatesData.length:0}}</el-radio>
            </el-radio-group>
            <el-button type="text" v-if="checked3=='1'" @click="dialogVisible3=true">设置</el-button>
            <div style="margin-top:30px;display: flex;    justify-content: center;">
              <el-button @click="saveDis">保存</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <el-dialog title="批量设置分销使用的商品" :visible.sync="dialogVisible2" :close-on-click-modal="false">
      <GoodList
        :Orderstatus="4"
        ref="goodTable"
        :good="selectGood"
        @closeModel="closeModel"
        @selectGoods="selectGoods"
      ></GoodList>
    </el-dialog>
    <el-dialog title="设置具有分销资质的用户" :visible.sync="dialogVisible3">
      <Cuslist ref="cuslistTable" @closeModel="closeModel" @selectCates="selectCates" :cus="selCus"></Cuslist>
    </el-dialog>
  </div>
</template>

<script>
import { customerCategoryList, retailEdit, retailInfo } from "@/api/index";
import http from "@/utils/request";
import GoodList from "@/components/GoodList";
import Cuslist from "@/components/Cuslist";
export default {
  components: {
    GoodList,
    Cuslist
  },
  data() {
    return {
      selectGood: [],
      dialogVisible2: false,
      dialogVisible: false,
      dialogVisible3: false,
      status: "",
      first_retail: "",
      two_retail: "",
      cates: [],
      checked3: 0,
      checked2: 0,
      checked1: 0,
      selCus: [],
      searchList: [
        { id: 2, name: "日" },
        { id: 3, name: "周" },
        { id: 4, name: "月" },
        { id: 5, name: "年" }
      ],
      selectGood: [],
      selectCatesData: []
    };
  },
  created() {
    this.getBaseData();
  },
  mounted() {
    retailInfo().then(res => {
      if (res) {
        this.status = res.data.status == 1 ? true : false;
        this.checked2 = Number(res.data.custom[0]);

        this.first_retail = res.data.first_retail;
        this.two_retail = res.data.two_retail;

        if (res.data.goods.length == 0) {
          this.checked1 = 0;
        } else {
          this.checked1 = 1;

          this.selectGood = res.data.goods;
        }
        if (res.data.zizhi.length == 0) {
          this.checked3 = 0;
        } else {
          this.checked3 = 1;
          this.selCus = res.data.zizhi;
          this.selectCatesData = res.data.zizhi;
        }
      }
    });
  },
  methods: {
    async saveDis() {
      let status = this.status ? "1" : "2";
      let goods;
      let zizhi;
      if (this.checked1 == 0) {
        goods = "0";
      } else {
        goods = this.selectGood
          ? this.selectGood.map(val => val.id).toString()
          : "0";
      }
      if (this.checked3 == 0) {
        zizhi = "0";
      } else {
        zizhi = this.selectCatesData
          ? this.selectCatesData.map(val => val.id).toString()
          : "0";
      }

      let res = await retailEdit({
        status: status,
        first_retail: this.first_retail,
        two_retail: this.two_retail,
        goods: goods,
        custom: this.checked2,
        zizhi: zizhi
      });
      if (res) {
        this.$message.success(res.msg);
      }
    },
    goCates() {
      this.$router.push({ path: "/customer/Class_cust" });
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
    selectCates(e) {
      this.selectCatesData = e;
    },
    selectGoods(e) {
      this.selectGood = e;
    },
    closeModel(e) {
      this.dialogVisible3 = e;
      this.dialogVisible2 = e;
    },
    searchTerm(id) {
      console.log(id);
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