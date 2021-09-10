<template>
    <div id="main">
        <!--模板-->
        <div id="stencil-wrap" :style="stencilStyle">
            <stencil/>
        </div>
        <!--画布区域-->
        <div id="content">
            <graph-content/>
            <div id="minimap"></div>
        </div>
        <!--配置：节点、画布-->
        <!--<div id="configuration" :style="configurationStyle">-->
        <!--    <settings />-->
        <!--</div>-->
        <!--右键菜单-->
        <contextmenu
                :contextmenuStyle="contextmenuStyle"
        />
    </div>
</template>

<script>
import graphContent from '@/components/Content';
import stencil from '@/components/Stencil';
import Settings from '@/components/Settings';
import Contextmenu from '@/components/Contextmenu';
import { mapState } from "vuex";

export default {
    name: 'Home',
    components: {
        graphContent,
        stencil,
        Settings,
        Contextmenu
    },
    computed: {
        ...mapState('app', [
            'graph',
            'isInit'
        ]),
    },
    watch: {
        // 画布初始化完成
        isInit: function (newVal) {
            if (newVal) {
                this.onContextmenu();
            }
        }
    },
    mounted() {

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
            },
            contextmenuStyle: {}
        };
    },
    methods: {
        onContextmenu() {
            this.graph.on('node:contextmenu', ({ e, node, x, y }) => {
                // 右击节点动态改变 右键菜单的位置
                const { x: left, y: top } = this.graph.localToPage(x, y);
                this.contextmenuStyle = {
                    top: top + 10 + 'px',
                    left: left + 10 + 'px'
                };
            });
            document.addEventListener('click', () => {
                this.contextmenuStyle = null;
            });
        },
    }
};
</script>

<style lang="less" scoped>
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
