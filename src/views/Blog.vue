<template>
    <div class="blog" :style="getScreenHeight">
        <div class="classification">
            <div class="classification_el" id="all" @click.capture="changeClassification('all')">
                <div class="_all" style="width:40%;height:50px;text-align:right">
                    <img src="/static/img/classification.png" alt="" class="_all">
                </div>
                <div class="cla_name">
                    <p class="_all">全部分类</p>
                </div>
            </div>
            <div class="classification_el" v-for="cla in classes" :key="cla.id" :id="cla.name" @click="changeClassification(cla.name)">
                <div style="width:40%;height:50px;text-align:right">
                    <img :src="cla.imgUrl" alt="" >
                </div>
                <div class="cla_name">
                    <p>{{cla.name}}</p>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="dot-carousel" style="margin-left:380px;margin-top:200px" v-if="showloading"></div>
            <div class="content_el" v-for="item in Articals" :key="item.id">    
                <!-- <a href=""><h2>{{item.title}}</h2></a>  -->
                <router-link :to="{name:'detail',params:{id:item.id}}"><h2>{{item.title}}</h2></router-link>
                <p>{{item.description}}</p>
                <div class="artTag"><Tag v-for="el in item.tag" :key="el.id" color='warning'>{{el}}</Tag></div>
                <div class="artInfo">
                    <Tag color="cyan">{{item.classification}}</Tag><span>{{item.createTime}}</span>
                </div>
            </div>
        </div>
        <div class="info">

        </div>
    </div>
</template>
<script>
import { getCls} from "@/api/admin"
import { getArtical } from "@/api/blog"
const sd = require('silly-datetime')
export default {
    name:'Blog',
    data(){
        return{
            showloading:true,
            getScreenHeight:'height:' +(window.screen.height - 170) + 'px',
            windowHeight:document.body.clientHeight,
            clsName:'',
            classes:[
            ],
            Articals:[]
        }
    },
    methods:{
        // getScreenHeight(){
        //     return 'height:' + this.windowHeight +'px'
        // }
        changeClassification(e){  
            this.Articals = []
            this.showloading = true;
            this.clsName = e;
            var ids = ['all'];
            for(let ele in this.classes){
                ids.push(this.classes[ele].name)
            }
            for(let ele in ids){
                let el = document.getElementById(ids[ele])
                el.classList.remove('act')
            }
            try{
                let actEl = document.getElementById(e)
                actEl.classList.add('act')
            }catch(err){
                console.log(err)
            }
            let ob = {}
            if(this.clsName == 'all'){//查询全部文章的时候传递空对象
            }else{
                ob = {classification:this.clsName}//查询其他文章的时候传递文章分类名
            }
            getArtical(ob).then((res) => {
                let datas = res.data.data
                for(let ele in res.data.data){
                    let obj = {
                        title:datas[ele].title,
                        tag:datas[ele].tag.split(';'),
                        description:datas[ele].description,
                        createTime:datas[ele].createTime,
                        updateTime:datas[ele].updateTime,
                        classification:datas[ele].classification,
                        id:datas[ele]._id
                    }
                    this.Articals.push(obj)
                }
                this.Articals = this.Articals.reverse()
                this.showloading = false;
            })
        }
    },
    mounted() {
        this.windowHeight = window.screen.height - 190;
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
        let element = document.getElementById('all')
        element.classList.add('act')
        getArtical({}).then((res) => {
            let datas = res.data.data
            for(let ele in res.data.data){
                let obj = {
                    title:datas[ele].title,
                    tag:datas[ele].tag.split(';'),
                    description:datas[ele].description,
                    createTime:datas[ele].createTime,
                    updateTime:datas[ele].updateTime,
                    classification:datas[ele].classification,
                    id:datas[ele]._id
                }
                this.Articals.push(obj)
            }
            this.Articals = this.Articals.reverse()
            this.showloading = false;
        })
        

  },
  created(){
    //   var element = document.getElementById("tapblog");
    //   console.log(element)
  }
}
</script>
<style lang="less">
.blog{
    p,div{ 
    font-family:"Microsoft YaHei",'微软雅黑',"MicrosoftJhengHei",'华文细黑','STHeiti','MingLiu' ;
    } 
    font-size: 18px;
    width: 100%;
    // height: auto;
    min-height: 640px;
    // height: 100%;
    margin-top: 60px;
    // position: relative;
    display: grid;
    // grid-template-rows: 100px;
    grid-template-columns: 200px auto 300px;
    // position: relative;
    // left: 50%;
    // transform: translate(-50%,0%);
    .classification{
        /* padding: 5px; */
        // width: 15%;
        // height: auto;
        // float: left;
        -webkit-box-shadow: 1px 0 0px #2d8cf0;
        /* box-shadow: 1px 0 0px #2d8cf0; */
        // position: fixed;
        // left: 0;
        // top: 60px;
        // bottom: 0;
        display: block;
        overflow-y: scroll;
        // min-width: 180px;
        z-index: 1000;
        background: #fff;
        .act{
            // border-right: 4px solid #2d8cf0;
            outline: 1px solid #2d8cf0;
            background: #f0faff;
            // border-top: 1px solid #FF6600;
            // border-bottom: 1px solid #FF6600;
            // border-bottom: 1px solid #FF6600;
            p{
                color:#2d8cf0;
            }
        }
        .classification_el{
            width: 100%;
            height: 50px;
            display: flex;
            cursor:pointer;
            &:hover{
                // border-right: 4px solid #2d8cf0;
                outline: 1px solid #2d8cf0;
                background: #f0faff;
                // border-top: 1px solid #FF6600;
                // border-bottom: 1px solid #FF6600;
                // border-bottom: 1px solid #FF6600;
                p{
                    color:#2d8cf0;
                }
            }
            div{
                img{
                    width: 25px;
                    height: 25px;
                    position: relative;
                    // left: 50%;
                    top:50%;
                    transform: translate(-50%,-50%);
                }
            }
            .cla_name{
                text-align: left;
                width: 60%;
                height: 50px;
                // float: left;
                color: #515a6e;
                // margin-top: -5px;
                p{
                    height: 100%;
                    padding-top: 15px;
                }
            }
        }
    }
    .content{
        // width: 85%;
        // height: auto;
        min-height: 640px;
        /* float: right; */
        /* padding: 15px; */
        padding-left: 0px;
        /* margin-left: 15%; */
        // position: fixed;
        // left: 15%;
        // top: 60px;
        overflow-y: scroll;
        // -ms-overflow-y: scroll;
        // -moz-overflow-y: scroll;
        .content_el{
            width: 100%;
            height:150px;
            padding: 10px;
            margin: 10px 0;
            box-shadow: 0px 3px 3px #ddd;
            padding-left: 20px;
            a{
                color: #2d8cf0 !important;
                h2{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
            p{
                font-size: 16px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            .artTag{
                padding: 5px 0;
            }
            .artInfo{
                padding: 5px 0;
            }
        }
    }
    // .info{
    //     width: 15%;
    //     height: auto;
    //     min-height: 640px;
    //     float: right;
    // }
}
</style>

