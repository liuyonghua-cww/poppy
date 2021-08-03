<template>
    <section>
        <grid-option
                v-if="configType === CONFIG_TYPE.GRID"
        />
    </section>
</template>

<script>
import GridOption from './Grid';
import { mapState } from "vuex";
import { CONFIG_TYPE } from "@/events/mouse";

export default {
    name: "index",
    components: {
        GridOption
    },
    data() {
        return {
            CONFIG_TYPE
        };
    },
    computed: {
        ...mapState('app', [
            'configType'
        ])
    }
};
</script>

<style scoped>
section {
    width: 100%;
    height: 100%;
}
</style>
