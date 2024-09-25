import { createRouter, createWebHistory } from 'vue-router';

import Home from './routes/Home.vue';
import Detail from './routes/Detail.vue';
import QuestionCreate from './routes/QuestionCreate.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/detail/:question_id',
        name: 'detail',
        component: Detail
    },
    {
        path: '/question-create',
        component: QuestionCreate
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
