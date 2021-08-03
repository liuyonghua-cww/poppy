const state = () => ({
    graph: null,
    cellId: null, // 选中的id
    selectedCell: null, // 选中的对象,
    configType: null
});
const mutations = {
    setGraph(state, v) {
        state.graph = v;
    },
    setCellId(state, v) {
        state.cellId = v;
    },
    setSelectedCell(state, v) {
        state.selectedCell = v;
    },
    setConfigType(state, v) {
        state.configType = v;
    }
};
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

