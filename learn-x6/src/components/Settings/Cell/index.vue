<template>
    <section id="cell_opt">
        <node-option v-if="configType === CONFIG_TYPE.NODE"/>
    </section>
</template>

<script>
import NodeOption from './Node'
import { CONFIG_TYPE } from "@/events/mouse";
export default {
    name: "index",
    components: {
        NodeOption
    },
    props: {
        configType: {
            type: Number
        }
    },
    data() {
        return {
            CONFIG_TYPE
        }
    }
};
</script>

<style scoped>
#cell_opt {
    width: 100%;
    height: calc(100% - 50px);
}
</style>
