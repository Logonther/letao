$(function () {
    //1、动态渲染一级分类，根据一级分类渲染二级分类
    //2、点击一级分类渲染对应的二级分类

    //一、
    getCategory(function (data) {
        //模板引擎的顺序：1、准备数据 2、下载引入 3、定义模板 4、调用模板 5、渲染页面
        $('.cate_left ul').html(template('firstTemplate',data));
        //获取一级分类对应的id
        var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');

        getCategorySec({id:categoryId},function (data) {
            $('.cate_right ul').html(template('secondTemplate',data));
        })
    })

    //二、
    $('.cate_left ul').on('tap','a',function () {
        //优化：如果已经选中，在此点击就不会有后续处理的操作
        if($(this).parent().hasClass('now')) return false;

        //点击显示对应样式
        $('.cate_left ul li').removeClass('now');
        $(this).parent().addClass('now');
        //获取对应id
        var categoryId = $(this).attr('data-id');
        //重新渲染一次对应二级分类
        getCategorySec({id:categoryId},function (data) {
            $('.cate_right ul').html(template('secondTemplate',data));
        })
    })

})
//要求数据与业务相分离，可以定义一个方法专门来调借口以请求数据
var getCategory = function (callback) {
    $.ajax({
        url:'/category/queryTopCategory',
        type:'GET',
        dataType:'json',
        success:function (data) {
            callback && callback(data);
        }
    })
}

//二级分类的数据-->把id传进来 params = {id:1}
var getCategorySec = function (params,callback) {
    $.ajax({
        url:'/category/querySecondCategory',
        type:'GET',
        data:params,
        dataType:'json',
        success:function (data) {
            callback && callback(data);
        }
    })
}