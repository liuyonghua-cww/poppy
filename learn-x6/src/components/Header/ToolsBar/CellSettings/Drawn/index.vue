<template>
    <div class="drawn btn-item">
        <a-button @click="drawnLine">
            <i class="iconfont icon-huizhi-01"></i>
        </a-button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "index",
    computed: {
        ...mapState("app", [ "graph", "isInit" ]),
    },
    data() {
        return {
            beginDrawn: false, // 开始绘制线条
            isDrawning: false, // 正在绘制线条
            points: [], // 鼠标移动时经过坐标的集合
            edge: null, // 默认线条
        };
    },
    watch: {
        isInit(newV) {
            if (newV) {
                this.createEdge();
                this._addEventListener();
            }
        },
    },
    created() {
    },
    mounted() {
    },

    methods: {
        // 绘制线条
        drawnLine() {
            //禁用画布的框选功能
            this.graph.disableSelection();
            // 开始绘制线条
            this.beginDrawn = true;
            // 鼠标样式改为钢笔
            const container = this.graph.container;
            container.style.cursor = "url('/images/cursor.ico'), auto";
            this.graph.on("blank:mousemove", ({ e, x, y }) => {
                if (!this.beginDrawn) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                this.points.push({ x, y });
                // 去重
                let arr = [ ...this.points ];
                arr = arr.map((item) => JSON.stringify(item));
                arr = [ ...new Set(arr) ];
                arr = arr.map((item) => JSON.parse(item));
                if (arr.length > 2) {
                    const source = arr[ 0 ];
                    const target = arr[ arr.length - 1 ];
                    const vertices = arr.slice(1, arr.length - 2);

                    this.edge.setSource(source);
                    this.edge.setTarget(target);
                    this.edge.setVertices(vertices);
                    if (!this.isDrawning) {
                        this.graph.addEdge(this.edge);
                    }
                    this.isDrawning = true;
                }
            });
        },

        // 创建默认的线条
        createEdge() {
            const edge = this.graph.createEdge({
                source: {},
                target: {},
                vertices: [],
                connector: { name: "smooth" },
                attrs: {
                    line: {
                        targetMarker: {
                            name: "block",
                            size: 1,
                        },
                    },
                },
            });
            this.edge = edge;
            console.log(this.edge);
        },

        // 监听事件
        _addEventListener() {
            this.graph.on("blank:mouseup", () => {
                this.cancelDrawn();
            });
            document.addEventListener("keydown", (e) => {
                if (e.code === 'Escape') {
                    console.log('esc click');
                    this.graph.container.style.cursor = "grab";
                    this.cancelDrawn();
                    this.beginDrawn = false;
                    this.graph.enableSelection();
                }
            });
        },

        // 取消绘制
        cancelDrawn() {
            if (!this.isDrawning) {
                return;
            }
            // 如果已经进行了绘制
            this.points = []; // 清空坐标数组
            this.isDrawning = false;
            this.createEdge(); // 重新创建默认线条样式
        },
    },
};
</script>

<style lang="less" scoped>
.drawn.btn-item {
    > .ant-btn {
        width: 32px;
        height: 32px;
        padding: 0;

        > i {
            height: 100%;
            font-size: 20px;
            text-align: center;
            line-height: 30px;
        }
    }
}
</style>
