<!--折线图组件-->
<template>
    <div :id="id" class="ehcarts">
        1111
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: "lineChart",
    inject: ['getNode'],
    created() {
        this.node = this.getNode();
        this.id = this.node.id;
        this.chartOption = this.node.getData().chartOption
    },
    mounted() {
        this.$nextTick(() => {
            const chartDom = document.getElementById(this.id);
            const myChart = echarts.init(chartDom);
            myChart.setOption(this.chartOption);
            this.node.on('change:size', () => {
                myChart.resize();
            })
        })
    },
    data() {
        return {
            node: null,
            id: null,
            chartOption: null
        }
    }
}
</script>

<style scoped>
.ehcarts {
    width: 100%;
    height: 100%;
}
</style>
