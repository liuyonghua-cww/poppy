<template>
    <!--<a-modal :visible="editorVisible" title="数据编辑" @cancel="handleModal" :footer="null">-->
    <!--    <Editor v-model="code" class="editor" language="JavaScript" @change="dataChange"/>-->
    <!--</a-modal>-->
    <a-drawer
            title="数据编辑"
            placement="right"
            :closable="false"
            :visible="editorVisible"
            @close="handleModal"
            :width="600"
            :maskStyle="{backgroundColor: 'transparent'}"
            :headerStyle="{height: '5%'}"
            :bodyStyle="{height: '94%'}"
    >
        <Editor v-model="code" class="editor" language="JavaScript" @change="dataChange"/>
    </a-drawer>
</template>

<script>
import Editor from 'vue-monaco';
import { mapState } from "vuex";
import VueDragResize from 'vue-drag-resize'
export default {
    name: "MonacoEditor",
    components: {
        Editor,
        VueDragResize
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
    height: 100%;
}
</style>
