<template>
    <section id="header-container">
        <div></div>
        <div></div>
        <global-setting />
    </section>
</template>

<script>
import GlobalSetting from '@/components/Header/GlobalSetting'
export default {
    name: "index",
    components: {
        GlobalSetting
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
