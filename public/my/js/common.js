var WT = {};

//封装获取关键字的函数
WT.getParams = function () {
    var params = {};
    var search = decodeURI(location.search);
    //判断有search才操作
    if(search){
        search = search.replace('?','');//先去掉问号
        //把&符分割成两个字符串
        var arr = search.split('&');
        //再遍历的把等号分割
        arr.forEach(function (item,i) {
            var itemArr = item.split('=');
            console.log(itemArr);
            //把遍历出来的数据添加到对象里
            params[itemArr[0]] = itemArr[1];//对象中的属性 = 属性值
        })
    }
    console.log(params)
    return params;
}

WT.loginUrl = '/my/user/login.html';//登录地址
WT.cartUrl = '/my/user/cart.html';//个人中心地址
WT.userUrl = '/my/user/index.html';//个人中心地址

//封装需要登录的ajax函数
WT.loginAjax = function (params) {
    $.ajax({
        url:params.url || "#",
        type:params.type || 'get',
        data:params.data || '',
        dataType:params.dataType || 'json',
        success:function (data) {
            if(data.error == 400){
                console.log(data);
                //需要登录，跳到登录页，把当前地址传到登录页，当登录成功时再跳回来
                location.href = WT.loginUrl+'?returnUrl='+location.href;
            }else{
                params.success && params.success(data);
            }
        },
        error:function () {
            mui.toast('服务器繁忙')
        }
    })
}

//封装表单序列化的函数
WT.formData = function (dataString) {
    var obj = {};
    if(dataString){
        var arr = dataString.split('&');
        arr.forEach(function (item, i) {
            var itemArr = item.split('=');
            //追加到对象里
            obj[itemArr[0]] = itemArr[1];
        })
    }
    return obj;
}