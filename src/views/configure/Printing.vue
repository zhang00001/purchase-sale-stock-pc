<template>
  <div class="app-container">
    <div class="box-table">
      <el-input v-model="name" placeholder="请输入姓名"></el-input>
      <el-input v-model="phone" placeholder="请输入手机号"></el-input>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="addSupplier" class="new-add">新增发件信息</el-button>
      <el-table :data="tableData" border>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            <el-button slot="reference" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="发件人" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="address" label="发件地址" align="center"></el-table-column>
        <el-table-column prop="is_default" label="是否为默认地址" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.is_default==0">否</template>
            <template v-else>是</template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout=" total,prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="发件信息">
      <el-form :model="form" ref="form" class="border-top" label-width="auto">
        <el-form-item
          label="发件人"
          prop="name"
          :rules="[{ required: true, message: '请输入发件人', trigger: 'blur' },]"
        >
          <el-input v-model="form.name" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item
          label="发件人手机号"
          prop="phone"
          :rules="[{ required: true, message: '请输入发件人手机号', trigger: 'blur' },]"
        >
          <el-input v-model="form.phone" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="发件人地址">
          <Region ref="region" :region="region"></Region>
          <el-input v-model="address"></el-input>
        </el-form-item>
        <el-form-item lable>
          <el-checkbox v-model="form.is_default">设为默认发件信息</el-checkbox>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Region from "@/components/Region";
import {
  sender,
  logistics,
  senderAdd,
  senderDetail,
  senderUpdate,
  senderDel
} from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
import { async } from "q";
export default {
  components: {
    Region
  },
  data() {
    return {
      form1: {},
      phone: "",
      name: "",
      dialog: false,
      address: "",
      sends: [],
      dialogFormVisible: false,
      form: {
        is_default: true,
        name: "",
        phone: "",
        address: ""
      },
      region: [],
      orderStatus: enumSaleStatus,
      pagination: {
        pageSize: 0,
        currentPage: 1,
        total: 0
      },
      tableData: [],
      page: 1,
      total: 0
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getSelectList();
    this.getTableData(1);
  },
  methods: {
    search() {
      this.getTableData(this.page);
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
      sender({ page, size: 10, name: this.name, phone: this.phone }).then(
        res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      );
    },

    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        senderDel(row.id).then(res => {
          this.getTableData(this.page);
        });
      });
    },
    handleEdit(row) {
      senderDetail(row.id).then(res => {
        this.form = {
          is_default: this.form.is_default == 0 ? false : true,
          name: res.data.name,
          phone: res.data.phone,
          id: res.data.id
        };
        let address = res.data.address.split(",");
        this.address = address[3];
        this.region = [address[0], address[1], address[2]];
      });
      this.dialogFormVisible = true;
    },
    save() {
      this.form.address = this.$refs.region.selected + "," + this.address;
      this.form.is_default = this.form.is_default ? 1 : 0;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveData();
        }
      });
    },
    async saveData() {
      let status;
      if (this.form.id) {
        status = await senderUpdate(this.form.id, this.form);
      } else {
        status = await senderAdd(this.form);
      }
      if (status.code == 200) {
        this.getTableData(this.page);
        this.dialogFormVisible = false;
        this.address = "";
        this.$refs["form"].resetFields();
        this.refs.region.clear();
      }
    },
    addSupplier() {
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .map .area-select .area-selected-trigger {
  top: -7px !important;
}
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
