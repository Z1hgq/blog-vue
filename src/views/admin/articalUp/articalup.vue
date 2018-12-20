<template>
    <div class="articalinfo">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'articalup',
    data(){
        return{
            
        }
    },
    props: ['meta'],
    methods:{
    }
}
</script>
<style lang="less">
.articalinfo{
    width: 800px;
    padding-left: 10px;
}
</style>

