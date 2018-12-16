// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
    /* eslint-disable no-new */
import 'swiper/dist/css/swiper.css'
//（如果使用的是2.6.0以上的版本需要自己手动去加载css）
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})