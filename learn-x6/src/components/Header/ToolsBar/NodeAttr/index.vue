<!--元素属性设置-->
<template>
    <!--<a-form-model :label-col="{span: 11, offset: 1}" :wrapper-col="{span: 11}" layout="inline">-->
    <!--    <a-form-model-item label="边框颜色">-->
    <!--        <a-input-->
    <!--                type="color"-->
    <!--                v-model="attr.stroke"-->
    <!--                @change="setAttr('stroke')"-->
    <!--        />-->
    <!--    </a-form-model-item>-->
    <!--    <a-form-model-item label="边框宽度">-->
    <!--        <a-slider-->
    <!--                :defaultGValue="attr.strokeWidth"-->
    <!--                :min="1"-->
    <!--                :max="5"-->
    <!--                @change="setAttr('strokeWidth')"-->
    <!--                v-model="attr.strokeWidth"-->
    <!--        />-->
    <!--    </a-form-model-item>-->
    <!--    <a-form-model-item label="背景颜色">-->
    <!--        <a-input-->
    <!--                type="color"-->
    <!--                v-model="attr.fill"-->
    <!--                @change="setAttr('fill')"-->
    <!--        />-->
    <!--    </a-form-model-item>-->
    <!--    <a-form-model-item label="字体大小">-->
    <!--        <a-input-->
    <!--                type="number"-->
    <!--                v-model="attr.fontSize"-->
    <!--                @change="setAttr('fontSize')"-->
    <!--        />-->
    <!--    </a-form-model-item>-->
    <!--    <a-form-model-item label="字体颜色">-->
    <!--        <a-input-->
    <!--                type="color"-->
    <!--                v-model="attr.color"-->
    <!--                @change="setAttr('color')"-->
    <!--        />-->
    <!--    </a-form-model-item>-->
    <!--    <a-form-model-item label="字体">-->
    <!--        <a-select v-model="attr.fontFamily" @change="setAttr('fontFamily')">-->
    <!--            <a-select-option-->
    <!--                    v-for="(item, i) in fontFamily"-->
    <!--                    :key="i"-->
    <!--                    :value="item">-->
    <!--                {{ item }}-->
    <!--            </a-select-option>-->
    <!--        </a-select>-->
    <!--    </a-form-model-item>-->
    <!--</a-form-model>-->
    <div class="node-attr">
        <div class="font-family m4">
            <a-select
                    v-model="attr.fontFamily"
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    @change="setAttr('fontFamily')"
            >
                <a-select-option
                        v-for="(item, i) in fontFamily"
                        :key="i"
                        :value="item">
                    {{ item }}
                </a-select-option>
            </a-select>
        </div>

        <div class="font-size m4">
            <a-input
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    v-model="attr.fontSize"
                    type="number"
                    @change="setAttr('fontSize')"
            />
        </div>

        <div class="font-item m4">
            <a-button
                    :class="{'selectedBGC': attr.fontWeight === 'bold' && configType === CONFIG_TYPE.NODE}"
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    @click="setAttr('fontWeight')"
            >
                <i class="iconfont icon-jiacu-"></i>
            </a-button>
        </div>
        <div class="font-item m4">
            <a-button
                    :class="{'selectedBGC': attr.fontStyle === 'italic' && configType === CONFIG_TYPE.NODE}"
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    @click="setAttr('fontStyle')"
            >
                <i class="iconfont icon-italic"></i>
            </a-button>
        </div>
        <div class="font-item m4">
            <a-button
                    :class="{'selectedBGC': attr.textDecoration === 'underline' && configType === CONFIG_TYPE.NODE}"
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    @click="setAttr('textDecoration')"
            >
                <i class="iconfont icon-zitixiahuaxian"></i>
            </a-button>
        </div>
        <div class="font-item m4">

            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
                <template slot="content">
                    <sketch
                        :value="colors"
                        @input="updateFontColor"
                    />
                </template>
                <a-button
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    :style="{ color: attr.color }"
                >

                    <i class="iconfont icon-zitiyanse"></i>
                </a-button>
            </a-popover>

            <a-button
                v-else
                :disabled="configType !== CONFIG_TYPE.NODE"
            >
                <i class="iconfont icon-zitiyanse"></i>
            </a-button>
        </div>
    </div>
</template>

<script>
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
        }
    },
    watch: {
        cellId: function () {
            this.getAttr();
        },
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
            fontFamily: [ '微软雅黑', '仿宋', '楷体', '隶书', '黑体', '宋体', '华文行楷', '华文楷体' ]
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
        updateFontColor(v) {
            this.attr.color = v.hex;
            console.log(this.attr.color);
            this.selectedCell.attr(this.attrPath.color, this.attr.color);
        }
    }
};
</script>

<style lang="less" scoped>
.node-attr {
    height: 100%;
    display: flex;
    > div {
        display: flex;
        align-items: center;
        height: 100%;
    }

    > .font-family {
        width: 100px;
        margin-left: 0;
        > .ant-select {
            width: 100%;
        }
    }

    > .font-size {
        width: 60px;

    }

    > .font-item {
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
}

.m4 {
    margin: 0 4px;
}

.selectedBGC {
    background-color: #e0e0e0!important;
    color: rgba(0, 0, 0, 0.65)!important;
}

</style>
