<template>
    <section id="node_opt">
        <a-form-model :label-col="{span: 4, offset: 1}" :wrapper-col="{span: 18}" layout="inline">
            <!--节点属性-->
            <a-form-model-item label="x">
                <a-input
                        v-model="position.x"
                />
            </a-form-model-item>
            <a-form-model-item label="y">
                <a-input
                        v-model="position.y"
                />
            </a-form-model-item>
            <!--元素属性-->
        </a-form-model>
    </section>
</template>

<script>
import { mapState } from "vuex";
import { Mouse } from "@/events/mouse";
export default {
    name: "index",
    computed: {
        ...mapState('app', [
                'graph',
                'selectedCell',
                'cellId'
        ])
    },
    data() {
        return {
            position: {x: 0, y: 0}, // 节点的位置
        }
    },
    mounted() {
        this.getNodeProp();
        this.nodeMoving();
    },
    watch: {
        cellId: function (){
            this.getNodeProp();
        }
    },
    methods: {
        getNodeProp() {
            this.position = this.selectedCell.prop('position');
        },
        nodeMoving() {
            new Mouse(this.graph)._nodeMoving((position) =>{
                this.position = position;
            })
        }
    }
};
</script>

<style scoped lang="scss" src="../../../../assets/styles/node-option.scss">

</style>
