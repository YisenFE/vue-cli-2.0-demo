// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/common/http.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
// import 'cropper/dist/cropper.css'
// 引入 echarts 主模块
import * as echarts from 'echarts'
Vue.use(VueAwesomeSwiper)
Vue.use(router)
Vue.use(ElementUI, {size: 'small'})
Vue.config.productionTip = false

Vue.prototype.ajax = http.request
Vue.prototype.echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
