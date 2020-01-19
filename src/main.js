import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import 'jquery' // ztree插件用

import '@/styles/index.scss' // global css

// import '@/styles/icons/iconfont.css' // global css

// ztree
import 'ztree'
import './styles/zTreeTheme/zTreeStyle.scss' // ztree换肤文件

import App from './App'
import router from './router'
import store from './store'
// import './mock';

import '@/assets/iconfont/iconfont.css' // global css
import '@/assets/iconfont/iconfont.js' // global js

import '@/icons' // icon
import '@/permission' // permission control
import '@/styles/element_c.scss'
import '@/styles/element-ui.scss'

import vueiInfinite from 'vue-infinite-scroll'
Vue.use(vueiInfinite)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
