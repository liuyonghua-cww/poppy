<template>
    <a-modal v-model="editorVisible" title="Basic Modal">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-modal>
</template>

<script>
export default {
    name: "MonacoEditor",
    props: {
        editorVisible: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>

</style>
