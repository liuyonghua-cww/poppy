import { mapState } from "vuex";
import { attrPath } from "./attrPath";
import { CONFIG_TYPE } from "@/events/mouse";
import Sketch from 'vue-color/src/components/Sketch'

export default {
    name: "index",
    components: {
        Sketch
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
            }
        },
        fillColors() {
            return {
                hex: this.attr.fill
            }
        },
        strokeColor() {
            return {
                hex: this.attr.stroke
            }
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
                stroke: '', // 边框颜色
                strokeWidth: 1, // 边框宽度
                fill: '', // 背景颜色
                fontSize: 16, // 字体大小
                color: '', // 字体颜色,
                text: '',
                fontFamily: '微软雅黑',
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none'
            },
            attrPath,
            fontFamily: [ '微软雅黑', '仿宋', '楷体', '隶书', '黑体', '宋体', '华文行楷', '华文楷体' ],
            alignOpt: {
                refX: 0.5,
                refY: 0.5,
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
            }
        };
    },
    methods: {
        getAttr() {
            if (!this.selectedCell) {
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
            this.selectedCell.attr(this.attrPath[ key ], this.attr[ key ]);
        },
        setFontColor(v) {
            this.attr.color = v.hex;
            this.selectedCell.attr(this.attrPath.color, this.attr.color);
        },
        setFillColor(v) {
            this.attr.fill = v.hex;
            this.selectedCell.attr(this.attrPath.fill, this.attr.fill);
        },
        setStrokeColor(v) {
            this.attr.stroke = v.hex;
            this.selectedCell.attr(this.attrPath.stroke, this.attr.stroke);
        },
        setStrokeWidth(v) {
            this.attr.strokeWidth = v;
            this.selectedCell.attr(this.attrPath.strokeWidth, this.attr.strokeWidth);
        },

        alignFont(type) {
            switch (type) {
                case 'left':
                    this.alignOpt = {
                        refX: 0,
                        refY: this.alignOpt.refY,
                        textAnchor: 'start',
                        textVerticalAnchor: this.alignOpt.textVerticalAnchor,
                    }
                    break;
                case 'horizontalCenter':
                    this.alignOpt = {
                        refX: 0.5,
                        refY: this.alignOpt.refY,
                        textAnchor: 'middle',
                        textVerticalAnchor: this.alignOpt.textVerticalAnchor,
                    }
                    break;
                case 'right':
                    this.alignOpt = {
                        refX: 0.99,
                        refY: this.alignOpt.refY,
                        textAnchor: 'end',
                        textVerticalAnchor: this.alignOpt.textVerticalAnchor,
                    }
                    break;
                case 'top':
                    this.alignOpt = {
                        refX: this.alignOpt.refX,
                        refY: 0,
                        textAnchor: this.alignOpt.textAnchor,
                        textVerticalAnchor: 'top',
                    }
                    break;
                case 'verticalCenter':
                    this.alignOpt = {
                        refX: this.alignOpt.refX,
                        refY: 0.5,
                        textAnchor: this.alignOpt.textAnchor,
                        textVerticalAnchor: 'middle',
                    }
                    break;
                case 'bottom':
                    this.alignOpt = {
                        refX: this.alignOpt.refX,
                        refY: 0.99,
                        textAnchor: this.alignOpt.textAnchor,
                        textVerticalAnchor: 'bottom',
                    }
                    break;
            }
            this.selectedCell.attr({
                label: this.alignOpt
            })
        }
    }
};
