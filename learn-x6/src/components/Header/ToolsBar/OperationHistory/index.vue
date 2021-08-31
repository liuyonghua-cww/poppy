<template>
    <div class="operation-history">
       <i
               class="iconfont icon-undo"
               @click="undo"
       ></i>
       <i
               class="iconfont icon-redo"
               @click="redo"
       ></i>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "index",
    computed: {
        ...mapState('app', [
                'graph'
        ])
    },
    methods: {
        undo() {
            this.graph.history.undo();
        },
        redo() {
            this.graph.history.redo();
        }
    }
};
</script>

<style scoped lang="less">
.operation-history {
    > i {
        font-size: 20px;
        cursor: pointer;
        display: inline-block;
        &:first-child {
            margin-left: 0;
            margin-right: 16px;
        }
    }
}
</style>
