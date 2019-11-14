<template>
  <div>
    <!-- 状态 1部分出库 2已撤销 3草稿 4已出售 5待出库 -->
    <div class="table_header" v-if="status=='3'">
      <span>扫码枪录入：</span>
      <el-input
        style="width:230px;margin-right:5px;"
        placeholder="请扫描商品或商品条形码"
        :disabled="this.type === 'look'"
      ></el-input>
      <p>选择产品后收订输入数量</p>
      <el-button type="primary" @click="addGood">新增商品</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%;font-size:14px;"
      size="small"
      :header-cell-style="{background:'rgba(247,247,247,1)'}"
    >
      <el-table-column key="1" type="index" width="50" label="序号"></el-table-column>

      <el-table-column key="2" label="操作" width="100" v-if="status!='5'">
        <template slot-scope="scope" v-if="status=='3'">
          <el-button @click="del(scope.row,scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>

      <el-table-column key="3" prop="des" label="退/销" width="120" v-if="orderType==1">
        <template slot-scope="scope">
          <el-switch
            v-if="status=='3'"
            v-model="scope.row.goods_status"
            active-text="退"
            inactive-text="销"
            active-value="0"
            inactive-value="1"
            @change="checkNum(scope.row,scope)"
          ></el-switch>

          <span v-else>
            <template v-if="scope.row.goods_status=='0'">退</template>
            <template v-if="scope.row.goods_status=='1'">销</template>
          </span>
        </template>
      </el-table-column>

      <el-table-column key="4" prop="name" label="商品"></el-table-column>

      <el-table-column key="6" prop="item" label="货号"></el-table-column>

      <el-table-column key="7" prop="goods_code" label="条码"></el-table-column>
      <el-table-column key="8" prop="color" label="颜色"></el-table-column>
      <el-table-column key="9" prop="size" label="尺码"></el-table-column>
      <el-table-column key="10" prop="unit" label="单位"></el-table-column>
      <el-table-column key="11" prop="put_number" label="数量" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="status=='3'"
            v-model="scope.row.put_number"
            style="width:90px;"
            @blur="checkNum(scope.row,scope)"
          ></el-input>
          <span v-else>{{scope.row.put_number}}</span>
        </template>
      </el-table-column>

      <el-table-column key="12" v-if="status=='5'" prop="num" label="出库数量" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.num" style="width:90px;" @blur="checkNum(scope.row,scope)"></el-input>
        </template>
      </el-table-column>

      <el-table-column key="13" prop="price" label="单价" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="status=='3'"
            v-model="scope.row.price"
            style="width:90px;"
            @blur="checkNum(scope.row,scope)"
          ></el-input>
          <span v-else>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column key="14" prop="discount" label="折扣%" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="status=='3'"
            v-model="scope.row.discount"
            style="width:90px;"
            @blur="checkNum(scope.row,scope)"
          ></el-input>
          <span v-else>{{scope.row.discount}}</span>
        </template>
      </el-table-column>
      <el-table-column key="15" prop="discount_price" label="折后价"></el-table-column>
      <el-table-column key="16" prop="money" label="金额"></el-table-column>
      <el-table-column key="17" prop="discount_money" label="折后金额"></el-table-column>
    </el-table>
    <div class="orderAllnumber">
      <div class="title_name">合计</div>
      <div>
        <div>
          <span v-if="return_number.money>0" class="all1">退销相抵，应付金额：{{return_number.money}}</span>
          <span v-if="return_number.money<=0" class="all1">退销相抵，应收金额：{{-return_number.money}}</span>
          <span class="all2">退货合计：{{return_number.number}}</span>
          <span class="all3">{{return_number.allNumber}}</span>
          <span class="all4">{{return_number.afterNumber}}</span>
        </div>
        <div>
          <span v-if="sale_number.money>0" class="all1">退销相抵，折后应付金额：{{sale_number.money}}</span>
          <span v-if="sale_number.money<=0" class="all1">退销相抵，折后应收金额：{{-sale_number.money}}</span>

          <span class="all2">销售合计：{{sale_number.number}}</span>
          <span class="all3">{{sale_number.allNumber}}</span>
          <span class="all4">{{sale_number.afterNumber}}</span>
        </div>
      </div>
    </div>
    <el-dialog title="选择商品" :visible.sync="dialogVisible" width="40%">
      <div class="goodList">
        <div>
          <el-input v-model="saercGood" style="width:300px;" placeholder="货号、名称、条码"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div style="margin-top:20px;">
          <div
            v-for="item in goods"
            :key="item.id"
            @click="selsctGood(item)"
            class="goodDiv"
          >{{item.name }}</div>
          <p></p>
        </div>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="goodtotal"
          @current-change="totalChange"
        ></el-pagination>
      </div>
    </el-dialog>

    <el-dialog :title="selectGood.name" :visible.sync="dialogVisible2" class="dialog-input-table">
      <div v-show="isFlag">
        <el-form>
          <el-button type="text" @click="setAll" class="set-btn">
            批量设置所有
            <i class="el-icon-edit el-input__icon" slot="suffix" @click="setAll"></i>
          </el-button>
          <span class="info">点击意颜色或尺码，可批量设置该颜色或尺码的数量</span>

          <el-form-item label="包装数 :" prop="Supplier" label-width="63px">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="!isFlag">
        <el-input placeholder="输入" v-model="form.input1"></el-input>
        <el-button type="primary" @click="set" style="margin-left: 20px">设置</el-button>
        <el-button type="primary" @click="cancleSet">取消</el-button>
      </div>

      <el-table
        :data="goodons"
        border
        style="font-size:14px;"
        size="small"
        :header-cell-style="{background:'rgba(247,247,247,1)'}"
      >
        <el-table-column prop="color" label="颜色" align="center"></el-table-column>
        <el-table-column prop="size" label="尺码" align="center"></el-table-column>
        <el-table-column prop="put_number" label="数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.put_number" style="width:90px;"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveLocal">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  goodsList,
  goodsOne,
  getSpec,
  getCacheSpec,
  getGoodsStock,
  getCacheColor,
  getCacheSize,
  getEditProduct,
  saleMessage,
  saleMessageGet,
  saleMessageDel
} from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus, enumSizes, enumColors } from "@/utils/enums";
export default {
  data() {
    return {
      isFlag: true,
      isShow: false,
      index1: 0,
      content: "",
      form: {},
      dialogVisible4: false,
      dialogVisible4: false,
      goodons2: [],
      setColor: true,
      dialogVisible: false,
      dialogVisible2: false,
      showColor: false,
      key: "",

      selectGoodOne: {},
      goodtotal: 0,
      input: [],
      goodons: [],
      see: false,
      goods: [],
      msgList: [],
      sizes: [],
      value1: "",
      colors: [],
      colors2: [],
      value: "",
      region: "",
      saercGood: "", ///输入商品搜索
      orderStatus: enumSaleStatus,
      dialogImageUrl: "",
      selectGood: "",
      dialogVisible3: false,
      type: "",
      return_number: {
        money: 0,
        number: 0,
        allNumber: 0,
        afterNumber: 0
      },
      sale_number: {
        money: 0,
        number: 0,
        allNumber: 0,
        afterNumber: 0
      }
    };
  },
  // orderType 0 销售退货单  1 销售退货单 2 前台收银
  props: ["tableData", "status", "orderType", "storeGood"],
  filters: {},

  watch: {
    storeGood(e) {
      this.$store.commit("good", e);
    },
    tableData(e) {
      this.getChangeNum();
    }
  },
  mounted() {},

  created() {
    this.type = this.$route.query.type;
    this.getGoodList(1);

    this.$store.commit("good", []);
  },

  methods: {
    getChangeNum() {
      Object.assign(
        this.$data.return_number,
        this.$options.data().return_number
      );
      Object.assign(this.$data.sale_number, this.$options.data().sale_number);
      this.tableData.forEach(val => {
        if (val.goods_status && val.goods_status == "0") {
          this.return_number = {
            number: this.return_number.number + Number(val.put_number),
            allNumber: this.return_number.allNumber + Number(val.money),
            afterNumber:
              this.return_number.afterNumber + Number(val.discount_money)
          };
        } else if (val.goods_status && val.goods_status == "1") {
          this.sale_number = {
            number: this.sale_number.number + Number(val.put_number),
            allNumber: this.sale_number.allNumber + Number(val.money),
            afterNumber:
              this.sale_number.afterNumber + Number(val.discount_money)
          };
        }
      });
      this.return_number.money =
        this.sale_number.allNumber - this.return_number.allNumber;
      this.sale_number.money =
        this.sale_number.afterNumber - this.return_number.afterNumber;
      this.$emit("allNum", this.sale_number);
    },
    checkNum(item, cum) {
      item.discount_price = (Number(item.price) * Number(item.discount)) / 100;
      item.money = Number(item.price) * Number(item.put_number);
      item.discount_money =
        (Number(item.price) * Number(item.put_number) * Number(item.discount)) /
        100;

      let goods = this.$store.state.good;
      goods.forEach(val => {
        //如果单品id相等
        if (val.product_id == item.product_id) {
          val.put_number = item.put_number;
          val.discount_price = item.discount_price;
          val.money = item.money;
          val.discount_money = item.discount_money;
        }
      });

      this.$store.commit("good", goods);
      this.getChangeNum();
    },
    del(e, index) {
      this.tableData.splice(index, 1);
      this.$emit("goods", this.tableData);

      this.$store.commit(
        "good",
        (this.$store.state.good.find(val => val.id == e.id).put_number = 0)
      );
    },
    saveLocal() {
      this.goodons.forEach(val => {
        if (Number(val.put_number) > 0) {
          val.discount_price = (Number(val.price) * Number(val.discount)) / 100;
          val.money = Number(val.price) * Number(val.put_number);
          val.discount_money =
            (Number(val.price) *
              Number(val.put_number) *
              Number(val.discount)) /
            100;
        }
      });

      if (
        this.$store.state.good
          .map(val => val.commodity_id)
          .indexOf(this.selectGood.id) >= 0
      ) {
        this.$store.commit(
          "good",
          this.$store.state.good
            .filter(val => val.commodity_id != this.selectGood.id)
            .concat(this.goodons)
        );
      } else {
        this.$store.commit("good", this.$store.state.good.concat(this.goodons));
      }
      this.getChangeNum();

      this.$emit("tableData", this.$store.getters.set_table_good);

      this.$emit("goods", this.$store.getters.set_table_good);

      this.dialogVisible = false;
      this.dialogVisible2 = false;
    },
    selsctGood(e) {
      this.dialogVisible2 = true;
      this.selectGood = e;

      goodsOne(e.id).then(res => {
        this.dialogVisible2 = true;
        this.selectGood = e;
        this.goodons = [];

        //  缓存中是否含有当前选中的商品

        if (res.data.length > 0) {
          if (
            this.$store.state.good
              .map(val => val.commodity_id)
              .indexOf(this.selectGood.id) >= 0
          ) {
            this.goodons = this.$store.state.good.filter(
              val => val.commodity_id == e.id
            );
          } else {
            if (this.orderType == "1") {
              res.data.forEach(val => {
                this.goodons.push({
                  commodity_id: this.selectGood.id,
                  product_id: val.id,
                  color: val.color,
                  size: val.size,
                  put_number: 0,
                  stock: val.stock ? val.stock : 0,
                  price: this.selectGood.retail_price, //单价
                  discount: 100, //折扣
                  goods_status: "0",
                  unit: val.unit, //单位
                  goods_code: this.selectGood.goods_code, //条码
                  item: this.selectGood.item, //货号
                  name: this.selectGood.name, //商品名称
                  discount_price: 0, //折后价
                  money: 0, //金额
                  discount_money: 0 //折扣金额
                });
              });
            }
          }

          this.sizes = [...new Set(this.goodons.map(val => val.size))];
          this.colors = [...new Set(this.goodons.map(val => val.color))];
        }
      });
    },

    // 批量设置所有
    setAll() {
      this.isFlag = false;
    },

    // 设置
    set() {
      this.goodons.forEach(val => (val.put_number = this.form.input1));
      this.form.input1 = "";
      this.isFlag = true;
    },

    // 取消设置
    cancleSet() {
      this.isFlag = true;
    },

    totalChange(e) {
      this.getGoodList(e);
    },
    getGoodList(page) {
      goodsList({ page: page, size: 10 }).then(res => {
        this.goods = res.data.data;
        this.goodtotal = res.data.total;
      });
    },
    addGood() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.orderAllnumber {
  display: flex;
  border: 1px solid #ebeef5;
  border-top: 0;
  padding: 10px 0;
  .title_name {
    width: 100px;
    margin-left: 40px;
    text-align: center;
    line-height: 40px;
  }
  span {
    display: inline-block;
  }
  .all1 {
    width: 700px;
  }
  .all2 {
    width: 535px;
  }
  .all3 {
    width: 90px;
    text-align: center;
  }
  .all4 {
    width: 90px;
    text-align: center;
  }
}
.tableselectInput,
.tableselectInput /deep/ .el-input {
  width: 90px !important;
}
.goodDiv {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  font-size: 18px;
  line-height: 50px;
  text-indent: 20px;
}
.color {
  margin-bottom: 10px;
  .el-input {
    width: 100px;
    margin-right: 10px;
  }
}

.size {
  // display: flex;
  margin-left: 70px;
  margin-bottom: 10px;
  p {
    width: 110px;
  }
}
.setColor {
  display: flex;
  align-items: center;
  span {
    margin: 0 20px;
  }
}
.setColor /deep/ .el-input {
  width: 190px;
  margin-right: 20px;
}
.goodList {
  cursor: pointer;
  margin-bottom: 10px;
  /deep/ .el-radio-group {
    display: flex;
    flex-direction: column;

    min-height: 300px;
    /deep/ .el-radio {
      margin-bottom: 20px;
    }
  }
}
.zfb {
  margin-left: 53px;
  display: flex;
  align-items: center;
  .el-select {
    width: 118px;
    margin: 0;
    margin-right: 12px;
  }
}
.zfb /deep/ .el-input-group__append {
  padding: 9px 7px;
}
.receivables
  /deep/
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  background: rgba(225, 238, 255, 1);
  color: rgba(85, 161, 255, 1);
  border: none;
  box-shadow: none;
}
.receivables {
  margin: 27px 0;
  display: flex;
}

.receivables /deep/ .el-radio-button {
  // width: 118px;height:32px;
}
.receivables /deep/ .el-radio-button--small .el-radio-button__inner {
  padding: 9px 27px;

  background: rgba(239, 239, 239, 1);
  border: none;
  font-size: 16px;
}
.all {
  margin-bottom: 47px;
  p {
    font-size: 18px;

    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
}
.upload {
  margin-top: 20px;
  margin-left: 20px;
}
.upload /deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.upload /deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.box-card {
  width: 1620px;
  height: 219px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 0.5);
  padding: 30px 22px;
}
.back {
  margin-bottom: 14px;
  cursor: pointer;
}
.table_header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  p {
    color: rgba(153, 153, 153, 1);
    margin-right: 20px;
  }
}
.info {
  margin-left: 20px;
  display: flex;
  align-items: center;
  h6 {
    font-size: 18px;

    font-weight: 600;
    color: rgba(255, 58, 58, 1);
  }
  p {
    font-size: 16px;

    margin: 0 40px;
    color: rgba(51, 51, 51, 1);
    span {
      margin-left: 10px;
    }
  }
}
.el-select {
  width: 190px;
  margin-right: 70px;
}
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
  align-items: center;
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
  margin: 26px;
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
// input 表格
.input-table {
  display: flex;
  padding-top: 20px;
  .input-color {
    display: flex;
    flex-direction: column;
    width: 80px;
    .color-row {
      display: flex;
      flex-direction: column;
    }
  }
  .el-input {
    width: 100%;
  }
  .el-row {
    width: 400px;
  }
}
.el-dialog__body {
  .look-store {
    float: right;
    color: #0590ff;
    cursor: pointer;
    margin-top: 10px;
  }
}
</style>
