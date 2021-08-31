<!--元素属性设置-->
<template>
    <a-form-model :label-col="{span: 11, offset: 1}" :wrapper-col="{span: 11}" layout="inline">
        <a-form-model-item label="边框颜色">
            <a-input
                    type="color"
                    v-model="attr.stroke"
                    @change="setAttr('stroke')"
            />
        </a-form-model-item>
        <a-form-model-item label="边框宽度">
            <a-slider
                    :defaultGValue="attr.strokeWidth"
                    :min="1"
                    :max="5"
                    @change="setAttr('strokeWidth')"
                    v-model="attr.strokeWidth"
            />
        </a-form-model-item>
        <a-form-model-item label="背景颜色">
            <a-input
                    type="color"
                    v-model="attr.fill"
                    @change="setAttr('fill')"
            />
        </a-form-model-item>
        <a-form-model-item label="字体大小">
            <a-input
                    type="number"
                    v-model="attr.fontSize"
                    @change="setAttr('fontSize')"
            />
        </a-form-model-item>
        <a-form-model-item label="字体颜色">
            <a-input
                    type="color"
                    v-model="attr.color"
                    @change="setAttr('color')"
            />
        </a-form-model-item>
        <a-form-model-item label="字体">
            <a-select v-model="attr.fontFamily" @change="setAttr('fontFamily')">
                <a-select-option
                        v-for="(item, i) in fontFamily"
                        :key="i"
                        :value="item">
                    {{ item }}
                </a-select-option>
            </a-select>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
import { mapState } from "vuex";
import { attrPath } from "./attrPath";

export default {
    name: "index",
    computed: {
        ...mapState('app', [
                'graph',
                'selectedCell',
                'cellId'
        ])
    },
    mounted() {
        this.getAttr();
    },
    data() {
        return {
            attr: {
                stroke: '', // 边框颜色
                strokeWidth: 1, // 边框宽度
                fill: '', // 背景颜色
                fontSize: 16, // 字体大小
                color: '', // 字体颜色,
                text: '',
                fontFamily: ''
            },
            attrPath,
            fontFamily: ['微软雅黑', '仿宋', '楷体', '隶书', '黑体', '宋体', '华文行楷', '华文楷体']
        }
    },
    watch: {
        cellId: function () {
            this.getAttr();
        },
    },
    methods: {
        getAttr() {
            for (const key in this.attrPath) {
                this.attr[key] = this.selectedCell.attr(this.attrPath[key]);
            }
        },
        setAttr(key) {
            this.selectedCell.attr(this.attrPath[key], this.attr[key])
        }
    }
};
</script>

<style scoped>

</style>
