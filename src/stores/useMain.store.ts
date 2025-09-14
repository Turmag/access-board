import { notify } from '@kyvg/vue3-notification';
import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import type { IService } from '@/shared/types';
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

    const setVariablesFromInject = () => {
        path.value = inject('path') || '';
        darkModeName.value = inject('darkModeName') || 'isDarkModeAccessBoard';
        savedDarkModeName.value = inject('savedDarkModeName') || 'isSavedDarkModeAccessBoard';
        scrollPositionName.value = inject('scrollPositionName') || 'testScrollTop';
    };

    const getServices = async () => {
        try {
            const { data: { services: servicesResponse, categories: categoriesResponse } } = await Api.getServices(path.value);
            services.value = servicesResponse;
            categories.value = categoriesResponse;
        } catch (error) {
            console.error('error', error);
            notify({
                title: 'Получение данных',
                text: 'Получение данных не увенчалось успехом',
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
        setVariablesFromInject,
        getServices,
    };
});
