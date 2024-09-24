<script setup>
import { ref, onMounted } from 'vue';
import fastapi from '../lib/api';
const question_list = ref([]);

const get_question_list = async () => {
    await fastapi('get', '/api/question/list', {}, (json) => {
        question_list.value = json;
    });
};

onMounted(async () => {
    await get_question_list();
});
</script>

<template>
    <li v-for="q in question_list">
        <router-link :to="{ name: 'detail', params: { question_id: q.id } }">{{
            q.subject
        }}</router-link>
    </li>
</template>

<style scoped></style>
