import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';  // 引入 Pinia
import router from './router';

const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia());  // 使用 Pinia
app.use(router);
app.mount('#app');
