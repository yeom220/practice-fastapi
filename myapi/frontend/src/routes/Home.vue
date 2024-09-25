<script setup>
import { ref, onMounted, computed } from 'vue';
import fastapi from '../lib/api';
const question_list = ref([]);
const size = 10;
let page = 0;
const total = ref(0);
const totalPage = computed(() => Math.ceil(total.value / size));

const get_question_list = async (_page) => {
    const parmas = {
        page: _page,
        size: size
    };
    await fastapi('get', '/api/question/list', parmas, (json) => {
        question_list.value = json.question_list;
        page = _page;
        total.value = json.total;
    });
};

onMounted(async () => {
    await get_question_list(0);
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
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: page <= 0 }">
                <button
                    class="page-link"
                    @click="
                        () => {
                            get_question_list(page - 1);
                        }
                    "
                >
                    이전
                </button>
            </li>
            <template v-for="(_, index) in Array(totalPage)" :key="index">
                <li
                    class="page-item"
                    :class="{ active: index === page }"
                    v-if="index >= page - 5 && index <= page + 5"
                >
                    <button
                        @click="() => get_question_list(index)"
                        class="page-link"
                    >
                        {{ index + 1 }}
                    </button>
                </li>
            </template>
            <li class="page-item" :class="{ disabled: page >= totalPage - 1 }">
                <button
                    class="page-link"
                    @click="
                        () => {
                            get_question_list(page + 1);
                        }
                    "
                >
                    다음
                </button>
            </li>
        </ul>
        <router-link to="/question-create" class="btn btn-primary"
            >질문 등록하기</router-link
        >
    </div>
</template>

<style scoped></style>
