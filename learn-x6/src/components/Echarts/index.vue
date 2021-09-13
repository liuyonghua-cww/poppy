<!--折线图组件-->
<template>
    <div :id="id" class="ehcarts" ref="chart">
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';

echarts.use([SVGRenderer, CanvasRenderer]);

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
            // const chartDom = document.getElementById(this.id);
            const myChart = echarts.init(this.$refs.chart, null, { renderer: 'svg' });
            myChart.setOption(eval("(" + this.chartOption + ")"));
            this.node.on('change:size', () => {
                myChart.resize();
            });
            this.node.on('change:data', () => {
               const data = this.node.getData().chartOption;
                console.log(data);
                myChart.setOption(data, { notMerge: true });
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
