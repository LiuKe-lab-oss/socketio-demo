import {createRouter, createWebHashHistory} from "vue-router";

// 路由信息
const routes = [
    {
        path: "/",
        name: "home",
        component:  () => import('../views/home.vue'),
    },

];

// 导出路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
