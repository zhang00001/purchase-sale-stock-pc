<template>
  <div>
    <div class="table_header">
      <span>扫码枪录入：</span>
      <el-input
        style="width:230px;margin-right:5px;"
        placeholder="请扫描商品或商品条形码"
        :disabled="this.type === 'look'"
      ></el-input>
      <p>选择产品后收订输入数量</p>
      <el-button type="primary" @click="addGood" v-if="this.type === 'add'">新增商品</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%;font-size:14px;"
      size="small"
      :header-cell-style="{background:'rgba(247,247,247,1)'}"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="del(scope.row,scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品"></el-table-column>
      <el-table-column prop="item" label="货号"></el-table-column>
      <el-table-column prop="goods_code" label="条码"></el-table-column>
      <el-table-column prop="color" label="颜色"></el-table-column>
      <el-table-column prop="size" label="尺码"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="put_number" label="数量">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.put_number"
            style="width:90px;"
            @blur="checkNum(scope.row,scope)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" style="width:90px;" @blur="checkNum(scope.row,scope)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="discount" label="折扣%">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.discount"
            style="width:90px;"
            @blur="checkNum(scope.row,scope)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="disprice" label="折后价"></el-table-column>
      <el-table-column prop="money" label="金额"></el-table-column>
      <el-table-column prop="dismoney" label="折后金额"></el-table-column>
    </el-table>

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
            <el-input ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="!isFlag">
        <el-input placeholder="输入" v-model="form.input1"></el-input>
        <el-button type="primary" @click="set" style="margin-left: 20px">设置</el-button>
        <el-button type="primary" @click="cancleSet">取消</el-button>
      </div>
      <div class="input-table">
        <div class="input-color">
          <el-input disabled></el-input>
          <el-row class="color-row">
            <el-col :span="24/sizes.length" v-for="(item,index) in colors" :key="index">
              <el-input v-model="colors[index]" placeholder="请输入内容" disabled></el-input>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="24/sizes.length" v-for="(item,index) in sizes" :key="index">
              <el-input v-model="sizes[index]" placeholder="请输入内容" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24/sizes.length" v-for="(item,index) in goodons" :key="index">
              <el-input v-model="item.put_number" placeholder="请输入内容" type="number"></el-input>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-if="isShow">
        <div class="input-table">
          <div class="input-color">
            <el-input disabled></el-input>
            <el-row class="color-row">
              <el-col :span="24/sizes.length" v-for="(item,index) in colors" :key="index">
                <el-input v-model="colors[index]" placeholder="请输入内容" disabled></el-input>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="24/sizes.length" v-for="(item,index) in sizes" :key="index">
                <el-input v-model="sizes[index]" placeholder="请输入内容" disabled></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24/sizes.length" v-for="(item,index) in goodons2" :key="index">
                <template v-if="item.num==null">
                  <el-input v-model="index1" disabled></el-input>
                </template>
                <template v-else>
                  <el-input v-model="item.num" disabled></el-input>
                </template>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 查看库存 -->
      </div>

      <span type="text" class="look-store" @click="lookStore">查看库存</span>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="see=true">查看库存</el-button> -->
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
  getEditProduct
} from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus, enumSizes, enumColors } from "@/utils/enums";
export default {
  data() {
    return {
      isFlag: true,
      isShow: false,
      index1: 0,
      form: {},
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
      status: "0",
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
      tableData: [],
      type: this.$route.query.type
    };
  },

  created() {
    this.getGoodList();
    sessionStorage.setItem("good", "[]");
  },
  methods: {
    checkNum(item, cum) {
      item.disprice = (Number(item.price) * Number(item.discount)) / 100;
      item.money = Number(item.price) * Number(item.put_number);
      item.dismoney =
        (Number(item.price) * Number(item.put_number) * Number(item.discount)) /
        100;

      let goods = JSON.parse(sessionStorage.getItem("good"));
      goods.find(val => val.id == item.id).put_number = item.put_number;
      goods.find(val => val.id == item.id).disprice = item.disprice;
      goods.find(val => val.id == item.id).money = item.money;
      goods.find(val => val.id == item.id).dismoney = item.dismoney;
      sessionStorage.setItem("good", JSON.stringify(goods));
    },
    del(e, index) {
      this.tableData.splice(index, 1);
      let goods = JSON.parse(sessionStorage.getItem("good"));
      goods.find(val => val.id == e.id).put_number = "";
      sessionStorage.setItem("good", JSON.stringify(goods));
    },
    saveLocal() {
      this.goodons.forEach(val => {
				console.log(val)
				return
        if (Number(val.put_number) > 0) {
          val.disprice = (Number(val.price) * Number(val.discount)) / 100;
          val.money = Number(val.price) * Number(val.put_number);
          val.dismoney =
            (Number(val.price) *
              Number(val.put_number) *
              Number(val.discount)) /
            100;
        }
      });
    
      sessionStorage.setItem("good", JSON.stringify(JSON.parse(sessionStorage.getItem("good")).concat(this.goodons)));
      this.tableData = JSON.parse(sessionStorage.getItem("good")).filter(val => Number(val.put_number) > 0);
      this.dialogVisible = false;
      this.dialogVisible2 = false;
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

    // 查看库存
    lookStore() {
      getGoodsStock({ id: this.selectGood.id, type: "销售单" }).then(res => {
       this.goodons2=[]
        res.data.forEach(val => {
          val.num == null ? 0 : val.num;
          this.goodons2.push(val);
        });

        this.isShow = !this.isShow;
      });
    },

    totalChange() {},
    getGoodList() {
      goodsList({ page: 1, size: 10 }).then(res => {
        this.goods = res.data.data;
        this.goodtotal = res.data.total;
      });
    },
    addGood() {
      this.dialogVisible = true;
    },
    selsctGood(e) {
      this.dialogVisible2 = true;
      this.selectGood = e;
      goodsOne(e.id).then(res => {
        this.dialogVisible2 = true;
        this.selectGood = e;
        this.goodons = [];

        if (res.data.length > 0) {
          //  缓存中是否含有当前选中的商品

          if (
            JSON.parse(sessionStorage.getItem("good"))
              .map(val => val.goodId)
              .indexOf(this.selectGood.id) >= 0
          ) {
            this.goodons = JSON.parse(sessionStorage.getItem("good")).filter(val=>val.goodId==e.id);
          } else {
            res.data.forEach(val => {
              this.goodons.push({
                goodId: this.selectGood.id,
                id: val.id,
                color: val.color,
                size: val.size,
                put_number: 0,
                price: this.selectGood.retail_price, //单价
                discount: 100, //折扣

                unit: this.selectGood.unit, //单位
                goods_code: this.selectGood.goods_code, //条码
                item: this.selectGood.item, //货号
                name: this.selectGood.name, //商品名称
                disprice: 0, //折后价
                money: 0, //金额
                dismoney: 0 //折扣金额
              });
            });
          }

          this.sizes = [...new Set(this.goodons.map(val => val.size))];
          this.colors = [...new Set(this.goodons.map(val => val.color))];
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index == 8 || index==11||index == 12 || index == 13) {
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
    },
    goBack() {
      this.$router.go(-1);
    },

    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
