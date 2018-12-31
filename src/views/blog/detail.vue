<template>
<div>
    <div class="dot-revolution" v-if="showloading"></div>
    <div v-html="content" class="detail">
    </div>
</div>
</template>
<script>
import { getArticalContent } from "@/api/blog"
export default {
    name:'detail',
    data(){
        return{
            showloading:true,
            content:''
        }
    },
    mounted(){
        var that = this
        var obj = {_id:this.$route.params.id}
        console.log(obj)
        getArticalContent( obj ).then((res) => {
            console.log(res)
            that.content = res.data.data;
            that.showloading = false;
        })
    }
}
</script>
<style lang="less">
.dot-revolution{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.detail{
    width: 800px;
    height: auto;
    min-height: 640px;
    // background: #99cccc;
    margin-top:80px;
    position: relative;
    left: 50%;
    transform: translate(-50%,0%);
    p{
        strong{
            font-size: 20px;
        }
        span{
            font-size: 18px;
        }
    }
}
</style>
