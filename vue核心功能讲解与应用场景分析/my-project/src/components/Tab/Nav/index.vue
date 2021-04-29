<template>
    <div
        class="tab-nav"
        v-tab-current="{
            curIndex: tabIndex,
            className: 'nav-item',
            currentClassName: 'active'
        }"
    >
        <item
            v-for="(item, index) of navData"
            :key="index"
            :index="index"
            :item="item"
        />
    </div>
</template>

<script>
import Item from './Item';
import {mapState} from 'vuex';
import {tabCurrent} from '@/directives'
export default {
    components: {
        Item
    },
    props: {
        navData: Array,
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['tabIndex'])
    },
    directives: {
        tabCurrent
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
