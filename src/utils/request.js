// import Vue from 'vue'
import axios from 'axios'
// 引入三方JSON转换
import JSONBIG from 'json-bigint'

// 导入路由文件，他里面导出了一个 router
import router from '../router/index'

const res = axios.create({
  // 基地址
  baseURL: 'http://api-toutiao-web.itheima.net',
  // 超过5秒代表请求失败
  timeout: 5000,

  // 使用第三方插件覆盖默认的axios json转换
  transformResponse: [data => { // data是原有的数据
    // 删除没反应，是因为删除了id为 null，所以需要抛出异常，为null了，就返回原始数据
    try {
      const jsonObject = JSONBIG.parse(data)
      return jsonObject
    } catch (e) {
      // 有异常 返回原始数据
      return data
    }
  }]
})

// 请求拦截器
res.interceptors.request.use(config => {
  // console.log(config);
  const mytoken = window.localStorage.getItem('mytoken')
  // token 存在的话，给请求头加上当前token
  if (mytoken) {
    config.headers = {
      Authorization: `Bearer ${mytoken}`
    }
  }
  // 必须return 出去才能发送到后端
  return config
})

// 响应拦截器
res.interceptors.response.use(res => res, err => {
  console.dir(err)
  // 如果等于 401 表示token失效，我们需要把token删除，然后跳转到登录页面
  if (err.response && err.response.status === 401) {
    window.localStorage.removeItem('mytoken')
    // 因为这是一个js文件，this不是指向vue实例 所以不能通过 this.$router.push('/login')跳转
    // 我可以单独导入  路由文件里的index.js  然后通过 router.push('/login') 跳转
    router.push('/login')
  }

  return Promise.reject(err)
})

export default res
