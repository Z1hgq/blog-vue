<template>
    <div class="container" :style="getScreenHeight">
        <router-view></router-view>
        <BackToTop></BackToTop>
    </div>
</template>
<script>
import BackToTop from "@/views/public/backToTop.vue";
export default {
    name:'sourceCodeMain',
    components:{BackToTop},
    data(){
        return{
            getScreenHeight: "height:" + (window.screen.height - 110) + "px",
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    overflow-y: scroll;
}
</style>
