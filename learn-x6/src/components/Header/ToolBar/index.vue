<template>
    <section id="toolbar">
        <div v-for="(item, i) of toolBarOpt" @click="handleClick(item.type)">
            <i :class="['iconfont', item.icon]"></i>
            <span>{{ item.label }}</span>
        </div>
        <a-popover placement="bottom" arrow-point-at-center>
            <template slot="content">
                <h1>111</h1>
            </template>
            <div>
                <i :class="['iconfont', 'icon-zhuti']"></i>
                <span>{{ '主题' }}</span>
            </div>
        </a-popover>
    </section>
</template>

<script>
import {toolBarOpt} from "./toolBarOpt";
import { mapState } from "vuex";
export default {
    name: "index",
    computed: {
        ...mapState('app', [
           'graph'
        ])
    },
    data() {
        return {
            toolBarOpt,
            zoom: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getZoom();
            this.graph.on('scale', () => {
                this.getZoom()
            })
        })
    },
    updated() {

    },
    methods: {
        handleClick(type) {
            const { graph } = this;
            switch (type) {
                case 'undo':
                    graph.history.undo();
                    break;
                case 'redo':
                    graph.history.redo();
                    break;
                case 'save':
                    graph.toPNG()
                    break;
                case 'delete':
                    graph.remove(graph.getSelectedCells())
                    break;
                case 'zoomout':
                    if (this.zoom > 0.5) {
                        graph.zoom(-0.1)
                    }
                    break;
                case 'zoomin':
                    if (this.zoom < 1.5) {
                        graph.zoom(0.1)
                    }
                    break;
            }
        },
        getZoom() {
            this.zoom = this.graph.zoom()
        }
    }
}
</script>

<style scoped lang="less">
#toolbar {
    display: flex;
    align-items: center;
    > div {
        width: 60px;
        height: 80%;
        cursor: pointer;
        > i, span {
            display: inline-block;
            width: 100%;
            text-align: center;
        }
        > i {
            height: 60%;
            font-size: 22px;
        }
        > span {
            height: 40%;
            user-select: none;
        }
        &:hover {
            color: @primary-5;
        }
    }
}

</style>
