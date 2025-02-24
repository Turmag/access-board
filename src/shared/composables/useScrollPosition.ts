import { useStorage } from '@vueuse/core';
import { watch } from 'vue';
import { mainStore } from '@/stores/main.store';
import type { IScrollTopObject } from '@/shared/types';
import { getSecondsDiff } from '@/shared/helpers';

export const useScrollPosition = () => {
    const store = mainStore();
    const scrollTop = useStorage(store.scrollPositionName, {} as IScrollTopObject);

    window.onbeforeunload = () => {
        scrollTop.value = {
            time: new Date().getTime(),
            top: window.scrollY,
        };
    };

    watch(
        () => store.isLoadedPage,
        () => {
            if (scrollTop.value.time) {
                const diffSeconds = getSecondsDiff(new Date(), new Date(scrollTop.value.time));
                if (diffSeconds > 5) {
                    scrollTop.value = {} as IScrollTopObject;
                } else {
                    window.scrollTo({ top: scrollTop.value.top });
                }
            }
        },
    );
};
