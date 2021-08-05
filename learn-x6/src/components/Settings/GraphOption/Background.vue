<template>
    <section id="bg_opt">
        <a-form-model :label-col="{span: 8}" :wrapper-col="{span: 14, offset: 1}">
            <a-form-model-item label="背景颜色">
                <a-input
                        v-model="option.color"
                        type="color"
                        @change="changeBackground"
                />
            </a-form-model-item>
            <a-form-model-item label="展示图片">
                <a-switch v-model="option.showImage" @change="changeBackground"/>
            </a-form-model-item>
            <template v-if="option.showImage">
                <a-form-model-item label="透明度">
                    <a-slider
                            v-model="option.opacity"
                            :defaultGValue="option.opacity"
                            :max="1"
                            :min="0"
                            :step="0.01"
                            @change="changeBackground"
                    />
                </a-form-model-item>
                <a-form-model-item label="图片地址">
                    <a-input
                            v-model="option.image"
                            @blur="changeBackground"
                    />
                </a-form-model-item>
                <a-form-model-item label="重复方式">
                    <a-select v-model="option.repeat" placeholder="选择图片重复方式" @change="changeBackground">
                        <a-select-option
                                v-for="(item, i) in repeatOpt"
                                :key="i"
                                :value="item">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="位置">
                    <a-input
                            v-model="option.position"
                            @blur="changeBackground"
                    />
                </a-form-model-item>
                <a-form-model-item label="大小">
                    <a-input
                            v-model="option.size"
                            @blur="changeBackground"
                    />
                </a-form-model-item>
            </template>
        </a-form-model>
    </section>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Background",
    data() {
        return {
            option: {
                color: '#f0f0f0',
                image: '',
                showImage: false,
                position: 'center',
                size: 'auto auto',
                repeat: 'no-repeat',
                opacity: 1
            },
            repeatOpt: ['repeat-x', 'repeat-y', 'repeat', 'space', 'round', 'no-repeat']
        };
    },
    computed: {
        ...mapState('app', [
            'graph'
        ])
    },
    methods: {
        getBackgroundOpt() {

        },

        changeBackground() {
            const { image, ...opt} = this.option;
            this.graph.drawBackground({
                image: this.option.showImage ? image : '',
                ...opt
            });
        },

    }
};
</script>

<style scoped>

</style>
