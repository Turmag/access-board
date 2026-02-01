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

export interface IAccessTokenByRefreshTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    success: boolean;
    token_type: string;
}

export interface IDecodedToken {
    exp: number;
    iat: number;
    iss: string;
    sub: string;
}

export interface IAuthorizeResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    success: boolean;
    token_type: string;
}
