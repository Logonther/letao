//后台管理系统的公共js文件

/*
* 1.进度显示->需要用jquery相关的ajax方法
* 当ajax发起请求,显示进度条,
* 当ajax请求中还没响应, 显示进度条加载
* 当ajax响应完成,进度条要走完再隐藏
* */
//禁止进度环显示
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function () {
    //开始进度条--->只要使用ajax就会执行这个方法
    NProgress.start();

});
$(window).ajaxComplete(function () {
    //开始进度条--->只要使用ajax就会执行这个方法
    NProgress.done();

});

//2.侧边栏的显示隐藏, 二级菜单的显示和隐藏
$('[data-menu]').on('click',function () {
    $('.ad_aside').toggle();
    $('.ad_section').toggleClass('menu');
});
$('.menu [href="javascript:;"]').on('click',function () {
    $(this).siblings('.child').slideToggle();
})

//3.退出功能
//封装公用模态框--->需要把html格式转化为字符串拼接--->百度: 在线html转字符串
var modalHtml = ['<div class="modal fade" id="logoutModal">',
                '    <div class="modal-dialog modal-sm">',
                '        <div class="modal-content">',
                '            <div class="modal-header">',
                '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '                <h4 class="modal-title">温馨提示</h4>',
                '            </div>',
                '            <div class="modal-body">',
                '                <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span>您确定要退出后台管理系统吗？</p>',
                '            </div>',
                '            <div class="modal-footer">',
                '                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
                '                <button type="button" class="btn btn-primary">确定</button>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'].join("");

//添加到页面里
$('body').append(modalHtml);


$('[data-logout]').on('click',function () {
    //找到模态框,显示
    $('#logoutModal').modal('show').find('.btn-primary').on('click',function(){
        //0.发情请求
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            data:'',
            dataType:'json',
            success:function(data){
                if(data.success == true){
                    //1.关闭模态框
                    $('#logoutModal').modal('hide');
                    //2.跳转登录
                    location.href = '/admin/login.html';

                }
            }
        })

    });

});