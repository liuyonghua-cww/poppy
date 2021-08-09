<template>
    <section id="header-container">
        <div></div>
        <tool-bar />
        <global-setting />
    </section>
</template>

<script>
import GlobalSetting from '@/components/Header/GlobalSetting'
import ToolBar from './ToolBar'
export default {
    name: "index",
    components: {
        GlobalSetting,
        ToolBar
    }
};
</script>

<style scoped lang="less">
#header-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
}

</style>
