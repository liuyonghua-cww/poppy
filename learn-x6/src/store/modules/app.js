const state = () => ({
    isInit: false, // 画布是否初始化完成标识
    graph: null,
    cellId: null, // 选中的id
    selectedCell: null, // 选中的对象,
    configType: 0,
    contextmenuNode: null // 右键的节点
});
const mutations = {
    setIsInit(state, v) {
        state.isInit = v
    },
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
    },
    setContextmenuNode(state, v) {
        state.contextmenuNode = v;
    }
};
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

