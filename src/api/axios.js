import Axios from 'axios';
import { Message } from '@arco-design/web-react';

const config = {
  timeout: 150000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axios = Axios.create(config);

axios.defaults.baseURL = '/api/v1';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const authInfo = localStorage.getItem('goalAdminAuthInfo') || '{}';
    const auth = JSON.parse(authInfo);
    if (auth && auth.token) {
      config.headers['Authorization'] = `Bearer ${auth.token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (resp) => {
    if (resp.status === 200) {
      if (resp.data.code === 401) {
        Message.error('登录状态过期，请重新登录');
        // clearAll()
      }
      return Promise.resolve(resp);
    }
  },
  (error) => {
    console.log(error);
    if (error.response) {
      switch (error.response.status) {
        // 未登录则跳转登录页面
        case 401:
          Message.error('登录状态过期，请重新登录');
          // clearAll()
          break;
        case 403:
          Message.error('没有权限');
          break;
        case 500:
          Message.log('服务器错误');
          break;
        case 502:
          Message.log('服务器错误');
          break;
        case 505:
          Message.log('登陆密码错误');
          break;
        default:
          console.log(error.response.data);
          Message.log('请求错误');
          break;
      }
    }
  }
);

const postAjax = (url, params) => {
  if (params.postType === 'params') {
    delete params.postType;
    return axios({
      method: 'post',
      url,
      params,
    });
  } else if (params.postType === 'pd') {
    const { param, data } = params;
    let query = '';
    for (const key in param) {
      const element = param[key];
      query += `${key}=${element}&`;
    }
    url = `${url}?${query}`;
    url = url.slice(0, String(url).length - 1);
    const dataStr = JSON.stringify(data);
    return axios({
      method: 'post',
      url,
      data: dataStr,
    });
  } else {
    delete params.postType;
    return axios({
      method: 'post',
      url,
      data: params,
    });
  }
};

// post请求
axios.post = (url, params) => {
  return postAjax(url, params);
};

// get请求
axios.get = (url, params) => {
  return axios({
    method: 'get',
    url,
    params,
  });
};

// post form data 请求
axios.postFormData = (url, data) => {
  return axios({
    method: 'post',
    url,
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export default axios;
