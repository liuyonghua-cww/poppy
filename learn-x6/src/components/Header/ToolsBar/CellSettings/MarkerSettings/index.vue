<template>
    <div class="marker-settings">
        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
            <a-form-item label="类型">
                <a-select v-model="state.type" @change="onChange">
                    <a-select-option
                            v-for="(item, i) of markerType"
                            :value="item.value"
                            :key="i"
                    >
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <template v-if="state.type !== 'circle' && state.type !== 'circlePlus' && state.type !== 'ellipse'">
                <a-form-item label="宽度">
                    <a-input v-model="state.width" type="number" @change="onChange"/>
                </a-form-item>
                <a-form-item label="高度">
                    <a-input v-model="state.height" type="number" @change="onChange"/>
                </a-form-item>
                <a-form-item label="偏移量">
                    <a-slider v-model="state.offset" :default-value="state.offset" :max="50" :min="-50" @change="onChange"/>
                </a-form-item>
            </template>
            <template v-if="state.type === 'circle' || state.type === 'circlePlus'">
                <a-form-item label="半径">
                    <a-slider v-model="state.r" :default-value="state.r" :max="50" :min="1" @change="onChange"/>
                </a-form-item>
            </template>
            <template v-if="state.type === 'ellipse'">
                <a-form-item label="x轴半径">
                    <a-slider v-model="state.rx" :default-value="state.rx" :max="50" :min="1" @change="onChange"/>
                </a-form-item>
                <a-form-item label="y轴半径">
                    <a-slider v-model="state.ry" :default-value="state.ry" :max="50" :min="1" @change="onChange"/>
                </a-form-item>
            </template>
            <a-form-item label="填充颜色">
                <a-input v-model="state.fill" type="color" @change="onChange"/>
            </a-form-item>
            <a-form-item label="线条颜色">
                <a-input v-model="state.stroke" type="color" @change="onChange"/>
            </a-form-item>
            <a-form-item label="线条宽度">
                <a-slider v-model="state.strokeWidth" :default-value="state.strokeWidth" :max="5" :min="0" @change="onChange"/>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
    name: "index",
    props: {
        state: {
            type: Object
        }
    },
    data() {
        return {
            markerType: [
                { label: '实心箭头', value: 'block' },
                { label: '经典箭头', value: 'classic' },
                { label: '菱形箭头', value: 'diamond' },
                { label: '交叉箭头', value: 'cross' },
                { label: '圆形箭头', value: 'circle' },
                { label: '圆形加号箭头', value: 'circlePlus' },
                { label: '椭圆箭头', value: 'ellipse' },

            ]
        };
    },
    methods: {
        onChange() {
            const { type, r, rx, ry, width, height, offset, ...others } = this.state;
            let state;
            switch (type) {
                case 'block':
                case 'classic':
                case 'diamond':
                case 'cross':
                    state = { type, width, height, offset, ...others, };
                    break;
                case 'circle':
                case 'circlePlus':
                    state = { type, r, ...others, };
                    break;
                case 'ellipse':
                    state = { type, rx, ry, ...others };
                    break;
            }
            this.$emit('setMarker', state);
        }
    }
};
</script>

<style lang="less" scoped>
.marker-settings {
    width: 240px;

    .ant-form-item {
        margin-bottom: 0;
    }
}
</style>
