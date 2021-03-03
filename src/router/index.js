/**
 * @file router
 * @author shiyisen
 * @time 19.03.11
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      // meta: {requireAuth: true},
      component: () => import('@/views/menu/index.vue'),
      children: [
        {
          path: '/region',
          name: 'region',
          component: () => import('@/views/region')
        },
        {
          path: '/echarts1',
          name: 'echarts1',
          component: () => import('@/views/echartsDemo')
        },
        {
          path: '/demo',
          name: 'demo',
          component: () => import('@/views/demo')
        },
        {
          path: '/form',
          name: 'form',
          component: () => import('@/views/form')
        },
        {
          path: '/input',
          name: 'input',
          component: () => import('@/views/vModel')
        },
        {
          path: '/slot',
          name: 'slot',
          component: () => import('@/views/slot')
        },
        {
          path: '/is',
          name: 'is',
        //   component: () => import('@/views/is')
          component: resolve => {
            return resolve(require('@/views/is'))
          }
        },
        {
          path: '/cropper',
          name: 'cropper',
          component: () => import('@/views/cropper')
        },
        {
          path: '/asyncComponent',
          name: 'asyncComponent',
          component: () => import('@/views/asyncComponent')
        }
      ]
    }
  ]
})
