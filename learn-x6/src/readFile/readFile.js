import axios from 'axios'
// 获取折线图初始化配置
axios.get('echartsOption/line-chart.txt').then(res => {
    window.lineChart = res.data;
})
axios.get('echartsOption/bar-chart.txt').then(res => {
    window.barChart = res.data;
})
axios.get('echartsOption/pie-chart.txt').then(res => {
    window.pieChart = res.data;
});
axios.get('echartsOption/liquid-fill.txt').then(res => {
    window.liquidFill = res.data;
})
