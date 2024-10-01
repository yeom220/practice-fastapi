import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// import './style.css';
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App.vue';
import router from './router';
import { usePageStore } from './store/page';
import { useUserStore } from './store/user';

const app = createApp(App);
const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);

const pageStore = usePageStore();
pageStore.loadState();
const userStore = useUserStore();
userStore.loadState();

app.mount('#app');
