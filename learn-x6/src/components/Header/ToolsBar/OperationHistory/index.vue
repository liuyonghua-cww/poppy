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
        <i
                class="iconfont icon-clear"
                @click="clear"
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
        },
        clear() {
            this.graph.clearCells();
        }
    }
};
</script>

<style scoped lang="less">
.operation-history {
    flex-shrink: 0;
    > i {
        font-size: 20px;
        cursor: pointer;
        display: inline-block;
        &:nth-child(2) {
            margin: 0 16px;
        }
    }
}
</style>
