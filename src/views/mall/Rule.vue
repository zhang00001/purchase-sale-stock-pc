<template>
  <div class="app-container">
    <div class="box-inform">
      <div>
        <h5 class="sales-Order">上架商品</h5>
        <div class="goods">
          <div>
            <span class="marginR20">已上架商品数 : {{ ruleDetail.shop_onsale.onsalse }}</span>
            <span class="color-blue" @click="goInto('1')">批量上/下架商品</span>
          </div>
          <div class="marginR600">
            <span class="marginR20">进销存商品总数 : {{ ruleDetail.shop_onsale.total }}</span>
            <span class="color-blue" @click="goInto('2')">管理进销存商品</span>
          </div>
        </div>
      </div>
    </div>
    <div class="box-inform">
      <div class="price-box">
        <h5 class="sales-Order">销售/价格展示</h5>
        <div class="goods">
          <div>
            <div>
              <span class="marginR20">销量展示 :</span>
              <span>
                <el-radio v-model="sale_show" label="1" @change="showSales('1')">展示销量</el-radio>
                <el-radio v-model="sale_show" label="0" @change="showSales('2')">不展示销量</el-radio>
              </span>
            </div>
            <div class="price-box-bottom">选择展示销量后,将展示该商品历史的所有的销量</div>
          </div>
          <div>
            <div>
              <span class="marginR20">默认价格类型 :</span>
              <span>
                <el-radio v-model="retail_price" label="1" @change="showSales('3')">零售价</el-radio>
                <el-radio v-model="retail_price" label="0" @change="showSales('4')">批发价</el-radio>
              </span>
            </div>
            <div class="price-box-goods">在店铺中商品只有价格，所以在进销存系统中同步商品时，需从批发价和零售价中选择一个价格进行同步</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-inform">
      <div>
        <h5 class="sales-Order">商品标签</h5>
        <div class="goods">
          <div>
            <span class="marginR20">精品商品数量 : {{ ruleDetail.tags_num.jp_num }}</span>
            <span class="color-blue" @click="setProduct('shop_name', 'id', '1')">批量设置</span>
          </div>
          <div>
            <span class="marginR20">热卖商品数量 : {{ ruleDetail.tags_num.rm_num }}</span>
            <span class="color-blue" @click="setProduct('shop_name', 'id', '2')">批量设置</span>
          </div>
          <div>
            <span class="marginR20">新品商品数量 : {{ ruleDetail.tags_num.xp_num }}</span>
            <span class="color-blue" @click="setProduct('shop_name', 'id', '3')">批量设置</span>
          </div>
        </div>
      </div>
    </div>
    <div class="box-inform">
      <div class="content-head">
        <h5 class="sales-Order">运费模板</h5>
        <el-button type="primary" class="search-bottom" @click="newBuild">新建运费模板</el-button>
      </div>

      <table
        class="mailTable"
        style="width: 100%;"
        v-for="(item, index ) in this.tableLength"
        :key="index"
      >
        <tr class="color80">
          <th>名称</th>
          <td>{{ tabledatil[index].name }}</td>
        </tr>
        <tr>
          <th>默认运费</th>
          <td>{{ tabledatil[index].df_first_num }}件内{{ tabledatil[index].df_first_cost }}元，每增加{{ tabledatil[index].df_add_num }}件，运费增加{{ tabledatil[index].df_add_cost }}元</td>
        </tr>
        <tr>
          <th>指定地区运费({{ tabledatil[index].area_list_name }})</th>
          <td>{{ tabledatil[index].first_num }}件内{{ tabledatil[index].first_cost }}元，每增加{{ tabledatil[index].add_num }}件，运费增加{{ tabledatil[index].add_cost }}元</td>
        </tr>
        <tr>
          <th>
            已选商品数:
            <span>{{ tabledatil[index].goods_num }}</span>
            <span
              class="color-blue ml5"
              @click="setProduct('shop_name', 'id', '6','images', tabledatil[index].id)"
            >批量设置</span>
          </th>
          <td>
            <el-button
              type="primary"
              class="set-btn"
              @click="setDefault(tabledatil[index].id)"
              v-if="!tabledatil[index].is_df_bool"
            >设为默认</el-button>
            <el-button type="primary" class="set-btn" @click="setAll(tabledatil[index].id)">应用至所有商品</el-button>
            <el-button type="primary" class="set-btn">编辑</el-button>
            <el-button
              type="primary"
              class="set-btn"
              @click="delectTemplate(tabledatil[index].id)"
            >删除</el-button>
          </td>
        </tr>
      </table>

      <table class="mailTable" style="width:100%;margin-top:30px">
        <tr class="color80">
          <th>包邮</th>
          <td></td>
        </tr>
        <tr>
          <th>全国各地包邮</th>
        </tr>
        <tr>
          <th>
            已选商品数:
            <span>{{ freeDetail.goods_num }}</span>
            <span
              class="color-blue ml5"
              @click="setProduct('shop_name', 'id', '6','images', '1')"
            >批量设置</span>
          </th>
          <td>
            <el-button
              type="primary"
              class="set-btn"
              @click="setDefault('1')"
              v-if="!freeDetail.is_df_bool"
            >设为默认</el-button>
            <el-button type="primary" class="set-btn" @click="setAll('1')">应用至所有商品</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="box-btoon">
      <h5 class="sales-Order" style="margin-bottom: 20px">库存</h5>
      <div class="mb-10">
        <el-radio v-model="status" label="0" @change="switchStatus">启用</el-radio>
        <el-radio v-model="status" label="1" @change="switchStatus">停用</el-radio>
      </div>
      <div class="price-tip">关闭时,不显示库存且可以负库存出售。开启时,可以在客户权限中设置向部分客户展示库存，但所有客户都不可以负库存出售。</div>
      <span class="marginR20">销量展示 :</span>
      <span>
        <el-radio v-model="count_type" label="0" @change="storeStatus">进销存当前库存</el-radio>
        <el-radio v-model="count_type" label="1" @change="storeStatus">进销存可用库存</el-radio>
      </span>
      <div class="store-rules">
        <span class="marginR20">减库存 :</span>
        <el-checkbox v-model="store" @change="orderStatus">订单付款后减库存</el-checkbox>
      </div>

      <div class="save-botton">
        <el-button type="primary" @click="saveStore">保 存</el-button>
      </div>
    </div>

    <dialog-common-goods ref="dialogCommonGoods" @refresh="init"></dialog-common-goods>
    <dialog-build-template ref="dialogBuildTemplate"></dialog-build-template>
  </div>
