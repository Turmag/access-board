import axios from 'axios';
import type { IServiceResponse } from '@shared/types';

export default { getServices: (path: string) => axios.get<IServiceResponse>(`${path}/api/getServices.php`) };
