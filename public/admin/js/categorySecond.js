$(function () {
    var currPage = 1;
    var modifyID = 666;
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
        console.log($(e.target));
        console.log($(e.target).serialize());
        if ($('#addModal .modal-title').text() == '添加品牌'){
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
            /*渲染数据*/
            $('tbody').append('<tr>' +
                '<td class="id">'+ Math.floor(Math.random()*11) +'</td>'+
                '<td class="category">'+$('[name=categoryName] option:selected').text()+'</td>'+
                '<td class="brandName">'+$('[name=brandName]').val()+'</td>'+
                '<td class="operation">' +
                '<button class="btn btn-default modify">修改</button>' +
                '<button class="btn btn-default delete">删除</button>' +
                '</td>'+
                '</tr>');
            $(e.target)[0].reset();
            $(e.target).data('bootstrapValidator').resetForm();
            $('#addModal').modal('hide');
        }else{
            $('.id').each(function () {
                if ($(this).text() == modifyID) {
                    $('#addModal').modal('hide');
                    $(this).next().text($('[name=categoryName]').val())
                    $(this).next().next().text($('[name=brandName]').val())
                    /*重置表单*/
                    $(e.target).data('bootstrapValidator').resetForm();
                    $(e.target).find('input').val('');
                }
            })
            $('#addModal .modal-title').text('添加品牌');
        }
        $('tbody').on('click','.delete',function () {
            $(this).parent().parent().remove();
            /* todo */
        }).on('click','.modify',function () {
            $('#addModal').modal('show');
            $('#addModal .modal-title').text('修改品牌');
            modifyID = $(this).parent().prev().prev().prev().text()
            $('select').val($(this).parent().prev().prev().text())
            $('[name=brandName]').val($(this).parent().prev().text())
        })
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