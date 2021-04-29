// 导入数据库操作模块
const db = require('../db/index')
// 导入解析密码的模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的函数
exports.getUserInfo = (req, res) => {
    // 根据用户的id查询用户的基本信息
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
    // 调用db实行sql语句
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败')
        res.send({
            status: 0,
            message: '获取用户基本信息成功!',
            data: results[0]
        })
    })
}

// 更新用户基本信息的函数
exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id = ?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改用户信息失败')
        return res.cc('修改用户信息成功', 0)
    })
}

// 重置密码的处理函数
exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id= ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户名不存在')

        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('原密码错误')

        // 定义更新密码的SQL语句
        const sql = 'update ev_users set password = ? where id = ?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // SQL语句执行失败
            if (err) return res.cc(err)
            // SQL语句执行成功，但影响行数不等于1
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
            // 更新密码成功
            res.cc('更新密码成功', 0)
        })
    })
}

// 用户更换头像的处理函数
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic = ? where id = ?'
    db.query(sql, [req.body.avatar, req.user.id,], (err, results) => {
        if (err) return res.cc(err)
        // 执行SQL语句成功，但影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('更新头像失败')

        // 更新用户头像成功
        return res.cc('更新头像成功', 0)
    })
}
