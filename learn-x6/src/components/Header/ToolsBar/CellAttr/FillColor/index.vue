<template>
    <div class="fill-color">
        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
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
                <a-form-item label="渐变方向">
                    <a-select v-model="direction" @change="changeDirection">
                        <a-select-option
                                v-for="(item, i) of linearGradientDirection"
                                :value="item.value"
                        >
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </template>
            <template v-if="type === 'linearGradient' || type === 'radialGradient'">
               <div class="color-range">
                   <a-input
                           v-model="stops[0].color"
                           type="color"
                           @change="onChange"
                   />
                   <a-button @click="exchangeColor">
                       <i class="iconfont icon-icon_exchange"></i>
                   </a-button>
                   <a-input
                           v-model="stops[1].color"
                           type="color"
                           @change="onChange"
                   />
               </div>
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
import { isObject, isString } from "@/utils/types";

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
            };
        },
    },
    data() {
        return {
            fillType: [ { label: '纯色背景', value: 'solidColor' }, { label: '线性渐变', value: 'linearGradient' } ],
            type: null,
            stops: [
                { offset: '0%', color: '#b1d8ff' },
                { offset: '100%', color: '#759cc3' },
            ],
            // 定义几个渐变的方向
            linearGradientDirection: [
                { label: '上', value: 'top' },
                { label: '下', value: 'bottom' },
                { label: '左', value: 'left' },
                { label: '右', value: 'right' },
                { label: '左上', value: 'leftTop' },
                { label: '左下', value: 'leftBottom' },
                { label: '右上', value: 'rightTop' },
                { label: '右下', value: 'rightBottom' },
            ],
            direction: 'bottom',
            // 不同方向上的值
            linearGradientDirectionValue: {
                top: { x1: '0', y1: '1', x2: '0', y2: '0' },
                bottom: { x1: '0', y1: '0', x2: '0', y2: '1' },
                left: { x1: '1', y1: '0', x2: '0', y2: '0' },
                right: { x1: '0', y1: '0', x2: '1', y2: '0' },
                leftTop: { x1: '1', y1: '1', x2: '0', y2: '0' },
                leftBottom: { x1: '1', y1: '0', x2: '0', y2: '1' },
                rightTop: { x1: '0', y1: '1', x2: '1', y2: '0' },
                rightBottom: { x1: '0', y1: '0', x2: '1', y2: '1' }
            },
            attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
        };
    },
    created() {
        this.getFill();
        this.getDirection();
    },
    methods: {
        transferColor(v) {
            // 触发父组件的自定义事件并将值传给父组件
            this.$emit('setFillColor', v);
        },
        // 获取渐变的类型
        getFill() {
            if (isString(this.fill)) {
                this.type = 'solidColor';
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
        },
        getDirection() {
            for (const key in this.linearGradientDirectionValue) {
                if (Object.values(this.linearGradientDirectionValue[key]).join('') === Object.values(this.attrs).join('')) {
                    this.direction = key;
                }
            }
        },
        changeDirection() {
            this.attrs = this.linearGradientDirectionValue[this.direction];
            this.onChange();
        },
        // 交换起点、终点的颜色
        exchangeColor() {
            const {color: color1} = this.stops[0];
            const {color: color2} = this.stops[1];
            this.stops[0].color = color2;
            this.stops[1].color = color1;
            this.onChange();
        }
    }
};
</script>

<style lang="less" scoped>
.fill-color {
    width: 240px;
    padding: 10px;

    .ant-form-item {
        margin-bottom: 0;
    }
    .color-range {
        display: flex;
        justify-content: space-between;
        input {
            width: 30%;
        }
    }
}

</style>
