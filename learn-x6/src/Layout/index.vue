<template>
    <a-layout id="components-layout" class="components-layout" :style="{height: '100%'}">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <header-container />
        </a-layout-header>
        <a-layout-content :style="{ padding: '0', marginTop: '64px' }">
            <div :style="{ background: '#fff', padding: '0', height: '100%' }">
                <router-view />
            </div>
        </a-layout-content>
    </a-layout>
</template>
<script>
import HeaderContainer from '@/components/Header'
export default {
    components: {
        HeaderContainer
    }
}
</script>
<style lang="less">
#components-layout .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
}

.components-layout {
    .ant-layout-header {
        box-shadow: @layout-bg-boxShow !important;
        line-height: unset !important;
        background: linear-gradient(to bottom, @header1, @header2)!important;
    }
}
</style>
