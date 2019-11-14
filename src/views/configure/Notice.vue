<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="add">添加公告</el-button>
    </div>

    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="edit(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.status==0"
            >编辑</el-button>

            <el-button
              type="text"
              size="small"
              @click="edit(scope.row)"
              v-if="scope.row.status==1"
            >查看</el-button>
            <el-button type="text" size="small" @click="delect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="标题"></el-table-column>
        <el-table-column prop="status" label="发布状态">
          <template slot-scope="scope">
            <template v-if="scope.row.status==0">未发布</template>
            <template v-if="scope.row.status==1">已发布</template>
          </template>
        </el-table-column>
        <el-table-column prop="publisher_name" label="发布人"></el-table-column>

        <el-table-column prop="release_time" label="发布时间"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="total,prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="close1">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" v-if="form.status==0"></el-input>
            <span v-if="form.status==1">{{form.title}}</span>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
            <el-input v-if="form.status==0" v-model="form.content" type="textarea"></el-input>
            <span v-if="form.status==1">{{form.content}}</span>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth" prop="logo">
            <el-upload
              v-if="form.status==0"
              class="avatar-uploader"
              :http-request="uploadFile"
              action
              :show-file-list="false"
              :file-list="fileLists"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <!-- <div class="el-upload__tip" slot="tip">图片只能为jpg,格式</div> -->
            </el-upload>
            <span v-if="form.status==1">
              <img :src="form.img" alt style="width:100px;height:100px;" />
            </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close1" v-if="form.status==1">我知道了</el-button>
          <el-button @click="save(0)" v-if="form.status==0">保存</el-button>
          <el-button @click="save(1)" v-if="form.status==0">发布</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {
  announcementsGet,
  announcementsAdd,
  announcementsUpdate,
  announcementsDel,
  announcementsDetail
} from "@/api/index";
import axios from "axios";
export default {
  data() {
    return {
      isDisable: true,
      serchTitle: "",
      tableData: [],
      tableData2: [],
      multipleSelection: [],
      total: 0,
      total2: 0,
      title: "新增",
      fileLists: [],
      imageUrl: "",
      page: 1,
      SelectIndex: 1,
      showClass2: false,
      form: {
        title: "",
        content: "",
        images: "",
        publisher: "",
        status: 0,
        release_time: ""
      },
      selectId: "",
      rules: {
        title: [{ required: true, message: "必填字段", trigger: "blur" }],

        order: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getList(this.page);
  },
  methods: {
    add() {
      this.dialogFormVisible = true;
      this.title = "新增";
    },
    handleCurrentChange(e) {
      this.SelectIndex = e;
      this.getList(e, this.serchTitle);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },

    //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          announcementsDel(e.id).then(res => {
            if (res.code == 200) {
              this.getList(this.page);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    cel() {
      this.imageUrl = "";

      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    // 加载列表
    getList(page) {
      announcementsGet({
        page: page,
        limit: 10
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 编辑回显
    edit(e) {
      (this.dialogFormVisible = true),
        announcementsDetail(e.id).then(res => {
          if (res.code == 200) {
            this.$nextTick(() => {
              this.imageUrl = res.data.logo;

              this.form = {
                id: e.id,

                title: res.data.title,
                content: res.data.content,
                status: res.data.status,
                release_time: res.data.release_time,
                publisher: res.data.publisher
              };

              this.form.status == 0
                ? (this.title = "编辑")
                : (this.title = "详情");

              this.imageUrl = res.data.images;
            });
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 新增。编辑保存
    save(e) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.images = this.imageUrl;
          this.form.status = e;
          if (e == 1) {
            this.form.publisher = sessionStorage.getItem("userId");
            this.form.release_time = Number(
              new Date().getTime() / 1000
            ).toFixed(0);
          }
          this.saveData(e);
        }
      });
    },
    async saveData(e) {
      let res;

      if (this.form.id) {
        res = announcementsUpdate(this.form.id, this.form);
      } else {
        res = await announcementsAdd(this.form);
      }
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.close1();
      }
    },
    close1() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
      this.imageUrl = "";
      this.form.id = "";
      this.form.status = 0;
      this.getList(this.page);
    },
    // 上传图片
    uploadFile(item) {
      const formdata = new FormData();
      formdata.append("images[]", item.file);

      axios
        .post(process.env.BASE_API + "/api/uploadImage/test", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: sessionStorage.getItem("token")
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = process.env.BASE_API + "/" + res.data.data[0];
            debugger;
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
 
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>