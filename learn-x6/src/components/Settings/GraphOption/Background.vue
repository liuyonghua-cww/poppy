<template>
    <section id="bg_opt">
        <a-form-model :label-col="{span: 10}" :wrapper-col="{span: 12, offset: 1}">
            <a-form-model-item label="背景颜色">
                <a-input
                        type="color"
                        v-model="option.color"
                        @change="setBackground"
                />
            </a-form-model-item>
            <a-form-model-item label="透明度">
                <a-slider
                        :defaultGValue="option.opacity"
                        :min="0"
                        :max="1"
                        @change="setBackground"
                        v-model="option.opacity"
                />
            </a-form-model-item>
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
                opacity: 1,
                angle: 20
            }
        }
    },
    components: {
        ...mapState('app', [
                'graph'
        ])
    },
    methods: {
        getBackgroundOpt() {

        },

        setBackground() {
            const { size, position, ...opt } = this.option;
            this.graph.drawBackground({
                ...opt,
                size: this.tryToJSON(size),
                position: this.tryToJSON(position)
            })
        },

        tryToJSON(val) {
            try {
                return JSON.parse(val)
            } catch (error) {
                return val
            }
        }

    }
};
</script>

<style scoped>

</style>
