<template>
    <a-layout id="components-layout-demo-fixed" :style="{height: '100%'}">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <div class="logo" />
            <!--<a-menu-->
            <!--        theme="dark"-->
            <!--        mode="horizontal"-->
            <!--        :default-selected-keys="['2']"-->
            <!--        :style="{ lineHeight: '64px' }"-->
            <!--&gt;-->
            <!--    <a-menu-item key="1">-->
            <!--        nav 1-->
            <!--    </a-menu-item>-->
            <!--    <a-menu-item key="2">-->
            <!--        nav 2-->
            <!--    </a-menu-item>-->
            <!--    <a-menu-item key="3">-->
            <!--        nav 3-->
            <!--    </a-menu-item>-->
            <!--</a-menu>-->
        </a-layout-header>
        <a-layout-content :style="{ padding: '0', marginTop: '64px' }">
            <div :style="{ background: '#fff', padding: '0', height: '100%' }">
                <router-view />
            </div>
        </a-layout-content>
    </a-layout>
</template>
<style>
#components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
}
</style>
