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
    <div class="container my-3">
        <table class="table">
            <thead>
                <tr class="table-dark">
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성일시</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(q, index) in question_list" :key="q.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'detail',
                                params: { question_id: q.id }
                            }"
                            >{{ q.subject }}</router-link
                        >
                    </td>
                    <td>{{ q.create_date }}</td>
                </tr>
            </tbody>
        </table>
        <router-link to="/question-create" class="btn btn-primary"
            >질문 등록하기</router-link
        >
    </div>
</template>

<style scoped></style>
