import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../Layout/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('../views/Home')
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router;
