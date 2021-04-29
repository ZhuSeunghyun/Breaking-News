// 导入数据库模块
const db = require('../db/index')

// 导入密码加密模块
const bcrypt = require('bcryptjs')

// 导入生成token的模块
const jwt = require('jsonwebtoken')

//导入生成token的密钥
const config = require('../config')

// 定义注册用户的处理函数
exports.regUser = (req, res) => {
    // 校验表单数据
    const userinfo = req.body
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名不能为空')
    // }

    const sql = 'select * from ev_users where username = ?'
    db.query(sql, userinfo.username, (err, results) => {
        // 执行SQL语句失败
        if (err) {
            return res.cc(err)
        }

        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名已被占用')
        }
    })

    // 确认用户名可用时候对密码进行处理
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 把新用户插入到MySQL数据库中
    const sqlSet = 'insert into ev_users set ?'
    db.query(sqlSet, { username: userinfo.username, password: userinfo.password }, (err, results) => {
        if (err) return res.cc(err)
        // SQL语句执行成功，但行数不为1
        if (results.affectedRows !== 1) {
            return res.cc('用户注册失败，请稍后再试')
        }
        res.send({ status: 0, message: '注册成功' })
    })
}

// 定义登录用户的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登陆失败！')
        const conpareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!conpareResult) {
            return res.cc('用户名或密码错误')
        }

        // 剔除用户信息里的密码和头像
        const user = { ...results[0], password: '', user_pic: '' }
        // 生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h'
        })

        // 响应信息给客户端
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr
        })
    })
}
