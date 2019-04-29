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
            name:{
                validators: {
                    notEmpty: {
                        message: '名称不能为空'
                    }
                }
            },
            price:{
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    },
                    greaterThan: {
                        message: '价格不能小于0',
                        value: 0
                    },
                    digits: {
                        message: '价格只能包含数字'
                    }
                }
            },
            src1:{
                validators: {
                    notEmpty: {
                        message: '路径不能为空'
                    }
                }
            },
            src2:{
                validators: {
                    notEmpty: {
                        message: '路径不能为空'
                    }
                }
            },
            src3:{
                validators: {
                    notEmpty: {
                        message: '路径不能为空'
                    }
                }
            },
            src4:{
                validators: {
                    notEmpty: {
                        message: '路径不能为空'
                    }
                }
            },
            src5:{
                validators: {
                    notEmpty: {
                        message: '路径不能为空'
                    }
                }
            },
            src6:{
                validators: {
                    notEmpty: {
                        message: '路径不能为空'
                    }
                }
            },
            detail:{
                validators: {
                    notEmpty: {
                        message: '路径不能为空'
                    }
                }
            },
            brand:{
                validators: {
                    notEmpty: {
                        message: '品牌不能为空'
                    }
                }
            },
            inventory:{
                validators: {
                    notEmpty: {
                        message: '库存不能为空'
                    },
                    digits: {
                        message: '库存只能包含数字'
                    }
                }
            },
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        console.log($(e.target));
        console.log($(e.target).serialize());


        if ($('#addModal .modal-title').text() == '添加商品'){
            /*渲染数据*/
            $('tbody').append('<tr>' +
                '<td class="id">'+ Math.floor(Math.random()*101) +'</td>'+
                '<td class="name">'+$('[name=name]').val()+'</td>'+
                '<td class="price">'+$('[name=price]').val()+'</td>'+
                '<td class="pic">' +
                '<img src='+$('[name=src1]').val()+'>' +
                '<img src='+$('[name=src2]').val()+'>' +
                '<img src='+$('[name=src3]').val()+'>' +
                '<img src='+$('[name=src4]').val()+'>' +
                '<img src='+$('[name=src5]').val()+'>' +
                '<img src='+$('[name=src6]').val()+'>' +
                '</td>'+
                '<td class="detail"><img src='+$('[name=detail]').val()+'></td>'+
                '<td class="goodbrand">'+$('[name=brand]').val()+'</td>'+
                '<td class="inventory">'+$('[name=inventory]').val()+'</td>'+
                '<td>' +
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
                    $(this).siblings('.name').text($('[name=name]').val())
                    $(this).siblings('.price').text($('[name=price]').val())
                    $(this).siblings('.pic').find('img').eq(0).attr('src',$('[name=src1]').val())
                    $(this).siblings('.pic').find('img').eq(1).attr('src',$('[name=src2]').val())
                    $(this).siblings('.pic').find('img').eq(2).attr('src',$('[name=src3]').val())
                    $(this).siblings('.pic').find('img').eq(3).attr('src',$('[name=src4]').val())
                    $(this).siblings('.pic').find('img').eq(4).attr('src',$('[name=src5]').val())
                    $(this).siblings('.pic').find('img').eq(5).attr('src',$('[name=src6]').val())
                    $(this).siblings('.detail').find('img').attr('src',$('[name=detail]').val())
                    $(this).siblings('.goodbrand').text($('[name=brand]').val())
                    $(this).siblings('.inventory').text($('[name=inventory]').val())
                    /*重置表单*/
                    $(e.target).data('bootstrapValidator').resetForm();
                    $(e.target).find('input').val('');
                }
            })
            $('#addModal .modal-title').text('添加商品');
        }
        $('tbody').on('click','.delete',function () {
            console.log(111);
            $(this).parent().parent().remove();
            /* todo */
        }).on('click','.modify',function () {
            $('#addModal').modal('show');
            $('#addModal .modal-title').text('修改商品');
            modifyID = $(this).parent().siblings('.id').text();
            $('[name=name]').val($(this).parent().siblings('.name').text());
            $('[name=price]').val($(this).parent().siblings('.price').text());
            $('[name=src1]').val($(this).parent().siblings('.pic').find('img').eq(0).attr('src'));
            $('[name=src2]').val($(this).parent().siblings('.pic').find('img').eq(1).attr('src'));
            $('[name=src3]').val($(this).parent().siblings('.pic').find('img').eq(2).attr('src'));
            $('[name=src4]').val($(this).parent().siblings('.pic').find('img').eq(3).attr('src'));
            $('[name=src5]').val($(this).parent().siblings('.pic').find('img').eq(4).attr('src'));
            $('[name=src6]').val($(this).parent().siblings('.pic').find('img').eq(5).attr('src'));
            $('[name=detail]').val($(this).parent().siblings('.detail').find('img').attr('src'));
            $('[name=brand]').val($(this).parent().siblings('.goodbrand').text());
            $('[name=inventory]').val($(this).parent().siblings('.inventory').text());
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