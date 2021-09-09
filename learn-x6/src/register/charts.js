import {Graph} from "@antv/x6";
import LineChart from "@/components/Echarts/lineChart";

Graph.registerVueComponent('line-chart', {
    template: `<line-chart />`,
    components: {
        LineChart
    },
}, true)
