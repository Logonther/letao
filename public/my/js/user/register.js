$(function () {
    $('.getCode').on('tap',function () {
        if($('.getCode').hasClass('flag')) return false;
        WT.loginAjax({
            url:'/user/vCode',
            type:'get',
            data:'',
            dataType:'json',
            success:function(data){
                console.log(data.vCode);
                var time = 60;
                $('.getCode').addClass('flag').html(time+'秒后再获取');
                var timer = setInterval(function(){
                    time --;
                    $('.getCode').html(time+'秒后再获取');
                    if(time <= 0) {
                        clearInterval(timer);
                        btn.removeClass('flag').html('获取认证码');
                    }
                },1000);
            }
        });
    })
    $('.register').on('tap',function () {
        var data = {
            username:$.trim($('[name=mobile]').val()),
            password:$.trim($('[name=pass]').val()),
            rePass:$.trim($('[name=rePass]').val()),
            vCode:$.trim($('[name=code]').val())
        }
        if(!data.username){
            mui.toast('请输入手机号');
            return false;
        }
        if(!/^1\d{10}$/.test(data.username)){
            mui.toast('请输入合法手机号');
            return false;
        }
        if(!data.password){
            mui.toast('请输入密码');
            return false;
        }
        if(!data.rePass){
            mui.toast('请再次输入密码');
            return false;
        }
        if(data.password != data.rePass){
            mui.toast('密码需要一致');
            return false;
        }
        if(!data.vCode){
            mui.toast('请输入验证码');
            return false;
        }
        if(!/^\d{6}$/.test(data.vCode)){
            mui.toast('请输入合法验证码');
            return false;
        }

        data.mobile = data.username;

        WT.loginAjax({
            url:'/user/register',
            type:'post',
            data:data,
            dataType:'json',
            beforeSend:function(){
                $('.register').html('正在提交...');
            },
            success:function(data){
                if(data.success == true){
                    mui.toast('注册成功！');
                    location.href = WT.loginUrl;
                }else{
                    mui.toast(data.message);
                    $('.register').html('注册');
                }
            }
        });
    })
})