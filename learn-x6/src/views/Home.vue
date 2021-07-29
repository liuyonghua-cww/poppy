<template>
    <div class="home" id="x6_container">
    </div>
</template>

<script>
import { Graph } from '@antv/x6';
import {data} from '@/assets/data';

export default {
    name: 'Home',
    data() {
        return {
            graph: null,
            graphOption: {
                background: {
                    color: '#fffbe6', // 设置画布背景颜色
                },
                grid: {
                    size: 10,      // 网格大小 10px
                    visible: true, // 渲染网格背景
                },
            }
        }
    },
    mounted() {
        this.initGraph().fromJSON(data);
       setTimeout(() => {
           console.log(this.graph.toJSON());
       }, 3000)
    },
    components: {},
    methods: {
        initGraph() {
            const graph = new Graph({
                container: document.getElementById('x6_container'),
                width: 800,
                height: 600,
                ...this.graphOption
            });
            this.graph = graph;
            return graph
        }
    }
};
</script>
