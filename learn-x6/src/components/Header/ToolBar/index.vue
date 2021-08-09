<template>
    <section id="toolbar">
        <div v-for="(item, i) of toolBarOpt">
            <i :class="['iconfont', item.icon]"></i>
            <span>{{ item.label }}</span>
        </div>
    </section>
</template>

<script>
import {toolBarOpt} from "./toolBarOpt";
export default {
    name: "index",
    data() {
        return {
            toolBarOpt
        }
    }
}
</script>

<style scoped lang="less">
#toolbar {
    display: flex;
    align-items: center;
    > div {
        width: 60px;
        height: 80%;
        cursor: pointer;
        > i, span {
            display: inline-block;
            width: 100%;
            text-align: center;
        }
        > i {
            height: 60%;
            font-size: 22px;
        }
        > span {
            height: 40%;
        }
        &:hover {
            color: @primary-5;
        }
    }
}

</style>
