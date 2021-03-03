/**
 * @file ajax相关
 * @author shiyisen
 */
import axios from 'axios'
import Qs from 'qs'

// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

axios.interceptors.response.use(response => {
  // 在响应数据前做些什么
  return response
}, error => {
  // 对响应错误做些什么
  if (error.response) {
    return Promise.resolve(error.response)
  }
  return Promise.reject(error.response)
})

// 设置全局ajax属性
instance.defaults.headers.common['isAjax'] = true

export default {
  request(url, opt = {}) {
    return new Promise((resolve, reject) => {
      let params = {
        method: opt.type || 'POST',
        url
      }
      if (opt.isJson) {
        params.headers = {
          'Content-Type': 'application/json'
        }
        params.data = JSON.stringify(opt.params)
      } else {
        params.data = Qs.stringify(opt.params)
      }
      instance(params).then(res => {
        if (res.status === 200) {
          const body = res.data
          if (+body.code === 0) {
            resolve(body)
          }
        }
      }).catch(
        response => {
          reject(response)
        }
      )
    })
  }
}
