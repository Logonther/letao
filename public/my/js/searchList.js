$(function () {
    mui('.mui-scroll-wrapper').scroll({
        //deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    /*
    * 1、页面初始化的时候关键字在输入框内
    * 2、初始化完成之后，根据关键字查询第一页的数据4条
    * 3、点击搜索的时候根据新的关键字搜索商品，重新排序功能（即重新渲染）
    * 4、点击排序的时候，根据排序的选项，重新进行排序，默认是升序，再次点击是降序，箭头方向会变
    * 5、下拉刷新
    * 6、上拉加载下一页（没有数据就不加载，可以提醒一下用户）
    * */

    //1、页面初始化的时候关键字在输入框内
    var urlParams = WT.getParams();
    var $input = $('input').val(urlParams.key||'');
    var currPage = 1;

    var render = function(callback){
        var key = $.trim($input.val());

        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
        /*获取需要排序的方式*/
        var type = $('[data-type].now').attr('data-type');
        var value = $('[data-type].now').find('span').hasClass('fa-angle-down')?2:1;
        var order = {};
        if(type){
            order[type] = value;
        }
        /*显示多少条*/
        var pageSize = 4;

        //重新渲染一次
        getData($.extend({
            proName:key,
            page:currPage,
            pageSize:pageSize
        },order),function (data) {
            /*渲染商品列表*/
            if(currPage == 1){
                $('.live').html(template('list',data));
            }else{
                $('.live').append(template('list',data));
            }

            /*成功请求的其他业务*/
            callback && callback();
        })
    }

    //3、点击搜索的时候根据新的关键字搜索商品，重新排序功能（即重新渲染）
    $('.search_btn').on('tap',function () {
        /*去掉排序*/
        $('[data-type].now').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        /*当前页码*/
        currPage = 1;
        /*渲染*/
        render();
    })

    //4、点击排序的时候，根据排序的选项，重新进行排序，默认是升序，再次点击是降序，箭头方向会变
    $('.orderBar a').on('tap',function () {
        //样式
        if($(this).hasClass('now')){
            //改箭头
            if($(this).find('span').hasClass('fa-angle-down')){
                $(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                $(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        }else{
            $(this).addClass('now').siblings().removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        /*当前页码*/
        currPage = 1;
        /*渲染*/
        render();
    })

    //5、下拉刷新
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、class等
            down : {
                auto:true,
                callback :function () {
                    var that = this;
                    currPage = 1;
                    render(function(){
                        that.endPulldownToRefresh();
                    });
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            //6、上拉加载下一页（没有数据就不加载，可以提醒一下用户）
            up:{
                callback:function () {
                    var that = this;
                    setTimeout(function(){
                        that.endPullupToRefresh();
                    },1000);

                    /*下一页*/
                    currPage ++;
                    /*开发真实的业务*/
                    render(function(){
                        if(data.length){
                            that.endPullupToRefresh();//停止上拉加载
                        }else{
                            that.endPullupToRefresh(true);//提示用户并停止上拉加载
                        }
                    });

                }
            }
        }
    });
})

var getData =function (params,callback) {
    $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:params,
        dataType:'json',
        success:function (data) {
            /*模拟一下加载时间*/
            window.data = data.data;
            setTimeout(function(){
                if(data.data.length == 0) mui.toast('没有相关商品');
                callback && callback(data);
            },1000);
            /*window.page = data.page;
            callback && callback(data);*/
        }
    })
}