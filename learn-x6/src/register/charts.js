import {Graph} from "@antv/x6";
import Chart from "@/components/Echarts";

Graph.registerVueComponent('chart-node', {
    template: `<chart />`,
    components: {
        Chart
    },
}, true)
