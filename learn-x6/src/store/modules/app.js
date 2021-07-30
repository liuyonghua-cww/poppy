const state = () => ({
    graph: null
});
const mutations = {
    setGraph(state, v) {
        state.graph = v;
    }
};
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

