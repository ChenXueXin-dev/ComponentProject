// 接口统一返回的结果
export interface ApiResult<T> { 
    [x: string]: any
    // 状态码
    code: number
    // 状态信息
    message: string
    // 返回数据
    data?: T
}