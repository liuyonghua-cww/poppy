<template>
    <section id="settings">
        <div class="title">
            <span
                v-if="configType === CONFIG_TYPE.GRID"
            >
                网格配置
            </span>
        </div>
        <grid-option
                v-if="configType === CONFIG_TYPE.GRID"
        />
    </section>
</template>

<script>
import GridOption from './Grid';
import { mapState } from "vuex";
import { CONFIG_TYPE } from "@/events/mouse";

export default {
    name: "index",
    components: {
        GridOption
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

<style scoped lang="scss">
#settings {
    > .title {
        height: 50px;
        width: 100%;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid #dfe3e8;
    }
    width: 100%;
    height: 100%;
    border-left: 1px solid #dfe3e8;

    /deep/ .ant-form-item {
        margin-bottom: 10px;
    }

}
</style>
