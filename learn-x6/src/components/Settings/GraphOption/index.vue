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
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
import Grid from './Grid'
import Background from './Background'

export default {
    name: "index",
    components: {
        Grid,
        Background
    }
};
</script>

<style scoped lang="scss" src="@/assets/gridOption.scss"></style>
