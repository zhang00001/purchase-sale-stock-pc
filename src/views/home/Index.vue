<template>
  <div class="app-container">
    <el-row>
      <el-col :span="15">
        <el-card class="box-card">
          <h5 class="label">待处理单据</h5>
          <div class="box">
            <div class="row">
              <h6>{{baseData.sale_put?baseData.sale_put:0}}</h6>
              <p>待出库-销售</p>
            </div>
            <div class="row">
              <h6>{{baseData.prepare_put?baseData.prepare_put:0}}</h6>
              <p>待出库-配货</p>
            </div>

            <div class="row">
              <h6>{{baseData.production_put?baseData.production_put:0}}</h6>
              <p>待入库-生产</p>
            </div>
            <div class="row">
              <h6>{{baseData.purchase_put?baseData.purchase_put:0}}</h6>
              <p>待入库-采购</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-card class="box-card">
          <h5 class="label">库存预警</h5>
          <div class="box">
            <div class="row">
              <h6>{{baseData.stock_upper?baseData.stock_upper:0}}</h6>
              <p style="color:#FF3A3A">
                <img :src="require('@/assets/images/Group.png')" alt />
                <span>超出预警上线</span>
              </p>
            </div>
            <div class="row">
              <h6>{{baseData.stock_lower?baseData.stock_lower:0}}</h6>
              <p style="color:#55A1FF">
                <img :src="require('@/assets/images/Group2.png')" alt />
                <span>低于预警下线</span>
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24" style="margin-top:40px;">
        <el-card class="box-card">
          <el-col :span="14">
            <h5 class="label center">销售数据</h5>
            <div class="box">
              <div class="circular">今日</div>
              <div class="row">
                <h6>¥{{baseData.today_sale_money?baseData.today_sale_money:0}}</h6>
                <p>
                  <span>销售金额</span>
                </p>
              </div>
              <div class="row">
                <h6>{{baseData.today_sale_num?baseData.today_sale_num:0}}</h6>
                <p>
                  <span>销售数量</span>
                </p>
              </div>
              <div class="circular" style="background:rgba(175,162,201,1);">昨日</div>
              <div class="row">
                <h6>¥{{baseData.today_sale_money?baseData.today_sale_money:0}}</h6>
                <p>
                  <span>销售金额</span>
                </p>
              </div>
              <div class="row">
                <h6>{{baseData.yesterday_sale_num?baseData.yesterday_sale_num:0}}</h6>
                <p>
                  <span>销售数量</span>
                </p>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <h5 class="label center">应收应付统计</h5>
            <div class="box">
              <div class="row">
                <h6>{{baseData.total?baseData.total:0}}</h6>
                <p>应收客户款</p>
              </div>
              <div class="row">
                <h6>{{baseData.pay?baseData.pay:0}}</h6>
                <p>应付供应商款</p>
              </div>
            </div>
          </el-col>
          <el-col :span="14" style="     margin: 40px 0;">
            <h5 class="label center">采购数据</h5>
            <div class="box">
              <div class="circular">今日</div>
              <div class="row">
                <h6>¥{{baseData.today_purchase_money?baseData.today_purchase_money:0}}</h6>
                <p>
                  <span>采购金额</span>
                </p>
              </div>
              <div class="row">
                <h6>{{baseData.today_purchase_num?baseData.today_purchase_num:0}}</h6>
                <p>
                  <span>采购数量</span>
                </p>
              </div>
              <div class="circular" style="background:rgba(175,162,201,1);">昨日</div>
              <div class="row">
                <h6>¥{{baseData.yesterday_purchase_money?baseData.yesterday_purchase_money:0}}</h6>
                <p>
                  <span>采购金额</span>
                </p>
              </div>
              <div class="row">
                <h6>{{baseData.yesterday_purchase_num?baseData.yesterday_purchase_num:0}}</h6>
                <p>
                  <span>采购数量</span>
                </p>
              </div>
            </div>
          </el-col>
          <el-col :span="8" style="     margin: 40px 0;">
            <h5 class="label center">应收应付统计</h5>
            <div class="box">
              <div class="row">
                <h6>{{baseData.stock?baseData.stock:0}}</h6>
                <p>库存总数</p>
              </div>
              <div class="row">
                <h6>{{baseData.cost?baseData.cost:0}}</h6>
                <p>库存总成本</p>
              </div>
            </div>
          </el-col>
        </el-card>

        <el-col :span="24" style="margin-top:40px;">
          <el-card class="box-card">
            <div class="box quick">
              <div @click="goHome(1)">
                <img :src="require('@/assets/images/Group 20.png')" alt />
                <p>采购</p>
              </div>
              <div @click="goHome(2)">
                <img :src="require('@/assets/images/Group 22.png')" alt />
                <p>销售</p>
              </div>
              <div @click="goHome(3)">
                <img :src="require('@/assets/images/Group 24.png')" alt />
                <p>收银前台</p>
              </div>
              <div @click="goHome(4)">
                <img :src="require('@/assets/images/Group 26.png')" alt />
                <p>库存</p>
              </div>
              <div @click="goHome(5)">
                <img :src="require('@/assets/images/Group 28.png')" alt />
                <p>客户管理</p>
              </div>
              <div @click="goHome(6)">
                <img :src="require('@/assets/images/Group 30.png')" alt />
                <p>商品管理</p>
              </div>
              <div @click="goHome(7)">
                <img :src="require('@/assets/images/Group 32.png')" alt />
                <p>客户对账</p>
              </div>
              <!-- <div @click="goHome(8)">
                <img :src="require('@/assets/images/Group 34.png')" alt />
                <p>客户销量排行</p>
              </div>-->
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { index } from "@/api/index";
import http from "@/utils/request";
export default {
  data() {
    return {
      baseData: {}
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getBaseData();
  },
  methods: {
    async getBaseData() {
      let res = await index();
      if (res) {
        this.baseData = res.data;
      }
    },
    goHome(e) {
      switch (e) {
        case 1:
          this.$router.push({ path: "/purchase/order" });
          break;
        case 2:
          this.$router.push({ path: "/sale/order" });
          break;
        case 3:
          this.$router.push({ path: "/sale/reception" });
          break;
        case 4:
          this.$router.push({ path: "/warehouse/stock_query" });
          break;
        case 5:
          this.$router.push({ path: "/customer/list" });
          break;
        case 6:
          this.$router.push({ path: "/commodity/list" });
          break;
        case 7:
          this.$router.push({ path: "/finance/customer_list/id2" });
          break;
        default:
          this.$router.push({ path: "/home" });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.quick {
  div {
    cursor: pointer;
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
.quick {
  img {
    margin-bottom: 20px;
  }
}
.circular {
  width: 60px;
  height: 60px;
  background: #55a1ff;
  border-radius: 50%;
  line-height: 60px;
  font-size: 20px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}
.box {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 20px 20px 0 20px;
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
  }
}
</style>
