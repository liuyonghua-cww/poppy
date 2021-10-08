<template>
    <div :style="contextmenuStyle" class="contextmenu">
        <ul :style="contextmenuStyle" class="contextmenu">
            <li class="operate" @click.prevent.stop="up">
                <span>上移一层</span>
                <span>Ctrl+F</span>
            </li>
            <li class="operate" @click.prevent.stop="down">
                <span>下移一层</span>
                <span>Ctrl+B</span>
            </li>
            <li class="split"></li>
            <li class="operate" @click.prevent.stop="toFront">
                <span>置于顶层</span>
                <span>Ctrl+Shift+F</span>
            </li>
            <li class="operate" @click.prevent.stop="toBack">
                <span>置于底层</span>
                <span>Ctrl+Shift+F</span>
            </li>
            <li class="split"></li>
            <li v-if="contextmenuNode.getParent() || contextmenuNode.getChildren()" class="operate"
                @click.prevent.stop="cancelCombine"
            >
                <span>取消组合</span>
                <span>Ctrl+Shift+G</span>
            </li>
            <li v-else class="operate" @click.prevent.stop="combine">
                <span>组合</span>
                <span>Ctrl+G</span>
            </li>
            <template v-if="isChartNode(contextmenuNode)">
                <li class="split"></li>
                <li class="operate"
                    @click="setData"
                >
                    <span>数据设置</span>
                    <span></span>
                </li>
            </template>
        </ul>
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
            // 处理选中的节点 如果选中的节点中已经是一个组合 则移出子节点并删掉父节点
            const parent = [];
            cells.forEach((cell, index) => {
                const children = cell.getChildren();
                if (children) {
                    parent.push(cell.id);
                    children.forEach(child => cell.unembed(child));
                    this.graph.removeCells([ cell ]);
                }
            });
            // 需要组合的节点中的父节点删除
            parent.forEach(cellId => {
                cells.forEach((cell, index) => {
                    if (cell.id === cellId) {
                        cells.splice(index, 1);
                    }
                });
            });
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
                const parent = node.getParent();
                if (parent && parent.isNode()) {
                    parent.attr('body/stroke', '#239edd');
                }
            });
            // 鼠标抬起子节点 取消高亮显示父节点
            graph.on('node:mouseup', ({ node }) => {
                const parent = node.getParent();
                if (parent && parent.isNode()) {
                    parent.attr('body/stroke', 'node');
                }
            });
        },

        // 取消组合
        cancelCombine() {
            let children = [];
            let parent = null;
            // 如果右击的是子节点 则先获取到父节点 再获取全部子节点
            if (this.contextmenuNode.getParent()) {
                parent = this.contextmenuNode.getParent();
            }
            // 如果右击的是父节点
            if (this.contextmenuNode.getChildren()) {
                parent = this.contextmenuNode;
            }
            children = parent.getChildren();
            children.forEach(child => parent.unembed(child));
            this.graph.removeCells([ parent ]);

            this.$emit('setContextMenuStyle', null); // 隐藏右键菜单
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
    width: 250px;
    list-style: none;
    padding: 3px;

    box-shadow: 0 2px 6px 2px rgba(60, 64, 67, .15);
    border-radius: 4px;
    background-color: #fff;

    > .operate {
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 25px;
        padding-right: 5px;
        font-size: 14px;
        color: #000;
        cursor: pointer;
        transition: all .1s ease-in-out;

        &:hover {
            background-color: #eeeeee;
        }
    }

    > .split {
        width: 100%;
        height: 6px;
        position: relative;

        &::after {
            display: block;
            content: '';
            width: 100%;
            height: 1px;
            background-color: #cccccc;
            position: absolute;
            top: 2px;
        }
    }

    //
    //.grid {
    //    width: 100%;
    //    padding: 8px 8px 8px 20px;
    //    cursor: pointer;
    //}
}

.contextmenu-disable {
    cursor: not-allowed !important;
    background-color: #f5f5f5;
}

</style>
