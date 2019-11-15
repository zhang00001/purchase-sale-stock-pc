<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="nav">
          <div class="back" v-if="this.type=='detail'" @click="goBack">
            <i class="el-icon-back">返回</i>
          </div>

          <div class="nav-btn">
            <!-- type=1  状态 1已零售 2已撤销 -->

            <el-button type="primary" @click="print" v-if="this.status=='1'">打印</el-button>
          </div>
        </div>
        <div class="box-card">
          <div class="top">
            <h5 class="label" v-if="this.type=='add'">新增前台收银</h5>

            <h5 class="label" v-if="this.type=='detail'&&this.status=='2'">前台收银 — 已撤销 — {{number}}</h5>
            <h5 class="label" v-if="this.type=='detail'&&this.status=='1'">前台收银 — 一零售 — {{number}}</h5>
          </div>
          <el-form :model="form" ref="form" label-width="auto" class="demo-ruleForm">
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
        </div>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <div class="box-card" style="height: auto;">
          <SelectGoods
            ref="goodList"
            @goods="getGoods"
            @tableData="UpdatetableData"
            :tableData="tableData"
            :status="status"
            :orderType="2"
          ></SelectGoods>

          <div style="margin-top:20px;">
            <span>费用金额</span>
            <span v-if="status!='3'" class="text">{{form.total}}</span>
            <el-input v-else style="width:100px;margin-right:55px;" v-model="form.total"></el-input>
            <span>抹零</span>
            <span v-if="status!='3'" class="text">{{form.small}}</span>
            <el-input v-else style="width:100px;margin-right:55px;" v-model="form.small"></el-input>
            <span>找零</span>
            <span v-if="status!='3'" class="text">{{form.change}}</span>
            <el-input v-else style="width:100px;margin-right:55px;" v-model="form.change"></el-input>
          </div>
          <div class="receivables">
            <div v-if="status!='3'">
              <span>{{datanames.set_account_name}}￥{{form.arrear}}</span>
              <br />
              <span>{{datanames.set_account_name}}￥{{form.payment}}</span>
            </div>
            <div v-if="status=='3'">
              <div class="zfb">
                <span class="title2">结算账户</span>

                <div>
                  <div class="selTop">
                    <el-select placeholder="请选择" v-model="form.set_account">
                      <el-option
                        :label="item.name"
                        :value="item.id"
                        v-for="item in setAcounts"
                        :key="item.id"
                      ></el-option>
                    </el-select>

                    <el-input v-model="form.arrear">
                      <template slot="append">未收</template>
                    </el-input>
                    <i v-if="!showZf" class="el-icon-circle-plus-outline" @click="addType"></i>
                  </div>
                </div>
              </div>
              <div class="zfb" style="margin-top:20px;" v-if="showZf">
                <span class="title2">结算账户</span>
                <div>
                  <div class="selTop">
                    <el-select placeholder="请选择" v-model="form.set_account">
                      <el-option
                        :label="item.name"
                        :value="item.id"
                        v-for="item in setAcounts"
                        :key="item.id"
                      ></el-option>
                    </el-select>

                    <el-input v-model="form.payment">
                      <template slot="append">全款</template>
                    </el-input>
                    <i v-if="showZf" class="el-icon-remove-outline" @click="delType"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="botton-bottom">
            <!-- type=1  状态 1已零售 2已撤销 -->
            <el-button type="primary" @click="save(3)" v-if="this.type!='detail'">结账</el-button>

            <template v-if=" this.type=='detail'">
              <el-button type="primary" @click="Cancel" v-if="this.status=='1'">撤销</el-button>
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
  collectRevoke,
  saleAllDepot,
  logistics,
  logisticsOutlets,
  goodsOne,
  saleDepot,
  collectAdd,
  collectDetail,
  getAllSales
} from "@/api/index";
import { warehouseSelectList } from "@/api/api";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
import SelectGoods from "@/components/SelectGoods";
import Region from "@/components/Region";
import commonUpload from "@/components/common-upload";
import ShipType from "@/components/ShipType";
export default {
  components: {
    SelectGoods,
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
      Allsales: [],
      number: 0, //销售单号
      form: {
        kid: "", //客户id
        warehouse: "", //仓库id
        sales: "", //销售员id
        create_time: "", //创建时间
        des: "", //备注
        mode: "1", //发货方式
        images: [], //图片
        type: "", //账目类型
        money: "", //金额
        small: "", //抹零
        status: "", //状态
        set_account: "", //结算账户
        total: "", //应收金额
        payment: "", //实收金额
        address: [], //地址
        goods: [],
        payment_mode: "1", //收款方式
        arrear: "", //未收 欠款
        payment: "", //实收   全款
        total: "",
        change: "" //找零
      },

      cusOne: {},
      goodTable: [],

      orderStatus: enumSaleStatus,
      dialogImageUrl: "",
      dialogVisible: false,

      orderType: [{ type: "1", value: "10" }],
      type: ""
    };
  },
  filters: {},
  watch: {
    $route(to, from) {
      if (to.path == "/sale/reception") {
        Object.assign(this.$data, this.$options.data());
      }
    }
  },
  mounted() {
    if (this.type == "detail") {
      this.getOrder();
    }
  },
  created() {
    this.type = this.$route.query.type;
    this.getbaseSelect();
  },

  methods: {
    print() {
      this.$common.printPdf("sale_cash", this.$route.query.id);
    },
    hidedialogVisible(e) {
      this.dialogVisible = false;
    },
    Outbound() {
      // 是否有一个大于0
      if (this.tableData.some(val => Number(val.num) > 0)) {
        let option = [];
        this.tableData.forEach(val => {
          option.push({ id: val.id, num: val.num });
        });
        debugger;
        saleDepot(this.$route.query.id, {
          option: option
        }).then(res => {});
      } else {
        this.$message.error("请至少输入一条商品的出库数量");
      }
    },
    editMode() {
      this.dialogVisible = true;
      this.form.mode = this.cusOne.mode;
    },

    getOrder() {
      collectDetail(this.$route.query.id).then(res => {
        this.$nextTick(() => {
          this.tableData = res.list.goods;

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
              set_account: res.list.set_account.toString(), //结算账户
              total: res.list.total, //应收金额
              payment: res.list.payType, //实收金额
              address: res.list.address, //地址
              goods: res.list.goods,

              arrear: res.list.arrear, //未收 欠款
              payment: res.list.payment, //实收   全款
              total: res.list.total,
              change: res.list.change
            });
        });
      });
    },
    // 全部出库
    AllOut() {
      saleAllDepot(this.$route.query.id).then(res => {
        this.getOrder();
        this.$message.success(res.msg);
      });
    },
    // 撤销
    Cancel() {
      collectRevoke(this.$route.query.id).then(res => {
        this.getOrder();
        this.$message.success(res.msg);
      });
    },

    changeCus() {
      this.cusOne = this.cus.find(val => val.id == this.form.kid);
    },
    UpdatetableData(e) {
      this.tableData = e;
    },
    getGoods(e) {
      this.goodTable = e;

      this.total = this.goodTable
        .map(val => Number(val.price))
        .reduce((accumulator, currentValue) => accumulator + currentValue);
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
      // e状态 状态 1部分出库 2已撤销 3草稿 4已出售 5待出库
      this.$nextTick(() => {
        this.status = e;

        this.form.goods = this.goodTable;
        this.form.status = this.status;

        collectAdd(this.form).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            Object.assign(this.$data, this.$options.data());
          }
        });
      });
    },
    addType() {
      this.showZf = true;
    },
    delType() {
      this.showZf = false;
    },

    goBack() {
      this.$router.go(-1);
    },
    goAdd() {
      this.$router.push({ path: "/sale/order_add" });
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
.delivery {
  margin-left: 43%;
  span {
    width: 65px;
    text-align: right;
    display: inline-block;
    color: #606266;
    font-size: 14px;
  }
  .el-input,
  .el-select {
    width: 190px;
    margin-right: 33px;
    margin-bottom: 20px;
  }
}

.delivery /deep/ .map {
  position: relative;
  top: -11px;
  margin-right: 20px;
}

.zfb {
  margin-left: 53px;
  display: flex;
  align-items: center;
  .title2 {
    margin-right: 20px;
  }
  .selTop {
    position: relative;
    width: 260px;
    i {
      font-size: 20px;
      margin-right: 10px;
      cursor: pointer;
      position: absolute;
      right: -10px;
      top: 10px;
    }
  }
  .el-input {
    width: 100px;
    margin-right: 30px;
    position: absolute;
    right: 0;
  }
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
.el-select {
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
</style>
