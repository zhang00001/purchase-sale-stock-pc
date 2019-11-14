<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <!-- <el-button @click="printPdf">打印测试</el-button> -->
          <el-form ref="form" :model="form" label-width="auto">
            <el-form-item label="模板类型：">
              <el-radio-group v-model="form.resource">
                <el-radio :label="item.id" v-for="item in tempType" :key="item.id">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="打印尺寸：">
              <ul class="printTemp">
                <li
                  v-for="(item,index) in temp"
                  :key="item.id"
                  class="printTempli"
                  @mouseenter="changeMask(0,item,index)"
                  @mouseleave="changeMask(1,item,index)"
                  @click="clickMask(item,index)"
                  :class="isIndex == index?'active':' '"
                >
                  <p class="title1">{{item.name}}</p>
                  <p>{{item.type}}</p>
                  <p>{{item.style}}</p>

                  <div class="prev" v-if="isHover===index">
                    <div style="position: relative;">
                      <div style="position:absolute;">
                        <strong class="ng-binding">{{item.type}}样例预览</strong>
                      </div>
                      <div>
                        <img style="max-width: 600px;" :src="item.img" alt />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </el-form-item>
            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="立即打印：">
                  <el-checkbox v-model="form.checked">开单后立即打印</el-checkbox>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="打印二维码：">
                  <el-select v-model="form.checked" placeholder="请选择">
                    <el-option label="开启" value="1"></el-option>
                    <el-option label="关闭" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="打印方式">
                  <el-select v-model="form.checked" placeholder="请选择">
                    <el-option label="按商品汇总明细" value="1"></el-option>
                    <el-option label="按单品明细" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="打印份数">
                  <el-input></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="单据名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="页眉">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="页脚">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="可配置字段">
              <el-checkbox-group v-model="form.checkList">
                <el-checkbox label="公司LOGO"></el-checkbox>
                <el-checkbox label="颜色列"></el-checkbox>
                <el-checkbox label="尺码列"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <el-button type="primary">保存</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getLodop } from "@/utils/lodop";
