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
                    :class="{'contextmenu-disable': contextmenuNode.prop('name') && !contextmenuNode.prop('name').includes('chart')}"
                    :hoverable="contextmenuNode.prop('name').includes('chart')"
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
            debugger
            const { width, height, x, y } = document.querySelector('.x6-widget-selection-inner').getBoundingClientRect();
            // 转成页面本地坐标
            const rect = this.graph.pageToLocal(x, y, width, height);
            const parentNode = this.graph.addNode({
               ...rect,
                attrs: {
                   body: {
                       stroke: 'none',
                       fill: 'transparent',
                   }
                }
            });
            // 把选中的子节点添加到其中
            cells.forEach(cell => {
                parentNode.addChild(cell);
                cell.toFront();
            });
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
