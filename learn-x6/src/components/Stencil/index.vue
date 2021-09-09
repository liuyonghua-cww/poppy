<template>
    <div id="stencil-con">
        <div id="stencil"></div>
        <more-shapes
            @addShapes="addShapes"
        />
    </div>
</template>

<script>
import {Addon, Graph} from "@antv/x6";
import {mapState} from "vuex";
import './shapes';
import "@antv/x6-vue-shape";
import '@/register/charts'
import {
    customType,
    ports_parallelogram,
    ports_pentagon,
    ports_triangle,
    registerCustomCircle, registerCustomPath, registerCustomPolygon,
    registerCustomRect
} from "@/components/Stencil/shapes";
import MoreShapes from './MoreShapes'
import {shapes_type} from './MoreShapes/shapes'
import * as echarts from "echarts";

export default {
    name: "index",
    components: {
        MoreShapes
    },
    computed: {
        ...mapState('setting', [
            'theme',
            'cellTheme'
        ]),
        ...mapState('app', ['graph'])
    },
    data() {
        return {
            stencil: null,
            groups: null,
            shapes: null, // 用户自定义添加的图形组
        };
    },
    watch: {
        // 主题颜色改变时 重新注册节点
        'theme.color': function (val) {
            for (const type of customType) {
                Graph.unregisterNode(type);
            }
            this.registerNode();
            // this.initGroups();
            // this.initStencil();
            !this.shapes && this.initShape();
            this.shapes && this.addShapes(this.shapes);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.registerNode();
            this.initGroups();
            this.initStencil();
            this.initShape();
        });
    },
    methods: {
        initGroups() {
            this.groups = [
                {
                    name: 'group1',
                    title: '基础图形',
                    graphHeight: 260
                },
                {
                    name: 'group2',
                    title: '流程图',
                    graphHeight: 220
                },
                {
                    name: 'group3',
                    title: '图表',
                    graphHeight: 220,
                    layoutOptions: {
                        columns: 1,
                        columnWidth: 190,
                        rowHeight: 150,
                        dx: 5
                    },
                },
            ]
        },
        // 初始化左侧面板
        initStencil() {
            const _this = this;
            this.stencil = new Addon.Stencil({
                title: '图形列表',
                target: this.graph,
                ...this.getStencilSize(),
                layoutOptions: {
                    columns: 4,
                    columnWidth: 48,
                    rowHeight: 40,
                    dx: 5
                },
                stencilGraphOptions: {
                    background: {
                        // color: '#fff'
                    }
                },
                groups: this.groups,
                collapsable: true,
                // 自定义放置到画布上的节点样式
                getDropNode(node, options) {
                    const size = node.size();
                    const _node = node.clone();
                    // 如果设置了节点的样式，则创建的时候应用此样式
                    if (_this.cellTheme) {
                        _node.attr('body/fill', _this.cellTheme.fill);
                        _node.attr('body/stroke', _this.cellTheme.stroke);
                        _node.attr('label/fill', _this.cellTheme.color)
                    }
                    return _node.size(size.width * 3, size.height * 3);
                },
                search(cell, keyword) {
                    return cell.prop('name').indexOf(keyword) > -1;
                },
                placeholder: '请输入...'
            });
            const stencilContainer = document.querySelector('#stencil');
            if (stencilContainer) {
                stencilContainer.appendChild(this.stencil.container);
            }
        },
        initShape() {
            const {graph} = this;
            const rect = graph.createNode({
                shape: 'custom-rect',
                name: 'rect'
            });
            const rounded_rect = graph.createNode({
                shape: 'custom-rect',
                name: 'rounded_rect',
                attrs: {
                    body: {
                        rx: 4,
                        ry: 4,
                    },
                },
            });
            const diamond = graph.createNode({
                shape: 'custom-polygon',
                name: 'diamond',
                attrs: {
                    body: {
                        refPoints: '0,10 10,0 20,10 10,20',
                    },
                },
            });
            const parallelogram = graph.createNode({
                shape: 'custom-polygon',
                name: 'parallelogram',
                attrs: {
                    body: {
                        refPoints: '10,0 40,0 30,10 0,10',
                    },
                },
                ports: ports_parallelogram
            });
            const circle = graph.createNode({
                shape: 'custom-circle',
                name: 'circle',
            });

            const triangle = graph.createNode({
                shape: 'custom-polygon',
                name: 'triangle',
                attrs: {
                    body: {
                        refPoints: '10,0 20,10 0,10',
                    },
                },
                ports: ports_triangle
            });

            const pentagon = graph.createNode({
                shape: 'custom-polygon',
                name: 'pentagon',
                attrs: {
                    body: {
                        refPoints: '5,0 10,8 8,20 2,20 0,8',
                    },
                },
                ports: ports_pentagon
            })

            const hexagon = graph.createNode({
                shape: 'custom-polygon',
                name: 'hexagon',
                attrs: {
                    body: {
                        refPoints: '4,0 16,0 20,10 16,20 4,20 0,10',
                    },
                },
            })

            const octagon = graph.createNode({
                shape: 'custom-polygon',
                name: 'octagon',
                width: 30,
                height: 30,
                attrs: {
                    body: {
                        refPoints: '5,0 15,0 20,5 20,15 15,20 5,20 0,15 0,5',
                    },
                },
            })

            const five_pointed_star = graph.createNode({
                shape: 'custom-path',
                name: 'five_pointed_star',
                // https://www.svgrepo.com/svg/13695/star
                path: 'M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956C22.602,0.567,25.338,0.567,26.285,2.486z',
            })

            const cloud = graph.createNode({
                shape: 'custom-path',
                name: 'cloud',
                width: 30,
                height: 20,
                path: 'M0 731.459874c0 144.991797 108.542977 265.294814 251.051287 288.522719l50.254084 4.017405 497.135601 0L808.521006 1022.612167l497.135601 1.387831 50.254084-4.017405C1498.419 996.754688 1606.961977 876.451671 1606.961977 731.459874c0-127.388259-83.854198-235.785148-200.943291-275.959198C1401.78215 203.207646 1189.809257 0 929.043154 0c-188.087595 0-350.755973 105.694272-428.474498 259.305228C463.827662 219.861616 410.651829 195.026749 351.486411 195.026749c-110.95342 0-200.870247 87.360297-200.870247 195.026749 0 28.121835 6.135673 54.855838 17.092232 79.033312C68.368928 516.857407 0 616.416006 0 731.459874z'
            })
            const dialog_box = graph.createNode({
                shape: 'custom-path',
                name: 'dialog_box',
                width: 30,
                height: 20,
                path: 'M0M949.0432 505.6512c2.3552-69.7344-44.032-142.4384-127.2832-199.3728-85.1968-58.368-200.9088-94.1056-317.3376-98.0992-7.2704-0.2048-14.5408-0.4096-21.8112-0.4096C238.592 207.872 88.064 345.9072 83.5584 479.4368c-2.4576 70.5536 36.9664 137.5232 110.8992 188.416 2.8672 1.9456 3.9936 5.632 2.7648 8.9088-13.7216 36.6592-45.1584 95.8464-109.4656 117.5552 10.24 1.6384 22.6304 2.9696 36.2496 2.9696 43.8272 0 106.7008-13.6192 156.672-78.2336 2.048-2.6624 5.5296-3.6864 8.6016-2.4576C351.232 739.9424 420.864 753.0496 496.3328 755.712c246.272 8.192 447.6928-104.5504 452.7104-250.0608z'
            })
            const apqc = graph.createNode({
                shape: 'custom-path',
                name: 'apqc',
                width: 30,
                height: 20,
                path: 'M28.444444 164.551111V995.555556h1365.333334V164.551111C1165.994667 73.784889 938.496 28.444444 711.111111 28.444444S256.227556 73.784889 28.444444 164.551111z'
            })
            const drip = graph.createNode({
                shape: 'custom-path',
                name: 'drip',
                width: 20,
                height: 30,
                path: 'M512 5.339429l16.7936 13.897142C800.416914 245.467429 936.228571 435.390171 936.228571 589.0048c0 235.1104-189.937371 425.706057-424.228571 425.706057S87.771429 824.1152 87.771429 589.0048C87.771429 432.259657 229.185829 237.714286 512 5.339429z'
            })
            const top_arrow = graph.createNode({
                shape: 'custom-path',
                name: 'top_arrow',
                width: 20,
                height: 30,
                path: 'M618.816 959.86800001l0-580.64900001 158.27 0-263.788-316.696L249.36 379.219l158.269 0L407.629 959.86800001l211.187 0z'
            })
            const bottom_arrow = graph.createNode({
                shape: 'custom-path',
                name: 'bottom_arrow',
                width: 20,
                height: 30,
                path: 'M405.184 64.13199999l0 580.64900001-158.27 0 263.788 316.696L774.64 644.781l-158.269 0L616.371 64.13199999l-211.187 0z'
            })
            const left_arrow = graph.createNode({
                shape: 'custom-path',
                name: 'left_arrow',
                width: 30,
                height: 20,
                path: 'M959.86800001 405.184l-580.64900001 0 0-158.27-316.696 263.788L379.219 774.64l0-158.269L959.86800001 616.371l0-211.187z'
            })
            const right_arrow = graph.createNode({
                shape: 'custom-path',
                name: 'right_arrow',
                width: 30,
                height: 20,
                path: 'M64.132 618.816h580.649v158.27l316.696-263.788L644.781 249.36v158.269H64.132v211.187z'
            })
            const corner = graph.createNode({
                shape: 'custom-path',
                name: 'corner',
                width: 30,
                height: 30,
                path: 'M835.353 274.868H274.647v559.736l158.707-140.736-2-261 265-1 138.999-157z'
            })
            const left_turn_around = graph.createNode({
                shape: 'custom-path',
                name: 'left_turn_around',
                width: 20,
                height: 30,
                path: 'M595.2 64c-128 0-230.4 108.8-230.4 243.2v371.2H192L409.6 960l217.6-288H454.4V300.8c0-76.8 64-140.8 134.4-140.8 76.8 0 140.8 64 140.8 140.8V960H832V300.8C832 166.4 723.2 64 595.2 64z'
            })
            const right_turn_around = graph.createNode({
                shape: 'custom-path',
                name: 'right_turn_around',
                width: 20,
                height: 30,
                path: 'M659.2 672V300.8c0-128-108.8-243.2-230.4-243.2C300.8 64 192 166.4 192 300.8V960h96V300.8c0-83.2 57.6-140.8 140.8-140.8 76.8 0 134.4 64 134.4 140.8v371.2H396.8L614.4 960l217.6-288h-172.8z'
            })
            const begin_end = graph.createNode({
                shape: 'custom-path',
                name: 'begin_end',
                width: 30,
                height: 15,
                path: 'M755.0224929138853,67.96896714510808 L974.7725091627465,67.96896714510808 L974.7725091627465,67.96896714510808 C1003.5603864652478,67.96896714510808 1026.897516152538,86.32530053027668 1026.897516152538,108.96897406235259 C1026.897516152538,131.61263953612516 1003.5603755928578,149.9689648629921 974.7725091627465,149.9689648629921 L755.0224929138853,149.9689648629921 L755.0224929138853,149.9689648629921 C726.2346482285953,149.9689648629921 702.8974859240891,131.61263953612516 702.8974859240891,108.96897406235259 C702.8974859240891,86.3252924719742 726.2346482285953,67.96896714510808 755.0224929138853,67.96896714510808 z'
            })

            const document = graph.createNode({
                shape: 'custom-path',
                name: 'document',
                width: 30,
                height: 20,
                path: 'M1024 256v508.992c-87.168-89.28-173.824-133.952-260.032-133.952C627.328 631.04 478.72 832 279.296 832c-84.224 0-177.28-22.336-279.296-67.008V256h1024z'
            })
            const sub_process = graph.createNode({
                shape: 'custom-path',
                name: 'sub_process',
                width: 30,
                height: 20,
                path: 'M59.489524 64.365714h1392.64v895.268572H59.489524V64.365714z m268.678095 0v895.268572M1173.699048 64.365714v895.268572'
            })

            const stored_data = graph.createNode({
                shape: 'custom-path',
                name: 'stored_data',
                width: 30,
                height: 20,
                path: 'M 922 613 L 1022 613 L 1022 673 L 922 673 L 922 613 L 922 631 L 1022 631 L 1022 613 L 943 613 L 943 673 L 943 613 Z'
            })

            const sequential_data = graph.createNode({
                shape: 'custom-path',
                name: 'sequential_data',
                width: 30,
                height: 20,
                path: 'M493.5000027481862,509.9999944708038 L493.5000027481862,509.9999944708038 C457.8776338814115,509.9999944708038 429,492.31524925900385 429,470.4999972956137 L429,470.4999972956137 C429,448.6847506342366 457.8776338814115,431.00000012042346 493.5000027481862,431.00000012042346 L493.5000027481862,431.00000012042346 C510.6064683763793,431.00000012042346 527.0122951492167,435.161595225495 539.1083875773531,442.56927889037144 C551.2044843343486,449.976967857261 558.0000054963724,460.0239432461423 558.0000054963724,470.4999972956137 L558.0000054963724,470.4999972956137 C558.0000054963724,480.9760486940785 551.2044843343486,491.02302673396633 539.1083875773531,498.4307103988428 L558.0000054963724,498.4307103988428 L558.0000054963724,509.9999944708038 L493.5000027481862,509.9999944708038 z'
            })

            const database = graph.createNode({
                shape: 'custom-path',
                name: 'sequential_data',
                width: 30,
                height: 20,
                path: 'M 1826.18 1132 L 1907.82 1132 C 1912.89 1132 1917 1145.43 1917 1162 C 1917 1178.57 1912.89 1192 1907.82 1192 L 1826.18 1192 C 1821.11 1192 1817 1178.57 1817 1162 C 1817 1145.43 1821.11 1132 1826.18 1132 ZM 1907.82 1132 C 1902.74 1132 1898.63 1145.43 1898.63 1162 C 1898.63 1178.57 1902.74 1192 1907.82 1192M 1907.82 1132 C 1902.74 1132 1898.63 1145.43 1898.63 1162 C 1898.63 1178.57 1902.74 1192 1907.82 1192'
            })

            const manual_input = graph.createNode({
                shape: 'custom-polygon',
                name: 'manual_input',
                width: 30,
                height: 20,
                points: '0,5 20,0 20,15 0,15'
            })

            const card = graph.createNode({
                shape: 'custom-polygon',
                name: 'card',
                width: 30,
                height: 20,
                points: '0,5 5,0 20,0 20,20 0,20'
            })

            const paper_tape = graph.createNode({
                shape: 'custom-path',
                name: 'paper_tape',
                width: 30,
                height: 20,
                path: 'M689.5400085736205,523.0933549666274 L689.5400085736205,523.0933549666274 C689.5400085736205,530.107368133923 707.8963325537511,535.7933535317925 730.5400064775139,535.7933535317925 C753.1836693944933,535.7933535317925 771.5399878713168,530.107368133923 771.5399878713168,523.0933549666274 L771.5399878713168,523.0933549666274 C771.5399878713168,516.0793375375861 789.8963173548159,510.39335640146294 812.5399912785451,510.39335640146294 C835.183665202259,510.39335640146294 853.5399726723494,516.0793417993327 853.5399726723494,523.0933549666274 L853.5399726723494,624.6933434879359 C853.5399726723494,617.6793303206397 835.183659698896,611.993336399284 812.5399912785451,611.993336399284 C789.8963173548159,611.993336399284 771.5399878713168,617.6793260589026 771.5399878713168,624.6933434879359 C771.5399878713168,631.7073523934906 753.1836693944933,637.3933377913598 730.5400064775139,637.3933377913598 C707.8963325537511,637.3933377913598 689.5400085736205,631.7073523934906 689.5400085736205,624.6933434879359 L689.5400085736205,523.0933549666274 z'
            })

            const display = graph.createNode({
                shape: 'custom-path',
                name: 'display',
                width: 30,
                height: 20,
                path: 'M429.84498628695906,640.7262249043537 L443.01166675547984,595.2262264328447 L495.6781871530534,595.2262264328447 C502.9499885106378,595.2262264328447 508.84498426586424,615.5972443378548 508.84498426586424,640.7262249043537 C508.84498426586424,665.8549392608356 502.9499885106378,686.2262280462323 495.6781871530534,686.2262280462323 L443.01166675547984,686.2262280462323 L429.84498628695906,640.7262249043537 z'
            })

            const manual_operation = graph.createNode({
                shape: 'custom-polygon',
                name: 'manual_operation',
                width: 30,
                height: 20,
                points: '0,0 30,0 25,20 5,20'
            })

            const parallel_mode = graph.createNode({
                shape: 'custom-path',
                name: 'parallel_mode',
                width: 30,
                height: 20,
                path: 'M 944.27 799.7 H 79.94 h 864.33 z M 79.86 223.78 h 864.33 H 79.86 z'
            })

            const loop_limit = graph.createNode({
                shape: 'custom-polygon',
                name: 'loop_limit',
                width: 30,
                height: 20,
                points: '5,0 25,0 30,5 30,20 0,20 0,5'
            })


            const off_page_reference = graph.createNode({
                shape: 'custom-polygon',
                name: 'off_page_reference',
                width: 30,
                height: 20,
                points: '0,0 30,0 30,15 15,20 0,15'
            })

            const annotation = graph.createNode({
                shape: 'custom-path',
                name: 'annotation',
                width: 15,
                height: 30,
                path: 'M 0 0 H -131 V 380 H -1'
            })

            // 图表
            const lineChart = graph.createNode({
                name: 'line-chart',
                shape: "vue-shape",
                width: 190,
                height: 150,
                component: "line-chart",
                data: {
                    chartOption: {
                        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        legend: {
                            data: ['Line 1', 'Line 2']
                        },
                        grid: {
                            top: '15%',
                            left: '3%',
                            right: '5%',
                            bottom: '5%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: 'Line 1',
                                type: 'line',
                                stack: '总量',
                                smooth: true,
                                lineStyle: {
                                    width: 0
                                },
                                showSymbol: false,
                                areaStyle: {
                                    opacity: 0.8,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(128, 255, 165)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(1, 191, 236)'
                                    }])
                                },
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [10, 20, 80, 40, 90, 50, 10]
                            },
                            {
                                name: 'Line 2',
                                type: 'line',
                                stack: '总量',
                                smooth: true,
                                lineStyle: {
                                    width: 0
                                },
                                showSymbol: false,
                                areaStyle: {
                                    opacity: 0.8,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0, 221, 255)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(77, 119, 255)'
                                    }])
                                },
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [50, 40, 20, 70, 100, 110, 30]
                            },
                        ]
                    }
                }
            });


            this.stencil.load([
                rect, rounded_rect, diamond, parallelogram, circle,
                triangle, pentagon, hexagon, octagon, five_pointed_star, cloud,
                dialog_box, apqc, drip, top_arrow, bottom_arrow, left_arrow, right_arrow,
                corner, left_turn_around, right_turn_around
            ], 'group1');


            this.stencil.load([
                rect.clone(), diamond.clone(), begin_end, document, parallelogram.clone(), sub_process,
                stored_data, sequential_data, database, manual_input, card, paper_tape, display,
                manual_operation, hexagon.clone(), parallel_mode, loop_limit, circle.clone(), off_page_reference,
                annotation

            ], 'group2');

            this.stencil.load([lineChart
            ], 'group3');
        },
        getStencilSize() {
            const {
                width: stencilGraphWidth,
                height: stencilGraphHeight
            } = document.querySelector('#stencil').getBoundingClientRect();
            return {
                stencilGraphWidth,
                stencilGraphHeight
            };
        },

        /**
         * 用户自定义添加图形组
         * @param shapes 用户所勾选的图形组
         */
        addShapes(shapes) {
            this.initGroups();
            for (const group of Object.keys(shapes)) {
                this.groups.push({
                    name: group,
                    title: this.getGroupName(group),
                    graphHeight: 300
                })
            }
            this.initStencil(); // 重新初始化拖拽区
            this.initShape(); // 重新生成相关基础图形
            for (const group of Object.keys(shapes)) {
                const arr = []
                shapes[group].forEach(shape => {
                    arr.push(this.graph.createNode(shape));
                })
                this.stencil.load(arr, group);
            }
            this.shapes = shapes;
        },
        getGroupName(value) {
            for (const i of shapes_type) {
                if (i.value === value) {
                    return i.label;
                }
            }
        },
        registerNode() {
            const color = this.theme.color;
            registerCustomRect(color);
            registerCustomCircle(color);
            registerCustomPolygon(color);
            registerCustomPath(color);
        }
    }
};
</script>

<style lang="less">
#stencil-con {
    width: 100%;
    height: 100%;
    position: relative;

    #stencil {
        width: 100%;
        height: calc(~"100% - 40px");
        position: relative;
        border-right: 1px solid @border-color-base;

        .x6-widget-stencil {
            background-color: @component-background;
            overflow-x: hidden;

            > .x6-widget-stencil-title {
                background-color: @component-background;
            }

            > .x6-widget-stencil-content {
                right: -20px;
            }
        }
    }

    .add-btn {
        width: 100%;
        height: 40px;
        position: absolute;
        bottom: 0;
        text-align: center;
    }
}
</style>
