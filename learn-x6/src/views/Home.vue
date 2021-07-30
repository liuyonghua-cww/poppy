<template>
    <div id="main">
        <!--模板-->
        <div id="stencil-wrap" :style="stencilStyle">
            <stencil />
        </div>
        <!--画布区域-->
        <div id="content">
           <graph-content />
        </div>
        <!--配置：节点、画布-->
        <div id="configuration" :style="configurationStyle"></div>
    </div>
</template>

<script>
import graphContent from '@/components/Content'
import stencil from '@/components/Stencil'

export default {
    name: 'Home',
    components: {
        graphContent,
        stencil
    },
    data() {
        return {
            stencilStyle: {
                width: '200px',
                height: '100%'
            },
            configurationStyle: {
                width: '200px',
                height: '100%',
                backgroundColor: '#d5fcfc'
            }
        };
    },
};
</script>

<style scoped lang="scss">
#main {
    width: 100%;
    height: 100%;
    display: flex;
    > #content {
        flex: 1;
        overflow: hidden;
    }
}
</style>
