<template>
    <div class="theme-selection">
        <div
            v-for="(item, i) of options"
            :key="i"
            class="selection"
            :style="getStyle(item)"
            @click="_setCellTheme(item)"
        >
            Abc
        </div>
        <div class="selection add" title="自定义样式" @click="openModal">
            <i class="iconfont icon-add_1"></i>
        </div>

        <a-modal
                dialogClass="diy-cell-theme"
                v-model="visible"
                title="自定义样式"
                okText="确定"
                cancelText="取消"
                @ok="addStyle"
        >
            <a-form-model :label-col="{span: 7, offset: 1}" :wrapper-col="{span: 15}">
                <a-form-model-item label="背景颜色">
                    <a-input
                            type="color"
                            v-model="diyStyle.fill"
                    />
                </a-form-model-item>
                <a-form-model-item label="边框颜色">
                    <a-input
                            type="color"
                            v-model="diyStyle.stroke"
                    />
                </a-form-model-item>
                <a-form-model-item label="字体颜色">
                    <a-input
                            type="color"
                            v-model="diyStyle.color"
                    />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import {options} from "./options";
import {mapMutations, mapState} from "vuex";
export default {
    name: "index",
    data() {
        return {
            options,
            diyStyle: {
                stroke: '#000000',
                fill: '#ffffff',
                color: '#000000'
            }, // 自定义样式配置,
            visible: false
        }
    },
    computed: {
        ...mapState('app', [
            'graph'
        ])
    },
    methods: {
        ...mapMutations('setting', [
            'setCellTheme'
        ]),
        getStyle(option) {
            return {
                backgroundColor: option.fill,
                borderColor: option.stroke,
                color: option.color
            }
        },
        // 设置选中节点的样式
        _setCellTheme(option) {
            const cells = this.graph.getSelectedCells();
            for (const cell of cells) {
                if (cell.isNode()) {
                    cell.attr('body/fill', option.fill);
                    cell.attr('body/stroke', option.stroke);
                    cell.attr('label/fill', option.color)
                }
            }
            // 设置到 store
            this.setCellTheme(option);
        },

        openModal() {
            this.visible = true;
        },
        // 添加自定义样式
        addStyle() {
            const style = Object.assign({}, this.diyStyle);
            this.options.push(style);
            this.visible = false;
        }
    }
}
</script>

<style scoped lang="less">
.theme-selection {
    display: flex;
    padding-top: 10px;
    padding-left: 10px;
    width: 430px;
    flex-wrap: wrap;
    >.selection {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        border-width: 1px;
        border-style: solid;
        font-size: 16px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        text-align: center;
        line-height: 50px;
        transition: transform .2s;
        &:hover {
            transform: scale(1.05);
        }
    }
    > .add > i {
        font-size: 28px;
    }



}
</style>
