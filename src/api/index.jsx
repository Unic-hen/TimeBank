import axios from "axios";
import { _getToken_ } from "@/store/modules/user";

const http = axios.create({
  baseURL: "http://47.109.106.81:3000/api",
  // baseURL: "http://127.0.0.1:3000/api",
  timeout: 5000,
});

// 拦截器
http.interceptors.request.use(
  (config) => {
    // 发送请求之前做些什么
    // 检查请求的URL是否是/login，如果不是，则添加token
    if (!_getToken_() || config.url.includes("/login")) {
      // 这里直接返回config，不添加token
      return config;
    }

    config.headers["token"] = _getToken_();
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
