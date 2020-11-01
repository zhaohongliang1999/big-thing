$(function () {
    // 调用 getUserInfo 获取用户的基本信息
    getUserInfo()
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar方法
            renderAvatar(res.data)
        }
    })
}

// 定义一个渲染用户头像的函数
function renderAvatar(user) {
    //  1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html(`欢迎&nbsp${name}`)
    // 3.按需渲染用户头像
    if (user.user_pic) {
        // 渲染图片
        $('.layui-nav-img').attr('src', user.user_pic).show()
        // 让文字头像隐藏
        $('text-avatar').hide()
    } else {
        // 2.渲染文本
        $('.layui-nav-img').hide()
        // toUpperCase()将文本大写
        var first = name[0].toUpperCase();
        $('text-avatar').html(first).show()
    }
}