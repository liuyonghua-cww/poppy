<template>
    <section id="graph_opt">
        <div class="tab">
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="网格设置">
                    <grid />
                </a-tab-pane>
                <a-tab-pane key="2" tab="背景设置">
                    Content of Tab Pane 2
                </a-tab-pane>
            </a-tabs>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
import Grid from './Grid'


export default {
    name: "index",
    components: {
        Grid
    }
};
</script>

<style scoped lang="scss" src="@/assets/gridOption.scss"></style>
