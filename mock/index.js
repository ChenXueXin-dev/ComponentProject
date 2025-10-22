import Mock from 'mockjs'
import userInfo from './json/userInfo.json' 
import homeData from './json/home.json'

export default [
  {
    url: '/user/userInfo', 
    method: 'get', 
    response: () => {
      return userInfo
    }
  },

  {
    url: '/api/home',
    method: 'post',
    response: (options) => {
      console.log('POST 请求参数：', options.body) 
      const { page = 1, size = 20 } = options.query
      const list = homeData.data.list.slice((page - 1) * size, page * size)
      return {
        code: 20000,
        message: 'success',
        data: list,
        total: homeData.data.list.length,
        poage: page,
        size: size
      }
    }
  },

  {
    url: '/api/list',
    method: 'get',
    response: (options) => {
      const { page = 1, size = 10 } = options.query
      
      return {
        code: 20000,
        message: 'success',
        data: {
          total: 100, // 总条数
          list: Mock.mock({
            [`items|${size}`]: [ // 生成 size 条数据
              {
                'id|+1': (page - 1) * size + 1, // id 自增
                'name': '@cname', // 随机中文名字
                'age|18-60': 1 // 随机年龄
              }
            ]
          }).items
        }
      }
    }
  },

  // 示例 4：POST 请求 - 新增数据（模拟新增逻辑）
  {
    url: '/api/add',
    method: 'post',
    response: (options) => {
      const newItem = JSON.parse(options.body) // 解析请求体（新增的数据）
      // 模拟新增成功（实际项目中可结合 localStorage 实现临时持久化）
      return {
        code: 20000,
        message: '新增成功',
        data: { ...newItem, id: Mock.Random.guid() } // 返回带 id 的新数据
      }
    }
  }
]
