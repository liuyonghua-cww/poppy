import axios from 'axios'
axios.get('echartsOption/line-chart.js').then(res => {
    const arr = res.data.split('=')
    console.log(arr);
    window[arr[0].replace(/\t|\n|\s/g, '')] = arr[1]
})
