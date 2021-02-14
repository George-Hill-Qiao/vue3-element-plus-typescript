import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
// 创建axios实例
const service = axios.create({
  // 在请求地址前面加上baseURL
  baseURL: '/',
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    // 请求错误的统一处理
    console.log(error)
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(response.data.msg)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error: AxiosError) => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
