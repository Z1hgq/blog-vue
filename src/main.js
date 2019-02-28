// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from '@/locale'
import config from '@/config'
// import './index.less'
import 'iview/dist/styles/iview.css'
import iView from 'iview'
import '@/assets/icons/iconfont.css'
import importDirective from '@/directive'
import installPlugin from '@/plugin'

import TreeTable from 'tree-table-vue'
Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
    /**
     * @description 注册admin内置插件
     */
installPlugin(Vue)
    /**
     * @description 生产环境关掉提示
     */
Vue.config.productionTip = false
    /**
     * @description 全局注册应用配置
     */
Vue.prototype.$config = config
    /**
     * 注册指令
     */
importDirective(Vue)
    /* eslint-disable no-new */
import 'swiper/dist/css/swiper.css'
import 'three-dots/dist/three-dots.css'
import 'highlight.js/styles/monokai-sublime.css'
//（如果使用的是2.6.0以上的版本需要自己手动去加载css）
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)



new Vue({
    el: '#app',
    router,
    i18n,
    store,
    components: { App },
    template: '<App/>'
})