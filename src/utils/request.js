import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 150000000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // console.log(config)
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code !== 20000) {
      if (!response.data.success) {
        // 可以在这里统一处理响应错误
        if (response.data.errorCode == '10001') {
          this.$router.push({ path: '/login' })
        } else if (response.data.errorCode == '10002') {
          this.$router.push({ path: '/403' })
        }
        return Promise.reject(response.data)
      }
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: '操作失败：' + error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
