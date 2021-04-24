/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

// 创建 axios 实例
// 通过实例去发请求 把需要的配置配置给这个对象
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基本路径
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request