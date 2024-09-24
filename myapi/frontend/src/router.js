import { createRouter, createWebHistory } from 'vue-router';

import Home from './routes/Home.vue';
import Detail from './routes/Detail.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/detail/:question_id',
        name: 'detail',
        component: Detail
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
