import axios from 'axios';

export default {
    authorize: (path: string, password: string) => axios.post<string>(`${path}/api/authorize.php`, { password }),
    checkAuthorize: (path: string) => axios.post<string>(`${path}/api/checkAuthorize.php`),
    logout: (path: string) => axios.post<string>(`${path}/api/logout.php`),
};
