<template>
    <div
        :class="['nav-item', {'active': index === curIndex}]"
        @click="changeTabIndex"
    >
        {{item}}
    </div>
</template>

<script>
import { getCurrentInstance, computed} from "vue";

export default {
    name: "NavItem",
    props: {
        item: String,
        index: Number
    },
    setup(props) {
        // 获取到执行级上下文
        const { ctx } = getCurrentInstance();
        const store = ctx.$store;
        const changeTabIndex = () => {
            store.commit('setTabIndex', props.index)
        }
        return {
            curIndex: computed(() => store.state.tabIndex),
            changeTabIndex
        }
    }

}
</script>

<style scoped lang="scss">
.nav-item {
    flex: 1;
}
.active {
    background-color: #5bdbb7;
}

</style>
