import { mapState } from "vuex";
import { attrPath, edgeAttrPath } from "./attrPath";
import { CONFIG_TYPE } from "@/events/mouse";
import Sketch from 'vue-color/src/components/Sketch';
import { strokeDasharrayIcon } from './strokeDasharrayIcon';
import CellTheme from './CellTheme';

export default {
    name: "index",
    components: {
        Sketch,
        CellTheme
    },
    computed: {
        ...mapState('app', [
            'graph',
            'selectedCell',
            'cellId',
            'configType'
        ]),
        colors() {
            return {
                hex: this.attr.color
            };
        },
        fillColors() {
            return {
                hex: this.attr.fill
            };
        },
        strokeColor() {
            return {
                hex: this.attr.stroke
            };
        }
    },
    watch: {
        cellId: function () {
            this.getAttr();
        },
        configType: function (v) {
            if (v === CONFIG_TYPE.NODE) {
                this.getAttr();
            }
        }
    },
    mounted() {
        this.getAttr();
    },
    data() {
        return {
            CONFIG_TYPE,
            attr: {
                fontFamily: '微软雅黑',
                fontSize: 14, // 字体大小
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none',
                color: '', // 字体颜色,
                stroke: '', // 边框颜色
                strokeWidth: 1, // 边框宽度

                fill: '', // 背景颜色
            },
            attrPath,
            edgeAttrPath,
            fontFamily: [ '微软雅黑', '仿宋', '楷体', '隶书', '黑体', '宋体', '华文行楷', '华文楷体' ],
            alignOpt: {
                refX: 0.5,
                refY: 0.5,
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
            },
            strokeDasharrayType: [ 'solid', 'dashed', 'dot', 'dasheddot' ],
            strokeDasharrayInit: {
                solid: '0',
                dashed: '3, 3',
                dot: '1,1',
                dasheddot: '3, 1, 1, 1'
            },
            strokeDasharrayIcon: strokeDasharrayIcon
        };
    },
    methods: {
        getAttr() {
            this.attr = {
                fontFamily: '微软雅黑',
                fontSize: 14, // 字体大小
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none',
                color: '', // 字体颜色

                stroke: '', // 边框颜色
                strokeWidth: 1, // 边框宽度

                fill: '', // 背景颜色
            };
            if (!this.selectedCell) {
                return;
            }
            // 如果是 edge，获取相关属性的方式需要变化
            if (this.selectedCell.isEdge()) {
                for (const key in this.attrPath) {
                    this.attr[ key ] = this.selectedCell.attr(this.edgeAttrPath[ key ]);
                }
                return;
            }
            for (const key in this.attrPath) {
                this.attr[ key ] = this.selectedCell.attr(this.attrPath[ key ]);
            }
        },
        setAttr(key) {
            if (key === 'fontWeight') {
                if (this.attr[ key ] === 'bold') {
                    this.attr[ key ] = 'normal';
                } else {
                    this.attr[ key ] = 'bold';
                }
            }
            if (key === 'fontStyle') {
                if (this.attr[ key ] === 'italic') {
                    this.attr[ key ] = 'normal';
                } else {
                    this.attr[ key ] = 'italic';
                }
            }
            if (key === 'textDecoration') {
                if (this.attr[ key ] === 'underline') {
                    this.attr[ key ] = 'none';
                } else {
                    this.attr[ key ] = 'underline';
                }
            }
            // 如果是 edge，设置相关属性的方式需要变化
            if (this.selectedCell.isEdge()) {
                this.selectedCell.attr(this.edgeAttrPath[ key ], this.attr[ key ]);
                return;
            }
            this.selectedCell.attr(this.attrPath[ key ], this.attr[ key ]);
        },

        setFontColor(v) {
            this.attr.color = v.hex;
            if (this.selectedCell.isEdge()) {
                this.selectedCell.attr(this.edgeAttrPath.color, this.attr.color);
                return;
            }
            this.selectedCell.attr(this.attrPath.color, this.attr.color);
        },
        setFillColor(v) {
            this.attr.fill = v.hex;
            this.selectedCell.attr(this.attrPath.fill, this.attr.fill);
        },
        setStrokeColor(v) {
            this.attr.stroke = v.hex;
            if (this.selectedCell.isEdge()) {
                this.selectedCell.attr(this.edgeAttrPath.stroke, this.attr.stroke);
                return;
            }
            this.selectedCell.attr(this.attrPath.stroke, this.attr.stroke);
        },


        setStrokeWidth(v) {
            this.attr.strokeWidth = v;
            if (this.selectedCell.isEdge()) {
                this.selectedCell.attr(this.edgeAttrPath.strokeWidth, this.attr.strokeWidth);
            } else {
                this.selectedCell.attr(this.attrPath.strokeWidth, this.attr.strokeWidth);
            }


            if (!this.selectedCell.getData()) {
                this.setStrokeDasharray('solid');
                return;
            }
            const strokeDasharrayType = this.selectedCell.getData().strokeDasharrayType;
            if (!strokeDasharrayType || strokeDasharrayType === 'solid') {
                this.setStrokeDasharray('solid');
            } else {
                this.setStrokeDasharray(strokeDasharrayType);
            }
        },

        setStrokeDasharray(v) {
            if (v === 'solid') {
                if (this.selectedCell.isEdge()) {
                    this.selectedCell.attr('line/stroke-dasharray', 0);
                } else {
                    this.selectedCell.attr('body/stroke-dasharray', 0);
                }

            } else {
                if (this.selectedCell.isEdge()) {
                    this.selectedCell.attr('line/stroke-dasharray', (() => {
                        return this.strokeDasharrayInit[ v ].split(',').map(item => +item * this.attr.strokeWidth).join(',');
                    })());
                } else {
                    this.selectedCell.attr('body/stroke-dasharray', (() => {
                        return this.strokeDasharrayInit[ v ].split(',').map(item => +item * this.attr.strokeWidth).join(',');
                    })());
                }
            }
            this.selectedCell.setData({
                strokeDasharrayType: v
            });
        },

        alignFont(type) {
            switch (type) {
                case 'left':
                    this.alignOpt = {
                        refX: 0,
                        refY: this.alignOpt.refY,
                        textAnchor: 'start',
                        textVerticalAnchor: this.alignOpt.textVerticalAnchor,
                    };
                    break;
                case 'horizontalCenter':
                    this.alignOpt = {
                        refX: 0.5,
                        refY: this.alignOpt.refY,
                        textAnchor: 'middle',
                        textVerticalAnchor: this.alignOpt.textVerticalAnchor,
                    };
                    break;
                case 'right':
                    this.alignOpt = {
                        refX: 0.99,
                        refY: this.alignOpt.refY,
                        textAnchor: 'end',
                        textVerticalAnchor: this.alignOpt.textVerticalAnchor,
                    };
                    break;
                case 'top':
                    this.alignOpt = {
                        refX: this.alignOpt.refX,
                        refY: 0,
                        textAnchor: this.alignOpt.textAnchor,
                        textVerticalAnchor: 'top',
                    };
                    break;
                case 'verticalCenter':
                    this.alignOpt = {
                        refX: this.alignOpt.refX,
                        refY: 0.5,
                        textAnchor: this.alignOpt.textAnchor,
                        textVerticalAnchor: 'middle',
                    };
                    break;
                case 'bottom':
                    this.alignOpt = {
                        refX: this.alignOpt.refX,
                        refY: 0.99,
                        textAnchor: this.alignOpt.textAnchor,
                        textVerticalAnchor: 'bottom',
                    };
                    break;
            }
            this.selectedCell.attr({
                label: this.alignOpt
            });
        }
    }
};
