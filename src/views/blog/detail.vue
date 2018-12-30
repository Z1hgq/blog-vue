<template>
    <div v-html="content" class="detail">
    </div>
</template>
<script>
import { getArticalContent } from "@/api/blog"
export default {
    name:'detail',
    data(){
        return{
            content:''
        }
    },
    mounted(){
        var that = this
        var obj = {_id:this.$route.params.id}
        console.log(obj)
        getArticalContent( obj ).then((res) => {
            console.log(res)
            that.content = res.data.data[0].content;
        })
    }
}
</script>
<style lang="less">
.detail{
    width: 1200px;
    height: auto;
    min-height: 640px;
    // background: #99cccc;
    margin-top:80px;
    position: relative;
    left: 50%;
    transform: translate(-50%,0%);
}
</style>
