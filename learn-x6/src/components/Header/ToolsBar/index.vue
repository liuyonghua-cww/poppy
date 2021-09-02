<template>
    <div class="toolBar">
        <!--redo undo-->
        <operation-history />
        <a-divider type="vertical" />
        <node-attr />
        <a-divider type="vertical" />
    </div>
</template>

<script>
import OperationHistory from './OperationHistory';
import NodeAttr from './CellAttr';
export default {
    name: "index",
    components: {
        OperationHistory,
        NodeAttr
    }
};
</script>

<style scoped lang="less">
.toolBar {
    width: 100%;
    height: 45px;
    padding: 0 20px;
    display: flex;
    align-items: center;
}
</style>
