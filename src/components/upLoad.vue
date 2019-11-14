<template>
  <div :class="[ 'upload-box', isSingle ? 'single-pic' : '' ]" ref="upload">
    <el-upload
      :action="$qiniuUploadUrl"
      multiple
      :file-list="fileListArr"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-error="err"
      :data="upToken"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'upload',
  inject: ['app'],
  props: {
    limit: {
      type: Number,
      default: 1
    },
    fileList: {
      type: [String, Array],
      required: true
    },
    sizeLimit: {
      type: Object,
      default: function () {
        return {
          size: 4 * 1024 * 1024,
          message: '上传图片大小不能超过 4MB!'
        }
      }
    }
  },
  data () {
    return {
      upToken: {},
      dialogImageUrl: '',
      dialogVisible: false,
      uploadData: []
    }
  },
  computed: {
    fileListArr: function () {
      let arr = []
      if (this.uploadData.length > 0) {
        arr = this.uploadData
      } else {
        if (this.fileList) {
          arr = Array.isArray(this.fileList)
            ? this.fileList
            : this.fileList.split(',').map(v => { return {url: v} })
        }
      }
      return arr
    },
    isSingle: function () {
      return this.limit === 1
    }
  },
  watch: {
    'fileListArr': function (val) {
      if (val.length >= this.limit) {
        this.$refs.upload.querySelector('.el-upload').style.display = 'none'
      } else {
        this.$refs.upload.querySelector('.el-upload').style.display = 'inline-block'
      }
    }
  },
  methods: {
    /**
     * @discription 删除图片回调
     * @param file
     * @param fileList
     */
    handleRemove (file, fileList) {
      this.uploadData = fileList
      this.$emit('update:fileList',
        Array.isArray(this.fileList)
          ? fileList
          : fileList.map(v => v.url).toString())
    },
    /**
     * @discription 预览回调
     * @param file
     */
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * @discription 文件超出个数限制时的钩子
     * @param files
     * @param fileList
     */
    handleExceed (files, fileList) {
      if (fileList.length + files.length >= this.limit) {
        this.$message.error(`最多上传${this.limit}张图片!`)
      }
    },
    /**
     * @discription 上传成功回调
     * @param file
     * @param fileList
     */
    handleSuccess (response, file, fileList) {
      fileList.forEach(v => {
        if (v.response) {
          v.url = 'https://saas.res.bmkp.cn/' + v.response.hash
        }
      })
      this.uploadData = fileList
      this.$emit('update:fileList',
        Array.isArray(this.fileList)
          ? fileList
          : fileList.map(v => v.url).toString())
    },
    /**
     * @discription 上传图片
     * @param file
     * @returns {Promise.<boolean>}
     */
    async beforeUpload (file) {
      if (this.fileListArr.length >= this.limit - 1) {
        this.$refs.upload.querySelector('.el-upload').style.display = 'none'
      }
      if (file.size > this.sizeLimit.size) {
        this.$message.error(this.sizeLimit.message)
        return Promise.reject(new Error('上传失败!'))
      }
      let time = window.context.get('time')
      if ((new Date().getTime() > time + 10 * 60 * 1000) || (!window.context.get('token'))) {
        await this.getToken()
      } else {
        this.upToken.token = window.context.get('token')
      }
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isGIF = file.type === 'image/gif'
      if (!isJPEG && !isJPG && !isPNG && !isBMP && !isGIF) {
        this.$message.error('上传图片只能是 jpg,jpeg,png,bmp格式!')
        return Promise.reject(new Error('上传失败!'))
      }
    },
    err (err) {
      console.log(err)
      if (this.fileListArr.length >= this.limit) {
        this.$refs.upload.querySelector('.el-upload').style.display = 'none'
      } else {
        this.$refs.upload.querySelector('.el-upload').style.display = 'inline-block'
      }
    },
    getToken () {
      return this.app.request({
        method: 'get',
        url: this.app.getServiceURL() + '/anno/getSaasToken',
        params: {}
      }).then((res) => {
        window.context.set('time', new Date().getTime())
        window.context.set('token', res.data.uptoken)
        this.upToken.token = res.data.uptoken
        return Promise.resolve()
      })
    }
  }
}
</script>
<style scoped>
  .upload-box {
    text-align: left;
  }

  .single-pic {
    width: 150px;
    height: 170px;
    overflow: hidden;
  }
</style>
