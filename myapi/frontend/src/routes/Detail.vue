<script setup>
import { onMounted, ref } from 'vue';
import fastapi from '../lib/api';
import { useRoute } from 'vue-router';

const route = useRoute();
const question_id = route.params.question_id;
const question = ref({});
const get_question = async () => {
    await fastapi('get', '/api/question/detail/' + question_id, {}, (json) => {
        question.value = json;
    });
};

let content = '';
const post_answer = async () => {
    let url = '/api/answer/create/' + question_id;
    let params = {
        content
    };
    fastapi('post', url, params, (json) => {
        content = '';
        get_question();
    });
};

onMounted(async () => {
    await get_question();
});
</script>

<template>
    <h1>{{ question.subject }}</h1>
    <form method="post">
        <textarea rows="15" v-model="content"></textarea>
        <input type="submit" value="답변등록" @click.prevent="post_answer" />
    </form>
</template>

<style scoped></style>
