<template>
    <div v-html="content">
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