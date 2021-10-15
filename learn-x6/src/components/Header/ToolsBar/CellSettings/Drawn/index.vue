<template>
    <div class="drawn btn-item">
        <a-button
                @click="drawnLine"
        >
            <i class="iconfont icon-huizhi-01"></i>
        </a-button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "index",
    computed: {
      ...mapState('app', ['graph'])
    },
    methods: {
        // 绘制线条
        drawnLine() {

        }
    }
};
</script>

<style scoped lang="less">
.drawn.btn-item {
    > .ant-btn {
        width: 32px;
        height: 32px;
        padding: 0;
        > i {
            height: 100%;
            font-size: 20px;
            text-align: center;
            line-height: 30px;
        }
    }
}

</style>
