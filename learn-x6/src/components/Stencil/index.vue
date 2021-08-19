<template>
    <div id="stencil">

    </div>
</template>

<script>
import { Addon } from "@antv/x6";
import { mapState } from "vuex";
import './shapes';
import { ports_data, ports_pentagon, ports_triangle } from "@/components/Stencil/shapes";

export default {
    name: "index",
    data() {
        return {
            stencil: null
        };
    },
    watch: {},
    computed: {
        ...mapState('app', [ 'graph' ])
    },
    mounted() {
        this.$nextTick(() => {
            this.initStencil();
            this.initShape();
        });
    },
    methods: {
        // 初始化左侧面板
        initStencil() {
            this.stencil = new Addon.Stencil({
                title: 'shapes',
                target: this.graph,
                ...this.getStencilSize(),
                layoutOptions: {
                    columns: 4,
                    columnWidth: 48,
                    rowHeight: 40,
                    marginY: 20,
                },
                stencilGraphOptions: {
                    background: {
                        // color: '#fff'
                    }
                },
                // 自定义放置到画布上的节点样式
                getDropNode(node) {
                    const size = node.size();
                    return node.clone().size(size.width * 3, size.height * 3);
                },
            });
            const stencilContainer = document.querySelector('#stencil');
            if (stencilContainer) {
                stencilContainer.appendChild(this.stencil.container);
            }
        },
        initShape() {
            const { graph } = this;
            const r1 = graph.createNode({
                shape: 'custom-rect',
            });
            const r2 = graph.createNode({
                shape: 'custom-rect',
                attrs: {
                    body: {
                        rx: 4,
                        ry: 4,
                    },
                },
            });
            const r3 = graph.createNode({
                shape: 'custom-polygon',
                attrs: {
                    body: {
                        refPoints: '0,10 10,0 20,10 10,20',
                    },
                },
            });
            const r4 = graph.createNode({
                shape: 'custom-polygon',
                attrs: {
                    body: {
                        refPoints: '10,0 40,0 30,10 0,10',
                    },
                },
                ports: ports_data
            });
            const r5 = graph.createNode({
                shape: 'custom-circle',
            });

            const r6 = graph.createNode({
                shape: 'custom-polygon',
                attrs: {
                    body: {
                        refPoints: '10,0 20,10 0,10',
                    },
                },
                ports: ports_triangle
            });

            const r7 = graph.createNode({
                shape: 'custom-polygon',
                attrs: {
                    body: {
                        refPoints: '5,0 10,8 8,20 2,20 0,8',
                    },
                },
                ports: ports_pentagon
            })

            const r8 = graph.createNode({
                shape: 'custom-polygon',
                attrs: {
                    body: {
                        refPoints: '4,0 16,0 20,10 16,20 4,20 0,10',
                    },
                },
            })

            const r9 = graph.createNode({
                shape: 'custom-polygon',
                width: 30,
                height: 30,
                attrs: {
                    body: {
                        refPoints: '5,0 15,0 20,5 20,15 15,20 5,20 0,15 0,5',
                    },
                },
            })

            const r10 = graph.createNode({
                shape: 'custom-path',
                // https://www.svgrepo.com/svg/13695/star
                path: 'M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956C22.602,0.567,25.338,0.567,26.285,2.486z',
            })

            const r11 = graph.createNode({
                shape: 'custom-path',
                path: 'M 0 1 L 0 1 M 0 1 Z Q 1 0.5 2 1 L 0 1 L 1 4 L 2 1',
            })
            this.stencil.load([ r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11]);
        },
        getStencilSize() {
            const { width: stencilGraphWidth, height: stencilGraphHeight } = document.querySelector('#stencil').getBoundingClientRect();
            return {
                stencilGraphWidth,
                stencilGraphHeight
            };
        }
    }
};
</script>

<style scoped lang="less">
#stencil {
    width: 100%;
    height: 100%;
    position: relative;
    border-right: 1px solid @border-color-base;
}
</style>
