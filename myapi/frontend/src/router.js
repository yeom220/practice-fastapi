import { createRouter, createWebHistory } from 'vue-router';

import Home from './routes/Home.vue';
import Detail from './routes/Detail.vue';
import QuestionCreate from './routes/QuestionCreate.vue';
import W2uiTest from './routes/W2uiTest.vue';
import TabulatorTest from './routes/TabulatorTest.vue';

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
    },
    {
        path: '/test-w2ui',
        component: W2uiTest
    },
    {
        path: '/test-tabulator',
        component: TabulatorTest
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
