import Mock from 'mockjs'
import userInfo from './json/userInfo.json' assert { type: 'json' }
import allData from './json/Data.json' assert { type: 'json' }

import { createRequire } from 'module'; 
const require = createRequire(import.meta.url); 

const fs = require('fs');
const path = require('path');
const dataFilePath = path.resolve(__dirname, './json/Data.json'); 

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
      const { page = 1 } = options.query
      const size = allData.data.userhobby.tablePageSize
      console.log('size',size)
      const list = allData.data.homedata.slice((page - 1) * size, page * size)
      // console.log('list',list)
      return {
        code: 20000,
        message: 'success',
        data: list,
        total: allData.data.homedata.length,
        poage: page,
        size: size
      }
    }
  },
   {
    url: '/api/userUiPreference/saveOrUpdate',
    method: 'post',
     response: (options) => {
      console.log('调用接口')
      const body = options.body
      console.log('body', body)
      const { configKey, configValue, configDesc } = body;
      console.log(configKey, configValue, configDesc)
      const data = allData.data.userhobby
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      const fileData = JSON.parse(fileContent); 
      fileData.data.userhobby[configKey] = configValue;
      fs.writeFileSync(dataFilePath, JSON.stringify(fileData,null,2),'utf-8')
      return {
        code: 20000,
        message: 'success',
        data: fileData.data.userhobby
      }
    }
  },

 
]
