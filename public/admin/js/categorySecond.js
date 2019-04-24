$(function () {
    var currPage = 1;
    var setPaginator = function(pageCurr,pageSum,callback){
        /*获取需要初始的元素 使用bootstrapPaginator方法*/
        $('.pagination').bootstrapPaginator({
            /*当前使用的是3版本的bootstrap*/
            bootstrapMajorVersion:3,
            /*配置的字体大小是小号*/
            size:'small',
            /*当前页*/
            currentPage:pageCurr,
            /*一共多少页*/
            totalPages:pageSum,
            /*点击页面事件*/
            onPageClicked:function(event, originalEvent, type, page){
                /*改变当前页再渲染 page当前点击的按钮的页面*/
                currPage = page;
                callback && callback();
            }
        });
    }
    var render = function(){
        getCategoryFirstData({
            page: currPage,
            pageSize: 10
        }, function (data) {
            /*渲染页面*/
            $('select').html(template('template',data));
            setPaginator(data.page,Math.ceil(data.total/data.size),render);
        });
    }
    render();

    $('#add').on('click',function () {
        $('#addModal').modal('show');
    });

    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            /*categoryName:{
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            },*/
            brandName:{
                validators: {
                    notEmpty: {
                        message: '品牌名称不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        console.log($(e.target).serialize());
        /*$.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$(e.target).serialize(),
            dataType:'json',
            success:function (data) {
                if(data.success){
                    $('#addModal').modal('hide');
                    currPage = 1;
                    render();
                    /!*重置表单*!/
                    $(e.target).data('bootstrapValidator').resetForm();
                    $(e.target).find('input').val('');
                }
            }
        });*/
    });
})
var getCategoryFirstData = function (params, callback) {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
}