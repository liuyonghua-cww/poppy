<template>
    <counter></counter>
    <calculate/>
    <hr>
    <todo-list></todo-list>
</template>

<script>
import Counter from '@/components/counter';
import Calculate from '@/components/calculate';
import TodoList from '@/components/todoList'

export default {
    name: "Home",
    components: {
        Counter,
        Calculate,
        TodoList
    }
};
</script>
