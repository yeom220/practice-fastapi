<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import fastapi from '../lib/api';
import { useSearchStore } from '../store/search';
import { storeToRefs } from 'pinia';
import moment from 'moment/min/moment-with-locales';
import { useUserStore } from '../store/user';
moment.locale('ko');

const searchStore = useSearchStore();
const { getPage: page, getKeyword } = storeToRefs(searchStore);
const { setPage, setKeyword } = searchStore;

const { get_is_login: is_login } = storeToRefs(useUserStore());

const question_list = ref([]);
const size = 10;
const total = ref(0);
const kw = ref('');
const totalPage = computed(() => Math.ceil(total.value / size));

const get_question_list = async () => {
    const parmas = {
        page: page.value,
        size: size,
        keyword: getKeyword.value
    };
    await fastapi('get', '/api/question/list', parmas, (json) => {
        question_list.value = json.question_list;
        total.value = json.total;
    });
};

watch([page, getKeyword], ([newPage, oldPage], [newKeyword, oldKeyword]) => {
    get_question_list();
});
onMounted(() => {
    get_question_list();
});
</script>

<template>
    <div class="container my-3">
        <div class="row my-3">
            <div class="col-6">
                <router-link
                    to="/question-create"
                    class="btn btn-primary"
                    :class="{ disabled: !is_login }"
                    >질문 등록하기</router-link
                >
            </div>
            <div class="col-6">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        :value="getKeyword"
                        @input="kw = $event.target.value"
                    />
                    <button
                        class="btn btn-outline-secondary"
                        @click.prevent="
                            () => {
                                setKeyword(kw);
                                setPage(0);
                            }
                        "
                    >
                        찾기
                    </button>
                </div>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr class="text-center table-dark">
                    <th>번호</th>
                    <th style="width: 50%">제목</th>
                    <th>글쓴이</th>
                    <th>작성일시</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="text-center"
                    v-for="(q, index) in question_list"
                    :key="q.id"
                >
                    <td>{{ total - page * size - index }}</td>
                    <td class="text-start">
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
                    <td>{{ q.user ? q.user.username : '' }}</td>
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
                    @click.prevent="() => setPage(page - 1)"
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
                        @click.prevent="() => setPage(index)"
                        class="page-link"
                    >
                        {{ index + 1 }}
                    </button>
                </li>
            </template>
            <li class="page-item" :class="{ disabled: page >= totalPage - 1 }">
                <button class="page-link" @click="() => setPage(page + 1)">
                    다음
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
