//后台管理系统公共部分

//1、当ajax发起请求，显示进度条
//2、当ajax响应完成之后，进度条走完再隐藏

//禁用进度环
NProgress.configure({
    showSpinner: false,
});
$(window).ajaxStart(function () {
    //显示进度条
    NProgress.start();
});

$(window).ajaxComplete(function () {
    NProgress.done();
});

//退出功能
var modalHtml = ['<div class="modal fade">',
    '    <div class="modal-dialog modal-sm">',
    '        <div class="modal-content">',
    '            <div class="modal-header">',
    '                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>',
    '                <h4 class="modal-title">温馨提示</h4>',
    '            </div>',
    '            <div class="modal-body">',
    '                <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span>您确定要退出后台管理系统吗？&hellip;</p>',
    '            </div>',
    '            <div class="modal-footer">',
    '                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
    '                <button type="button" class="btn btn-primary">确定</button>',
    '            </div>',
    '        </div><!-- /.modal-content -->',
    '    </div><!-- /.modal-dialog -->',
    '</div>'].join("");

$('body').append(modalHtml);
$('[data-logout]').on('click',function () {
    $('.modal').modal('show').find('.btn-primary').on('click',function () {
        //发送请求
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            data:'',
            dataType:'json',
            success:function (data) {
                if(data.success == true){
                    //关闭模态框
                    $('.modal').modal('hide');
                    //跳转到登录页
                    location.href = 'login.html';
                }
            }
        })
    });
})