<script setup>
import { onMounted, ref } from 'vue';
import fastapi from '../lib/api';
import { useRoute, useRouter } from 'vue-router';
import Error from '../components/Error.vue';

const route = useRoute();
const router = useRouter();
const question_id = route.params.question_id;
const question = ref({});
const get_question = async () => {
    await fastapi('get', '/api/question/detail/' + question_id, {}, (json) => {
        question.value = json;
    });
};

let content = '';
const error = ref({ detail: [] });
const post_answer = async () => {
    let url = '/api/answer/create/' + question_id;
    let params = {
        content
    };
    fastapi(
        'post',
        url,
        params,
        (json) => {
            content = '';
            error.value = { detail: [] };
            get_question();
        },
        (err_json) => {
            error.value = err_json;
        }
    );
};

onMounted(async () => {
    await get_question();
});
</script>

<template>
    <div class="container my-3">
        <!-- 질문 -->
        <h2 class="border-bottom py-2">{{ question.subject }}</h2>
        <div class="card my-3">
            <div class="card-body">
                <div class="card-text" style="white-space: pre-line">
                    {{ question.content }}
                </div>
                <div class="d-flex justify-content-end">
                    <div class="badge bg-light text-dark p-2">
                        {{ question.create_date }}
                    </div>
                </div>
            </div>
        </div>

        <button
            class="btn btn-secondary"
            @click="
                () => {
                    router.push('/');
                }
            "
        >
            목록으로
        </button>

        <!-- 답변 목록 -->
        <h5 class="border-bottom my-3 py-2" v-if="!!question.answers">
            {{ question.answers.length }}개의 답변이 있습니다.
        </h5>
        <div class="card my-3" v-for="a in question.answers" :key="a.id">
            <div class="card-body">
                <div class="card-text" style="white-space: pre-line">
                    {{ a.content }}
                </div>
                <div class="d-flex justify-content-end">
                    <div class="badge bg-light text-dark p-2">
                        {{ a.create_date }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 답변 등록 -->
        <Error :error="error" />
        <form method="post" class="my-3">
            <div class="mb-3">
                <textarea rows="10" v-model="content" class="form-control" />
            </div>
            <input
                type="submit"
                value="답변등록"
                class="btn btn-primary"
                @click.prevent="post_answer"
            />
        </form>
    </div>
</template>

<style scoped></style>
