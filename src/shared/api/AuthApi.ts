import axios from 'axios';
import type { IAccessTokenByRefreshTokenResponse, IAuthorizeResponse } from '@shared/types';

export default {
    authorize: (path: string, password: string) => axios.post<IAuthorizeResponse>(`${path}/api/authorize`, { password }),
    getAccessTokenByRefreshToken: async (path: string, refreshToken: string) => await axios.post<IAccessTokenByRefreshTokenResponse>(`${path}/api/refresh`, { refreshToken }),
};
