<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="box-card">
            <div class="group">
              <div>
                <span>全部门店</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="AddGroup">新增门店</el-button>
              </div>
              <div v-for="(item,index) in colorGroup" :key="item.id" class="text item">
                <div class="row" :class="isIndex == index?'active':' '">
                  <p @click="clickGroup(item,index)">{{item.name}}</p>
                  <div>
                    <el-button type="text" @click="editGroup(item)">编辑</el-button>
                    <el-button type="text" @click="delGroud(item)">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="center">
                <span>搜索：</span>
                <el-input class="searchInput" v-model="searchTitle" placeholder="员工账户或者姓名"></el-input>
                <span>状态：</span>
                <el-select v-model="status" placeholder="请选择" clearable>
                  <el-option value label="全部">全部</el-option>
                  <el-option value="1" label="启用">启用</el-option>
                  <el-option value="2" label="失效">失效</el-option>
                </el-select>

                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="dialogFormVisible2=true">新增员工</el-button>
              </div>
              <div class="box">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column fixed prop="date" label="操作">
                    <template slot-scope="scope">
                      <el-button @click="colorEdit(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="delColor(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>

                  <el-table-column prop="username" label="名称"></el-table-column>
                  <el-table-column prop="store" label="所属门店"></el-table-column>
                  <el-table-column prop="end_time" label="最后登陆时间"></el-table-column>
                  <el-table-column prop="ip" label="最后登录ip"></el-table-column>
                  <el-table-column prop="create_time" label="创建时间"></el-table-column>
                  <el-table-column prop="entry_time" label="入职时间"></el-table-column>

                  <el-table-column prop="status" label="状态"></el-table-column>
                </el-table>
                <el-pagination
                  background
                  style="margin-top:20px;"
                  layout="total,prev, pager, next"
                  :total="total"
                  @current-change="handleCurrentChange"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="门店信息"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="cel"
    >
      <div>
        <el-form :model="formGroup" label-width="auto" ref="formGroup">
          <el-form-item
            label="门店名称"
            prop="name"
            :rules="[{ required: true, message: '请输入门店名称', trigger: 'blur' }]"
          >
            <el-input v-model="formGroup.name"></el-input>
          </el-form-item>
          <el-form-item
            label="排序"
            prop="sort"
            :rules="[{ required: true, message: '请输入排序', trigger: 'blur' }]"
          >
            <el-input v-model="formGroup.sort"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="address">
            <el-input v-model="formGroup.address"></el-input>
          </el-form-item>
          <el-form-item label="门店电话" prop="phone">
            <el-input v-model="formGroup.phone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cel">取 消</el-button>
        <el-button type="primary" @click="saveGroup">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="员工信息"
      :visible.sync="dialogFormVisible2"
      :before-close="cel"
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="auto" ref="form">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item
              label="账号"
              prop="username"
              :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
            >
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="姓名"
              prop="name"
              :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
            >
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="密码"
              prop="password"
              :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
            >
              <el-input
                v-model="form.password"
                autocomplete="off"
                type="password"
                :disabled="isEdit"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="所属门店" prop="store">
              <el-select v-model="form.store" placeholder="请选择">
                <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="item in stores"
                  :key="item.id"
                >{{item.name}}</el-option>
              </el-select>
              <el-checkbox v-model="select_store">允许查看其他门店单据</el-checkbox>

              <el-checkbox v-model="edit_store">允许编辑其他门店单据</el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="启用" prop="status">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option value="0" label="启用">启用</el-option>
                <el-option value="1" label="失效">失效</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证" prop="card">
              <el-input v-model="form.card"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="邮箱" peop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="入职时间" prop="entry_time">
              <el-date-picker v-model="form.entry_time" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="住址" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注" prop="des">
              <el-input v-model="form.des"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="角色">
              <el-radio-group v-model="auth">
                <el-radio :label="item.id" v-for="item in roles" :key="item.id">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cel">取 消</el-button>
        <el-button type="primary" @click="saveColor">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  storeDel,
  storeAdd,
  storeList,
  storeEdit,
  getStoreInfo,
  adminAdd,
  ColorEdit,
  adminList,
  ColorDel,
  roleList,
  adminDetail,
  adminEdit,
  adminDel
} from "@/api/index";

