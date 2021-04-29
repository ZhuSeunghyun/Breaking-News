// 定义验证规则模块
const joi = require('@hapi/joi')

// 定义验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义验证注册和登陆表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 定义表单用户更新数据的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 定义用户重置密码规则
exports.update_password_schema = {
    body: {
        // 使用password这个规则验证req.body.oldPwd的值
        oldPwd: password,
        // joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 定义用户更换头像规则
const avatar = joi.string().dataUri().required()
exports.update_avatar_schema = {
    body: {
        avatar
    }
}