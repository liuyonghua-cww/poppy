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
        <div class="selection add" title="自定义样式">
            <i class="iconfont icon-add_1"></i>
        </div>
    </div>
</template>

<script>
import {options} from "./options";
import {mapMutations, mapState} from "vuex";
export default {
    name: "index",
    data() {
        return {
            options
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
        _setCellTheme(option) {
            const cells = this.graph.getSelectedCells();
            for (const cell of cells) {
                if (cell.isNode()) {
                    cell.attr('body/fill', option.fill);
                    cell.attr('body/stroke', option.stroke);
                    cell.attr('label/fill', option.color)
                }
            }
            this.setCellTheme(option);
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
