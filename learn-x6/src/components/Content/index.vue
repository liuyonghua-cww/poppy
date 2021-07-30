<template>
    <div id="x6_container" class="home"></div>
</template>

<script>
import { Graph } from '@antv/x6';
import { data } from '@/assets/data';
import { mapMutations } from "vuex";

export default {
    name: "index",
    data() {
        return {
            graph: null,
            graphOption: {
                background: {
                    color: '#fffbe6', // 设置画布背景颜色
                },
                grid: {
                    size: 10,      // 网格大小 10px
                    visible: true, // 渲染网格背景,
                },
                rotating: true,
            },
            size: {
                width: 0,
                height: 0
            }
        };
    },
    mounted() {
        this.getContainerSize();
        this.initGraph().fromJSON(data);
        this.resize();
    },
    methods: {
        ...mapMutations('app', ['setGraph']),
        // init
        initGraph() {
            const graph = new Graph({
                container: document.getElementById('x6_container'),
                ...this.size,
                ...this.graphOption
            });
            this.graph = graph;
            this.setGraph(graph);
            return graph;
        },
        // 获取画布区域的宽高
        getContainerSize() {
            const { width, height } = document.querySelector('#content').getBoundingClientRect();
            this.size.width = width;
            this.size.height = height;
        },
        // 监听窗口变化，画布自适应
        resize() {
            window.addEventListener('resize', () => {
                this.getContainerSize();
                const { width, height } = this.size;
                console.log(width);
                this.graph.resize(width, height);
            })
        }
    }
};
</script>

<style scoped>
#x6_container {
    width: 100%;
    height: 100%;
}
</style>
