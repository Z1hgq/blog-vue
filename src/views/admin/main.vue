<template>
    <div style="display:flex">
        <Menu :active-name="$route.meta.activename" :open-names="$route.meta.openname">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics" />
                博客管理
            </template>
            <router-link to="/admin/articalup"><MenuItem name="1-1">文章上传</MenuItem></router-link>
            <router-link to="/admin/articaladmin"><MenuItem name="1-2">文章管理</MenuItem></router-link>
            <router-link to="/admin/articalcadmin"><MenuItem name="1-3">分类管理</MenuItem></router-link>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing" />
                摄影管理
            </template>
            <router-link to="/admin/photoup"><MenuItem name="2-1">作品上传</MenuItem></router-link>
            <router-link to="/admin/photoadmin"><MenuItem name="2-2">作品管理</MenuItem></router-link>
            <router-link to="/admin/photocadmin"><MenuItem name="2-3">分类管理</MenuItem></router-link>
        </Submenu>
        <router-link to="/admin/about"><MenuItem name="3">
            <Icon type="ios-cog" />
            关于
        </MenuItem></router-link>
        <!-- <Submenu name="3">
            <template slot="title">
                <Icon type="ios-cog" />
                关于
            </template>
        </Submenu> -->
    </Menu>
    <div>
        <router-view/>
    </div>
    </div>
</template>
<script>
import './main.less'
export default {
    name:'Main',
    data () {
            return {
                theme2: 'light'
            }
        },
    mounted:function(){
        console.log()
    }
}
</script>
<style lang="less">
a{
    color: #515a6e;
}
</style>

