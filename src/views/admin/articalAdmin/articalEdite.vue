<template>
  <div class="articalinfo">
    <div class="box-shadow" v-if="showloading">
        <div class="dot-revolution"></div>
    </div>
    <div class="infoIn">
      <Tag checkable color="primary">标题</Tag><Input v-model="artTitle" placeholder="请输入标题..." style="width: 300px"/>
      <br>
      <br>
      <Tag checkable color="primary">描述</Tag><Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"  v-model="description" placeholder="请输入文章描述..." style="width: 300px" />
      <br><br>
      <Tag checkable color="primary">标签</Tag><Input v-model="tag" placeholder="请以';'分隔" style="width: 300px"/>
      <br><br>
      <Tag checkable color="primary">分类</Tag>
      <Select v-model="model" style="width:200px" @on-change="getSelect" :placeholder='classification'>
        <Option v-for="item in classes" :value="item.name" :key="item.name">{{item.name}}</Option>
    </Select>
    <Button
        type="primary"
        :loading="loading"
        icon="ios-cloud-upload-outline"
        @click="updateArtical"
        style="height:30px;float:right"
      >
        <span v-if="!loading">更新</span>
        <span v-else>Loading</span>
      </Button>
    </div>
    <div class="quill-editor-example">
      <!-- quill-editor -->
      <div class="e_imgUpDiv">
        <input class="imgUp" type="file" ref="upload" name="logo" id="file" accept="image/*" @change="getImg"/>
        <label for="file"><Icon type="ios-albums-outline" />&nbsp上传图片</label>
      </div>
      <quill-editor
        ref="myTextEditor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>
      <!-- <div class="quill-code">
          <code class="hljs" v-html="contentCode"></code>
      </div>-->
    </div>

  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import hljs from "highlight.js";
import { quillEditor ,Quill} from "vue-quill-editor"

import {ImageDrop} from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

import { getCls,articalUpdate } from '@/api/admin'
import { getArticalContent } from "@/api/blog"
import { uploadImg } from "@/api/data"
const sd = require('silly-datetime')
export default {
  name: "articalEdite",
  components: {
    quillEditor
  },
  data() {
    return {
      showloading:true,
      loading:false,
      model:'',
      classes:[],
      artTitle:'',
      classification:'',
      tag:'',
      description:'',
      name: "01-example",
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          imageDrop: true,
          imageResize: {}
        }
      }
    };
  },
  props: ["meta"],
  methods: {
    updateArtical(){
      var that = this
      var artical = {
        _id:this.$route.params.id,
        title:that.artTitle,
        tag:that.tag,
        description:that.description,
        content:that.content,
        updateTime:sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        classification:that.classification,
      }
      if(artical.content == ''){
        that.$Notice.error({
            title:'请填写正文！',
            desc:''
        })
      }else if(artical.title == ''){
        that.$Notice.error({
            title:'请填写标题！',
            desc:''
        })
      }else if(artical.classification == ''){
        that.$Notice.error({
            title:'请选择分类！',
            desc:''
        })
      }else{
        console.log(artical)
        articalUpdate(artical).then((res) =>{
          console.log(res)
          if(res.data.success == '1'){
            that.$Notice.success({
              title:res.data.message,
              desc:''
            });
            // that.artTitle = '';
            // that.content = '';
            // that.tag = '';
            // that.description = '';
          }else{
            that.$Notice.error({
              title:res.data.message,
              desc:''
            })
          }
        })
      }
    },
    getSelect(e){
      console.log(e)
      this.classification = e;
    },
    onEditorBlur(editor) {
      console.log(this.content);
    },
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    getImg() {
      var that = this;
      var formData = new FormData();
      formData.append("logo", this.$refs.upload.files[0]);
      uploadImg(formData).then((res)=>{
        console.log(res.data);
        if (res.data.success) {
          that.content = that.content + '<img src=' + res.data.filePath + '>'
          that.$Message.success("Upload success~");
        } else {
          that.$Message.error("Upload fail!");
        }
      })
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  },
  mounted() {
    var that = this
    var obj = {_id:this.$route.params.id}
    getArticalContent( obj ).then((res) => {
        console.log(res)
        that.artTitle = res.data.data[0].title;
        that.tag = res.data.data[0].tag;
        that.description = res.data.data[0].description;
        that.classification = res.data.data[0].classification;
        that.content = res.data.data[0].content;
        that.showloading = false;
    })
    getCls().then((res)=>{
      this.classes= [];
      let datas = res.data.data
      for(let ele in res.data.data){
        let obj = {
          name:datas[ele].name,
          imgUrl:datas[ele].avatar,
          id:datas[ele]._id,
        }
        this.classes.push(obj)
      }
    })
  }
};
</script>
<style lang="less">
.articalinfo {
  width: 800px;
  padding-left: 10px;
  margin-top: -20px;
  padding-top: 30px;
  .infoIn{
    margin: 20px 0;
  }
  .box-shadow{
    width: 790px;
    height: 808px;
    position: absolute;
    background: rgba(255,255,255,0.8);
    z-index: 10;
    .dot-revolution{
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    position: absolute;
    opacity: 1;
  }
  }
}
.quill-editor {
  height: 500px;
}
.imgUp{
    height: 30px;
    opacity: 0;
    width: 1px;
}
.e_imgUpDiv{
    background-color: #2d8cf0;
    color: aliceblue;
    border-radius: 5px;
    /* margin-top: 26px; */
    height: 28px;
    /* padding-left: 7px; */
    padding-top: 3px;
    margin-right: 20px;
    margin-left: 10px;
    width: 85px;
    text-align: center;
    margin: 50px 0 -60px 690px;
    position: relative;
}
</style>

