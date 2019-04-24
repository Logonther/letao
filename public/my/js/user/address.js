$(function () {
    mui('.mui-scroll-wrapper').scroll({
        //deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators:false
    });
    getAddressData(function(data){
        console.log(data);
        $('.mui-scroll').html(template('address',{list:data}));
    });
    $('body').on('tap','.mui-btn-red',function(){
        deleteAddress($(this).attr('data-id'),function(){
            mui.toast('删除成功！');
            getAddressData(function(data){
                $('.mui-scroll').html(template('address',{list:data}));
            });
        });
    })
});
var getAddressData = function(callback){
    WT.loginAjax({
        url:'/address/queryAddress',
        type:'get',
        data:{},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};
var deleteAddress = function(id,callback){
    WT.loginAjax({
        url:'/address/deleteAddress',
        type:'post',
        data:{id:id},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};