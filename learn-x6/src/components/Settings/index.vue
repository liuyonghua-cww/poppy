<template>
    <section id="settings">
        <div class="title">
            <span
                    v-if="configType === CONFIG_TYPE.GRID"
            >
                画布设置
            </span>
            <span
                    v-if="configType === CONFIG_TYPE.NODE"
            >
                节点设置
            </span>
            <span
                    v-if="configType === CONFIG_TYPE.EDGE"
            >
                边设置
            </span>
        </div>
        <graph-option
                v-if="configType === CONFIG_TYPE.GRID"
        />
        <cell-option
                v-if="configType === CONFIG_TYPE.NODE || configType === CONFIG_TYPE.EDGE"
                :configType="configType"
        />
    </section>
</template>

<script>
import GraphOption from './GraphOption';
import { mapState } from "vuex";
import { CONFIG_TYPE } from "@/events/mouse";
import CellOption from './Cell'

export default {
    name: "index",
    components: {
        GraphOption,
        CellOption
    },
    data() {
        return {
            CONFIG_TYPE
        };
    },
    computed: {
        ...mapState('app', [
            'configType'
        ])
    }
};
</script>

<style lang="less" scoped>
#settings {
    background-color: @component-background;
    > .title {
        height: 50px;
        width: 100%;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid @border-color-base;
    }

    width: 100%;
    height: 100%;
    border-left: 1px solid #dfe3e8;

    /deep/ .ant-form-item {
        margin-bottom: 10px;
    }

}
</style>
