<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import fastapi from '../lib/api';
import { usePageStore } from '../store/page';
import { storeToRefs } from 'pinia';
import moment from 'moment/min/moment-with-locales';
moment.locale('ko');

const pageStore = usePageStore();
const { getPage: page } = storeToRefs(pageStore);
const { setPage } = pageStore;

const question_list = ref([]);
const size = 10;
const total = ref(0);
const totalPage = computed(() => Math.ceil(total.value / size));

const get_question_list = async (_page) => {
    const parmas = {
        page: _page,
        size: size
    };
    await fastapi('get', '/api/question/list', parmas, (json) => {
        question_list.value = json.question_list;
        // setPage(_page);
        total.value = json.total;
    });
};

watch(
    () => page.value,
    (newVal, oldVal) => {
        if (newVal !== oldVal) {
            get_question_list(newVal);
        }
    }
);
onMounted(async () => {
    await get_question_list(page.value);
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
                    <td>{{ total - page * size - index }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'detail',
                                params: { question_id: q.id }
                            }"
                            >{{ q.subject }}</router-link
                        >
                        <span
                            class="text-danger small mx-2"
                            v-if="q.answers.length > 0"
                            >{{ q.answers.length }}</span
                        >
                    </td>
                    <td>
                        {{
                            moment(q.create_date).format(
                                'YYYY년 MM월 DD일 a hh:mm'
                            )
                        }}
                    </td>
                </tr>
            </tbody>
        </table>
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: page <= 0 }">
                <button
                    class="page-link"
                    @click="
                        () => {
                            setPage(page - 1);
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
                    <button @click="() => setPage(index)" class="page-link">
                        {{ index + 1 }}
                    </button>
                </li>
            </template>
            <li class="page-item" :class="{ disabled: page >= totalPage - 1 }">
                <button
                    class="page-link"
                    @click="
                        () => {
                            setPage(page + 1);
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
