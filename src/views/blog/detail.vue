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
    <BackToTop></BackToTop>
</div>
</template>
<script>
import Vue from 'vue';
import { getArticalContent} from "@/api/blog";
import Comment from '@/views/blog/comment.vue';
import * as CommentData from '@/mock/mockCommentData';
import BackToTop from "@/views/public/backToTop.vue";
export default {
    name:'detail',
    components:{Comment,BackToTop},
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
            document.title = that.title;
        })
    }
}
</script>
<style lang="less">
h3 {
    display: block;
    font-size: 1.2em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
p{
    font-size: 0.9em;
    line-height: 1.1em;
}
pre {
    font-family: monospace,monospace;
    font-size: 0.8em !important;
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
    padding: 5px 10px 5px 10px !important;
    border-radius: 5px;
    overflow-x: scroll;
}
.detail{
        font-size: 18px;
        margin-top: 60px;
        width: 100%;
        height: auto;
        min-height: 640px;
        padding: 0 10px 10px 10px;
}
@media screen and (min-width:1000px){
    .detail{
        font-size: 18px;
        margin-top: 60px;
        width: 65%;
        height: auto;
        min-height: 640px;
    }
}

.detail{
    overflow-y: scroll;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    margin: auto;
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
            // font-size: 16px;
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
