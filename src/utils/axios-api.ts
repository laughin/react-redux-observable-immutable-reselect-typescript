import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { includes } from 'lodash';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import openNotificationWithIcon from '../modules/App/Notification';

// axios.defaults.withCredentials = true;

const config: AxiosRequestConfig = {
  baseURL: `https://api.github.com`,
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start();
    const hoolaiSession = sessionStorage.getItem('hoolai');
    if (hoolaiSession) {
      config.headers.Authorization = `bearer ${JSON.parse(hoolaiSession).token}`;
      config.headers.adminUserId = JSON.parse(hoolaiSession).userId;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done();
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    if (error.response) {
      let result = {
        code: 0,
        status: error.response.status,
        description: error.response.data.tips
      };
      if (includes(error.response.data.tips, 'token失效') || includes(error.response.data.tips, '请重新登录')) {
        result.code = 1;
      }
      openNotificationWithIcon('error', result.status, result.description, 3);
      return Promise.resolve(result);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
