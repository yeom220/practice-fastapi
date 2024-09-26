<script setup>
import { ref } from 'vue';
import fastapi from '../lib/api';
import { useRouter } from 'vue-router';
import Error from '../components/Error.vue';

const router = useRouter();

const error = ref({ detail: [] });
let username = '';
let password1 = '';
let password2 = '';
let email = '';

const post_user = async () => {
    const url = '/api/user/create';
    const parmas = {
        username,
        password1,
        password2,
        email
    };
    await fastapi(
        'post',
        url,
        parmas,
        (json) => {
            router.push('/user-login');
        },
        (json_error) => {
            error.value = json_error;
        }
    );
};
</script>

<template>
    <div class="container">
        <h5 class="my-3 border-bottom pb-2">회원 가입</h5>
        <Error :error="error"></Error>
        <form method="post">
            <div class="mb-3">
                <label for="username">사용자 이름</label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                />
            </div>
            <div class="mb-3">
                <label for="password1">비밀번호</label>
                <input
                    type="password"
                    class="form-control"
                    id="password1"
                    v-model="password1"
                />
            </div>
            <div class="mb-3">
                <label for="password2">비밀번호 확인</label>
                <input
                    type="password"
                    class="form-control"
                    id="password2"
                    v-model="password2"
                />
            </div>
            <div class="mb-3">
                <label for="email">이메일</label>
                <input
                    type="text"
                    class="form-control"
                    id="email"
                    v-model="email"
                />
            </div>
            <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="post_user"
            >
                생성하기
            </button>
        </form>
    </div>
</template>

<style scoped></style>
