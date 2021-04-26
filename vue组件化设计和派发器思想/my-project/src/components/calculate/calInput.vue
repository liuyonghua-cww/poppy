<template>
    <div>
        <label>
            <input
                type="text"
                value="0"
                @input="setNumber"
            >
        </label>
    </div>
</template>

<script>
export default {
    name: "calInput",
    props: {
        field: String

    },
    methods: {
        setNumber(e) {
            this.$emit('dispatch', 'SET_NUMBER', this.field, Number(e.target.value))
        }
    },
    created() {

    },
    mounted() {
        console.log(this.field);
    }
}
</script>

<style scoped>

</style>
