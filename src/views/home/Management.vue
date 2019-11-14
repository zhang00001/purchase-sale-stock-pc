<template>
  <div class="management-status">
    <div class="box-card">
      <div class="box-card-header">
        <h5 class="sales-Order">销售汇总</h5>
        <el-button class="front-time" @click="timeType('1')">前一{{ this.typeName }}</el-button>
        <el-button class="front-time" @click="timeType('2')">后一{{ this.typeName }}</el-button>

        <div class="search-btn">
          <el-button
            type="text"
            v-for="item in searchList"
            :key="item.id"
            :class="{blue:isBlue===item.id}"
            @click="selectType(item.id)"
          >{{item.name}}</el-button>
        </div>
      </div>
      <div class="box-card-body">
        <el-card class="box-card">
          <el-row>
            <el-col :span="6">
              <div class="box">
                <div class="row">
                  <h6>{{saleDetail.sale_money.bill_sale_money }}</h6>
                  <p style="color:#55A1FF">
                    <span>
                      <img
                        v-if="this.saleDetail.sale_money.lower"
                        :src="require('@/assets/images/Group.png')"
                        alt
                      />
                      <img v-else :src="require('@/assets/images/Group2.png')" alt />
                    </span>

                    <span>
                      比{{ this.tableName}}
                      <template v-if="this.saleDetail.sale_money.lower">上升</template>
                      <template v-else>下降</template>
                    </span>
                  </p>
                  <p class="sale">销售金额: ￥{{saleDetail.sale_money.sale_money}}</p>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="box">
                <div class="row">
                  <h6>{{ this.saleDetail.sale_num.bill_sale_num }}</h6>
                  <p style="color:#55A1FF">
                    <span v-if="this.saleDetail.sale_num.lower">
                      <img :src="require('@/assets/images/Group.png')" alt />
                    </span>
                    <span v-else>
                      <img :src="require('@/assets/images/Group2.png')" alt />
                    </span>
                    <span>比{{ this.tableName }}{{ this.saleDetail.sale_num.lower ? "上升" : "下降" }}</span>
                  </p>
                  <p class="sale">销售单数: ￥{{ this.saleDetail.sale_num.sale_num }}</p>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="box">
                <div class="row">
                  <h6>{{ this.saleDetail.return_money.bill_return_money }}</h6>
                  <p style="color:#55A1FF">
                    <span v-if="this.saleDetail.return_money.lower">
                      <img :src="require('@/assets/images/Group.png')" alt />
                    </span>
                    <span v-else>
                      <img :src="require('@/assets/images/Group2.png')" alt />
                    </span>
                    <span>比{{ this.tableName }}{{ this.saleDetail.return_money.lower ? "上升" : "下降" }}</span>
                  </p>
                  <p class="sale">退货今日: ￥{{ this.saleDetail.return_money.return_money }}</p>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="box">
                <div class="row">
                  <h6>{{ this.saleDetail.return_num.bill_return_num }}</h6>
                  <p style="color:#55A1FF">
                    <span v-if="this.saleDetail.return_num.lower">
                      <img :src="require('@/assets/images/Group.png')" alt />
                    </span>
                    <span v-else>
                      <img :src="require('@/assets/images/Group2.png')" alt />
                    </span>
                    <span>比{{ this.tableName }}{{ this.saleDetail.return_num.lower ? "上升" : "下降" }}</span>
                  </p>
                  <p class="sale">退货单数: {{ this.saleDetail.return_num.return_num }}</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <div class="box-table-sale">
            <table border="1">
              <tr class="table">
                <th>支付方式</th>
                <th>现金</th>
                <th>支付宝</th>
                <th>银行卡</th>
                <th>微信</th>
                <th>合计</th>
              </tr>
              <tr>
                <th>支付笔数</th>
                <td>
                  {{ this.saleDetail.xian.xian_num.bill_num }}
                  <img
                    v-if="saleDetail.xian.xian_num.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
                <td>
                  {{ this.saleDetail.ali.ali_num.ali_num }}
                  <img
                    v-if="saleDetail.ali.ali_num.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
                <td>
                  {{ this.saleDetail.blank.blank_num.blank_num }}
                  <img
                    v-if="saleDetail.blank.blank_num.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
                <td>
                  {{ this.saleDetail.weChat.weChat_num.weChat_num }}
                  <img
                    v-if="saleDetail.weChat.weChat_num.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
                <td>
                  {{ this.saleDetail.sum.sum_num.sum_num }}
                  <img
                    v-if="saleDetail.sum.sum_num.sum_num.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
              </tr>
              <tr>
                <th>支付金额</th>
                <td>
                  {{ this.saleDetail.xian.xian_money.xian_money }}
                  <img
                    v-if="saleDetail.xian.xian_money.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
                <td>
                  {{ this.saleDetail.ali.ali_money.ali_money }}
                  <img
                    v-if="saleDetail.ali.ali_money.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
                <td>
                  {{ this.saleDetail.blank.blank_money.blank_money }}
                  <img
                    v-if="saleDetail.blank.blank_money.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
                <td>
                  {{ this.saleDetail.weChat.weChat_money.weChat_money }}
                  <img
                    v-if="saleDetail.weChat.weChat_money.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
                <td>
                  {{ this.saleDetail.sum.sum_money.sum_money }}
                  <img
                    v-if="saleDetail.sum.sum_money.sum_money.lower"
                    class="img-cur"
                    src="@/assets/images/Group2.png"
                  />
                  <img v-else class="img-cur" src="@/assets/images/Group.png" />
                </td>
              </tr>
            </table>
          </div>
        </el-card>
      </div>
    </div>

    <div class="box-card">
      <div class="box-card-header">
        <h5 class="sales-Order">客户分析</h5>
        <el-button class="front-time" @click="timeBtn(1,1,customerStart)">前一日</el-button>
        <el-button class="front-time" @click="timeBtn(1,2,customerStart)">后一日</el-button>
        <div class="search">
          <el-form class="search-form-input" ref="form" :model="form">
            <el-form-item prop="Supplier" label-width="20px">
              <el-date-picker
                v-model="customerStart"
                type="date"
                placeholder="请选择时间"
                value-format="yyyy-MM-dd"
                class="datepicker"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="box-card-body">
        <el-card class="box-card">
          <el-row class="customer-card">
            <el-col :span="5">
              <div class="box">
                <div class="row">
                  <h6>{{ this.customerDetail.money.bill_money }}</h6>
                  <p style="color:#55A1FF">
                    <img
                      v-if="customerDetail.money.lower"
                      :src="require('@/assets/images/Group.png')"
                      alt
                    />
                    <img v-else :src="require('@/assets/images/Group2.png')" alt />
                    <span v-if="customerDetail.money.lower">比昨日上升</span>
                    <span v-else>比昨日下降</span>
                  </p>
                  <p class="sale">总消费金额: ￥{{ this.customerDetail.money.money }}</p>
                </div>
              </div>
            </el-col>

            <el-col :span="10">
              <div class="box">
                <div class="row">
                  <h6>{{ this.customerDetail.num.bill_num }}</h6>
                  <p style="color:#55A1FF">
                    <img
                      v-if="customerDetail.num.lower"
                      :src="require('@/assets/images/Group.png')"
                      alt
                    />
                    <img v-else :src="require('@/assets/images/Group2.png')" alt />
                    <span v-if="customerDetail.num.lower">比昨日上升</span>
                    <span v-else>比昨日下降</span>
                  </p>

                  <p class="sale">总件数: {{ this.customerDetail.num.num }}</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <div class="table-data">
            <el-table :data="tableData" border class="management-table">
              <el-table-column label="客户名称" prop="kid" align="center"></el-table-column>
              <el-table-column label="件数" prop="num" align="center"></el-table-column>
              <el-table-column label="金额" prop="payment" align="center"></el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination
                @current-change="handleCustomerChange"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="this.customerDetail.total"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="box-card">
      <div class="box-card-header">
        <h5 class="sales-Order">商品分析</h5>
        <el-button class="front-time" @click="timeBtn(2,1,goodsStart)">前一日</el-button>
        <el-button class="front-time" @click="timeBtn(2,2,goodsStart)">后一日</el-button>
        <div class="search">
          <el-form class="search-form-input" ref="form" :model="form">
            <el-form-item prop="Supplier" label-width="20px">
              <el-date-picker
                v-model="goodsStart"
                type="date"
                placeholder="请选择时间"
                value-format="yyyy-MM-dd"
                class="datepicker"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="box-card-body">
        <el-card class="box-card">
          <el-row class="customer-card">
            <el-col :span="5">
              <div class="box">
                <div class="row">
                  <h6>{{ this.goodsDetail.money.bill_money }}</h6>
                  <p style="color:#55A1FF">
                    <img
                      v-if="goodsDetail.money.lower"
                      :src="require('@/assets/images/Group.png')"
                      alt
                    />
                    <img v-else :src="require('@/assets/images/Group2.png')" alt />
                    <span v-if="goodsDetail.money.lower">比昨日上升</span>
                    <span v-else>比昨日下降</span>
                  </p>
                  <p class="sale">总金额: ￥{{ this.goodsDetail.money.money }}</p>
                </div>
              </div>
            </el-col>

            <el-col :span="10">
              <div class="box">
                <div class="row">
                  <h6>{{ this.goodsDetail.num.bill_num }}</h6>
                  <p style="color:#55A1FF">
                    <img
                      v-if="goodsDetail.num.lower"
                      :src="require('@/assets/images/Group.png')"
                      alt
                    />
                    <img v-else :src="require('@/assets/images/Group2.png')" alt />
                    <span v-if="goodsDetail.num.lower">比昨日上升</span>
                    <span v-else>比昨日下降</span>
                  </p>
                  <p class="sale">总件数: ￥{{ this.goodsDetail.num.num }}</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <div class="table-data">
            <el-table :data="tableData" border class="management-table">
              <el-table-column label="商品名称" prop="name" align="center"></el-table-column>
              <el-table-column label="品牌" prop="brand_name" align="center"></el-table-column>
              <el-table-column label="单位" prop="unit_name" align="center"></el-table-column>
              <el-table-column label="数量" prop="num" align="center"></el-table-column>
              <el-table-column label="合计金额" prop="money" align="center"></el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination
                @current-change="handleGoodsChange"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="this.goodsDetail.total"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="box-card">
      <div class="box-card-header">
        <h5 class="sales-Order">店员分析</h5>
        <el-button class="front-time" @click="timeBtn(3,1,clerkStart)">前一日</el-button>
        <el-button class="front-time" @click="timeBtn(3,2,clerkStart)">后一日</el-button>
        <div class="search">
          <el-form class="search-form-input" ref="form" :model="form">
            <el-form-item prop="Supplier" label-width="20px">
              <el-date-picker
                v-model="clerkStart"
                type="date"
                placeholder="请选择时间"
                value-format="yyyy-MM-dd"
                class="datepicker"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="box-card-body">
        <el-card class="box-card">
          <el-row class="customer-card">
            <el-col :span="5">
              <div class="box">
                <div class="row">
                  <h6>{{ this.clerkDetail.money.bill_money }}</h6>
                  <p style="color:#55A1FF">
                    <img
                      v-if="clerkDetail.money.lower"
                      :src="require('@/assets/images/Group.png')"
                      alt
                    />
                    <img v-else :src="require('@/assets/images/Group2.png')" alt />
                    <span v-if="clerkDetail.money.lower">比昨日上升</span>
                    <span v-else>比昨日下降</span>
                  </p>
                  <p class="sale">总金额: ￥{{ this.clerkDetail.money.money }}</p>
                </div>
              </div>
            </el-col>

            <el-col :span="10">
              <div class="box">
                <div class="row">
                  <h6>{{ this.clerkDetail.num.bill_num }}</h6>
                  <p style="color:#55A1FF">
                    <img
                      v-if="clerkDetail.num.lower"
                      :src="require('@/assets/images/Group.png')"
                      alt
                    />
                    <img v-else :src="require('@/assets/images/Group2.png')" alt />
                    <span v-if="clerkDetail.num.lower">比昨日上升</span>
                    <span v-else>比昨日下降</span>
                  </p>
                  <p class="sale">总件数: ￥{{ this.clerkDetail.num.num }}</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <div class="table-data">
            <el-table :data="clerkTableData" border class="management-table">
              <el-table-column label="店员" prop="sales" align="center"></el-table-column>
              <el-table-column label="单数" prop="num" align="center"></el-table-column>
              <el-table-column label="金额" prop="payment" align="center"></el-table-column>
              <el-table-column label="客单价" prop="price" align="center"></el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination
                @current-change="handleClerkChange"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="this.clerkDetail.total"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="box-card">
      <div class="box-card-header">
        <h5 class="sales-Order">利润统计</h5>
        <div class="profit">
          <el-button
            type="text"
            v-for="item in orderStatus"
            :key="item.id"
            :class="{blue:isBlue===item.id}"
            @click="selectGoods(item.id)"
          >{{item.name}}</el-button>
        </div>
      </div>
      <div class="box-card-body">
        <el-card class="box-card">
          <el-row>
            <el-col :span="6">
              <div class="box">
                <div class="row">
                  <div class="money">￥{{ this.goodsProfitDetail.money }}</div>
                  <p class="sale">总销售金额</p>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="box">
                <div class="row">
                  <div class="money">￥{{ this.goodsProfitDetail.cost }}</div>
                  <p class="sale">总成本</p>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="box">
                <div class="row">
                  <div class="money">￥{{ this.goodsProfitDetail.small }}</div>
                  <p class="sale">抹零</p>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="box">
                <div class="row">
                  <div class="money">￥{{ this.goodsProfitDetail.profit }}</div>
                  <p class="sale">总毛利</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <div class="table-data">
            <el-table :data="goodsTableData" border style="width: 100%" class="management-table">
              <el-table-column label="商品名称" prop="name" align="center" v-if="this.query == '1'"></el-table-column>
              <el-table-column label="门店" prop="store_name" align="center" v-if="this.query == '2'"></el-table-column>
              <el-table-column label="成本" prop="cost" align="center"></el-table-column>
              <el-table-column label="数量" prop="num" align="center"></el-table-column>
              <el-table-column label="毛利" prop="profit" align="center"></el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="this.goodsProfitDetail.total"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/request";
