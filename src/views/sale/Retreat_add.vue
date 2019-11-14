<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="nav">
          <div class="back" @click="goBack">
            <i class="el-icon-back">返回</i>
          </div>

          <div class="nav-btn">
            <!-- type=1  状态  草稿3   已退货1  已撤销2-->

            <el-button type="primary" v-if="this.status=='3'||this.status=='1'||this.status=='2'">打印</el-button>

            <el-button
              type="primary"
              v-if="this.status=='3'||this.status=='1'||this.status=='2'"
            >新增销售退货单</el-button>

            <el-button type="primary" v-if="this.status=='1'||this.status=='2'">复制为新增</el-button>
          </div>
        </div>
        <div class="box-card">
          <div class="top">
            <h5 class="label" v-if="this.type=='add'">新增销售退货订单</h5>
            <!-- type=1  状态  草稿3   已退货1  已撤销2 -->
            <h5 class="label" v-if="this.type=='detail'&&this.status=='3'">销售退货单 — 草稿 — {{number}}</h5>
            <h5 class="label" v-if="this.type=='detail'&&this.status=='2'">销售退货单 — 已撤销 — {{number}}</h5>

            <h5 class="label" v-if="this.type=='detail'&&this.status=='1'">销售退货单 — 已退货 — {{number}}</h5>

            <div class="info" v-if="form.kid">
              <h6>尚欠供应商¥{{cusOne.arrears}}</h6>
              <p>积分{{cusOne.integral}}</p>
              <p>
                手机号{{cusOne.phone}}
                <el-tag type="primary" disable-transitions>会</el-tag>
              </p>
            </div>
          </div>
          <el-form :model="form" ref="form" label-width="auto" class="demo-ruleForm">
            <el-form-item label="客户 :">
              <span class="text" v-if="this.type=='detail'&&this.status!='3'">{{datanames.kid_name}}</span>
              <el-select v-else v-model="form.kid" placeholder="请选择" @change="changeCus">
                <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="item in cus"
                  :key="item.id"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库 :">
              <span
                class="text"
                v-if="this.type=='detail'&&this.status!='3'"
              >{{datanames.warehouse_name}}</span>
              <el-select v-else v-model="form.warehouse" placeholder="请选择">
                <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="item in warehouses"
                  :key="item.id"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结算账户 :">
              <span
                class="text"
                v-if="this.type=='detail'&&this.status!='3'"
              >{{datanames.warehouse_name}}</span>
              <el-select v-else v-model="form.set_account" placeholder="请选择">
                <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="item in setAcounts"
                  :key="item.id"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="实付金额 :">
              <span
                class="text"
                v-if="this.type=='detail'&&this.status!='3'"
              >{{datanames.warehouse_name}}</span>
              <el-input v-else v-model="form.payment"></el-input>
            </el-form-item>
            <el-form-item label="日期 :">
              <span
                v-if="this.type=='detail'&&this.status!='3'"
                class="text"
              >{{datanames.create_time|formatDate2}}</span>

              <el-date-picker
                v-else
                style="width:190px"
                v-model="form.create_time"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注 :">
              <span class="text" v-if="this.type=='detail'&&this.status!='3'">{{datanames.des}}</span>
              <el-input v-else v-model="form.des"></el-input>
            </el-form-item>

            <el-form-item label="销售员 :">
              <span
                class="text"
                v-if="this.type=='detail'&&this.status!='3'"
              >{{datanames.sales_name}}</span>

              <el-select v-model="form.sales" v-else placeholder="请选择">
                <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="item in Allsales"
                  :key="item.id"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div class="box"></div>
        </div>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <div class="box-card" style="height: auto;">
          <SelectGoodsReturn
            ref="goodList"
            @goods="getGoods"
            @tableData="UpdatetableData"
            :tableData="tableData"
            :status="status"
            :orderType="1"
            :storeGood="storeGood"
            @allNum="allNum"
          ></SelectGoodsReturn>

          <div style="margin-top:20px;">
            <span>抹零</span>
            <span v-if="status!='3'" class="text">{{form.small}}</span>
            <el-input
              v-else
              style="width:100px;margin-right:55px;"
              v-model="form.small"
              @blur="culmTotal"
            ></el-input>
          </div>
          <div class="all">
            <p v-if="Alltotal<=0">
              应收总合计
              <span style="color:#FC2D1F">{{-Alltotal}}</span>
            </p>
            <p v-if="Alltotal>0">
              应付总合计
              <span style="color:#FC2D1F">{{Alltotal}}</span>
            </p>
          </div>
          <div class="botton-bottom">
            <!--  1部分出库 2已撤销 3草稿 4已出售 5待出库 -->
            <el-button type="primary" @click="save(3)" v-if="this.type=='add'">保存草稿</el-button>
            <el-button type="primary" @click="save(1)" v-if="this.type=='add'">退货</el-button>
            <template v-if=" this.type=='detail'">
              <el-button type="primary" @click="save(3)" v-if="this.status=='3'">保存草稿</el-button>
              <el-button type="primary" @click="save(1)" v-if="this.status=='3'">退货</el-button>
              <el-button type="primary" @click="delOrder" v-if="this.status=='3'">删除</el-button>
              <el-button type="primary" @click="Cancel" v-if="this.status=='3'">撤销</el-button>
            </template>
          </div>
        </div>
        <img :src="require('@/assets/images/chexiao.png')" alt v-if="status =='2' " class="img" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  saleList,
  userList,
  getSetAcount,
  getAllAcount,
  saleAdd,
  saleDetail,
  saleDel,
  saleRevoke,
  saleAllDepot,
  logistics,
  logisticsOutlets,
  goodsOne,
  saleDepot,
  saleReturnAdd,
  saleReturnDetail,
  saleReturnDel,
  saleReturnRevoke,
  saleReturnDepot,
  returnDraft,
  getAllSales
} from "@/api/index";
import { warehouseSelectList } from "@/api/api";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
import SelectGoodsReturn from "@/components/SelectGoods_return";
import Region from "@/components/Region";
import commonUpload from "@/components/common-upload";
import ShipType from "@/components/ShipType";
export default {
  components: {
    SelectGoodsReturn,
    Region,
    commonUpload,
    ShipType
  },
  data() {
    return {
      warehouses: [],
      cus: [],
      tableData: [],
      datanames: {},
      synchronization: false, //是否同步客户地址
      classList: [],
      allAcounta: [], //优惠
      setAcounts: [], //支付方式
      showZf: false,
      status: "3", //状态 1部分出库 2已撤销 3草稿 4已出售 5待出库
      value1: "",
      region: "",
      payType: "1",
      total: 0,
      Alltotal: 0,
      Allsales: [],
      number: 0, //销售单号
      form: {
        kid: "", //客户id
        warehouse: "", //仓库id
        sales: "", //销售员id
        create_time: "", //创建时间
        des: "", //备注

        type: "", //账目类型
        money: "", //金额
        small: 0, //抹零
        status: "", //状态
        set_account: "", //结算账户
        total: "", //应收金额
        payment: "", //实收金额

        goods: [],

        total: ""
      },
      storeGood: [],
      cusOne: {},
      goodTable: [],

      orderStatus: enumSaleStatus,
      dialogImageUrl: "",
      dialogVisible: false,

      orderType: [{ type: "1", value: "10" }],
      type: this.$route.query.type
    };
  },
  filters: {},
  mounted() {
    if (this.type == "detail") {
      this.getOrder();
    }
  },
  created() {
    this.getbaseSelect();
  },
  watch: {},
  methods: {
    culmTotal() {
      this.Alltotal = this.total - this.form.small;
    },

    getOrder() {
      saleReturnDetail(this.$route.query.id).then(res => {
        this.number = res.list.number;
        this.datanames = res.list;

        (this.status = res.list.status.toString()),
          (this.form = {
            kid: res.list.kid,
            warehouse: res.list.warehouse,

            sales: res.list.sales, //销售员id
            create_time: res.list.create_time * 1000, //创建时间
            des: res.list.des, //备注

            type: res.list.type, //账目类型
            money: res.list.money, //金额
            small: res.list.small, //抹零
            status: res.list.status.toString(), //状态
            set_account: res.list.set_account, //结算账户
            total: res.list.total, //应收金额
            payment: res.list.payment, //实收金额

            goods: res.list.goods,

            total: res.list.total
          });
        this.tableData = [];
        res.list.goods.forEach(val => {
          val.goods_status = val.goods_status.toString();
          this.tableData.push(val);
        });

        let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))];
        this.getGoodTable(goodId).then(x => {
          let a = x;

          a.forEach(val => {
            this.tableData.forEach(item => {
              if (val.product_id == item.product_id) {
                (val.put_number = item.put_number),
                  (val.price = item.price), //单价
                  (val.discount = item.discount), //折扣
                  (val.discount_price = item.discount_price);
                val.money = item.money;
                val.discount_money = item.discount_money;
                val.goods_status = item.goods_status;
              }
            });
          });

          this.storeGood = a;
        });
      });
    },
    async getgoodsOnes(val) {
      let res = await goodsOne(val);

      return res.data;
    },
    async getGoodTable(goodId) {
      let goodtable = [];
      let goodtable2 = [];
      let peomises = goodId.map(x => this.getgoodsOnes(x));

      for (const peomise of peomises) {
        const res = await peomise;
        goodtable.push(res);
      }
      let goods = [];

      goodtable.forEach(val => val.forEach(e => goods.push(e)));
      goods.forEach(item => {
        goodtable2.push({
          commodity_id: item.commodity_id,
          product_id: item.id,
          color: item.color,
          size: item.size,
          put_number: 0,
          goods_status: "0",
          price: item.purchase_price, //单价
          discount: 100, //折扣
          stock: item.stock ? item.stock : 0,
          unit: item.unit, //单位
          goods_code: item.goods_code, //条码
          item: item.item, //货号
          name: item.name, //商品名称
          discount_price: 0, //折后价
          money: 0, //金额
          discount_money: 0 //折扣金额
        });
      });

      return goodtable2;
    },

    // 撤销
    Cancel() {
      saleReturnRevoke(this.$route.query.id).then(res => {
        this.getOrder();
        this.$message.success(res.msg);
      });
    },
    delOrder() {
      saleReturnDel(this.$route.query.id).then(res => {
        if (res.code == 200) {
          this.goBack();
        }
      });
    },
    changeCus() {
      this.cusOne = this.cus.find(val => val.id == this.form.kid);
    },
    UpdatetableData(e) {
      this.tableData = e;
    },
    getGoods(e) {
      debugger;
      this.goodTable = e;

      // this.total = this.goodTable
      //   .map(val => Number(val.price) * Number(val.put_number))
      //   .reduce((accumulator, currentValue) => accumulator + currentValue);
      // this.culmTotal();
    },
    allNum(e) {
      this.total = e.money;
      this.culmTotal()();
    },
    getbaseSelect() {
      userList(1, 100000).then(res => {
        this.cus = res.data.data;
      });
      warehouseSelectList(1, 100000).then(res => {
        this.warehouses = res.data;
      });
      getAllAcount(1, 100000).then(res => {
        this.allAcounta = res.data;
      });
      getSetAcount(1, 100000).then(res => {
        this.setAcounts = res.data;
      });
      getAllSales().then(res => {
        this.Allsales = res.data;
      });
    },
    save(e) {
      // e状态 状态   3草稿  1 退货
      this.$nextTick(() => {
        this.status = e;
        this.form.sales = sessionStorage.getItem("userId");

        this.form.goods = this.goodTable;

        this.form.status = this.status;

        this.form.total =
          this.total + Number(this.form.money) - Number(this.form.small);
        let httpName = "";
        if (this.type == "add") {
          saleReturnAdd(this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.goBack();
            }
          });
        } else {
          this.form.id = this.$route.query.id;
          if (this.status == "3") {
            httpName = returnDraft;
          }
          if (this.status == "1") {
            httpName = saleReturnDepot;
          }
          httpName(this.$route.query.id, this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.goBack();
            }
          });
        }
      });
    },

    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.demo-ruleForm {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  /deep/ .el-form-item__label {
    font-size: 16px;
  }
}
.text {
  width: 190px;
  display: inline-block;
  font-size: 16px;
}
.botton-bottom {
  text-align: center;
  margin: 60px 0 40px 0;
  button {
    width: 200px;
    height: 40px;
    margin-left: 40px;
  }
}
.nav-btn {
  display: flex;
  margin-left: 295px;
  .new-add {
    margin-left: 15px;
  }
  .el-button {
    height: 30px;
    border: 1px solid #fff;
    background-color: #fff;
    color: #55a1ff;
    line-height: 5px;
    box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 0.5);
  }
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

.box-card {
  width: 1620px;
  //   height: 219px;
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
  margin: 0 0 0 100px;
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
.el-select,
.el-input {
  width: 190px;
  margin-right: 70px;
}
.searchInput {
  width: 190px;
}
.img {
  position: absolute;
  top: 185px;
  right: 555px;
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
</style>
