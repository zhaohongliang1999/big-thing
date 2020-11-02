$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //  为文件选择框绑定change 事件
    $('#file').on('change', function (e) {
        var filelist = e.target.files;
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        var newImgURL = URL.createObjectURL(filelist[0]);
        $image.cropper('destroy').attr('str', newImgURL).cropper(options)
    })
    //  将剪切后的图片上传到服务器
    $('#btnUpload').on('click', function () {
        // 1.拿到用户裁剪之后到头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2.调用接口,把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatat: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})