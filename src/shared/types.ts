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

export interface IScrollTopObject {
    time: number;
    top: number;
}
