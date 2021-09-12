<template>
    <a-modal :visible="editorVisible" title="Basic Modal" @cancel="handleModal">
        <MonacoEditor class="editor" v-model="code" language="javascript" />
    </a-modal>
</template>

<script>
import MonacoEditor from 'vue-monaco'
export default {
    name: "MonacoEditor",
    components: {
        MonacoEditor
    },
    props: {
        editorVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            code: 'const noop = () => {}'
        }
    },
    methods: {
        handleModal() {
            this.$emit('setEditorVisible', false)
        }
    }
};
</script>

<style scoped>
.editor {
    width: 600px;
    height: 800px;
}
</style>
