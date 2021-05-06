<template>
    <div class="nav-bar">
        <nav-item
            v-for="(item, index) of navData"
            :item="item"
            :key="index"
            :index="index"
        />
    </div>
</template>

<script>
import NavItem from "./NavItem";
export default {
    components: {
        NavItem
    },
    props: {
        navData: Array
    }
}
</script>

<style scoped lang="scss">
.nav-bar {
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
    > .nav-item {
        border-right: 1px solid #f10215;
        border-bottom: 1px solid #f10215;
    }
    > .nav-item:last-child {
        border-right: none;
    }
}

</style>
