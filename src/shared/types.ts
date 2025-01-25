export interface IService {
    category?: string;
    items: IServiceItem[];
    name: string;
}

export interface IServiceItem {
    isLink?: boolean;
    name: string;
    value: string;
}

export interface IServiceResponse {
    categories: string[];
    services: IService[];
}

export interface IMainStore {
    categories: string[];
    darkModeName: string;
    filterWord: string;
    isLoadingServices: boolean;
    path: string;
    savedDarkModeName: string;
    selectedCategory: string;
    services: IService[];
}
