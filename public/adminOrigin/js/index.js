$(function () {
    //1.引入eCharts插件
    //2.画图
    barCharts();
    picCharts();



});

//柱状图
var barCharts = function () {
    //6./*获取数据*/
    var data = [
        {
            name:'一月',
            value:300
        },
        {
            name:'二月',
            value:400
        },
        {
            name:'三月',
            value:500
        },
        {
            name:'四月',
            value:200
        },
        {
            name:'五月',
            value:600
        },

    ];
    //要把这个数据分成两个,需要遍历
    var xdata = [], sdata = [];
    data.forEach(function (item,i) {
        xdata.push(item.name);
        sdata.push(item.value);
    });
    //3.获取画图的容器
    var box = document.querySelector('.picTable:first-child');
    //4.初始化插件
    var myChart = echarts.init(box);

    //5.配置参数
    var option = {
        //配置标题
        title:{
            text:'2018年注册人数'
        },
        //配置柱状图说明
        legend:{
            data: [{
                name: '注册人数'

            }]
        },
        //默认显示的标题
        tooltip : {
        },
        xAxis : [
            {
                data : ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'注册人数',
                type:'bar',
                barWidth: '70%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    //把数据放到数组里面
    option.xAxis[0].data  = xdata;
    option.series[0].data = sdata;

    myChart.setOption(option);

};

//饼状图
var picCharts = function () {

    //3.获取画图的容器
    var box = document.querySelector('.picTable:last-child');
    //4.初始化插件
    var myChart = echarts.init(box);

    //5.配置参数
    /*4.配置参数*/
    var option = {
        title : {
            text: '品牌销售占比',
            subtext: '2018年5月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            /*series.name  a  */
            /*data.name  b */
            /*data.value  c */
            /*占比  d */
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁','耐克','阿迪','匡威','回力']
        },
        series : [
            {
                name: '销售情况',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'李宁'},
                    {value:310, name:'耐克'},
                    {value:234, name:'阿迪'},
                    {value:135, name:'匡威'},
                    {value:1548, name:'回力'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    myChart.setOption(option);

};