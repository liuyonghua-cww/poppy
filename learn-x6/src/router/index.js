import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../Layout/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index'),
    },
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

// 路由拦截
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    if (sessionStorage.isLogined && JSON.parse(sessionStorage.isLogined)) {
        // 已经登录
        next();
    } else {
        if (to.path === '/login') {
            next();
        } else {
            next({
                path: '/login'
            });
        }
    }
});

export default router;
