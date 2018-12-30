<template>
  <div style="padding:15px;width:960px;min-width:960px;">
    <div class="clsinput">
      <!-- <form>
                <input accept="image/*" id="upload_file" type="file" name="logo">
                <input type="submit" value="提交" @click="hadelImgupload">
      </form>-->
      <div class="imgUpDiv">
        <input class="imgUp" type="file" ref="upload" name="logo" id="file" accept="image/*" @change="getImg"/>
        <label for="file"><Icon type="ios-albums-outline" />&nbsp点击上传图标</label>
      </div>
      <img v-if="imgUrl" :src="imgUrl" alt="">
      <Poptip trigger="focus">
        <Input v-model="clsname" prefix placeholder="分类名称" style="width: 150px"/>
        <div slot="content">{{clsname}}</div>
      </Poptip>
      <Button
        type="primary"
        :loading="loading2"
        icon="ios-add-circle-outline"
        @click="addBlogCla"
        style="height:30px;margin:25px;"
      >
        <span v-if="!loading2">添加</span>
        <span v-else>Loading</span>
      </Button>
    </div>
    <div class="clsTable">
      <div class="tableEl">
        <div class="name">
          分类名称
        </div>
        <div class="id">
          分类id
        </div>
        <div class="avatar">
          分类图标
        </div>
        <div class="time">
          创建时间
        </div>
        <div class="opreation" style="padding-top:10px">
          操作
        </div>
      </div>
      <div class="tableEl" v-for="item in clsdata" :key="item.id">
        <div class="name">
          {{item.name}}
        </div>
        <div class="id">
          {{item.id}}
        </div>
        <div class="avatar">
          <img :src="item.icon" alt="">
        </div>
        <div class="time">
          {{item.time}}
        </div>
        <div class="opreation">
          <Button @click="showdelDialog(item.id,item.name)">删除</Button>
          <Modal v-model="showdialog" width="360">
            <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
               <span>Delete confirmation</span>
            </p>
            <div style="text-align:center">
                <h1>{{del_name}}</h1>
                <br>
                <p>确定删除该分类吗</p>
            </div>
            <div slot="footer">
             <Button type="error" size="large" long :loading="modal_loading" @click="deleteCls">Delete</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.clsTable{
  width: 100%;
  margin-top: 20px;
  .tableEl{
    width: 100%;
    height:40px;
    margin: 0px 0;
    border:1px solid #2d8cf0;
    .name{
      width: 15%;
      height: 100%;
      border-right: 1px solid #2d8cf0;
      text-align: center;
      padding-top:10px;
      float: left;
    }
    .id{
      width: 30%;
      height: 100%;
      border-right: 1px solid #2d8cf0;
      text-align: center;
      padding-top:10px;
      float: left;
    }
    .avatar{
      width: 10%;
      height: 100%;
      border-right: 1px solid #2d8cf0;
      text-align: center;
      padding-top:10px;
      float: left;
      img{
        width: 30px;
        height:30px;
        margin-top: -5px;
      }
    }
    .time{
      width: 25%;
      height: 100%;
      border-right: 1px solid #2d8cf0;
      text-align: center;
      padding-top:10px;
      float: left;
    }
    .opreation{
      width: 20%;
      height: 100%;
      text-align: center;
      padding-top:5px;
      float: left;
    }
  }
}
.imgUp{
    height: 30px;
    opacity: 0;
    width: 1px;
}
.imgUpDiv{
    background-color: #2d8cf0;
    color: aliceblue;
    border-radius: 13px;
    margin-top: 26px;
    height: 30px;
    padding-left: 7px;
    padding-top: 4px;
    margin-right: 20px;
    margin-left: 10px;
    width: 110px;
}
.clsinput {
  display: flex;
  height: 90px;
  border: 2px solid #2d8cf0;
  width: 100%;
  img{
    width: 30px;
    margin-top: 27px;
    height: 30px;
    margin-right: 20px;
  }
}
.demo-upload-list > img {
  width: 60px;
}
.ivu-poptip-rel {
  display: inline-block;
  position: relative;
  margin-top: 25px;
}
</style>

<script>
import { uploadImg } from "@/api/data"
import { uploadCls, getCls , delCls}from "@/api/admin"
const sd = require('silly-datetime')
var axios = require("axios");
export default {
  data() {
    return {
      del_name:'',
      del_id:'',
      modal_loading: false,
      showdialog:false,
      imgUrl: "",
      loading2: false,
      clsname: "",
      clsdata: []
    };
  },
  methods: {
    showdelDialog:function(id,name){
      this.del_id = id;
      this.del_name = name;
      this.showdialog = true;
    },
    deleteCls:function(){
      this.showdialog = false;
      var obj = {
        _id:this.del_id,
        classification:this.del_name
      }
      delCls(obj).then((res) => {
        getCls().then((ress)=>{
          console.log(ress)
          this.clsdata = [];
          let datas = ress.data.data
          for(let ele in ress.data.data){
            let obj = {
              name:datas[ele].name,
              id:datas[ele]._id,
              icon:datas[ele].avatar,
              time:datas[ele].createTime
            }
            this.clsdata.push(obj)
          }
        })
      })
    },
    getImg() {
      var that = this;
      var formData = new FormData();
      formData.append("logo", this.$refs.upload.files[0]);
      uploadImg(formData).then((res)=>{
        console.log(res.data);
        if (res.data.success) {
          that.imgUrl = res.data.filePath;
          that.$Message.success("Upload success~");
        } else {
          that.$Message.error("Upload fail!");
        }
      })
    },
    addBlogCla() {
      var that = this
      this.loading2 = true;
      if(that.clsname == ''){
        that.$Message.error('请输入分类名称！');
        that.loading2 = false;
      }else if(that.imgUrl == ''){
        that.$Message.error('请选择分类图标！');
        that.loading2 = false;
      }else{
        var data = {
              name: that.clsname,
              avatar: that.imgUrl,
              createTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
              updateTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        }
        uploadCls(data).then((res) => {
          console.log(res.data);
          that.loading2 = false;
          if (res.data.success == '1') {
            that.$Message.success(res.data.message);
            getCls().then((res)=>{
              console.log(res)
              this.clsdata = [];
              let datas = res.data.data
              for(let ele in res.data.data){
                let obj = {
                  name:datas[ele].name,
                  id:datas[ele]._id,
                  icon:datas[ele].avatar,
                  time:datas[ele].createTime
                }
                this.clsdata.push(obj)
              }
            })
          } else {
            that.$Message.warning(res.data.message);
          }
        })
      }
    },
  },
  mounted() {
    getCls().then((res)=>{
      console.log(res)
      this.clsdata = [];
      let datas = res.data.data
      for(let ele in res.data.data){
        let obj = {
          name:datas[ele].name,
          id:datas[ele]._id,
          icon:datas[ele].avatar,
          time:datas[ele].createTime
        }
        this.clsdata.push(obj)
      }
    })
  }
};
</script>
