import config from "@/config";
const { theme, palettes } = config
const state = () => ({
    theme,
    palettes,
    cellTheme: null
});
const mutations = {
    setTheme (state, theme) {
        state.theme = theme
    },
    setCellTheme(state, option) {
        state.cellTheme = option;
    }
};
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

