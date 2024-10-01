import { createRouter, createWebHistory } from 'vue-router';

import Home from './routes/Home.vue';
import Detail from './routes/Detail.vue';
import QuestionCreate from './routes/QuestionCreate.vue';
import UserCreate from './routes/UserCreate.vue';
import W2uiTest from './routes/W2uiTest.vue';
import TabulatorTest from './routes/TabulatorTest.vue';
import UserLogin from './routes/UserLogin.vue';
import QuestionModify from './routes/QuestionModify.vue';
import AnswerModify from './routes/AnswerModify.vue';

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
        path: '/question-modify/:question_id',
        name: 'question-modify',
        component: QuestionModify
    },
    {
        path: '/answer-modify/:answer_id',
        name: 'answer-modify',
        component: AnswerModify
    },
    {
        path: '/user-create',
        component: UserCreate
    },
    {
        path: '/user-login',
        component: UserLogin
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
