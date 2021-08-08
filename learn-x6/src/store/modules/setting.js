import config from "@/config";
const { theme, palettes } = config
const state = () => ({
    theme,
    palettes
});
const mutations = {
    setTheme (state, theme) {
        state.theme = theme
    },
};
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

