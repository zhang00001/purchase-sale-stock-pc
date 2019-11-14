<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <div style="margin:0 60px 0 20px;">
              <el-button type="primary" @click="dialogVisible = true">新增账目类型</el-button>
              <p class="tip">结算账户被使用后，不能删除</p>
            </div>
          </div>

          <div class="box"></div>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-top:20px;">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed prop="name" label="类型名称"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="des" label="备注"></el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="账目信息类型" :visible.sync="dialogVisible" width="38%" :before-close="handleClose">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="类型名称"
          prop="name"
          :rules="[{ required: true, message: '请输入类型名称', trigger: 'blur' }]"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="ruleForm.des"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="ruleForm.sort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  AccountTypeAdd,
  getAllAcount1,
  AccountTypeDel,
  AccountTypeEdit
} from "@/api/index";
import http from "@/utils/request";
import selectaDate from "@/components/select-date";
import GoodList from "@/components/GoodList";

export default {
  components: {
    selectaDate,
    GoodList
  },
  data() {
    return {
      total: 0,
      dialogVisible: false,

      tableData: [],
      selectData: "",
      ruleForm: {
        name: "",
        status: "",
        des: "",
        sort: ""
      }
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getTable(1);
  },
  methods: {
    del(e) {
      AccountTypeDel(e.id).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);

          this.getTable();
        }
      });
    },
    getTable() {
      getAllAcount1({}).then(res => {
        this.tableData = res.list;
      });
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.ruleForm.id) {
            AccountTypeEdit(this.ruleForm.id, { ...this.ruleForm }).then(
              res => {
                if (res.code == 200) {
                  this.ruleForm.id = "";
                  this.$message.success(res.msg);
                  this.handleClose();
                  this.getTable();
                }
              }
            );
          } else {
            AccountTypeAdd({ ...this.ruleForm }).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.handleClose();
                this.getTable();
              }
            });
          }
        }
      });
    },

    handleClose() {
      this.dialogVisible = false;
      Object.assign(this.$data.ruleForm, this.$options.data().ruleForm);
    },
    handleClick(row) {
      this.dialogVisible = true;
      this.ruleForm = {
        id: row.id,
        name: row.name,
        status: row.status,
        des: row.des,
        sort: row.sort
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tip {
  margin-top: 20px;
  font-size: 14px;

  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.number {
  display: flex;
  margin-top: 34px;
  p {
    margin-right: 166px;
    font-size: 16px;
    color: rgba(85, 161, 255, 1);
    font-weight: 600;
  }
}
.demo-ruleForm {
  display: flex;
  flex-wrap: wrap;
}
.demo-ruleForm /deep/ .el-input {
  width: 190px;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: rgba(225, 238, 255, 1);
  color: #55a1ff;
  box-shadow: none;
}
/deep/ .el-radio-button--medium .el-radio-button__inner {
  background: rgba(243, 243, 243, 1);
}
.searchInput {
  width: 190px;
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
