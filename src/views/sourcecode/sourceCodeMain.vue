<template>
    <div class="container" :style="getScreenHeight">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'sourceCodeMain',
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
