import axios from 'axios';
import type { IServiceResponse } from '@shared/types';

const path = import.meta.env.MODE === 'development' ? '' : import.meta.env.BASE_URL;

export default { getServices: () => axios.get<IServiceResponse>(`${path}/api/getServices.php`) };
