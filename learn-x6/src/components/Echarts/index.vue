<!--折线图组件-->
<template>
    <div :id="id" class="echarts" ref="chart">
    </div>
</template>

<script>
import * as echarts from 'echarts';
window.echarts = echarts;
import {SVGRenderer, CanvasRenderer} from 'echarts/renderers';

echarts.use([SVGRenderer, CanvasRenderer]);

export default {
    name: "lineChart",
    inject: ['getNode'],
    created() {
        this.node = this.getNode();
        this.id = this.node.id;
    },
    mounted() {
        this.$nextTick(() => {
            const myChart = echarts.init(this.$refs.chart, null, {renderer: 'svg'});
            this.setOption(myChart);
            this.node.on('change:size', () => {
                myChart.resize();
            });
            this.node.on('change:data', () => {
                this.setOption(myChart);
            })
        })
    },
    data() {
        return {
            node: null,
            id: null,
            chartOption: null
        }
    },
    methods: {
        /**
         *
         * @param instance echarts 实例
         */
        setOption(instance) {
            this.chartOption = this.node.getData().chartOption; // 获取配置
            const fn = new Function('return ' + this.chartOption);
            instance.setOption(fn(), {notMerge: true}); // eval将字符串转换为对象
        }
    },
    beforeDestory() {
        console.log(1);
    }
}
</script>

<style scoped>
.echarts {
    width: 100%;
    height: 100%;
}
</style>
