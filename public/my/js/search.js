$(function () {
    //1、渲染缓存数据的列表
    //2、点击搜索添加历史记录

    //1、渲染列表
    var historyList = getHistoryData();
    console.log(historyList);
    $('.history').html(template('history',{list:historyList}))
    //2、点击搜索添加历史列表
    $('.search_btn').on('tap',function () {
        //获取搜索框里的值
        var key = $.trim($('[type="search"]').val());
        //如果搜索框为空，有提示
        if (!key) {
            mui.toast('请输入关键字');
            return false;
        }

        //优化：
        //1、在正常的10条记录内正常添加
        //2、已经有10条了，添加新的一条，删除最早的一条
        //3、如果有相同记录，添加新的一条并删除旧的一条
        //判断是否有相同的数据
        var isHave = false;//记录是否有相同的数据
        var haveIndex;//记录相同的一条数据是什么
        for(var i=0;i<historyList.length;i++){
            if(key==historyList[i]){
                isHave = true;
                haveIndex = i;
                break;
            }
        }
        if (isHave){
            historyList.splice(haveIndex,1);
        }else{
            if (historyList.length>=10){
                historyList.splice(0,1);
            }
        }

        //添加到数组
        historyList.push(key);
        //存到缓存数据里
        localStorage.setItem('history',JSON.stringify(historyList));
        //再重新渲染一次
        $('.history').html(template('history',{list:historyList}))

        //跳转搜索详情并把key值传过去
        location.href = 'searchList.html?key='+key;
        //清空搜索框
        $('[type="search"]').val('');
    })
    //3、删除历史记录-->用委托事件
    $('.history').on('tap','.history ul li span',function () {
        //获取对应的索引
        var index = $(this).attr('data-index');
        //删除数据
        historyList.splice(index,1);
        //存到缓存数据里
        localStorage.setItem('history',JSON.stringify(historyList));
        //再重新渲染一次
        $('.history').html(template('history',{list:historyList}))
    })
    //4、点击清空
    $('.history').on('tap','.fa-trash',function () {
        //清空缓存数据
        localStorage.setItem('history','');
        //清空数组数据
        historyList.splice(0,historyList.length);
        //再重新渲染一次
        $('.history').html(template('history',{list:[]}))
    })
})
//封装获取存储数据的函数
var getHistoryData = function () {
    //1、预设一个key值，存的值是json数据的数组，数组不能遍历，要转化成json对象
    var str = localStorage.getItem('history')||'[]';
    var obj = JSON.parse(str);
    return obj;
}