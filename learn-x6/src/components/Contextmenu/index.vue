<template>
    <div class="contextmenu" :style="contextmenuStyle">
        <a-card>
            <a-card-grid class="grid" @click="up">
                上移一层
            </a-card-grid>
            <a-card-grid class="grid" @click="down">
                下移一层
            </a-card-grid>
            <a-card-grid
                    class="grid"
                    @click="setData"
                    :hoverable="contextmenuNode.prop('name').includes('chart')"
                    :class="{'contextmenu-disable': !contextmenuNode.prop('name').includes('chart')}"
            >
                数据设置
            </a-card-grid>
        </a-card>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "index",
    props: {
        contextmenuStyle: {
            type: Object,
            default: null
        }
    },
    computed: {
        ...mapState('app', ['contextmenuNode'])
    },
    data() {
        return {
        }
    },
    methods: {
        up(e) {
            e.stopPropagation();
            e.preventDefault();

        },
        down(e) {
            e.stopPropagation();
            e.preventDefault();

        },
        setData(e) {
            e.stopPropagation();
            e.preventDefault();
            this.$emit('setEditorVisible', true); // 显示编辑框
            this.$emit('setContextMenuStyle', null); // 隐藏右键菜单

        }
    }
};
</script>

<style scoped lang="less">
.contextmenu {
    position: fixed;
    left: -99999px;
    width: 150px;
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.15) !important;
    .grid {
        width: 100%;
        padding: 8px 8px 8px 20px;
        cursor: pointer;
    }
}
.contextmenu-disable {
    cursor: not-allowed!important;
    background-color: #f5f5f5;
}

</style>