// import { Base64 } from "js-base64";
import { printNote } from "@/api/index";
export default {
  name: "demo",
  data() {
    return {
      isHover: "",
      isIndex: 0,
      form: { checkList: [] },
      tempType: [
        {
          id: 1,
          name: "销售单"
        },
        {
          id: 2,
          name: "销售退货单"
        },
        {
          id: 3,
          name: "零售单"
        },
        {
          id: 4,
          name: "采购单"
        },
        {
          id: 5,
          name: "采购退货单"
        },
        {
          id: 6,
          name: "库存调拨单"
        },
        {
          id: 7,
          name: "收款单"
        },
        {
          id: 8,
          name: "快速收款单"
        },
        {
          id: 9,
          name: "快递单"
        },
        {
          id: 10,
          name: "入库单"
        },
        {
          id: 11,
          name: "出库单"
        }
      ],

      temp: [
        {
          id: 1,
          name: "套打",
          type: "58mm小票",
          style: "基础模板",
          img:
            "http://thumb.dev.qinsilk.com/public/system/printTemplate/is_31_58mm.jpg"
        }
      ]
    };
  },
  methods: {
    clickMask(e, index) {
      this.isIndex = index;
    },
    // status 0 进入  1离开
    changeMask(status, e, index) {
      if (status == 0) {
        this.isHover = index;
      } else {
        this.isHover = "";
      }
    },

    // 查詢數據
    async printPdf() {
      // let res = await printNote({ type: "sale", id: "59" });
      // if (res) {
      //   console.log(res.data.template_str);
      //   // debugger;
      //   let LODOP = getLodop();
      //   LODOP.PRINT_INIT("訂貨單");
      //   LODOP.SET_PRINT_STYLEA(0, "HtmWaitMilSecs", 1000);
      //   LODOP.SET_PRINT_PAGESIZE(1, 2100, 2100, "");
      //   LODOP.ADD_PRINT_HTM(88, 200, "100%", "100%", res.data.template_str);
      //   LODOP.PREVIEW();
      // }
      // let base64;
      // var img =
      //   "https://img.alicdn.com/bao/uploaded/TB1qimQIpXXXXXbXFXXSutbFXXX.jpg";
      // //var img = "http://127.0.0.1/base64/1.jpg";
      // function getBase64Image(img) {
      //   var canvas = document.createElement("canvas");
      //   canvas.width = img.width;
      //   canvas.height = img.height;
      //   var ctx = canvas.getContext("2d");
      //   ctx.drawImage(img, 0, 0, img.width, img.height);
      //   var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      //   var dataURL = canvas.toDataURL("image/" + ext);
      //   return dataURL;
      // }
      // var image = new Image();
      // image.crossOrigin = "";
      // image.src = img;
      // image.onload = function() {
      //   base64 = getBase64Image(image);
      //   // console.log(base64);
      //   let LODOP = getLodop();
      //   LODOP.PRINT_INIT("訂貨單");
      //   LODOP.SET_PRINT_STYLE("FontSize", 18);
      //   LODOP.SET_PRINT_STYLE("Bold", 1);
      //   // LODOP.SET_PRINT_PAGESIZE(1, 800, 600, ""); //设置纸张为80mm*60mm
      //   LODOP.SET_PRINT_PAGESIZE(1, 580, 580, "");
      //   // LODOP.SET_PRINT_PAGESIZE(1, "148mm", "210mm");
      //   // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印頁面部分內容");
      //   // LODOP.ADD_PRINT_HTM(
      //   //   88,
      //   //   200,
      //   //   350,
      //   //   600,
      //   //   '<div class="el-form-item__content" style="margin-left: 96px;"><div data-v-1d87a7a2="" role="radiogroup" class="el-radio-group"><label data-v-1d87a7a2="" role="radio" tabindex="0" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="1"></span><span class="el-radio__label">销售单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="2"></span><span class="el-radio__label">销售退货单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="3"></span><span class="el-radio__label">零售单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="4"></span><span class="el-radio__label">采购单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="5"></span><span class="el-radio__label">采购退货单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="6"></span><span class="el-radio__label">库存调拨单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="7"></span><span class="el-radio__label">收款单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="8"></span><span class="el-radio__label">快速收款单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="9"></span><span class="el-radio__label">快递单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="10"></span><span class="el-radio__label">入库单<!----></span></label><label data-v-1d87a7a2="" role="radio" tabindex="-1" class="el-radio"><span class="el-radio__input"><span class="el-radio__inner"></span><input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="11"></span><span class="el-radio__label">出库单<!----></span></label></div><!----></div>'
      //   // );
      //   LODOP.ADD_PRINT_IMAGE(10, 10, 172, 123, base64);
      //   //    LODOP.PRINT();
      //   LODOP.PREVIEW();
      // };
    }
  }
};
</script>
 

<style rel="stylesheet/scss" lang="scss" scoped>
.box-card {
  min-height: 800px;
}
.printTemp {
  display: flex;
  padding: 0;
  .printTempli {
    background: url(../..//assets/printTemplate.png) center 10px no-repeat;
    border: 1px solid #d7d7d7;
    width: 130px;
    height: 125px;

    margin: 0px 10px 10px 0px;
    padding-left: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    align-items: center;
    flex-direction: column;
    list-style: none;
    position: relative;
    .prev {
      position: absolute;
      left: 0;
      top: 125px;
      z-index: 99999999;
      border: 6px solid rgb(88, 199, 218);
      box-shadow: rgb(138, 132, 132) 3px 3px 3px 3px;
      background: rgb(255, 255, 255);
      .ng-binding {
        color: rgba(232, 81, 81, 0.28);
        font-size: 28px;
        margin-left: 20px;
      }
    }
    p {
      font-size: 10px;
      line-height: 20px;
    }
    .title1 {
      margin-top: 28px;
      text-align: center;
      line-height: 32px;
      margin-bottom: 18px;
    }
  }
  .active {
    border: 1px solid #1c7efb;
    box-shadow: 0px 0px 3px #4d9afc;
    background-color: #f3f6fa;
  }
}
</style>


    