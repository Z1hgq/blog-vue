<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login-form'
import { mapActions } from 'vuex'
import { setToken } from '@/libs/util'
import {
    login
} from '@/api/user'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
    ]),
    handleSubmit ({ userName, password }) {
      login({ userName, password }).then(res => {
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   })
        // })
        console.log(res)
        if(res.data.success === true){
            setToken(res.data.token)
            this.$router.push({
            name: this.$config.homeName
          })
        }else{
          console.log('error')
        }
      })
      console.log({ userName, password })
    }
  }
}
</script>

<style>

</style>
