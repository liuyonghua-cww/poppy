<template>
    <!--节点位置、宽高、角度等信息-->
    <div class="cell-properties">
        <a-form :label-col="{span: 7, offset: 1}" :wrapper-col="{span: 14}" layout="inline">
            <!--节点属性-->
            <a-form-model-item label="X">
                <a-input
                        v-model.number="position.x"
                        type="number"
                        @change="setNodePos('position', position)"
                />
            </a-form-model-item>
            <a-form-model-item label="Y">
                <a-input
                        v-model.number="position.y"
                        type="number"
                        @change="setNodePos('position', position)"
                />
            </a-form-model-item>
            <a-form-model-item label="W">
                <a-input
                        v-model.number="size.width"
                        @change="setNodeSize('w')"
                        type="number"
                />
            </a-form-model-item>
            <a-form-model-item label="H">
                <a-input
                        v-model.number="size.height"
                        @change="setNodeSize('h')"
                        type="number"
                />
            </a-form-model-item>
            <a-form-model-item label="deg">
                <a-input
                        v-model.number="deg"
                        @change="setNodeDeg"
                        type="number"
                />
            </a-form-model-item>
        </a-form>
        <div class="preserve-aspect-ratio" @click="setPreserveAspectRatio">
            <i :class="{selectedBGC: this.preserveAspectRatio}" class="iconfont icon-huabuye_kuangaosuoding"></i>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { Mouse } from "@/events/mouse";

export default {
    name: "index",
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
            deg: 0,

            preserveAspectRatio: false,
            aspectRatio: 0
        };
    },
    mounted() {
        this.getNodeProp();
        this.handleNodeChange();
        this.getPreserveAspectRatio();
        this.getAspectRatio();
    },
    watch: {
        cellId: function () {
            this.getNodeProp();
            this.getPreserveAspectRatio();
            this.getAspectRatio();
        }
    },
    methods: {
        getNodeProp() {
            this.position = this.selectedCell.prop('position');
            this.size = this.selectedCell.prop('size');
            this.deg = this.selectedCell.getAngle && this.selectedCell.getAngle();
        },
        setNodePos() {
            const { x, y } = this.position;
            this.selectedCell.position(x, y);
        },
        /**
         *
         * @param type 改变是宽还是高
         */
        setNodeSize(type) {
            if (this.preserveAspectRatio) {
                if (type === 'w') {
                    this.size.height = (1 / this.aspectRatio) * this.size.width;
                }
                if (type === 'h') {
                    this.size.width = (this.aspectRatio) * this.size.height;
                }
            }
            this.selectedCell.size(this.size);
            this.getAspectRatio();
        },
        setNodeDeg() {
            this.selectedCell.rotate(this.deg, { absolute: true });
        },
        // 监听当前节点的change事件，实时获取相关属性
        handleNodeChange() {
            new Mouse(this.graph)._nodeChange(() => {
                this.getNodeProp();
            });
        },
        getPreserveAspectRatio() {
            this.preserveAspectRatio = this.selectedCell.prop('preserveAspectRatio');
        },
        setPreserveAspectRatio() {
            this.preserveAspectRatio = !this.preserveAspectRatio;
            this.selectedCell.prop('preserveAspectRatio', this.preserveAspectRatio);
        },
        getAspectRatio() {
            const {width, height} = this.selectedCell.getBBox();
            this.aspectRatio = width / height;
        }
    }
};
</script>

<style scoped lang="less">
.cell-properties {
    width: 240px;
    position: relative;
    .ant-form-inline .ant-form-item {
        margin-right: 0;
        width: 50%;
    }
    > .preserve-aspect-ratio {
        position: absolute;
        top: 2px;
        left: 114px;
        >i {
            font-size: 24px;
        }
    }
}
.selectedBGC {
    background-color: #e0e0e0!important;
}
</style>