</template>

<script>
import {
  salePriceShow,
  batchShopTag,
  repertoryConfig,
  getShopRule,
  setDefaultFreight,
  batchShopFreight,
  delFreight
} from "@/api/api";
import http from "@/utils/request";
import dialogCommonGoods from "@/components/dialog-common-goods";
import dialogBuildTemplate from "@/views/mall/dialog-build-template";
export default {
  components: {
    // batchSetupSialog
    dialogBuildTemplate,
    dialogCommonGoods
  },
  data() {
    return {
      sale_show: "",
      retail_price: "",
      form: {},
      ruleDetail: {
        shop_onsale: {},
        tags_num: {}
      },
      tableLength: "",
      freeTotal: "",
      status: "",
      count_type: "",
      store: "",
      listQuery: {
        size: 10,
        page: 1
      },
      total: 0,
      tabledatil: "",
      freeDetail: "",
      sub_count: ""
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      getShopRule({
        params: {
          ...this.listQuery
        }
      }).then(res => {
        if (res.code === 200) {
          this.ruleDetail = res.data;
          this.tableLength = res.data.freight.length - 1;
          this.tabledatil = res.data.freight;
          this.freeDetail = this.tabledatil[this.tabledatil.length - 1];
        } else {
          this.$message.error(res.message);
        }
      });
    },

    showSales(params) {
      switch (params) {
        case "1":
          this.operate = "展示商品销量";
          this.result = "将展示商品的所有历史销量，";
          this.saleParams = "1";
          break;
        case "2":
          this.operate = "不展示商品销量";
          this.result = "将取消展示商品的所有历史销量，";
          this.saleParams = "0";
          break;
        case "3":
          this.operate = "商品同步零售价";
          this.result = "该零售价格将被同步至商品，";
          this.retailParams = "1";
          break;
        case "4":
          this.operate = "商品同步批发价";
          this.result = "该批发价格将被同步至商品，";
          this.retailParamsapiParams = "0";
          break;
      }
      this.$common.confirm(
        {
          title: this.operate,
          content: this.result + "请谨慎操作"
        },
        () => {
          salePriceShow({
            sale_show: this.saleParams,
            retail_price: this.retailParams
          }).then(res => {
            if (res.code === 200) {
              if (params == "1") {
                this.$message.success("展示商品销量成功");
              } else if (params == "2") {
                this.$message.success("不展示商品销量成功");
              } else if (params == "3") {
                this.$message.success("商品同步零售价成功");
              } else if (params == "4") {
                this.$message.success("商品同步批发价成功");
              }
            } else {
              this.$message.error(res.message);
            }
          });
        }
      );
    },

    newBuild() {
      this.$refs.dialogBuildTemplate.init();
    },

    // 开关状态
    switchStatus(params) {
      this.status = params;
    },

    // 库存状态
    storeStatus(params) {
      this.count_type = params;
    },

    // 订单状态
    orderStatus(params) {
      if (params) {
        this.sub_count = "1";
      } else {
        this.sub_count = "0";
      }
    },

    // 库存配置保存
    saveStore() {
      this.$common.confirm(
        {
          title: "保存库存配置",
          content: "该库存配置将被保存，请谨慎操作"
        },
        () => {
          repertoryConfig({
            status: this.status,
            count_type: this.count_type,
            sub_count: this.sub_count
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("库存配置保存成功");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      );
    },

    // 设为默认
    setDefault(templateId) {
      this.$common.confirm(
        {
          title: "设为默认模板",
          content: "该模板将被设为默认模板，请谨慎操作"
        },
        () => {
          setDefaultFreight({
            id: templateId
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("设为默认模板成功");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      );
    },

    // 应用所有
    setAll(templateId) {
      this.$common.confirm(
        {
          title: "应用至所有商品",
          content: "该模板将被应用至所有商品，请谨慎操作"
        },
        () => {
          batchShopFreight({
            id: templateId,
            goods_id: "0"
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("该模板应用至所有商品成功");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      );
    },

    // 删除模板
    delectTemplate(templateId) {
      this.$common.confirm(
        {
          title: "删除模板",
          content: "该模板将被删除，请谨慎操作"
        },
        () => {
          delFreight({
            id: templateId
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("模板删除成功");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      );
    },

    goInto(params) {
      switch (params) {
        case "1":
          this.$router.push({ path: "/mall/upper" });
          break;
        case "2":
          this.$router.push({ path: "/commodity/list" });
          break;
      }
    },

    setProduct(shop_name, id, dialogType, images, templateId) {
      this.$refs.dialogCommonGoods.init(
        shop_name,
        id,
        dialogType,
        images,
        templateId
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.ml5 {
  margin-left: 15px;
}
.color-blue {
  color: #4e9bff;
  cursor: pointer;
}
.color80 {
  background-color: #f3f3f3;
}
table {
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
}
th {
  width: 200px;
  height: 50px;
}
table tr {
  height: 50px;
  border: 1px solid #e6eaee;
}
table tr td {
  width: 600px;
  height: 50px;
  border: 1px solid #e6eaee;
}
.content-head {
  display: flex;
  justify-content: space-between;
  .search-bottom {
    height: 40px;
    margin-bottom: 20px;
  }
}
.price-box-bottom {
  margin: 10px 0 0 93px;
  color: #878787;
  font-size: 14px;
}
.price-box-goods {
  margin: 10px 0 0 136px;
  color: #878787;
  font-size: 14px;
}
.goods {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
  .color-blue {
    color: #4e9bff;
    cursor: pointer;
  }
  .marginR600 {
    margin-right: 610px;
  }
  .marginR50 {
    margin-right: 40px;
  }
  .marginR20 {
    margin-right: 20px;
  }
}
.sales-Order {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  position: relative;
  text-indent: 10px;
  margin-bottom: 30px;
}
.sales-Order::after {
  content: "";
  left: 0;
  top: 3px;
  position: absolute;
  width: 4px;
  height: 14px;
  background: rgba(51, 51, 51, 1);
  border-radius: 3px;
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
.mailTable {
  margin-bottom: 30px;
}
.formula {
  .el-input-number {
    width: 110px;
  }
}
.set-btn {
  height: 20px;
  line-height: 2px;
  font-size: 12px;
}
.box-btoon {
  padding: 30px;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.save-botton {
  text-align: center;
  margin-top: 30px;
}
.store-rules {
  margin: 15px 0 0 15px;
}
</style>
