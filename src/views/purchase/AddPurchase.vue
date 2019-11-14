<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="top-head">
        <div style="display:flex;">
          <div class="back" @click="goBack">
          <i class="el-icon-arrow-left">返sdsssdadasd sd回</i>
        </div>
        <div class="addBuy">新建采购单</div>
        </div>
        
        <el-card class="box-card">
          <div class="top">
            <div style="margin:0 60px 0 20px;">
            </div>
          </div>
          <div class="center">
            <el-form :inline="true" :model="form">
							<el-form-item label="供应商 :" prop="Supplier" label-width="78px" required>
								<el-select v-model="form.Buhuo" placeholder="请选择" style="width:180px">
									<el-option
										 v-for="(item, index) in BuhuoList" :key="index" :label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="仓库"  required>
								<el-select v-model="form.storehouse" placeholder="请选择">
									<el-option
										v-for="(item, index) in storehouseList"
										:key="index" :label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
              <el-form-item label="结算账户 :" prop="account" label-width="78px">
								<el-select v-model="form.Supplier" placeholder="请选择">
									<el-option
										v-for="(item, index) in accountList"
										:key="index" :label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
              <el-form-item label="实付金额">
                <el-input  v-model='form.actualPaid' placeholder="单行输入" class="width142"></el-input>
              </el-form-item>
              <el-form-item label="日期" required prop="date1">
                <el-col :span="4" required prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="备注">
                <el-input class="width142" v-model='form.remark' placeholder="单行输入"></el-input>
              </el-form-item>
							<el-form-item>
                <div style="width:200px;height:40px;color:red;margin-right:40px;">尚欠供应商款：￥0.00</div>
							</el-form-item>
						</el-form>
          </div>
          <div class="box"></div>
        </el-card>
      </el-col>
      
      <el-col :span="24" style="margin-top:20px;">
        <div class="table_header">
        <span style="color:#20a0ff">扫码枪录入：</span>
        <el-input style="width:230px;margin-right:5px;" placeholder="请扫描商品或商品条形码"></el-input>
        <p>选中商品后手动输入数量</p>
      </div>
        <el-card class="box-card">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column type="index" label="序号" width="100" fixed></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button slot="reference"  @click="handleAdd(scope.row)" type="text" size="small">新增</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="商品"
              width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="货号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="条码"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="颜色">
            </el-table-column>
            <el-table-column
              prop="address"
              label="尺码">
            </el-table-column>
            <el-table-column prop="zip" label="单位"></el-table-column>
            <el-table-column prop="amount1" label="数量"></el-table-column>
            <el-table-column prop="zip" label="单价" sortable></el-table-column>
            <el-table-column prop="zip" label="折扣%"></el-table-column>
            <el-table-column prop="zip" label="折后价"></el-table-column>
            <el-table-column prop="amount2" label="金额"></el-table-column>
            <el-table-column prop="amount3" label="折后金额" width="120"></el-table-column>
          </el-table>
          <!-- <el-pagination
            small
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-size="pagination.pageSize"
            layout="total, prev, pager, next"
            :total="pagination.total">
          </el-pagination> -->
        </el-card>
        <h5 class="label">附图</h5>
          <div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              class="upload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100px" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
      </el-col>
    </el-row>
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
      dialogImageUrl: "",
      BuhuoList: [
        {
          value: 0,
          label: "补货至库存预警下限"
        },
        {
          value: 1,
          label: "补货至特定销售天数"
        }
      ],
      SupplierList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "供应商1"
        }
      ],
      form: {},
      storehouseList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "仓库1"
        }
      ],
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
      brandList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "品牌1"
        }
      ],
      accountList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "结算账户1"
        }
      ],
      // status: "0",
      // value1: "",
      // supplier:"",//供应商
      // buhuoType: "",//补货方式
      orderStatus: enumSaleStatus,
       pagination: {
        pageSize: 0,
        currentPage: 1,
        total: 0
      },
     tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
    };
  },
  filters: {},
  mounted() {},
  created() {},
  methods: {
      handleRemove(file, fileList) {
      console.log(file, fileList);
    },
     handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //查询表格
    query(){

    },
    //补货
    jumpTo(){
      // this.$router.push({path:"addPurchase",name:"addPurchase"})
    },
    handleCurrentChange() {
      // queryDisplay(this)
    },
    // 获取表格序号
    handleSelectionChange(val) {
      console.log(val);
      this.tableIndex = val;
      this.multipleSelection = val;
      // this.multipleSelection += val[0].schemeId + ','
    },
     goBack() {
      this.$router.go(-1);
    },
    handleAdd(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload {
  margin-top: 20px;
  margin-left: 20px;
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
.addBuy{
  font-size:16px;
  line-height: 25px;
  text-align: center;
  width:80px;
  height:25px;
  margin-bottom: 14px;
  margin-left:5px;
}
.back {
  font-size:14px;
  line-height: 25px;
  text-align: center;
  border-radius:5px;
  background-color:#20a0ff;
  width:70px;
  height:25px;
  color:#fff;
  margin-bottom: 14px;
  cursor: pointer;
}
.width142 {
  width: 142px;
}
.marginRight30： {
  margin-right: 30px !important;
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
