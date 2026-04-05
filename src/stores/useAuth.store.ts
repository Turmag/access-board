import { notify } from '@kyvg/vue3-notification';
import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuth } from '@shared/composables/useAuth';
import { useMainStore } from '@/stores/useMain.store';
import type { IDecodedToken } from '@shared/types';
import type { AxiosError } from 'axios';
import Api from '@shared/api/AuthApi';

export const useAuthStore = defineStore('auth', () => {
    const isAuthorized = ref(false);

    const checkAccessToken = async (isForceGet = false) => {
        const { accessToken } = useAuth();
        if (isAuthorized.value && !isForceGet || !accessToken.value) return;
        if (accessToken.value === 'false') accessToken.value = '';

        try {
            const decodedToken = jwtDecode<IDecodedToken>(accessToken.value);

            const expDate = new Date(decodedToken.exp * 1000);
            const today = new Date();

            if (expDate < today) {
                await getAccessTokenByRefreshTokenLocal();
            } else {
                isAuthorized.value = true;
            }
        } catch (error) {
            // @ts-expect-error title
            const errorMessage = (error as AxiosError).response?.data?.title as string;
            console.error(errorMessage, error);
            notify({
                text: errorMessage,
                title: 'Проверка авторизации',
                type: 'error',
            });
        }
    };

    const getAccessTokenByRefreshTokenLocal = async (isForceGet = false) => {
        const mainStore = useMainStore();
        const { accessToken, refreshToken } = useAuth();

        try {
            const { data } = await Api.getAccessTokenByRefreshToken(mainStore.path, refreshToken.value);
            accessToken.value = data.access_token;
            refreshToken.value = data.refresh_token;
            await checkAccessToken(isForceGet);
            isAuthorized.value = true;
        } catch (error) {
            console.error('Ошибка при обновлении токена', error);
            accessToken.value = '';
            refreshToken.value = '';
            return;
        }
    };

    const authorize = async (password: string) => {
        const mainStore = useMainStore();
        const { accessToken, refreshToken } = useAuth();

        let text = 'Всё прекрасно!';
        let type = 'success';

        try {
            const { data } = await Api.authorize(mainStore.path, password);
            accessToken.value = data.access_token;
            refreshToken.value = data.refresh_token;
            isAuthorized.value = true;
        } catch (error) {
            // @ts-expect-error title
            const errorMessage = (error as AxiosError).response?.data?.title as string;
            console.error('error', errorMessage);
            text = errorMessage;
            type = 'error';
        }

        notify({
            text,
            title: 'Вход в Доступы',
            type,
        });
    };

    const logout = () => {
        const { accessToken, refreshToken } = useAuth();
        isAuthorized.value = false;
        accessToken.value = '';
        refreshToken.value = '';
    };

    return {
        authorize,
        checkAccessToken,
        isAuthorized,
        logout,
    };
});
