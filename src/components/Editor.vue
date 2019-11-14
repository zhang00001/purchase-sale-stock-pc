<template>
  <div class="main">
   
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <input type="file"   multiple="multiple"  id="avatar-uploader"  @change="afterRead" style="display:none" />
    
  </div>
</template>
<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [
    {
      size: [
        "medium",
        "small",
        "large",
        "huge",
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "22px",
        "24px",
        "26px",
        "32px",
        "48px"
      ]
    }
  ], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];

import axios from "axios";
export default {
  data() {
    return {
   
     
    
      url: "",
  
       
     
 
     
     
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                   document.querySelector("#avatar-uploader").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  mounted() {
    
  },
  props:["content"],
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function(event) {
      alert(this.content);
    },
 
    upload(url) {
      let quill = this.$refs.myQuillEditor.quill;
      // 获取光标所在位置
      let length = quill.getSelection().index;
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, "image", url);
      // 调整光标到最后
      quill.setSelection(length + 1);
    },
    afterRead() {
       let files = event.target.files;

      if (files.length > 0) {
        Array.prototype.forEach.call(files, file => {
          var that = this;
          var form = new FormData();
          form.append("upload_img", file);
          form.append("type", 2);
          //   form.append("token", this.$common._getCookie("ht_token"));
          var xhr = new XMLHttpRequest();
          xhr.open("POST", process.env.BASE_API + "index/base/upload", true);
          xhr.onreadystatechange = callback;
          xhr.send(form);
          function callback(res) {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                let url = JSON.parse(res.currentTarget.response).data;
                console.log(url);
                that.upload(url.http_image);
              } else return false;
            }
          }
        });
      }
    },
   
  
   
  
   
  
  }
};
</script>
 
