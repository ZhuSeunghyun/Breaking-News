// 创建路由对象
const express = require('express')
const router = express.Router()

// 导入用户函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 获取基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)


// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)


// 重置密码的路由

router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

module.exports = router

// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)