import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const user = ref({
        access_token: '',
        username: '',
        is_login: false
    });

    const get_access_token = computed(() => user.value.access_token);
    const get_username = computed(() => user.value.username);
    const get_is_login = computed(() => user.value.is_login);

    const set_access_token = (_access_token) => {
        user.value.access_token = _access_token;
        localStorage.setItem(
            'pinia/user',
            JSON.stringify({ user: user.value })
        );
    };
    const set_username = (_username) => {
        user.value.username = _username;
        localStorage.setItem(
            'pinia/user',
            JSON.stringify({ user: user.value })
        );
    };
    const set_is_login = (_is_login) => {
        user.value.is_login = _is_login;
        localStorage.setItem(
            'pinia/user',
            JSON.stringify({ user: user.value })
        );
    };

    const loadState = () => {
        const storedState = localStorage.getItem('pinia/user');
        if (storedState) {
            user.value = JSON.parse(storedState).user;
        }
    };

    return {
        get_access_token,
        get_username,
        get_is_login,
        set_access_token,
        set_username,
        set_is_login,
        loadState
    };
});
