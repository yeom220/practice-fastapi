<script setup>
import { ref } from 'vue';
import fastapi from '../lib/api';
import { useRouter } from 'vue-router';
import Error from '../components/Error.vue';
import { useUserStore } from '../store/user';

const router = useRouter();

const userStore = useUserStore();
const { set_access_token, set_username, set_is_login } = userStore;

const error = ref({ detail: [] });
let login_username = '';
let login_password = '';

const login = async () => {
    const url = '/api/user/login';
    const params = {
        username: login_username,
        password: login_password
    };
    await fastapi(
        'login',
        url,
        params,
        (json) => {
            set_access_token(json.access_token);
            set_username(json.username);
            set_is_login(true);
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
        <h5 class="my-3 border-bottom pb-2">로그인</h5>
        <Error :error="error" />
        <form method="post">
            <div class="mb-3">
                <label for="username">사용자 이름</label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="login_username"
                />
            </div>
            <div class="mb-3">
                <label for="password">비밀번호</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="login_password"
                />
            </div>
            <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="login"
            >
                로그인
            </button>
        </form>
    </div>
</template>

<style scoped></style>
