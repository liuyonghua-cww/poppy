<template>
    <div class="content">
        {{cityData[curIndex]}}
    </div>
</template>

<script>
import {computed, getCurrentInstance} from "vue";

export default {
    props: {
        cityData: Array
    },
    setup() {
        const { ctx: { $store: store } } = getCurrentInstance();
        return {
            curIndex: computed(() => store.state.tabIndex)
        }
    }
}
</script>

<style scoped lang="scss">
.content {
    width: 100%;
    height: calc(100% - 50px);
}

</style>
