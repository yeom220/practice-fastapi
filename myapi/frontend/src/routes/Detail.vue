<script setup>
import { onMounted, ref } from 'vue';
import fastapi from '../lib/api';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Error from '../components/Error.vue';
import moment from 'moment/min/moment-with-locales';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user';
moment.locale('ko');

const route = useRoute();
const router = useRouter();
const question_id = route.params.question_id;
const question = ref({});
const get_question = async () => {
    await fastapi('get', '/api/question/detail/' + question_id, {}, (json) => {
        question.value = json;
    });
};

const { get_is_login: is_login, get_username: username } = storeToRefs(
    useUserStore()
);

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

const delete_question = (_question_id) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
        const url = '/api/question/delete';
        const params = {
            question_id: _question_id
        };
        fastapi(
            'delete',
            url,
            params,
            (json) => {
                router.push('/');
            },
            (err_json) => {
                error = err_json;
            }
        );
    }
};

const delete_answer = (answer_id) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
        const url = '/api/answer/delete';
        const params = {
            answer_id: answer_id
        };
        fastapi(
            'delete',
            url,
            params,
            (json) => {
                get_question();
            },
            (err_json) => {
                error = err_json;
            }
        );
    }
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
                    <div
                        class="badge bg-light text-dark p-2 text-start mx-3"
                        v-if="question.modify_date"
                    >
                        <div class="mb-2">modified at</div>
                        <div>
                            {{
                                moment(question.modify_date).format(
                                    'YYYY년 MM월 DD일 a hh:mm'
                                )
                            }}
                        </div>
                    </div>
                    <div class="badge bg-light text-dark p-2 text-start">
                        <div>
                            {{ question.user ? question.user.username : '' }}
                        </div>
                        <div>
                            {{
                                moment(question.create_date).format(
                                    'YYYY년 MM월 DD일 a hh:mm'
                                )
                            }}
                        </div>
                    </div>
                </div>
                <div
                    class="my-3"
                    v-if="question.user && question.user.username === username"
                >
                    <router-link
                        :to="{
                            name: 'question-modify',
                            params: { question_id: question.id }
                        }"
                        class="btn btn-sm btn-outline-secondary"
                        >수정</router-link
                    >
                    <button
                        class="btn btn-sm btn-outline-secondary"
                        @click.prevent="
                            () => {
                                delete_question(question.id);
                            }
                        "
                    >
                        삭제
                    </button>
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
                    <div
                        class="badge bg-light text-dark p-2 text-start mx-3"
                        v-if="a.modify_date"
                    >
                        <div class="mb-2">modified at</div>
                        <div>
                            {{
                                moment(a.modify_date).format(
                                    'YYYY년 MM월 DD일 a hh:mm'
                                )
                            }}
                        </div>
                    </div>
                    <div class="badge bg-light text-dark p-2 text-start">
                        <div class="mb-2">
                            {{ a.user ? a.user.username : '' }}
                        </div>
                        <div>
                            {{
                                moment(a.create_date).format(
                                    'YYYY년 MM월 DD일 a hh:mm'
                                )
                            }}
                        </div>
                    </div>
                </div>
                <div class="my-3" v-if="a.user && username === a.user.username">
                    <RouterLink
                        class="btn btn-sm btn-outline-secondary"
                        :to="{
                            name: 'answer-modify',
                            params: { answer_id: a.id }
                        }"
                        >수정</RouterLink
                    >
                    <button
                        class="btn btn-sm btn-outline-secondary"
                        @click.prevent="
                            () => {
                                delete_answer(a.id);
                            }
                        "
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
        <!-- 답변 등록 -->
        <Error :error="error" />
        <form method="post" class="my-3">
            <div class="mb-3">
                <textarea
                    rows="10"
                    v-model="content"
                    class="form-control"
                    :disabled="!is_login"
                />
            </div>
            <input
                type="submit"
                value="답변등록"
                class="btn btn-primary"
                :class="{ disabled: !is_login }"
                @click.prevent="post_answer"
            />
        </form>
    </div>
</template>

<style scoped></style>
