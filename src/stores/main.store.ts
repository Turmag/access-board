import { notify } from '@kyvg/vue3-notification';
import { defineStore } from 'pinia';
import { useInject } from '@shared/composables/useInject';
import type { IMainStore } from '@/shared/types';
import Api from '@shared/api/CommonApi';

export const useStore = defineStore('main', {
    state: (): IMainStore => ({
        filterWord: '',
        services: [],
        categories: [],
        selectedCategory: '',
        isLoadingServices: false,
        darkModeName: '',
        savedDarkModeName: '',
    }),

    actions: {
        async getServices() {
            if (this.isLoadingServices) return;

            this.isLoadingServices = true;
            try {
                const { path } = useInject();
                const { data: { services, categories } } = await Api.getServices(path);
                this.services = services;
                this.categories = categories;
            } catch (error) {
                console.error('error', error);
                notify({
                    title: 'Получение данных',
                    text: 'Получение данных не увенчалось успехом',
                    type: 'error',
                });
            }

            this.isLoadingServices = false;
        },
    },
});
