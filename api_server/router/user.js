// 导入路由模块
const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')

//验证表单的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要验证规则对象
const { reg_login_schema } = require('../schema/user')

// 用户登录模块
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)

// 用户注册模块
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
module.exports = router