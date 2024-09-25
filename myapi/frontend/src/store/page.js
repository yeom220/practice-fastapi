import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', () => {
    const page = ref(0);
    const getPage = computed(() => page.value);
    const setPage = (_page) => {
        page.value = _page;
        localStorage.setItem(
            'pinia/page',
            JSON.stringify({ page: page.value })
        );
    };

    const loadState = () => {
        const storedState = localStorage.getItem('pinia/page');
        if (storedState) {
            page.value = JSON.parse(storedState).page;
        }
    };

    return {
        getPage,
        setPage,
        loadState
    };
});
