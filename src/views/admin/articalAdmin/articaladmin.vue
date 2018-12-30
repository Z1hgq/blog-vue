<template>
  <div class="articaladmin">
    <div class="artical_info" v-for="item in Articals" :key="item.id">
      <div class="info">
        <router-link :to="{name:'detail',params:{id:item.id}}">
            <h2>{{item.title}}</h2>
        </router-link>
        <div >
            <Tag color="cyan">{{item.classification}}</Tag>
            <span>{{item.createTime}}</span>
        </div>
      </div>
      <div class="opreation">
          <Button @click="showdelDialog(item.id)">删除</Button>
          <Modal v-model="showdialog" width="360">
            <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
               <span>Delete confirmation</span>
            </p>
            <div style="text-align:center">
                <h1>{{item.title}}</h1>
                <br>
                <p>确定删除该文章吗</p>
            </div>
            <div slot="footer">
             <Button type="error" size="large" long :loading="modal_loading" @click="deleteArtical">Delete</Button>
            </div>
          </Modal>
          <Button><router-link :to="{name:'articalEdite',params:{id:item.id}}">
            编辑
        </router-link></Button>
      </div>
    </div>
  </div>
</template>
<script>
import { getCls,delArtical } from "@/api/admin";
import { getArtical } from "@/api/blog";
export default {
  name: "articaladmin",
  data() {
    return {
        del_id:'',
        modal_loading: false,
        showdialog:false,
        classes: [],
        Articals: []
    };
  },
  props: ["meta"],
  methods: {
      showdelDialog:function(data){
          this.del_id = data;
          this.showdialog = true;
      },
      deleteArtical:function(){
          this.showdialog = false;
          var obj = {_id:this.del_id};
          delArtical(obj).then((res) => {
              console.log(res)
              getArtical({}).then(ress => {
                  this.Articals = [];
                  let datas = ress.data.data;
                  for (let ele in ress.data.data) {
                    let obj = {
                    title: datas[ele].title,
                    tag: datas[ele].tag.split(";"),
                    description: datas[ele].description,
                    createTime: datas[ele].createTime,
                    updateTime: datas[ele].updateTime,
                    classification: datas[ele].classification,
                    id: datas[ele]._id
                    };
                    this.Articals.push(obj);
                  }
                });
          })
      }
  },
  mounted() {
    getCls().then(res => {
      this.classes = [];
      let datas = res.data.data;
      for (let ele in res.data.data) {
        let obj = {
          name: datas[ele].name,
          imgUrl: datas[ele].avatar,
          id: datas[ele]._id
        };
        this.classes.push(obj);
      }
    });
    getArtical({}).then(res => {
      let datas = res.data.data;
      for (let ele in res.data.data) {
        let obj = {
          title: datas[ele].title,
          tag: datas[ele].tag.split(";"),
          description: datas[ele].description,
          createTime: datas[ele].createTime,
          updateTime: datas[ele].updateTime,
          classification: datas[ele].classification,
          id: datas[ele]._id
        };
        this.Articals.push(obj);
      }
    });
  }
};
</script>
<style lang="less">
.articaladmin{
    padding:15px;
    width: 960px;
}
.artical_info{
    width: 100%;
    height: 80px;
    .info{
        width: 70%;
        float: left;
    }
    .opreation{
        width: 30%;
        float: left;
    }
}
</style>

