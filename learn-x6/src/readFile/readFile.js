import axios from 'axios'
// 获取折线图初始化配置
axios.get('echartsOption/line-chart.js').then(res => {
    window.lineChart = res.data;
})
