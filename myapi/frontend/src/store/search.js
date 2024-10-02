import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', () => {
    const search = ref({
        page: 0,
        keyword: ''
    });
    const getPage = computed(() => search.value.page);
    const setPage = (_page) => {
        search.value.page = _page;
        localStorage.setItem('pinia/search', JSON.stringify(search.value));
    };

    const getKeyword = computed(() => search.value.keyword);
    const setKeyword = (_keyword) => {
        search.value.keyword = _keyword;
        localStorage.setItem('pinia/search', JSON.stringify(search.value));
    };

    const loadState = () => {
        const storedState = localStorage.getItem('pinia/search');
        if (storedState) {
            search.value = JSON.parse(storedState);
        }
    };

    return {
        getPage,
        setPage,
        getKeyword,
        setKeyword,
        loadState
    };
});
