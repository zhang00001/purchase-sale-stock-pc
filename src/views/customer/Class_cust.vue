<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" @click="addClass">新增</el-button>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="discount" label="折扣"></el-table-column>
        <el-table-column prop="des" label="描述"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <el-dialog
      title="分类信息"
      :visible.sync="dialogVisible"
      :before-close="cel"
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="折扣（%）">
          <el-input v-model="form.discount" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  customerCategoryList,
  customerCategory,
  updatecustomerCategory,
  delcustomerCategory
} from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      dialogVisible: false,
      form: {
        name: "",
        discount: "",
        des: ""
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleCurrentChange(e) {
      this.page = e;
      this.getUserList(this.page);
    },
    cel() {
      this.dialogVisible = false;

      Object.assign(this.$data.form, this.$options.data().form);
    },
    getUserList() {
      customerCategoryList({ params: { page: this.page, size: 10 } }).then(
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.tableData = res.data.data;
          }
        }
      );
    },
    del(e) {
      this.$confirm("确认删除?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        delcustomerCategory(e.id).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getUserList(this.page);
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    addClass() {
      this.dialogVisible = true;
    },
    save() {
      if (this.form.id) {
        updatecustomerCategory(this.form.id, this.form).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getUserList(this.page);
            this.cel();
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        customerCategory(this.form).then(res => {
          if (res.code == 200) {
            this.getUserList(this.page);
            this.cel();
          }
        });
      }
    },
    edit(e) {
      this.$nextTick(() => {
        this.form = {
          id: e.id,
          name: e.name,
          discount: e.discount,
          des: e.des
        };
        this.dialogVisible = true;
      });
    }
  }
};
</script>