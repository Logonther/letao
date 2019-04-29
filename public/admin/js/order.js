$(function () {
    var currPage = 1;
    var modifyID = 666;
    /*var setPaginator = function(pageCurr,pageSum,callback){
        /!*获取需要初始的元素 使用bootstrapPaginator方法*!/
        $('.pagination').bootstrapPaginator({
            /!*当前使用的是3版本的bootstrap*!/
            bootstrapMajorVersion:3,
            /!*配置的字体大小是小号*!/
            size:'small',
            /!*当前页*!/
            currentPage:pageCurr,
            /!*一共多少页*!/
            totalPages:pageSum,
            /!*点击页面事件*!/
            onPageClicked:function(event, originalEvent, type, page){
                /!*改变当前页再渲染 page当前点击的按钮的页面*!/
                currPage = page;
                callback && callback();
            }
        });
    }*/
    /*var render = function(){
        getCategoryFirstData({
            page: currPage,
            pageSize: 10
        }, function (data) {
            /!*渲染页面*!/
            $('select').html(template('template',data));
            setPaginator(data.page,Math.ceil(data.total/data.size),render);
        });
    }*/
    // render();

    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: '收货人不能为空'
                    }
                }
            },
            phonenumber: {
                validators: {
                    notEmpty: {
                        message: '手机号不能为空'
                    },
                    digits: {
                        message: '手机号只能包含数字'
                    }
                }
            },
            postcode: {
                validators: {
                    notEmpty: {
                        message: '邮编不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 6,
                        message: '邮编为6位'
                    },
                    digits: {
                        message: '手机号只能包含数字'
                    }
                }
            },
            division1: {
                validators: {
                    notEmpty: {
                        message: '省不能为空'
                    }
                }
            },
            division2: {
                validators: {
                    notEmpty: {
                        message: '市不能为空'
                    }
                }
            },
            division3: {
                validators: {
                    notEmpty: {
                        message: '区不能为空'
                    }
                }
            },
            associate: {
                validators: {
                    notEmpty: {
                        message: '详细地址不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        console.log($(e.target));
        console.log($(e.target).serialize());

        $('.id').each(function () {
            if ($(this).text() == modifyID) {
                $('#addModal').modal('hide');
                $(this).siblings('.address').find('.name').text($('[name=name]').val());
                $(this).siblings('.address').find('.phonenumber').text($('[name=phonenumber]').val());
                $(this).siblings('.address').find('.postcode').text($('[name=postcode]').val());
                $(this).siblings('.address').find('.division1').text($('[name=division1]').val());
                $(this).siblings('.address').find('.division2').text($('[name=division2]').val());
                $(this).siblings('.address').find('.division3').text($('[name=division3]').val());
                $(this).siblings('.address').find('.associate').text($('[name=associate]').val());

                /*重置表单*/
                $(e.target).data('bootstrapValidator').resetForm();
                $(e.target).find('input').val('');
            }
        })
    });
    $('tbody').on('click', '.closeorder', function () {
        /* todo */
        $(this).parent().siblings('.status').text('已关闭');
    }).on('click', '.modify', function () {
        $('#addModal').modal('show');
        modifyID = $(this).parent().siblings('.id').text();
        $('[name=name]').val($(this).parent().siblings('.address').find('.name').text());
        $('[name=phonenumber]').val($(this).parent().siblings('.address').find('.phonenumber').text());
        $('[name=postcode]').val($(this).parent().siblings('.address').find('.postcode').text());
        $('[name=division1]').val($(this).parent().siblings('.address').find('.division1').text());
        $('[name=division2]').val($(this).parent().siblings('.address').find('.division2').text());
        $('[name=division3]').val($(this).parent().siblings('.address').find('.division3').text());
        $('[name=associate]').val($(this).parent().siblings('.address').find('.associate').text());
    });
})
var getUserData = function (params, callback) {
    /*$.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });*/
}