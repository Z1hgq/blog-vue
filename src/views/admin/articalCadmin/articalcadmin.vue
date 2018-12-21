<template>
  <div style="padding:15px">
    <div class="clsinput">
      <!-- <form>
                <input accept="image/*" id="upload_file" type="file" name="logo">
                <input type="submit" value="提交" @click="hadelImgupload">
      </form>-->
      <input class="imgUp" type="file" ref="upload" name="logo" id="file" accept="image/*" @change="getImg"/>
      <img v-if="imgUrl" :src="imgUrl" alt="" style="width:30px;margin-top:30px">
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
    background-color: #2d8cf0;
    color: aliceblue;
    border-radius: 13px;
    margin-top: 26px;
    padding: 4px;
    padding-left: 15px;
    margin-right: 20px;
    margin-left: 10px;
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
import { uploadImg } from "@/api/data";
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
      axios({
        method: "post",
        url: "http://api.cnarthub/upload_img",
        anync: true,
        contentType: false,
        processData: false,
        data: formData
      }).then(function(res) {
        console.log(res.data);
        if (res.data.success) {
          that.imgUrl = res.data.filePath;
          that.$Message.success("Upload success~");
        } else {
        }
      });
    },
    addBlogCla() {
      var that = this
      this.loading2 = true;
      axios({
        method: "post",
        url: "http://api.cnarthub/addBlogCla",
        anync: true,
        contentType: false,
        processData: false,
        data: {
            name: that.clsname,
            avatar: that.imgUrl,
            createTime: Date.now(),
            updateTime: Date.now(),
        }
      }).then(function(res) {
        console.log(res.data);
        that.loading2 = false;
        if (res.data.success == '1') {
          that.$Message.success(res.data.message);
        } else {
          that.$Message.success(res.data.message);
        }
      });
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
  mounted() {}
};
</script>