import {
  customerAnal,
  SaleSummary,
  goodsProfit,
  storeProfit,
  goodsAnal,
  clerkAnal
} from "@/api/api";
export default {
  data() {
    return {
      orderStatus: [
        { id: "1", name: "商品利润" },
        { id: "2", name: "门店利润" }
      ],
      searchList: [
        { id: "1", name: "日" },
        { id: "2", name: "周" },
        { id: "3", name: "月" },
        { id: "4", name: "年" }
      ],
      planState: [],
      tableData: [],
      goodsTableData: [],
      clerkTableData: [],
      clerkDetail: [],
      listQuery: {},
      goodsTableData: [],
      customerTableData: [],
      saleTableData: [],
      saleDetail: {
        ali: { ali_money: {}, ali_num: {} },
        blank: {
          blank_money: {},
          blank_num: {}
        },
        return_money: {},
        return_num: {},
        blank: {},
        sale_money: {},
        sale_num: {},
        sum: { sum_money: {}, sum_num: {} },
        weChat: { weChat_money: {}, weChat_num: {} },
        xian: { xian_money: {}, xian_num: {} }
      },
      form: {},
      goodsProfitDetail: {},
      formDetail: {},
      customerDetail: {},
      goodsDetail: {},
      listQuery: {
        size: 10,
        page: 1
      },
      total: 0,
      end_time: "",
      query: "1",
      isBlue: "1",
      typeId: "",
      typeName: "日",
      tableName: "昨日",
      saleType: "date",
      count: "0",
      cumulative: "0",
      firstArr: [{ id: null, name: "全部" }], // 下拉列表全部
      customerStart: new Date(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 8 * 60 * 60 * 1000
      ).toISOString(),
      customerEnd: new Date(
        new Date(new Date().setHours(23, 59, 59, 0)).getTime() +
          8 * 60 * 60 * 1000
      ).toISOString(),
      goodsStart: new Date(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 8 * 60 * 60 * 1000
      ).toISOString(),
      goodsEnd: new Date(
        new Date(new Date().setHours(23, 59, 59, 0)).getTime() +
          8 * 60 * 60 * 1000
      ).toISOString(),
      clerkStart: new Date(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 8 * 60 * 60 * 1000
      ).toISOString(),
      clerkEnd: new Date(
        new Date(new Date().setHours(23, 59, 59, 0)).getTime() +
          8 * 60 * 60 * 1000
      ).toISOString()
    };
  },

  created() {
    console.log(this.customerStart);
    this.getSaleDetail(); // 销售汇总
    this.getcustomerDetail(); // 客户分析
    this.getGoodsDetail(); // 商品分析
    this.getClerkDetail(); // 店员分析
    this.getGoodsProfitDetail(); // 商品利润
  },

  methods: {
    // 销售汇总
    async getSaleDetail() {
      let res = await SaleSummary({
        params: {
          type: this.saleType,
          num: this.count
        }
      });

      if (res.code == 200) {
        this.saleDetail = res.data;

        this.saleTableData = res.data.data;
      } else {
        this.$message.error(res.message);
      }
    },

    // 客户分析
    getcustomerDetail(customerStart, customerEnd) {
      customerAnal({
        params: {
          ...this.listQuery,
          end_time: this.customerEnd,
          start_time: this.customerStart
        }
      }).then(res => {
        if (res.code == 200) {
          this.customerDetail = res.data;
          this.customerTableData = res.data.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 商品分析
    getGoodsDetail(goodsStart, goodsEnd) {
      goodsAnal({
        params: {
          ...this.listQuery,
          end_time: this.goodsStart,
          start_time: this.goodsEnd
        }
      }).then(res => {
        if (res.code == 200) {
          this.goodsDetail = res.data;
          this.goodsTableData = res.data.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 店员分析
    getClerkDetail(clerkStart, clerkEnd) {
      clerkAnal({
        params: {
          ...this.listQuery,
          end_time: this.clerkStart,
          start_time: this.clerkEnd
        }
      }).then(res => {
        if (res.code == 200) {
          this.clerkDetail = res.data;
          this.clerkTableData = res.data.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 商品利润
    getGoodsProfitDetail() {
      goodsProfit({
        params: {
          ...this.listQuery
        }
      }).then(res => {
        if (res.code == 200) {
          this.goodsTableData = res.data.data;
          this.goodsProfitDetail = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 销售汇总前一日 后一日
    timeType(selecParams) {
      if (selecParams == "1") {
        this.count--;
      } else {
        this.count++;
      }
      // console.log(this.count);
      this.getSaleDetail();
    },

    // 销售类型搜索
    selectType(typeId) {
      switch (typeId) {
        case "1":
          this.typeName = "日";
          this.tableName = "昨日";
          this.saleType = "date";
          this.count = 0;
          break;
        case "2":
          this.typeName = "周";
          this.tableName = "上周";
          this.saleType = "week";
          this.count = 0;
          break;
        case "3":
          this.typeName = "月";
          this.tableName = "上月";
          this.saleType = "month";
          this.count = 0;
          break;
        case "4":
          this.typeName = "年";
          this.tableName = "上一年";
          this.saleType = "year";
          this.count = 0;
          break;
      }
      this.typeId = typeId;
      this.isBlue = typeId;
      this.getSaleDetail();
      this.count = 0;
    },

    // 商品 门店 利润排名
    selectGoods(query) {
      this.isBlue = query;
      this.query = query;
      if (query == "1") {
        goodsProfit({
          params: {
            ...this.listQuery
          }
        }).then(res => {
          if (res.code == 200) {
            this.goodsTableData = res.data.data;
            this.goodsProfitDetail = res.data;
          } else {
            this.$message.error(res.message);
          }
        });
      } else if (query == "2") {
        storeProfit({
          params: {
            ...this.listQuery
          }
        }).then(res => {
          if (res.code == 200) {
            this.goodsTableData = res.data.data;
            this.goodsProfitDetail = res.data;
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },

    // 获取前一日 后一日 type:1 客户分析 2 商品分析3 店员分析 status:1前一日 2一日
    timeBtn(type, status, date) {
      let startTime = this.$common.getDayTime(status, date).startTime;
      let endTime = this.$common.getDayTime(status, date).endTime;
      switch (type) {
        case 1:
          this.customerStart = startTime;
          this.customerEnd = endTime;
          this.getcustomerDetail(this.customerStart, this.customerEnd);
          break;
        case 2:
          this.goodsStart = startTime;
          this.goodsEnd = endTime;
          this.getGoodsDetail(this.goodsStart, this.goodsEnd);
          break;
        case 3:
          this.clerkStart = startTime;
          this.clerkEnd = endTime;
          this.getClerkDetail(this.clerkStart, this.clerkEnd);
          break;
        default:
          this.date0 = "";
      }
    },

    // 点击利润统计表格分页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getGoodsProfitDetail();
    },

    // 点击客户表格分页
    handleCustomerChange() {
      this.listQuery.page = val;
      this.getcustomerDetail();
    },

    // 点击商品表格分页
    handleGoodsChange() {
      this.listQuery.page = val;
      this.getGoodsDetail();
    },

    // 点击店员表格分页
    handleClerkChange() {
      this.listQuery.page = val;
      this.getClerkDetail();
    }
  }
};
</script>

<style lang="scss" scoped>
.management-status {
  .box-card {
    padding-bottom: 30px;
    .box-card-header {
      display: flex;
      height: 50px;
      background-color: #55a1ff;
      padding: 5px 0;
      .profit {
        height: 32px;
        background-color: #fff;
        margin-left: 920px;
        border-radius: 5px;
        .el-button {
          padding: 9px 0;
          height: 32px;
          width: 90px;
        }
      }
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
        margin: 5px 0 0 570px;
        height: 32px;
        border-radius: 5px;
        .el-button {
          width: 66px;
          height: 32px;
          line-height: 10px;
        }
      }
    }
    .search {
      .search-form-input {
        display: flex;
        margin-left: 620px;
      }
    }
    .box-card-body {
      .box-table {
        margin: 0 85px 90px 85px;
      }
      .box-table-sale {
        margin: 0 85px 40px 85px;
      }
      .customer-card {
        padding-left: 495px;
      }
      .management-table {
        .el-table__body-wrapper {
          img {
            position: absolute;
            left: 102px;
          }
        }
        h5 {
          font-size: 17px;
          color: #909399;
        }
      }
    }
    .box {
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding: 20px 20px 0 20px;
      margin-bottom: 43px;
      border-bottom: 1px solid #fff;
      .row {
        .money {
          font-size: 22px;
        }
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
          color: #999999;
          font-size: 16px;
          margin-top: 20px;
        }
      }
    }
  }
}
table {
  border-collapse: collapse;
  border: 1px solid #e9e9e9;
}
table tr {
  border: 1px solid black;
}
   table tr td {
  border: 1px solid black;
}
table  {
  width: 250px;
}
table tr th {
  width: 250px;
  height: 45px;
  color: #909399;
  font-size: 14px;
}
table tr td {
  width: 250px;
  height: 45px;
  color: #606266;
  font-size: 14px;
  text-align: center;
}
table tr td img {
  position: relative;
  left: 7px;
  top: 5px;
}
/deep/.search {
  .el-input__inner {
    height: 30px !important;
  }
}
.table-data {
  margin: 0 90px;
}
.blue {
  background-color: #e1eeff;
}
</style>