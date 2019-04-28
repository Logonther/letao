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
            userCode:{
                validators: {
                    notEmpty: {
                        message: '工号不能为空'
                    },
                    digits: {
                        message: '工号只能包含数字'
                    }
                }
            },
            userName:{
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    }
                }
            },
            department:{
                validators: {
                    notEmpty: {
                        message: '部门不能为空'
                    }
                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        console.log($(e.target));
        console.log($(e.target).serialize());


        if ($('#addModal .modal-title').text() == '添加用户'){
            /*渲染数据*/
            /*渲染数据*/
            $('tbody').append('<tr>' +
                '<td class="userCode">'+$('[name=userCode]').val()+'</td>'+
                '<td class="userName">'+$('[name=userName]').val()+'</td>'+
                '<td class="department">'+$('[name=department]').val()+'</td>'+
                '<td>' +
                '<button class="btn btn-default modify">修改</button>' +
                '<button class="btn btn-default delete">删除</button>' +
                '</td>'+
                '</tr>');
            $(e.target)[0].reset();
            $(e.target).data('bootstrapValidator').resetForm();
            $('#addModal').modal('hide');
        }else{
            $('.userCode').each(function () {
                if ($(this).text() == modifyID) {
                    $('#addModal').modal('hide');
                    $(this).text($('[name=userCode]').val())
                    $(this).next().text($('[name=userName]').val())
                    $(this).next().next().text($('[name=department]').val())
                    /*重置表单*/
                    $(e.target).data('bootstrapValidator').resetForm();
                    $(e.target).find('input').val('');
                }
            })
            $('#addModal .modal-title').text('添加用户');
        }
        $('tbody').on('click','.delete',function () {
            console.log(111);
            $(this).parent().parent().remove();
            /* todo */
        }).on('click','.modify',function () {
            $('#addModal').modal('show');
            $('#addModal .modal-title').text('修改用户');
            modifyID = $(this).parent().prev().prev().prev().text()
            $('[name=userCode]').val($(this).parent().prev().prev().prev().text())
            $('[name=userName]').val($(this).parent().prev().prev().text())
            $('[name=department]').val($(this).parent().prev().text())
        });
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