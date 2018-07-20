import vue from 'vue';
import router from './router';
import axios from 'axios';
import qs from 'qs';
export const host = process.env.API_ROOT.host;
export const bushost = process.env.API_ROOT.bushost;
export const linkhost = process.env.API_ROOT.linkhost;

var instance = axios.create({
  // baseURL: host,
  timeout: 50000,
});


//请求拦截
instance.interceptors.request.use(
  config => {
    // if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
//响应拦截
instance.interceptors.response.use(
  res => {
    if (res.data.code == 500) {   //token过期
      router.replace({ path: '/login' })
    }
    return res.data
  },
  error => {
    // return Promise.reject(error)
  }
);
//axios中的get请求
export function fetchGetData(url, params) {
  //setToken();
  return new Promise((resolve, reject) => {
    instance.get(url, params)
      .then(function (res) {
        return resolve(res)
      })
  });
};
//axios中的post请求
export function fetchPostData(url, params, config = {}) {
  setToken();
  return new Promise((resolve, reject) => {
    instance.post(url, params, config)
      .then(function (res) {
        return resolve(res)
      })
  });
}


function setToken() {
  var tokenVal = localStorage.getItem("token");
  if (tokenVal) {
    instance.defaults.headers.common['token'] = tokenVal;
  }
}
 
 