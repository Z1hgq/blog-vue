<template>
    <div>
        
    </div>
</template>
<script>
import { githubLogin } from '@/api/blog';
import {localRead,localSave} from '@/libs/util';
export default {
    name:'bloglogin',
    data(){
        return{
            code:'',
        }
    },
    mounted(){
        this.code = this.$route.query.code
        console.log(this.code)
        var obj = {
            code:this.code
        }
        githubLogin(obj).then((res) => {
            localSave('blogUserInfo',JSON.stringify(res.data.data))
            window.location.href = localRead('login_url')
        })
    }
}
</script>
