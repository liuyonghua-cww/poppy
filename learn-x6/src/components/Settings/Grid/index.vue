<template>
    <section id="grid_opt">
        <a-form-model :label-col="{span: 8}" :wrapper-col="{span: 14, offset: 1}">
            <a-form-model-item label="网格类型">
                <a-select v-model="option.type" placeholder="选择网格类型">
                    <a-select-option
                        v-for="(item, i) in gridType"
                        :key="i"
                        :value="item.value">
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
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
                type: null, // 类型
                size: null, // 网格大小
                color: null, // 网格线/点颜色/主网格线颜色
                thickness: null, // 网格线宽度/网格点大小/主网格线宽度
                secondaryColor: null, // 次网格线颜色
                secondaryThickness: null, // 次网格线宽度
                factor: null // 主次网格线间隔
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
            this.option.type = type;
            this.option.size = size;
            this.option.color = args[0].color;
            this.option.thickness = args[0].thickness;
            if (args[1]) {
                this.option.secondaryColor = args[1].color;
                this.option.secondaryThickness = args[1].thickness;
                this.option.factor = args[1].factor;
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
