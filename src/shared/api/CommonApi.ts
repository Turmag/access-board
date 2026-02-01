import { useAxiosInstance } from '@shared/composables/useAxiosInstance';
import type { IServiceResponse } from '@shared/types';

export default {
    getServices: async (path: string) => {
        const axiosInstance = await useAxiosInstance();
        return await axiosInstance.value.get<IServiceResponse>(`${path}/api/getServices`);
    },
};
