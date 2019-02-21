<template>
<div class="detail" :style="getScreenHeight">
    <div class="dot-revolution" v-if="showloading"></div>
    <h1 class="title">
        {{title}}
    </h1>
    <div class="info">
        <span>{{time}}</span><span style="margin-left:25px" v-if="!showloading">标签：</span><span v-for="tag in tags" :key="tag.id">{{tag}};</span>
    </div>
    <div class="blockquote" v-if="!showloading">
        {{description}}
    </div>
    <div v-html="content" class="content">
    </div>
    <comment :pageinfos='pageInfo' v-if="!showloading"></comment>
</div>
</template>
<script>
import Vue from 'vue';
import { getArticalContent} from "@/api/blog";
import Comment from '@/views/blog/comment.vue';
import * as CommentData from '@/mock/mockCommentData';
export default {
    name:'detail',
    components:{Comment},
    data(){
        return{
            getScreenHeight:'height:' +(window.screen.height - 170) + 'px',
            windowHeight:window.screen.height - 170,
            showloading:true,
            content:'',
            title:'',
            time:'',
            tags:[],
            description:'',
            commentData: [],
            pageInfo:{
                pageid:'',
                pagepath:'',
            }
        }
    },
    mounted(){
        // this.commentData = CommentData.comment.data;
        this.pageInfo.pageid = this.$route.params.id;
        this.pageInfo.pagepath = this.$route.path
        var that = this;
        var obj = {_id:this.$route.params.id};
        getArticalContent( obj ).then((res) => {
            that.content = res.data.data[0].content;
            that.title = res.data.data[0].title;
            that.time = res.data.data[0].createTime;
            that.tags = res.data.data[0].tag.split(';');
            that.description = res.data.data[0].description;
            that.showloading = false;
        })
    }
}
</script>
<style lang="less">
.detail{
    margin-top:60px;
    width:65%;
    min-width: 1000px;
    height: auto;
    min-height: 640px;
    position: relative;
    left: 50%;
    transform: translate(-50%,0%);
    .info{
        padding: 8px 0;
        span{
            margin-left: 5px;
        }
    }
    .title{
        word-break: break-word!important;
        word-break: break-all;
        margin: 20px 0 0;
        font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
        font-size: 36px;
        font-weight: 700;
        line-height: 1.3;
    }
    .blockquote{
        padding: 5px;
        padding-left:20px;
        margin-bottom: 25px;
        background-color: #f7f7f7;
        border-left: 6px solid #b4b4b4;
        word-break: break-word!important;
        word-break: break-all;
        font-size: 18px;
        font-weight: 400;
        line-height: 30px;
    }
    .dot-revolution{
    position: absolute !important;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    }
    .content{
        margin-top: 10px;
        p{
            font-size: 18px;
            strong{
                font-size: 20px;
            }
            span{
                font-size: 18px;
            }
        }   
    }
}
</style>
