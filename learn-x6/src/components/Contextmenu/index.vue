<template>
    <div :style="contextmenuStyle" class="contextmenu">
        <a-card>
            <a-card-grid class="grid" @click.prevent.stop="up">
                上移一层
            </a-card-grid>
            <a-card-grid class="grid" @click.prevent.stop="down">
                下移一层
            </a-card-grid>
            <a-card-grid class="grid" @click.prevent.stop="toFront">
                置顶
            </a-card-grid>
            <a-card-grid class="grid" @click.prevent.stop="toBack">
                置底
            </a-card-grid>
            <a-card-grid
                    :class="{'contextmenu-disable': !isChartNode(contextmenuNode)}"
                    :hoverable="isChartNode(contextmenuNode)"
                    class="grid"
                    @click="setData"
            >
                数据设置
            </a-card-grid>
            <a-card-grid class="grid" @click.prevent.stop="combine">
                组合
            </a-card-grid>
        </a-card>
    </div>
</template>

<script>
import { mapState } from "vuex";

const PADDING = 10;

export default {
    name: "index",
    props: {
        contextmenuStyle: {
            type: Object,
            default: null
        }
    },
    computed: {
        ...mapState('app', [ 'contextmenuNode', 'graph' ])
    },
    data() {
        return {};
    },
    methods: {
        up(e) {
            const { contextmenuNode: node } = this;
            const zIndex = node.getZIndex() + 2;
            node.setZIndex(zIndex);
            this.$emit('setContextMenuStyle', null); // 隐藏右键菜单
        },
        down(e) {
            const { contextmenuNode: node } = this;
            const zIndex = node.getZIndex() - 2;
            node.setZIndex(zIndex);
            this.$emit('setContextMenuStyle', null); // 隐藏右键菜单
        },
        toFront(e) {
            const { contextmenuNode: node } = this;
            node.toFront();
            this.$emit('setContextMenuStyle', null); // 隐藏右键菜单
        },
        toBack(e) {
            const { contextmenuNode: node } = this;
            node.toBack();
            this.$emit('setContextMenuStyle', null); // 隐藏右键菜单
        },
        setData(e) {
            this.$emit('setEditorVisible', true); // 显示编辑框
            this.$emit('setContextMenuStyle', null); // 隐藏右键菜单
        },

        // 组合
        combine() {
            // 获取选中的节点
            const cells = this.graph.getSelectedCells();
            // 节点须大于 1 才能进行组合
            if (cells.length < 2) {
                return this;
            }
            // 获取节点包围框的大小，动态创建一个与之相同的 node
            const { width, height, x, y } = document.querySelector('.x6-widget-selection-inner').getBoundingClientRect();
            // 转成页面本地坐标
            const rect = this.graph.pageToLocal(x - PADDING, y - PADDING, width + 2 * PADDING, height + 2 * PADDING);
            const parentNode = this.graph.addNode({
                ...rect,
                attrs: {
                    body: {
                        stroke: 'none',
                        strokeWidth: 1,
                        fill: 'transparent',
                    }
                }
            });
            // 把选中的子节点添加到其中
            cells.forEach(cell => {
                parentNode.addChild(cell);
                cell.toFront();
            });
            this.$emit('setContextMenuStyle', null); // 隐藏右键菜单
            this.onChildSizeAndPos();
            this.highlightParent();
        },
        onChildSizeAndPos() {
            // 监听子节点位置的改变
            graph.on('node:change:position', ({ node }) => {
                this.handleParentSizeAndPos(node);
            });
            // 监听子节点大小的改变
            graph.on('node:change:size', ({ node }) => {
                this.handleParentSizeAndPos(node);
            });
        },
        /**
         * 设置父节点
         * @param node 子节点
         */
        handleParentSizeAndPos(node) {
            //
            const parent = node.getParent();
            if (parent && parent.isNode()) {
                let hasChange = false;
                let x = 0;
                let y = 0;
                let cornerX = 0;
                let cornerY = 0;

                const children = parent.getChildren();
                if (children) {
                    for (let i = 0; i < children.length; i++) {
                        const child = children[ i ];
                        const bbox = child.getBBox();
                        const corner = bbox.getCorner();
                        if (i === 0) {
                            x = bbox.x;
                            y = bbox.y;
                            cornerX = corner.x;
                            cornerY = corner.y;
                            continue;
                        }

                        if (bbox.x < x) {
                            x = bbox.x;
                            hasChange = true;
                        }

                        if (bbox.y < y) {
                            y = bbox.y;
                            hasChange = true;
                        }

                        if (corner.x > cornerX) {
                            cornerX = corner.x;
                            hasChange = true;
                        }

                        if (corner.y > cornerY) {
                            cornerY = corner.y;
                            hasChange = true;
                        }
                    }
                }

                // 设置父节点的位置和大小
                if (hasChange) {
                    parent.prop(
                            {
                                position: { x: x - PADDING, y: y - PADDING },
                                size: { width: cornerX - x + 2 * PADDING, height: cornerY - y + 2 * PADDING },
                            }
                    );
                }
            }
        },

        highlightParent() {
            const { graph } = this;
            // 鼠标按下子节点 高亮显示父节点
            graph.on('node:mousedown', ({ node }) => {
                const parent  = node.getParent();
                if (parent && parent.isNode()) {
                    parent.attr('body/stroke', '#239edd')
                }
            })
            // 鼠标抬起子节点 取消高亮显示父节点
            graph.on('node:mouseup', ({ node }) => {
                const parent  = node.getParent();
                if (parent && parent.isNode()) {
                    parent.attr('body/stroke', 'node')
                }
            })
        },


        // 是否是图表节点
        isChartNode(node) {
            if (node.prop('name')) {
                return node.prop('name').includes('chart');
            }
            return false;
        }
    }
};
</script>

<style lang="less" scoped>
.contextmenu {
    position: fixed;
    left: -99999px;
    width: 150px;
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.15) !important;

    .grid {
        width: 100%;
        padding: 8px 8px 8px 20px;
        cursor: pointer;
    }
}

.contextmenu-disable {
    cursor: not-allowed !important;
    background-color: #f5f5f5;
}

</style>
