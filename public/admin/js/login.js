$(function () {
    /*
    * 1、一定要是一个完整的表单结构 form input submit
    * 2、表单元素一定要有对应的name名 例：name="username"
    * 3、初始化表单验证插件
    * 4、配置组件的功能
    * 5、配置相应的校验规则
    *
    * */
    $("#login").bootstrapValidator({
        //当没有错误提示的时候，会默认用这个提示
        //message:'这个值没有被验证',

        //配置校验不同状态下显示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'//校验过后显示的图标
        },
        //需要校验的表单元素写在里面，通过name名校验
        fields: {
            username: {
                //配置自定义的校验规则，不配置就会用默认的
                validators: {
                    //配置不能为空的校验规则
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度在6到16之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv',function (e) {
        //阻止submit默认提交功能，需要用ajax提交
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:$form.serialize(),
            dataType:'json',
            success:function (data) {
                if(data.success == true){
                    //跳到主页
                    location.href = 'index.html';
                }else{
                    if(data.error == 1000){
                        //用户名校验失败
                        //1、获取校验的组件
                        //2、更改校验状态的函数
                        //3、参数1：我们需要校验的表单 参数2:改成什么样的状态 参数3：使用哪个校验的规则
                        /*NOT_VALIDATED 还没校验, VALIDATING 校验中, INVALID 失败 or VALID 成功*/
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    }else if(data.error == 1001){
                        //密码校验失败
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    }
                }
            }
        })
    })
})