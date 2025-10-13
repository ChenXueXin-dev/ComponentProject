// 基于底层 Axios 实例（request）封装的「业务级请求工具函数」，
// 统一处理get 和post请求
// 拦截路由等
import axios from "axios";
import router from "@/router";
import  { API_BASE_URL } from '@/config/setting'

// 创建axios实例
const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,//请求超时时间
    headers:{
        "Content-Type": "application/json",
    }
})

// 请求拦截器（发送前处理）
service.interceptors.request.use(
    (config) => config,
    // {
    //     // 核心：需要东风路的请求自动加Token（登录状态凭证）
    //     // Token存在localstorage中（登录成功后需要手动存入localstorage.setItem("token",token)
    //     // 这里token可以自己定义名字
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         // 按照后端要求格式加Token到请求头（常见格式 Bearer token）
    //         config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    // },
    (error) => {
        console.log('请求配置错误',error);
        return Promise.reject(error);
    }
)


// 响应拦截器（请求返回后处理）
service.interceptors.response.use(
    (config) => config,
    // {
    //     // 成功的话，直接返回响应体中的data（简化业务层逻辑，不用每次写response.data）
    //     return response.data;
    // },
    (error) => {
        // 失败：统一处理错误（网络错误，登录过期，业务错误）
        const errorMsg = error.message || '请求失败，请稍后再试';
        // 请求超时
        if (error.code === 'ECONNABORTED') {
            alert('请求超时，请检查网络或稍后再试'); // 基础提示（也可用 UI 组件的 message）
          }
        // 登录过期（一般为401）
        else if (error.response?.status === 401) {
            alert('登录状态已过期，请重新登录');
            localStorage.removeItem('token'); // 清除无效 Token
            router.push('/login'); // 跳转到登录页
          }
        // 其他错（如后端返回400参数错误、500服务器错误 等）
        else {
            // 优先显示后端返回的错误信息，没有则用默认提示
            const errMsg = error.response?.data?.message || errorMsg;
            alert(errMsg);
        }
        // 标记为错误，让业务层能通过 try/catch 捕获（可选）
        return Promise.reject(error);
    }
)

// 导出实例
export default service;