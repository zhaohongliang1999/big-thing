// 1.入口函数
$(function () {
    //点击去注册
    $('#link_reg').on('click', function () {
        //隐藏登陆框
        $('.login-box').hide()
        //显示注册框
        $('.reg-box').show()
    })
    //点击去登录
    $('#link_login').on('click', function () {
        //隐藏注册框
        $('.reg-box').hide()
        //显示登陆框
        $('.login-box').show()
    })
    //自定义校验规则
    let form = layui.form;
    // 定义提示用户的信息
    let layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            //通过形参获取确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后判断密码框中的值等不等于确认密码框中的值
            // 如果判断失败，则return一个提示消息即可
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    })
    // 注册功能，监听注册表单的提交事件
    $("#form_reg").on('submit', function (e) {
        //阻止表单的提交行为
        e.preventDefault()
        var data = {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name = password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // 注册失败提示用户
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录！')
            //主动成功后主动触发点击事件跳转到登录页面
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        //阻止默认的表单提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})