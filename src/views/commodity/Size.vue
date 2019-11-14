<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="box-card">
            <div class="group">
              <div>
                <span>全部分组</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="AddGroup">新增分组</el-button>
              </div>
              <div v-for="(color,index) in colorGroup" :key="color.id" class="text item">
                <div
                  @click="clickGroup(color,index,1)"
                  class="row"
                  :class="isIndex == index?'active':' '"
                >
                  <p>{{color.gname}}</p>
                  <div>
                    <el-button type="text" @click="editGroup(color)">编辑</el-button>
                    <el-button type="text" @click="delGroud(color)">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="center">
                <span>名称：</span>
                <el-input class="searchInput" v-model="searchTitle"></el-input>

                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="dialogFormVisible2=true">新增尺码</el-button>
              </div>
              <div class="box">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column fixed prop="date" label="操作">
                    <template slot-scope="scope">
                      <el-button @click="colorEdit(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="delColor(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="名称"></el-table-column>
                  <el-table-column prop="sort" label="排序"></el-table-column>

                  <el-table-column prop="pid.pid_name" label="分组"></el-table-column>
                  <el-table-column prop="status" label="启用"></el-table-column>
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
      title="分类管理"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="cel"
    >
      <div>
        <span>分组名称</span>
        <el-input v-model="gname"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cel">取 消</el-button>
        <el-button type="primary" @click="saveGroup">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="尺码信息"
      :visible.sync="dialogFormVisible2"
      :before-close="cel"
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="auto" ref="form">
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="所属分组"
          prop="pid"
          :rules="[{ required: true, message: '请选择分组', trigger: 'blur' }]"
        >
          <el-select v-model="form.pid" placeholder="请选择分组">
            <el-option
              :label="item.gname"
              :value="item.gid"
              :key="item.id"
              v-for="item in colorGroup"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认尺码" prop="default">
          <el-select v-model="form.default" placeholder="是否默认尺码">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启用" prop="status">
          <el-select v-model="form.status" placeholder="请选择分组">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
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
  SizeDelGroup,
  SizeAddGroup,
  SizeEditGroup,
  SizeGroupList,
  SizeAdd,
  SizeEdit,
  SizeList,
  SizeDel
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
      selectData: null,
      isSelected: 0,
      tableData: [],
      selectGroup: {},
      isIndex: 0,
      total: 0,
      form: {
        name: "",
        pid: "",
        default: "",
        sort: "",
        status: ""
      },
      status: "0",
      value1: "",
      region: "",
      historys: enumHistorys
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getColorGroup(1);
  },
  mounted() {},
  methods: {
    cel() {
      this.dialogFormVisible2 = false;
      this.form.id = "";
      this.dialogFormVisible = false;
      this.gname = "";
      Object.assign(this.$data.form, this.$options.data().form);
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
          SizeDel(e.id).then(res => {
            this.$message.success(res.msg);
            this.getColorGroup(1);
          });
        })
        .catch(() => {});
    },
    colorEdit(e) {
      this.$nextTick(() => {
        this.dialogFormVisible2 = true;
        this.form = {
          id: e.id,
          name: e.name,
          pid: e.pid.gid,
          default: e.default.toString(),
          sort: e.sort,
          status: e.status == "启用" ? "1" : "0"
        };
      });
    },
    clickGroup(e, index) {
      this.isIndex = index;
      this.getColorList(0, this.colorGroup[this.isIndex].gid);
    },
    getColorList(page, id) {
      SizeList({
        params: { page: page, id: id, size: 10, name: this.searchTitle }
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    saveColor() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id) {
            SizeEdit(this.form.id, this.form).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);

                this.getColorGroup(1);
                this.cel();
              }
            });
          } else {
            SizeAdd(this.form).then(res => {
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
      SizeGroupList({ params: { page: page, size: 10 } }).then(res => {
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
      if (this.gname == "") {
        this.$message.error("请输入分组名称");
      } else {
        if (this.selectData) {
          SizeEditGroup(this.selectData.gid, {
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
          SizeAddGroup({ name: this.gname }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getColorGroup(1);
              this.cel();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      }
    },
    delGroud(e) {
      this.$confirm("确认删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        SizeDelGroup(e.gid).then(res => {
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
      this.gname = e.gname;
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
