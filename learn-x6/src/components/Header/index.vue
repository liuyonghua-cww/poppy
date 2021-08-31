<template>
    <section id="header-container">
        <!--<div></div>-->
        <!--<tool-bar />-->
        <!--<global-setting />-->
        <menus />
        <tool-bar />
    </section>
</template>

<script>
// import GlobalSetting from '@/components/Header/GlobalSetting'
// import ToolBar from './ToolBar'
import Menus from './Menus'
import ToolBar from './ToolsBar'
export default {
    name: "index",
    components: {
        Menus,
        ToolBar
    }
};
</script>

<style scoped lang="less">
#header-container {
    height: 100%;
    width: 100%;
}

</style>
