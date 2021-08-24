<template>
    <div>
        <div class="add-btn">
            <a-button type="primary" @click="open">
                更多图形
            </a-button>
        </div>
        <a-modal v-model="visible" title="全部图形" okText="确定" cancelText="取消" @ok="addShapes">
            <a-checkbox-group
                    v-model="selectTypes"
                    :options="shapes_type"
            />
        </a-modal>
    </div>
</template>

<script>
import { shapes_type, shapes } from './shapes'
export default {
    name: "index",
    data() {
        return {
            visible: false,
            selectTypes: [],
            shapes_type,
            shapes
        }
    },
    methods: {
        open() {
            this.visible = true;
        },
        addShapes() {
            const _shapes = {  };
            for (const item of this.selectTypes) {
                _shapes[item] = shapes[item]
            }
            this.visible = false;
            this.$emit('addShapes', _shapes)
        }
    }
};
</script>

<style scoped>

</style>
