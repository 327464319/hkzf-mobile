import axios from 'axios'
import { Toast } from 'antd-mobile'
// 超时时间
axios.defaults.timeout = 600000
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.baseURL = 'http://localhost:8080'
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    if (error.response.status === 401) {
      Toast.fail(
        ' 没有访问权限',1
      )
     
    
    } else if (error.response.status === 500) {
      Toast.fail('网络异常',1
      )
    }
  } else {
    Toast.fail(
      '请求失败',1
   )
  }
  return Promise.reject(error);
});
export default axios