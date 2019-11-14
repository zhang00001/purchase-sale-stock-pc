<template>
  <div class="app-container">
    <div class="box-table">
      <el-button type="primary" @click="addSupplier">新增角色</el-button>
      <el-table :data="tableData" border>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            <el-button slot="reference" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="info" label="备注" align="center"></el-table-column>
      </el-table>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="角色信息" :before-close="close1">
      <el-form :model="form" ref="form" class="border-top" label-width="auto">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="info">
          <el-input v-model="form.info" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="后台管理权限">
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{data.meta.title}}</span>
              <span>
                <!-- <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>-->
              </span>
            </span>
          </el-tree>
        </el-form-item>
        <el-form-item label="app权限">
          <el-checkbox-group v-model="form.rules1">
            <el-checkbox :label="item.id" v-for="item in appPers" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleList,
  permissions,
  roleSave,
  roleDetails,
  roleDel,
  appPermissions
} from "@/api/index";

import { enumSaleStatus } from "@/utils/enums";
let id = 1000;
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: []
      }
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),

      dialog: false,

      dialogFormVisible: false,
      form: { rules1: [] },

      tableData: [],
      appPers: [],
      page: 1,
      total: 0
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getSelectList();
    this.getTableData();
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    close1() {
      this.dialogFormVisible = false;
      this.form = {};
      this.form.rules1 = [];
      this.$refs.tree.setCheckedKeys([]);

      this.getTableData();
    },

    getSelectList() {
      permissions().then(res => {
        this.data = res.data;
      });
      appPermissions().then(res => {
        this.appPers = res.data;
      });
    },
    getTableData() {
      roleList().then(res => {
        this.tableData = res.data;
      });
    },

    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        roleDel(row.id).then(res => {
          this.getTableData();
        });
      });
    },

    handleEdit(row) {
      roleDetails(row.id).then(res => {
        this.form = {
          name: res.data.name,
          info: res.data.info,
          rules1: res.data.rules1.map(val => Number(val)),
          id: res.data.id
        };

        this.$refs.tree.setCheckedKeys(res.data.rules);
      });
      this.dialogFormVisible = true;
    },
    save() {
      // 获取全选状态下的节点  和  半选中状态下的节点，  连接起来
      let keys = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (keys.length <= 0) {
        this.$message.error("暂未选中权限");
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.form.rules = keys;
            this.saveData();
          }
        });
      }
    },
    async saveData() {
      let res;

      if (this.form.id) {
        res = await roleSave(this.form);
      } else {
        res = await roleSave(this.form);
      }
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.close1();
      }
    },
    addSupplier() {
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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


    