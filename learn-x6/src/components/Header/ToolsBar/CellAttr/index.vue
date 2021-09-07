<!--元素属性设置-->
<template>
    <div class="node-attr">
        <div class="cell-theme">
            <a-popover placement="bottom" arrow-point-at-center trigger="click">
                <template slot="content">
                    <cell-theme />
                </template>
                <a-button>
                    <i class="iconfont icon-zhutifengge"></i>
                </a-button>
            </a-popover>
        </div>

        <a-divider type="vertical" />
        <!--字体类型-->
        <div class="font-family">
            <a-select
                    v-model="attr.fontFamily"
                    :disabled="configType === CONFIG_TYPE.GRID"
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
        <a-divider type="vertical" />
        <!--字体大小-->
        <div class="font-size">
            <a-input
                    :disabled="configType === CONFIG_TYPE.GRID"
                    v-model="attr.fontSize"
                    type="number"
                    @change="setAttr('fontSize')"
            />
        </div>
        <a-divider type="vertical" />
        <!--字体粗细-->
        <div class="font-item m4 ml0">
            <a-button
                    :class="{'selectedBGC': attr.fontWeight === 'bold' && (configType === CONFIG_TYPE.NODE || configType === CONFIG_TYPE.EDGE)}"
                    :disabled="configType === CONFIG_TYPE.GRID"
                    @click="setAttr('fontWeight')"
            >
                <i class="iconfont icon-jiacu-"></i>
            </a-button>
        </div>
        <!--斜体-->
        <div class="font-item m4">
            <a-button
                    :class="{'selectedBGC': attr.fontStyle === 'italic' && (configType === CONFIG_TYPE.NODE || configType === CONFIG_TYPE.EDGE)}"
                    :disabled="configType === CONFIG_TYPE.GRID"
                    @click="setAttr('fontStyle')"
            >
                <i class="iconfont icon-italic"></i>
            </a-button>
        </div>
        <!--下划线-->
        <div class="font-item m4">
            <a-button
                    :class="{'selectedBGC': attr.textDecoration === 'underline' && (configType === CONFIG_TYPE.NODE || configType === CONFIG_TYPE.EDGE)}"
                    :disabled="configType === CONFIG_TYPE.GRID"
                    @click="setAttr('textDecoration')"
            >
                <i class="iconfont icon-zitixiahuaxian"></i>
            </a-button>
        </div>
        <!--字体颜色-->
        <div class="font-item m4">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType !== CONFIG_TYPE.GRID">
                <template slot="content">
                    <sketch
                        :value="colors"
                        @input="setFontColor"
                    />
                </template>
                <a-button
                        :disabled="configType === CONFIG_TYPE.GRID"
                    :style="{ color: attr.color }"
                >

                    <i class="iconfont icon-zitiyanse"></i>
                </a-button>
            </a-popover>

            <a-button
                v-else
                :disabled="configType === CONFIG_TYPE.GRID"
            >
                <i class="iconfont icon-zitiyanse"></i>
            </a-button>
        </div>
        <!--字体对齐方式-->
        <div class="font-item m4 mr0">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
                <template slot="content">
                    <div style="padding: 0 5px">
                        <i title="左对齐" @click="alignFont('left')" style="font-size: 28px; cursor: pointer" class="iconfont icon-zuoduiqi"></i>
                        <i title="水平居中" @click="alignFont('horizontalCenter')" style="font-size: 28px; cursor: pointer" class="iconfont icon-juzhongduiqi"></i>
                        <i title="右对齐" @click="alignFont('right')" style="font-size: 28px; cursor: pointer" class="iconfont icon-youduiqi"></i>
                        <i title="上对齐" @click="alignFont('top')" style="font-size: 28px; cursor: pointer" class="iconfont icon-shangduiqitop"></i>
                        <i title="垂直居中" @click="alignFont('verticalCenter')" style="font-size: 28px; cursor: pointer" class="iconfont icon-juzhongduiqimiddle"></i>
                        <i title="下对齐" @click="alignFont('bottom')" style="font-size: 28px; cursor: pointer" class="iconfont icon-xiaduiqibottom"></i>
                    </div>
                </template>
                <a-button
                        :disabled="configType !== CONFIG_TYPE.NODE"
                >

                    <i class="iconfont icon-xiazai"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.NODE"
            >

                <i class="iconfont icon-xiazai"></i>
            </a-button>
        </div>
        <a-divider type="vertical" />
        <!--填充颜色-->
        <div class="font-item m4 ml0">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
                <template slot="content">
                    <fill-color
                        :fill="attr.fill"
                        @setFillColor="setFillColor"
                    />

                </template>
                <a-button
                        :disabled="configType !== CONFIG_TYPE.NODE"
                >

                    <i class="iconfont icon-tianchong"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.NODE"
            >
                <i class="iconfont icon-tianchong"></i>
            </a-button>
        </div>
        <!--线条颜色-->
        <div class="font-item m4">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType !== CONFIG_TYPE.GRID">
                <template slot="content">
                    <sketch
                            :value="strokeColor"
                            @input="setStrokeColor"
                    />
                </template>
                <a-button
                        :disabled="configType === CONFIG_TYPE.GRID"
                >

                    <i class="iconfont icon-xiantiaoyanse"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType === CONFIG_TYPE.GRID"
            >
                <i class="iconfont icon-xiantiaoyanse"></i>
            </a-button>
        </div>
        <!--线宽-->
        <div class="font-item m4">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType !== CONFIG_TYPE.GRID">
                <template slot="content">
                    <ul class="stroke-width-select">
                        <li
                                :class="{ 'selectedBGC': attr.strokeWidth === item }"
                                v-for="(item, i) of 10"
                                :key="i"
                                @click="setStrokeWidth(item)"
                        >
                            {{ `${item}px` }}
                        </li>
                    </ul>
                </template>
                <a-button
                        :disabled="configType === CONFIG_TYPE.GRID"
                >

                    <i class="iconfont icon-xiantiaokuandu"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType === CONFIG_TYPE.GRID"
            >
                <i class="iconfont icon-xiantiaokuandu"></i>
            </a-button>
        </div>
        <!--线条样式-->
        <div class="font-item m4 mr0">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType !== CONFIG_TYPE.GRID">
                <template slot="content">
                    <ul class="stroke-dasharray-select">
                        <li
                                v-for="(item, i) of strokeDasharrayType"
                                :key="i"
                                v-html="strokeDasharrayIcon[i]"
                                @click="setStrokeDasharray(item)"
                        >
                        </li>
                    </ul>
                </template>
                <a-button
                        :disabled="configType === CONFIG_TYPE.GRID"
                >

                    <i class="iconfont icon-xiantiaoyangshi"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType === CONFIG_TYPE.GRID"
            >
                <i class="iconfont icon-xiantiaoyangshi"></i>
            </a-button>
        </div>
        <a-divider type="vertical" />
        <!--连线类型-->
        <div class="font-item m4 ml0">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.EDGE">
                <template slot="content">
                    <ul class="connector">
                        <li
                                v-for="(item, i) of connectorType"
                                :class="{ 'selectedBGC': attr.connector === item.value }"
                                @click="setConnector(item.value)"
                        >
                            {{ item.label }}
                        </li>
                    </ul>
                </template>
                <a-button
                        :disabled="configType !== CONFIG_TYPE.EDGE"
                >
                    <i class="iconfont icon-lianxian"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.EDGE"
            >
                <i class="iconfont icon-lianxian"></i>
            </a-button>
        </div>
        <!--起点箭头-->
        <div class="font-item m4">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.EDGE">
                <template slot="content">
                    <marker-settings
                            @setMarker="setSourceMarker"
                            :state="sourceMarker"
                    />
                </template>
                <a-button
                        :disabled="configType !== CONFIG_TYPE.EDGE"
                >
                    <i class="iconfont icon-al"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.EDGE"
            >
                <i class="iconfont icon-al"></i>
            </a-button>
        </div>

        <!--终点箭头-->
        <div class="font-item m4 mr0">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.EDGE">
                <template slot="content">
                    <marker-settings
                            @setMarker="setTargetMarker"
                            :state="targetMarker"
                    />
                </template>
                <a-button
                        :disabled="configType !== CONFIG_TYPE.EDGE"
                >
                    <i class="iconfont icon-arrow-right"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.EDGE"
            >
                <i class="iconfont icon-arrow-right"></i>
            </a-button>
        </div>

        <a-divider type="vertical" />
        <div class="font-item m4 ml0">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
                <template slot="content">
                    <drop-shadow />
                </template>
                <a-button
                        :disabled="configType !== CONFIG_TYPE.NODE"
                >
                    <i class="iconfont icon-yinying"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.NODE"
            >
                <i class="iconfont icon-yinying"></i>
            </a-button>
        </div>

    </div>
</template>

<script>
import nodeAttr from "./cellAttr";
export default nodeAttr;
</script>

<style lang="less" scoped>
.node-attr {
    height: 100%;
    display: flex;
    align-items: center;
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
.ml0 {
    margin-left: 0;
}
.mr0 {
    margin-right: 0;
}

.selectedBGC {
    background-color: #e0e0e0!important;
    color: rgba(0, 0, 0, 0.65)!important;
}

</style>
