// const res = await request.post<ApiResult<T>>(url, params, config)

// 请求的格式
// import requrest from '@/utils/request'
import type { AxiosRequestConfig } from 'axios'
import type { ApiResult } from '@/api'
import { isFile } from '@/untils/blob'
import request from '@/untils/request'

// post
// 返回所有请求内容
export async function requestApi<T, P = undefined>(
    url: string,
    params: P,
    config?: AxiosRequestConfig
): Promise<ApiResult<T> | undefined>{
    const res = await request.post<ApiResult<T>>(url, params, config)
    // 判断是否为文件流
    if (isFile(res)) {
        // 设置导出名字
        sessionStorage.setItem('fileName', res.headers['content-disposition'])
        return res.data
    }
    if (res.data.code === 20000 && !isFile(res)) {
        return res.data
    }
    return Promise.reject(res.data.message) // 返回错误信息
}

// 只是返回数据
export async function requestApiData<T, P = undefined>(
    url: string,
    params: P,
    config?: AxiosRequestConfig
): Promise<ApiResult<T> | undefined>{
    const res = await request.post<ApiResult<T>>(url, params, config)
    if (isFile(res)) {
        return res.data.data as ApiResult<T>
    }

    if (res.data.code === 20000) {
        return res.data.data as ApiResult<T>
    }
    return Promise.reject(res.data.message) // 返回错误信息
}

// 返回所有get请求内容
export async function requestApiGet<T, P = undefined>(
    url: string,
    params?: P,
    config?: AxiosRequestConfig
): Promise<ApiResult<T> | undefined>{
    const res = await request.get<ApiResult<T>>(url, { params, ...config })
    if (isFile(res)) {
        return res.data
    }
    if (res.data.code === 20000) {
        return res.data
    }
    return Promise.reject(res.data.message) // 返回错误信息
}

