option = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['Line 1', 'Line 2']
    },
    grid: {
        top: '15%',
        left: '3%',
        right: '5%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Line 1',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128, 255, 165)'
                }, {
                    offset: 1,
                    color: 'rgba(1, 191, 236)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
            name: 'Line 2',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 221, 255)'
                }, {
                    offset: 1,
                    color: 'rgba(77, 119, 255)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
        }
    ]
}

return option;
