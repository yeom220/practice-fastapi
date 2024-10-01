import qs from 'qs';
import { useUserStore } from '../store/user';
import { useRouter } from 'vue-router';

const fastapi = async (
    operation,
    url,
    params,
    success_callback,
    failure_callback
) => {
    let method = operation;
    let content_type = 'application/json';
    let body = JSON.stringify(params);

    const router = useRouter();
    const userStore = useUserStore();
    const { get_access_token, set_access_token, set_is_login, set_username } =
        userStore;

    if (operation === 'login') {
        method = 'post';
        content_type = 'application/x-www-form-urlencoded';
        body = qs.stringify(params);
    }

    let _url = import.meta.env.VITE_SERVER_URL + url;
    if (method === 'get') {
        _url += '?' + new URLSearchParams(params);
    }

    let options = {
        method: method,
        headers: {
            'Content-Type': content_type
        }
    };

    const _access_token = get_access_token;
    if (_access_token) {
        options.headers['Authorization'] = 'Bearer ' + _access_token;
    }

    if (method !== 'get') {
        options['body'] = body;
    }

    const response = await fetch(_url, options);
    try {
        if (response.status === 204) {
            // No content
            if (success_callback) {
                success_callback();
            }
            return;
        }

        const json = await response.json();
        if (response.status >= 200 && response.status < 300) {
            // 200 ~ 299
            if (success_callback) {
                success_callback(json);
            }
            return;
        }

        if (operation !== 'login' && response.status === 401) {
            set_access_token('');
            set_username('');
            set_is_login(false);
            alert('로그인이 필요합니다.');
            router.push('/');
            return;
        }

        if (failure_callback) {
            failure_callback(json);
        } else {
            alert(JSON.stringify(json));
        }
    } catch (error) {
        alert(JSON.stringify(error));
    }
};

export default fastapi;
