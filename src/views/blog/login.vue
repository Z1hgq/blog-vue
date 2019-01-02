<template>
    <div>
        
    </div>
</template>
<script>
import { githubLogin } from '@/api/blog'
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
            console.log(res.data.data)
        })
    }
}
</script>
