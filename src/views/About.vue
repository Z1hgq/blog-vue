<template>
    <div class="about">
        <div class="avatar">
            <img src="/static/img/z1hgq.png" alt="">
        </div>
        <div class="nikename">
            <p>Z1hgq</p>
        </div>
        <div class="sign">
            <p>清风拂山岗</p>
            <p>明月照大江</p>
        </div>
        <div class="info">
            <div class="email"><Icon type="ios-mail-outline"/>&nbsp <a href="mailto:z11hgq@gmail.com">z11hgq@gmail.com</a></div>
            <div class="github"><Icon type="logo-github" />&nbsp<a href="https://github.com/Z1hgq">https://github.com/Z1hgq</a></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'About',
    data(){
        return{
            
        }
    }
}
</script>
<style lang="less">
.about{
    width: 320px;
    height: 380px;
    background-color:rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 50%;
    top:40%;
    transform: translate(-50%,-50%);
    box-shadow:  -5px 0 5px 0 #2d8cf0, /*左边阴影*/
        0 -5px 5px 0 #2d8cf0, /*顶部阴影*/
        0 5px 5px 0 #2d8cf0, /*底部阴影*/
        5px 0 5px 0 #2d8cf0; /*右边阴影*/
    border-radius: 5px;
    .avatar{
        width: 100%;
        text-align: center;
        height: 120px;
        img{
            width: 70px;
            border-radius: 35px;
            margin-top:50px;
        }
    }
    .nikename{
        width:100%;
        height: 50px;
        text-align: center;
        p{
            font-size: 25px;
            margin-top: 20px;
            font-family: "Microsoft YaHei", '\5FAE\8F6F\96C5\9ED1', "MicrosoftJhengHei", '\534E\6587\7EC6\9ED1', 'STHeiti', 'MingLiu';
        }
    }
    .sign{
        width: 100%;
        height: 130px;
        text-align: center;
        p{
            font-size: 25px;
            margin-top: 5px;
            font-family: "Microsoft YaHei", '\5FAE\8F6F\96C5\9ED1', "MicrosoftJhengHei", '\534E\6587\7EC6\9ED1', 'STHeiti', 'MingLiu';
        }
    }
    .info{
        width: 100%;
        height: 80px;
        padding-top: 20px;
        color:rgba(0,0,0, 1) !important;
        font-family: "Microsoft YaHei", '\5FAE\8F6F\96C5\9ED1', "MicrosoftJhengHei", '\534E\6587\7EC6\9ED1', 'STHeiti', 'MingLiu';
        .email{
            width: 43%;
            float: left;
            text-align: center;
            a{
                color:rgba(0,0,0, 0.7) !important;
                &:hover{
                    color:#2d8cf0 !important;
                }
            }
        }
        .github{
            width: 57%;
            float: left;
            text-align: center;
            a{
                color:rgba(0,0,0, 0.7) !important;
                &:hover{
                    color:#2d8cf0 !important;
                }
            }
        }
    }
}
</style>
