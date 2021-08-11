<template>
    <section id="node_opt">
        <a-divider>节点属性</a-divider>
        <a-form-model :label-col="{span: 8, offset: 1}" :wrapper-col="{span: 14}" layout="inline">
            <!--节点属性-->
            <a-form-model-item label="x坐标">
                <a-input
                        v-model.number="position.x"
                        type="number"
                        @change="setNodePos('position', position)"
                />
            </a-form-model-item>
            <a-form-model-item label="y坐标">
                <a-input
                        v-model.number="position.y"
                        type="number"
                        @change="setNodePos('position', position)"
                />
            </a-form-model-item>
            <a-form-model-item label="宽度">
                <a-input
                        v-model.number="size.width"
                        @change="setNodeSize"
                        type="number"
                />
            </a-form-model-item>
            <a-form-model-item label="高度">
                <a-input
                        v-model.number="size.height"
                        @change="setNodeSize"
                        type="number"
                />
            </a-form-model-item>
            <a-form-model-item label="角度">
                <a-input
                        v-model.number="deg"
                        @change="setNodeDeg"
                        type="number"
                />
            </a-form-model-item>
        </a-form-model>
        <a-divider>元素属性</a-divider>
        <Attr />
    </section>
</template>

<script>
import { mapState } from "vuex";
import { Mouse } from "@/events/mouse";
import Attr from './Attr'
export default {
    name: "index",
    components: {
        Attr
    },
    computed: {
        ...mapState('app', [
            'graph',
            'selectedCell',
            'cellId'
        ])
    },
    data() {
        return {
            position: { x: 0, y: 0 }, // 节点的位置,
            size: { width: 0, height: 0 },
            deg: 0
        };
    },
    mounted() {
        this.getNodeProp();
        this.handleNodeChange();
    },
    watch: {
        cellId: function () {
            this.getNodeProp();
        }
    },
    methods: {
        getNodeProp() {
            this.position = this.selectedCell.prop('position');
            this.size = this.selectedCell.prop('size');
            this.deg = this.selectedCell.getAngle();
        },
        setNodePos() {
            const { x, y } = this.position;
            this.selectedCell.position(x, y);
        },
        setNodeSize() {
            this.selectedCell.size(this.size);
        },
        setNodeDeg() {
            this.selectedCell.rotate(this.deg, { absolute: true });
        },
        // 监听当前节点的移动 并获取实时位置
        handleNodeChange() {
            new Mouse(this.graph)._nodeChange(() => {
                this.getNodeProp();
            });
        }
    }
};
</script>

<style lang="less" scoped src="../../../../assets/styles/node-option.less">

</style>
