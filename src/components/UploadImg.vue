<template>
  <div>
    <div style="display: flex;align-items: baseline;">
      <el-button size="small" type="primary" style="margin-right:20px;" @click="showHistory">历史图库</el-button>
      <el-upload
        multiple
        action
        :auto-upload="false"
        :http-request="uploadFile"
        ref="upload"
        :limit="9"
        accept="image/gif, image/jpeg"
      >
        <el-button v-if="selectImg">选择图片</el-button>
      </el-upload>
      <el-button @click="subPicForm" style="margin-left:30px;">提交上传</el-button>
    </div>
    <div class="block" style="display:flex;    flex-wrap: wrap;" v-if="showFile">
      <template v-for="(item,index) in fileList">
        <div style="margin-right:20px;margin-bottom: 20px; " :key="item.id">
          <div>
            <el-image
              :src="item"
              fit="cover"
              style="width:200px;height:200px;  border-radius:15px; "
            ></el-image>
          </div>

          <div>
            <el-button style="padding: 10px;" v-if="index==0">商品主图</el-button>
            <el-button style="padding: 10px;" v-else @click="setImg(item,index)">设为主图</el-button>
            <el-button style="padding: 10px;" @click="delProductImg(item,index)">删除图片</el-button>
          </div>
        </div>
      </template>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div class="infinite-list-wrapper" style="overflow:auto;height: 300px;">
        <ul class="list" v-infinite-scroll="load">
          <li v-for="item in ImgData" class="list-item" :key="item.id">
            <el-checkbox v-model="item.checked">
              <img :src="item.img" alt style="width:50px;height:50px;" />
            </el-checkbox>
          </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/utils/request";
import axios from "axios";
export default {
  data() {
    return {
      showFile: true,
      // fileList: [],
      baseUrl: process.env.BASE_API,
      count: 0,
      page: 0,
      dialogVisible: false,
      formDate: "",
      selectImg: true,
      count: 10,
      loading: false,
      noMore: false,
      ImgData: [] //历史图库Img数组
    };
  },
  computed: {},
  props: ["fileList"],
  filters: {},
  mounted() {},
  created() {
    console.log(process.env.BASE_API);
  },
  methods: {
    save() {
      this.dialogVisible = false;
      this.ImgData.filter(val => val.checked == true)
        .map(val => val.img.split(this.baseUrl)[1])
        .forEach(val => {
          let a = this.baseUrl + val;
          this.fileList.push(a);
        });
    },
    load() {
      console.log(this.noMore);
      if (this.noMore) {
      } else {
        this.page++;
        this.getImages(this.page);
      }
    },
    showHistory() {
      this.dialogVisible = true;
      this.getImages(1);
    },
    getImages(page) {
      http
        .get("/api/uploadImage/test", { params: { page: page, size: 10 } })
        .then(res => {
          if (res.data.data.length > 0) {
            res.data.data.forEach(val => {
              let a = this.baseUrl + "/" + val;
              this.ImgData.push({ img: a, checked: false });
            });
          } else {
            this.noMore = true;
            console.log(this.noMore);
          }
        });
    },
    uploadFile(file) {
      this.formDate.append("images[]", file.file);
    },
    subPicForm() {
      this.formDate = new FormData();

      this.$refs.upload.submit();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("token")
        }
      };
      if (this.$refs.upload.uploadFiles.length + this.fileList.length > 9) {
        this.$message.error("最多上传9张");
      } else {
        axios
          .post(`${this.baseUrl}/api/uploadImage/test`, this.formDate, config)
          .then(res => {
            debugger;
            if (res.data.code == 200) {
              this.$refs.upload.clearFiles();
              res.data.data.forEach(val => {
                let a = this.baseUrl + "/" + val;
                this.fileList.push(a);
              });
            } else {
              this.$message.warning(res.data.msg);
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    },

    // 设为主图
    setImg(item, index) {
      this.showFile = false;
      let selectImg = this.fileList[0];
      this.fileList[0] = item;
      this.fileList[index] = selectImg;
      this.showFile = true;
    },
    // 删除商品图
    delProductImg(item, index) {
      this.$confirm("是否删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.fileList.splice(index, 1);
        })
        .catch(() => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.infinite-list-wrapper {
  li {
    list-style: none;
    /deep/ .el-checkbox {
      display: flex;
      align-items: center;
    }
  }
}
</style>
