import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        component: () => import('@/App.vue'),
        name: 'Home',
        path: '/',
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
