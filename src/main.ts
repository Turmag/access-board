import '@/style.scss';
import '@/assets/scss/notification.scss';
import 'floating-vue/dist/style.css';
import 'vue-multiselect/dist/vue-multiselect.css';
import { router } from '@/router';
import Notifications from '@kyvg/vue3-notification';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '@/App.vue';
import FloatingVue from 'floating-vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Notifications);
app.use(FloatingVue);
app.mount('#app');
