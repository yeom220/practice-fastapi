<script setup>
import fastapi from '../lib/api';
import Error from '../components/Error.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const question_id = route.params.question_id;

const error = ref({ detail: [] });
const subject = ref('');
const content = ref('');

const update_question = () => {
    const url = '/api/question/update';
    const params = {
        question_id,
        subject: subject.value,
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
onMounted(() => {
    fastapi('get', '/api/question/detail/' + question_id, {}, (json) => {
        subject.value = json.subject;
        content.value = json.content;
    });
});
</script>

<template>
    <div class="container">
        <h5 class="my-3 border-bottom pb-2">질문 수정</h5>
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
            <button class="btn btn-primary" @click.prevent="update_question">
                수정하기
            </button>
        </form>
    </div>
</template>
