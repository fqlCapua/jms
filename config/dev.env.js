'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:{
    host:'"http://192.168.20.149:8884"',//接口地址
	//host:'"http://192.168.10.65:8081/mer-api"',//接口地址
    bushost: '"http://47.105.52.171:9090/"',
	//bushost: '"http://192.168.10.65:8081/mer-api"',
    linkhost:'""',//web跳转路径
  }
})
