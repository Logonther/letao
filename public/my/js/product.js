$(function () {

    mui('.mui-scroll-wrapper').scroll({
        //deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators:false
    });

    //1、拿到对应的id，他通过对应的id渲染对应的数据
    var id = WT.getParams().productId;

    getProductData(id,function (data) {
        $('.mui-scroll').html(template('detail',data));
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        });

        //2、尺码的选择
        $('.size span').on('tap',function () {
            $(this).addClass('now').siblings().removeClass('now');
        })

        //3、数量的选择
        $('.amount button').on('tap',function () {
            if($(this).hasClass('minus')){
                if($('.amount input').val()<=0){
                    mui.toast('宝贝数量不能小于0');
                    return false;
                }else{
                    $('.amount input').val(parseInt($('.amount input').val())-1);
                }

            }else{
                if ($('.amount input').val()>=data.num) {
                    //若消息框点击时和提示框重合，正好也点到了提示框，则会立马消失
                    //这种叫做击穿，tap事件特有,想解决则可以做延时处理
                    setTimeout(function () {
                        mui.toast('没有库存了');
                    },100);
                }else{
                    $('.amount input').val(parseInt($('.amount input').val())+1);
                }
            }
        })

        //4、加入购物车
        $('.add').on('tap',function () {
            //校验数据
            var $btnChange = $('.size span.now')
            if(!$btnChange.length){
                mui.toast('请选择尺码');
                return false;
            }
            var num = $('.amount input').val();
            if(num == 0){
                mui.toast('请选择数量');
                return false;
            }
            WT.loginAjax({
                url:'/cart/addCart',
                type:'post',
                data:{
                    productId:id,
                    num:num,
                    size:$btnChange.html(),
                },
                dataType:'json',
                success:function (data) {
                    /*if(data.error == 400){
                        //需要登录，跳到登录页，把当前地址传到登录页，当登录成功时再跳回来
                    }*/
                    if(data.success == true){
                        //已经登录，弹出提示框，
                        mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
                            if (e.index == 0) {
                                location.href = WT.cartUrl;
                            } else {
                                console.log('恭喜你找到小彩蛋~~~但是没有奖品哦~')
                            }
                        })
                    }
                }
            })
        })
    })

});
var getProductData = function (productId,callback) {
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{id:productId},
        dataType:'json',
        success:function (data) {
            callback&&callback(data);
        }
    })
}