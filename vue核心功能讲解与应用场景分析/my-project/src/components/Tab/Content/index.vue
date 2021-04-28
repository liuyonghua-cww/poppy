<template>
    <div class="teb-content">
        {{ contentData[curIndex]}}
    </div>
</template>

<script>
export default {
    name: "index",
    props: {
        contentData: Array,
        curIndex: Number
    }
}
</script>

<style scoped>

</style>
