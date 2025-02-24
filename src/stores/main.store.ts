import { notify } from '@kyvg/vue3-notification';
import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import type { IService } from '@/shared/types';
import Api from '@shared/api/CommonApi';

export const useStore = defineStore('main', () => {
    const filterWord = ref('');
    const services = ref<IService[]>([]);
    const categories = ref<string[]>([]);
    const selectedCategory = ref('');
    const isLoadingServices = ref(false);
    const darkModeName = ref('');
    const savedDarkModeName = ref('');
    const path = ref('');

    const setVariablesFromInject = () => {
        path.value = inject('path') || '';
        darkModeName.value = inject('darkModeName') || 'isDarkModeAccessBoard';
        savedDarkModeName.value = inject('savedDarkModeName') || 'isSavedDarkModeAccessBoard';
    };

    const getServices = async () => {
        if (isLoadingServices.value) return;

        isLoadingServices.value = true;
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

        isLoadingServices.value = false;
    };

    return {
        filterWord,
        services,
        categories,
        selectedCategory,
        isLoadingServices,
        darkModeName,
        savedDarkModeName,
        path,
        setVariablesFromInject,
        getServices,
    };
});
