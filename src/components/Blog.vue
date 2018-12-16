<template>
    <div class="blog">
        <div class="classification">
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
        <div class="content">

        </div>
        <div class="info">

        </div>
    </div>
</template>
<script>
export default {
    name:'Blog',
    data(){
        return{
            classes:[
                {
                    imgUrl:'/static/img/classification.png',
                    name:'分类测试'
                },
                {
                    imgUrl:'/static/img/classification.png',
                    name:'分类测试'
                },
                {
                    imgUrl:'/static/img/classification.png',
                    name:'分类测试'
                },
                {
                    imgUrl:'/static/img/classification.png',
                    name:'分类测试'
                },
                {
                    imgUrl:'/static/img/classification.png',
                    name:'分类测试'
                },
                {
                    imgUrl:'/static/img/classification.png',
                    name:'分类测试'
                },
            ]
        }
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
        width:160px;
        height: auto;
        .classification_el{
            width: 160px;
            height: 50px;
            box-shadow: 1px 0 0px #FF6600;
            &:hover{
                border-right: 4px solid #FF6600;
                // border-top: 1px solid #FF6600;
                // border-bottom: 1px solid #FF6600;
                // border-bottom: 1px solid #FF6600;
                p{
                    color:#FF6600;
                }
            }
            .cla_img{
                width: 50px;
                height: 50px;
                float: left;
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
                float: left;
                color: #009966;
                margin-top: -5px;
            }
        }

    }
}
</style>

