import {createStore} from 'vuex'

export default createStore({
    state: {
        tabIndex: 0
    },
    mutations: {
        setTabIndex(state, index) {
            state.tabIndex = index
        }
    },
    actions: {},
    modules: {}
})
