import axios from 'axios'
// import qs from 'qs'
import router from '@/router/index'
import { errPath } from '@/router/path';
import baseURL from './url';


const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
});

// 对于post请求  （安装qs依赖 第三方库）
// instance.defaults.transformRequest = data => qs.stringify(data)  //这个方法是把对象变成xxx=xxx

// http request 拦截器
instance.interceptors.request.use(
  config => {
    //设置加载动画
    const token = sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = 'Bearer ' + token //请求头加上token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
);



// 设置响应拦截器  axios统一处理异常
// 自定义响应成功的http状态码
instance.interceptors.response.use(response => {
  // 成功直接返回 一般2/3开头的状态码
  return [response.data,null]
}, error => {
  let { response } = error
  if (response) {
    // 服务器返回结果了
    switch (response.status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:   //权限
        error.message = '未授权的访问'
        break
      case 403:  //服务器拒绝执行（token过期）
        error.message = '禁止访问'
        break
      case 404:
        error.message = '找不到页面，当前请求接口不存在'
        break
    }
    return [null,error]
  } else {

    // 服务器没有返回结果
    if (window.navigator.onLine&&router.currentRoute.fullPath!==errPath) {
      //断网处理，可以跳转到断网页面
      router.push({
        name:errPath,
        params:{
          msg:"没有连接到网络"
        }
      })
      return
    }
    return Promise.reject(error)
  }
})

const callApi = (url, method = 'get', data = {}, ctx = {}) => {
  return instance(
      {
        url,
        method,
        params: method === 'get' ? data : {},
        data: method === 'post' ? data : {},
        ...ctx
      },
  );
};

export default callApi;


