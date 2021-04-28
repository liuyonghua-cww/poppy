<template>
    <div class="tab-nav">
        <item
            v-for="(item, index) of navData"
            :key="index"
            :index="index"
            :item="item"
            :curIndex="curIndex"
        />
    </div>
</template>

<script>
import Item from './Item'
export default {
    components: {
        Item
    },
    props: {
        navData: Array,
        curIndex: Number
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped lang="scss">
.tab-nav {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid skyblue;
    display: flex;
    align-content: center;
    justify-content: center;
    > .nav-item {
        border-right: 1px solid skyblue;
    }
    > .nav-item:last-child {
        border-right: 0
    }
}

</style>
