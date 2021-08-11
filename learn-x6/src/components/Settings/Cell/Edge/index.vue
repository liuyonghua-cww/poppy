<template>
    <section id="edge_opt">
        <a-form :label-col="{span: 6}" :wrapper-col="{span: 16, offset: 1}">
            <a-form-model-item label="宽度">
                <a-slider
                        :defaultGValue="attr.strokeWidth"
                        :min="1"
                        :max="5"
                        @change="setAttr('strokeWidth')"
                        v-model="attr.strokeWidth"
                />
            </a-form-model-item>
            <a-form-model-item label="颜色">
                <a-input
                        type="color"
                        v-model="attr.stroke"
                        @change="setAttr('stroke')"
                />
            </a-form-model-item>
            <a-form-model-item label="连接器">
                <a-select v-model="attr.connector" placeholder="选择网格类型" @change="setConnector">
                    <a-select-option value="normal">Normal</a-select-option>
                    <a-select-option value="smooth">Smooth</a-select-option>
                    <a-select-option value="rounded">Rounded</a-select-option>
                    <a-select-option value="jumpover">Jumpover</a-select-option>
                </a-select>
            </a-form-model-item>
        </a-form>
    </section>
</template>

<script>
import { attrPath } from "./attrPath";
import { mapState } from "vuex";

export default {
    name: "index",
    computed: {
        ...mapState('app', [
                'selectedCell',
                'cellId'
        ])
    },
    data() {
        return {
            attr: {
                stroke: '',
                strokeWidth: 1,
                connector: 'normal'
            },
            attrPath
        }
    },
    mounted() {
        this.getAttr();
        this.getConnector()
    },
    watch: {
        cellId: function () {
            this.getAttr();
            this.getConnector();
        }
    },
    methods: {
        getAttr() {
            for (const key in attrPath) {
                this.attr[key] = this.selectedCell.attr(attrPath[key]);
            }
        },
        setAttr(key) {
            this.selectedCell.attr(this.attrPath[key], this.attr[key])
        },
        getConnector() {
            this.attr.connector = this.selectedCell.getConnector().name;
        },
        setConnector() {
            this.selectedCell.setConnector(this.attr.connector);
        }
    }
};
</script>

<style scoped lang="less">
#edge_opt {
    width: 100%;
    height: 100%;
    padding: 10px 0;
}


</style>
