$(function () {
    window.localStorage.removeItem('token')
    // 去往注册页
    $('.regLink').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 去往登录页
    $('.loginLink').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 自定义正则
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        psw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        rePsw: function (value) {
            let psw = $('.reg-box [name=password]').val();
            if (value !== psw) {
                return '两次密码输入不一致';
            }
        }
    })


    // 提交注册表单
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('.loginLink').click()
            }
        })
    })

    // 提交登录表单
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})