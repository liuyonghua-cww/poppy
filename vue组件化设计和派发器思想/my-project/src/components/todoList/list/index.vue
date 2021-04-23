<template>
    <div>
        <ul>
            <list-item
                v-for="(item, index) of todoData"
                :key="index"
                :item="item"
                @handleItem="handleItem"
            />
        </ul>
    </div>
</template>

<script>
import ListItem from './listItem'
export default {
    components: {
        ListItem
    },
    props: {
        todoData: Array
    },
    methods: {
        handleItem(...args) {
            this.$emit('dispatch', ...args)
        }
    }
}
</script>

<style scoped>

</style>
