$(function () {
    getUserMessageData(function(data){
        $('.mui-media-body').html(data.username+'<p>绑定手机:'+data.mobile+'</p>');
    });
    $('.loginOut a').on('tap',function () {
        getLoginOutData(function(data){
            if(data.success){
                location.href = WT.loginUrl;
            }
        });
    })
})
//加载用户信息
var getUserMessageData = function(callback){
    WT.loginAjax({
        url:'/user/queryUserMessage',
        type:'get',
        data:'',
        dataType:'json',
        success:function (data) {
            callback && callback(data);
        }
    })
};
//退出登录
var getLoginOutData = function(callback){
    WT.loginAjax({
        type:'get',
        url:'/user/logout',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};