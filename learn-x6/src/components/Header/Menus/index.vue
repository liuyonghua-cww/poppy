<template>
    <div class="menus">
        <a-menu mode="horizontal">
            <a-sub-menu key="sub1">
                <!--<span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>-->
                <span slot="title">
                    <span>文件</span>
                </span>
                <!--<a-menu-item key="9">-->
                <!--    Option 9-->
                <!--</a-menu-item>-->
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <!--<span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>-->
                <span slot="title">
                    <span>编辑</span>
                </span>
            </a-sub-menu>
            <a-sub-menu key="sub3">
                <!--<span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>-->
                <span slot="title">
                    <span>调整图形</span>
                </span>
                <a-menu-item-group title="布局">
                    <a-menu-item key="grid" @click="layout('grid')">
                        网格布局
                    </a-menu-item>
                    <a-menu-item key="circular" @click="layout('circular')">
                        环形布局
                    </a-menu-item>
                    <!--<a-menu-item key="dagre" @click="layout('dagre')">-->
                    <!--    Dagre-->
                    <!--</a-menu-item>-->
                </a-menu-item-group>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { GridLayout, CircularLayout, DagreLayout } from '@antv/layout';

export default {
    name: "index",
    data() {
        return {};
    },
    computed: {
        ...mapState('app', [ 'graph' ])
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
        layout(type) {
            const { width, height } = this.graph.container.getBoundingClientRect();
            const center = [ width / 2, height / 2 ];
            const node = this.graph.toJSON().cells.filter(item => {
                return this.graph.getCellById(item.id).isNode();
            });
            const edge = this.graph.toJSON().cells.filter(item => {
                return this.graph.getCellById(item.id).isEdge();
            });
            const data = { nodes: node, edges: edge };
            let model;
            let layoutInstance;
            switch (type) {
                case 'grid':
                    layoutInstance = new GridLayout({
                        type: 'grid',
                        center
                    });
                    break;
                case 'circular':
                    layoutInstance = new CircularLayout({
                        type: 'circular',
                        center
                    });
                    break;
                case 'dagre':
                    layoutInstance = new DagreLayout({
                        type: 'dagre',
                    });
            }
            model = layoutInstance.layout(data);
            for (const node of model.nodes) {
                const _node = this.graph.getCellById(node.id);
                _node.transition('position/x', node.x, {
                    duration: 500
                });
                _node.transition('position/y', node.y, {
                    duration: 500
                });
            }
            // this.graph.fromJSON(model);

        },

    }
};
</script>

<style lang="less" scoped>
.menus {
    width: 100%;
    height: 40px;

    > .ant-menu-horizontal {
        padding-left: 20px;
        line-height: 40px;
        height: 100%;
    }
}

</style>
