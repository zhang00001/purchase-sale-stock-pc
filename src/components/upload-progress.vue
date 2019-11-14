<template>
  <div class="cmp-upload-progress">
    <!-- 上传 -->
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="true"
      :fileStatusText="fileStatusText"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      class="uploader-app">
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn ref="uploadBtn" :attrs="attrs" v-if="showUpload">
        <svg-icon icon-class="upload" class="g-icon-upload mr-5"/>
        {{txt}}
      </uploader-btn>

      <span class="m-tit ml-10" v-if="showTip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</span>

      <uploader-list>
        <div class="file-panel" slot-scope="props">
          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file class="file-mine" :file="file" :list="true">
                <div slot-scope="fileScope">
                  <el-progress
                    :class="fileScope.status"
                    :stroke-width="8"
                    :percentage="parseInt(fileScope.progress*100)"
                    style="top:35px;"
                  ></el-progress>
                  <div class="status">{{fileScope.status | statusFilter}}</div>
                </div>
              </uploader-file>

              <uploader-file
                class="file-item"
                :class="'file_' + file.id"
                ref="files"
                :file="file"
                :list="true"
              ></uploader-file>
            </li>
            <!-- <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div> -->
          </ul>
        </div>
      </uploader-list>
    </uploader>

    <!-- 已上传成功的列表 -->
    <ul class="view-file-list" :class="{'btn-no': !showUpload}">
      <li v-for="(item, index) in viewFileList" :key="index">
        <span @click="download(item)">
          <svg-icon :icon-class="'file-'+item.attFileTypeStr" class="g-icon-upload"/>
          {{item.attName}}
        </span>
        <i class="el-icon-close ml-20" @click="dele(item, index)" v-if="showUpload"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: ''
    },
    // 所属业务名 collect	藏品模块 project	项目模块 digtal	数字资产模块 workflow	审批流模块
    businessType: {
      type: String,
      default: 'collect' // 默认藏品
    },
    txt: {
      type: String,
      default: '本地上传' // 默认藏品
    },
    // 显示扩展名说明
    showTip: {
      type: Boolean,
      default: false
    },
    multipleType: {
      type: Boolean,
      default: true
    },
    // 显示上传控件
    showUpload: {
      type: Boolean,
      default: true
    },
    // 初始化文件列表
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    // 上传后的回调 获取列表所有数据
    callFun: Function
  },
  filters: {
    statusFilter: function(value) {
      let str = ''
      switch (value) {
        case 'success':
          str = '上传成功'
          break
        case 'error':
          str = '上传失败'
          break
        case 'uploading':
          str = '正在上传'
          break
        case 'paused':
          str = '暂停'
          break
        case 'waiting':
          str = '等待中'
          break
      }
      return str
    }
  },
  watch: {
    fileList(newVal) {
      this.viewFileList = newVal
    }
  },
  // computed: {
  //   viewFileList: {
  //     get() {
  //       return this.fileList
  //     },
  //     set(val) {
  //     }
  //   }
  // },
  data() {
    return {
      viewFileList: this.fileList,

      options: {
        // target: '//localhost:3000/upload',
        target: '/singleMuseum/attach/chunk', // 分片上传
        chunkSize: '2048000',
        fileParameterName: 'file',
        maxChunkRetries: 3, //最大自动失败重试上传次数
        allowDuplicateUploads: true,
        // 服务器分片校验函数，秒传及断点续传基础
        checkChunkUploadedByResponse: function(chunk, message) {
          let objMessage = JSON.parse(message)
          if (!objMessage.success) {
            return true
          }
        },
        testChunks: false, //是否开启服务器分片校验
        query: {
          tableName: this.businessType
        }
      },
      fileStatusText: {
        success: '上传成功',
        error: '上传失败',
        uploading: '正在上传',
        paused: '暂停',
        waiting: '等待中'
      },
      attrs: {
        accept: this.accept
      }
    }
  },
  methods: {
    init() {
      this.viewFileList = this.fileList
      this.$refs.uploader.fileList = []
      // this.options.query.tableName = this.businessType
      this.attrs.accept = this.accept
    },
    // 下载
    download(item) {
      location.href =
        '/singleMuseum/attach/downloadFile?attachmentId=' + item.attId
    },
    // 删除附件
    dele(item, index) {
      this.$http
        .get('/attach/deleteAttachment', {
          id: item.attId
        })
        .then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.viewFileList.splice(index, 1)
            this.sentCallback(this.viewFileList)
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 回调
    sentCallback(viewFileList) {
      let arr = []
      viewFileList.forEach(item => {
        arr.push(item.attId)
      })
      this.callFun && this.callFun(arr.join(','), viewFileList)
    },
    onFileAdded(file) {
      let isLt2M = file.size / 1024 / 1024 < 500
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'warning'
        })
        file.ignored = true
      }
    },
    onFileProgress() {
      // onFileProgress(rootFile, file, chunk) {
      // console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
    },
    onFileSuccess(rootFile, file, response) {
      let res = JSON.parse(response)
      // 服务器自定义的错误，这种错误是Uploader无法拦截的
      let fileIndex = ''
      this.$refs.uploader.fileList.forEach((item, index) => {
        if (item.id === rootFile.id) {
          fileIndex = index
        }
      })
      if (res.success) {
        this.$refs.uploader.fileList.splice(fileIndex, 1)
        this.viewFileList.push(res.result)

        this.sentCallback(this.viewFileList)
      } else {
        this.$refs.files[fileIndex].remove()
        this.$message.error(res.message)
      }
    },
    onFileError() {
      this.$message.error('服务器错误')
    }
  }
}
</script>

