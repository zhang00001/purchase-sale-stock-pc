<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button type="text" @click="setColor">新增</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row,scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="颜色" prop="color"></el-table-column>
      <el-table-column label="尺码" prop="size"></el-table-column>
      <el-table-column label="款式" prop="style"></el-table-column>
      <el-table-column label="库存预警" prop="stock_warning">
        <template slot-scope="scope">
          <template v-if="scope.row.stock_warning=='0'">启用</template>
          <template v-if="scope.row.stock_warning=='1'">停用</template>
        </template>
      </el-table-column>
      <el-table-column label="上限" prop="stock_upper"></el-table-column>
      <el-table-column label="下限" prop="stock_lower"></el-table-column>
    </el-table>
    <el-dialog
      title="设置规格"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="颜色" prop="color">
          <el-select v-model="ruleForm.color" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.name"
              v-for="(item,key) in colors"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="尺码" prop="size">
          <el-select v-model="ruleForm.size" placeholder="请选择">
            <el-option :label="item.name" :value="item.name" v-for="(item,key) in sizes" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="款式" prop="style">
          <el-select v-model="ruleForm.style" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.name"
              v-for="(item,key) in styles"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="库存预警" prop="stock_warning">
          <el-radio-group v-model="ruleForm.stock_warning">
            <el-radio label="0">启用</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上限" prop="stock_upper">
          <el-input v-model="ruleForm.stock_upper"></el-input>
        </el-form-item>
        <el-form-item label="下限" prop="stock_lower">
          <el-input v-model="ruleForm.stock_lower"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary" @click="getFormGood">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  SizeGroupList,
  StyleGroupList,
  ColorGroupList,
  ColorList,
  SizeList,
  StyleList,
  getGroupSpec
} from "@/api/index";

export default {
  data() {
    return {
      ruleForm: {
        color: "",
        size: "",
        style: "",
        stock_warning: "0",
        stock_upper: "",
        stock_lower: ""
      },
      dialogTableVisible: false,
      tableData: [],
      selectIndes: "",
      groups: [],
      colors: [],
      sizes: [],
      styles: [],

      rules: {
        color: [{ required: true, message: "请选择颜色", trigger: "blur" }],
        size: [{ required: true, message: "请选择尺码", trigger: "blur" }],

        style: [{ required: true, message: "请选择款式", trigger: "blur" }],
        stock_warning: [
          { required: true, message: "请选择款式", trigger: "blur" }
        ],
        stock_upper: [
          { required: true, message: "请输入库存上限", trigger: "blur" }
        ],
        stock_lower: [
          { required: true, message: "请输入库存下限", trigger: "blur" }
        ]
      }
    };
  },
  props: ["selectColor"],
  created() {
    this.getBaseData();
  },
  mounted() {},
  watch: {
    selectColor(e) {
      this.tableData = e;
    }
  },

  methods: {
    setColor() {
      this.dialogTableVisible = true;
      Object.assign(this.$data.ruleForm, this.$options.data().ruleForm);
    },
    del(e, index) {
      this.$confirm("是否删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(e, 1);
        })
        .catch(() => {});
    },
    edit(e, index) {
      this.dialogTableVisible = true;
      this.selectIndes = index;
      this.ruleForm = JSON.parse(JSON.stringify(e));
    },
    getFormGood() {
      let index = this.selectIndes;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          if (
            this.tableData.some(
              val =>
                val.color == data.color &&
                val.size == data.size &&
                val.style == data.style
            )
          ) {
            this.$message.error(
              `已存在${data.color},${data.size},${data.style}`
            );
          } else {
            this.dialogTableVisible = false;

            if (index === "") {
              this.tableData.push(data);
            } else {
              this.tableData.splice(
                this.selectIndes,
                this.selectIndes + 1,
                data
              );
              this.selectIndes = "";
            }
          }
        }
      });
    },
    clear() {
      this.dialogTableVisible = false;
    },
    getBaseData() {
      // 颜色  1颜色    2尺码    5款式
      getGroupSpec(1).then(res => {
        res.data.forEach(val => {
          if (val.son && val.son.length > 0) {
            val.son.forEach(item => this.colors.push(item));
          }
        });
      });
      // 尺码
      getGroupSpec(2).then(res => {
        res.data.forEach(val => {
          if (val.son && val.son.length > 0) {
            val.son.forEach(item => this.sizes.push(item));
          }
        });
      });
      // 款式
      getGroupSpec(5).then(res => {
        res.data.forEach(val => {
          if (val.son && val.son.length > 0) {
            val.son.forEach(item => this.styles.push(item));
          }
        });
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-card {
  min-height: 600px;
}
/deep/ .el-input,
/deep/ .el-radio-group {
  width: 246px;
}
.groupDiv {
  display: flex;
  margin-top: 20px;
  .group {
    display: flex;
    width: 100px;
    flex-direction: column;
  }
  .search {
    margin-bottom: 20px;
  }
}
</style>