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
       // 读取 JSON 文件
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      const allData = JSON.parse(fileContent); 
      const { page = 1 } = options.body
      console.log('home传参',options.body)
      const size = allData.data.userhobby.tablePageSize
      const list = allData.data.homedata.slice((page - 1) * size, page * size)
      return {
        code: 20000,
        message: 'success',
        data: list,
        total: allData.data.homedata.length,
        page: page,
        size: size
      }
    }
  },
  {
    url: '/api/home/detail',
    method: 'post',
     response: (options) => {
      const body = options.body
      const { configKey,  configDesc } = body;
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      const fileData = JSON.parse(fileContent); 
      fs.writeFileSync(dataFilePath, JSON.stringify(fileData,null,2),'utf-8')
      return {
        code: 20000,
        message: 'success',
        data: {
          baseInfo: fileData.data.baseInfo,
          homedata: fileData.data.homedata
        }
      }
    }
  },
   {
    url: '/api/userUiPreference/saveOrUpdate',
    method: 'post',
     response: (options) => {
      const body = options.body
      const { configKey, configValue, configDesc } = body;
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
     {
    url: '/api/user',
    method: 'post',
    response: (options) => {
       // 读取 JSON 文件
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      const allData = JSON.parse(fileContent); 
      return {
        code: 20000,
        message: 'success',
        data: allData.data.userhobby,
      }
    }
  },

 
]
