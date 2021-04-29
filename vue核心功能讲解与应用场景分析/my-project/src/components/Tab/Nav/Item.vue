<template>
    <div
        class="nav-item"
        @click="changeTabIndex(index)"
    >
        {{ item }}
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    props: {
        item: String,
        index: Number,
    },
    computed: {
        ...mapState(['tabIndex'])
    },
    methods: {
        ...mapMutations(['changeTabIndex'])
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
