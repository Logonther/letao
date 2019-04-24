$(function () {
    mui('.mui-scroll-wrapper').scroll({
        //deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators:false
    });
    //1、初始化页面，直接完成下拉刷新功能
    //2、点击刷新按钮，重新刷新一遍购物车
    //3、侧滑时，

    //5、点击复选框计算总金额


    //1、初始化页面，直接完成下拉刷新功能
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、class等
            down : {
                auto:true,
                callback :function () {
                    var that = this;
                    setTimeout(function(){
                        getCartData(function (data) {
                            console.log(data);
                            $('.mui-scroll').html(template('cart',data))
                            that.endPulldownToRefresh();
                        })
                    },1000);
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
        }
    });

    //2、点击刷新按钮，重新刷新一遍购物车
    $('.fa-refresh').on('tap',function () {
        //点击主动触发下拉操作的刷新
        mui('#refreshContainer').pullRefresh().pulldownLoading();
        $('#orderPrice').html('0.00');
    })

    //3、侧滑时，点击编辑弹出对话框--->选择尺码和数量--->要用委托事件
    $('.mui-scroll').on('tap','.mui-btn-primary',function () {
        //var html = template('edit',{});
        //点击获取当前的数据-->通过自定义属性
        var item = this.dataset;

        var li = this.parentNode.parentNode;

        var html = template('edit',item);
        mui.confirm(html.replace(/\n/g,''), '编辑商品', ['是', '否'], function(e) {
            if (e.index == 0) {
                //点击是的时候，要把修改的数据发给后台
                var size = $('.p_size span.now').html();
                var num = $('.amount input').val();
                WT.loginAjax({
                    url:'/cart/updateCart',
                    type:'post',
                    data:{
                        id:item.id,
                        size:size,
                        num:num
                    },
                    dataType:'json',
                    success:function (data) {
                        if(data.success == true){
                            item.size = size;
                            item.num = num;
                            $(li).find('.number').html('x'+item.num+'双');
                            $(li).find('.size').html('鞋码：'+item.size);
                            mui.swipeoutClose(li);
                            mui.toast('编辑成功');
                            setTotal(num);
                        }
                    }
                })
            } else {
            }
        })
        //4、选择尺码
        $('.p_size').on('tap','span',function () {
            $('.p_size span').removeClass('now');
            $(this).addClass('now');
        })

        //5、选择数量
        $('.amount').on('tap','button',function () {
            var num = $(this).siblings('input').val();
            var maxNum = parseInt($(this).siblings('input').attr('data-max'));
            if($(this).hasClass('minus')){
                if(num<=1){
                    mui.toast('至少需要一件商品');
                    return false;
                }
                num--;
            }else{
                if (num>=maxNum){
                    mui.toast('库存不足');
                    return false;
                }
                num++;
            }
            $(this).siblings('input').val(num);
        })
    })

    //4、侧滑时，点击删除，弹出确认的对话框
    $('.mui-scroll').on('tap','.mui-btn-danger',function () {
        var $this = $(this);
        var id = $(this).attr('data-id')
        mui.confirm('您要删除这件商品吗？', '商品删除', ['是', '否'], function(e) {
            if (e.index == 0) {
                //点击确定传数据
                WT.loginAjax({
                    url:'/cart/deleteCart',
                    type:'get',
                    data:{
                        id:id
                    },
                    dataType:'json',
                    success:function (data) {
                        //删除当前的整个li
                        if(data.success == true){
                            $this.parent().parent().remove();
                            setTotal();
                        }
                    }
                })
            } else {
            }
        })
    })

    //5、点击复选框，计算总金额
    $('.mui-scroll').on('change','[type=checkbox]',function () {
        setTotal();
    })
})

var getCartData = function (callback) {
    WT.loginAjax({
        url:'/cart/queryCartPaging',
        type:'get',
        data:{
            page:1,
            pageSize:100,//不产生分页
        },
        dataType:'json',
        success:function (data) {
            callback && callback(data);
        }
    })
}

//封装计算价格的函数
var setTotal = function (itemnum) {
    //获取被选的复选框
    var $checkBox = $('[type="checkbox"]:checked');
    var total = 0;
    $checkBox.each(function (i, item) {
        var num = itemnum || $(this).attr('data-num');
        var price = $(this).attr('data-price');
        total += num*price;
    })
    //解决小数点
    total = Math.floor(total*100)/100;

    //把总金额渲染到页面
    $('#orderPrice').html(total);
}