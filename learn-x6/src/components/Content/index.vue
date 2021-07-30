<template>
    <div id="x6_container" class="home"></div>
</template>

<script>
import { Graph, Shape } from '@antv/x6';
import { mapMutations } from "vuex";
import { Mouse } from "@/events/mouse";

export default {
    name: "index",
    data() {
        return {
            graph: null,
            graphOption: {
                grid: {
                    size: 10,
                    visible: true,
                    type: 'doubleMesh',
                    args: [
                        {
                            color: '#E7E8EA',
                            thickness: 1,
                        },
                        {
                            color: '#CBCED3',
                            thickness: 1,
                            factor: 5,
                        },
                    ],
                },
                panning: {
                    enabled: true,
                    eventTypes: [ 'leftMouseDown', 'rightMouseDown', 'mouseWheel' ],
                    modifiers: 'ctrl',
                },
                mousewheel: {
                    enabled: true,
                    zoomAtMousePosition: true,
                    modifiers: 'ctrl',
                    minScale: 0.5,
                    maxScale: 3,
                },
                connecting: {
                    router: 'manhattan',
                    connector: {
                        name: 'rounded',
                        args: {
                            radius: 8,
                        },
                    },
                    anchor: 'center',
                    connectionPoint: 'anchor',
                    allowBlank: false,
                    snap: {
                        radius: 20,
                    },
                    createEdge() {
                        return new Shape.Edge({
                            attrs: {
                                line: {
                                    stroke: '#000',
                                    strokeWidth: 1,
                                    targetMarker: {
                                        name: 'block',
                                        width: 12,
                                        height: 8,
                                    },
                                },
                            },
                            zIndex: 0,
                        });
                    },
                    validateConnection({ targetMagnet }) {
                        return !!targetMagnet;
                    },
                },
                highlighting: {
                    magnetAdsorbed: {
                        name: 'stroke',
                        args: {
                            attrs: {
                                fill: '#D06269',
                                stroke: '#D06269',
                            },
                        },
                    },
                },
                resizing: true,
                rotating: true,
                selecting: {
                    enabled: true,
                    rubberband: true,
                    showNodeSelectionBox: true,
                },
                snapline: true,
                keyboard: true,
                history: true,
                // minimap: {
                //     enabled: true,
                //     container: document.getElementById('minimap'),
                //     width: 198,
                //     height: 198,
                //     padding: 10,
                // },
                clipboard: true,
            },
            size: {
                width: 0,
                height: 0
            }
        };
    },
    mounted() {
        this.getContainerSize();
        // this.initGraph().fromJSON(data);
        this.initGraph();
        this.resize();
        this.initEvent();
    },
    methods: {
        ...mapMutations('app', [ 'setGraph' ]),
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
            });
        },
        initEvent() {
            const mouse = new Mouse(this.graph);
            mouse.nodeMouseEnter();
            mouse.nodeMouseLeave();
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
