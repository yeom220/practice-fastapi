<script setup>
import fastapi from '../lib/api';
import Error from '../components/Error.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
const router = useRouter();

const answer_id = route.params.answer_id;

const error = ref({ detail: [] });
let question_id = 0;
const content = ref('');

onMounted(() => {
    fastapi('get', '/api/answer/detail/' + answer_id, {}, (json) => {
        question_id = json.question_id;
        content.value = json.content;
    });
});

const update_answer = () => {
    const url = '/api/answer/update';
    const params = {
        answer_id: answer_id,
        content: content.value
    };
    fastapi(
        'put',
        url,
        params,
        (json) => {
            router.push('/detail/' + question_id);
        },
        (json_error) => {
            error = json_error;
        }
    );
};
</script>

<template>
    <div class="container">
        <h5 class="my-3 border-bottom pb-2">답변 수정</h5>
        <Error :error="error" />
        <form method="post" class="my-3">
            <div class="mb-3">
                <label for="content">내용</label>
                <textarea
                    class="form-control"
                    rows="10"
                    v-model="content"
                ></textarea>
            </div>
            <button class="btn btn-primary" @click.prevent="update_answer">
                수정하기
            </button>
        </form>
    </div>
</template>
