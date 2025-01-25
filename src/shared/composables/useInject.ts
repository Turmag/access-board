import { inject } from 'vue';

export const useInject = () => {
    const path: string = inject('path') || '';
    const darkModeName: string = inject('darkModeName') || 'isDarkModeAccessBoard';
    const savedDarkModeName: string = inject('savedDarkModeName') || 'isSavedDarkModeAccessBoard';

    return {
        darkModeName,
        path,
        savedDarkModeName,
    };
};
