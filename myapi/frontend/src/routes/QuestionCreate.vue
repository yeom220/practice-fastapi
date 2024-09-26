<script setup>
import { useRouter } from 'vue-router';
import fastapi from '../lib/api';
import Error from '../components/Error.vue';
import { ref } from 'vue';

const router = useRouter();

let subject = '';
let content = '';
const error = ref({ detail: [] });
const post_question = async () => {
    const url = '/api/question/create';
    const params = {
        subject,
        content
    };
    fastapi(
        'post',
        url,
        params,
        (json) => {
            router.push('/');
        },
        (json_error) => {
            error.value = json_error;
        }
    );
};
</script>

<template>
    <div class="container">
        <h5 class="my-3 border-bottom pb-2">질문 등록</h5>
        <Error :error="error" />
        <form method="post" class="my-3">
            <div class="mb-3">
                <label for="subject">제목</label>
                <input type="text" class="form-control" v-model="subject" />
            </div>
            <div class="mb-3">
                <label for="content">내용</label>
                <textarea
                    class="form-control"
                    rows="10"
                    v-model="content"
                ></textarea>
            </div>
            <button class="btn btn-primary" @click.prevent="post_question">
                저장하기
            </button>
        </form>
    </div>
</template>

<style scoped></style>
