<template>
  <div style="padding:15px">
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
    <Table border :columns="columns" :data="clsdata"></Table>
  </div>
</template>
<style lang="less">
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
.ivu-table-wrapper {
  position: relative;
  border: 1px solid #dcdee2;
  border-bottom: 0;
  border-right: 0;
  width: 800px;
  margin-top: 30px;
}
.clsinput {
  display: flex;
  height: 90px;
  border: 2px solid #2d8cf0;
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
import { uploadCls, getCls} from "@/api/admin"
const sd = require('silly-datetime')
var axios = require("axios");
export default {
  data() {
    return {
      imgUrl: "",
      loading2: false,
      clsname: "",
      columns: [
        {
          title: "分类名称",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "分类id",
          key: "id"
        },
        {
          title: "图标",
          key: "icon"
        },
        {
          title: "添加时间",
          key: "time"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      clsdata: [
        {
          name: "John Brown",
          id: 18,
          icon: "New York No. 1 Lake Park",
          time: "2018-12-18"
        }
      ]
    };
  },
  methods: {
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
    show(index) {
      this.$Modal.info({
        title: "分类信息",
        content: `分类名称：${this.clsdata[index].name}<br>分类ID：${
          this.clsdata[index].id
        }<br>图标：${this.clsdata[index].icon}<br>添加时间：${
          this.clsdata[index].time
        }`
      });
    },
    remove(index) {
      this.clsdata.splice(index, 1);
    }
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
