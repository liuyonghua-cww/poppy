<template>
    <section id="grid_opt">

    </section>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "index",
    data() {
        return {

        }
    },
    mounted() {
        this.getGridAttr()
    },
    computed: {
        ...mapState('app', [
                'graph'
        ])
    },
    methods: {
        getGridAttr() {
            console.log(this.graph.grid);
        }
    }
};
</script>

<style scoped lang="scss">
#grid_opt {
    width: 100%;
    height: 100%;
}

</style>
