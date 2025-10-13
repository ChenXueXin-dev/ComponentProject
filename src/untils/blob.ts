// 判断文件是不是文件流
const isFile = (response: any) => {
    // 增加安全校验：如果 response 或 headers 不存在，直接返回 false
    if (!response || !response.headers) {
        return false;
    }
    let flag = false
    // 获取响应头中的 content-type (关键判断)
    const contentType = response.headers['content-type']

    // 判断是否为文件流（例如 application/octet-stream）
    // 新增文件类型 application/pdf
    // 部分接口存在后缀如 application/pdf;charset=utf-8
    const fileTypeList = [
        'application/pdf',  // PDF 文档的 MIME 类型
        'application/vnd.ms-excel',  // Excel 2003 及以下版本（.xls）的 MIME 类型
        'application/vnd.openxmlformats-officedocument.spreadsheetml',  // Excel 2007+ 版本（.xlsx）的 MIME 类型（注：完整类型应为 application/vnd.openxmlformats-officedocument.spreadsheetml.sheet，可能是项目中后端简写了）
        'application/zip'   // ZIP 压缩包的 MIME 类型
    ]
    if (contentType) {
        flag = fileTypeList.some((v) => contentType.includes(v))
      }
      return flag
}

export { isFile }