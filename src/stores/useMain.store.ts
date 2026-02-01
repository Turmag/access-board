import { notify } from '@kyvg/vue3-notification';
import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import type { IService } from '@/shared/types';
import type { AxiosError } from 'axios';
import Api from '@shared/api/CommonApi';

export const useMainStore = defineStore('main', () => {
    const filterWord = ref('');
    const services = ref<IService[]>([]);
    const categories = ref<string[]>([]);
    const selectedCategory = ref('');
    const isLoadedPage = ref(false);
    const darkModeName = ref('');
    const savedDarkModeName = ref('');
    const path = ref('');
    const scrollPositionName = ref('');
    const accessTokenName = ref('');
    const refreshTokenName = ref('');

    const setVariablesFromInject = () => {
        // INFO: Для теста ставим в path /access-board/
        path.value = inject('path') || '';
        darkModeName.value = inject('darkModeName') || 'isDarkModeAccessBoard';
        savedDarkModeName.value = inject('savedDarkModeName') || 'isSavedDarkModeAccessBoard';
        scrollPositionName.value = inject('scrollPositionName') || 'accessBoardScrollTop';
        accessTokenName.value = inject('accessTokenName') || 'accessBoardAccessToken';
        refreshTokenName.value = inject('refreshTokenName') || 'accessBoardRefreshTokenName';
    };

    const getServices = async () => {
        try {
            const { data: { services: servicesResponse, categories: categoriesResponse } } = await Api.getServices(path.value);
            services.value = servicesResponse;
            categories.value = categoriesResponse;
        } catch (error) {
            // @ts-expect-error title
            const errorMessage = (error as AxiosError).response?.data?.title as string;
            console.error('error', errorMessage);
            notify({
                title: 'Получение данных',
                text: errorMessage,
                type: 'error',
            });
        }
    };

    return {
        filterWord,
        services,
        categories,
        selectedCategory,
        isLoadedPage,
        darkModeName,
        savedDarkModeName,
        scrollPositionName,
        path,
        accessTokenName,
        refreshTokenName,
        setVariablesFromInject,
        getServices,
    };
});
