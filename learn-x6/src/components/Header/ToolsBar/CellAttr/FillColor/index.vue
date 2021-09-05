<template>
    <div class="fill-color">
        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
            <a-form-item label="填充样式">
                <a-select v-model="type" @change="onChange">
                    <a-select-option
                        v-for="(item, i) of fillType"
                        :value="item.value"
                    >
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>

           <template v-if="type === 'linearGradient'">
               <a-form-item label="开始颜色">
                   <a-input
                       type="color"
                       v-model="stops[0].color"
                       @change="onChange"
                   />
               </a-form-item>
               <a-form-item label="结束颜色">
                   <a-input
                       type="color"
                       v-model="stops[1].color"
                       @change="onChange"
                   />
               </a-form-item>
               <a-form-item label="起点">
                   <a-input
                       type="number"
                       v-model="attrs.x1"
                       :step="0.1"
                       :min="0"
                       :max="1"
                       @change="onChange"
                   />
                   <a-input
                       type="number"
                       v-model="attrs.y1"
                       :step="0.1"
                       :min="0"
                       :max="1"
                       @change="onChange"
                   />
               </a-form-item>
               <a-form-item label="终点">
                   <a-input
                       type="number"
                       v-model="attrs.x2"
                       :step="0.1"
                       :min="0"
                       :max="1"
                       @change="onChange"
                   />
                   <a-input
                       type="number"
                       v-model="attrs.y2"
                       :step="0.1"
                       :min="0"
                       :max="1"
                       @change="onChange"
                   />
               </a-form-item>
           </template>
        </a-form>
        <sketch
            v-if="type === 'solidColor'"
            :value="solidColor"
            @input="transferColor($event.hex)"
        />
    </div>
</template>

<script>
import Sketch from 'vue-color/src/components/Sketch';
import {isObject, isString} from "@/utils/types";

export default {
    name: "index",
    components: {
        Sketch
    },
    props: {
        fill: {
            type: String | Object,
            default: ''
        }
    },
    computed: {
        solidColor() {
            return {
                hex: this.fill || '#ffffff'
            }
        },
    },
    data() {
        return {
            fillType: [{label: '纯色背景', value: 'solidColor'}, {label: '线性渐变', value: 'linearGradient'}],
            type: null,
            stops: [
                { offset: '0%', color: '#b1d8ff' },
                { offset: '100%', color: '#759cc3' },
            ],
            attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
        }
    },
    created() {
        this.getFill();
    },
    methods: {
        transferColor(v) {
            this.$emit('setFillColor', v)
        },
        getFill() {
            if (isString(this.fill)) {
                this.type = 'solidColor'
            }
            if (isObject(this.fill) && this.fill.type === 'linearGradient') {
                this.type = 'linearGradient';
                this.attrs = this.fill.attrs;
                this.stops = this.fill.stops;
            }
        },
        onChange() {
            if (this.type === 'solidColor') {
                this.transferColor(this.fill);
            }
            if (this.type === 'linearGradient') {
                this.transferColor({
                    type: 'linearGradient',
                    stops: this.stops,
                    attrs: this.attrs,
                });
            }
        }
    }
}
</script>

<style scoped lang="less">
.fill-color {
    width: 240px;
    padding: 10px;

    .ant-form-item {
        margin-bottom: 0;
    }
}

</style>
