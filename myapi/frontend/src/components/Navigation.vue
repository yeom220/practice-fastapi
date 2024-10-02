<script setup>
import { storeToRefs } from 'pinia';
import { useSearchStore } from '../store/search';
import { useUserStore } from '../store/user';

const searchStore = useSearchStore();
const userStore = useUserStore();
const {
    get_access_token: access_token,
    get_username: username,
    get_is_login: is_login
} = storeToRefs(userStore);
const logout = () => {
    userStore.set_access_token('');
    userStore.set_username('');
    userStore.set_is_login(false);
};
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container-fluid">
            <router-link
                class="navbar-brand"
                to="/"
                @click="
                    () => {
                        searchStore.setPage(0);
                        searchStore.setKeyword('');
                    }
                "
                >Pybo</router-link
            >
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bstarget="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <template v-if="is_login">
                        <li class="nav-item">
                            <router-link
                                to="/user-login"
                                class="nav-link"
                                @click="logout"
                                >로그아웃</router-link
                            >
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/user-create"
                                >화원가입</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/user-login"
                                >로그인</router-link
                            >
                        </li>
                    </template>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/test-w2ui"
                            >w2ui 테스트</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/test-tabulator"
                            >tabulator 테스트</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
