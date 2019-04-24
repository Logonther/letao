$(function () {
    $('.mui-btn-primary').on('tap',function () {
        //1、点击获取表单的序列化数据--->一定要有name属性!!!!!!!!!!!!!!!!!!!!!
        var data = $('form').serialize();
        var dataObj = WT.formData(data);

        //2、校验
        if(!dataObj.username){
            mui.toast('请输入用户名');
            return false;
        }
        if(!dataObj.password){
            mui.toast('请输入密码');
            return false;
        }

        //3、发送ajax请求
        $.ajax({
            url:'/user/login',
            type:'post',
            data:dataObj,
            dataType:'json',
            success:function (data) {
                if(data.error == 403){
                    mui.toast(data.message);
                }
                //有地址，根据传过来的地址跳转
                var returnUrl = location.search.replace('?returnUrl=','');

                if(returnUrl){
                    location.href = returnUrl;//跳回到商品详情
                }else{
                    location.href = WT.userUrl;
                }
            }
        })
    })
})