import http from "@/utils/request";
import { enumHistorys } from "@/utils/enums";
export default {
  data() {
    return {
      colorGroup: [],
      searchTitle: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      isActive: true,
      gname: "",
      auth: [],
      isEdit: false,
      checkList: [],
      selectData: null,
      isSelected: 0,
      tableData: [],
      selectGroup: {},
      isIndex: 0,
      total: 0,
      form: {},
      formGroup: {},
      status: "",
      value1: "",
      region: "",
      stores: [],
      roles: [],
      select_store: "",
      edit_store: "",
      historys: enumHistorys
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getColorGroup(1);
    this.getSelectData();
  },
  mounted() {},
  methods: {
    getSelectData() {
      // 门店
      storeList({ page: 1, size: 100000 }).then(res => {
        this.stores = res.data.data;
      });
      roleList().then(res => {
        this.roles = JSON.parse(JSON.stringify(res.data));
      });
    },
    cel() {
      this.isEdit = false;
      this.dialogFormVisible2 = false;
      this.dialogFormVisible = false;
      (this.select_store = ""), (this.edit_store = ""), (this.form.id = "");
      this.auth = "";
      this.form = {};
    },
    search() {
      this.getColorList(1, this.colorGroup[this.isIndex].gid);
    },
    handleCurrentChange(e) {
      this.getColorList(e, this.colorGroup[this.isIndex].gid);
    },
    delColor(e) {
      this.$confirm("确认删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          adminDel(e.id).then(res => {
            this.$message.success(res.msg);
            this.getColorGroup(1);
          });
        })
        .catch(() => {});
    },
    async colorEdit(e) {
      let res = await adminDetail(e.id);
      if (res) {
        this.isEdit = true;
        this.dialogFormVisible2 = true;
        this.$nextTick(() => {
          this.form = {
            id: res.data.id,
            name: res.data.name,
            username: res.data.name,
            password: "",
            phone: res.data.phone,
            store: res.data.store,

            status: res.data.status,
            card: res.data.card,
            email: res.data.email,
            entry_time: res.data.entry_time,
            address: res.data.address,
            des: res.data.des
          };
          this.select_store = res.data.select_store == "1" ? true : false;
          this.edit_store = res.data.edit_store == "1" ? true : false;
        });

        this.auth = res.data.role_id;
      }
    },
    clickGroup(e, index) {
      this.isIndex = index;
      this.getColorList(1, this.colorGroup[this.isIndex].gid);
    },
    getColorList(page, id) {
      adminList({
        page: page,
        id: id,
        size: 10,
        status: this.status,
        name: this.searchTitle
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    saveColor() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.role_id = this.auth;
          this.form.select_store = this.select_store ? "1" : "2";
          this.form.edit_store = this.edit_store ? "1" : "2";
          if (this.form.id) {
            adminEdit(this.form.id, this.form).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);

                this.getColorGroup(1);
                this.cel();
              }
            });
          } else {
            adminAdd(this.form).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);

                this.getColorGroup(1);
                this.cel();
              }
            });
          }
        }
      });
    },
    getColorGroup(page) {
      storeList({ page: page, size: 10 }).then(res => {
        if (res.code == 200) {
          this.colorGroup = res.data.data;

          this.getColorList(1, this.colorGroup[this.isIndex].gid);
        }
      });
    },
    AddGroup() {
      this.dialogFormVisible = true;
    },
    saveGroup() {
      if (this.selectData) {
        storeEdit(this.selectData.gid, {
          name: this.gname
        }).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getColorGroup(1);
            this.cel();
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        storeAdd(this.formGroup).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getColorGroup(1);
            this.cel();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    delGroud(e) {
      this.$confirm("确认删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        storeDel(e.gid).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getColorGroup(1);
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    editGroup(e) {
      getStoreInfo(e.id).then(res => {
        if (res.code == 200) {
          this.formGroup = res.data;
          this.formGroup.id = res.data.id;
        }
      });

      this.selectData = e;
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-card {
  min-height: 600px;
}
.right {
  width: 100%;
  padding-left: 77px;
}
.box-card {
  display: flex;
}
.group {
  width: 248px;
  height: 283px;
  background: rgba(246, 247, 251, 1);
  padding: 16px 30px;
  span {
    color: #409eff;
  }
  .item {
    margin-top: 18px;
  }
}
.row {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  width: 100%;
  .el-button--text {
    padding: 0;
  }
}
.active {
  // background: #e2ebf5;
  color: #409eff;
}
.searchInput {
  width: 190px;
}

.center {
  margin: 20px;
}
</style>
