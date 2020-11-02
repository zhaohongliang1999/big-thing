$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取文章分类的列表
    initArtCateList()

    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 为添加类别按钮绑定点击事件
    var indexAdd = null

    // 点击添加按钮弹出框
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            // 弹出框大小
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                //重新获取分类数据
                initArtCateList()
                //提示成功消息
                layer.msg('新增分类成功！')
                //根据索引，关闭对应到弹出层
                layer.close(indexAdd)
            }

        })
    })

    // 通过事件代理的方式，为btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 修改分类信息的层
        indexEdit = layer.open({
            type: 1,
            // 弹出框大小
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })
        //获取当前分类数据
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: `/my/article/cates/${id}`,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
})