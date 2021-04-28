<template>
    <div :class="['nav-item', {'active': index === curIndex}]">{{item}}</div>
</template>

<script>
export default {
    props: {
        item: String,
        index: Number,
        curIndex: Number
    }
}
</script>

<style scoped lang="scss">
.nav-item {
    height: 100%;
    flex: 1;
    line-height: inherit;
    text-align: center;
}
.active {
    background-color: #19498b;
    color: #ffffff;
}

</style>
