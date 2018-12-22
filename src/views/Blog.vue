<template>
    <div class="blog">
        <div class="classification" :style="getScreenHeight">
            <div class="classification_el">
                <div class="cla_img">
                    <img src="/static/img/classification.png" alt="">
                </div>
                <div class="cla_name">
                    <p>全部分类</p>
                </div>
            </div>
            <div class="classification_el" v-for="cla in classes" :key="cla.id">
                <div class="cla_img">
                    <img :src="cla.imgUrl" alt="">
                </div>
                <div class="cla_name">
                    <p>{{cla.name}}</p>
                </div>
            </div>
            
        </div>
        <div class="content" :style="getScreenHeight">
            <Scroll :height='windowHeight'>
            <h1>数据api开发中～</h1>
            <h3>前台导航</h3>
            <h3>前台路由</h3>
            <h3>摄影图轮播</h3>
            <h3>后台导航及路由</h3>
            <h3>登录模块</h3>
            <h3>登录模块api及token验证</h3> 
            <h3>图片上传api</h3>
            <h3>文章分类上传api</h3>
            <div class="content_el" v-for="item in Articals" :key="item.id">    
                <a href=""><h2>{{item.title}}</h2></a> 
                <p>{{item.description}}</p>
                <div class="artTag"><Tag v-for="el in item.tag" :key="el.id" color='warning'>{{el}}</Tag></div>
                <div class="artInfo">
                    <Tag color="cyan">{{item.classification}}</Tag><span>{{item.createTime}}</span>
                </div>
            </div>
            </Scroll>
        </div>
        <div class="info" :style="getScreenHeight">

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
            getScreenHeight:'height:' +(document.body.clientHeight - 30) + 'px',
            windowHeight:document.body.clientHeight,
            classes:[
                {
                    imgUrl:'/static/img/classification.png',
                    name:'分类测试'
                },
            ],
            Articals:[
                {
                    title:'标题title test题title test题title test题title test题title test题title test题title test ',
                    tag:['标签','dasfa','ffasf'],
                    description:'描述descriptiondescriptiondescriptiondescriptiondescription',
                    content:'content content content content content content content content content content content content ',
                    createTime:'213123',
                    updateTime:'423423414',
                    classification:'Python',
                },
                {
                    title:'title test ',
                    tag:'bisadhj;dasfa;ffasf;',
                    description:'descri题title test题title test题title test题title test题title test题title test题title test题title test题title testdescriptiondescriptiondescription',
                    content:'content content content content content content content content content content content content ',
                    createTime:'213123',
                    updateTime:'423423414',
                    classification:'分类',
                },
          
            ]
        }
    },
    methods:{
        // getScreenHeight(){
        //     return 'height:' + this.windowHeight +'px'
        // }
    },
    mounted() {
        
        this.windowHeight = document.body.clientHeight - 30;
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
        getArtical({}).then((res) => {
            console.log(res)
            let datas = res.data.data
            for(let ele in res.data.data){
                let obj = {
                    title:datas[ele].title,
                    tag:datas[ele].tag.split(';'),
                    description:datas[ele].description,
                    content:datas[ele].content,
                    createTime:datas[ele].createTime,
                    updateTime:datas[ele].updateTime,
                    classification:datas[ele].classification,
                }
                this.Articals.push(obj)
            }
        })
        

  },
  created(){
    //   var element = document.getElementById("tapblog");
    //   console.log(element)
  }
}
</script>
<style lang="less">
p,div{ 
    font-family:"Microsoft YaHei",'微软雅黑',"MicrosoftJhengHei",'华文细黑','STHeiti','MingLiu' ;
    font-size: 18px;
} 
.blog{
    width: 1200px;
    height: auto;
    min-height: 640px;
    // background: #99cccc;
    margin-top:60px;
    position: relative;
    left: 50%;
    transform: translate(-50%,0%);
    .classification{
        padding: 5px;
        width:160px;
        height: auto;
        float: left;
        .classification_el{
            width: 164px;
            height: 50px;
            box-shadow: 1px 0 0px #2d8cf0;
            display: flex;
            &:hover{
                border-right: 4px solid #2d8cf0;
                background: #f0faff;
                // border-top: 1px solid #FF6600;
                // border-bottom: 1px solid #FF6600;
                // border-bottom: 1px solid #FF6600;
                p{
                    color:#2d8cf0;
                }
            }
            .cla_img{
                width: 50px;
                height: 50px;
                // float: left;
                img{
                    width: 25px;
                    height: 25px;
                    position: relative;
                    left: 50%;
                    top:50%;
                    transform: translate(-50%,-50%);
                }
            }
            .cla_name{
                text-align: center;
                width: 110px;
                height: 50px;
                // float: left;
                color: #515a6e;
                // margin-top: -5px;
                padding-top: 15px;
            }
        }
    }
    .content{
        width: 840px;
        height: auto;
        min-height: 640px;
        float: left;
        padding: 15px;
        .content_el{
            width: 100%;
            height:150px;
            background: #FFFFEE;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            a{
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
    .info{
        width: 196px;
        height: auto;
        min-height: 640px;
        float: left;
    }
}
</style>

