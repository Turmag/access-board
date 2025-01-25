import { notify } from '@kyvg/vue3-notification';
import { defineStore } from 'pinia';
import { inject } from 'vue';
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
        path: '',
    }),

    actions: {
        setVariablesFromInject() {
            this.path = inject('path') || '';
            this.darkModeName = inject('darkModeName') || 'isDarkModeAccessBoard';
            this.savedDarkModeName = inject('savedDarkModeName') || 'isSavedDarkModeAccessBoard';
        },

        async getServices() {
            if (this.isLoadingServices) return;

            this.isLoadingServices = true;
            try {
                const { data: { services, categories } } = await Api.getServices(this.path);
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
