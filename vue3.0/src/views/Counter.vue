<template>
    <div class="count">
        <p>{{ state.count }}</p>
        <button @click="add">+</button>
        <button @click="minus">-</button>
    </div>
</template>

<script>
// import { ref } from 'vue';
import {reactive} from 'vue';
export default {
    name: "Count",
   /* data() {
        return {
            count: 0
        };
    },
    methods: {
        add() {
            this.count++;
        },
        minus() {
            this.count--;
        }
    }*/
    /*setup() {
        let count = ref(0);
        const add = () => count.value ++;
        const minus = () => count.value --;
        return {
            count,
            add,
            minus
        }
    }*/
    setup() {
        // 声明一个响应式数据
        const state = reactive({
            count: 0
        });
        const add = () => state.count ++;
        const minus = () => state.count --;
        return {
            state,
            add,
            minus
        }
    }
};
</script>

<style scoped>

</style>
