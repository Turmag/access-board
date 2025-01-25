import { notify } from '@kyvg/vue3-notification';
import { defineStore } from 'pinia';
import { useInject } from '@shared/composables/useInject';
import Api from '@shared/api/AuthApi';

export const authStore = defineStore('auth', {
    state: () => ({ isAuthorized: false }),

    actions: {
        async checkAuthorize() {
            try {
                const { path } = useInject();
                const { data: result } = await Api.checkAuthorize(path);
                if (result === 'success') {
                    this.isAuthorized = true;
                }
            } catch (error) {
                console.error('error', error);
                notify({
                    text: 'Проверка авторизации не увенчалась успехом',
                    title: 'Проверка авторизации',
                    type: 'error',
                });
            }
        },

        async login(password: string) {
            const { path } = useInject();
            let text = 'Пароль введён неверно';
            let type = 'error';

            try {
                const { data: result } = await Api.authorize(path, password);
                if (result === 'success') {
                    text = 'Всё прекрасно!';
                    type = 'success';
                    this.isAuthorized = true;
                }
            } catch (error) {
                console.error('error', error);
            }

            notify({
                text,
                title: 'Вход в Доступы',
                type,
            });
        },

        async logout() {
            try {
                const { path } = useInject();
                const { data: result } = await Api.logout(path);
                if (result === 'success') {
                    this.isAuthorized = false;
                }
            } catch (error) {
                console.error('error', error);
                notify({
                    text: 'Выход из доступов сервисов не увенчался успехом',
                    title: 'Выход из Доступов',
                    type: 'error',
                });
            }
        },
    },
});
