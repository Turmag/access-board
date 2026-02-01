import { useStorage } from '@vueuse/core';
import axios from 'axios';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/useAuth.store';
import { useMainStore } from '@/stores/useMain.store';

export const useAxiosInstance = async () => {
    const mainStore = useMainStore();
    const authStore = useAuthStore();

    const accessToken = useStorage(mainStore.accessTokenName, '');

    await authStore.checkAccessToken();

    return computed(() => {
        const headers: Record<string, unknown> = {};

        if (accessToken.value.length) {
            headers.Authorization = `Bearer ${accessToken.value}`;
        }

        return axios.create({ headers });
    });
};
