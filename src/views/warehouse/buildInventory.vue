<template>
  <div class="app-container">
		<div class="back" @click="goBack">
			<i class="el-icon-back">返回</i>
		</div>

		<div class="box-card">
			<div class="top">
				<h5 class="label">新建盘点单</h5>
			</div>

			<el-form ref="form" :model="form">
				<el-row class="search-form-input">
					<el-form-item label="仓库" prop="Supplier" label-width="100px">
						<el-select v-model="form.Supplier" placeholder="请选择">
							<el-option
								v-for="item in planState"
								:key="item.index"
								:label="item.dictName"
								:value="item.index"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="盘点人" prop="Supplier" label-width="70px">
						<el-select v-model="form.Supplier" placeholder="请选择">
							<el-option
								v-for="item in planState"
								:key="item.index"
								:label="item.dictName"
								:value="item.index"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="备注" prop="name" label-width="100px">
						<el-input v-model="form.name"  placeholder="单行输入"></el-input>
					</el-form-item>
				</el-row>
			</el-form>
		</div>

		<div class="box-card" style="height: auto;">
			<div class="table_header">
				<span>扫码枪录入：</span>
				<el-input style="width:230px;margin-right:5px;" placeholder="请扫描商品或商品条形码"></el-input>
				<p>选中产品手动输入数量</p>
				<el-button type="primary" @click="sure">确定</el-button>
			</div>

			<el-table
				:data="tableData"
				border
				show-summary
				style="width: 100%;font-size:14px; margin-bottom: 30px"
				size="small"
				:header-cell-style="{background:'rgba(247,247,247,1)'}">
				<el-table-column prop="id" label="序号" fixed width="100"></el-table-column>
				<el-table-column fixed label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">新增</el-button>
						<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column fixed prop="date" label="商品"></el-table-column>
				<el-table-column prop="name" label="货号"></el-table-column>
				<el-table-column prop="province" label="条码"></el-table-column>
				<el-table-column prop="city" label="颜色"></el-table-column>
				<el-table-column prop="address" label="尺码"></el-table-column>
				<el-table-column prop="zip" label="单位"></el-table-column>
				<el-table-column prop="amount1" label="盘点数量" sortable></el-table-column>
				<el-table-column prop="amount1" label="盘点前数量" sortable></el-table-column>
				<el-table-column prop="zip" label="盈亏数量"></el-table-column>
				<el-table-column prop="zip" label="盈亏金额"></el-table-column>
			</el-table>
			
			<div class="botton-bottom">
				<el-button class="save-botton" type="primary" @click="save">草稿</el-button>
				<el-button class="save-botton" type="primary" @click="save">盘点草稿</el-button>
				<el-button class="purchase-botton" type="primary" @click="purchase">删除</el-button>
			</div>
		</div>
  </div>
</template>

<script>
import {} from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
import Region from "@/components/Region";
export default {
  components: {
    Region
  },
  data() {
    return {
			planState: [],
			classList: [],
			form: {},
      status: "0",
      value1: "",
      region: "",
      orderStatus: enumSaleStatus,
      dialogImageUrl: "",
      dialogVisible: false,
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        }
      ]
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
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
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    goBack() {
      this.$router.go(-1);
    },
    goAdd() {
      this.$router.push({ path: "/sale/order_add" });
    },
    handleClick(row) {
      console.log(row);
		},
		// 确定
		sure() {

		},
		// 采购
		purchase() {

		},
		// 保存
		save() {}
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.delivery {
  margin-left: 39%;
  span {
    width: 65px;
    text-align: right;
    display: inline-block;
  }
  .el-input {
    width: 190px;
    margin-right: 40px;
    margin-bottom: 20px;
  }
}

.delivery /deep/ .map {
  position: relative;
  top: -11px;
  margin-right: 20px;
}
.box-card {
	min-width: 1620px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 0.5);
  padding: 30px 0 20px 30px;
	margin-bottom: 20px;
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
    margin: 0 30px 0 25px;
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
	margin-bottom: 26px;
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
.botton-bottom {
	text-align: center;
	margin: 63px 0 45px 0;
	.save-botton, .purchase-botton {
		width: 200px;
		height: 40px;
	}
}
.search-form-input {
	display: flex;
}
</style>
