import axios from 'axios';

const path = import.meta.env.MODE === 'development' ? '' : import.meta.env.BASE_URL;
const VITE_SPECIAL = import.meta.env.VITE_SPECIAL;

console.log('VITE_SPECIAL', VITE_SPECIAL);

export default {
    authorize: (password: string) => axios.post<string>(`${path}/api/authorize.php`, { password }),
    checkAuthorize: () => axios.post<string>(`${path}/api/checkAuthorize.php`),
    logout: () => axios.post<string>(`${path}/api/logout.php`),
};
