<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="auto" class="demo-ruleForm" :rules="rules">
      <el-row>
        <el-col :span="24">
          <div class="nav">
            <div class="back" @click="goBack">
              <i class="el-icon-back">返回</i>
            </div>

            <div class="nav-btn">
              <!-- type=1  状态 1部分出库 2已撤销 3草稿 4已出售 5待出库 -->
              <el-button
                type="primary"
                v-if="this.status=='3'||this.status=='4'||this.status=='5'"
              >发送物流提醒短信</el-button>
              <el-button
                type="primary"
                v-if="this.status=='1'||this.status=='2'||this.status=='3'||this.status=='4'||this.status=='5'"
              >打印</el-button>
              <el-button
                type="primary"
                v-if="this.status=='1'||this.status=='2'||this.status=='3'||this.status=='4'||this.status=='5'"
              >打印条码</el-button>
              <el-button type="primary" v-if="this.status=='1'">筛选有货并新增</el-button>
              <el-button
                type="primary"
                v-if="this.status=='2'||this.status=='3'||this.status=='4'||this.status=='5'"
              >邮件</el-button>
              <el-button
                type="primary"
                v-if="this.status=='1'||this.status=='2'||this.status=='3'||this.status=='4'||this.status=='5'"
              >新增销售单</el-button>
              <el-button
                type="primary"
                v-if="this.status=='1'||this.status=='2'||this.status=='3'"
              >复制为采购单</el-button>
              <el-button
                type="primary"
                v-if="this.status=='2'||this.status=='3'||this.status=='4'||this.status=='5'"
              >复制为新增</el-button>
              <el-button type="primary" v-if="this.status=='2'||this.status=='3'">复制为销售退货</el-button>
              <el-button
                type="primary"
                v-if="this.status=='1'||this.status=='2'||this.status=='3'"
              >复制为调拨单</el-button>
              <el-button
                type="primary"
                v-if="this.status=='1'||this.status=='2'||this.status=='3'"
              >复制为配货单</el-button>
              <el-button type="primary" v-if="this.status=='1'">复制为生产单</el-button>
            </div>
          </div>
          <div class="box-card">
            <el-row :gutter="24">
              <el-col :span="24">
                <div class="top">
                  <h5 class="label" v-if="this.type=='add'">新增销售订单</h5>

                  <h5
                    class="label"
                    v-if="this.type=='detail'&&this.status=='3'"
                  >销售单 — 草稿 — {{number}}</h5>
                  <h5
                    class="label"
                    v-if="this.type=='detail'&&this.status=='2'"
                  >销售单 — 已撤销 — {{number}}</h5>
                  <h5
                    class="label"
                    v-if="this.type=='detail'&&this.status=='4'"
                  >销售单 — 已出售 — {{number}}</h5>
                  <h5
                    class="label"
                    v-if="this.type=='detail'&&this.status=='5'"
                  >销售单 — 待出库 — {{number}}</h5>
                  <h5
                    class="label"
                    v-if="this.type=='detail'&&this.status=='1'"
                  >销售单 — 部分出库 — {{number}}</h5>

                  <div class="info" v-if="form.kid">
                    <h6>客户尚欠款¥{{cusOne.arrears}}</h6>
                    <p>积分{{cusOne.integral}}</p>
                    <p>
                      手机号{{cusOne.phone}}
                      <el-tag type="primary" disable-transitions>会</el-tag>
                    </p>
                  </div>
                </div>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户 :" prop="kid">
                  <span
                    class="text"
                    v-if="this.type=='detail'&&this.status!='3'"
                  >{{datanames.kid_name}}</span>
                  <el-select v-else v-model="form.kid" placeholder="请选择" @change="changeCus">
                    <el-option
                      :value="item.id"
                      :label="item.name"
                      v-for="item in cus"
                      :key="item.id"
                    >{{item.name}}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="仓库 :" prop="warehouse">
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
              </el-col>
              <el-col :span="5">
                <el-form-item label="销售员 :" prop="sales">
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
              </el-col>
              <el-col :span="5">
                <el-form-item label="日期 :" prop="create_time">
                  <span
                    v-if="this.type=='detail'&&this.status!='3'"
                    class="text"
                  >{{datanames.create_time|formatDate2}}</span>

                  <el-date-picker
                    v-else
                    style="width:190px"
                    v-model="form.create_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="备注 :" prop="des">
                  <span
                    v-if="this.type=='detail'&&this.status!='3'"
                    class="text"
                    style="width:613px;margin-right:70px;"
                  >{{form.des}}</span>
                  <el-input v-else style="width:530px;margin-right:70px;" v-model="form.des"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发货方式 :">
                  <span v-if="cusOne.mode=='1'">自提</span>
                  <span v-if="cusOne.mode=='2'">送车</span>
                  <span v-if="cusOne.mode=='3'">送指定点</span>
                  <span v-if="cusOne.mode=='4'">电子面单</span>
                  <span v-if="cusOne.mode=='5'">发物流</span>

                  <el-button type="text" @click="editMode" v-if="cusOne.name">修改</el-button>
                </el-form-item>
              </el-col>
              <div class="box"></div>
            </el-row>
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
              :orderType="0"
              :storeGood="storeGood"
            ></SelectGoods>

            <div style="margin-top:20px;    display: flex;">
              <el-form-item label="优惠 :" prop="type">
                <span v-if="status!='3'" class="text">{{datanames.type_name}}</span>
                <el-select v-else v-model="form.type" placeholder="请选择">
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in allAcounta"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="其他金额 :" prop="money">
                <span v-if="status!='3'" class="text">{{form.money}}</span>
                <el-input v-else style="width:100px;margin-right:55px;" v-model="form.money"></el-input>
              </el-form-item>
              <el-form-item label="抹零 :" prop="small">
                <span v-if="status!='3'" class="text">{{form.small}}</span>
                <el-input v-else style="width:100px;margin-right:55px;" v-model="form.small"></el-input>
              </el-form-item>
            </div>
            <div class="receivables">
              <span v-if="status!='3'" class="text">
                <template v-if="form.payment_mode=='1'">扫码收款</template>
                <template v-if="form.payment_mode=='2'">现金收款</template>
              </span>

              <el-radio-group v-else v-model="form.payment_mode" size="small">
                <el-radio-button :label="1">扫码收款</el-radio-button>
                <el-radio-button :label="2">现金收款</el-radio-button>
              </el-radio-group>
              <div v-if="status!='3'">
                <span>{{datanames.set_account_name}}￥{{form.arrears}}</span>
                <br />
                <span>{{datanames.set_account_name}}￥{{form.payment}}</span>
              </div>

              <div v-if="form.payment_mode==1&&status=='3'">
                <div class="zfb">
                  <el-form-item label="结算账户 :" prop="set_account">
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

                        <el-input v-model="form.arrears">
                          <template slot="append">未收</template>
                        </el-input>
                        <!-- <i v-if="!showZf" class="el-icon-circle-plus-outline" @click="addType"></i> -->
                      </div>
                    </div>
                  </el-form-item>
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
            <div class="all">
              <p>
                总合计
                <span style="color:#FC2D1F">{{total+Number(form.money)-Number(form.small)}}</span>
              </p>
            </div>
            <h5 class="label">附图</h5>
            <div v-if="status=='3'">
              <commonUpload :limit="3" ref="comUpload" :imagesList="images"></commonUpload>
            </div>
            <template v-else>
              <div style="display:flex;align-items: center;margin-top:20px;">
                <img
                  :src="img"
                  alt
                  style="width:100px;height:100px;margin-right:10px;"
                  v-for="img in form.images"
                  :key="img.id"
                />
              </div>
            </template>

            <div class="botton-bottom">
              <!--  1部分出库 2已撤销 3草稿 4已出售 5待出库 -->
              <el-button type="primary" @click="save(3)" v-if="this.type=='add'">保存草稿</el-button>
              <el-button type="primary" @click="save(5)" v-if="this.type=='add'">出售</el-button>
              <template v-if=" this.type=='detail'">
                <el-button type="primary" @click="save(3)" v-if="this.status=='3'">保存草稿</el-button>
                <el-button type="primary" @click="save(5)" v-if="this.status=='3'">出售</el-button>
                <el-button type="primary" @click="delOrder" v-if="this.status=='3'">删除</el-button>

                <el-button type="primary" @click="Cancel" v-if="this.status=='5'">撤销</el-button>

                <el-button
                  type="primary"
                  @click="Outbound"
                  v-if=" this.status=='1'||this.status=='5'"
                >去出库</el-button>
                <el-button
                  type="primary"
                  @click="AllOut"
                  v-if="this.status=='1'||this.status=='5'"
                >全部出库</el-button>
              </template>
            </div>
          </div>
          <img :src="require('@/assets/images/chexiao.png')" alt v-if="status =='2' " class="img" />
        </el-col>
      </el-row>
    </el-form>
    <ShipType
      :mode.sync="form.mode"
      :dialogVisible="dialogVisible"
      :showCheckBox="true"
      :cusOne="cusOne"
      @hidedialogVisible="hidedialogVisible"
    ></ShipType>
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
  getPutSale,
  getDraft,
  getAllSales
} from "@/api/index";
import { warehouseSelectList } from "@/api/api";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
import SelectGoods from "@/components/SelectGoods";
import Region from "@/components/Region";
import commonUpload from "@/components/common-upload";
import ShipType from "@/components/ShipType";
import { validate } from "@/utils/validate";
export default {
  components: {
    SelectGoods,
    Region,
    commonUpload,
    ShipType
  },
  data() {
    let validateReceiptNumber = (rule, value, callback) => {
      if (!validate(value, "numDecimal")) {
        return callback(new Error("必须为数字且保留两位小数"));
      } else {
        callback();
      }
    };
    return {
      warehouses: [],
      cus: [],
      images: [],
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
        mode_address: [], //地址
        goods: [],
        payment_mode: "1", //收款方式
        arrears: "", //未收 欠款
        payment: "", //实收   全款
        total: ""
      },
      rules: {
        kid: [{ required: true, message: "客户必填", trigger: "change" }],
        warehouse: [{ required: true, message: "仓库必填", trigger: "change" }],
        set_account: [{ required: true, message: "必填", trigger: "change" }],
        sales: [{ required: true, message: "销售员必填", trigger: "change" }],
        create_time: [{ required: true, message: "必填", trigger: "change" }],

        type: [{ required: true, message: "必填", trigger: "change" }],
        money: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: validateReceiptNumber,
            trigger: "blur",
            message: "请输入正确金额"
          }
        ],
        small: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: validateReceiptNumber,
            trigger: "blur",
            message: "请输入正确金额"
          }
        ],

        set_account: [{ required: true, message: "必填", trigger: "change" }],

        arrears: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateReceiptNumber, trigger: "blur" }
        ]
      },
      cusOne: {},
      goodTable: [],

      orderStatus: enumSaleStatus,
      dialogImageUrl: "",
      dialogVisible: false,
      storeGood: [],
      orderType: [{ type: "1", value: "10" }],
      type: this.$route.query.type
    };
  },
  filters: {},
  watch: {
    $route(to, from) {
      if (to.path == "/sale/order_add?type=add") {
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
    this.getbaseSelect();
  },

  methods: {
    hidedialogVisible(e) {
      this.dialogVisible = false;
    },
    Outbound() {
      this.$router.push({
        path: "/purchase/newBuild",
        query: {
          status: "27",
          id: this.$route.query.id,
          type: "1"
        }
      });
      // // 是否有一个大于0
      // if (this.tableData.some(val => Number(val.num) > 0)) {
      //   let option = [];
      //   this.tableData.forEach(val => {
      //     option.push({ id: val.id, num: val.num });
      //   });

      //   saleDepot(this.$route.query.id, {
      //     option: option
      //   }).then(res => {});
      // } else {
      //   this.$message.error("请至少输入一条商品的出库数量");
      // }
    },
    editMode() {
      this.dialogVisible = true;
      this.form.mode = this.cusOne.mode;
    },

    getOrder() {
      saleDetail(this.$route.query.id).then(res => {
        this.tableData = res.list.goods;
        (this.images = res.list.images), (this.number = res.list.number);
        this.datanames = res.list;
        this.status = res.list.status.toString();

        this.form = {
          kid: Number(res.list.kid),
          warehouse: res.list.warehouse,

          sales: res.list.sales, //销售员id
          create_time: res.list.create_time,
          des: res.list.des, //备注
          mode: res.list.mode, //发货方式
          images: res.list.images
            ? res.list.images.map(val => process.env.BASE_API + "/" + val)
            : [], //图片
          type: res.list.type, //账目类型
          money: res.list.money, //金额
          small: res.list.small, //抹零
          status: res.list.status.toString(), //状态
          set_account: res.list.set_account, //结算账户
          total: res.list.total, //应收金额
          payment: res.list.payType, //实收金额
          mode_address: res.list.mode_address, //地址
          goods: res.list.goods,
          payment_mode: res.list.payment_mode.toString(), //收款方式
          arrears: res.list.arrears, //未收 欠款
          payment: res.list.payment, //实收   全款
          total: res.list.total
        };

        (this.goodTable = res.list.goods),
          (this.cusOne = this.cus.find(val => val.id == this.form.kid));

        let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))];

        this.getGoodTable(goodId).then(x => {
          let a = x;

          a.forEach(val => {
            res.list.goods.forEach(item => {
              if (val.product_id == item.product_id) {
                (val.put_number = item.put_number),
                  (val.price = item.price), //单价
                  (val.discount = item.discount), //折扣
                  (val.discount_price = item.discount_price);
                val.money = item.money;
                val.discount_money = item.discount_money;
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

    // 全部出库
    AllOut() {
      saleAllDepot(this.$route.query.id).then(res => {
        this.goBack();
        this.$message.success(res.msg);
      });
    },
    // 撤销
    Cancel() {
      saleRevoke(this.$route.query.id).then(res => {
        this.goBack();
        this.$message.success(res.msg);
      });
    },
    delOrder() {
      saleDel(this.$route.query.id).then(res => {
        if (res.code == 200) {
          this.goBack();
        }
      });
    },
    changeCus() {
      this.cusOne = this.cus.find(val => val.id == this.form.kid);
      this.form.mode = this.cusOne.mode;
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
      this.$refs.form.validate(vaild => {
        if (vaild) {
          // e状态 状态 1部分出库 2已撤销 3草稿 4已出售 5待出库
          this.$nextTick(() => {
            let images = [];
            this.$refs.comUpload.fileList
              ? this.$refs.comUpload.fileList.forEach(val =>
                  images.push(val[0])
                )
              : "";
            this.status = e;

            this.form.images = images;
            this.form.goods = this.goodTable;
            this.form.status = this.status;

            let aff;
            let httpName = "";
            this.form.total =
              this.total + Number(this.form.money) - Number(this.form.small);
            this.form.payment = this.form.total - this.form.arrears;

            if (this.form.mode == "1") {
              this.form.mode_address = "";
            } else {
              this.form.mode_address = this.cusOne.mode_address;
            }
            if (this.type == "add") {
              saleAdd(this.form).then(res => {
                if (res.code == 200) {
                  this.$message.success(res.msg);
                  this.goBack();
                }
              });
            } else {
              this.form.id = this.$route.query.id;

              this.form.mode_address = this.cusOne.mode_address
                ? this.cusOne.mode_address
                : "";
              if (this.status == "3") {
                httpName = getDraft;
              }
              if (this.status == "5") {
                httpName = getPutSale;
              }

              httpName(this.$route.query.id, this.form).then(res => {
                if (res.code == 200) {
                  this.$message.success(res.msg);
                  this.goBack();
                }
              });
            }
          });
        }
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
  margin-bottom: 20px;
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
