import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './theme/index.less'
import Antd from 'ant-design-vue';
import './assets/styles/reset.less'
import './assets/styles/animation.less'
import '@/readFile/readFile'
import '@/font/Source Han Sans CN/font.css'

Vue.use(Antd);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
