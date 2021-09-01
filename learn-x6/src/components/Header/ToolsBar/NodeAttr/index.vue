<!--元素属性设置-->
<template>
    <div class="node-attr">
        <!--字体类型-->
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
        <!--字体大小-->
        <div class="font-size m4">
            <a-input
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    v-model="attr.fontSize"
                    type="number"
                    @change="setAttr('fontSize')"
            />
        </div>
        <!--字体粗细-->
        <div class="font-item m4">
            <a-button
                    :class="{'selectedBGC': attr.fontWeight === 'bold' && configType === CONFIG_TYPE.NODE}"
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    @click="setAttr('fontWeight')"
            >
                <i class="iconfont icon-jiacu-"></i>
            </a-button>
        </div>
        <!--斜体-->
        <div class="font-item m4">
            <a-button
                    :class="{'selectedBGC': attr.fontStyle === 'italic' && configType === CONFIG_TYPE.NODE}"
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    @click="setAttr('fontStyle')"
            >
                <i class="iconfont icon-italic"></i>
            </a-button>
        </div>
        <!--下划线-->
        <div class="font-item m4">
            <a-button
                    :class="{'selectedBGC': attr.textDecoration === 'underline' && configType === CONFIG_TYPE.NODE}"
                    :disabled="configType !== CONFIG_TYPE.NODE"
                    @click="setAttr('textDecoration')"
            >
                <i class="iconfont icon-zitixiahuaxian"></i>
            </a-button>
        </div>
        <!--字体颜色-->
        <div class="font-item m4">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
                <template slot="content">
                    <sketch
                        :value="colors"
                        @input="setFontColor"
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
        <!--字体对齐方式-->
        <div class="font-item m4">
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
        <!--填充颜色-->
        <div class="font-item m4">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
                <template slot="content">
                    <sketch
                            :value="fillColors"
                            @input="setFillColor"
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
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
                <template slot="content">
                    <sketch
                            :value="strokeColor"
                            @input="setStrokeColor"
                    />
                </template>
                <a-button
                        :disabled="configType !== CONFIG_TYPE.NODE"
                >

                    <i class="iconfont icon-xiantiaoyanse"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.NODE"
            >
                <i class="iconfont icon-xiantiaoyanse"></i>
            </a-button>
        </div>
        <!--线宽-->
        <div class="font-item m4">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
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
                        :disabled="configType !== CONFIG_TYPE.NODE"
                >

                    <i class="iconfont icon-xiantiaokuandu"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.NODE"
            >
                <i class="iconfont icon-xiantiaokuandu"></i>
            </a-button>
        </div>
        <!--线条样式-->
        <div class="font-item m4">
            <a-popover placement="bottom" arrow-point-at-center trigger="click" v-if="configType === CONFIG_TYPE.NODE">
                <template slot="content">
                    <ul class="stroke-dasharray-select">
                        <li
                                v-for="(item, i) of strokeDasharrayOpt"
                                :key="i"
                        >
                            <i :class="['iconfont', strokeDasharrayIcon[i]]"></i>
                        </li>
                    </ul>
                </template>
                <a-button
                        :disabled="configType !== CONFIG_TYPE.NODE"
                >

                    <i class="iconfont icon-xiantiaoyangshi"></i>
                </a-button>
            </a-popover>

            <a-button
                    v-else
                    :disabled="configType !== CONFIG_TYPE.NODE"
            >
                <i class="iconfont icon-xiantiaoyangshi"></i>
            </a-button>
        </div>
    </div>
</template>

<script>
import nodeAttr from "./nodeAttr";
export default nodeAttr;
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
