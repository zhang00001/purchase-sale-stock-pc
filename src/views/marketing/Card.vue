<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="top">
            <h5 class="label">会员卡面</h5>
          </div>

          <div class="box">
            <div class="row">
              <el-checkbox v-model="status" style="margin:20px 0">开通会员卡</el-checkbox>
              <p class="tip">
                提示：像素大小控制在1000像素*600像素以下
                <br />设计规范：卡面从顶部起4/10的部分与从底部3/10的部分都有禁止文字，因为会包含会员卡的名称、编号、logo、商户名称等信息。
              </p>
              <el-upload
                class="avatar-uploader"
                action
                :http-request="uploadFile"
                :show-file-list="false"
              >
                <img v-if="images" :src="images" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>

          <div class="top" style="margin-top:50px;">
            <h5 class="label">卡片信息</h5>
          </div>

          <div class="box">
            <div class="row" style="    margin-top: 20px;">
              <span class="lable" style="  margin-top:10px;">会员卡名称：</span>
              <el-input v-model="card_name" class="inputName"></el-input>
            </div>
            <div class="row">
              <span class="lable" style="  margin-top:10px;">有效期：</span>
              <span>永久</span>
            </div>
          </div>

          <div class="btn_row">
            <el-button type="primary" @click="saveCard">保存</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { memberCard, memberCardInfo } from "@/api/index";
import axios from "axios";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
export default {
  data() {
    return {
      dialogImageUrl: "",
      card_name: "",
      dialogVisible: false,
      status: true,
      fileList: [],
      images: "",
      cardId: ""
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getCard();
  },
  methods: {
    async getCard() {
      let res = await memberCardInfo();
      this.images = process.env.BASE_API + "/" + res.data.images;
      this.card_name = res.data.card_name;
      this.cardId = res.data.id;
    },
    async saveCard() {
      let status;
      status = this.status ? "0" : "1";

      let res = await memberCard({
        status: status,
        images: this.images.split(process.env.BASE_API)[1],
        card_name: this.card_name
      });
      if (res.code == 200) {
        this.$message.success(res.msg);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
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
            this.$message.success("图片上传成功");
            this.images = process.env.BASE_API + "/" + res.data.data[0];
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 400px;
  height: 133px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 133px;
  line-height: 133 px;
  text-align: center;
}
// .avatar-uploader {
//   border: 1px dashed #d9d9d9;
// }
.avatar,
.avatar-uploader {
  width: 400px;
  height: 133px;
  display: block;
}

.searBar {
  /deep/ .el-input {
    width: 190px;
    margin-right: 30px;
  }
  /deep/ .el-button {
    margin-top: 20px;
  }
}
.btn_row {
  display: flex;
  justify-content: center;
  /deep/ .el-button {
    width: 200px;
  }
}
.row {
  margin-bottom: 24px;

  .lable {
    width: 80px;
  }
  .margin_top {
    margin-top: 18px;
  }

  /deep/ .el-input {
    width: 370px;
  }
  /deep/ .el-button--text {
    margin-left: 42px;
    padding: 0;
  }
  .inputCode {
    width: 72px;
  }
  .tip {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
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
