<template>
    <div id="main">
        <!--模板-->
        <div id="stencil-wrap" :style="stencilStyle">
            <stencil />
        </div>
        <!--画布区域-->
        <div id="content">
            <graph-content />
            <div id="minimap"></div>
        </div>
        <!--配置：节点、画布-->
        <div id="configuration" :style="configurationStyle">
            <settings />
        </div>
    </div>
</template>

<script>
import graphContent from '@/components/Content'
import stencil from '@/components/Stencil'
import Settings from '@/components/Settings'

export default {
    name: 'Home',
    components: {
        graphContent,
        stencil,
        Settings
    },
    data() {
        return {
            stencilStyle: {
                width: '200px',
                height: '100%'
            },
            configurationStyle: {
                width: '300px',
                height: '100%',
            }
        };
    },
};
</script>

<style scoped lang="less">
#main {
    width: 100%;
    height: 100%;
    display: flex;
    > #content {
        flex: 1;
        overflow: hidden;
        position: relative;
        > #minimap {
            position: absolute;
            right: 20px;
            bottom: 20px;
            width: 200px;
            height: 200px;
            border: 1px solid @border-color-base;
            border-radius: 4px;
            background-color: @component-background;
        }
    }
}
</style>
