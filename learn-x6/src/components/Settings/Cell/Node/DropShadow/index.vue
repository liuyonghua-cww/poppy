<template>
    <div class="dropShadow">
        <a-form-model :label-col="{span: 7, offset: 1}" :wrapper-col="{span: 15}">
            <a-form-model-item label="颜色">
                <a-input
                        type="color"
                        v-model="options.color"
                        @change="setDropShadow"
                />
            </a-form-model-item>
            <a-form-model-item label="x轴偏移量">
                <a-slider
                        :defaultGValue="options.dx"
                        :min="0"
                        :max="20"
                        v-model="options.dx"
                        @change="setDropShadow"
                />
            </a-form-model-item>
            <a-form-model-item label="y轴偏移量">
                <a-slider
                        :defaultGValue="options.dy"
                        :min="0"
                        :max="20"
                        v-model="options.dy"
                        @change="setDropShadow"
                />
            </a-form-model-item>
            <a-form-model-item label="模糊半径">
                <a-slider
                        :defaultGValue="options.blur"
                        :min="0"
                        :max="20"
                        v-model="options.blur"
                        @change="setDropShadow"
                />
            </a-form-model-item>
            <a-form-model-item label="透明度">
                <a-slider
                        :defaultGValue="options.opacity"
                        :min="0"
                        :max="20"
                        v-model="options.opacity"
                        @change="setDropShadow"
                />
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
import { Color } from "@antv/x6";
import { mapState } from "vuex";

export default {
    name: "index",
    computed: {
        ...mapState('app', [
                'selectedCell'
        ])
    },
    data() {
        return {
            options: {
                color: Color.randomHex(),
                dx: 10,
                dy: 10,
                blur: 5,
                opacity: 0.5
            }
        }
    },
    watch: {
        cellId: function () {
            this.getDropShadow();
        }
    },
    mounted() {
        this.getDropShadow();
    },
    methods: {
        setDropShadow() {
            this.selectedCell.attr('body/filter', {
                name: 'dropShadow',
                args: {
                    ...this.options
                }
            })
        },
        getDropShadow() {
            const dropShadow =  this.selectedCell.attr('body/filter');
            if (!dropShadow) {
                return;
            }
            const args = dropShadow.args;
            args.color && (this.options.color = args.color);
            args.dx && (this.options.dx = args.dx);
            args.dy && (this.options.dy = args.dy);
            args.color && (this.options.color = args.color);
            args.color && (this.options.color = args.color);
        }
    }
};
</script>

<style scoped lang="less">
.dropShadow {
    width: 100%;
    /deep/ .ant-form-item {
        margin: 0;
        width: 100%!important;
    }
}

</style>
