<template>
  <div class="app-container">
    <div class="box-table">
      <el-button type="primary" @click="addSupplier" class="new-add">新增物流</el-button>
      <el-table :data="tableData" border>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            <el-button slot="reference" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="seeDot(scope.row)" type="text" size="small">查看网点</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="type" label="快递单类型" align="center"></el-table-column>
        <el-table-column prop="company" label="快递公司" align="center"></el-table-column>
        <el-table-column prop="url" label="网址" align="center"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="物流信息" :before-close="close1">
      <el-form :model="form" class="border-top" label-width="auto" ref="form">
        <el-form-item
          label="快递单类型"
          prop="type"
          :rules="[{ required: true, message: '请选择快递单类型', trigger: 'blur' }]"
        >
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="普通快递单" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
        >
          <el-input v-model="form.name" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="快递公司" prop="company">
          <el-input v-model="form.company" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url" placeholder="单行输入"></el-input>
        </el-form-item>

        <el-form-item label="运费说明" prop="des">
          <el-input v-model="form.des" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="发件信息" prop="sender_id">
          <el-select v-model="form.sender_id" placeholder="请选择">
            <el-option :label="item.name" :value="item.id" v-for="item in sends" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible2" title="物流网点">
      <el-button type="primary" @click="addNet" style="margin-bottom:20px;">添加网点</el-button>

      <el-table :data="tableData2" border style="width: 100%">
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="delDot(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="editDot(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="phone" label="名称"></el-table-column>
        <el-table-column prop="name" label="电话"></el-table-column>
        <el-table-column prop="address" label="地址" width="200"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout=" total,prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange2"
      ></el-pagination>
    </el-dialog>
    <!-- 添加网点弹框 -->
    <el-dialog title="网点管理" :visible.sync="dialog" :before-close="close2">
      <el-form :model="form1" label-width="auto;" ref="form1">
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
        >
          <el-input v-model="form1.name" placeholder="网点名称"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form1.phone" placeholder="网点电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form1.address" placeholder="网店地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close2">取 消</el-button>
        <el-button type="primary" @click="saveDot">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  sender,
  logistics,
  logisticsUpdate,
  logisticsOutletsAdd,
  logisticsAss,
  logisticsDetail,
  logisticsDel,
  logisticsOutlets,
  logisticsOutletsUpdate,
  logisticsOutletsDel,
  logisticsOutletsDetail
} from "@/api/index";

import { enumSaleStatus } from "@/utils/enums";
export default {
  data() {
    return {
      form1: {},
      dialog: false,

      sends: [],
      dialogFormVisible: false,
      form: {},
      orderStatus: enumSaleStatus,
      pagination: {
        pageSize: 0,
        currentPage: 1,
        total: 0
      },
      tableData: [],
      tableData2: [],
      page: 1,
      total: 0,
      page2: 1,
      SelectData: {},
      dialogFormVisible2: false,
      page2: 1
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getSelectList();
    this.getTableData(1);
  },
  methods: {
    // 删除网点
    delDot(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        logisticsOutletsDel(e.id).then(res => {
          this.getTableData2(this.page2, this.SelectData.id);
        });
      });
    },
    close2() {
      this.dialog = false;
      this.form1.id = "";
      this.$refs["form1"].resetFields();
      this.getTableData2(this.page2, this.SelectData.id);
    },
    close1() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
      this.getTableData(this.page);
    },
    saveDot() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          this.saveDotData();
        }
      });
    },
    async saveDotData() {
      let res;
      if (this.form1.id) {
        res = await logisticsOutletsUpdate(this.form1.id, this.form1);
      } else {
        res = await logisticsOutletsAdd({
          name: this.form1.name,
          phone: this.form1.phone,
          address: this.form1.address
        });
      }
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.close2();
      }
    },
    seeDot(e) {
      this.SelectData = e;
      this.dialogFormVisible2 = true;
      this.form1.logistics_id = e.id;
      this.getTableData2(this.page2, this.form1.logistics_id);
    },
    handleCurrentChange(e) {
      this.page = e;
      this.getTableData(e);
    },
    getSelectList() {
      sender({ page: 1, size: 100000 }).then(res => {
        this.sends = res.data.data;
      });
    },
    getTableData(page) {
      logistics({ page, size: 10 }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 物流网点
    getTableData2(page, id) {
      logisticsOutlets({ page: page, size: 10, pid: id }).then(res => {
        this.tableData2 = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange2(e) {
      this.page2 = e;
      this.getTableData2(e, this.SelectData.id);
    },

    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        logisticsDel(row.id).then(res => {
          this.getTableData(this.page);
        });
      });
    },
    editDot(row) {
      logisticsOutletsDetail(row.id).then(res => {
        this.form1 = {
          name: res.data.name,
          phone: res.data.phone,
          address: res.data.address,

          id: res.data.id
        };
      });
      this.dialog = true;
    },
    handleEdit(row) {
      logisticsDetail(row.id).then(res => {
        this.form = {
          type: res.data.type.toString(),
          name: res.data.name,
          company: res.data.company,
          des: res.data.des,
          sender_id: res.data.sender_id,
          url: res.data.url,
          id: res.data.id
        };
      });
      this.dialogFormVisible = true;
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveData();
        }
      });
    },
    async saveData() {
      let res;
      if (this.form.id) {
        res = await logisticsUpdate(this.form.id, this.form);
      } else {
        res = await logisticsAss(this.form);
      }
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.close1();
      }
    },
    addSupplier() {
      this.dialogFormVisible = true;
    },
    addNet() {
      this.dialog = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.new-add {
  margin-bottom: 30px;
  float: right;
}
.diagCenter {
  padding-left: 35%;
}
.mT10 {
  margin-top: 10px;
}
.mL50 {
  msrgin-left: 50px;
}
.border-bottom {
  border-bottom: 1px dashed #ddd;
  padding-bottom: 5px;
}
.colorBlue {
  color: #4e9bff;
}
.tDiag {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}
.aicon {
  width: 100px;
  height: 30px;
  background-color: #4e9bff;
  text-align: center;
  line-height: 30px;
}
.width200 {
  width: 200px;
}
.marginRight30： {
  margin-right: 30px !important;
}
.date {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-right: 16px;
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
