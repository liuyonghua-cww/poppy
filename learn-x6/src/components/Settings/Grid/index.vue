<template>
    <section id="grid_opt">
        <a-form-model :label-col="{span: 10}" :wrapper-col="{span: 12, offset: 1}">
            <a-form-model-item label="网格类型">
                <a-select v-model="option.type" placeholder="选择网格类型" @change="onChangeGrid">
                    <a-select-option
                        v-for="(item, i) in gridType"
                        :key="i"
                        :value="item.value">
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="网格尺寸">
                <a-slider
                        :defaultGValue="option.size"
                        :min="1"
                        :max="20"
                        @change="onChangeGridSize"
                        v-model="option.size"
                />
            </a-form-model-item>
            <template v-if="option.type !== 'doubleMesh'">
                <a-form-model-item label="网格线/点颜色">
                    <a-input
                            type="color"
                            v-model="option.color"
                            @change="onChangeGrid"
                    />
                </a-form-model-item>
                <a-form-model-item label="网格线宽度/点大小">
                    <a-slider
                            :defaultGValue="option.thickness"
                            :min="1"
                            :max="10"
                            @change="onChangeGrid"
                            v-model="option.thickness"
                    />
                </a-form-model-item>
            </template>
            <template v-if="option.type === 'doubleMesh'">
                <a-form-model-item label="主网格线颜色">
                    <a-input
                            type="color"
                            v-model="option.color"
                            @change="onChangeGrid"
                    />
                </a-form-model-item>
                <a-form-model-item label="主网格线宽度">
                    <a-slider
                            :defaultGValue="option.thickness"
                            :min="1"
                            :max="10"
                            @change="onChangeGrid"
                            v-model="option.thickness"
                    />
                </a-form-model-item>
                <a-form-model-item label="次网格线颜色">
                    <a-input
                            type="color"
                            v-model="option.secondaryColor"
                            @change="onChangeGrid"
                    />
                </a-form-model-item>
                <a-form-model-item label="次网格线宽度">
                    <a-slider
                            :defaultGValue="option.secondaryThickness"
                            :min="1"
                            :max="10"
                            @change="onChangeGrid"
                            v-model="option.secondaryThickness"
                    />
                </a-form-model-item>
                <a-form-model-item label="主次网格线间隔">
                    <a-slider
                            :defaultGValue="option.factor"
                            :min="1"
                            :max="10"
                            @change="onChangeGrid"
                            v-model="option.factor"
                    />
                </a-form-model-item>
            </template>
        </a-form-model>
    </section>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "index",
    data() {
        return {
            gridType: [
                {
                    value: 'dot',
                    label: 'dot'
                },
                {
                    value: 'fixedDot',
                    label: 'fixed Dot'
                },
                {
                    value: 'mesh',
                    label: 'mesh'
                },
                {
                    value: 'doubleMesh',
                    label: 'double Mesh'
                }
            ],
            option: {
                visible: true,
                type: '', // 类型
                size: 0, // 网格大小
                color: '', // 网格线/点颜色/主网格线颜色
                thickness: 0, // 网格线宽度/网格点大小/主网格线宽度
                secondaryColor: '', // 次网格线颜色
                secondaryThickness: 0, // 次网格线宽度
                factor: 0 // 主次网格线间隔
            }
        }
    },
    mounted() {
        this.getGridAttr()
    },
    computed: {
        ...mapState('app', [
                'graph'
        ])
    },
    methods: {
        getGridAttr() {
            const {args, size, type, visible} = this.graph.grid.grid;
            this.option.visible = visible;
            this.option.type = type || 'dot';
            this.option.size = size || 10;
            this.option.color = args[0].color || '#aaaaaa';
            this.option.thickness = args[0].thickness || 1;
            if (args[1]) {
                this.option.secondaryColor = args[1].color || '#888888';
                this.option.secondaryThickness = args[1].thickness || 3;
                this.option.factor = args[1].factor || 4;
            }
            console.log(this.option);
        },
        onChangeGridSize() {
            this.graph.setGridSize(this.option.size);
        },
        onChangeGrid() {
            let opt;
            if (this.option.type === 'doubleMesh') {
                opt = {
                    type: this.option.type,
                    args: [
                        {
                            color: this.option.color,
                            thickness: this.option.thickness,
                        },
                        {
                            color: this.option.secondaryColor,
                            thickness: this.option.secondaryThickness,
                            factor: this.option.factor
                        }
                    ]
                }
            } else {
                opt = {
                    type: this.option.type,
                    args: {
                        color: this.option.color,
                        thickness: this.option.thickness,
                    }
                }
            }
            this.graph.drawGrid(opt);
        },
        onChangeGridVisible() {
            this.option.visible && this.graph.showGrid();
            !this.option.visible && this.graph.hideGrid();
        }
    }
};
</script>

<style scoped lang="scss" src="@/assets/gridOption.scss"></style>
