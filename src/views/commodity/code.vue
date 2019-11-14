<template>
  <div class="app-container">
    <el-row>
      <!-- <el-col class="top-head">
        <div  :span="24" style="float:left;margin-bottom:20px;">
           条码配置
        </div>
      </el-col> -->
      <el-col :span="24" class="top-head">
        <el-card class="box-card">
          <div  :span="24" style="float:left;margin-bottom:20px;">条码配置</div>
          <div class="center">
            <el-form ref="form" :model="form" label-width="120px" style="margin-left:200px;">
              <el-form-item label="自动生成条码">
                <el-checkbox v-model="checked1">启用</el-checkbox>
                <div>启用后在新建或编辑商品时将自动生成条码</div>
              </el-form-item>
              <el-form-item label="自动生成项">
                <el-checkbox v-model="checked2">商品条码</el-checkbox>
                <el-checkbox v-model="checked3">单品条码</el-checkbox>
                <div>选择商品后，在新建商品、补充无条码商品、重置所有商品条码时将只对所有商品条码有效，选择单品条码后，在新建商品、补充无条码商品、重置所有商品条码时将只对单品条码有效</div>
              </el-form-item>
             	<el-form-item label="条码类型">
								<el-select v-model="form.type" placeholder="请选择" class="width142">
									<el-option
										v-for="(item, index) in typeList"
										:key="index" :label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
                <div>EAN-13码由八位厂商识别代码、4位产品代码及一位校验码组成,厂商识别码由企业向国家物品编码中心申请取得;产品代码可由企业自己定义(4位产品代码0000-9999适用于一万种产品;)一位校验码可以由前面12位确定后计算出来</div>
							</el-form-item>
              <el-form-item label="条码格式">
                <el-input class="width180" v-model='form.codeType' placeholder="单行输入"></el-input>
                <i class="el-icon-minus"></i>
                <el-input class="width180 moren" v-model='form.productCode' placeholder="4位产品代码（系统生成）" disabled></el-input>
                <i class="el-icon-minus"></i>
                <el-input class="width180 moren" v-model='form.checkCode' placeholder="1位校验码（系统生成）" disabled></el-input>
                <div>厂商识别码由用户输入，产品代码将由系统从0000至9999中顺序生成,1位校验码将由系统根据厂商识别码及产品代码计算得出</div>
              </el-form-item>
               <el-form-item label="产品代码起始值">
                <el-input class="width200" v-model='form.codeType' placeholder="单行输入"></el-input>
                <div>产品起始值设置后,系统生成条码时产品代码将从此起始值开始顺序生成,如设置了厂商识别码为69012345，,起始值为1234，则系统下一个生成的条码6901234512359(最后一位9由前面12位计算得出),如果系统已经存在大于这个条码值的条码，则将从最大条码值的下一位继续生成</div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button type="primary" @click="makeCode">为无条码商品生成条码</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="box"></div>
        </el-card>
      </el-col>
    </el-row>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>即将为系统所有无条码的商品自动生成商品条码,是否确认继续</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {} from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
export default {
  data() {
    return {
      dialogVisible: false,
       typeList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "分类1"
        }
      ],
      checked1:true,
      checked2:true,
      checked3:false,
      form: {},
      orderStatus: enumSaleStatus,
    };
  },
  filters: {},
  mounted() {},
  created() {},
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    makeCode(){
      this.dialogVisible=true
    },
    reset(){

    },
    onSubmit() {
     
    }
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.width200 {
  width: 200px;
}
.marginRight30： {
  margin-right: 30px !important;
}
.top-head {
  // height:126px;
  // margin-top:20px;
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
  align-items: flex-start;
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
  .width180{
    width:180px;
  }
  .width200{
    width:200px;
  }
  .moren{
    background-color: #ddd;
  }
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