<style scoped lang="scss">
.cmp-upload-progress {
  $processWid: 340px;

  .uploader-btn {
    border: none;
    color: $primary;
    padding: 0;
    line-height: 40px;
    &:hover {
      background: transparent;
    }
  }
  /deep/ .file-list {
    color: $color5;
    li {
      position: relative;
      .file-item {
        .uploader-file-name {
          width: $processWid;
          line-height: 40px;
          padding-right: 110px;
          box-sizing: border-box;
          text-indent: 0;
        }
        .uploader-file-status {
          display: none;
          position: absolute;
          left: 240px;
          em,
          i {
            display: none;
          }
        }
        .uploader-file-size {
          display: none;
        }
        .uploader-file-meta {
          display: none;
        }
      }
      .file-mine {
        position: absolute;
        width: $processWid;
        height: 100%;
        bottom: 0;
        .el-progress {
          &.success {
            .el-progress-bar__inner {
              background-color: $info;
            }
          }
          &.error {
            .el-progress-bar__inner {
              background-color: $danger;
            }
          }
        }
        .status {
          position: absolute;
          left: 233px;
          top: 0;
          color: $color6;
        }
      }
      .uploader-file {
        height: 50px;
        line-height: 40px;
        border-bottom: none;
        .uploader-file-info:hover {
          background-color: transparent;
        }
      }
      .uploader-file-progress {
        display: none;
      }
    }
    // 自定义图标
    .uploader-file-icon {
      display: inline-block;
      width: 20px;
      height: 16px;
      margin: 0;
      margin-right: 8px;
      vertical-align: middle;
      &:before {
        content: '';
        background: url(~@images/icon-bg/file-other.svg) center center no-repeat;
      }
    }
    .uploader-file-icon[icon='audio']:before {
      background: url(~@images/icon-bg/file-audio.svg) center center no-repeat;
    }
    .uploader-file-icon[icon='video']:before {
      background: url(~@images/icon-bg/file-video.svg) center center no-repeat;
    }
    .uploader-file-icon[icon='document']:before {
      background: url(~@images/icon-bg/file-doc.svg) center center no-repeat;
    }
    .uploader-file-icon[icon='image']:before {
      background: url(~@images/icon-bg/file-img.svg) center center no-repeat;
    }

    .uploader-file-actions {
      width: 200px;
      height: auto;
      line-height: initial;
      color: $primary;
      font-size: 14px;
      position: absolute;
      left: $processWid;
      bottom: -2px;
      .uploader-file-resume,
      .uploader-file-pause,
      .uploader-file-remove,
      .uploader-file-retry {
        width: 50px;
        height: auto;
        margin: 0;
        background: none;
      }
      .uploader-file-resume {
        &:after {
          content: '继续';
        }
      }
      .uploader-file-pause {
        &:after {
          content: '暂停';
        }
      }
      .uploader-file-remove {
        &:after {
          content: '取消';
        }
      }
      .uploader-file-retry {
        &:after {
          content: '重传';
        }
      }
    }
  }
  .no-file {
    display: none;
  }

  .view-file-list {
    li {
      line-height: 35px;
      font-size: 14px;
      color: $color5;
      cursor: pointer;
      .g-icon-upload {
        margin-right: 4px;
      }
      .el-icon-close {
        color: $danger;
      }
    }
    &.btn-no {
      padding-top: 5px;
    }
  }
}
</style>