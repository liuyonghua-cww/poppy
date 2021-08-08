<template>
    <section id="graph_opt">
        <div class="tab">
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="网格设置">
                    <grid />
                </a-tab-pane>
                <a-tab-pane key="2" tab="背景设置">
                    <background />
                </a-tab-pane>
            </a-tabs>

            <img-checkbox-group
                @change="values => setTheme({...theme, mode: values[0]})"
                :default-values="[theme.mode]"
            >
                <img-checkbox  img="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" value="light"/>
                <img-checkbox  img="https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg" value="night"/>
            </img-checkbox-group>

            <color-checkbox-group
                @change="(values, colors) => setTheme({...theme, color: colors[0]})"
                :defaultValues="[palettes.indexOf(theme.color)]" :multiple="false"
            >
                <color-checkbox v-for="(color, index) in palettes" :key="index" :color="color" :value="index" />
            </color-checkbox-group>
        </div>
    </section>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import Grid from './Grid'
import Background from './Background'
import {ColorCheckbox, ImgCheckbox} from '@/components/checkbox'
const ColorCheckboxGroup = ColorCheckbox.Group
const ImgCheckboxGroup = ImgCheckbox.Group
export default {
    name: "index",
    components: {
        Grid,
        Background,
        ColorCheckbox,
        ImgCheckbox,
        ColorCheckboxGroup,
        ImgCheckboxGroup
    },
    computed: {
        ...mapState('setting', [
            'theme',
            'palettes'
        ])
    },
    methods: {
        ...mapMutations('setting', [
            'setTheme'
        ])
    }
};
</script>

<style scoped lang="less" src="../../../assets/styles/grid-option.less"></style>
