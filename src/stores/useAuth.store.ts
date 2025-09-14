import { notify } from '@kyvg/vue3-notification';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useMainStore } from '@/stores/useMain.store';
import Api from '@shared/api/AuthApi';

export const useAuthStore = defineStore('auth', () => {
    const isAuthorized = ref(false);

    const checkAuthorize = async () => {
        try {
            const store = useMainStore();
            const { data: result } = await Api.checkAuthorize(store.path);
            if (result === 'success') isAuthorized.value = true;
        } catch (error) {
            console.error('error', error);
            notify({
                text: 'Проверка авторизации не увенчалась успехом',
                title: 'Проверка авторизации',
                type: 'error',
            });
        }
    };

    const login = async (password: string) => {
        const store = useMainStore();
        let text = 'Пароль введён неверно';
        let type = 'error';

        try {
            const { data: result } = await Api.authorize(store.path, password);
            if (result === 'success') {
                text = 'Всё прекрасно!';
                type = 'success';
                isAuthorized.value = true;
            }
        } catch (error) {
            console.error('error', error);
        }

        notify({
            text,
            title: 'Вход в Доступы',
            type,
        });
    };

    const logout = async () => {
        try {
            const store = useMainStore();
            const { data: result } = await Api.logout(store.path);
            if (result === 'success') isAuthorized.value = false;
        } catch (error) {
            console.error('error', error);
            notify({
                text: 'Выход из доступов сервисов не увенчался успехом',
                title: 'Выход из Доступов',
                type: 'error',
            });
        }
    };

    return {
        isAuthorized,
        checkAuthorize,
        login,
        logout,
    };
});
