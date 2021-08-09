<template>
    <section class="global-setting">
        <div class="theme">
            <a-switch
                    :default-checked="theme.mode === 'night'"
                    @change="_setTheme($event)"
            >
                <span slot="checkedChildren">🌜</span>
                <span slot="unCheckedChildren">🌞</span>
            </a-switch>


            <a-popover placement="bottom" arrow-point-at-center>
                <template slot="content">
                    <color-checkbox-group
                            style="width: 220px;"
                            @change="(values, colors) => setTheme({...theme, color: colors[0]})"
                            :defaultValues="[palettes.indexOf(theme.color)]" :multiple="false"
                    >
                        <color-checkbox v-for="(color, index) in palettes" :key="index" :color="color" :value="index" />
                    </color-checkbox-group>
                </template>
                <span class="theme-color">
                    <i class="iconfont icon-zhutise"></i>
                </span>
            </a-popover>
        </div>
    </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {ColorCheckbox} from '@/components/Checkbox'
const ColorCheckboxGroup = ColorCheckbox.Group

export default {
    name: "index",
    components: {
        ColorCheckbox,
        ColorCheckboxGroup
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
        ]),
        _setTheme(e) {
            const mode = e ? 'night' : 'light';
            this.setTheme({ ...this.theme, mode });
        }
    }
};
</script>

<style lang="less" scoped>
.global-setting {
    width: 80px;
}
.theme {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

     .theme-color {
        width: 22px;
        height: 22px;
        line-height: 22px;
        margin-left: 10px;
        cursor: pointer;

        > i {
            width: 22px;
            height: 22px;
            font-size: 20px;
        }
    }
}

</style>
