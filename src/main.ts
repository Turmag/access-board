import '@/style.scss';
import '@/assets/scss/notification.scss';
import 'vue-multiselect/dist/vue-multiselect.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-toward.css';
import Notifications from '@kyvg/vue3-notification';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '@/App.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(Notifications);

export { app };
