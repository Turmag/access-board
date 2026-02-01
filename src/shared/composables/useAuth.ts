import { useStorage } from '@vueuse/core';
import { useMainStore } from '@/stores/useMain.store';

export function useAuth() {
    const mainStore = useMainStore();
    const accessToken = useStorage(mainStore.accessTokenName, '');
    const refreshToken = useStorage(mainStore.refreshTokenName, '');

    return {
        accessToken,
        refreshToken,
    };
}
