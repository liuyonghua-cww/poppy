<template>
    <a-modal :visible="editorVisible" title="数据编辑" @cancel="handleModal">
        <Editor v-model="code" class="editor" language="JavaScript" @change="dataChange"/>
    </a-modal>
</template>

<script>
import Editor from 'vue-monaco';
import { mapState } from "vuex";

export default {
    name: "MonacoEditor",
    components: {
        Editor
    },
    props: {
        editorVisible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState('app', [ 'contextmenuNode' ])
    },
    watch: {
        contextmenuNode(v) {
            if (v) {
                this.getCode();
            }
        }
    },
    data() {
        return {
            code: '{ colkey: "col", colsinfo: "NameList" }'
        };
    },
    mounted() {
    },
    methods: {
        handleModal() {
            this.$emit('setEditorVisible', false);
        },
        dataChange(v) {
            // 实时更新数据
            this.contextmenuNode.updateData(
                    {
                        chartOption: v
                    }
            );
        },
        getCode() {
            this.code = this.contextmenuNode.getData().chartOption;
        }
    }
};
</script>

<style scoped>
.editor {
    width: 100%;
    height: 500px;
}
</style>
