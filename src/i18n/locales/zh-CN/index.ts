// 暴露出当前文件所有的中文配置
const zhLocale = Object.fromEntries(
    Object.entries(import.meta.glob('./*.json', { eager: true })
    ).map(([key, value]) => {
    const moduleName = key.replace(/^\.\/(.*)\.json$/, '$1')
    return [moduleName, (value as any).default]
    })
)

export default zhLocale