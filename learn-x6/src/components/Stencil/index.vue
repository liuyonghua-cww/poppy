<template>
    <div id="stencil">

    </div>
</template>

<script>
import { Addon } from "@antv/x6";
import { mapState } from "vuex";
import './shapes';
import { ports_data, ports_triangle } from "@/components/Stencil/shapes";

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
                        refPoints: '10,0 40,0 30,20 0,20',
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

            this.stencil.load([ r1, r2, r3, r4, r5, r6 ]);
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
