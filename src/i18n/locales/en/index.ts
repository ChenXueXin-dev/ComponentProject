// 暴露出当前文件所有的中文配置
// 解析:
// import.meta.glob('./*.json', { eager: true }) // 导入当前文件夹下的所有json文件
// Object.entries(...) // 转换成二维数组
// Object.fromEntries(...) // 把处理后的二维数组转换回对象
// .map(...) // 遍历二维数组，处理每一项
//  return [moduleName, (value as any).default] // 把每一项的key值处理成文件名，value值处理成json内容


const enLocale = Object.fromEntries(
    Object.entries(import.meta.glob('./*.json', { eager: true })
    ).map(([key, value]) => {
    const moduleName = key.replace(/^\.\/(.*)\.json$/, '$1')
    return [moduleName, (value as any).default]
    })
)

export default enLocale