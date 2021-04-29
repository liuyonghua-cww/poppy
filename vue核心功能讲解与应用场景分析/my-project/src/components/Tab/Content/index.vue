<template>
    <div class="teb-content">
        {{ contentData[tabIndex]}}
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "index",
    props: {
        contentData: Array,
        curIndex: Number
    },
    computed: {
        ...mapState(['tabIndex'])
    }
}
</script>

<style scoped>

</style>
