$(function () {
    window.page = 1;

    /*模板无法访问外部变量的解决方案*/
    /*var getJquery = function () {
        return jQuery;
    }*/
    /*辅助方法：在模板内部可以使用的函数*/
    template.helper('getJquery',function () {
        return jQuery;
    });

    /*1.默认第一页展示*/
    var render = function () {
        getCateSecondData(function (data) {
            /*模板渲染*/
            $('tbody').html(template('list',data));
            /*初始化分页组件  根据数据*/
            /*2.分页展示*/
            $('.pagination').bootstrapPaginator({
                /*对应的bootstrap版本*/
                bootstrapMajorVersion:3,
                /*分页按钮的大小*/
                size:'small',
                /*当前页码*/
                currentPage:data.page,
                /*一共多少页*/
                totalPages:Math.ceil(data.total/data.size),
                /*页码按钮的数量 默认是5*/
                numberOfPages:3,
                /*点击页码渲染*/
                /*监听按钮的点击事件 获取点击的时候的页码*/
                onPageClicked:function (event, originalEvent, type,page) {
                    /*1. event jquery的事件對象*/
                    /*2. originalEvent 原生dom的事件對象*/
                    /*3. type 按鈕的類型 */
                    /*4. 按鈕對應的頁碼*/
                    //console.log(page);
                    window.page = page;
                    render();
                }
            });
        });
    }
    render();
    /*3.点击添加分类弹窗*/
    getCateFirstData(function (data) {
        $('.dropdown-menu').html(template('dropDown',data)).find('li').on('click',function () {
            /*显示选中的分类名称*/
            var $currA = $(this).find('a');
            $('.cateName').html($currA.html());
            /*给隐藏的ID表单赋值*/
            $('[name=categoryId]').val($currA.attr('data-id'));
            /*改校验状态*/
            // $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
        })
    });
    /*http://www.jq22.com/jquery-info230 fileupload*/
    initFileUpload();

    /*4.点击确认按钮  提交 （一级分类id，二级分类名称，二级分类的logo） */

});
//请求二级分类的数据-->渲染第一页
var getCateSecondData = function (callback) {
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page: window.page || 1,
            pageSize:2
        },
        dataType:'json',
        success:function (data) {
            callback && callback(data);
        }
    });
};
//请求一级分类的数据
var getCateFirstData = function (callback) {
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page: 1,
            pageSize:1000
        },
        dataType:'json',
        success:function (data) {
            callback && callback(data);
        }
    });
};
//封装上传文件的插件
var initFileUpload = function () {
    /*初始化上次插件*/
    $('[name="pic1"]').fileupload({
        /*上传地址*/
        url:'/category/addSecondCategoryPic',
        /*返回格式*/
        dataType: 'json',
        /*上传成功*/
        done: function (e, data) {
           console.log(data)
        }
    });
}