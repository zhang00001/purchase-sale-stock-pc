<template>
  <div class="upload">
    <div v-for="(item,index) in fileList" class="fileList" :key="item.id">
      <img :src="baseUrl+'/'+ item" alt @click="lookPicture(item)" />
      <i class="el-icon-error" @click="handleRemove(item,index)"></i>
    </div>
    <el-upload
      action
      :list-type="type"
      accept="image/gif, image/jpeg, image/png"
      ref="upload"
      :http-request="uploadFile"
      multiple
		  :show-file-list="false"
    >
      <!-- 上传加号图标 -->
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>

    <!-- 查看图片 为放大图 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  watch: {
    imagesList() {
      this.fileList = this.imagesList
		},
    immediate: true,
    deep: true
  },
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
			disabled: false,
			type: this.pictureType,
      baseUrl: process.env.BASE_API
    };
  },
  props: {
    // 图片上传限制
    limit: {
      type: Number,
      default: ""
    },
    // 初始化图片列表
    imagesList: {
      type: Array,
      default() {
        return [];
      }
		},
		// 图片上传格式
    pictureType: {
      type: String,
      default: "picture-card"
    }
  },
  methods: {
    uploadFile(item) {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("token")
        }
      };
      const formdata = new FormData();
      formdata.append("images[]", item.file);

      axios
        .post(process.env.BASE_API + "/api/uploadImage/test", formdata, config)
        .then(res => {
          if (res.data.code == 200) {
            if (this.fileList.length >= this.limit) {
              this.$message.error(`最多上传${this.limit}`);
            } else {
              this.$message.success("图片上传成功");
							this.fileList.push(res.data.data);
							this.pictures = res.data.data
							this.$emit("upPicture", this.pictures)
            }
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    },
    handleRemove(file, index) {
      this.fileList.splice(index, 1);
    },

    // 点击图片查看
    lookPicture(file) {
      this.dialogImageUrl = this.baseUrl + "/" + file;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  /deep/ .el-upload-list--picture-card {
    display: none;
  }
}
.fileList {
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  img {
    width: 100px;
    height: 100px;
    position: absolute;
    cursor: pointer;
    border-radius: 5px;
  }
  i {
    position: absolute;

    background: #ddd;
    color: #ff3a3a;
    background: none;
    right: -8px;
    top: -8px;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>