<template>
    <div>
        <form @submit="submitText">
            <input
                type="text"
                v-model.trim="todoText"
            >
        </form>
    </div>
</template>

<script>
export default {
    name: "tdForm",
    data() {
        return {
            todoText: ''
        }
    },
    methods: {
        submitText(e) {
            e.preventDefault();
            if (this.todoText.length === 0) {
                return;
            }
            this.$emit('dispatch', 'ADD', {
                id: Date.now(),
                text: this.todoText,
                completed: false
            });
            this.todoText = '';
        }
    }
}
</script>

<style scoped>

</style>
