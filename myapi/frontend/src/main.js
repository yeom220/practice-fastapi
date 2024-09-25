import { createApp } from 'vue';
// import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
