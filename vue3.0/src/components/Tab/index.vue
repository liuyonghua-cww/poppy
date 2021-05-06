<template>
    <div class="tab-wrapper">
        <nav-bar :navData="navData"/>
        <page :cityData="cityData"/>
    </div>
</template>

<script>
import NavBar from './NavBar';
import Page from './Page';

export default {
    components: {
        NavBar,
        Page
    },
    setup() {
        const navData = ['北京', '上海', '广州', '长沙'];
        const cityData = ['北京111', '上海111', '广州111', '长沙111'];
        return {
            navData,
            cityData
        }
    }
}
</script>

<style scoped lang="scss">
.tab-wrapper {
    width: 400px;
    height: 400px;
    border: 1px solid #f10215;
    margin: 50px auto;
}
</style>
